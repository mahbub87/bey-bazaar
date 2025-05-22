"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import CartModal from "./CartModal";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../contexts/CartContext";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartCount } = useCart();
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);

      if (user) {
        const { data: cart } = await supabase
          .from("Carts")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (cart) {
          const { data: items } = await supabase
            .from("Cart_Items")
            .select("quantity")
            .eq("cart_id", cart.id);



        }
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev);
    setIsCartOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div ref={navRef} className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt="Profile Icon"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />

      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgba(255,255,255,0.3)] bg-[#1e1e1e] z-20 flex flex-col gap-2">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  router.push("/profile");
                }}
              >
                Profile
              </button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsProfileOpen(false);
                router.push("/login");
              }}
            >
              Login
            </button>
          )}
        </div>
      )}

      <div className="relative cursor-pointer">
        <Image
          src="/cart.png"
          alt="Cart Icon"
          width={22}
          height={22}
          onClick={() => {
            setIsCartOpen((prev) => !prev);
            setIsProfileOpen(false);
          }}
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-sm">
          {cartCount}
        </div>
      </div>

      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
