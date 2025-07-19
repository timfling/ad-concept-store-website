import React from "react";

export interface ProductInfoProduct {
  id?: string | number;
  title: string;
  sku: string;
  sizes?: {
    data?: Array<{
      id?: string | number;
      size_mm?: string | number;
      thickness_mm?: string | number;
      [key: string]: any;
    }>;
  } | Array<any>;
  collections?: {
    data?: Array<{
      id?: string | number;
      name: string;
      [key: string]: any;
    }>;
  } | Array<any>;
  technical_info?: string;
  categories?: {
    data?: Array<{
      id?: string | number;
      name: string;
      [key: string]: any;
    }>;
  } | Array<any>;
  images?: any;
  [key: string]: any;
}

export interface ProductInfoProps {
  product: ProductInfoProduct;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  // Support both { sizes: { data: [...] } } and { sizes: [...] }
  const sizes = Array.isArray(product.sizes)
    ? product.sizes
    : product.sizes?.data || [];
  // Gather unique thicknesses from sizes
  const thicknessSet = new Set(
    sizes.map((size: any) => size.thickness_mm).filter(Boolean)
  );
  const thicknesses = Array.from(thicknessSet);
  // Support both { collections: { data: [...] } } and { collections: [...] }
  const collections = Array.isArray(product.collections)
    ? product.collections
    : product.collections?.data || [];
  const collection = collections[0]?.name || "";
  const technicalInfo = product.technical_info || "";

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-main-text mb-2" style={{ fontFamily: 'TTTsarsA, sans-serif' }}>{product.title}</h1>
      {/* SKU */}
      <p className="text-gray-500 text-lg mb-2">SKU: {product.sku}</p>
      {/* Available Sizes */}
      <div>
        <h2 className="font-semibold text-main-text mb-1">Available Sizes</h2>
        {sizes.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {sizes.map((size: any) => (
              <li key={size.id} className="bg-secondary px-3 py-1 rounded-full text-main-text border border-separator text-sm cursor-pointer select-none">
                {size.size_mm}
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
            {thicknesses.map((thick: any, idx: number) => (
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