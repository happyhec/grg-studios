'use client';

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 'bard-boys', short: 'BB', name: 'Bard Boys' },
  { id: 'eggs-n-things', short: 'ENT', name: 'Eggs n Things' },
  { id: 'flora-syndicate', short: 'FS', name: 'Flora Syndicate' },
  { id: 'conejo-services', short: 'CS', name: 'Conejo Services' },
  { id: 'mayras-helping', short: 'MHH', name: 'Mayras' },
];

export default function WorkNavigator() {
  const [activeProject, setActiveProject] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const workSection = document.getElementById('work');
      if (!workSection) return;

      const rect = workSection.getBoundingClientRect();
      const scrollThreshold = 200; // Show slightly before reaching the section
      
      setIsVisible(rect.top < scrollThreshold && rect.bottom > 0);

      // Simple active state detection
      projects.forEach((p) => {
        const el = document.getElementById(p.id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top < 300 && r.bottom > 300) {
            setActiveProject(p.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProject = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Account for the sticky nav itself
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4"
        >
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 flex items-center gap-1 shadow-2xl">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => scrollToProject(p.id)}
                className={`
                  relative px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300
                  ${activeProject === p.id 
                    ? 'text-white bg-white/10' 
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'}
                `}
              >
                {/* Mobile: Shortcodes, Desktop: Show names? (Using shortcodes as per user's HUD preference) */}
                <span>{p.short}</span>
                
                {activeProject === p.id && (
                  <m.div
                    layoutId="active-pill"
                    className="absolute inset-0 border border-white/20 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </m.nav>
      )}
    </AnimatePresence>
  );
}
