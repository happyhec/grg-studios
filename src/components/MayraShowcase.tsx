'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Users, ClipboardCheck, Smartphone } from 'lucide-react';

export default function MayraShowcase() {
  return (
    <section id="mayras-helping-hands" className="relative bg-[#0a0a0a] py-32 px-6 scroll-snap-section overflow-hidden">
      <div className="container mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/assets/projects/mayra/hero.png" 
                alt="Mayra's Helping Hands Dashboard" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-6 md:-right-10 bg-[#111] border border-[#c9a84c]/30 p-6 rounded-2xl shadow-2xl hidden md:block max-w-[280px]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-full flex items-center justify-center text-[#c9a84c]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Active Leads</div>
                  <div className="text-xl font-bold text-white tracking-tight">24 New Inquiry</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '70%' }}
                    className="h-full bg-[#c9a84c]"
                  />
                </div>
                <div className="text-[9px] text-[#c9a84c] font-mono tracking-tighter uppercase">Automated Triage: [ACTIVE]</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">Operational Infrastructure</span>
            </div>
            
            <h2 className="font-bebas text-5xl md:text-8xl font-light text-white mb-6 leading-[0.85] uppercase tracking-tighter">
              Mayra's Helping Hands: <br /> <em className="italic text-[#c9a84c] not-italic">The Ops Engine.</em>
            </h2>
            
            <p className="text-[#888880] font-outfit font-light leading-relaxed max-w-lg mb-12 text-lg">
              Beyond the surface, we engineered a full-scale operational dashboard. 
              From automated lead triage to real-time staff scheduling, we transformed a local service into a digitally-autonomous enterprise.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureItem 
                icon={<ClipboardCheck className="w-5 h-5" />}
                title="Logic-Driven Intake"
                desc="Proprietary inquiry form with automated categorization and instant lead persistence."
              />
              <FeatureItem 
                icon={<Calendar className="w-5 h-5" />}
                title="Unified Calendar"
                desc="Real-time synchronization of cleaning schedules across all staff nodes."
              />
              <FeatureItem 
                icon={<Users className="w-5 h-5" />}
                title="Leads Dashboard"
                desc="Centralized command center for managing customer relationships and conversion data."
              />
              <FeatureItem 
                icon={<Smartphone className="w-5 h-5" />}
                title="PWA Infrastructure"
                desc="Custom Progressive Web App allowing for offline access and home-screen deployment."
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-[#c9a84c] bg-white/5">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-[#888880] text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
