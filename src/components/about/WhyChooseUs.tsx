'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const benefits = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <motion.circle
          cx="24" cy="24" r="18"
          strokeDasharray="113"
          strokeDashoffset="113"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1 }}
        />
      </svg>
    ),
    title: "Exceptional Quality",
    desc: "Low water absorption (<0.1%), stain-resistant, and built to last."
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <motion.rect
          x="10" y="10" width="28" height="28" rx="6"
          strokeDasharray="112"
          strokeDashoffset="112"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1 }}
        />
      </svg>
    ),
    title: "Innovative Design",
    desc: "Modern, minimalist, and timeless collections for every space."
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M24 6v36M6 24h36"
          strokeDasharray="84"
          strokeDashoffset="84"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1 }}
        />
      </svg>
    ),
    title: "Brand Integrity",
    desc: "Trusted partners, authentic products, and transparent sourcing."
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <motion.polygon
          points="24 4 4 44 44 44 24 4"
          strokeDasharray="120"
          strokeDashoffset="120"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1 }}
        />
      </svg>
    ),
    title: "Expert Support",
    desc: "Guidance from selection to installation, every step of the way."
  },
];

const WhyChooseUs: React.FC = () => {
  const refs = benefits.map(() => useRef<HTMLDivElement>(null));
  const { scrollY } = useScroll();

  // Precompute start/end/opacity transforms for each block at the top level
  const starts = refs.map(() => 0);
  const ends = refs.map(() => 0);
  // We'll update these values in an effect if needed, but for now keep them at 0 for SSR safety
  const yRanges = starts.map((start, i) => useTransform(scrollY, [start, ends[i]], [0, 1]));
  const opacities = yRanges.map((yRange) => useTransform(yRange, [0, 0.5, 1], [0.2, 1, 0.2]));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Sticky Image */}
        <div className="sticky top-24 self-start">
          <Image
            src="/about-tile-texture.jpg"
            alt="Abstract tile texture"
            width={400}
            height={400}
            className="rounded-2xl shadow-xl w-full max-w-md object-cover"
            loading="lazy"
          />
        </div>
        {/* Scrolling Content */}
        <div className="flex flex-col gap-32">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              ref={refs[i]}
              style={{ opacity: opacities[i] }}
              className="flex flex-col items-start gap-6"
            >
              <div className="text-main-text">
                {benefit.icon}
              </div>
              <h2 className="heading-font text-2xl md:text-3xl font-bold text-main-text mb-2">
                {benefit.title}
              </h2>
              <p className="text-accent text-lg">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 