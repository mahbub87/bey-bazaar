"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import Image from "next/image";
import Filter from "../components/Filter";
import AllList from "../components/AllList";

const ListPage = () => {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative mt-10">
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
