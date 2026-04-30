"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function XRayToggle() {
  const [view, setView] = useState<"product" | "xray">("product");

  return (
    <section className="relative flex flex-col items-center justify-center bg-[#0d0d0d] py-32 px-6">
      
      <div className="mb-12 text-center">
        <h2 className="font-outfit text-3xl font-light text-white md:text-5xl">The Anatomy of Elegance</h2>
        <p className="mt-4 text-white/50">Violet & Vine: Unmasking the structure beneath the aesthetic.</p>
      </div>

      {/* The Toggle */}
      <div className="relative mb-12 flex rounded-full bg-white/5 p-1 backdrop-blur-md border border-white/10">
        <button
          onClick={() => setView("product")}
          className={`relative z-10 w-32 rounded-full py-2 text-sm font-semibold transition-colors ${
            view === "product" ? "text-black" : "text-white/60 hover:text-white"
          }`}
        >
          Final Render
        </button>
        <button
          onClick={() => setView("xray")}
          className={`relative z-10 w-32 rounded-full py-2 text-sm font-semibold transition-colors ${
            view === "xray" ? "text-black" : "text-white/60 hover:text-white"
          }`}
        >
          Agent X-Ray
        </button>
        
        <motion.div
          className="absolute inset-y-1 w-32 rounded-full bg-white shadow-lg"
          animate={{ x: view === "product" ? 0 : 128 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>

      {/* The Content Frame */}
      <div className="relative h-[600px] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl">
        <AnimatePresence mode="wait">
          {view === "product" ? (
            <motion.div
              key="product"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-[#f7f2ea] opacity-10" />
              <div className="z-10 p-12 text-center text-[#f7f2ea]">
                 <h3 className="font-serif text-5xl mb-6 tracking-wide">From Stem to Arrangement</h3>
                 <p className="max-w-xl mx-auto text-lg opacity-80 leading-relaxed font-inter">
                   Every arrangement begins with individual stems chosen for color, texture, movement, and seasonality. Thoughtfully gathered, then composed by hand into something beautiful and alive.
                 </p>
                 <div className="mt-12 flex flex-wrap justify-center gap-6">
                    {/* Simulated floral assets */}
                    <div className="w-24 h-auto aspect-square bg-[#c9a84c]/20 rounded-full blur-md" />
                    <div className="w-32 h-auto aspect-square bg-[#818f77]/20 rounded-full blur-xl" />
                    <div className="w-24 h-auto aspect-square bg-rose-900/20 rounded-full blur-md" />
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="xray"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex p-8"
            >
               <div className="flex h-full w-full rounded border border-blue-500/30 bg-blue-950/10 p-6">
                 <pre className="font-mono text-xs md:text-sm text-blue-400/80 w-full overflow-hidden">
{`{
  "component": "StemToArrangement",
  "layout": "Grid-based absolute positioning",
  "styling": {
    "background": "var(--color-soft-cream)",
    "typography": "Playfair Display 2.75rem",
    "motion": "fade-up.in-view"
  },
  "assets": [
    { "type": "stem-vine", "z-index": 1, "lazy": true },
    { "type": "stem-filler", "z-index": 2, "lazy": true },
    { "type": "stem-green", "z-index": 3, "lazy": true },
    { "type": "stem-secondary", "z-index": 4, "lazy": true },
    { "type": "stem-focal", "z-index": 5, "lazy": true }
  ],
  "agent_parameters": {
    "overlap_logic": "layered dynamic placement",
    "scroll_trigger": "intersection-observer"
  }
}`}
                 </pre>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
