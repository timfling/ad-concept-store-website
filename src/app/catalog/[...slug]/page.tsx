import React from "react";
import { fetchAPI } from "@/lib/strapi";
import CategoryCard from "@/components/catalog/CategoryCard";
import ProductCard from "@/components/products/ProductCard";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Image from "next/image";
import { Product, Category } from '@/types/strapi';

// New Next.js PageProps type
type CatalogSlugPageProps = {
  params: { slug: string[] };
};

// Helper to recursively render categories and products
function RenderCategoryTree({ category, allCategories, parentPath }: { category: Category, allCategories: Category[], parentPath: string[] }) {
  const children = category.attributes.children?.data || [];
  const products = category.attributes.products?.data || [];
  const currentPath = [...parentPath, category.attributes.slug];

  return (
    <div>
      <h2 className="heading-font text-2xl font-bold mb-6 text-main-text">{category.attributes.name}</h2>
      {children.length > 0 ? (
        <div className="ml-4">
          {children.map((child: Category) => (
            <RenderCategoryTree key={child.id} category={child} allCategories={allCategories} parentPath={currentPath} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-accent col-span-3">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default async function CatalogSlugPage({ params }: CatalogSlugPageProps) {
  const { slug } = params;
  const slugs = Array.isArray(slug) ? slug : [slug];

  // If only one slug, treat as MainProductLine
  if (slugs.length === 1) {
    // Fetch all categories for this main product line, deeply populated
    const mainProductLines = await fetchAPI(`/main-product-lines?filters[slug][$eq]=${slugs[0]}&populate[categories][populate][children][populate]=*`);
    const mainProductLine = mainProductLines?.[0];
    const allCategories: Category[] = mainProductLine?.attributes?.categories || [];
    // Only root categories (no parent)
    const rootCategories = allCategories.filter((cat: Category) => !cat.attributes.parent);
    return (
      <div className="max-w-7xl mx-auto py-12 px-4">
        <Breadcrumbs slugs={slugs} />
        <h1 className="heading-font text-4xl font-bold mb-10 text-main-text">{mainProductLine?.attributes?.name || "Categories"}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {rootCategories.map((cat: Category) => (
            <CategoryCard
              key={cat.id}
              title={cat.attributes.name}
              url={`/catalog/${slugs[0]}/${cat.attributes.slug}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // For any deeper path, always fetch the category by the last slug, and populate children and products
  const currentSlug = slugs[slugs.length - 1];
  const res = await fetchAPI(
    `/categories?filters[slug][$eq]=${currentSlug}&populate[children][populate]=*&populate[products][populate]=*`
  );
  const category: Category | undefined = res?.[0];

  if (!category) {
    return <div className="max-w-7xl mx-auto py-12 px-4">Category not found.</div>;
  }

  const children = category.attributes.children?.data || [];
  const products = category.attributes.products?.data || [];
  const fullPath = slugs;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <Breadcrumbs slugs={fullPath} />
      <h1 className="heading-font text-4xl font-bold mb-10 text-main-text">{category.attributes.name}</h1>
      {children.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {children.map((child: Category) => (
            <CategoryCard
              key={child.id}
              title={child.attributes.name}
              url={`/catalog/${[...fullPath, child.attributes.slug].join("/")}`}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-accent col-span-3">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
} 