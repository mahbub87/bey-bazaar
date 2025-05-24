"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { CurrencyContext } from "../contexts/CurrencyContext";

export default function AutoSlider() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const { currency } = useContext(CurrencyContext);

  const rates = {
    CAD: 1,
    USD: 0.73,
    EUR: 0.68,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("Products").select("*");
      if (error) {
        console.error("Failed to fetch products:", error.message);
      } else {
        const shuffled = [...data];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setProducts(shuffled);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isMobile, products]);

  if (products.length === 0) {
    return <div className="mt-10 text-center text-white">Loading...</div>;
  }

  const getPrice = (price) => {
    const rate = rates[currency] || 1;
    const converted = price * rate;

    const symbols = {
      CAD: "$",
      USD: "$",
      EUR: "€",
    };

    const symbol = symbols[currency] || "";
    return `${symbol}${converted.toFixed(2)}`;
  };
  if (isMobile) {
    const product = products[currentIndex];
    return (
      <div className="mt-10 flex justify-center">
        <Link href={`/${product.id}`}>
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg p-4 flex flex-col items-center text-gray-500 bg-black hover:border hover:border-white transition duration-500 cursor-pointer">
            <Image
              src={product.image_url}
              alt={product.name}
               rel="canonical"
              width={0}
              height={0}
              sizes="100vw"
              className="w-4/5 h-auto max-w-[250px] object-contain rounded filter brightness-85 transition-transform duration-300 hover:scale-110"
            />

            <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-lg flex items-center gap-3 text-white text-sm">
              <div>
                <div className="font-semibold">{product.name}</div>
                <div className="text-xs">{getPrice(product.price)}</div>
              </div>
              <button
                className="ml-4 text-white px-3 py-1 rounded hover:bg-gray-200 transition"
                style={{ backgroundColor: "#848484" }}
              >
                <div className="text-xs">{getPrice(product.price)}</div>
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  const allProducts = [...products, ...products];

  return (
    <div className="overflow-hidden whitespace-nowrap mt-10">
      <div className="infinite-scroll-wrapper flex gap-4 animate-scroll">
        {allProducts.map((product, index) => (
          <Link href={`/${product.id}`} key={index}>
            <div className="relative min-w-[550px] rounded-lg p-4 flex flex-col flex-shrink-0 items-center text-gray-500 bg-black hover:border hover:border-white transition duration-200 cursor-pointer">
              <Image
                src={product.image_url}
                alt={product.name}
                width={250}
                height={250}
                className="object-contain w-[250px] h-[250px] rounded filter brightness-85 contrast-110 transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-lg flex items-center gap-3 text-white text-sm">
                <div>
                  <div className="font-semibold">{product.name}</div>
                </div>
                <button
                  className="ml-4 text-white px-3 py-1 rounded hover:bg-gray-200 transition"
                  style={{ backgroundColor: "#848484" }}
                >
                  <div className="text-xs">{getPrice(product.price)}</div>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
