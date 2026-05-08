'use client';

import { useState } from 'react';
import PhoneReveal from '@/components/PhoneReveal';


const projectTypes = [
  "Custom Website",
  "Brand Identity / Logo",
  "Automation & AI Workflows",
  "Operational Dashboard / Tools",
  "SEO & Local Search",
  "Full Rebuild / Redesign",
  "Not Sure Yet"
];

const budgetRanges = [
  "Under $2,000",
  "$2,000 – $4,500",
  "$4,500 – $7,500",
  "$7,500+",
  "Let's Discuss"
];

export default function AgencyContact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setStatus('sent');
        form.reset();
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }

  return (
    <section className="bg-[#080808] py-28 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Header — Left-aligned for authority */}
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">Get Started</span>
          </div>
          <h2 className="font-rajdhani text-5xl md:text-7xl font-light text-[#f5f0e8] leading-[0.95] mb-6">
            Ready to build<br />something <em className="italic text-[#c9a84c] not-italic">remarkable</em>?
          </h2>
          <p className="text-[#a3a39c] text-sm md:text-base leading-relaxed">
            Tell us a bit about your project. No pressure, no jargon — just a straightforward conversation about what you need and how we can help.
          </p>
          
          {/* Urgency Signal */}
          <div className="mt-6 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-[11px] text-white/40 font-outfit">Currently accepting new projects for <strong className="text-[#f5f0e8]">Q3 2026</strong></span>
          </div>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] font-bold">Your Name</label>
            <input 
              id="contact-name"
              type="text" 
              name="name" 
              required 
              placeholder="First and last name"
              className="bg-[#111111] border border-white/10 rounded-lg px-5 py-4 text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-white/20"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] font-bold">Email Address</label>
            <input 
              id="contact-email"
              type="email" 
              name="email" 
              required 
              placeholder="you@company.com"
              className="bg-[#111111] border border-white/10 rounded-lg px-5 py-4 text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors placeholder:text-white/20"
            />
          </div>

          {/* Project Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-project" className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] font-bold">Project Type</label>
            <select 
              id="contact-project"
              name="project_type" 
              required
              defaultValue=""
              className="bg-[#111111] border border-white/10 rounded-lg px-5 py-4 text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-white/20">Select a project type</option>
              {projectTypes.map(type => (
                <option key={type} value={type} className="bg-[#111111]">{type}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-budget" className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] font-bold">Budget Range</label>
            <select 
              id="contact-budget"
              name="budget" 
              required
              defaultValue=""
              className="bg-[#111111] border border-white/10 rounded-lg px-5 py-4 text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-white/20">Select your budget</option>
              {budgetRanges.map(range => (
                <option key={range} value={range} className="bg-[#111111]">{range}</option>
              ))}
            </select>
          </div>

          {/* Message — Full Width */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="contact-message" className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] font-bold">Tell Us About Your Project <span className="text-white/20 normal-case tracking-normal">(optional)</span></label>
            <textarea 
              id="contact-message"
              name="message" 
              rows={4}
              placeholder="What are you looking to build? Any specific goals, timelines, or inspiration?"
              className="bg-[#111111] border border-white/10 rounded-lg px-5 py-4 text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors resize-none placeholder:text-white/20"
            />
          </div>

          {/* Submit Button — Full Width */}
          <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6">
            <button 
              type="submit" 
              disabled={status !== 'idle'}
              className={`w-full sm:w-auto px-12 py-5 text-xs tracking-[0.25em] uppercase font-black rounded-full transition-all duration-500 shadow-xl shadow-black/50 ${
                status === 'sent' ? 'bg-green-600 text-white shadow-green-900/30' :
                status === 'error' ? 'bg-red-600 text-white' :
                'bg-[#c9a84c] text-black hover:bg-[#e8d5a3] active:scale-[0.97]'
              }`}
            >
              {status === 'sending' ? 'Sending...' : 
               status === 'sent' ? 'Message Sent ✓' : 
               status === 'error' ? 'Something went wrong' : 
               'Start My Project'}
            </button>
            <span className="text-[11px] text-white/25 font-outfit">We typically respond within 24 hours.</span>
          </div>
        </form>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-12" />

        {/* Contact Info Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-[#a3a39c] text-sm">
            <PhoneReveal variant="contact-bar" />
            <div className="hidden md:block w-px h-4 bg-white/10" />
            <a href="https://instagram.com/grg_studios" target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-[#c9a84c] transition-colors">
              <span className="text-[#c9a84c]">◈</span> @grg_studios
            </a>
          </div>
          
          {/* Teardown CTA — Separate action, not self-referencing */}
          <a 
            href="javascript:void(0)" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('contact-message')?.scrollIntoView({ behavior: 'smooth' }); document.getElementById('contact-message')?.focus(); }} 
            className="text-[#c9a84c] text-xs font-medium border border-[#c9a84c]/30 px-6 py-3 rounded-full hover:bg-[#c9a84c]/10 transition-all whitespace-nowrap"
          >
            Request Free Website Teardown →
          </a>
        </div>
      </div>
    </section>
  );
}
