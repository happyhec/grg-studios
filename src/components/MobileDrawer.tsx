'use client';

import { m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navLinks: { name: string; href: string }[];
}

function scrollToSection(id: string, onDone: () => void) {
  onDone(); // close drawer first
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const target = document.getElementById(id);
      if (target) {
        clearInterval(interval);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attempts > 20) {
        clearInterval(interval);
      }
    }, 100);
  }, 350); // let the drawer close animation finish first
}

export default function MobileDrawer({ isOpen, setIsOpen, navLinks }: MobileDrawerProps) {
  const pathname = usePathname();
  const isHome   = pathname === '/';
  const close    = () => setIsOpen(false);

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
        className="fixed inset-0 z-[99] bg-[#080808]/60 backdrop-blur-sm"
      />
      <m.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 z-[101] w-[320px] max-w-[85vw] h-screen bg-[#111111] border-l border-[rgba(201,168,76,0.18)] p-10 pt-24 overflow-y-auto"
      >
        <ul className="flex flex-col list-none p-0 m-0">
          {navLinks.map((link) => (
            <li key={link.name} className="border-b border-white/5">
              {link.href.startsWith('/') ? (
                // Full-path link (/insights) — always a Next.js Link
                <Link
                  href={link.href}
                  onClick={close}
                  className="block py-6 text-base tracking-[0.12em] uppercase font-medium text-[#f5f0e8] hover:text-[#c9a84c] active:pl-2 transition-all"
                >
                  {link.name}
                </Link>
              ) : isHome ? (
                // Hash link on homepage — smooth scroll
                <button
                  onClick={() => scrollToSection(link.href.replace('#', ''), close)}
                  className="w-full text-left block py-6 text-base tracking-[0.12em] uppercase font-medium text-[#f5f0e8] hover:text-[#c9a84c] active:pl-2 transition-all"
                >
                  {link.name}
                </button>
              ) : (
                // Hash link on any other page — cross-page navigation
                <Link
                  href={`/${link.href}`}
                  onClick={close}
                  className="block py-6 text-base tracking-[0.12em] uppercase font-medium text-[#f5f0e8] hover:text-[#c9a84c] active:pl-2 transition-all"
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {isHome ? (
          <button
            onClick={() => scrollToSection('contact', close)}
            className="mt-8 block w-full text-center py-4 bg-[#c9a84c] text-[#080808] text-xs tracking-[0.2em] uppercase font-bold rounded-sm hover:bg-[#e8d5a3] transition-colors"
          >
            Let's Talk
          </button>
        ) : (
          <Link
            href="/#contact"
            onClick={close}
            className="mt-8 block w-full text-center py-4 bg-[#c9a84c] text-[#080808] text-xs tracking-[0.2em] uppercase font-bold rounded-sm hover:bg-[#e8d5a3] transition-colors"
          >
            Let's Talk
          </Link>
        )}

        <div className="mt-12 pt-8 border-t border-[rgba(201,168,76,0.18)] flex flex-col gap-6">
          <a href="tel:8059106096" className="flex items-center gap-4 py-2 text-[14px] text-[#a3a39c] active:text-[#c9a84c] transition-colors">
            <span className="text-[#c9a84c] text-lg">✆</span> (805) 910-6096
          </a>

          <a href="https://instagram.com/grg_studios" target="_blank" rel="noopener" className="flex items-center gap-4 py-2 text-[14px] text-[#a3a39c] active:text-[#c9a84c] transition-colors">
            <span className="text-[#c9a84c] text-lg">◈</span> @grg_studios
          </a>
        </div>
      </m.div>
    </AnimatePresence>
  );
}
