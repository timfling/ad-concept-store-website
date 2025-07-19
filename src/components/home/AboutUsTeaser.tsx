'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: (
      // Placeholder SVG icon
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mx-auto mb-2 text-main-text"><circle cx="12" cy="12" r="10" /></svg>
    ),
    title: "Exceptional Quality",
    desc: "Low water absorption, stain-resistant."
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mx-auto mb-2 text-main-text"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>
    ),
    title: "Innovative Design",
    desc: "Modern, minimalist, and timeless collections."
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mx-auto mb-2 text-main-text"><path d="M12 2v20M2 12h20" /></svg>
    ),
    title: "Brand Integrity",
    desc: "Trusted partners and authentic products."
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mx-auto mb-2 text-main-text"><polygon points="12 2 2 22 22 22 12 2" /></svg>
    ),
    title: "Expert Support",
    desc: "Guidance from selection to installation."
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const AboutUsTeaser: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Column */}
        <div className="flex justify-center">
          <img
            src="/about-teaser.jpg"
            alt="Minimalist tile texture or interior"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            loading="lazy"
          />
        </div>
        {/* Text Column */}
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
        >
          <motion.h2
            className="heading-font text-3xl md:text-4xl font-bold text-main-text mb-2"
            variants={textVariants}
            custom={0}
          >
            Dedicated to Quality, Innovation, and Brand Integrity.
          </motion.h2>
          <motion.h3
            className="heading-font text-lg md:text-xl text-accent mb-6 font-semibold"
            variants={textVariants}
            custom={1}
          >
            Why Choose AD Concept Store?
          </motion.h3>
          {/* Benefits Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
            variants={containerVariants}
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="flex flex-col items-center text-center p-6 bg-secondary rounded-xl shadow group"
                variants={textVariants}
                custom={i + 2}
              >
                {benefit.icon}
                <span className="font-bold text-main-text text-lg mb-1 group-hover:text-accent transition-colors">
                  {benefit.title}
                </span>
                <span className="text-accent text-sm">
                  {benefit.desc}
                </span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={textVariants} custom={benefits.length + 2}>
            <Link
              href="/about"
              className="inline-block border border-main-text text-main-text px-8 py-3 rounded-full font-semibold transition-colors duration-300 hover:bg-main-text hover:text-white"
              data-cursor="block"
            >
              LEARN MORE
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsTeaser; 