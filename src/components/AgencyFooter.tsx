import Link from 'next/link';
import Image from 'next/image';
import scores from '../../public/lighthouse-scores.json';

export default function AgencyFooter() {
  return (
    <footer className="bg-[#080808] border-t border-[rgba(255,255,255,0.05)] pt-20 pb-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
          <Link href="/" className="block">
            <Image 
              src="/images/logo.png" 
              alt="GRG Studios" 
              width={100} 
              height={36} 
              className="filter invert object-contain"
            />
          </Link>

          <div className="text-center md:text-left text-[11px] leading-relaxed text-[#a3a39c] tracking-wide">
            <strong className="text-[#c9a84c] font-bold">GRG STUDIOS</strong> is a specialized creative unit of GRG Innovations LLC &nbsp;·&nbsp; Est. 2021<br />
            Camarillo • Ventura County • California &nbsp;·&nbsp; info@grg-studios.com
          </div>

          <ul className="flex items-center gap-6 list-none p-0 m-0">
            {[
              { name: 'Services', href: '/#services' },
              { name: 'Work', href: '/#work' },
              { name: 'Pricing', href: '/#pricing' },
              { name: 'Contact', href: '/#contact' },
            ].map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className="text-[10px] tracking-widest uppercase font-medium text-[#a3a39c] hover:text-[#f5f0e8] transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* The "If you know, you know" nerdy section */}
        <div className="pt-10 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 font-mono text-[9px] uppercase tracking-[0.2em] text-[#555]">
            <div className="flex items-center gap-2">
              <span className="text-[#c9a84c]/40">Perf</span>
              <span className="text-[#a3a39c]">{scores.performance}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#c9a84c]/40">A11y</span>
              <span className="text-[#a3a39c]">{scores.accessibility}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#c9a84c]/40">Best</span>
              <span className="text-[#a3a39c]">{scores.bestPractices}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#c9a84c]/40">SEO</span>
              <span className="text-[#a3a39c]">{scores.seo}</span>
            </div>
            <div className="hidden md:block w-[1px] h-3 bg-white/5" />
            <div className="hidden md:block text-[8px] text-[#444]">
              Validated {scores.date}
            </div>
          </div>

          <div className="text-[9px] font-mono text-[#444] uppercase tracking-widest">
            Hand-Coded with Precision &nbsp;·&nbsp; Next.js 16
          </div>
        </div>
      </div>
    </footer>
  );
}

