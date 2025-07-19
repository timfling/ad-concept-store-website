import React from "react";
import { Product } from '@/types/strapi';

export interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<{ product: Product }> = ({ product }) => {
  const data = product.attributes;
  const sizes = data.sizes?.data || [];
  const thicknessSet = new Set(
    sizes.map((size) => size.attributes?.thickness_mm).filter(Boolean)
  );
  const thicknesses = Array.from(thicknessSet);
  const collections = data.collections?.data || [];
  const collection = collections[0]?.attributes?.name || "";
  const technicalInfo = data.technical_info || "";

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-main-text mb-2" style={{ fontFamily: 'TTTsarsA, sans-serif' }}>{data.title}</h1>
      {/* SKU */}
      <p className="text-gray-500 text-lg mb-2">SKU: {data.sku}</p>
      {/* Available Sizes */}
      <div>
        <h2 className="font-semibold text-main-text mb-1">Available Sizes</h2>
        {sizes.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <li key={size.id} className="bg-secondary px-3 py-1 rounded-full text-main-text border border-separator text-sm cursor-pointer select-none">
                {size.attributes?.size_mm}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-accent text-sm">No sizes available</span>
        )}
      </div>
      {/* Available Thicknesses */}
      <div>
        <h2 className="font-semibold text-main-text mb-1">Available Thicknesses</h2>
        {thicknesses.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {thicknesses.map((thick, idx) => (
              <li key={thick || idx} className="bg-secondary px-3 py-1 rounded-full text-main-text border border-separator text-sm cursor-pointer select-none">
                {thick}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-accent text-sm">No thicknesses available</span>
        )}
      </div>
      {/* Collection */}
      {collection && (
        <div>
          <h2 className="font-semibold text-main-text mb-1">Collection</h2>
          <p className="text-accent whitespace-pre-line">{collection}</p>
        </div>
      )}
      {/* Technical Details */}
      {technicalInfo && (
        <div>
          <h2 className="font-semibold text-main-text mb-1">Technical Details</h2>
          <p className="text-accent whitespace-pre-line">{technicalInfo}</p>
        </div>
      )}
    </div>
  );
};

export default ProductInfo; 