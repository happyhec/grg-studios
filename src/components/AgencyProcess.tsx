'use client';

import { m } from 'framer-motion';
import { Search, Paintbrush, Hammer, Rocket } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Discovery & Planning",
    icon: <Search className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />,
    desc: "We start by learning how your business works — what's going well, what's frustrating, and where a better website or system could make the biggest difference."
  },
  {
    num: "02",
    title: "Design & Strategy",
    icon: <Paintbrush className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />,
    desc: "We map out exactly what we're building and why. This step defines how your site will look, what it will say, and how it will guide visitors to reach out."
  },
  {
    num: "03",
    title: "Build & Refine",
    icon: <Hammer className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />,
    desc: "This is where we build everything — your website, automations, or business tools. We test carefully and refine until everything works the way it should."
  },
  {
    num: "04",
    title: "Launch & Support",
    icon: <Rocket className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />,
    desc: "We go live and make sure everything runs smoothly. Then we stay available for questions or adjustments as you settle in and your business keeps growing."
  }
];

const builtWith = [
  "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "GSAP",
  "Three.js", "Node.js", "PostgreSQL", "AI Tools", "Cloudflare"
];

export default function AgencyProcess() {
  return (
    <section className="bg-[#080808] py-28 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">How We Work</span>
          </div>
          <h2 className="font-rajdhani text-5xl md:text-7xl font-light text-[#f5f0e8] mb-4">
            Simple process. <em className="italic text-[#c9a84c] not-italic">Real results.</em>
          </h2>
          <p className="text-[#a3a39c] text-sm md:text-base max-w-2xl mx-auto font-outfit">
            A clear, four-step process so you always know what's happening, what's coming next, and what you're getting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-white/5 z-0" />

          {steps.map((step, i) => (
            <m.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full border border-[rgba(201,168,76,0.18)] bg-[#111111] flex items-center justify-center mb-8 group-hover:border-[#c9a84c] transition-all duration-700 shadow-[0_0_30px_rgba(201,168,76,0.03)] group-hover:shadow-[0_0_40px_rgba(201,168,76,0.1)]">
                {step.icon}
              </div>
              <div className="text-[#c9a84c] font-mono text-[10px] tracking-widest mb-3">{step.num}</div>
              <h3 className="text-xl font-rajdhani font-semibold text-[#f5f0e8] mb-4 uppercase tracking-wider">{step.title}</h3>
              <p className="text-sm text-[#a3a39c] leading-relaxed max-w-[280px] font-outfit">
                {step.desc}
              </p>
            </m.div>
          ))}
        </div>

        {/* Tools We Use */}
        <div className="mt-32 border-t border-white/5 pt-20">
          <div className="flex flex-col items-center">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] mb-4 font-bold px-6 py-2 border border-[#c9a84c]/20 rounded-full bg-[#c9a84c]/5">Tools We Build With</span>
            <p className="text-[#555] text-xs mb-12 tracking-wide">The technology behind every project — so you know your site is built on solid, modern foundations.</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-5xl px-6">
              {builtWith.map((tech) => (
                <div key={tech} className="text-[#f5f0e8]/30 font-rajdhani text-xl md:text-2xl font-black uppercase tracking-widest hover:text-[#c9a84c] transition-colors cursor-default">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
