'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Caleb J.",
    company: "ASR Entertainment",
    text: "GRG Studios delivered exactly what they promised. Our brand feels solid now, and the intake system they built has already saved my assistant 10+ hours a month.",
    result: "Automated Intake + 40% Increase in Leads"
  },
  {
    name: "Samantha L.",
    company: "The Candied Cow",
    text: "Our new identity and site have put us on the map for weddings and large events. The attention to detail is something you just don't see at typical agencies.",
    result: "Brand Launch + Event Booking Growth"
  },
  {
    name: "Marcus V.",
    company: "Third3ye Productions",
    text: "The motion systems they integrated are insane. People spent twice as long on our site because of the interactive portal. Incredible technical work.",
    result: "Interactive UX + High Engagement"
  },
  {
    name: "James D.",
    company: "Local Auto Detailing",
    text: "I was skeptical about AI, but the lead automation they set up for me is like having a person working for me 24/7 answering basic customer questions.",
    result: "AI Integration + Time Savings"
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

        <motion.div 
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
                  <div className="text-xs text-[#888880] uppercase tracking-widest">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
