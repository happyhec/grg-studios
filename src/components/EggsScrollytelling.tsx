'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';

const stages = [
  {
    title: "The Digital Evolution",
    subtitle: "From Legacy to Live",
    desc: "Transforming a static GoDaddy site into a high-performance business engine. Visual overhaul combined with architectural depth.",
    metrics: ["100% Custom", "Modern UX", "Brand First"],
    image: "/assets/projects/eggs/full_homepage.png",
    legacyImage: "/assets/projects/eggs/legacy_full.png",
    type: "comparison",
    scrollRange: ["0%", "-40%"]
  },
  {
    title: "Operational Registry",
    subtitle: "Lead Collection & Waitlist",
    desc: "A frictionless intake engine designed for high-volume conversion. Real-time lead tracking integrated with a custom-built digital waitlist.",
    metrics: ["Live Waitlist", "94% Growth", "Direct CRM"],
    image: "/assets/projects/eggs/specific_location_page.png",
    type: "single",
    scrollRange: ["0%", "-15%"] // Keep "Current Wait" card in view
  },
  {
    title: "Inventory Sync Engine",
    subtitle: "Real-Time Operational Control",
    desc: "A centralized command node allowing operators to 86'd items instantly across all digital surfaces. Zero-drift menu synchronization.",
    metrics: ["Staff Portal", "Instant Sync", "Multi-Surface"],
    image: "/assets/projects/eggs/staff_portal.png",
    secondaryImage: "/assets/projects/eggs/menu.png",
    type: "dual",
    scrollRange: ["-10%", "-40%"] // Pan to Master Ops in the middle
  },
  {
    title: "Master Ops Dashboard",
    subtitle: "Contextual Marketing Engine",
    desc: "Proprietary toolset for QR generation, holiday overrides, and location-specific management. Bridging physical space and digital control.",
    metrics: ["QR Engine", "Admin Nodes", "Auto-Ops"],
    image: "/assets/projects/eggs/admin_specific_location_portal_dashboard.png",
    type: "single",
    scrollRange: ["0%", "-25%"]
  }
];

export default function EggsScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120, // Increased for snappiness
    damping: 40,    // Increased for stability
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef} 
      id="eggs-tour"
      className="relative h-[300vh] bg-[#050505]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Cinematic Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_1200px_at_100%_200px,#c9a84c,transparent)] opacity-20" />
        </div>

        <div className="container mx-auto px-6 lg:px-24 relative z-10 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            {/* Visual Side (Real Assets) */}
            <div className="relative aspect-[16/10] sm:aspect-[4/5] lg:aspect-square w-full group order-1 lg:order-1">
               <VisualStage progress={smoothProgress} />
               
               {/* Frame Detail */}
               <div className="absolute -inset-2 lg:-inset-4 border border-white/5 rounded-[1.5rem] lg:rounded-[3rem] pointer-events-none" />
               <div className="absolute -inset-4 lg:-inset-8 border border-white/[0.02] rounded-[2rem] lg:rounded-[4rem] pointer-events-none" />
            </div>

            {/* Content Side */}
            <div className="space-y-6 lg:space-y-12 min-h-[300px] lg:h-[40vh] flex flex-col justify-center relative order-2 lg:order-2">
               {stages.map((stage, idx) => (
                 <ContentStage 
                   key={idx} 
                   idx={idx} 
                   stage={stage} 
                   progress={smoothProgress} 
                 />
               ))}
            </div>

          </div>
        </div>

        {/* Section Identifier */}
        <div className="absolute bottom-10 left-10 flex items-center gap-4">
          <div className="h-[1px] w-12 bg-[#c9a84c]/50" />
          <div className="text-[#c9a84c] font-mono text-[10px] tracking-[0.5em] uppercase opacity-50 text-wrap max-w-[200px]">
            Project // EGGS-N-THINGS // OPS-V1
          </div>
        </div>

        {/* Scroll Progress Indicator (Vertical Line) */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 h-32 w-[1px] bg-white/10 hidden lg:block">
          <motion.div 
            className="w-full bg-[#c9a84c] origin-top"
            style={{ scaleY: smoothProgress }}
          />
        </div>
      </div>
    </section>
  );
}

function VisualStage({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-2 lg:p-8">
      {stages.map((stage, idx) => (
        <ProjectScreenshot 
          key={idx}
          idx={idx}
          stage={stage}
          progress={progress}
        />
      ))}
    </div>
  );
}

