'use client';

import { m, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';

const services = [
  {
    num: "01",
    icon: "✦",
    title: "Websites",
    desc: "We build custom websites that make your business look professional, load fast, and help turn visitors into real leads.",
    tags: ["Fast front-end builds", "Responsive layouts", "SEO-ready structure"],
    from: "From $2,999"
  },
  {
    num: "02",
    icon: "⬢",
    title: "Automation",
    desc: "We automate repetitive tasks so you spend less time doing everything manually and more time focusing on the work that matters.",
    tags: ["Forms", "Workflows", "Integrations", "Task setup"],
    from: "From $1,500"
  },
  {
    num: "03",
    icon: "◈",
    title: "Business Systems",
    desc: "We help set up the digital side of your business so your website, inquiries, follow-ups, and workflows feel more organized and easier to manage.",
    tags: ["Organized tools", "Cleaner operations", "Digital handoff"],
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
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#111111] p-10 border border-[rgba(201,168,76,0.18)] overflow-hidden"
    >
      {/* Tactical Optics Spotlight */}
      <m.div
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
    </m.div>
  );
}

export default function ServicesGrid() {
  return (
    <section className="bg-[#111111] py-28 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">What We Offer</span>
            </div>
            <h2 className="font-rajdhani text-5xl md:text-7xl font-light leading-tight text-[#f5f0e8]">
              Tools that help you <em className="italic text-[#c9a84c] not-italic">grow</em> with less friction.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[#a3a39c] leading-relaxed text-left md:text-right">
            We help businesses get better websites, save time with automation, and put the right systems in place to grow without the technical overwhelm.
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
