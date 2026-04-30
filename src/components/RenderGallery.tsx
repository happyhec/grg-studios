'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const renders = [
  {
    src: "/assets/projects/flora/butterfly_hill_beauty.png",
    title: "Eco-Lobby Experience",
    label: "FLORA // SPA_VIS_01",
    span: "md:col-span-2 md:row-span-2"
  },
  {
    src: "/assets/projects/flora/itzel_martinez_model.png",
    title: "Retail Flow Study",
    label: "FLORA // UX_GRID_02",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    src: "/assets/projects/flora/third_3ye.png",
    title: "Dynamic Portal HUD",
    label: "THIRD3YE // INT_MOD_01",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    src: "/assets/projects/flora/upscalemedia-transformed.png",
    title: "Spatial Retail Strategy",
    label: "FLORA // ARCHV_TRANS",
    span: "md:col-span-2 md:row-span-1"
  }
];

export default function RenderGallery() {
  return (
    <section className="bg-[#050505] py-32 px-6">
      <div className="container mx-auto">
        <div className="mb-16">
           <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-[1px] bg-[#c9a84c]" />
             <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] font-mono">Visualization Laboratory</span>
           </div>
           <h3 className="text-4xl md:text-6xl font-serif italic text-white leading-tight">
             Biological Visualization & <br /> Architectural R&D Renders
           </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {renders.map((render, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`relative rounded-3xl overflow-hidden border border-white/5 group ${render.span}`}
            >
              <Image 
                src={render.src} 
                alt={render.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div>
                  <div className="font-mono text-[9px] text-[#c9a84c] tracking-[0.3em] uppercase mb-2">{render.label}</div>
                  <h4 className="text-white text-xl font-serif italic">{render.title}</h4>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                  →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
