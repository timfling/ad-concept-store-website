// src/types/strapi.ts

interface StrapiBase {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    url: string;
    // Add other image attributes if needed
  };
}

export interface StrapiRelation<T> {
  data: T[];
}

export interface StrapiSingleRelation<T> {
  data: T;
}

export interface SizeAttributes {
  size_mm: string;
  size_in: string;
  thickness_mm: number;
}
export type Size = StrapiBase & { attributes: SizeAttributes };

export interface CollectionAttributes {
  name: string;
}
export type Collection = StrapiBase & { attributes: CollectionAttributes };

export interface CategoryAttributes {
  name: string;
  slug: string;
  children: StrapiRelation<Category>;
  products: StrapiRelation<Product>;
  parent?: StrapiSingleRelation<Category>;
}
export type Category = StrapiBase & { attributes: CategoryAttributes };

export interface ProductAttributes {
  title: string;
  sku: string;
  technical_info: string;
  faces_patterns: string;
  images: StrapiRelation<StrapiImage>;
  sizes: StrapiRelation<Size>;
  collections: StrapiRelation<Collection>;
  category: StrapiSingleRelation<Category>;
}
export type Product = StrapiBase & { attributes: ProductAttributes };

export interface MainProductLineAttributes {
  name: string;
  slug: string;
  image: StrapiSingleRelation<StrapiImage>;
  categories: StrapiRelation<Category>;
}
export type MainProductLine = StrapiBase & { attributes: MainProductLineAttributes }; 