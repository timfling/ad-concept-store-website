import React from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/strapi";

// Hardcoded image mapping for main product lines (slug => image path)
const productLineImages: Record<string, string> = {
  "keramogranit": "/main-lines/keramogranit.jpg",
  "plitka": "/main-lines/plitka.jpg",
  "mozaika": "/main-lines/mozaika.jpg",
  "kamni": "/main-lines/kamni.jpg",
  "santekhnika": "/main-lines/santekhnika.jpg",
};

function getImageForLine(slug: string, idx: number) {
  // fallback to a default image if not found
  return productLineImages[slug] || `/main-lines/placeholder${idx + 1}.jpg`;
}

export default async function CategoriesSection() {
  // Fetch 3 main product lines (no sort param)
  const mainProductLines = await fetchAPI("/main-product-lines?pagination[limit]=3");
  // Use the first 3
  const lines = Array.isArray(mainProductLines) ? mainProductLines.slice(0, 3) : [];
  if (lines.length === 0) return null;

  return (
    <section id="categories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lines.map((line, idx) => (
            <Link
              key={line.id}
              href={`/catalog/${line.slug}`}
              className="group relative min-h-[240px] rounded-2xl overflow-hidden flex items-end shadow-lg"
              data-cursor="block"
            >
              <div
                className="absolute inset-0 bg-black/50 z-0 transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${getImageForLine(line.slug, idx)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="relative z-10 w-full text-center py-12">
                <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg transition group-hover:brightness-125">
                  {line.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/catalog"
            className="inline-block border border-main-text text-main-text px-8 py-3 rounded-full font-semibold transition-colors duration-300 hover:bg-main-text hover:text-white"
            data-cursor="block"
          >
            EXPLORE FULL CATALOG
          </Link>
        </div>
      </div>
    </section>
  );
} 