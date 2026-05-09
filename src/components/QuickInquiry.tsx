'use client';

export default function QuickInquiry() {
  return (
    <section className="bg-[#0a0a0a] py-20 px-6 md:px-16 border-y border-white/5 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">Now Taking New Clients</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-rajdhani font-light text-white leading-tight mb-6">
            Ready to make your business <em className="text-[#c9a84c] not-italic">look and work better</em> online?
          </h2>
          <p className="text-[#a3a39c] text-sm md:text-base leading-relaxed max-w-lg mb-0 font-outfit">
            Skip the scrolling. Tell us what your business needs and we'll figure out the best way to help.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <a 
            href="#contact" 
            className="px-8 py-4 bg-[#c9a84c] text-black text-[11px] font-black tracking-[0.2em] uppercase rounded-full hover:bg-[#e8d5a3] transition-all text-center"
          >
            Start Inquiry
          </a>
          <a 
            href="https://instagram.com/grg_studios" 
            target="_blank" 
            className="px-8 py-4 bg-transparent border border-white/10 text-white/60 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-white/5 transition-all text-center"
          >
            View Work
          </a>
        </div>
      </div>
    </section>
  );
}
