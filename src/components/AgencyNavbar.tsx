'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const MobileDrawer = dynamic(() => import('./MobileDrawer'), { ssr: false });

const navLinks = [
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/#work' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Process', href: '/#process' },
  { name: 'Insights', href: '/insights' },
  { name: 'About', href: '/#about' },
];

export default function AgencyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-16 py-5 transition-all duration-400 ${
          scrolled ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[rgba(201,168,76,0.18)]' : 'bg-transparent'
        }`}
      >
        <Link href="/" className="relative z-[102] block">
          <Image 
            src="/images/logo.png" 
            alt="GRG Studios" 
            width={120} 
            height={40} 
            className="filter invert scale-110 origin-left object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                className="text-[10px] tracking-[0.18em] uppercase font-medium text-[#a3a39c] hover:text-[#c9a84c] transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-[#c9a84c] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
          <li>
            <Link 
              href="/#contact" 
              className="text-[10px] tracking-[0.18em] uppercase font-semibold text-[#080808] bg-[#c9a84c] px-5 py-2 rounded-sm hover:bg-[#e8d5a3] transition-all"
            >
              Let's Talk
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button 
          className="lg:hidden relative z-[102] w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-7 h-[1.5px] bg-[#c9a84c] rounded-sm transition-transform duration-350 ${isOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block w-7 h-[1.5px] bg-[#c9a84c] rounded-sm transition-opacity duration-250 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-7 h-[1.5px] bg-[#c9a84c] rounded-sm transition-transform duration-350 ${isOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Lazy-loaded Mobile Drawer */}
      {isOpen && <MobileDrawer isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} />}
    </>
  );
}

