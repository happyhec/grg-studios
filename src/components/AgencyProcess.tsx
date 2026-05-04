'use client';

import { m } from 'framer-motion';

import { Activity, Binary, Cpu, Rocket } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Diagnostic & Architecture",
    icon: <Activity className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />,
    desc: "We perform a deep-tissue diagnostic of your current business flow to identify automation leaks and architect a high-performance blueprint."
  },
  {
    num: "02",
    title: "Protocol Development",
    icon: <Binary className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />,
    desc: "Mapping the logic layers. We define the tech stack, data schemas, and user-flow protocols required to hit your business objectives."
  },
  {
    num: "03",
    title: "System Architecture",
    icon: <Cpu className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />,
    desc: "High-integrity development phase. We build, stress-test, and refine your custom digital asset using clean-code architecture and agentic workflows."
  },
  {
    num: "04",
    title: "Deployment & Scaling",
    icon: <Rocket className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />,
    desc: "The jump to lightspeed. We deploy to high-availability environments and stay on standby for further operational optimization."
  }
];

const techStack = [
  "Next.js 15", "TypeScript", "Framer Motion", "Tailwind CSS", "GSAP", 
  "Three.js / WebGL", "Node.js", "PostgreSQL", "AI Agents", "CI/CD Pipelines"
];

export default function AgencyProcess() {
  return (
    <section id="process" className="bg-[#080808] py-28 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">The Protocol</span>
          </div>
          <h2 className="font-rajdhani text-5xl md:text-7xl font-light text-[#f5f0e8] mb-4">
            Built for <em className="italic text-[#c9a84c] not-italic">precision</em> & performance.
          </h2>
          <p className="text-[#a3a39c] text-sm md:text-base max-w-2xl mx-auto font-outfit">
            Our 4-stage architectural framework ensures every pixel serves a purpose and every line of code drives revenue.
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

        {/* Master Stack Authority Wall */}
        <div className="mt-32 border-t border-white/5 pt-20">
          <div className="flex flex-col items-center">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] mb-12 font-bold px-6 py-2 border border-[#c9a84c]/20 rounded-full bg-[#c9a84c]/5">The Master Stack</span>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-5xl px-6">
              {techStack.map((tech) => (
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
