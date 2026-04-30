"use client";

import { motion } from "framer-motion";

const TIMELINE_STEPS = [
  {
    title: "1. Data Modeling",
    description: "Architecting relational databases using Drizzle ORM to handle dynamic state such as dynamic business hours, menus, and locations.",
    icon: "Database"
  },
  {
    title: "2. API Route Generation",
    description: "Constructing robust backend endpoints to safely query nested records from Wouter-driven complex UI parameters.",
    icon: "Server"
  },
  {
    title: "3. UI State Binding",
    description: "Hooking reactive state to Wouter navigation, creating smooth scroll-spy menus with integrated dietary filtering.",
    icon: "Layout"
  }
];

export default function DataTimeline() {
  return (
    <section className="relative flex flex-col items-center justify-center bg-black py-32 px-6">
      <div className="mb-20 text-center max-w-2xl px-6">
        <h2 className="font-outfit text-3xl font-light text-white md:text-5xl">Beyond the Visual</h2>
        <p className="mt-6 text-white/60 leading-relaxed text-lg">
          Eggs N Things: While aesthetics capture attention, true premium digital architecture requires robust logic. 
          Here is how agentic workflows assemble complex relational schemas on the fly.
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-4xl">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-white/10 -translate-x-1/2" />

        <div className="flex flex-col gap-12">
          {TIMELINE_STEPS.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`relative flex w-full flex-col md:flex-row ${isEven ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-black">
                   <div className="h-2 w-2 rounded-full bg-[#c9a84c]" />
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="glass-panel overflow-hidden rounded-xl bg-white/5 p-8 transition-transform hover:-translate-y-2">
                    <h3 className="font-outfit text-xl font-medium text-white">{step.title}</h3>
                    <p className="mt-3 text-sm text-white/50 leading-loose">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
