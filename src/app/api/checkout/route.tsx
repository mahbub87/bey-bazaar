import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "../../lib/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: Request) {
  const { user_id, user_email } = await req.json(); // Get email from frontend

  const { data: cart, error: cartErr } = await supabase
    .from("Carts")
    .select("id")
    .eq("user_id", user_id)
    .single();

  if (cartErr || !cart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  const { data: cartItems, error: cartItemsErr } = await supabase
    .from("Cart_Items")
    .select("quantity, product:product_id(name, price, image_url)")
    .eq("cart_id", cart.id);

  if (cartItemsErr || !cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: "No items in cart" }, { status: 400 });
  }

  const line_items = cartItems.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
        images: [item.product.image_url],
      },
      unit_amount: Math.round(item.product.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    customer_email: user_email, 
    metadata: {
      user_id, 
    },
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
  });

  return NextResponse.json({ url: session.url });
}
