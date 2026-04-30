'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * AgencyAbout v2 — Trust-Building Section
 * - First-person copy from the founder
 * - Headshot placeholder (replace with actual photo)
 * - Standalone section, not crammed with FAQ
 */
export default function AgencyAbout() {
  return (
    <section id="about" className="bg-[#0a0a0a] py-28 px-6 md:px-16 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 items-start">
          
          {/* Left Column: Headshot + Name Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative"
          >
            {/* Headshot Container */}
            <div className="relative aspect-[3/4] w-full max-w-[360px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-white/10 bg-[#111111]">
              <Image 
                src="/images/hector-headshot.jpg"
                alt="Hector Garcia - Founder of GRG Studios"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 360px"
                priority
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Name Card — Below headshot */}
            <div className="mt-6 text-center lg:text-left max-w-[360px] mx-auto lg:mx-0">
              <div className="text-[#f5f0e8] text-xl font-medium mb-1">Hector Garcia</div>
              <div className="text-[#c9a84c] text-[11px] md:text-[10px] tracking-[0.2em] uppercase font-bold mb-4">Founder & Creative Director</div>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <a href="https://instagram.com/grg_studios" target="_blank" rel="noopener" className="text-white/30 hover:text-[#c9a84c] transition-colors text-sm">
                  Instagram
                </a>
                <div className="w-px h-3 bg-white/10" />
                <a href="mailto:admin@grginnovations.com" className="text-white/30 hover:text-[#c9a84c] transition-colors text-sm">
                  Email
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: First-Person Story */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
              <span className="text-[11px] md:text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">About the Studio</span>
            </div>
            <h2 className="font-rajdhani text-4xl md:text-6xl font-light leading-tight text-[#f5f0e8] mb-10">
              Rooted in craft.<br /><em className="italic text-[#c9a84c] not-italic">Driven by results.</em>
            </h2>
            
            <div className="space-y-6 text-[#a3a39c] text-sm md:text-base leading-[1.8]">
              <p>
                I started GRG Studios because I saw local businesses being sold "visual shells" — websites that looked okay but were architecturally brittle and insecure. I don't build shells. I build <strong className="text-[#f5f0e8] font-medium">hardened systems</strong>.
              </p>
              <p>
                My background is built on the intersection of <strong className="text-[#f5f0e8] font-medium">Cybersecurity, Networking, and High-End Design</strong>. This means every pixel I place is backed by a secure, high-performance network architecture. I'm not just a designer; I'm a systems specialist who ensures your digital assets are as resilient as they are beautiful.
              </p>
              <p>
                Based in <strong className="text-[#f5f0e8] font-medium">Camarillo, Ventura County</strong>, I work exclusively with businesses who are ready to graduate from templates to professional infrastructure. Whether it's custom CRM integrations, secure staff portals, or AI-automated workflows, you're getting a system architected for growth and built to withstand the modern web.
              </p>
            </div>

            {/* Separator */}
            <div className="w-16 h-px bg-gradient-to-r from-[#c9a84c] to-transparent my-10" />

            {/* Credibility Anchors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "2025", label: "Founded" },
                { value: "12+", label: "Projects" },
                { value: "100%", label: "Custom" },
                { value: "24hr", label: "Response" },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-rajdhani text-2xl font-bold text-[#c9a84c]">{stat.value}</span>
                  <span className="text-[11px] md:text-[10px] tracking-[0.15em] uppercase text-white/30 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
