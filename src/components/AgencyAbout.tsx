'use client';

import { m } from 'framer-motion';

/**
 * AgencyAbout v3 — Company-First Trust Section
 * Focus is on the studio's philosophy, capabilities, and credentials.
 * No personal introduction — let the work speak.
 */
export default function AgencyAbout() {
  return (
    <section id="about" className="bg-[#0a0a0a] py-28 px-6 md:px-16 border-y border-white/5">
      <div className="max-w-6xl mx-auto">

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
            <span className="text-[11px] md:text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">About the Studio</span>
          </div>
          <h2 className="font-rajdhani text-4xl md:text-6xl font-light leading-tight text-[#f5f0e8] mb-10">
            Rooted in craft.<br /><em className="italic text-[#c9a84c] not-italic">Driven by results.</em>
          </h2>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Philosophy */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="space-y-6 text-[#a3a39c] text-sm md:text-base leading-[1.8]"
          >
            <p>
              GRG Studios was built because local businesses deserved better than visual shells — websites that look okay but are architecturally brittle and insecure. We don't build shells. We build{' '}
              <strong className="text-[#f5f0e8] font-medium">hardened systems</strong>.
            </p>
            <p>
              Our work sits at the intersection of{' '}
              <strong className="text-[#f5f0e8] font-medium">Cybersecurity, Networking, and High-End Design</strong>. Every pixel we place is backed by a secure, high-performance architecture — because great design and resilient engineering aren't a tradeoff, they're a standard.
            </p>
            <p>
              We work exclusively with businesses ready to graduate from templates to professional infrastructure. Whether it's custom CRM integrations, secure staff portals, or AI-automated workflows, you're getting a system architected for growth and built to withstand the modern web.
            </p>
          </m.div>

          {/* Right: Stats + Pillars */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {/* Credibility Stats */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-12">
              {[
                { value: "Sub-1.5s",  label: "Load Times — Every Build" },
                { value: "100%",      label: "Core Web Vitals Pass Rate" },
                { value: "100%",      label: "Custom Code — Zero Templates" },
                { value: "Only",      label: "Security-First Studio in Ventura County" },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-rajdhani text-2xl font-bold text-[#c9a84c]">{stat.value}</span>
                  <span className="text-[11px] md:text-[10px] tracking-[0.12em] uppercase text-white/30 mt-1 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="w-16 h-px bg-gradient-to-r from-[#c9a84c] to-transparent mb-10" />

            {/* Core Pillars */}
            <div className="space-y-5">
              {[
                { icon: '⬡', title: 'Security-First Architecture', desc: 'Every build is hardened from the ground up — not patched after the fact.' },
                { icon: '⬡', title: 'Performance Without Compromise', desc: 'Lighthouse-validated scores. Fast by design, not by accident.' },
                { icon: '⬡', title: 'Systems That Scale', desc: 'Custom CRMs, AI workflows, and automations built to grow with you.' },
              ].map(p => (
                <div key={p.title} className="flex gap-4 items-start">
                  <span className="text-[#c9a84c] text-sm mt-0.5 shrink-0">{p.icon}</span>
                  <div>
                    <div className="text-[#f5f0e8] text-sm font-medium mb-1">{p.title}</div>
                    <div className="text-[#a3a39c] text-xs leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
