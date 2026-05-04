import { Metadata } from 'next';
import Link from 'next/link';
import { getAllInsights, InsightMeta } from '@/lib/insights';
import { ArrowRight, Shield, Zap, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights | GRG Studios',
  description: 'Technical insights on web security, performance, and digital infrastructure from GRG Studios. Written by Hector Garcia.',
};

const categoryIcons: Record<string, React.ReactNode> = {
  Security: <Shield className="w-4 h-4" />,
  Performance: <Zap className="w-4 h-4" />,
  Strategy: <Target className="w-4 h-4" />,
};

function InsightCard({ insight, index }: { insight: InsightMeta; index: number }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group block bg-[#111111] border border-white/5 rounded-2xl p-8 md:p-10 hover:border-[#c9a84c]/30 transition-all duration-500 hover:bg-[#111111]/80"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1.5 text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase font-bold">
          {categoryIcons[insight.category] || null}
          <span>{insight.category}</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <span className="text-[10px] tracking-[0.15em] uppercase text-white/25">{insight.readTime}</span>
      </div>

      {/* Title */}
      <h2 className="font-rajdhani text-2xl md:text-3xl font-bold text-[#f5f0e8] mb-3 group-hover:text-[#c9a84c] transition-colors duration-300 leading-tight">
        {insight.title}
      </h2>

      {/* Subtitle */}
      <p className="text-[#a3a39c] text-sm md:text-base leading-relaxed mb-8">
        {insight.subtitle}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="text-[10px] tracking-[0.15em] uppercase text-white/20">
          {new Date(insight.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <div className="flex items-center gap-2 text-[#c9a84c] text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Read
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function InsightsPage() {
  const insights = getAllInsights();

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[0.5px] bg-[#c9a84c]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">
              Technical Insights
            </span>
          </div>
          <h1 className="font-rajdhani text-5xl md:text-7xl font-light leading-tight text-[#f5f0e8] mb-6">
            Technical Briefs.
          </h1>
          <p className="text-[#a3a39c] text-base md:text-lg max-w-2xl leading-relaxed">
            Deep dives into web security, performance architecture, and the architectural decisions behind high-converting digital systems. Written from the intersection of cybersecurity and design.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <InsightCard key={insight.slug} insight={insight} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-12 border-t border-white/5 text-center">
          <p className="text-[#a3a39c] text-sm mb-6">
            Want a free Quick Performance Scan of your current website? I&apos;ll show you exactly what&apos;s costing you customers — speed, SEO, and conversion gaps.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#c9a84c] text-black font-bold text-sm tracking-wider uppercase rounded-md hover:bg-[#d4b85c] transition-colors"
          >
            Get My Free Scan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
