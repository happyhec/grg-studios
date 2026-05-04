'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

/**
 * AGENCY HERO v13 — Instant First Paint
 * - Outer wrapper changed from m.section to section so content renders
 *   immediately before framer-motion async features finish loading.
 *   (LazyMotion strict mode blocks ALL m.* rendering until features load)
 * - Inner m.div elements retain all cinematic animations
 * - LCP: logo uses priority, h1 visible on first paint
 * - TBT: CSS-only pulse, static GRID_BG constant
 */

const GRID_BG = `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120h120V0zM1 119V1h118v118H1z' fill='%23c9a84c' fill-opacity='0.1'/%3E%3C/svg%3E")`;

export default function AgencyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const slide1Opacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 1, 0]);
  const slide1Z = useTransform(scrollYProgress, [0, 0.8], [0, 4000]);
  const slide1Scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.3]);

  // Manually update DOM CSS variables because plain <section> 
  // does not auto-subscribe to MotionValues.
  useMotionValueEvent(scrollYProgress, "change", () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--slide1-opacity", slide1Opacity.get().toString());
      containerRef.current.style.setProperty("--slide1-z", `${slide1Z.get()}px`);
      containerRef.current.style.setProperty("--slide1-scale", isMobile ? "1" : slide1Scale.get().toString());
    }
  });

  // Initial style payload
  const containerStyle = {
    "--slide1-opacity": slide1Opacity.get(),
    "--slide1-z": `${slide1Z.get()}px`,
    "--slide1-scale": isMobile ? 1 : slide1Scale.get(),
  } as any;

  const slide2Opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.95], [0, 1, 1]);
  const slide2Z = useTransform(scrollYProgress, [0, 1], [-400, 1200]);
  const slide2Scale = useTransform(scrollYProgress, [0.4, 0.7, 1], [0.95, 1, 1.1]);

  const floorZ = useTransform(scrollYProgress, [0, 1], [-200, 1400]);

  const scrollToWork = () => {
    const workHeader = document.getElementById('work');
    if (workHeader) {
      workHeader.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Plain section — NOT m.section — so content renders immediately
    // before LazyMotion async features finish loading
    <section
      id="hero"
      ref={containerRef}
      style={containerStyle}
      className="relative h-screen md:h-[400vh] bg-black text-[#f5f0e8] z-0"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-10 overflow-hidden bg-black">

        {/* Cinematic Grid Backdrop */}
        <m.div
          style={{
            backgroundImage: GRID_BG,
            backgroundSize: '120px 120px',
            transformPerspective: 1200,
            rotateX: 82,
            translateZ: floorZ
          } as any}
          className="absolute bottom-0 left-[-100%] w-[300%] h-[150%] pointer-events-none opacity-20 origin-bottom will-change-transform translate-z-0"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />

        {/* SLIDE 2: LOGO + CTA */}
        <m.div
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
              priority
              className="filter invert contrast-125 brightness-150 drop-shadow-[0_0_50px_rgba(201,168,76,0.3)] w-[200px] md:w-[400px]"
            />
            {/* CSS-only pulse — no JS animation loop */}
            <div
              className="absolute inset-0 bg-[#c9a84c]/20 blur-[80px] md:blur-[100px] rounded-full scale-110 -z-10 will-change-transform"
              style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            />
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
        </m.div>

        {/* SLIDE 1: INTRO — plain div, renders immediately on first paint */}
        <div
          style={{
            opacity: "var(--slide1-opacity, 1)",
            transform: isMobile
              ? "none"
              : "perspective(1200px) translateZ(var(--slide1-z, 0px)) scale(var(--slide1-scale, 1))",
          } as any}
          className={`absolute flex flex-col items-center justify-center text-center p-6 md:p-16 rounded-[2.5rem] border border-white/5 bg-black/40 ${isMobile ? '' : 'backdrop-blur-md'} w-[90vw] max-w-[1000px] z-[30] will-change-transform`}
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

          <div className="mt-10 md:mt-14 flex flex-col items-center gap-3 w-full max-w-xl">
            {[
              "Sub-1.5s Load Times — Every Build",
              "100% Core Web Vitals Pass Rate",
              "100% Custom Code — Zero Templates",
              "Ventura County's Only Security-First Studio",
            ].map((badge) => (
              <div key={badge} className="w-full flex items-center gap-3 px-5 py-3 rounded-lg border border-white/5 bg-white/[0.03]">
                <span className="text-[#c9a84c] text-base leading-none flex-shrink-0">✦</span>
                <span className="text-[11px] md:text-[12px] tracking-[0.12em] uppercase text-white/60 font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PERSISTENT FOOTER */}
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-[4rem] right-6 md:right-[4rem] flex justify-between items-end z-[40]">
          <div className="flex flex-col items-start gap-3">
            <div className="relative w-12 md:w-14 h-[1px] bg-white/20 overflow-hidden">
              <m.div
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
