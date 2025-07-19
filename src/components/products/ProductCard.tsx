import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from '@/types/strapi';

interface ProductCardProps {
  product: any;
  categoryPath?: string[];
}

export default function ProductCard({ product, categoryPath }: { product: Product; categoryPath?: string[] }) {
  const data = product.attributes;
  const images = data.images?.data || [];
  const title = data.title || "Untitled";
  const sku = data.sku || "";

  let imageUrl: string | null = null;
  if (Array.isArray(images) && images[0]?.attributes?.url) {
    imageUrl = images[0].attributes.url.startsWith("http")
      ? images[0].attributes.url
      : `${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/api$/, "")}${images[0].attributes.url}`;
  } else if (Array.isArray(images) && images[0]?.url) {
    imageUrl = images[0].url.startsWith("http")
      ? images[0].url
      : `${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/api$/, "")}${images[0].url}`;
  }

  const productLink = `/product/${sku}`;

  return (
    <Link href={productLink} className="block" data-cursor="block">
      <div className="bg-white rounded-lg overflow-hidden shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer border border-separator">
        {imageUrl ? (
          <div className="aspect-w-1 aspect-h-1 w-full h-48 relative">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
            />
          </div>
        ) : (
          <div className="aspect-w-1 aspect-h-1 w-full h-48 bg-secondary flex items-center justify-center text-accent">
            No Image
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 heading-font text-main-text">{title}</h3>
          <p className="text-accent text-sm">SKU: {sku}</p>
        </div>
      </div>
    </Link>
  );
} 