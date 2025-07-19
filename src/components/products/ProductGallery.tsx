"use client";
import React, { useState } from "react";
import Image from "next/image";

export interface ProductGalleryImage {
  id?: string | number;
  attributes?: {
    url: string;
    alternativeText?: string;
    [key: string]: any;
  };
  url?: string;
  alternativeText?: string;
  alt?: string;
  [key: string]: any;
}

export interface ProductGalleryProps {
  images: ProductGalleryImage[];
}

const getImageUrl = (img: ProductGalleryImage) => {
  const url = img.attributes?.url || img.url;
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/api$/, "")}${url}`;
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedImage = images[selectedIdx] || images[0];

  return (
    <div>
      {/* Main Image without fixed aspect ratio */}
      <div className="relative w-full max-w-[400px] mx-auto rounded-lg overflow-hidden border border-separator bg-white">
        {selectedImage ? (
          <Image
            src={getImageUrl(selectedImage)}
            alt={selectedImage.alternativeText || selectedImage.alt || selectedImage.attributes?.alternativeText || 'Product image'}
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
              alt={img.alternativeText || img.alt || img.attributes?.alternativeText || 'Product thumbnail'}
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