'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', name: '01_START', label: 'Agency Intro' },
  { id: 'services', name: '02_SYSTEMS', label: 'Services Grid' },
  { id: 'work', name: '03_PORTFOLIO', label: 'Selected Work' },
  { id: 'process', name: '04_PROTOCOL', label: 'Process' },
  { id: 'pricing', name: '05_STRUCTURE', label: 'Investment' },
  { id: 'contact', name: '06_ENVELOPE', label: 'Connect' },
];

export default function ElevatorNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-end gap-6">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          onMouseEnter={() => setHoveredSection(section.id)}
          onMouseLeave={() => setHoveredSection(null)}
          className="group relative flex items-center justify-end"
          aria-label={`Scroll to ${section.label}`}
        >
          {/* Label Hover */}
          <AnimatePresence>
            {hoveredSection === section.id && (
              <motion.div
                initial={{ opacity: 0, x: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 10, filter: 'blur(10px)' }}
                className="absolute right-8 pr-2 flex flex-col items-end pointer-events-none"
              >
                <span className="text-[10px] font-mono text-[#c9a84c] tracking-[0.2em] uppercase whitespace-nowrap">
                  {section.name}
                </span>
                <span className="text-[9px] font-mono text-white/40 tracking-[0.1em] lowercase whitespace-nowrap">
                  {section.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav Indicator */}
          <div className="relative flex items-center justify-center w-6 h-6">
             <motion.div 
               animate={{ 
                 scale: activeSection === section.id ? 1 : 0.4,
                 opacity: activeSection === section.id ? 1 : 0.2
               }}
               className={`w-1.5 h-1.5 rounded-full bg-white transition-all duration-300 ${activeSection === section.id ? 'shadow-[0_0_10px_rgba(255,255,255,0.8)]' : ''}`}
             />
             {activeSection === section.id && (
               <motion.div 
                 layoutId="elevator-ring"
                 className="absolute inset-0 border border-white/20 rounded-full"
                 transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
               />
             )}
          </div>
        </button>
      ))}
    </nav>
  );
}
