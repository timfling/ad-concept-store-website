import Link from "next/link";
import React from "react";

interface CategoryCardProps {
  title: string;
  url: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, url }) => (
  <Link href={url} className="block rounded-lg border border-separator p-8 bg-secondary hover:bg-accent/10 transition-colors duration-200 shadow-sm text-center flex items-center justify-center min-h-[160px] cursor-pointer" data-cursor="block">
    <span className="font-tttsarsa text-2xl text-main-text">{title}</span>
  </Link>
);

export default CategoryCard; 