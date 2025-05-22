"use client";
import { useState, useRef } from "react";
import Image from "next/image";

const ProductImages = ({ image_url, box }) => {
  const [mainImage, setMainImage] = useState(image_url);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const imageContainerRef = useRef(null);

  const thumbnails = [image_url, box].filter(Boolean);

  const handleMouseMove = (e) => {
    const container = imageContainerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setZoomStyle({
      display: "block",
      top: `${e.clientY}px`,
      left: `${e.clientX}px`,
      transform: "translate(-50%, -50%)",
      backgroundImage: `url(${mainImage})`,
      backgroundSize: `${width * 2}px ${height * 2}px`,
      backgroundPosition: `${xPercent}% ${yPercent}%`,
    });
  };

  return (
    <div>
      {/* Main Image */}
      <div
        className="w-[500px] h-[500px] relative mx-auto overflow-hidden"
        ref={imageContainerRef}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={mainImage}
          alt="Main image"
          fill
          className="object-contain rounded-md"
        />
        {/* Zoom Box */}
        {showZoom && (
          <div
            className="w-[200px] h-[200px] border border-gray-400 rounded shadow-lg fixed z-50 bg-no-repeat pointer-events-none"
            style={zoomStyle}
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-start gap-4 mt-8">
        {thumbnails.map((img, index) => (
          <div
            key={index}
            onClick={() => setMainImage(img)}
            className="w-32 h-32 p-2 border border-gray-500 rounded cursor-pointer flex justify-center items-center bg-black"
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              width={112}
              height={112}
              className="object-contain rounded w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
