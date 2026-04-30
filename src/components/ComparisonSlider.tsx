'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function ComparisonSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Legacy Environment", 
  afterLabel = "The Built Truth" 
}: ComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMove = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize rounded-[2.5rem] border border-white/10 touch-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (The New Site) */}
      <div className="absolute inset-0">
        <Image 
          src={afterImage} 
          alt="After" 
          fill 
          className="object-cover object-top"
          priority
        />
        <div className="absolute top-6 right-6 z-20">
          <span className="text-[10px] font-mono text-[#c9a84c] tracking-[0.3em] uppercase italic bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#c9a84c]/30">
            {afterLabel}
          </span>
        </div>
      </div>

      {/* Before Image (The Legacy Site) */}
      <motion.div 
        className="absolute inset-y-0 left-0 overflow-hidden z-10"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="absolute inset-0 w-[100vw] h-full" style={{ width: containerRef.current?.offsetWidth || '100%' }}>
          <Image 
            src={beforeImage} 
            alt="Before" 
            fill 
            className="object-cover object-top grayscale"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="absolute top-6 left-6 z-20 w-max">
          <span className="text-[10px] font-mono text-white/40 tracking-[0.3em] uppercase italic bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {beforeLabel}
          </span>
        </div>
      </motion.div>

      {/* Slider Handle */}
      <motion.div 
        className="absolute inset-y-0 z-30 w-1 bg-[#c9a84c] shadow-[0_0_20px_rgba(201,168,76,0.8)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#c9a84c] rounded-full flex items-center justify-center shadow-2xl">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-black/40 rounded-full" />
            <div className="w-1 h-3 bg-black/40 rounded-full" />
          </div>
        </div>
        
        {/* Animated Scan Line */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-y-0 -left-20 w-40 bg-gradient-to-r from-transparent via-[#c9a84c]/10 to-transparent pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
