"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StrapiImage } from '@/types/strapi';

const getImageUrl = (img: StrapiImage) => {
  const url = img.attributes?.url;
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/api$/, "")}${url}`;
};

const ProductGallery: React.FC<{ images: StrapiImage[] }> = ({ images }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedImage = images[selectedIdx] || images[0];

  return (
    <div>
      {/* Main Image without fixed aspect ratio */}
      <div className="relative w-full max-w-[400px] mx-auto rounded-lg overflow-hidden border border-separator bg-white">
        {selectedImage ? (
          <Image
            src={getImageUrl(selectedImage)}
            alt={selectedImage.attributes?.name || 'Product image'}
            width={800}
            height={1200}
            className="w-full h-auto"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-accent">No Image</div>
        )}
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 flex-row justify-center">
        {images.map((img, idx) => (
          <button
            key={img.id || idx}
            className={`w-16 h-16 relative rounded overflow-hidden border-2 ${selectedIdx === idx ? 'border-black' : 'border-transparent'} focus:outline-none bg-white`}
            onClick={() => setSelectedIdx(idx)}
            type="button"
            aria-label={`Show image ${idx + 1}`}
          >
            <Image
              src={getImageUrl(img)}
              alt={img.attributes?.name || 'Product thumbnail'}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery; 