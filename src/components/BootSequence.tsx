'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BootSequence() {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timing = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 1000),
      setTimeout(() => setIsVisible(false), 1600)
    ];

    return () => timing.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col gap-3 font-mono text-[10px] md:text-sm text-[#c9a84c] opacity-80 uppercase tracking-widest text-left">
            <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
              &gt; SYS.INIT : GRG_ARCHITECTURE_MODULE
            </m.p>
            {step >= 1 && (
              <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                &gt; ESTABLISHING_IMPACT... [OK]
              </m.p>
            )}
            {step >= 2 && (
              <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                &gt; COMPILING_SYSTEMS... [BUILT_FOR_SCALE]
              </m.p>
            )}
            {step >= 3 && (
              <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }} className="text-white mt-4 font-bold">
                &gt; DEPLOYING FLAGSHIP RESOURCES
              </m.p>
            )}
            
            <div className="w-[150px] h-[1px] bg-white/10 mt-6 relative overflow-hidden">
               <m.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: step >= 3 ? "100%" : "0%" }}
                 transition={{ duration: 0.8, ease: "linear" }}
                 className="absolute inset-0 bg-[#c9a84c]"
               />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
