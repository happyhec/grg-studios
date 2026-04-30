'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * AGENCY HERO v11 — Z-Overlap Force (Absolute Stability)
 * - Raw Tracking: 1:1 parity with user scroll (no spring lag)
 * - Force Overlap: Slide 2 is solid long before Slide 1 fades
 * - Proximate Start: Slide 2 starts at -300Z (massive) instead of deep space
 */
export default function AgencyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use relative progress for better device consistency
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  /**
   * Z-OVERLAP ENGINE (Progress-based)
   * Using 0-1 range ensures perfect parity across all screen heights.
   */
  
  // SLIDE 1 (The Hook)
  const slide1Opacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 1, 0]);
  const slide1Z = useTransform(scrollYProgress, [0, 0.8], [0, 4000]);
  const slide1Scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.3]); 
  
  // SLIDE 2 (The Social Proof)
  const slide2Opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.95], [0, 1, 1]);
  const slide2Z = useTransform(scrollYProgress, [0, 1], [-400, 1200]); 
  const slide2Scale = useTransform(scrollYProgress, [0.4, 0.7, 1], [0.95, 1, 1.1]);

  // GRID DEPTH
  const floorZ = useTransform(scrollYProgress, [0, 1], [-200, 1400]);

  const scrollToWork = () => {
    const workHeader = document.getElementById('work');
    if (workHeader) {
      workHeader.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative h-screen md:h-[400vh] bg-black text-[#f5f0e8] z-0"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-10 overflow-hidden bg-black">
        
        {/* Cinematic Grid Backdrop */}
        <motion.div 
          style={{ 
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            transformPerspective: 1200,
            rotateX: 82,
            translateZ: floorZ
          } as any}
          className="absolute bottom-0 left-[-100%] w-[300%] h-[150%] pointer-events-none opacity-20 origin-bottom will-change-transform"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />

        {/* SLIDE 2: LOGO + CTA (Z-Index 20) */}
        <motion.div 
          style={{ 
            opacity: slide2Opacity,
            scale: isMobile ? slide2Scale : 1,
            translateZ: isMobile ? 0 : slide2Z,
            transformPerspective: 1200
          } as any}
          className="absolute flex flex-col items-center justify-center z-[20] will-change-transform"
        >
          <div className="relative group p-8 md:p-12">
            <Image 
              src="/images/logo.png" 
              alt="GRG Studios Logo" 
              width={500} 
              height={200}
              className="filter invert contrast-125 brightness-150 drop-shadow-[0_0_50px_rgba(201,168,76,0.3)] w-[200px] md:w-[400px]"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-[#c9a84c]/20 blur-[80px] md:blur-[100px] rounded-full scale-110 -z-10 animate-pulse" />
          </div>
          <p className="mt-4 md:mt-6 font-rajdhani text-lg md:text-xl font-light text-white/30 tracking-[0.5em] uppercase px-4 text-center">
            GRG <span className="text-[#c9a84c] font-bold">STUDIOS</span>
          </p>
          <p className="mt-4 text-[11px] md:text-xs text-white/40 tracking-[0.2em] uppercase font-outfit px-4 text-center">
            Camarillo · Ventura County · California
          </p>
          
          <button 
            onClick={scrollToWork}
            className="mt-12 md:mt-14 px-12 py-5 bg-[#c9a84c] text-black text-[11px] md:text-xs font-black tracking-[0.3em] uppercase rounded-full hover:bg-[#e8d5a3] transition-all duration-500 shadow-[0_20px_60px_rgba(201,168,76,0.2)] active:scale-95"
          >
            See What We Build
          </button>
        </motion.div>

        {/* SLIDE 1: INTRO (Z-Index 30) */}
        <motion.div 
          style={{ 
            opacity: slide1Opacity,
            scale: isMobile ? slide1Scale : 1,
            translateZ: isMobile ? 0 : slide1Z,
            transformPerspective: 1200
          } as any}
          className="absolute flex flex-col items-center justify-center text-center p-8 md:p-16 rounded-[2.5rem] border border-white/5 bg-black/40 backdrop-blur-md w-[90vw] max-w-[1000px] z-[30] will-change-transform"
        >
          <p className="tracking-[0.4em] text-[10px] md:text-[11px] text-[#c9a84c] mb-6 md:mb-8 uppercase font-bold">
            Ventura County's Digital Studio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase font-rajdhani leading-[0.95] text-white max-w-[800px]">
            We Build the Systems That <em className="text-[#c9a84c] not-italic">Run</em> Your Business
          </h1>
          <p className="mt-6 md:mt-8 text-sm md:text-base text-white/40 max-w-lg leading-relaxed font-outfit font-light px-4 md:px-0">
            Custom websites, automation, and operational tools for businesses that are done with templates and ready for real growth.
          </p>

          <div className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { value: "12+", label: "Projects Shipped" },
              { value: "5", label: "Active Systems" },
              { value: "100%", label: "Custom Code" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="font-rajdhani text-2xl md:text-3xl font-bold text-[#c9a84c]">{stat.value}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* PERSISTENT FOOTER */}
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-[4rem] right-6 md:right-[4rem] flex justify-between items-end z-[40]">
           <div className="flex flex-col items-start gap-3">
             <div className="relative w-12 md:w-14 h-[1px] bg-white/20 overflow-hidden">
               <motion.div 
                  className="absolute top-0 left-0 h-full w-full bg-[#c9a84c]" 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
               />
             </div>
             <span className="text-[10px] tracking-[0.2em] uppercase text-[#a3a39c] font-medium">
               Scroll to explore
             </span>
           </div>

           <button 
             onClick={scrollToWork}
             className="hidden lg:flex text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-[#c9a84c] transition-colors border border-white/10 hover:border-[#c9a84c]/50 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full items-center gap-2"
           >
             Skip <span className="text-base leading-none">↓</span>
           </button>
        </div>

      </div>
    </section>
  );
}
