import React from "react";
import { fetchAPI } from "@/lib/strapi";
import CategoryCard from "@/components/catalog/CategoryCard";

export default async function CatalogPage() {
  // Fetch all main product lines (no image field to populate)
  const mainProductLines = await fetchAPI("/main-product-lines");

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="heading-font text-4xl font-bold mb-10 text-main-text">CATALOG</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Array.isArray(mainProductLines) && mainProductLines.length > 0 ? (
          mainProductLines.map((line: any) => (
            <CategoryCard
              key={line.id}
              title={line.name}
              url={`/catalog/${line.slug}`}
            />
          ))
        ) : (
          <p className="text-accent col-span-3">No categories found.</p>
        )}
      </div>
    </div>
  );
} 