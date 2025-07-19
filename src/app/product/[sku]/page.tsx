import { fetchAPI } from "@/lib/strapi";
import ProductClientPage from "@/components/products/ProductClientPage";
import { Product } from '@/types/strapi';

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
  const product: Product | null = Array.isArray(strapiResponse) ? strapiResponse[0] : null;

  if (!product) {
    return <div className="text-center py-20">Product with SKU &apos;{sku}&apos; not found.</div>;
  }

  // Готовим пропсы, БЕЗ .attributes
  const slugsForBreadcrumbs = [
    product.attributes.category?.data?.attributes?.name?.toLowerCase().replace(/\s+/g, "-") || "category",
    product.attributes.sku
  ];

  // Рендерим клиентский компонент
  return (
    <ProductClientPage product={product} slugs={slugsForBreadcrumbs} />
  );
} 