'use client';

import { m } from 'framer-motion';

export default function Marquee({ items, speed = 25, isPill = false }: { items: string[], speed?: number, isPill?: boolean }) {
  // We duplicate the items a few times to ensure infinite seamless scrolling
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="w-full border-y border-[rgba(255,255,255,0.05)] bg-[#111111] overflow-hidden py-4 flex items-center">
      <m.div 
        className="flex shrink-0 w-max"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed
        }}
      >
        {duplicatedItems.map((item, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-4 px-8 text-[11px] tracking-[0.25em] uppercase text-[#a3a39c] font-md whitespace-nowrap shrink-0 ${isPill ? 'text-[#c9a84c] border border-[rgba(201,168,76,0.2)] rounded-full px-5 py-2 mx-2' : ''}`}
          >
            {!isPill && <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0" />}
            {item}
          </div>
        ))}
      </m.div>
    </div>
  );
}
