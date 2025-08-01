"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { CurrencyContext } from "../contexts/CurrencyContext";
import Pagination from "./Pagination";

const ProductList = ({ filters }) => {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [hasMore, setHasMore] = useState(true);
  const { currency } = useContext(CurrencyContext);
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("name")?.toLowerCase() || "";

  const getPrice = (price) => {
    const rates = {
      CAD: 1,
      USD: 0.73,
      EUR: 0.68,
    };

    const symbols = {
      CAD: "$",
      USD: "$",
      EUR: "€",
    };

    const rate = rates[currency] || 1;
    const symbol = symbols[currency] || "$";

    return `${symbol}${(price * rate).toFixed(2)}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("Products").select("*");
      const currencyRates = {
        CAD: 1,
        USD: 0.73,
        EUR: 0.68,
      };
      const rate = currencyRates[currency] || 1;
      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      let filtered = data;

      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.type) {
        filtered = filtered.filter((product) => product.type === filters.type);
      }

      if (filters.minPrice) {
        const minCAD = parseFloat(filters.minPrice) / rate;
        filtered = filtered.filter((product) => product.price >= minCAD);
      }

      if (filters.maxPrice) {
        const maxCAD = parseFloat(filters.maxPrice) / rate;
        filtered = filtered.filter((product) => product.price <= maxCAD);
      }

      const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

      setProducts(paginated);
      setHasMore(filtered.length > page * pageSize);
    };

    fetchProducts();
    // TODO: Fix React hook dependency warning by including 'currency' in dependency array
    // This will ensure the component re-renders when currency changes and prices update correctly
    // Current implementation may show stale pricing when currency is switched
  }, [searchTerm, page, filters, currency]);

  useEffect(() => {
    setPage(1);
  }, [filters, searchTerm]);

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link
          rel="canonical"
          key={product.id}
          href={`/${product.id}`}
          className="flex flex-col gap-4"
        >
          <div className="relative group flex justify-center items-center h-[320px] overflow-hidden">
            <Image
              src={product.image_url}
              alt={product.name}
              width={250}
              height={250}
              className={`transition-opacity duration-500 z-10 absolute filter brightness-85 contrast-110 ${
                product.Box ? "group-hover:opacity-0" : "opacity-100"
              }`}
            />
            {product.Box && (
              <Image
                src={product.Box}
                alt={product.name}
                width={250}
                height={250}
                className="transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0 absolute"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">
              <div className="flex items-center gap-4">
                <h3 className="text-gray-500 line-through">
                  {getPrice(product.price + 10)}
                </h3>
                <h3 className="text-red-500">{getPrice(product.price)}</h3>
              </div>
            </span>
          </div>
          <div className="text-sm text-gray-500">{product.description}</div>
          <button className="rounded-2xl ring-1 py-2 px-4 text-xs hover:bg-white hover:text-black w-max">
            Add to Cart
          </button>
        </Link>
      ))}
      <div className="col-span-full">
        <Pagination page={page} setPage={setPage} hasMore={hasMore} />
      </div>
    </div>
  );
};

export default ProductList;
