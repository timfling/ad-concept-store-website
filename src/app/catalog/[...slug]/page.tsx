import React from "react";
import { fetchAPI } from "@/lib/strapi";
import CategoryCard from "@/components/catalog/CategoryCard";
import ProductCard from "@/components/products/ProductCard";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Image from "next/image";

interface CatalogSlugPageProps {
  params: { slug: string[] };
}

// Helper to recursively fetch parent categories and build the full path
async function getCategoryPath(category: any, allCategories: any[]): Promise<string[]> {
  const path: string[] = [];
  let current = category;
  while (current) {
    path.unshift(current.slug);
    if (!current.parent) break;
    let parent = allCategories.find((cat) => cat.id === (current.parent.id || current.parent));
    if (!parent) {
      const parentRes = await fetchAPI(`/categories?filters[id][$eq]=${current.parent.id || current.parent}`);
      parent = parentRes?.[0];
      if (parent) allCategories.push(parent);
    }
    current = parent;
  }
  return path;
}

// Helper to recursively render categories and products
function RenderCategoryTree({ category, allCategories, parentPath }: { category: any, allCategories: any[], parentPath: string[] }) {
  const children = category.children?.data || category.children || [];
  const products = category.products?.data || category.products || [];
  const currentPath = [...parentPath, category.slug];

  return (
    <div>
      <h2 className="heading-font text-2xl font-bold mb-6 text-main-text">{category.name}</h2>
      {children.length > 0 ? (
        <div className="ml-4">
          {children.map((child: any) => (
            <RenderCategoryTree key={child.id} category={child} allCategories={allCategories} parentPath={currentPath} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} categoryPath={currentPath} />
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
    const allCategories = mainProductLine?.categories || [];
    // Only root categories (no parent)
    const rootCategories = allCategories.filter((cat: any) => !cat.parent);
    return (
      <div className="max-w-7xl mx-auto py-12 px-4">
        <Breadcrumbs slugs={slugs} />
        <h1 className="heading-font text-4xl font-bold mb-10 text-main-text">{mainProductLine?.name || "Categories"}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {rootCategories.map((cat: any) => (
            <CategoryCard
              key={cat.id}
              title={cat.name}
              url={`/catalog/${slugs[0]}/${cat.slug}`}
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
  const category = res?.[0];

  if (!category) {
    // Try to fetch product by SKU if no category found
    const productRes = await fetchAPI(`/products?filters[sku][$eq]=${currentSlug}&populate=*`);
    const product = productRes?.[0]?.attributes ? { id: productRes[0].id, ...productRes[0].attributes } : productRes?.[0];
    if (product) {
      // Inline product detail rendering (copied from product page)
      const images = product.images?.data || product.images || [];
      const sizes = product.sizes?.data || product.sizes || [];
      const thicknesses = product.thicknesses?.data || product.thicknesses || [];
      const technicalInfo = product.technicalInfo || product.technical_info || "";
      const title = product.title || "Untitled";
      const getImageUrl = (img: any) => {
        const url = img.attributes?.url || img.url;
        if (!url) return "";
        return url.startsWith("http")
          ? url
          : `${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/api$/, "")}${url}`;
      };
      return (
        <div className="max-w-7xl mx-auto py-12 px-4">
          <Breadcrumbs slugs={slugs.slice(0, -1)} />
          <h1 className="heading-font text-3xl font-bold text-main-text mb-2">{title}</h1>
          <p className="text-accent text-lg mb-2">SKU: {product.sku}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Gallery */}
            <div>
              {images.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-96 rounded-lg overflow-hidden border border-separator">
                    <Image
                      src={getImageUrl(images[0])}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {images.map((img: any, idx: number) => (
                      <div key={img.id || idx} className="w-20 h-20 relative rounded border border-separator overflow-hidden">
                        <Image
                          src={getImageUrl(img)}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 bg-secondary flex items-center justify-center text-accent rounded-lg border border-separator">No Image</div>
              )}
            </div>
            {/* Product Info */}
            <div className="flex flex-col gap-6">
              {technicalInfo && (
                <div>
                  <h2 className="font-semibold text-main-text mb-1">Technical Info</h2>
                  <p className="text-accent whitespace-pre-line">{technicalInfo}</p>
                </div>
              )}
              <div>
                <h2 className="font-semibold text-main-text mb-1">Available Sizes</h2>
                {sizes.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {sizes.map((size: any) => (
                      <li key={size.id} className="bg-secondary px-3 py-1 rounded text-main-text border border-separator text-sm">
                        {size.attributes?.name || size.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-accent text-sm">No sizes available</span>
                )}
              </div>
              {thicknesses.length > 0 && (
                <div>
                  <h2 className="font-semibold text-main-text mb-1">Available Thicknesses</h2>
                  <ul className="flex flex-wrap gap-2">
                    {thicknesses.map((thick: any) => (
                      <li key={thick.id} className="bg-secondary px-3 py-1 rounded text-main-text border border-separator text-sm">
                        {thick.attributes?.name || thick.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    return <div className="max-w-7xl mx-auto py-12 px-4">Category or product not found.</div>;
  }

  const children = category.children?.data || category.children || [];
  const products = category.products?.data || category.products || [];
  const fullPath = slugs;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <Breadcrumbs slugs={fullPath} />
      <h1 className="heading-font text-4xl font-bold mb-10 text-main-text">{category.name}</h1>
      {children.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {children.map((child: any) => (
            <CategoryCard
              key={child.id}
              title={child.name}
              url={`/catalog/${[...fullPath, child.slug].join("/")}`}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} categoryPath={fullPath} />
            ))
          ) : (
            <p className="text-accent col-span-3">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
} 