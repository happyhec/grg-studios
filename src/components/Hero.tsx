import * as motion from "framer-motion/client";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="z-10 max-w-4xl"
      >
        <div className="mb-6 flex items-center justify-center gap-4 opacity-70">
          <div className="h-[1px] w-12 bg-white/30" />
          <span className="font-outfit text-sm font-semibold tracking-[0.3em] uppercase text-[#c9a84c]">
            Agentic Workflows
          </span>
          <div className="h-[1px] w-12 bg-white/30" />
        </div>
        <h1 className="font-outfit text-5xl font-light leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
          Architecting <br className="hidden md:block" />
          <span className="font-serif italic text-white/40">the</span> Impossible.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-white/50 leading-relaxed md:text-xl">
          A showcase of complex digital infrastructure, premium aesthetics, and full-stack solutions orchestrated entirely through advanced AI prompting by GRG Studios.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="rounded px-8 py-4 font-outfit text-xs font-bold tracking-widest uppercase transition-all bg-white text-black hover:bg-white/90">
            View Case Studies
          </button>
        </div>
      </motion.div>

      {/* Decorative Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/5 blur-[120px]" />
    </section>
  );
}
