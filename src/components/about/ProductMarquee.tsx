import React from "react";

const marqueeText = [
  "Polished Porcelain Tiles",
  "Glazed Tiles",
  "Micro-crystalline Tiles",
  "Rustic Tiles",
  "Wood-effect Porcelain",
  "Ultra-thin Tiles",
  "Large-format Tiles",
  "Mosaic Tiles",
  "Outdoor Pavers",
  "Wall Cladding",
  "Decorative Borders",
  "Hexagonal Tiles",
  "Marble-effect Tiles",
  "Cement-look Tiles",
  "Stone-effect Tiles",
  "Anti-slip Tiles",
  "Swimming Pool Tiles",
  "3D Relief Tiles",
  "Subway Tiles",
  "Terracotta Tiles"
];

const separator = (
  <span className="mx-4 text-accent text-2xl align-middle">&middot;</span>
);

const ProductMarquee: React.FC = () => {
  // Duplicate the text for seamless looping
  const content = (
    <>
      {marqueeText.map((item, idx) => (
        <span key={item + idx} className="whitespace-nowrap heading-font text-xl md:text-2xl text-main-text font-semibold">
          {item}
          {idx < marqueeText.length - 1 && separator}
        </span>
      ))}
    </>
  );

  return (
    <section className="overflow-hidden bg-secondary py-6 border-y border-separator">
      <div className="relative w-full">
        <div className="marquee flex whitespace-nowrap">
          {content}
          {content}
        </div>
      </div>
      <style jsx>{`
        .marquee {
          animation: marquee-scroll 40s linear infinite;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ProductMarquee; 