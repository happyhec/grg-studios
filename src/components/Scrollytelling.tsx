"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from 'framer-motion';

const BARD_BOYS_PROMPTS = [
  `// PHASE 1: GENERATE CINEMATIC HERO
System.Execute({
  target: "BardBoys.Hero",
  directive: "Inject full-width autoplaying video. Apply dark overlay for text contrast. Use premium typography.",
  styling: "Tailwind, Framer Motion",
  typography: ["Cinzel", "Inter"]
});`,
  `// PHASE 2: AGE VERIFICATION GATE
System.Layer({
  module: "AgeGate.Modal",
  security: "Require 21+ validation",
  aesthetic: "Glassmorphism, extreme backdrop-blur(20px)",
  ux: "Block scroll until verified. On success, fade out with 0.8s duration."
});`,
  `// PHASE 3: GHOST TYPOGRAPHY
System.Deploy({
  component: "Products.GhostText",
  behavior: "OnHover -> illuminate text, reveal product image",
  css: "color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.2); transition: all 0.4s ease;"
});`
];

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map the continuous scroll progress [0, 1] to discrete stages [0, 1, 2]
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const stage2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const stage3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0a0a0a]">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen w-full flex-col md:flex-row">
        
        {/* Left Column: The Blueprint Terminal */}
        <div className="flex h-1/2 w-full flex-col justify-center border-b border-white/5 bg-black/50 p-8 md:h-full md:w-[40%] md:border-b-0 md:border-r">
          <div className="mb-10 text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-5 rounded-full border border-emerald-500/30 flex items-center justify-center">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-emerald-500/80 font-bold">Beyond the Visual</span>
            </div>
            <h2 className="font-rajdhani text-4xl font-light text-white uppercase tracking-widest leading-tight">
              Cinematic <em className="text-emerald-500 not-italic">Infrastructure</em>
            </h2>
            <p className="mt-4 text-white/30 text-sm leading-relaxed max-w-sm">
              Architecting the front-end orchestration and security gates for Ventura's premium genetic boutique.
            </p>
          </div>

          <div className="mb-6 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/50" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
            <div className="h-3 w-3 rounded-full bg-green-500/50" />
            <span className="ml-4 font-mono text-xs text-white/30">terminal ~ agent-core</span>
          </div>
          
          <div className="relative h-[200px] w-full font-mono text-sm leading-relaxed text-emerald-400/80 md:text-base">
            <m.pre style={{ opacity: stage1Opacity }} className="absolute inset-0 whitespace-pre-wrap">
              {BARD_BOYS_PROMPTS[0]}
            </m.pre>
            <m.pre style={{ opacity: stage2Opacity }} className="absolute inset-0 whitespace-pre-wrap">
              {BARD_BOYS_PROMPTS[1]}
            </m.pre>
            <m.pre style={{ opacity: stage3Opacity }} className="absolute inset-0 whitespace-pre-wrap">
              {BARD_BOYS_PROMPTS[2]}
            </m.pre>
          </div>
        </div>

        {/* Right Column: The Product Render */}
        <div className="relative flex h-1/2 w-full items-center justify-center overflow-hidden bg-[#111] p-4 md:h-full md:w-[60%] md:p-12">
          
          {/* Stage 1: Hero Video (Simulated) */}
          <m.div 
            style={{ opacity: stage1Opacity }} 
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542044801-4470d0abf37c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center brightness-50 grayscale" />
             <div className="relative z-10 border border-white/10 bg-black/40 p-12 backdrop-blur-md">
                <h2 className="font-serif text-5xl tracking-widest text-white">BARD BOYS</h2>
                <div className="mt-4 h-[1px] w-24 mx-auto bg-white/30" />
             </div>
          </m.div>

          {/* Stage 2: Age Gate */}
          <m.div 
            style={{ opacity: stage2Opacity }} 
            className="absolute inset-0 flex items-center justify-center bg-black/90 p-8"
          >
             <div className="glass-panel w-full max-w-md rounded-2xl p-10 text-center">
                <h3 className="font-outfit text-3xl font-light text-white">Age Verification</h3>
                <p className="mt-4 text-white/50 text-sm">You must be 21+ to enter.</p>
                <div className="mt-8 flex gap-4">
                  <button className="flex-1 rounded border border-white/10 bg-white/5 py-3 transition hover:bg-white/10">Under 21</button>
                  <button className="flex-1 rounded bg-white py-3 font-bold text-black border border-white transition hover:bg-white/90">I am 21+</button>
                </div>
             </div>
          </m.div>

          {/* Stage 3: Ghost Typography */}
          <m.div 
            style={{ opacity: stage3Opacity }} 
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-[#0d0d0d] p-8"
          >
             <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter"
                 style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
               Extracts
             </h2>
             <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter text-white"
                 style={{ textShadow: "0 0 40px rgba(255,255,255,0.3)" }}>
               Flower
             </h2>
             <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter"
                 style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
               Edibles
             </h2>
          </m.div>
        </div>
      </div>
    </section>
  );
}
