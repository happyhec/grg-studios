'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';

const services = [
  {
    num: "01",
    icon: "✦",
    title: "Systems-First Web",
    desc: "We build websites that do the work for you. Every layout is hand-coded, conversion-optimized, and integrated with the tools you use to run your business.",
    tags: ["Custom Dev", "UX/UI", "High Performance"],
    from: "From $2,999"
  },
  {
    num: "02",
    icon: "⬢",
    title: "Automation & AI",
    desc: "Stop doing manual tasks. We integrate AI-assisted workflows and lead automation directly into your digital footprint to save you hours every week.",
    tags: ["Lead Intake", "Workflow", "AI Tools"],
    from: "From $1,500"
  },
  {
    num: "03",
    icon: "◈",
    title: "Strategic Branding",
    desc: "A visual story that commands attention. From high-fidelity logo systems to sensory-driven brand guidelines, we build identities that resonate with premium markets.",
    tags: ["Logo System", "HSL Palettes", "Typography"],
    from: "From $1,200"
  },
  {
    num: "04",
    icon: "◇",
    title: "E-Commerce Engines",
    desc: "Scalable retail infrastructure designed for high-conversion cinematic shopping. We build proprietary checkout flows and inventory sync systems that handle the load.",
    tags: ["Cinematic Retail", "Stripe API", "Inventory Sync"],
    from: "From $3,500"
  },
  {
    num: "05",
    icon: "◉",
    title: "SEO & Authority",
    desc: "Get found by the right people. We implement on-page optimization, technical SEO, and local search strategies built for sustainable dominance in your market.",
    tags: ["Technical SEO", "Local Authority", "Speed Prep"],
    from: "From $500/mo"
  },
  {
    num: "06",
    icon: "⊕",
    title: "Operational Dashboards",
    desc: "Staff portals, digital waitlists, and internal admin tools. Custom-built operational systems that replace spreadsheets with high-performance data portals.",
    tags: ["Staff Tools", "Admin Nodes", "Data Systems"],
    from: "Custom Quote"
  }
];

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#111111] p-10 border border-[rgba(201,168,76,0.18)] overflow-hidden"
    >
      {/* Tactical Optics Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(201, 168, 76, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 border border-[rgba(201,168,76,0.18)] rounded-full flex items-center justify-center text-[#c9a84c] group-hover:bg-[rgba(201,168,76,0.07)] group-hover:rotate-12 transition-all">
            {service.icon}
          </div>
          <span className="font-rajdhani text-4xl font-light text-[rgba(201,168,76,0.12)] group-hover:text-[rgba(201,168,76,0.2)] transition-colors">
            {service.num}
          </span>
        </div>

        <h3 className="text-xl font-medium mb-4 text-[#f5f0e8] group-hover:text-[#c9a84c] transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-[#a3a39c] leading-relaxed mb-6">
          {service.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map(tag => (
            <span key={tag} className="text-[10px] tracking-wider uppercase text-[#c9a84c]/60 border border-[rgba(201,168,76,0.1)] px-2 py-1 rounded-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Pricing Anchor */}
        <div className="pt-4 border-t border-white/5">
          <span className="text-[11px] font-medium text-[#c9a84c] tracking-wide">{service.from}</span>
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#c9a84c] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="services" className="bg-[#111111] py-28 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">What We Offer</span>
            </div>
            <h2 className="font-rajdhani text-5xl md:text-7xl font-light leading-tight text-[#f5f0e8]">
              Building the <em className="italic text-[#c9a84c] not-italic">systems</em> that drive your growth.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[#a3a39c] leading-relaxed text-left md:text-right">
            We don't just design pages; we build cohesive digital systems. From brand identity to automated workflows, we handle the technical architecture so you can lead your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
