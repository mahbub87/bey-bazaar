"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface CartContextType {
  cartCount: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setCartCount(0);
      return;
    }

    const { data: cart } = await supabase
      .from("Carts")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!cart) {
      setCartCount(0);
      return;
    }

    const { data: items } = await supabase
      .from("Cart_Items")
      .select("quantity")
      .eq("cart_id", cart.id);

    const total = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    setCartCount(total);
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        refreshCart: fetchCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
