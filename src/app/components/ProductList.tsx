'use client';

import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { CurrencyContext } from '../contexts/CurrencyContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { currency, rates } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const desiredNames = [
        "Fang Leone 130W2D",
        "Flash Sagittario 230WD",
        "L-Drago Destructor F:S",
        "Cosmic Pegasus F:D",
      ];

      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .in("name", desiredNames);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
  const rate = rates[currency] || 1;
  const converted = price * rate;

  const currencySymbols = {
    CAD: '$',
    USD: '$',
    EUR: '€',
  };

  const symbol = currencySymbols[currency] || '';

  return `${symbol}${converted.toFixed(2)}`;
};

  return (
    <div className="mt-12 flex gap-x-8 gap-y-10 justify-between flex-wrap">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${product.id}`}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative group flex justify-center items-center h-[320px] overflow-hidden">
            <Image
              src={product.image_url}
              alt={product.name}
              width={250}
              height={250}
              className="transition-opacity duration-500 group-hover:opacity-0 z-10 absolute filter brightness-85 contrast-110"
            />
            <Image
              src={product.Box}
              alt={product.name}
              width={250}
              height={250}
              className="transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0 absolute filter brightness-85 contrast-110"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">
              <div className="flex items-center gap-4">
                <h3 className="text-gray-500 line-through">
                  {formatPrice(product.price + 10)}
                </h3>
                <h3 className="text-red-500">
                  {formatPrice(product.price)}
                </h3>
              </div>
            </span>
          </div>
          <div className="text-sm text-gray-500">{product.description}</div>
          <button className="rounded-2xl ring-1 py-2 px-4 text-xs hover:bg-white hover:text-black w-max">
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
