"use client";

import { useState } from "react";
import { m, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Video, Lock } from "lucide-react";

export default function BardBoysXRay() {
  const [isDiagnostic, setIsDiagnostic] = useState(false);

  return (
    <section className="relative flex flex-col items-center justify-center bg-black py-32 px-6 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#1a1a1a_0%,transparent 60%)] opacity-40" />

      <div className="z-10 mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-red-500/80 font-bold">Beyond the Visual</span>
        </div>
        <h2 className="font-rajdhani text-4xl md:text-6xl font-light text-[#f5f0e8] uppercase tracking-widest">Security <em className="text-red-500 not-italic">Infrastructure</em></h2>
        <p className="mt-4 text-[#a3a39c] max-w-lg mx-auto text-sm leading-relaxed">
           Deconstructing the high-end encryption gates and remote killswitches protecting Ventura's premium genetics.
        </p>
      </div>

      <button 
        onClick={() => setIsDiagnostic(!isDiagnostic)}
        className="z-10 group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-10 py-5 font-mono text-[10px] tracking-[0.2em] uppercase text-white transition-all hover:bg-white/10 mb-12"
      >
        {isDiagnostic ? "Close Diagnostic View" : "Engage Security X-Ray"}
        {/* Scanning border */}
        <div className={`absolute inset-0 border transition-colors ${isDiagnostic ? 'border-red-500 animate-pulse' : 'border-transparent group-hover:border-white/20'}`} />
      </button>

      {/* The Diagnostic Frame */}
      <div className="relative w-full max-w-6xl aspect-video rounded-3xl border border-white/5 bg-[#050505] shadow-[0_50px_100px_rgba(0,0,0,1)] overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!isDiagnostic ? (
            <m.div
              key="render"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542044801-4470d0abf37c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center brightness-[0.2] grayscale" />
               <div className="relative z-10 text-center">
                  <span className="text-[10px] tracking-[0.8em] uppercase text-white/40 mb-4 block">Final Rendered UI</span>
                  <h3 className="text-5xl md:text-8xl font-black text-white/80 tracking-tighter uppercase italic">HOUSE BRAND.</h3>
               </div>
            </m.div>
          ) : (
             <m.div
              key="xray"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col font-mono bg-[#080808]"
            >
               {/* Grid line scanning */}
               <m.div 
                 animate={{ top: ["0%", "100%"] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 right-0 h-[2px] bg-red-600 shadow-[0_0_20px_red] z-30"
               />

               {/* UI Overlay Map */}
               <div className="absolute inset-0 p-6 md:p-10 grid grid-cols-12 grid-rows-6 gap-4 opacity-100 z-20 overflow-hidden">
                  
                  {/* Top Bar: Auth Logic */}
                  <div className="col-span-12 row-span-1 border border-red-500/20 bg-red-950/20 backdrop-blur-xl p-4 flex justify-between items-center rounded-lg">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">ENCRYPTION_GATE: ACTIVE</span>
                     </div>
                     <div className="text-[10px] text-white/40 font-mono">NODE: VC-SOUTH-1 // LATENCY: 0.04ms</div>
                  </div>

                  {/* Left: Cinematic Logic */}
                  <div className="col-span-12 md:col-span-7 row-span-4 border border-white/5 bg-white/[0.02] p-6 flex flex-col justify-between rounded-lg">
                     <div>
                        <div className="flex items-center gap-2 mb-6">
                           <Video className="w-4 h-4 text-[#c9a84c]" />
                           <span className="text-[11px] text-[#c9a84c] uppercase tracking-[0.3em] font-bold">Cinematic Architecture</span>
                        </div>
                        <div className="space-y-4">
                           <div className="space-y-1">
                             <p className="text-[10px] text-white/60">Dynamic Framing:</p>
                             <p className="text-[11px] text-[#f5f0e8] leading-relaxed">&gt; container.aspect: "21:9" // ULTRA_WIDE</p>
                             <p className="text-[11px] text-[#f5f0e8] leading-relaxed">&gt; lens.distortion: "anamorphic_v1"</p>
                           </div>
                           <div className="space-y-1">
                             <p className="text-[10px] text-white/60">Asset Injection:</p>
                             <p className="text-[11px] text-[#f5f0e8] leading-relaxed">&gt; src: "/clips/bardboys_4k_h265"</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-8 space-y-2">
                        <div className="flex justify-between text-[9px] text-white/40">
                           <span>BUFFER_STATE</span>
                           <span>98.4%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                           <m.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 8, repeat: Infinity }} className="h-full bg-[#c9a84c]" />
                        </div>
                     </div>
                  </div>

                  {/* Right: Security Logic */}
                  <div className="col-span-12 md:col-span-5 row-span-4 border border-red-500/10 bg-red-500/5 p-6 flex flex-col gap-6 rounded-lg">
                     <div className="border border-red-500/40 p-4 bg-red-500/10 rounded-md">
                        <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">REMOTE KILLSWITCH</span>
                        <p className="mt-2 text-[10px] text-red-500/70 leading-relaxed font-mono">Socket-based listener for 'STATE_VOID' signal. Immediate local cache purge if triggered.</p>
                     </div>
                     
                     <div className="flex-1 flex flex-col justify-end space-y-3">
                        <div className="p-3 bg-white/5 border border-white/5 rounded">
                           <div className="flex justify-between text-[10px] text-white/60">
                              <span>ALGORITHM</span>
                              <span className="text-white">AES-512-RSA</span>
                           </div>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/5 rounded">
                           <div className="flex justify-between text-[10px] text-white/60">
                              <span>HANDSHAKE</span>
                              <span className="text-emerald-500">VERIFIED</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Bottom: Logs */}
                  <div className="col-span-12 row-span-1 border-t border-white/5 p-4 font-mono text-[10px] text-white/30 flex items-center gap-10 overflow-hidden whitespace-nowrap">
                     <span className="text-[#c9a84c] font-bold">[SYS_LOG]</span>
                     <span className="animate-pulse">LISTENING_FOR_THREATS...</span>
                     <span>PORT: 8080</span>
                     <span>PROTOCOL: SECURE_WSS</span>
                     <span>LOG_LEVEL: VERBOSE</span>
                     <span className="text-red-500/40">WARNING: UNKNOWN_NODE_PING</span>
                  </div>

               </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
