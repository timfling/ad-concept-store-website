import Link from "next/link";
import React from "react";

interface BreadcrumbsProps {
  slugs: string[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ slugs }) => {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/catalog" },
    ...slugs.map((slug, idx) => ({
      name: slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      href: `/catalog/${slugs.slice(0, idx + 1).join("/")}`,
    })),
  ];

  return (
    <nav className="mb-6 text-sm text-accent flex items-center gap-2" aria-label="Breadcrumb">
      {crumbs.map((crumb, idx) => (
        <span key={crumb.href} className="flex items-center">
          <Link href={crumb.href} className="hover:underline">
            {crumb.name}
          </Link>
          {idx < crumbs.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs; 