'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ComparisonSlider from './ComparisonSlider';

interface SpotlightStep {
  title: string;
  description: string;
  image: string;
  scrollOffset: number;
  highlight: string;
}

const tourSteps: SpotlightStep[] = [
  {
    title: "Ecosystem Architecture",
    description: "The transition from a static GoDaddy presence to a high-fidelity React infrastructure. Focused on Ventura County brand authority and operational depth.",
    image: "/assets/projects/eggs/full_homepage.png",
    scrollOffset: 0,
    highlight: "Custom_React_Architecture"
  },
  {
    title: "Operational Registry",
    description: "Location-specific intake engine with real-time lead tracking. Our Camarillo node features integrated specials and digital waitlist automation.",
    image: "/assets/projects/eggs/specific_location_page.png",
    scrollOffset: 5,
    highlight: "Location_Sync_Node_02"
  },
  {
    title: "Dynamic Menu Engine",
    description: "The Staff Portal allows for sub-1s data persistence. Operators can 86'd menu items instantly across all digital surfaces from a single dashboard.",
    image: "/assets/projects/eggs/staff_portal.png",
    scrollOffset: 32,
    highlight: "Realtime_Inventory_Sync"
  },
  {
    title: "Administrative Command",
    description: "Master control node for holiday overrides, QR generation, and staff access management. Bridging physical restaurant space and digital control.",
    image: "/assets/projects/eggs/admin_specific_location_portal_dashboard.png",
    scrollOffset: 12,
    highlight: "Ops_Auth_Verified"
  }
];

export default function ProjectSpotlight() {
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  const startTour = () => setCurrentStep(0);
  const endTour = () => setCurrentStep(null);
  const nextStep = () => {
    if (currentStep !== null && currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const currentTourStep = currentStep !== null ? tourSteps[currentStep] : null;

  return (
    <section id="eggs-n-things" className="relative bg-[#050505] py-32 px-6 scroll-snap-section min-h-screen overflow-hidden">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">The Built Truth // Interactive Tour</span>
            </div>
            <h2 className="font-bebas text-5xl md:text-8xl font-light text-white mb-6 leading-[0.85] uppercase tracking-tighter">
              Eggs 'N' Things: <br /> <em className="italic text-[#c9a84c] not-italic">Refactored.</em>
            </h2>
            <p className="text-[#888880] font-outfit font-light leading-relaxed max-w-lg">
              Witness the total operational transformation. We took a legacy restaurant presence and re-architected it into a high-performance digital ecosystem centered on automated staff controls.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
            {currentStep === null ? (
              <button 
                onClick={startTour}
                className="px-8 py-4 bg-[#c9a84c] text-black text-[10px] font-black tracking-[0.4em] uppercase hover:bg-[#e8d5a3] transition-all duration-500 rounded-full"
              >
                Initialize Synced Tour
              </button>
            ) : (
              <button 
                onClick={endTour}
                className="px-8 py-4 border border-white/10 text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase hover:border-white/30 transition-all rounded-full"
              >
                Exit Comparison
              </button>
            )}

            <a 
              href="https://eggsandthings.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#c9a84c] text-[10px] font-bold tracking-[0.2em] uppercase hover:text-white transition-colors border-b border-[#c9a84c]/30 hover:border-white pb-1"
            >
              View Live Site ↗
            </a>
          </div>
        </div>

        {/* Outcomes Banner */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-12 bg-white/5 py-4 px-8 rounded-full border border-white/10 w-fit">
          {[
            { value: "5", label: "Locations" },
            { value: "Waitlist", label: "Live System" },
            { value: "86'd", label: "Inventory Sync" },
            { value: "Leads", label: "Catering Engine" }
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="font-bebas text-2xl text-[#c9a84c] tracking-widest leading-none">{stat.value}</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 leading-none">{stat.label}</span>
            </div>
          ))}
        </div>        {/* Sync Comparison Stage */}
        <div className="relative h-[60vh] md:h-[80vh] w-full group overflow-hidden">
          {currentStep === null && (
            <ComparisonSlider 
              beforeImage="/assets/projects/eggs/legacy_full.png"
              afterImage="/assets/projects/eggs/full_homepage.png"
              beforeLabel="Legacy Environment"
              afterLabel="The Built Truth"
            />
          )}

          {/* Tour Content Layer (The "After" images during tour) */}
          <AnimatePresence mode="wait">
            {currentStep !== null && (
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10"
              >
                <Image 
                  src={currentTourStep?.image || "/assets/projects/eggs/full_homepage.png"} 
                  alt="Tour Step" 
                  fill 
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sync HUD Layer */}
          <AnimatePresence>
            {currentStep !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center md:justify-end p-4 md:p-6"
              >
                {/* Tour Card */}
                <motion.div 
                  initial={{ y: 30, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  key={currentStep}
                  className="w-full max-w-[380px] relative z-40 mr-0 md:mr-12 mt-auto md:mt-0"
                >
                   <div className="bg-[#050505]/95 backdrop-blur-md border border-[#c9a84c]/40 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] pointer-events-auto">
                      <div className="flex items-center gap-4 mb-4 md:mb-6">
                         <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full animate-pulse shadow-[0_0_10px_#c9a84c]" />
                         <div className="font-mono text-[9px] text-[#c9a84c] tracking-[0.5em] uppercase">SYNC_NODE_0{currentStep + 1}</div>
                      </div>
                      
                      <h3 className="text-white text-2xl md:text-3xl font-bebas tracking-widest uppercase mb-3 md:mb-4">
                        {currentTourStep?.title}
                      </h3>
                      
                      <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-6 md:mb-10 font-outfit font-light">
                        {currentTourStep?.description}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-white/5 pt-6 md:pt-8">
                         <div className="flex flex-col">
                            <span className="text-white/20 text-[8px] font-mono tracking-tighter mb-1 uppercase">Infrastructure Verified</span>
                            <span className="text-[#c9a84c] text-[10px] font-mono font-bold tracking-tight">{currentTourStep?.highlight}</span>
                         </div>
                         <button 
                           onClick={nextStep}
                           className="group flex items-center gap-3 bg-[#c9a84c] hover:bg-[#e8d5a3] px-6 md:px-10 py-4 md:py-5 rounded-full transition-all duration-500 shadow-xl"
                         >
                           <span className="text-black text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase">
                             {currentStep === tourSteps.length - 1 ? "End Review" : "Next Module"}
                           </span>
                         </button>
                      </div>
                   </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
