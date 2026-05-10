'use client';

import { m, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { MouseEvent } from 'react';

const tiers = [
  {
    name: "Launch Page",
    price: "$799",
    tagline: "A single high-performance, custom-coded page that converts. Fast to ship, built to impress, and a real foundation to grow from.",
    features: [
      "Custom-coded single-page site",
      "Mobile-first responsive design",
      "SEO setup so Google can find you",
      "Contact form or click-to-call CTA",
      "Fast, reliable hosting",
      "1 round of revisions"
    ],
    bestFor: "New businesses, side projects, and anyone ready to test the market fast.",
    featured: false,
    entry: true
  },
  {
    name: "The System",
    price: "$2,999",
    tagline: "A custom multi-page website built to give your business more clarity, stronger structure, and lead-gen logic.",
    features: [
      "Custom multi-page website",
      "Smart layout that guides visitors to contact you",
      "Time-saving automations",
      "Full SEO foundation",
      "3 rounds of revisions",
      "30-day post-launch support"
    ],
    bestFor: "Service businesses, rebrands, and companies ready to level up.",
    featured: true
  },
  {
    name: "Authority",
    price: "Starting at $4,500",
    tagline: "A higher-touch build for businesses that want a stronger brand presence and a more tailored digital system.",
    features: [
      "Everything in The System",
      "Brand identity or logo system",
      "Expanded SEO foundation",
      "Strategy session and content direction",
      "Priority communication",
      "Custom scope based on goals"
    ],
    bestFor: "Businesses investing in a stronger long-term presence.",
    featured: false
  },
  {
    name: "Signature",
    price: "Starting at $7,500",
    tagline: "A premium custom experience for brands that want stronger visual storytelling and immersive interaction.",
    features: [
      "Advanced motion & scroll systems",
      "Custom interactive workflows",
      "Premium visual storytelling",
      "Strategy-led planning & scope",
      "Optional 3D or immersive elements",
      "Priority launch & post-launch audit"
    ],
    bestFor: "Brands ready for an elevated and immersive digital presence.",
    featured: false,
    signature: true
  }
];

const addons = [
  { 
    name: "Digital Infrastructure Review", 
    price: "From $1,200",
    detail: "A detailed written review of your website and online presence — what's working, what's holding you back, and a clear action plan for what to fix first. This is a real strategy document, not a quick automated scan."
  },
  { 
    name: "Logo & Brand Systems", 
    price: "From $1,800",
    detail: "A complete logo and visual identity — colors, fonts, and brand files — so your business looks consistent and professional across your website, social media, and printed materials."
  },
  { 
    name: "Automation & Lead Ops", 
    price: "From $2,500",
    detail: "Systems that capture new leads automatically, send follow-up messages, and keep your calendar organized — so you spend less time on admin and more time doing the actual work."
  },
  { 
    name: "Strategic SEO Sync", 
    price: "From $750/mo",
    detail: "Ongoing work to help your business show up higher on Google, get found on Google Maps, and stay visible as search trends change. Updated monthly."
  },
  { 
    name: "Custom Admin Dashboards", 
    price: "Custom Quote",
    detail: "A custom management page built for your team — track orders, staff schedules, inventory, or anything your business needs to keep tabs on, all in one place."
  }
];

function PricingCard({ tier, index }: { tier: typeof tiers[0], index: number }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function scrollToContact(e: React.MouseEvent) {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: navigate to homepage contact if on a different route
      window.location.href = '/#contact';
    }
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`group relative p-10 border flex flex-col h-full bg-[#111111] ${
        tier.signature ? 'border-[rgba(201,168,76,0.5)] bg-gradient-to-br from-[rgba(201,168,76,0.05)] to-[#0a0a0a]' 
        : (tier as any).entry ? 'border-dashed border-[rgba(201,168,76,0.25)]'
        : 'border-[rgba(201,168,76,0.18)]'
      }`}
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

      <div className="relative z-10 flex flex-col h-full">
        {tier.featured && (
          <div className="absolute top-[-12px] right-8 bg-[#c9a84c] text-black text-[10px] font-black uppercase py-1 px-3 tracking-widest rounded-full">
            Most Popular
          </div>
        )}
        
        <h3 className={`font-rajdhani text-2xl tracking-[0.1em] uppercase mb-4 ${tier.signature ? 'text-[#c9a84c] tracking-[0.2em]' : 'text-[#f5f0e8]'}`}>
          {tier.name}
        </h3>
        
        <div className="font-rajdhani text-4xl font-light mb-6 text-white">
          {tier.price.includes('$') && <span className="text-xl mr-1">$</span>}
          {tier.price.replace('$', '').replace('Starting at ', '')}
          {tier.price.includes('Starting at') && <div className="text-xs uppercase tracking-widest text-[#a3a39c] mt-1">Starting at</div>}
        </div>

        <p className="text-sm text-[#a3a39c] leading-relaxed mb-8">
          {tier.tagline}
        </p>

        <div className="h-px bg-[rgba(201,168,76,0.1)] mb-8" />
        
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c9a84c] mb-6">What's included</p>
        
        <ul className="space-y-4 mb-10 flex-grow">
          {tier.features.map(f => (
            <li key={f} className="flex items-start gap-3 text-xs text-[#f5f0e8]/80 leading-relaxed">
              <span className="text-[#c9a84c]">✦</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="h-px bg-[rgba(201,168,76,0.1)] mb-8 mt-auto" />

        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c9a84c] mb-2">Best for</p>
          <p className="text-xs text-[#a3a39c] leading-relaxed italic">{tier.bestFor}</p>
        </div>

        <button
          onClick={scrollToContact}
          className={`text-center py-4 text-xs tracking-widest uppercase font-bold rounded-sm transition-all w-full ${
            tier.featured 
            ? 'bg-[#c9a84c] text-black hover:bg-[#e8d5a3]' 
            : 'border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10'
          }`}
        >
          {tier.name === "The System" ? "Start Your Project" : tier.name === "Launch Page" ? "Get Started" : "Let's Talk"}
        </button>
      </div>
    </m.div>
  );
}

