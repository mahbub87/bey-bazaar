import { Resend } from "resend";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "../../lib/supabaseClient";
import { sendMail } from "../../lib/mailer";


const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session & {
      customer_details?: {
        address?: {
          line1?: string;
          line2?: string;
          city?: string;
          state?: string;
          postal_code?: string;
          country?: string;
        };
      };
    };

    const user_id = session.metadata?.user_id;
    if (!user_id) return new NextResponse("Missing user_id", { status: 400 });

    const address = session.customer_details?.address;
    const formattedAddress = address
      ? [
          address.line1,
          address.line2,
          address.city,
          address.state,
          address.postal_code,
          address.country,
        ]
          .filter(Boolean)
          .join(", ")
      : "N/A";

    const { data: cart, error: cartErr } = await supabase
      .from("Carts")
      .select("id")
      .eq("user_id", user_id)
      .single();

    if (cartErr || !cart)
      return new NextResponse("Cart not found", { status: 404 });

    const { data: cartItems } = await supabase
      .from("Cart_Items")
      .select("product_id, quantity")
      .eq("cart_id", cart.id);

    let emailBody = `New Order Received:\nShipping Address: ${formattedAddress}\n\nItems:\n`;

    for (const item of cartItems || []) {
      const { data: product } = await supabase
        .from("Products")
        .select("price, name")
        .eq("id", item.product_id)
        .single();

      await supabase.from("Orders").insert({
        user_id,
        product_id: item.product_id,
        quantity: item.quantity,
        total_price: product.price * item.quantity,
        status: "paid",
        shipping_address: formattedAddress,
      });

      emailBody += `• ${product.name} (x${item.quantity}) - $${product.price * item.quantity}\n`;
    }

    await sendMail({
  to: "beybazaarbb@gmail.com",
  subject: "🛒 New Order Received",
  text: emailBody,
});


   await sendMail({
  to: session.customer_details?.email || "beybazaarbb@gmail.com",
  subject: "Your Order Confirmation",
  html: `
    <h2>Thank you for your order!</h2>
    <p>Hi ${session.customer_details?.name || "Customer"},</p>
    <p>We've received your order and are processing it now.</p>

    <h3>Order Summary</h3>
    <ul>
      ${await Promise.all(
        (cartItems || []).map(async (item) => {
          const { data: product } = await supabase
            .from("Products")
            .select("price, name")
            .eq("id", item.product_id)
            .single();

          return `
            <li>
              <strong>${product?.name}</strong><br />
              Quantity: ${item.quantity}<br />
              Price: $${product?.price * item.quantity}
            </li>
          `;
        })
      ).then((items) => items.join(""))}
    </ul>

    <p><strong>Total Paid:</strong> $${(session.amount_total || 0) / 100}</p>

    <h3>Shipping Address</h3>
    <p>${formattedAddress}</p>

    <hr />
    <p>If you have any questions, feel free to reply to this email or contact us at <a href="mailto:beybazaarbb@gmail.com">beybazaarbb@gmail.com</a>.</p>

    <p>Thanks for shopping with us!<br />The BeyBazaar Team</p>
  `,
});

    await supabase.from("Cart_Items").delete().eq("cart_id", cart.id);
  }

  return new NextResponse("Success", { status: 200 });
}
