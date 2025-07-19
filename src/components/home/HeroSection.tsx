'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import WithHover from "@/cursor/WithHover";

const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="heading-font text-4xl md:text-6xl font-bold text-main-text mb-4 tracking-wide drop-shadow-lg">
          AD CONCEPT STORE
        </h1>
        <p className="heading-font text-lg md:text-2xl text-main-text mb-8 drop-shadow-md">
          International Frontier Design Concept
        </p>
        <WithHover type="block">
  <Link
    href="/catalog"
    className="inline-block border border-white text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 hover:bg-white hover:text-black"
  >
    VIEW CATALOG
  </Link>
</WithHover>
      </motion.div>

      {/* Scroll Down Button */}
      <a
        href="#categories"
        className="absolute left-1/2 bottom-8 -translate-x-1/2 z-10 flex flex-col items-center group"
        aria-label="Scroll to categories"
        data-cursor="block"
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-lg"
          initial={{ y: 0 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
        <span className="sr-only">Scroll Down</span>
      </a>
    </section>
  );
};

export default HeroSection; 