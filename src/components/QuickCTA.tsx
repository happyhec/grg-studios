'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function QuickCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 right-6 lg:right-10 z-[100]"
        >
          <button
            onClick={scrollToContact}
            className="group relative px-8 py-4 bg-white text-black font-bold text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-500">
              Start my build
            </span>
            
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-[#c9a84c] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            
            {/* Pulsing Ring */}
            <div className="absolute -inset-1 border border-white/20 rounded-full animate-pulse pointer-events-none" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
