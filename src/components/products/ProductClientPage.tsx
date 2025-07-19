'use client';
import React from 'react';
import ProductGallery, { ProductGalleryImage } from './ProductGallery';
import ProductInfo, { ProductInfoProduct } from './ProductInfo';
import GoBackButton from '../ui/GoBackButton';
import Breadcrumbs from '../catalog/Breadcrumbs';

export interface ProductClientPageProps {
  product: ProductInfoProduct;
  slugs: string[];
}

const ProductClientPage: React.FC<ProductClientPageProps> = ({ product, slugs }) => {
  // For gallery, support both images.data and images
  const images: ProductGalleryImage[] = (product.images?.data || product.images || []) as ProductGalleryImage[];
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <Breadcrumbs slugs={slugs} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery images={images} />
        <ProductInfo product={product} />
      </div>
      <div className="mt-8">
        <GoBackButton />
      </div>
    </div>
  );
};

export default ProductClientPage; 