import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInsightBySlug, getAllInsightSlugs } from '@/lib/insights';
import { ArrowLeft, Clock, Shield, Zap, Target } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) return { title: 'Not Found' };

  return {
    title: `${insight.title} | GRG Studios Insights`,
    description: insight.seoDescription,
    openGraph: {
      title: insight.title,
      description: insight.seoDescription,
      type: 'article',
      publishedTime: insight.date,
      authors: [insight.author],
    },
  };
}

const categoryIcons: Record<string, React.ReactNode> = {
  Security: <Shield className="w-4 h-4" />,
  Performance: <Zap className="w-4 h-4" />,
  Strategy: <Target className="w-4 h-4" />,
};

export default async function InsightArticle({ params }: PageProps) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-16">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-[#a3a39c] hover:text-[#c9a84c] transition-colors text-sm mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All Insights
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase font-bold">
              {categoryIcons[insight.category] || null}
              <span>{insight.category}</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1 text-white/25 text-[10px] tracking-[0.15em] uppercase">
              <Clock className="w-3 h-3" />
              {insight.readTime}
            </div>
          </div>

          <h1 className="font-rajdhani text-4xl md:text-6xl font-bold text-[#f5f0e8] leading-tight mb-4">
            {insight.title}
          </h1>

          <p className="text-[#a3a39c] text-lg md:text-xl leading-relaxed mb-8">
            {insight.subtitle}
          </p>

          <div className="flex items-center gap-4 pt-6 border-t border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c] font-bold text-sm">
              HG
            </div>
            <div>
              <div className="text-[#f5f0e8] text-sm font-medium">{insight.author}</div>
              <div className="text-white/25 text-xs">
                {new Date(insight.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div
          className="insight-content prose prose-invert prose-lg max-w-none 
            prose-headings:font-rajdhani prose-headings:text-[#f5f0e8] prose-headings:font-bold
            prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-t prose-h2:border-white/5 prose-h2:pt-10
            prose-h3:text-xl prose-h3:text-[#c9a84c]
            prose-p:text-[#a0a098] prose-p:leading-[1.8] prose-p:mb-6
            prose-strong:text-[#f5f0e8] prose-strong:font-medium
            prose-a:text-[#c9a84c] prose-a:no-underline hover:prose-a:underline
            prose-li:text-[#a0a098]
            prose-hr:border-white/5
            prose-table:border-white/10
            prose-th:text-[#c9a84c] prose-th:text-xs prose-th:tracking-wider prose-th:uppercase prose-th:border-white/10 prose-th:px-4 prose-th:py-3
            prose-td:text-[#a0a098] prose-td:border-white/10 prose-td:px-4 prose-td:py-3
            prose-blockquote:border-l-[#c9a84c] prose-blockquote:bg-[#111111] prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:px-6
            prose-code:text-[#c9a84c] prose-code:bg-[#1a1a1a] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-ol:text-[#a0a098]
          "
          dangerouslySetInnerHTML={{ __html: insight.contentHtml }}
        />

        {/* Article Footer CTA */}
        <div className="mt-16 pt-10 border-t border-white/5">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-rajdhani text-2xl md:text-3xl text-[#f5f0e8] font-bold mb-4">
              Want a free Quick Performance Scan?
            </h3>
            <p className="text-[#a3a39c] text-sm md:text-base mb-8 max-w-lg mx-auto">
              I&apos;ll review your current site and send you a quick breakdown of speed issues, SEO gaps, and conversion problems — no strings attached.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#c9a84c] text-black font-bold text-sm tracking-wider uppercase rounded-md hover:bg-[#d4b85c] transition-colors"
            >
              Get My Free Scan
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
