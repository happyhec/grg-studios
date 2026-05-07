'use client';

import dynamic from 'next/dynamic';
import LazySection from './LazySection';

const ServicesGrid     = dynamic(() => import('@/components/ServicesGrid'),     { ssr: false });
const PortfolioSection = dynamic(() => import('@/components/PortfolioSection'), { ssr: false });
const MotionLabBanner  = dynamic(() => import('@/components/MotionLabBanner'),  { ssr: false });
const AgencyProcess    = dynamic(() => import('@/components/AgencyProcess'),    { ssr: false });
const AgencyTestimonials = dynamic(() => import('@/components/AgencyTestimonials'), { ssr: false });
const AgencyPricing    = dynamic(() => import('@/components/AgencyPricing'),    { ssr: false });
const AgencyAbout      = dynamic(() => import('@/components/AgencyAbout'),      { ssr: false });
const FAQ              = dynamic(() => import('@/components/FAQ'),              { ssr: false });
const AgencyContact    = dynamic(() => import('@/components/AgencyContact'),    { ssr: false });

export default function HomeClientSections() {
  return (
    <>
      {/* id is on the LazySection wrapper so it exists in the DOM immediately,
          allowing /#hash navigation and scrollToSection() to find targets
          before the lazy content has rendered. */}

      <LazySection id="services" height="600px">
        <ServicesGrid />
      </LazySection>

      <LazySection id="work" height="800px">
        <PortfolioSection />
      </LazySection>

      <LazySection height="400px">
        <MotionLabBanner />
      </LazySection>

      <LazySection id="process" height="600px">
        <AgencyProcess />
      </LazySection>

      <LazySection id="testimonials" height="400px">
        <div className="bg-black py-20 border-y border-white/5">
          <AgencyTestimonials />
        </div>
      </LazySection>

      <LazySection id="pricing" height="600px">
        <AgencyPricing />
      </LazySection>

      <LazySection id="about" height="600px">
        <AgencyAbout />
      </LazySection>

      <LazySection id="faq" height="400px">
        <FAQ />
      </LazySection>

      <LazySection id="contact" height="600px">
        <AgencyContact />
      </LazySection>
    </>
  );
}