export default function AgencyPricing() {
  return (
    <section id="pricing" className="bg-[#080808] py-28 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">Investment</span>
          </div>
          <h2 className="font-rajdhani text-5xl md:text-7xl font-light leading-tight text-[#f5f0e8] mb-6">
            Transparent pricing. <em className="italic text-[#c9a84c] not-italic">Clear scope.</em>
          </h2>
          <p className="max-w-xl mx-auto text-sm text-[#a3a39c] leading-relaxed mb-4">
            Choose the level that fits where your business is now. Every project starts with a discovery call and is built around your goals, not a template.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        <div className="bg-white/[0.02] p-10 md:p-16 border border-white/5 rounded-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-rajdhani text-3xl text-[#c9a84c] uppercase tracking-widest mb-2">Add-ons</h3>
            <p className="text-[#a3a39c] text-sm mb-12">Need more than a website? These can be added to any project or scoped separately.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
              {addons.map(a => (
                <div key={a.name} className="group relative border-b border-[rgba(201,168,76,0.3)] pb-4">
                  <strong className="block text-[#f5f0e8] text-sm mb-1 group-hover:text-[#c9a84c] transition-colors">{a.name}</strong>
                  <span className="text-[#c9a84c] text-xs font-medium uppercase tracking-widest">{a.price}</span>
                  
                  {/* Technical Detail HUD (Hover on Desktop, Always on Mobile) */}
                  <div className="mt-4 text-[10px] leading-relaxed text-[#a3a39c] font-outfit opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:translate-y-2 transition-all duration-300">
                    {a.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#c9a84c]/5 blur-[120px] rounded-full pointer-events-none" />
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <p className="text-xs text-[#a3a39c]">Not sure which option fits? <button onClick={(e) => { e.preventDefault(); const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); else window.location.href='/#contact'; }} className="text-[#c9a84c] hover:underline underline-offset-4">Reach out</button> and we'll scope it together.</p>
          <div className="hidden md:block w-1.5 h-1.5 bg-[#c9a84c] rounded-full" />
          <div className="bg-[#c9a84c] text-black text-[10px] font-black uppercase px-5 py-2 rounded-full tracking-widest">
            Need something more specific? We'll scope it together on a call.
          </div>
        </div>
      </div>
    </section>
  );
}
