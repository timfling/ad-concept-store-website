'use client';

import React from "react";
import { motion } from "framer-motion";

const AboutHero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/about-hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Centered Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <motion.h1
          className="font-tttsarsa text-white text-3xl md:text-5xl lg:text-6xl text-center px-4 font-bold drop-shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          A Premier Supplier of High-Quality Ceramic and Porcelain Tiles.
        </motion.h1>
      </div>
    </section>
  );
};

export default AboutHero; 