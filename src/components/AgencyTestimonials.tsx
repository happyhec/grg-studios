'use client';

import { m } from 'framer-motion';

const testimonials = [
  {
    name: "Christopher G.",
    company: "ASR Entertainment",
    text: "They built us an amazing site, always kept to their deadlines, and exceeded our expectations. I would definitely do work with GRG Studios again.",
    result: "Automated Intake + 40% Increase in Leads"
  },
  {
    name: "Billy B.",
    company: "The Candied Cow",
    text: "The logo Hector made for us, really visualized the exact idea I had in mind. He was incredibly quick and professional, and delivered results not excuses.",
    result: "Brand Launch + Event Booking Growth"
  },
  {
    name: "Carl N.",
    company: "Bard Boys Dispensary",
    text: "Hector took the Bard Boys story and turned it into a visual masterpiece. From humble beginnings to breaking records on the field, and finally as Ventura County's leading up-and-coming dispensary.",
    result: "Cinematic Brand Narrative"
  },
  {
    name: "Mayra",
    company: "Mayra's Helping Hands",
    text: "Thank you from the bottom of my heart! It looks amazing, even better than expected. Thank you!",
    result: "Premium Service Portfolio"
  }
];

export default function AgencyTestimonials() {
  const duplicated = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="bg-[#080808] py-28 overflow-hidden">
      <div className="px-6 md:px-16 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">Testimonials</span>
        </div>
        <h2 className="font-rajdhani text-5xl md:text-6xl font-light text-[#f5f0e8]">
          Trusted by <em className="italic text-[#c9a84c] not-italic">local leaders</em>.
        </h2>
      </div>

      <div className="relative">
        {/* Gradient Overlays for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

        <m.div 
          className="flex gap-8 w-max px-6 md:px-16"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {duplicated.map((t, i) => (
            <div 
              key={i}
              className="w-[350px] md:w-[450px] flex-shrink-0 bg-[#111111] border border-white/5 p-10 rounded-xl hover:border-[rgba(201,168,76,0.3)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-[#c9a84c] text-3xl mb-8 font-serif">“</div>
                <p className="text-sm md:text-base text-[#f5f0e8] leading-relaxed mb-10 italic">
                  {t.text}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  {/* TODO: Add actual client logos or headshots here */}
                  <span className="text-[#c9a84c] font-serif text-lg">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.2em] font-black uppercase text-[#c9a84c] mb-1">{t.result}</div>
                  <div className="text-sm font-medium text-[#f5f0e8]">{t.name}</div>
                  <div className="text-xs text-[#a3a39c] uppercase tracking-widest">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
