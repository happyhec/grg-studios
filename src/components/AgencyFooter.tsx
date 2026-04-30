import Link from 'next/link';
import Image from 'next/image';

export default function AgencyFooter() {
  return (
    <footer className="bg-[#080808] border-t border-[rgba(255,255,255,0.05)] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <Link href="/" className="block">
          <Image 
            src="/images/logo.png" 
            alt="GRG Studios" 
            width={100} 
            height={36} 
            className="filter invert object-contain"
          />
        </Link>

        <div className="text-center md:text-left text-[11px] leading-relaxed text-[#888880] tracking-wide">
          <strong className="text-[#c9a84c] font-bold">GRG STUDIOS</strong> is a specialized creative unit of GRG Innovations LLC &nbsp;·&nbsp; Est. 2021<br />
          Camarillo • Ventura County • California &nbsp;·&nbsp; hector.garcia@grginnovations.com
        </div>

        <ul className="flex items-center gap-6 list-none p-0 m-0">
          {[
            { name: 'Services', href: '/#services' },
            { name: 'Work', href: '/#bard-boys' },
            { name: 'Pricing', href: '/#pricing' },
            { name: 'Contact', href: '/#contact' },
          ].map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                className="text-[10px] tracking-widest uppercase font-medium text-[#888880] hover:text-[#f5f0e8] transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
