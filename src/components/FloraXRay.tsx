"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flower, Cpu, Globe } from "lucide-react";

export default function FloraXRay() {
  const [view, setView] = useState<"visual" | "system">("visual");

  return (
    <section className="relative flex flex-col items-center justify-center bg-[#0d0d0d] py-32 px-6 overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#c9a84c_0%,transparent 70%)]" />
      </div>

      <div className="z-10 mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Cpu className="w-5 h-5 text-[#c9a84c]" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] font-bold">Beyond the Visual</span>
        </div>
        <h2 className="font-rajdhani text-4xl md:text-6xl font-light text-white uppercase tracking-tight">Agentic <em className="text-[#c9a84c] not-italic">Logistics</em></h2>
        <p className="mt-4 text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
           Auditing the AI-driven inventory controls and regional SEO synth engines powering Ventura's floral collective.
        </p>
      </div>

      {/* The Mode Selector */}
      <div className="z-10 relative mb-12 flex rounded-full bg-white/5 p-1 backdrop-blur-md border border-white/10">
        <button
          onClick={() => setView("visual")}
          className={`relative z-10 w-36 rounded-full py-3 text-[10px] tracking-[0.2em] uppercase font-bold transition-colors ${
            view === "visual" ? "text-black" : "text-white/60 hover:text-white"
          }`}
        >
          Final Render
        </button>
        <button
          onClick={() => setView("system")}
          className={`relative z-10 w-36 rounded-full py-3 text-[10px] tracking-[0.2em] uppercase font-bold transition-colors ${
            view === "system" ? "text-black" : "text-white/60 hover:text-white"
          }`}
        >
          System X-Ray
        </button>
        
        <motion.div
          className="absolute inset-y-1 w-36 rounded-full bg-[#c9a84c] shadow-[0_0_20px_rgba(201,168,76,0.4)]"
          animate={{ x: view === "visual" ? 0 : 144 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>

      {/* Interactive Display Area */}
      <div className="relative w-full max-w-6xl aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        
        <AnimatePresence mode="wait">
          {view === "visual" ? (
            <motion.div
              key="visual"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center p-8 md:p-20"
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2680&auto=format&fit=crop')] bg-cover bg-center brightness-[0.3] grayscale" />
               <div className="relative z-10 text-center text-[#f7f2ea] max-w-2xl">
                  <h3 className="font-serif text-4xl md:text-6xl mb-6 italic">Grown with Intention.</h3>
                  <p className="text-lg opacity-80 leading-relaxed font-light font-inter">
                    A curated digital marketplace for Ventura's most elusive blooms. Every pixel designed to preserve the visceral motion and organic texture of the Syndicate's arrangements.
                  </p>
                  <div className="mt-12 group inline-block">
                    <span className="text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] border-b border-[#c9a84c] pb-2 transition-all group-hover:tracking-[0.7em]">Shop the Collection</span>
                  </div>
               </div>
            </motion.div>
          ) : (
            <motion.div
              key="system"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col md:flex-row bg-[#080808] font-mono z-20"
            >
               {/* Blueprint Overlay */}
               <div className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ 
                      backgroundImage: 'linear-gradient(rgba(201, 168, 76, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 168, 76, 0.15) 1px, transparent 1px)', 
                      backgroundSize: '30px 30px' 
                    }} />

               {/* Left Column: Data Stream */}
               <div className="relative flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 flex flex-col bg-black/40 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-8 text-[#c9a84c]">
                    <Cpu className="w-5 h-5" />
                    <span className="text-[11px] tracking-[0.3em] uppercase font-bold">Agentic Inventory Control</span>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center gap-4 text-[11px] text-[#f5f0e8]/80 pb-6 border-b border-white/5">
                     <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded">
                        <span className="text-white/40 uppercase tracking-widest text-[9px]">Module</span>
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">FLORA_SYNC_A1</span>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded">
                        <span className="text-white/40 uppercase tracking-widest text-[9px]">Ext. Interval</span>
                        <span className="text-white">15 Minutes</span>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded">
                        <span className="text-white/40 uppercase tracking-widest text-[9px]">Auto Markup</span>
                        <span className="text-white">Active (14%)</span>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded">
                        <span className="text-white/40 uppercase tracking-widest text-[9px]">Active Nodes</span>
                        <span className="text-[#c9a84c]">Oxnard, Camarillo</span>
                     </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-white/5 border border-white/5 rounded font-mono text-[10px]">
                     <div className="flex justify-between items-center text-white/50">
                        <span>SYNC_INTEGRITY</span>
                        <span className="text-emerald-500">99.9%</span>
                     </div>
                  </div>
               </div>

               {/* Right Column: Visual Synthesis */}
               <div className="relative flex-1 p-8 md:p-12 flex flex-col bg-[#0a0a0a]">
                  <div className="flex items-center gap-3 mb-8 text-emerald-400">
                    <Globe className="w-5 h-5" />
                    <span className="text-[11px] tracking-[0.3em] uppercase font-bold">Regional Content Synthesis</span>
                  </div>
                  
                  <div className="relative flex-1 rounded-xl border border-white/5 bg-black/60 p-6 overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0" />
                    
                    <div className="space-y-6 text-[11px] text-white/40 lowercase leading-relaxed">
                       <div className="space-y-1">
                          <p className="text-emerald-400/80 font-bold uppercase tracking-widest text-[10px]">&gt; TARGET_MARKETS</p>
                          <p className="text-white/70">&gt; ["Ventura", "Oxnard", "Camarillo", "Ojai"]</p>
                       </div>
                       
                       <div className="space-y-1">
                          <p className="text-emerald-400/80 font-bold uppercase tracking-widest text-[10px]">&gt; KEYWORD_VECTORS</p>
                          <p className="text-white/70">&gt; "bespoke floral caminerio", "organic delivery ventura"</p>
                       </div>

                       <p className="mt-10 border-l-2 border-[#c9a84c] pl-6 py-2 italic text-white/60 text-xs bg-white/[0.02]">
                         "Synthesizing high-intent landing pages based on local neighborhood demographics and seasonal bloom probability maps..."
                       </p>
                    </div>

                    <div className="mt-auto pt-8">
                       <div className="flex justify-between text-[10px] text-white/20 mb-2 uppercase tracking-widest">
                          <span>SEO_Pivots</span>
                          <span>Active</span>
                       </div>
                       <div className="w-full h-[2px] bg-white/5 overflow-hidden rounded-full">
                          <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="w-1/2 h-full bg-[#c9a84c]" 
                          />
                       </div>
                    </div>
                  </div>
               </div>

               {/* Tracking Line */}
               <motion.div 
                 animate={{ left: ["0%", "100%"] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 bottom-0 w-[1px] bg-[#c9a84c]/40 shadow-[0_0_25px_#c9a84c] z-30"
               />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
