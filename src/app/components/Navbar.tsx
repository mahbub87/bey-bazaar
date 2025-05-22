"use client";

import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";
import React from "react";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative ">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>
        <Menu />
      </div>

      {/*BIGGER SCREENS*/}
      <div className="hidden md:flex items:center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={120} height={40} />
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/list">Shop</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        {/*RIGHT*/}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
