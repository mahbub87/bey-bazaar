"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import Image from "next/image";
import Filter from "../components/Filter";
import AllList from "../components/AllList";
export const metadata = {
  title: "Shop Beyblades | Discounts on Multiple Products | Beybazaar",
  description: "Browse all Beyblades at Beybazaar. Get 10% off when buying 2 or more! Filter by type and price to find the perfect battle top.",
  keywords: [
    "Beyblades", "Beyblade deals", "buy Beyblades", "Beyblade store",
    "Galaxy Pegasus", "Meteo L-Drago", "Beyblade discounts"
  ],
  openGraph: {
    title: "Shop Beyblades | Discounts on Multiple Products | Beybazaar",
    description: "Get the best Beyblade deals with Beybazaar. Save 10% when you buy 2 or more.",
    url: "https://beybazaar.com/list",
    siteName: "Beybazaar",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beyblade product listing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Beyblades | Discounts on Multiple Products | Beybazaar",
    description: "Get the best Beyblade deals with Beybazaar. Save 10% when you buy 2 or more.",
    images: ["/og-image.jpg"],
  },
};

const ListPage = () => {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative mt-5">
      <div className="hidden bg-black p-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-300">
            Grab 10% Off When <br />
            Buying 2 or More Products
          </h1>
        </div>
        <div className="relative w-1/6 mr-8">
          <Image
            src="/GalaxyPegasus.png"
            alt="Galaxy Pegasus"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative w-1/6 mr-8">
          <Image
            src="/MeteoLDrago.png"
            alt="Meteo L-Drago"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <Filter filters={filters} setFilters={setFilters} />

      <Suspense fallback={<div>Loading products...</div>}>
        <AllList filters={filters} />
      </Suspense>
    </div>
  );
};

export default ListPage;
