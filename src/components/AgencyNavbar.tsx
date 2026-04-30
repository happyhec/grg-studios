'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[99] bg-[#080808]/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[101] w-[320px] max-w-[85vw] h-screen bg-[#111111] border-l border-[rgba(201,168,76,0.18)] p-10 pt-24 overflow-y-auto"
            >
              <ul className="flex flex-col list-none p-0 m-0">
                {navLinks.map((link) => (
                  <li key={link.name} className="border-b border-white/5">
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-6 text-base tracking-[0.12em] uppercase font-medium text-[#f5f0e8] hover:text-[#c9a84c] active:pl-2 transition-all"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link 
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="mt-8 block text-center py-4 bg-[#c9a84c] text-[#080808] text-xs tracking-[0.2em] uppercase font-bold rounded-sm hover:bg-[#e8d5a3] transition-colors"
              >
                Let's Talk
              </Link>

              <div className="mt-12 pt-8 border-t border-[rgba(201,168,76,0.18)] flex flex-col gap-6">
                <a href="tel:8059106096" className="flex items-center gap-4 py-2 text-[14px] text-[#a3a39c] active:text-[#c9a84c] transition-colors">
                  <span className="text-[#c9a84c] text-lg">✆</span> (805) 910-6096
                </a>
                <a href="mailto:admin@grginnovations.com" className="flex items-center gap-4 py-2 text-[14px] text-[#a3a39c] active:text-[#c9a84c] transition-colors">
                  <span className="text-[#c9a84c] text-lg">✉</span> admin@grginnovations.com
                </a>
                <a href="https://instagram.com/grg_studios" target="_blank" rel="noopener" className="flex items-center gap-4 py-2 text-[14px] text-[#a3a39c] active:text-[#c9a84c] transition-colors">
                  <span className="text-[#c9a84c] text-lg">◈</span> @grg_studios
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
