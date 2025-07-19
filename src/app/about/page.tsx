'use client';

import AboutHero from '@/components/about/AboutHero';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import ProductMarquee from '@/components/about/ProductMarquee';
import GlobalReach from '@/components/about/GlobalReach';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhyChooseUs />
      <ProductMarquee />
      <GlobalReach />
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="heading-font text-3xl sm:text-4xl font-bold mb-6 text-main-text">Our Commitment</h2>
          <p className="text-lg text-accent leading-relaxed mb-10">
            We believe in building long-term partnerships with our clients, offering not just products but ongoing support, expertise, and a shared vision for excellence in every project. Your success is our mission.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-full bg-main-text text-white text-xl font-bold transition-colors duration-300 hover:bg-accent hover:text-main-text shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
} 