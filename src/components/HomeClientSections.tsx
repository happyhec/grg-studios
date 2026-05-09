'use client';

import LazySection from './LazySection';
import ServicesGrid from '@/components/ServicesGrid';
import PortfolioSection from '@/components/PortfolioSection';
import MotionLabBanner from '@/components/MotionLabBanner';
import AgencyProcess from '@/components/AgencyProcess';
import AgencyTestimonials from '@/components/AgencyTestimonials';
import AgencyPricing from '@/components/AgencyPricing';
import AgencyAbout from '@/components/AgencyAbout';
import FAQ from '@/components/FAQ';
import AgencyContact from '@/components/AgencyContact';

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
