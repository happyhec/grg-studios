"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, BoxSelect, Database, Zap, Cpu } from "lucide-react";

export default function EggsXRay() {
  const [isDiagnostic, setIsDiagnostic] = useState(false);

  return (
    <section className="relative flex flex-col items-center justify-center bg-black py-32 px-6 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#111111_0%,transparent_70%)] opacity-40" />

      <div className="z-10 mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-[#c9a84c]" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] font-bold">Beyond the Visual</span>
        </div>
        <h2 className="font-bebas text-5xl md:text-7xl font-light text-[#f5f0e8] uppercase tracking-widest leading-none">
          Operational <em className="text-[#a18a4d] not-italic">Middleware</em>
        </h2>
        <p className="mt-6 max-w-lg mx-auto text-[#a3a39c] text-sm leading-relaxed font-light">
           Peeling back the UI layer to reveal the automated engine driving real-time waitlists, catering lead-gen, and digital inventory synchronization.
        </p>
      </div>

      <button 
        onClick={() => setIsDiagnostic(!isDiagnostic)}
        className="z-10 group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/10 bg-white/5 px-12 py-6 font-mono text-[10px] tracking-[0.3em] uppercase text-white transition-all hover:bg-white/10 shadow-2xl mb-12"
      >
        <Cpu className={`w-4 h-4 transition-transform ${isDiagnostic ? 'rotate-180' : ''}`} />
        {isDiagnostic ? "Close Diagnostic View" : "Engage Operational X-Ray"}
        {/* Scanning border */}
        <div className={`absolute inset-0 border transition-colors duration-700 ${isDiagnostic ? 'border-[#c9a84c] animate-pulse' : 'border-transparent group-hover:border-white/20'}`} />
      </button>

      {/* The Diagnostic Frame */}
      <div className="relative w-full max-w-6xl aspect-video rounded-[3rem] border border-white/5 bg-[#050505] shadow-[0_80px_160px_rgba(0,0,0,1)] overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!isDiagnostic ? (
            <motion.div
              key="visual"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
               <div className="absolute inset-0 bg-[url('/assets/projects/eggs/full_homepage.png')] bg-cover bg-top brightness-[0.3] grayscale" />
               <div className="relative z-10 text-center">
                  <span className="text-[10px] tracking-[1em] uppercase text-white/30 mb-6 block font-mono">End-User Interface / Production</span>
                  <h3 className="text-4xl md:text-8xl font-bebas text-stone-200 uppercase tracking-tighter opacity-80">SINCE 1974.</h3>
                  <div className="mt-8 flex justify-center gap-2">
                     {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/40" />)}
                  </div>
               </div>
            </motion.div>
          ) : (
             <motion.div
              key="xray"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col font-mono bg-[#080808] p-8 md:p-12"
            >
               {/* Blueprint Grid */}
               <div className="absolute inset-0 opacity-20 pointer-events-none" 
                    style={{ 
                      backgroundImage: 'linear-gradient(rgba(201, 168, 76, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 168, 76, 0.1) 1px, transparent 1px)', 
                      backgroundSize: '30px 30px' 
                    }} />

               {/* UI Layout Map */}
               <div className="relative h-full w-full grid grid-cols-12 grid-rows-6 gap-6 z-20">
                  
                  {/* Top: Routing & SEO */}
                  <div className="col-span-12 row-span-1 border border-white/10 bg-white/5 px-6 flex justify-between items-center rounded-2xl shadow-inner">
                     <div className="flex items-center gap-4">
                        <Zap className="w-4 h-4 text-[#c9a84c]" />
                        <span className="text-[11px] text-[#c9a84c] font-bold uppercase tracking-widest">OPS_CORE_V1: CONNECTED</span>
                     </div>
                     <div className="flex gap-8">
                        <div className="text-[10px] text-white/40 uppercase tracking-tighter cursor-help hover:text-white transition-colors">latency_bridge: 0.04ms</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-tighter">protocol: secured</div>
                     </div>
                  </div>

                  {/* Left: Client Logic */}
                  <div className="col-span-12 md:col-span-8 row-span-4 border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-between rounded-2xl backdrop-blur-sm">
                     <div>
                        <div className="flex items-center gap-3 mb-8 text-[#c9a84c]">
                           <BoxSelect className="w-5 h-5 opacity-70" />
                           <span className="text-[12px] uppercase tracking-[0.4em] font-bold">Dynamic Service Hydration</span>
                        </div>
                        <div className="space-y-5 text-[12px] text-[#f5f0e8]/60 font-mono">
                           <p className="flex justify-between items-center border-b border-white/[0.03] pb-2">
                             <span className="text-white/30 text-[10px]">ENGINE</span>
                             <span>@NEXT_JS_APP_ROUTER</span>
                           </p>
                           <p className="flex justify-between items-center border-b border-white/[0.03] pb-2">
                             <span className="text-white/30 text-[10px]">AUTHENTICATION</span>
                             <span>SECURE_PIN_VOTERS</span>
                           </p>
                           <p className="flex justify-between items-center border-b border-white/[0.03] pb-2">
                             <span className="text-white/30 text-[10px]">CATERING_ROUTING</span>
                             <span>DYNAMIC_LEAD_DISPATCH</span>
                           </p>
                           <p className="flex justify-between items-center">
                             <span className="text-white/30 text-[10px]">ANIMATION_ENGINE</span>
                             <span>FRAMER_MOTION_GPU_ACCEL</span>
                           </p>
                        </div>
                     </div>
                     <div className="mt-12 space-y-3">
                        <div className="flex justify-between text-[10px] text-[#c9a84c] uppercase tracking-[0.2em] font-bold">
                           <span>Operational_Uptime</span>
                           <span>99.98%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             animate={{ x: ["-100%", "100%"] }} 
                             transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                             className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" 
                           />
                        </div>
                     </div>
                  </div>

                  {/* Right: Data Streams */}
                  <div className="col-span-12 md:col-span-4 row-span-4 border border-[#c9a84c]/10 bg-[#c9a84c]/5 p-8 flex flex-col gap-6 rounded-2xl">
                     <div className="border border-[#c9a84c]/20 p-5 bg-black/40 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                           <Database className="w-4 h-4 text-[#c9a84c]" />
                           <span className="text-[11px] font-bold text-[#c9a84c] uppercase tracking-widest">Synced_Nodes</span>
                        </div>
                        <p className="text-[10px] text-[#c9a84c]/60 leading-relaxed font-mono">
                           Multi-location sync active for Ventura, Camarillo, Simi, TO, and Valencia. Master DB parity verified.
                        </p>
                     </div>
                     
                     <div className="flex-1 flex flex-col justify-end gap-4 text-[10px]">
                        <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                           <span className="text-white/30 uppercase tracking-widest">Waitlist_Sync</span>
                           <span className="text-[#00FF00]/60 animate-pulse font-bold">● ACTIVE</span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                           <span className="text-white/30 uppercase tracking-widest">Inventory_86</span>
                           <span className="text-white/80 font-mono tracking-tighter uppercase">Global_Listen</span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                           <span className="text-white/30 uppercase tracking-widest">Staff_Auth</span>
                           <span className="text-[#c9a84c] font-bold">ENCRYPTED</span>
                        </div>
                     </div>
                  </div>

                  {/* Bottom: Stream Logs */}
                  <div className="col-span-12 row-span-1 border-t border-white/5 px-6 font-mono text-[10px] text-white/20 flex items-center gap-12 overflow-hidden whitespace-nowrap">
                     <span className="text-[#c9a84c] font-bold text-[11px]">[SYSTEM_ENGINE_LOG]</span>
                     <span className="animate-pulse">PARSING_INCOMING_LEADS...</span>
                     <span>REDUX_READY</span>
                     <span>SQL_PARITY: PASS</span>
                     <span>SSL: TS_VERSION_4</span>
                     <span className="text-emerald-500/50">NODE_VERIFIED: CAMARILLO_LOCAL_01</span>
                  </div>

               </div>

               {/* Vertical Scanning line */}
               <motion.div 
                 animate={{ left: ["0%", "100%"] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#c9a84c] to-transparent shadow-[0_0_30px_#c9a84c]"
               />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
