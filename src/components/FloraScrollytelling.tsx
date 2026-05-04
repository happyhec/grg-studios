"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from 'framer-motion';
import { Cpu, Globe, Share2, Sparkles } from "lucide-react";

/**
 * FLORA SCROLLYTELLING
 * Custom terminal-style breakdown for Flora Syndicate.
 */
const FLORA_PROMPTS = [
  `// PHASE 1: AGENTIC INVENTORY EXTRACTION
System.Process({
  source: "Vendor_APIs_Regional",
  extraction: "NLP-driven availability mapping",
  logic: "If 'Bespoke_Arrangement' in stock -> Sync to frontend hub",
  latency_target: "< 50ms (Oxnard Node)"
});`,
  `// PHASE 2: REGIONAL SEO SYNTHESIS
Agent.Deploy({
  market: ["Ventura", "Camarillo", "Ojai"],
  task: "Generate hyper-local landing pages",
  synth: "Vector matching based on neighbor search intent",
  result: "100% Google Lighthouse score via static-site gen (SSG)"
});`,
  `// PHASE 3: SECURE LUXURY GATEWAY
System.Lock({
  auth: "Auth0/JWT Integration",
  payout: "Stripe Connect Direct-to-Vendor",
  security: "Zero-knowledge encryption for customer notes",
  ui: "Maintain luxury aesthetic while handling high-throughput transactions"
});`
];

export default function FloraScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map progress to stages
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const stage2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const stage3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0a0a0a]">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen w-full flex-col md:flex-row">
        
        {/* Left Column: The Blueprint Terminal */}
        <div className="flex h-1/2 w-full flex-col justify-center border-b border-white/5 bg-black/60 p-8 md:h-full md:w-[40%] md:border-b-0 md:border-r">
          <div className="mb-10 text-left">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-[#c9a84c]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] font-bold">Beyond the Visual</span>
            </div>
            <h2 className="font-rajdhani text-4xl font-light text-white uppercase tracking-widest leading-tight">
              Agentic <em className="text-[#c9a84c] not-italic">Engine</em>
            </h2>
            <p className="mt-4 text-white/30 text-sm leading-relaxed max-w-sm">
              The infrastructure behind Ventura's premier floral collective, powered by high-throughput synthesis.
            </p>
          </div>

          <div className="mb-6 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/50" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
            <div className="h-3 w-3 rounded-full bg-green-500/50" />
            <span className="ml-4 font-mono text-xs text-[#c9a84c]/40">terminal ~ flora-synth-01</span>
          </div>
          
          <div className="relative h-[200px] w-full font-mono text-sm leading-relaxed text-[#c9a84c]/80 md:text-base bg-black/40 p-6 rounded-lg border border-white/5">
            <m.pre style={{ opacity: stage1Opacity }} className="absolute inset-0 p-6 whitespace-pre-wrap">
              {FLORA_PROMPTS[0]}
            </m.pre>
            <m.pre style={{ opacity: stage2Opacity }} className="absolute inset-0 p-6 whitespace-pre-wrap">
              {FLORA_PROMPTS[1]}
            </m.pre>
            <m.pre style={{ opacity: stage3Opacity }} className="absolute inset-0 p-6 whitespace-pre-wrap">
              {FLORA_PROMPTS[2]}
            </m.pre>
          </div>
        </div>

        {/* Right Column: The Product Render */}
        <div className="relative flex h-1/2 w-full items-center justify-center overflow-hidden bg-[#080808] p-4 md:h-full md:w-[60%] md:p-12">
          
          {/* Stage 1: AI Inventory Mapping */}
          <m.div 
            style={{ opacity: stage1Opacity }} 
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2680&auto=format&fit=crop')] bg-cover bg-center brightness-[0.2] grayscale" />
             <div className="relative z-10 border border-[#c9a84c]/20 bg-black/60 p-12 backdrop-blur-xl rounded-2xl">
                <Share2 className="w-12 h-12 text-[#c9a84c] mx-auto mb-6 animate-pulse" />
                <h3 className="font-rajdhani text-3xl tracking-widest text-white uppercase">Networked Availability</h3>
                <p className="mt-4 text-[#c9a84c]/60 text-xs uppercase tracking-widest">Real-time Node: Oxnard_Central</p>
             </div>
          </m.div>

          {/* Stage 2: SEO Synth */}
          <m.div 
            style={{ opacity: stage2Opacity }} 
            className="absolute inset-0 flex items-center justify-center bg-[#0d0d0d] p-8"
          >
             <div className="w-full max-w-2xl bg-black border border-white/10 p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                   <Globe className="w-40 h-40 text-[#c9a84c]" />
                </div>
                <h3 className="font-rajdhani text-4xl text-white uppercase mb-8">Regional Synthesis</h3>
                <div className="space-y-4">
                   {["Ventura", "Camarillo", "Oxnard"].map((city) => (
                      <div key={city} className="flex items-center justify-between border-b border-white/5 pb-4">
                         <span className="text-white/60 font-mono text-[10px] uppercase tracking-widest">{city} Page Synth</span>
                         <span className="text-emerald-500 font-mono text-[10px]">VERIFIED_100ms</span>
                      </div>
                   ))}
                </div>
             </div>
          </m.div>

          {/* Stage 3: Luxury UI Transition */}
          <m.div 
            style={{ opacity: stage3Opacity }} 
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] p-8"
          >
             <Sparkles className="w-16 h-16 text-[#c9a84c] mb-12 opacity-50" />
             <div className="space-y-6 text-center">
                <h2 className="text-5xl md:text-7xl font-serif italic text-[#f7f2ea]">Bespoke Logic.</h2>
                <div className="inline-block px-10 py-4 border border-[#c9a84c]/20 rounded-full bg-[#c9a84c]/5">
                   <span className="text-[10px] tracking-[0.5em] uppercase text-[#c9a84c]">Premium Auth Secure</span>
                </div>
             </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
