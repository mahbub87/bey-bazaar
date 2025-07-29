import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "../../lib/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: Request) {
  try {
    const { user_id, user_email, currency } = await req.json();
    console.log("DEBUG: Incoming checkout request", { user_id, user_email, currency });

    if (!user_id || !currency) {
      console.error("DEBUG: Missing user_id or currency");
      return NextResponse.json({ error: "Missing user_id or currency" }, { status: 400 });
    }

    // Fetch the user's cart
    const { data: cart, error: cartErr } = await supabase
      .from("Carts")
      .select("id")
      .eq("user_id", user_id)
      .single();

    console.log("DEBUG: Cart fetch", { cart, cartErr });

    if (cartErr || !cart) {
      console.error("DEBUG: Cart not found or error", cartErr);
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Fetch the cart items with product info
    const { data: cartItems, error: cartItemsErr } = await supabase
      .from("Cart_Items")
      .select(`
        quantity,
        product:product_id (
          name,
          price,
          image_url
        )
      `)
      .eq("cart_id", cart.id);

    console.log("DEBUG: Cart items fetch", { cartItems, cartItemsErr });

    if (cartItemsErr || !cartItems || cartItems.length === 0) {
      console.error("DEBUG: No items in cart or error", cartItemsErr);
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Calculate discount
    const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const applyDiscount = totalItemCount >= 2;
    const discountRate = applyDiscount ? 0.9 : 1; // 10% off

    // Currency conversion
    const conversionRates: Record<string, number> = {
      CAD: 1,
      USD: 0.73,
      EUR: 0.68,
    };
    const rate = conversionRates[currency] || 1;

    // Create Stripe line items
    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: item.product.name,
          images: [item.product.image_url],
        },
        unit_amount: Math.round(item.product.price * rate * discountRate * 100),
      },
      quantity: item.quantity,
    }));

    console.log("DEBUG: Stripe line items", line_items);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: user_email,
      metadata: {
        user_id,
        discount_applied: applyDiscount.toString(),
      },
      shipping_address_collection: {
        allowed_countries: [
          "US", "CA", "GB", "AU", "NZ", "DE", "FR", "IT", "ES", "NL", "BE", "SE", "NO", "FI", "DK", "IE", "PT", "AT",
          "CH", "PL", "CZ", "SK", "HU", "RO", "BG", "GR", "SI", "HR", "EE", "LV", "LT", "CY", "MT", "LU", "IS", "LI",
          "AE", "SA", "QA", "KW", "OM", "BH", "IL", "TR", "EG", "MA", "ZA", "NG", "KE", "GH", "IN", "PK", "BD", "LK",
          "NP", "TH", "MY", "SG", "PH", "ID", "VN", "HK", "TW", "JP", "KR", "CN", "MX", "BR", "AR", "CL", "CO", "PE",
          "VE", "UY", "EC", "PA", "CR",
        ],
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    });

    console.log("DEBUG: Stripe session created", { sessionId: session.id });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
