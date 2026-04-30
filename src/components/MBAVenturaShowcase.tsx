'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Layout, Zap, Database } from 'lucide-react';

export default function MBAVenturaShowcase() {
  return (
    <section id="mba-ventura" className="relative bg-[#050505] py-32 px-6 scroll-snap-section overflow-hidden">
      <div className="container mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Content Side */}
          <div className="flex flex-col order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">Systemic Branding & Security</span>
            </div>
            
            <h2 className="font-bebas text-5xl md:text-8xl font-light text-white mb-6 leading-[0.85] uppercase tracking-tighter">
              MBA Ventura: <br /> <em className="italic text-[#c9a84c] not-italic">Secure Systems.</em>
            </h2>
            
            <p className="text-[#a3a39c] font-outfit font-light leading-relaxed max-w-lg mb-12 text-lg">
              We rebuilt MBA Ventura from the ground up, focusing on a high-fidelity aesthetic paired with a robust administrative backbone. 
              Secure dashboards meet cinematic branding to position the store as Ventura's premier mattress authority.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureItem 
                icon={<ShieldCheck className="w-5 h-5" />}
                title="Auth-Secure Admin"
                desc="Encrypted administrative layer for managing store operations and pricing data safely."
              />
              <FeatureItem 
                icon={<Layout className="w-5 h-5" />}
                title="Modern Architecture"
                desc="Next.js infrastructure delivering sub-second load times and high-end visual fidelity."
              />
              <FeatureItem 
                icon={<Database className="w-5 h-5" />}
                title="Inventory Logic"
                desc="Internal system nodes for tracking live floor models and seasonal pricing adjustments."
              />
              <FeatureItem 
                icon={<Zap className="w-5 h-5" />}
                title="Conversion Sync"
                desc="Integrated finance tools and lead-capture systems designed for high-intent visitors."
              />
            </div>
          </div>

          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/assets/projects/mba/hero.png" 
                alt="MBA Ventura Interface" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Diagnostic Overlay */}
            <div className="absolute top-10 -left-6 md:-left-12 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hidden md:block max-w-[240px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="text-[10px] font-mono text-white/60 tracking-widest uppercase">System Integrity: 100%</div>
              </div>
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-white/40">NODE_AUTH_PASS</div>
                <div className="text-[10px] font-mono text-white/40">DB_SYNC_COMPLETE</div>
                <div className="text-[10px] font-mono text-white/40">SSL_ENCRYPTION_ACTIVE</div>
              </div>
            </div>
          </motion.div>

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
        <p className="text-[#a3a39c] text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
