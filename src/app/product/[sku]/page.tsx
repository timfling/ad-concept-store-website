import { fetchAPI } from "@/lib/strapi";
import ProductClientPage from "@/components/products/ProductClientPage";

interface ProductPageProps {
  params: {
    sku: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { sku } = params;
  console.log('--- [Page.tsx] Пытаюсь найти товар с SKU:', sku);

  const strapiResponse = await fetchAPI(
    `/products?filters[sku][$eq]=${sku}&populate=images&populate=sizes&populate=collections&populate=categories`
  );

  // Извлекаем продукт, работая с "плоской" структурой
  const product = Array.isArray(strapiResponse) ? strapiResponse[0] : null;

  if (!product) {
    return <div className="text-center py-20">Product with SKU '{sku}' not found.</div>;
  }

  // Готовим пропсы, БЕЗ .attributes
  const slugsForBreadcrumbs = [
    product.categories?.data?.[0]?.name?.toLowerCase().replace(/\s+/g, "-") || "category",
    product.sku
  ];

  // Рендерим клиентский компонент
  return (
    <ProductClientPage product={product} slugs={slugsForBreadcrumbs} />
  );
} 