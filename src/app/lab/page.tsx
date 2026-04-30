'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MonitorPlay, Smartphone } from 'lucide-react';
import dynamic from 'next/dynamic';

const BardBoysShowcase = dynamic(() => import('@/components/BardBoysShowcase'), { ssr: false });
const FloraShowcase = dynamic(() => import('@/components/FloraShowcase'), { ssr: false });
const SunflowerShowcase = dynamic(() => import('@/components/SunflowerShowcase'), { ssr: false });

export default function MotionLabPage() {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [hasDismissedOverlay, setHasDismissedOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Check if it's a mobile device in portrait mode
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setIsPortraitMobile(mobile && isPortrait);
    };

    checkOrientation();
    setMounted(true);
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!mounted) return <main className="bg-black min-h-screen" />; // Prevent hydration mismatch flash

  return (
    <main className="bg-black min-h-screen text-[#f5f0e8] relative selection:bg-[#c9a84c] selection:text-black">
      
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex items-center justify-between pointer-events-none">
        <Link 
          href="/"
          className="pointer-events-auto flex items-center gap-3 text-[10px] tracking-widest uppercase font-mono text-[#a3a39c] hover:text-[#c9a84c] transition-colors bg-black/40 backdrop-blur-md border border-white/5 px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main
        </Link>
        <div className="hidden md:flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/5 px-4 py-2 rounded-full pointer-events-auto">
          <MonitorPlay className="w-4 h-4 text-[#c9a84c]" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#a3a39c]">
            Best Viewed on Desktop
          </span>
        </div>
      </header>

      {/* Intro Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6 bg-[#c9a84c]/10 border border-[#c9a84c]/20 px-6 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">
              Experimental Zone
            </span>
          </div>
          <h1 className="font-rajdhani text-5xl md:text-8xl font-bold text-white mb-6 uppercase tracking-tighter">
            Motion <span className="text-[#c9a84c]">Architecture</span>
          </h1>
          <p className="text-[#a3a39c] text-lg max-w-2xl mx-auto font-outfit leading-relaxed">
            Welcome to the Lab. These are heavy, cinematic scroll sequences leveraging custom WebGL wrappers, GSAP, and Framer Motion. 
            Scroll down to experience how we turn standard web pages into interactive film.
          </p>
        </div>
      </section>

      {/* Showcases */}
      <div className="relative">
        {isMobile ? (
          <MobileLabView />
        ) : (
          <>
            <BardBoysShowcase />
            <FloraShowcase />
            <SunflowerShowcase />
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-white/5">
        <p className="text-[#a3a39c] text-sm mb-6">Want to integrate cinematic motion into your brand?</p>
        <Link 
          href="/#contact"
          className="inline-flex items-center justify-center px-8 py-3 bg-[#c9a84c] text-black font-black text-[11px] tracking-[0.2em] uppercase rounded-full hover:bg-[#e8d5a3] transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.2)]"
        >
          Start a Project
        </Link>
      </footer>

      {/* Mobile Portrait Rotation Overlay */}
      <AnimatePresence>
        {isPortraitMobile && !hasDismissedOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            <Smartphone className="w-16 h-16 text-[#c9a84c] mb-6 animate-[spin_3s_ease-in-out_infinite]" />
            <h2 className="font-rajdhani text-3xl font-bold text-white mb-4 uppercase">
              Rotate Device
            </h2>
            <p className="text-[#a3a39c] font-outfit max-w-xs mb-8">
              Please rotate your device horizontally for the best cinematic experience, or view on a desktop computer.
            </p>
            <button
              onClick={() => setHasDismissedOverlay(true)}
              className="px-6 py-2 border border-white/20 text-white/50 text-[10px] uppercase tracking-widest rounded-full hover:bg-white/5 transition-colors"
            >
              Continue Anyway
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

function MobileLabView() {
  return (
    <div className="px-6 py-12 space-y-24 max-w-lg mx-auto">
      <MobileLabCard 
        title="BARD BOYS"
        subtitle="Case Study A"
        desc="Architecting cinematic scroll sequences requires hundreds of hours of 3D rendering, frame-by-frame compiling, and WebGL optimization. We don't use templates—we build bespoke, high-end visual systems that command authority and justify premium pricing."
        image="/assets/projects/bard-boys/hero-sequence/ezgif-frame-061.jpg"
        link="https://instagram.com/grg_studios"
      />
      <MobileLabCard 
        title="FLORA"
        subtitle="Case Study B"
        desc="A 120-frame WebGL interactive sequence built to transform a static product into a tactile, cinematic experience. Engineered for ultra-smooth scrub interactions."
        image="/assets/projects/flora/rose-bloom/ezgif-frame-061.jpg"
        link="https://instagram.com/grg_studios"
      />
      <MobileLabCard 
        title="SUNFLOWER"
        subtitle="Case Study C"
        desc="High-fidelity 3D rendering integrated directly into the scroll timeline. Optimized to run at 60fps within a headless React architecture."
        image="/assets/projects/flora/sunflower/ezgif-frame-070.jpg"
        link="https://instagram.com/grg_studios"
      />
    </div>
  );
}

import Image from 'next/image';

function MobileLabCard({ title, subtitle, desc, image, link }: { title: string, subtitle: string, desc: string, image: string, link: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
        <Image src={image} alt={title} fill className="object-cover opacity-80 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-[#c9a84c] font-bold tracking-[0.4em] uppercase text-[10px] mb-2 block drop-shadow-md">{subtitle}</span>
          <h2 className="text-5xl font-bebas text-white leading-none mb-6 drop-shadow-lg">{title}</h2>
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-full text-[10px] tracking-widest uppercase hover:bg-white/20 hover:scale-105 transition-all">
            View on Instagram <ArrowLeft className="w-3 h-3 rotate-[135deg]" />
          </a>
        </div>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
