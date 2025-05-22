import Image from "next/image";
import Link from "next/link";
import AutoSlider from "./components/AutoSlider";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <div className="">
      <AutoSlider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-4xl font-bold text-center mb-10">FEATURED</h1>
        <ProductList />
      </div>
    </div>
  );
}
