'use client';

import { m, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingCTA() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      // Show after the hero tunnel is nearly complete (approx 1.2x innerHeight)
      if (latest > window.innerHeight * 1.2) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-6 md:right-12 z-[90] pointer-events-auto"
        >
          <a
            href="#contact"
            className="flex items-center gap-3 px-6 py-4 bg-[#c9a84c] text-black text-[10px] font-black tracking-[0.2em] uppercase rounded-full shadow-[0_20px_40px_rgba(201,168,76,0.3)] backdrop-blur-md"
          >
            <span>Start My Build</span>
            <span className="text-sm">→</span>
          </a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
