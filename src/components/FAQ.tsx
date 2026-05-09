'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Why choose GRG Studios over a standard freelancer?",
    answer: "Most freelancers focus on making your site look good and leave it at that. We go further — we think about how your site actually works for your business, how it brings in new customers, and how it can save you time. You get a site that looks great and actually does something, not one that sits there collecting dust."
  },
  {
    question: "How long does a typical project take?",
    answer: "A standard multi-page custom website typically launches in 5–7 business days. More complex builds — like sites with custom animations, booking systems, or third-party integrations — usually take 2–3 weeks. We move fast without cutting corners."
  },
  {
    question: "What is your process for a custom build?",
    answer: "We follow four clear steps: Discovery (we learn your goals and your business), Strategy (we plan the structure and messaging), Build (we design and develop everything), and Launch (we go live and make sure everything works). You're involved and updated at every stage."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes. Every project includes 30 days of support after launch. After that, if you need updates, SEO work, new pages, or anything else, we offer flexible monthly plans to keep your site current and growing."
  },
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
    <section className="bg-[#111111] py-28 px-6 md:px-16 border-t border-white/5 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">Questions & Answers</span>
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
