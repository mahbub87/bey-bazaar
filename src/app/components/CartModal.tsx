"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";
import { CurrencyContext } from "../contexts/CurrencyContext";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    image_url: string;
  };
}

const CartModal = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useCart();
  const { currency } = useContext(CurrencyContext);
  const router = useRouter();

  const getPrice = (price: number) => {
    const rates: Record<string, number> = {
      CAD: 1,
      USD: 0.73,
      EUR: 0.68,
    };

    const symbols: Record<string, string> = {
      CAD: "$",
      USD: "$",
      EUR: "€",
    };

    const rate = rates[currency] || 1;
    const symbol = symbols[currency] || "$";

    return `${symbol}${(price * rate).toFixed(2)}`;
  };

 const handleCheckout = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const res = await fetch("/api/checkout", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user_id: user.id,
    user_email: user.email,
    currency,
  }),
});


  const { url } = await res.json();
  if (url) window.location.href = url;
};

  useEffect(() => {
    const fetchCartItems = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const { data: cart } = await supabase
        .from("Carts")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!cart) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const { data: items } = await supabase
        .from("Cart_Items")
        .select("id, quantity, product:product_id(name, price, image_url)")
        .eq("cart_id", cart.id);

      setCartItems((items as unknown as CartItem[]) || []);
      setLoading(false);
    };

    fetchCartItems();
  }, [currency]); 

  const handleRemove = async (itemId: string) => {
    await supabase.from("Cart_Items").delete().eq("id", itemId);
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    refreshCart();
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgba(255,255,255,0.3)] bg-[#1e1e1e] top-12 right-0 flex flex-col gap-6 z-20 min-w-[300px]">
      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="text-gray-400">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
          <div className="flex flex-col gap-8 max-h-[400px] overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-[72px] h-[96px] flex-shrink-0">
                  <Image
                    src={item.product.image_url}
                    alt={item.product.name}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold text-white">
                        {item.product.name}
                      </h3>
                      <div className="p-1 rounded-sm text-white">
                        {getPrice(item.product.price)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Available</div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-400">Qty. {item.quantity}</span>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-blue-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between font-semibold text-white">
              <span>Subtotal</span>
              <span>{getPrice(subtotal)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Taxes calculated at checkout
            </p>
            <div className="flex justify-end text-sm gap-2">
              <button
                onClick={handleCheckout}
                className="rounded-md py-3 px-4 bg-white text-black"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
