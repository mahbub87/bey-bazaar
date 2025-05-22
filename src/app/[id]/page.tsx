"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import ProductImages from "../components/ProductImages";
import Add from "../components/Add";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { useCart } from "../contexts/CartContext";

const Product = () => {
  const [product, setProduct] = useState<any>(null);
  const params = useParams();
  const id = params?.id;
  const { currency, rates } = useContext(CurrencyContext);
  const { refreshCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!productId) {
      console.error("Missing product ID");
      return;
    }

    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;

    if (error || !user) {
      console.error("User not logged in", error);
      alert("You must be logged in");
      return;
    }

    let { data: cart } = await supabase
      .from("Carts")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!cart) {
      const { data: newCart } = await supabase
        .from("Carts")
        .insert({ user_id: user.id })
        .select()
        .single();
      cart = newCart;
    }

    const { data: existing } = await supabase
      .from("Cart_Items")
      .select("*")
      .eq("cart_id", cart.id)
      .eq("product_id", productId)
      .single();

    if (existing) {
      await supabase
        .from("Cart_Items")
        .update({ quantity: existing.quantity + quantity })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("Cart_Items")
        .insert({ cart_id: cart.id, product_id: productId, quantity });
    }

    refreshCart();
  };

  const formatPrice = (price: number) => {
    const rate = rates[currency] || 1;
    const converted = price * rate;

    const currencySymbols: Record<string, string> = {
      CAD: "$",
      USD: "$",
      EUR: "€",
    };

    const symbol = currencySymbols[currency] || "";
    return `${symbol}${converted.toFixed(2)}`;
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 mt-10">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages image_url={product.image_url} box={product.Box} />
      </div>

      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[1px] bg-gray-700 " />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">
            {formatPrice(product.price + 10)}
          </h3>
          <h3 className="font-medium text-2xl text-red-500">
            {formatPrice(product.price)}
          </h3>
        </div>
        <div className="h-[1px] bg-gray-700 " />
        <Add onAddToCart={(qty) => addToCart(product.id, qty)} />
        <div className="h-[1px] bg-gray-700 " />
        <div className="text-sm text-gray-500">
          <h4 className="font-medium mb-4">Details</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            dignissimos rem, minima temporibus vero, delectus velit perferendis
            magnam nobis iusto consequatur suscipit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
