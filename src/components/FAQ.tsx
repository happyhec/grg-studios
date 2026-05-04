'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Why choose GRG Studios over a standard freelancer?",
    answer: "Most freelancers stop at 'making it look good.' We build high-performance digital systems. We focus on lead generation, automation, and tech architecture that actually grows your business, not just a static page you forget about."
  },
  {
    question: "How long does a typical project take?",
    answer: "With our AI-augmented, not automated, workflows, a standard multi-page custom site typically launches in 5-7 days. Complex builds with custom animations, integrations, or agentic systems usually take 2-3 weeks. We move fast without cutting corners, because better tooling shouldn't mean longer waits for you."
  },
  {
    question: "What is your process for a custom build?",
    answer: "We follow a 4-step framework: Discovery (goals/research), Strategy (structure/messaging), Creation (design/development), and Launch (delivery/support). You're involved at every step via regular check-ins."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes. Every project includes 30 days of post-launch support. Beyond that, whether you need maintenance, SEO updates, or new features, we offer flexible Monthly Growth partnerships to keep your site ahead."
  },
  {
    question: "Are your prices negotiable?",
    answer: "Our pricing reflects the depth of expertise and custom work required. While we don't 'haggle', we are happy to phase projects for smaller budgets—starting with a high-impact foundation and building out over time."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Generate JSON-LD Schema string
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="bg-[#111111] py-28 px-6 md:px-16 border-t border-white/5 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">Common Inquiries</span>
          </div>
          <h2 className="font-rajdhani text-5xl md:text-6xl font-light text-[#f5f0e8]">
            Frequently Asked <em className="italic text-[#c9a84c] not-italic">Questions</em>.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/5 bg-white/[0.02] rounded-lg overflow-hidden transition-colors hover:border-[#c9a84c]/20">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
              >
                <span className="text-sm md:text-base font-medium text-[#f5f0e8] group-hover:text-[#c9a84c] transition-colors">
                  {faq.question}
                </span>
                <span className={`text-[#c9a84c] text-xl transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 md:px-8 pb-8 text-sm text-[#a3a39c] leading-relaxed border-t border-white/5 pt-6">
                      {faq.answer}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
