import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#191919] text-gray-300 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold tracking-widest mb-4" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>
              AD CONCEPT STORE
            </div>
            <p className="text-sm leading-relaxed">
              Premium solutions for modern interiors, inspired by nature and enriched by European heritage.
            </p>
          </div>
          {/* Products */}
          <div>
            <h3 className="mb-3 text-lg tracking-wide" style={{ fontFamily: 'ZenAntiqueSoft-Regular, serif' }}>CATALOG</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog/ceramic-and-porcelain-tiles" className="transition-colors duration-300 hover:text-white" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>
                  Ceramic and porcelain tiles
                </Link>
              </li>
              <li>
                <Link href="/catalog/flexible-stone" className="transition-colors duration-300 hover:text-white" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>
                  Flexible Stone
                </Link>
              </li>
              <li>
                <Link href="/catalog/super-stone" className="transition-colors duration-300 hover:text-white" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>
                  Super Stone
                </Link>
              </li>
              <li>
                <span className="opacity-60" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>Wardrobe Systems</span>
              </li>
              <li>
                <span className="opacity-60" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>Accessories</span>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h3 className="mb-3 text-lg tracking-wide" style={{ fontFamily: 'ZenAntiqueSoft-Regular, serif' }}>COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="transition-colors duration-300 hover:text-white" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors duration-300 hover:text-white" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact & Social */}
          <div>
            <h3 className="mb-3 text-lg tracking-wide" style={{ fontFamily: 'ZenAntiqueSoft-Regular, serif' }}>CONTACT US</h3>
            <ul className="space-y-2 text-sm">
              <li>Address coming soon</li>
              <li>
                <a href="mailto:info@adconcept.store" className="transition-colors duration-300 hover:text-white" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>
                  info@adconcept.store
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-4">
              <span className="transition-colors duration-300 hover:text-white cursor-pointer" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>WhatsApp</span>
              <span className="transition-colors duration-300 hover:text-white cursor-pointer" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>Instagram</span>
            </div>
          </div>
        </div>
        {/* Sub-Footer */}
        <hr className="border-gray-700 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <div>© 2025 AD Concept Store. All Rights Reserved.</div>
          <Link href="/privacy-policy" className="transition-colors duration-300 hover:text-white" style={{ fontFamily: 'Tilda Sans, sans-serif' }}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
} 