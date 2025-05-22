"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import CartModal from "./CartModal";
import { useCart } from "../contexts/CartContext";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import NavIcons from "./NavIcons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  // Handle outside clicks to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        cartRef.current &&
        !cartRef.current.contains(target)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Supabase auth state
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session?.user);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative text-white">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={40}
            className="object-contain"
          />
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-white"
        >
          {menuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-20 left-0 w-full bg-black z-50 flex flex-col gap-4 p-4 shadow-md md:hidden text-white"
        >
          <SearchBar />
          <div className="flex flex-col items-center text-center gap-2 text-lg font-medium">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              href="/list"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-300"
            >
              Shop
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-300"
            >
              Contact
            </Link>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/profile");
                  }}
                  className="hover:text-gray-300"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="hover:text-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/login");
                }}
                className="hover:text-gray-300"
              >
                Login
              </button>
            )}

            <button
              onClick={() => {
                setIsCartOpen(!isCartOpen);
              }}
              className="hover:text-gray-300"
            >
              Cart ({cartCount})
            </button>
          </div>
        </div>
      )}

      {/* SHOW CART MODAL IN MOBILE VIEW */}
      {isCartOpen && (
        <div ref={cartRef} className="absolute z-50 top-24 left-0 w-full">
          <CartModal />
        </div>
      )}

      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={120} height={40} />
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/list" className="hover:text-gray-300">
              Shop
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