function ProjectScreenshot({ idx, stage, progress }: { idx: number; stage: any; progress: MotionValue<number> }) {
  const start = idx * 0.25;
  const end = (idx + 1) * 0.25;
  
  const opacity = useTransform(progress, [start - 0.05, start, end, end + 0.05], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start - 0.05, start, end, end + 0.05], [0.95, 1, 1, 1.05]);
  
  // Image scroll transform - tailored per stage
  const imgY = useTransform(progress, [start, end], stage.scrollRange || ["0%", "-50%"]);
  
  // For comparison: Reveal slider
  const revealX = useTransform(progress, [start, start + 0.15], ["100%", "0%"]);

  return (
    <motion.div 
      style={{ opacity, scale, translateZ: 0 } as any} 
      className="absolute inset-0 overflow-hidden rounded-[1.2rem] lg:rounded-[2.2rem] bg-[#111] shadow-2xl border border-white/10 will-change-transform"
    >
      {stage.type === 'comparison' && (
         <div className="relative w-full h-full">
            {/* Legacy (Background) */}
            <div className="absolute inset-0 grayscale opacity-40">
               <motion.div style={{ y: imgY, translateZ: 0 } as any} className="w-full h-full will-change-transform">
                  <img src={stage.legacyImage} alt="Legacy" className="w-full min-h-full object-cover object-top" />
               </motion.div>
            </div>
            
            {/* New (Reveal Overlay) */}
            <motion.div 
               style={{ clipPath: `inset(0 0 0 ${revealX})`, translateZ: 0 } as any} 
               className="absolute inset-0 z-10 bg-[#050505] will-change-[clip-path]"
            >
               <motion.div style={{ y: imgY, translateZ: 0 } as any} className="w-full h-full will-change-transform">
                  <img src={stage.image} alt="Modern" className="w-full min-h-full object-cover object-top" />
               </motion.div>
               
               {/* Divider Line */}
               <motion.div 
                 style={{ left: revealX, translateZ: 0 } as any}
                 className="absolute top-0 bottom-0 w-[2px] bg-[#c9a84c] shadow-[0_0_20px_rgba(201,168,76,0.5)] z-20 will-change-[left]"
               />
            </motion.div>

            <div className="absolute bottom-6 right-6 z-30 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#c9a84c]/30">
               <span className="text-[10px] text-[#c9a84c] font-bold uppercase tracking-[0.2em]">Legacy → Full Reconstruction</span>
            </div>
         </div>
      )}

      {stage.type === 'single' && (
        <div className="relative h-full w-full overflow-hidden">
          <motion.div style={{ y: imgY, translateZ: 0 } as any} className="w-full h-full will-change-transform">
            <img src={stage.image} alt={stage.title} className="w-full min-h-full object-cover object-top" />
          </motion.div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      )}

       {stage.type === 'dual' && (
        <div className="absolute inset-0 flex flex-col">
          <div className="relative flex-1 w-full overflow-hidden border-b border-white/10 bg-[#050505]">
            <motion.div style={{ y: imgY, translateZ: 0 } as any} className="w-full h-full will-change-transform">
              <img src={stage.image} alt="Staff Portal" className="w-full min-h-full object-cover object-top" />
            </motion.div>
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded border border-white/10 text-[9px] text-[#c9a84c] uppercase font-bold tracking-widest">Administrative Hub</div>
          </div>
          <div className="relative flex-1 w-full overflow-hidden bg-[#050505]">
            <motion.div style={{ y: imgY, translateZ: 0 } as any} className="w-full h-full will-change-transform">
              <img src={stage.secondaryImage} alt="Live Menu" className="w-full min-h-full object-cover object-top" />
            </motion.div>
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded border border-white/10 text-[9px] text-[#c9a84c] uppercase font-bold tracking-widest">Public Menu Sync</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ContentStage({ idx, stage, progress }: { idx: number; stage: any; progress: MotionValue<number> }) {
  const start = idx * 0.25;
  const end = (idx + 1) * 0.25;
  
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + 0.1, end - 0.1, end], [30, 0, 0, -30]);

  return (
    <motion.div
      style={{ opacity, y, position: 'absolute' }}
      className="w-full px-4 lg:px-0 lg:pr-12"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[#c9a84c] font-bold tracking-[0.4em] uppercase text-[10px]">
          Operational Module 0{idx + 1}
        </span>
        <div className="h-[1px] flex-1 bg-white/10" />
      </div>
      
      <h3 className="text-4xl sm:text-5xl lg:text-7xl font-bebas text-white mb-4 lg:mb-6 leading-[0.85] uppercase tracking-tighter">
        {stage.title}
      </h3>
      
      <p className="text-white/50 text-sm lg:text-base max-w-lg mb-8 lg:mb-12 leading-relaxed font-light">
        {stage.desc}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stage.metrics.map((m: string, i: number) => (
          <div key={i} className="group cursor-default flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="text-white text-[10px] lg:text-[11px] font-bold uppercase tracking-widest group-hover:text-[#c9a84c] transition-colors duration-300">
              {m}
            </div>
            <div className="h-[2px] w-4 bg-[#c9a84c] mt-2 opacity-20 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
