'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { Sparkles, Code2, MonitorPlay } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MotionLabBanner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full bg-[#050505] border-y border-white/5 py-24 md:py-32 overflow-hidden group">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)] opacity-50" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">
                Experimental Capabilities
              </span>
            </div>
            
            <h2 className="font-rajdhani text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              THE <span className="text-[#c9a84c]">MOTION</span> LAB
            </h2>
            
            <p className="text-[#a3a39c] text-base md:text-lg max-w-lg leading-relaxed mb-10">
              We don't just build websites; we engineer cinematic digital experiences. 
              Step into the lab to explore our custom WebGL environments, 120-frame scroll-scrub sequences, and advanced motion architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/lab"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#c9a84c] text-black font-black text-xs tracking-[0.2em] uppercase rounded-full hover:bg-[#e8d5a3] transition-all duration-300 shadow-[0_0_30px_rgba(201,168,76,0.2)] hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] hover:-translate-y-1"
              >
                <MonitorPlay className="w-4 h-4" />
                Enter The Lab
              </Link>
            </div>
          </div>

          {/* Visual Glimpse Container */}
          <div className="relative aspect-[4/3] w-full rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl group-hover:border-[#c9a84c]/30 transition-colors duration-700">
            {/* Overlay Gradient for fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
            
            {/* Visuals - CSS crossfade animation */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 w-full h-full bg-[url('/assets/projects/bard-boys/hero-sequence/ezgif-frame-061.jpg')] bg-cover bg-center animate-[crossfade_8s_infinite_alternate] opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 w-full h-full bg-[url('/assets/projects/flora/rose-transition.jpg')] bg-cover bg-center animate-[crossfade-reverse_8s_infinite_alternate] opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>

            {/* Diagnostic UI Overlay */}
            <div className="absolute bottom-6 left-6 z-20 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c9a84c]" />
                <span className="text-[10px] text-white/70 uppercase tracking-widest font-mono">Cinematic Scroll</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#c9a84c]" />
                <span className="text-[10px] text-white/70 uppercase tracking-widest font-mono">Hardware Accelerated</span>
              </div>
            </div>

            {/* Top Right "Live" Indicator */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse shadow-[0_0_10px_#c9a84c]" />
              <span className="text-[9px] text-[#c9a84c] uppercase tracking-widest font-mono">System Active</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Required CSS for the crossfade since Tailwind arbitrary keyframes are clunky */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes crossfade {
          0%, 40% { opacity: 1; }
          60%, 100% { opacity: 0; }
        }
        @keyframes crossfade-reverse {
          0%, 40% { opacity: 0; }
          60%, 100% { opacity: 1; }
        }
      `}} />
    </section>
  );
}
