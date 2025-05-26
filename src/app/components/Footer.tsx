"use client";

import Image from "next/image";
import { useState, useContext } from "react";
import { CurrencyContext } from "../contexts/CurrencyContext";
import Link from 'next/link';

export default function Footer() {
  const { currency, setCurrency } = useContext(CurrencyContext);

  const handleRegionChange = (e) => {
    const selected = e.target.value.split(" ")[0];
    setCurrency(selected);
  };
  return (
    <footer className="w-full border-t mt-16 py-6 px-4 text-sm text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Region Selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="region" className="text-gray-500">
            Country/region
          </label>
          <select
  id="region"
  className="bg-[#171717] text-gray-500 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
  value={currency}
  onChange={handleRegionChange}
>
  <option value="CAD" className="bg-[#171717] text-gray-500">Canada (CAD)</option>
  <option value="USD" className="bg-[#171717] text-gray-500">United States (USD)</option>
  <option value="EUR" className="bg-[#171717] text-gray-500">Europe (EUR)</option>
</select>

        </div>

        {/* Policies */}
        <div className="text-center md:text-left space-x-2">
          <span>© 2025, BeyBazaar Powered by Next.js + Supabase |</span>
          <Link className="hover:underline" href="/refund/">Refund Policy |</Link>
          <Link className="hover:underline" href="/privacy/">Privacy policy |</Link>
          <Link className="hover:underline" href="/tos/">Terms of service |</Link>
          <Link className="hover:underline" href="/refund/">Shipping policy</Link>

        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-6 flex justify-center space-x-6">
        <a
          href="https://www.facebook.com/share/1MrVZZWtTM/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/facebook.png"
            alt="Facebook"
            className="w-5 h-5 filter invert brightness-200"
          />
        </a>
        <a
          href="https://www.instagram.com/beybazaarbb?igsh=MXNheHZpb2Y3aXBjdQ%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/instagram.png"
            alt="Instagram"
            className="w-5 h-5 filter invert brightness-200"
          />
        </a>
        <a
          href="https://www.youtube.com/@BeyBazaar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/youtube.png"
            alt="youtube"
            className="w-5 h-5 brightness-200"
          />
        </a>
        <a
          href="https://www.tiktok.com/@bey.bazaar7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/tiktok.png"
            alt="TikTok"
            className="w-5 h-5 filter invert brightness-200"
          />
        </a>
      </div>
    </footer>
  );
}
