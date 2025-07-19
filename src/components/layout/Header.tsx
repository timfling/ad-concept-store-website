import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { name: 'CATALOG', href: '/catalog' },
  { name: 'ABOUT US', href: '/about' },
  { name: 'CONTACT US', href: '/contact' },
];

export default function Header() {
  return (
    <header className="bg-white border-b border-separator w-full">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between py-4 px-4 gap-2 sm:gap-0">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start" data-cursor="block">
          <Image
            src="/Logo (transp bg).png"
            alt="AD Concept Store Logo"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="text-lg font-bold tracking-wide text-main-text">AD CONCEPT STORE</span>
        </Link>
        {/* Navigation */}
        <nav className="w-full sm:w-auto flex justify-center">
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full sm:w-auto items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="uppercase text-sm font-medium text-accent hover:text-main-text transition-colors px-4 py-2"
                  data-cursor="block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
} 