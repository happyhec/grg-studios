'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cases = [
  { id: 'case-bardboys', num: '01', title: 'BARD BOYS', color: '#c9a84c' },
  { id: 'case-eggs', num: '02', title: 'EGGS \'N\' THINGS', color: '#a18a4d' },
  { id: 'case-flora', num: '03', title: 'FLORA SYND.', color: '#c9a84c' },
];

export default function HUDMenu() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isScrolledIntoWork, setIsScrolledIntoWork] = useState(false);

  useEffect(() => {
    const workSection = document.getElementById('work');
    if (!workSection) return;

    // Track if we are in the flagship work section globally
    const workObserver = new IntersectionObserver(
      ([entry]) => setIsScrolledIntoWork(entry.isIntersecting),
      { rootMargin: '-20% 0px -80% 0px' }
    );
    workObserver.observe(workSection);

    // Track active case study
    const caseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -40% 0px' }
    );

    cases.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) caseObserver.observe(el);
    });

    return () => {
      workObserver.disconnect();
      caseObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isScrolledIntoWork && activeId && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] flex flex-col items-end gap-6 pointer-events-none text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
        >
          <div className="flex flex-col gap-4 items-center">
            {cases.map((c) => {
              const isActive = activeId === c.id;
              return (
                <div key={c.id} className="relative group pointer-events-auto cursor-pointer" onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className={`transition-all duration-300 flex items-center justify-center font-rajdhani ${isActive ? 'scale-125' : 'scale-100 opacity-30 grayscale'}`}>
                     <span className={`text-[10px] font-bold`} style={{ color: isActive ? c.color : 'white' }}>
                       {c.num}
                     </span>
                  </div>
                  {/* Tooltip */}
                  {isActive && (
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/50">{c.title}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Vertical Track */}
          <div className="h-[100px] w-[1px] bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "200%"] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[#c9a84c] opacity-50"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
