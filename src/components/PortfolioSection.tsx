'use client';

import { useEffect, useRef, useState } from 'react';

type Category = 'all' | 'realestate' | 'commerce' | 'retail' | 'restaurant' | 'brand';

type Project = {
  id: string;
  category: Exclude<Category, 'all'>;
  categoryLabel: string;
  categoryClass: string;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  href: string;
  scene: 'audrey' | 'mba' | 'shamrock' | 'mayra' | 'eggs';
  featured?: boolean;
  badge?: string;
  metrics?: string[];
  scores?: Array<{ value: string; label: string; tone: 'good' | 'gold' | 'cream' }>;
  frontImage?: string;
  backImage?: string;
  frontLabel?: string;
  backLabel?: string;
};

const filters: Array<{ id: Category; label: string }> = [
  { id: 'all', label: 'All Projects' },
  { id: 'realestate', label: 'Real Estate' },
  { id: 'commerce', label: 'Community' },
  { id: 'retail', label: 'Local Retail' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'brand', label: 'Brand' },
];

const projects: Project[] = [
  {
    id: 'audrey',
    category: 'realestate',
    categoryLabel: 'Luxury Real Estate Platform',
    categoryClass: 'catGold',
    title: 'Audrey Overton',
    description:
      'Premium luxury real estate platform for a high-touch advisor in Ventura County. Editorial public brand paired with a private command center.',
    features: [
      'Auth0-protected dashboard with leads, valuations, tasks, properties, and schedule modules',
      'AES-256-GCM field-level encryption on lead data stored in Neon Postgres',
      'Cloudflare Workers edge deployment via OpenNext for fast global delivery',
    ],
    tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind v4', 'Auth0', 'NeonDB', 'Cloudflare'],
    href: 'https://audrey.grginnovations.com/',
    scene: 'audrey',
    featured: true,
    badge: 'Auth0 Dashboard - 12 Operational Modules',
    metrics: ['Live', 'Dashboard Active'],
    scores: [
      { value: '100', label: 'SEO', tone: 'good' },
      { value: '95', label: 'A11y', tone: 'good' },
      { value: '92', label: 'BP', tone: 'good' },
    ],
    frontImage: '/screenshots/audrey-home.webp',
    backImage: '/screenshots/audrey-dashboard.webp',
    frontLabel: 'Homepage',
    backLabel: 'Dashboard',
  },
  {
    id: 'eggs',
    category: 'restaurant',
    categoryLabel: 'Restaurant Operations Platform',
    categoryClass: 'catCream',
    title: 'Eggs N Things',
    description:
      'Full-stack restaurant ecosystem spanning 5 locations. From legacy GoDaddy to a custom React architecture with staff portals, real-time menu sync, and automated waitlist management.',
    features: [
      'Staff Portal with sub-1s data persistence and live 86\'d menu sync across all locations',
      'Admin dashboard with holiday overrides, QR generation, and role-based access management',
      'Catering lead engine and digital waitlist automation for high-volume service',
    ],
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Cloudflare', 'Staff Portal'],
    href: 'https://eggsnthings.grginnovations.com/',
    scene: 'eggs',
    featured: true,
    badge: 'Multi-Location Operations — 5 Nodes Live',
    metrics: ['Live', '5 Locations', 'Staff Portal Active'],
    frontImage: '/assets/projects/eggs/full_homepage.png',
    backImage: '/assets/projects/eggs/staff_portal.png',
    frontLabel: 'Homepage',
    backLabel: 'Staff Portal',
  },
  {
    id: 'mba',
    category: 'retail',
    categoryLabel: 'Local Retail',
    categoryClass: 'catSage',
    title: 'MBA Ventura',
    description:
      'Appointment-first mattress showroom conversion engine. Dark-premium aesthetic built to book high-intent shoppers on any device.',
    features: [
      'Persistent mobile sticky CTA: always one tap to text or call',
      'Dynamic pricing grid with live in-stock pulse indicators',
      'Trust mesh: 400+ reviews, owner photos, USA-made badges, and financing suite',
    ],
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Cloudflare Pages'],
    href: 'https://mba-ventura.grginnovations.com/',
    scene: 'mba',
    metrics: ['Live', 'Mobile-First'],
    frontImage: '/screenshots/mba-home.webp',
    backImage: '/screenshots/mba-details.webp',
    frontLabel: 'Homepage',
    backLabel: 'Product Detail',
  },
  {
    id: 'shamrock',
    category: 'commerce',
    categoryLabel: 'Community Commerce',
    categoryClass: 'catAccent',
    title: 'Shamrock Club',
    description:
      'Two-sided marketplace connecting schools and nonprofits with business sponsors. RBAC portals, KPI dashboard, and receipt verification replace manual spreadsheets.',
    features: [
      'Role-based access for admins and business sponsors',
      'Digital receipt verification cuts admin labor by roughly 80%',
      'Real-time goal tracking with social proof activity feed',
    ],
    tags: ['React', 'Vite', 'TypeScript', 'Framer Motion', 'Tailwind'],
    href: 'https://shamrock.grginnovations.com/',
    scene: 'shamrock',
    badge: 'Partner Portal + Admin Dashboard',
    metrics: ['Live', 'RBAC Active'],
    frontImage: '/screenshots/shamrock-home.webp',
    backImage: '/screenshots/shamrock-dashboard.webp',
    frontLabel: 'Homepage',
    backLabel: 'Admin Portal',
  },
  {
    id: 'mayra',
    category: 'brand',
    categoryLabel: 'Personal Brand',
    categoryClass: 'catCream',
    title: 'Mayra',
    description:
      'Refined personal brand platform for high-trust service conversion. Elegant, fast, and built to make a lasting first impression on any device.',
    features: [
      'Brand-forward editorial layout with strong visual identity',
      'Mobile-optimized service flow with private dashboard access',
    ],
    tags: ['Next.js', 'Tailwind CSS', 'Cloudflare'],
    href: 'https://mayra.grginnovations.com/',
    scene: 'mayra',
    metrics: ['Live'],
    frontImage: '/screenshots/mayra-home.webp',
    backImage: '/screenshots/mayra-dashboard.webp',
    frontLabel: 'Mobile View',
    backLabel: 'Dashboard',
  },
];

function useReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      const fallback = globalThis.setTimeout(() => setVisible(true), 0);
      return () => globalThis.clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -28px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  as: Component = 'div',
  className = '',
  delay = '',
  children,
}: {
  as?: 'div' | 'article';
  className?: string;
  delay?: string;
  children: React.ReactNode;
}) {
  const { ref, visible } = useReveal();

  return (
    <Component ref={ref as never} className={`rv ${visible ? 'in' : ''} ${delay} ${className}`}>
      {children}
    </Component>
  );
}

function SceneArt({ scene }: { scene: Project['scene'] }) {
  if (scene === 'audrey') {
    return (
      <div className="sceneArt sAudrey">
        <div className="aoRing" />
        <div className="aoRing2" />
        <div className="aoMono">A/O</div>
        <div className="aoTag">Luxury Real Estate - Ventura County</div>
        <div className="aoChips">
          <div>Auth0 Protected</div>
          <div>Cloudflare Edge</div>
          <div>Encrypted Leads</div>
        </div>
        <div className="aoScores">
          <span>100<small>SEO</small></span>
          <span>95<small>A11y</small></span>
          <span>92<small>BP</small></span>
        </div>
      </div>
    );
  }

  if (scene === 'mba') {
    return (
      <div className="sceneArt sMba">
        <div className="mbaGlow" />
        <div className="mbaBed" />
        <div className="mbaHeadline">50-80% Off Retail</div>
        <div className="mbaOffer">Private Showroom</div>
        <div className="mbaSub">Mattress by Appointment</div>
        <div className="mbaPulses">
          <span><i />Queen In Stock</span>
          <span><i />King In Stock</span>
        </div>
      </div>
    );
  }

  if (scene === 'shamrock') {
    return (
      <div className="sceneArt sShamrock">
        <div className="shRadial" />
        <div className="shStats"><strong>$24,800</strong><span>Active Campaigns</span></div>
        <div className="shRbac">RBAC Portal</div>
        <div className="shClover">
          <span /><span /><span /><span /><i />
        </div>
        <div className="shBar">
          <div><span>Campaign Goal</span><span>68%</span></div>
          <b><i /></b>
        </div>
      </div>
    );
  }

  if (scene === 'mayra') {
    return (
      <div className="sceneArt sMayra">
        <div className="myG1" />
        <div className="myG2" />
        <div className="myOuter" />
        <div className="myInner" />
        <div className="myLetter">M</div>
        <div className="myDivider" />
        <div className="myPills"><span>Personal Brand</span><span>Dashboard</span></div>
      </div>
    );
  }

  return (
    <div className="sceneArt sEggs">
      <div className="egGlow" />
      <div className="egIcons"><span>EG</span><span>CAFE</span><span>AM</span></div>
      <div className="egEgg" />
      <div className="egYolk" />
      <div className="egName">Eggs N Things</div>
      <div className="egSub">Restaurant - Local Discovery</div>
    </div>
  );
}

function FlipScene({ project }: { project: Project }) {
  const [peeking, setPeeking] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const timers = useRef<number[]>([]);
  const interval = useRef<number | null>(null);
  const hasFlip = Boolean(project.frontImage || project.backImage);

  const stop = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (interval.current) clearInterval(interval.current);
    interval.current = null;
    setPeeking(false);
    window.setTimeout(() => setFlipped(false), 420);
  };

  const start = () => {
    if (!hasFlip) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (interval.current) clearInterval(interval.current);
    interval.current = null;
    setFlipped(false);
    timers.current.push(
      window.setTimeout(() => {
        setFlipped(true);
        interval.current = window.setInterval(() => {
          setFlipped((value) => !value);
        }, 2500);
      }, 800)
    );
  };

  useEffect(() => stop, []);

  return (
    <div
      className={`scene ${project.featured ? 'tall' : ''} ${hasFlip ? 'hasFlip' : ''} ${peeking ? 'peeking' : ''}`}
      onMouseEnter={start}
      onMouseLeave={stop}
      onClick={(event) => {
        if (!hasFlip || window.matchMedia('(hover:hover)').matches) return;
        event.stopPropagation();
        if (peeking) {
          stop();
        } else {
          setPeeking(true);
          start();
        }
      }}
    >
      <SceneArt scene={project.scene} />
      {hasFlip ? (
        <>
          <div className="flipWrapper">
            <div className={`flipCard ${flipped ? 'flipped' : ''}`}>
              <div className="flipFace">
                {project.frontImage && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.frontImage}
                    alt={`${project.title} homepage`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="faceLabel"><span />{project.frontLabel ?? 'Homepage'}</div>
              </div>
              <div className="flipFace flipBack">
                {project.backImage && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.backImage}
                    alt={`${project.title} dashboard`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="faceLabel"><span />{project.backLabel ?? 'Dashboard'}</div>
              </div>
            </div>
          </div>
          <div className="hintIdle" aria-hidden="true">
            <span className="hiMouse">Hover to explore</span>
            <span className="hiTouch">Tap to explore</span>
          </div>
        </>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, delay = '' }: { project: Project; delay?: string }) {
  return (
    <Reveal as="article" delay={delay} className={`portfolioCard ${project.featured ? 'featured' : ''}`} >
      <FlipScene project={project} />
      <div className="cardContent">
        <span className={`cat ${project.categoryClass}`}><span />{project.categoryLabel}</span>
        {project.badge ? <div className="securityBadge">[secure] {project.badge}</div> : null}
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul>
          {project.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
        {project.scores ? (
          <div className="scoreRow">
            {project.scores.map((score) => (
              <span key={score.label} className={score.tone}>
                <strong>{score.value}</strong>
                <small>{score.label}</small>
              </span>
            ))}
          </div>
        ) : null}
        <div className="tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="cardFooter">
          <div className="metrics">
            {(project.metrics ?? ['Live']).map((metric, index) => (
              <span key={metric}><i className={index % 2 ? 'gold' : 'sage'} />{metric}</span>
            ))}
          </div>
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="viewLink" aria-label={`Visit ${project.title} live site`}>
            Visit Site
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const visibleProjects = activeFilter === 'all' ? projects : projects.filter((project) => project.category === activeFilter);
  const featuredProjects = visibleProjects.filter((project) => project.featured);
  const remaining = visibleProjects.filter((project) => !project.featured);

  return (
    <section id="work" className="portfolioSection" aria-labelledby="portfolio-heading">
      <style>{portfolioStyles}</style>
      <div id="portfolio" className="anchorAlias" aria-hidden="true" />
      <div className="portfolioWrap">
        <Reveal className="sectionHeader">
          <p>Selected Work</p>
          <h2 id="portfolio-heading">Systems that <em>earn</em><br />their place</h2>
          <span>Hover the featured cards to move from brand surface into the operational layer behind it.</span>
        </Reveal>

        <Reveal className="filters" delay="d1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </Reveal>

        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <div className="portfolioGrid two">
          {remaining.slice(0, 2).map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index === 0 ? 'd1' : 'd2'} />
          ))}
        </div>

        <div className="portfolioGrid three">
          {remaining.slice(2).map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index === 0 ? 'd1' : index === 1 ? 'd2' : 'd3'} />
          ))}
          {activeFilter === 'all' ? (
            <Reveal className="nextCard" delay="d3">
              <span className="cat catAccent"><span />Next Build</span>
              <h3>Your project<br />lives here.</h3>
              <p>GRG builds branded systems, not templates. Fast, secure, and architected to grow with your business.</p>
              <a href="mailto:hello@grginnovations.com" className="nextButton">Start a Project</a>
            </Reveal>
          ) : null}
        </div>

        <Reveal className="portfolioCta">
          <h3>Ready to build something that works?</h3>
          <p>Every project ships with real operational depth: brand, security, performance, and a clear path to grow.</p>
          <a href="#contact">Get in Touch</a>
        </Reveal>
      </div>
    </section>
  );
}

const portfolioStyles = `
.portfolioSection {
  --p-bg:#080808; --p-surface:#111111; --p-surface-2:#151515; --p-surface-3:#1a1a1a;
  --p-border:rgba(201,168,76,.14); --p-border-2:rgba(201,168,76,.28);
  --p-text:#f5f0e8; --p-muted:#a3a39c; --p-faint:#5f5a50;
  --p-gold:#c9a84c; --p-gold-light:#e8d5a3; --p-gold-dark:#8a6e2e; --p-sage:#818f77;
  position:relative; overflow:hidden; background:var(--p-bg); color:var(--p-text);
  padding:clamp(6rem,10vw,9rem) 0; font-family:var(--font-outfit), Inter, sans-serif;
}
.portfolioSection::before {
  content:''; position:absolute; top:-280px; left:50%; width:1100px; height:680px;
  transform:translateX(-50%); background:radial-gradient(ellipse,rgba(201,168,76,.05) 0%,transparent 68%);
  pointer-events:none;
}
.anchorAlias { position:absolute; top:0; }
.portfolioWrap { position:relative; z-index:1; max-width:1160px; margin:0 auto; padding:0 clamp(1rem,5vw,2.5rem); }
.rv { opacity:0; clip-path:inset(18px 0 0 0); transition:opacity .6s cubic-bezier(.16,1,.3,1), clip-path .6s cubic-bezier(.16,1,.3,1); }
.rv.in { opacity:1; clip-path:inset(0); }
.d1 { transition-delay:.07s; } .d2 { transition-delay:.14s; } .d3 { transition-delay:.21s; }
.sectionHeader { margin-bottom:clamp(2.5rem,5vw,4rem); }
.sectionHeader p, .cat {
  display:inline-flex; align-items:center; gap:.5rem; font-size:.75rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
}
.sectionHeader p { color:var(--p-gold); margin-bottom:1rem; }
.sectionHeader p::before { content:''; width:20px; height:1px; background:var(--p-gold); }
.sectionHeader h2 {
  font-family:var(--font-inter), Inter, sans-serif; font-size:clamp(2.5rem,6vw,4.8rem); line-height:1.02;
  font-weight:300; letter-spacing:-.045em; max-width:13ch; margin:0;
}
.sectionHeader h2 em { color:var(--p-gold); font-style:normal; font-weight:600; }
.sectionHeader span { display:block; max-width:56ch; margin-top:1rem; color:var(--p-muted); line-height:1.7; }
.filters { display:flex; flex-wrap:wrap; gap:.5rem; margin-bottom:clamp(2rem,4vw,3rem); }
.filters button {
  padding:.55rem 1rem; border-radius:999px; border:1px solid var(--p-border-2); background:var(--p-surface-2);
  color:var(--p-muted); font-size:.9rem; font-weight:600; transition:background .18s, color .18s, border-color .18s, transform .18s;
}
.filters button:hover, .filters button[aria-pressed='true'] { color:var(--p-gold-light); background:rgba(201,168,76,.11); border-color:rgba(201,168,76,.5); }
.filters button:active { transform:scale(.97); }
.portfolioGrid { display:grid; gap:clamp(1rem,2vw,1.5rem); margin-top:clamp(1rem,2vw,1.5rem); }
.portfolioGrid.two { grid-template-columns:repeat(2,minmax(0,1fr)); }
.portfolioGrid.three { grid-template-columns:repeat(3,minmax(0,1fr)); }
.portfolioCard, .nextCard {
  border:1px solid var(--p-border); border-radius:1rem; background:var(--p-surface); overflow:hidden;
  box-shadow:0 4px 20px rgba(0,0,0,.5); transition:transform .62s cubic-bezier(.16,1,.3,1), box-shadow .62s cubic-bezier(.16,1,.3,1), border-color .62s;
  display: flex; flex-direction: column;
}
.portfolioCard:hover, .nextCard:hover { transform:translateY(-4px); border-color:var(--p-border-2); box-shadow:0 16px 48px rgba(0,0,0,.7); }
.portfolioCard.featured { margin-bottom:clamp(1rem,2vw,1.5rem); }
.scene { position:relative; height:260px; overflow:hidden; background:var(--p-surface-2); }
.scene.tall { height:340px; }
.sceneArt { position:absolute; inset:0; transition:opacity .42s cubic-bezier(.16,1,.3,1); }
.hasFlip:hover .sceneArt, .hasFlip.peeking .sceneArt { opacity:0; }
.flipWrapper { position:absolute; inset:0; transform:translateY(100%); transition:transform .42s cubic-bezier(.16,1,.3,1); z-index:3; perspective:1400px; }
.hasFlip:hover .flipWrapper, .hasFlip.peeking .flipWrapper { transform:translateY(0); }
.flipCard { position:absolute; inset:0; transform-style:preserve-3d; transition:transform 680ms cubic-bezier(.4,0,.2,1); }
.flipCard.flipped { transform:rotateY(180deg); }
.flipFace { position:absolute; inset:0; backface-visibility:hidden; background:var(--p-surface-3); overflow:hidden; }
.flipBack { transform:rotateY(180deg); }
.flipFace img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top center; }
.flipFace::after { content:''; position:absolute; left:0; right:0; bottom:0; height:64px; background:linear-gradient(to bottom,transparent,var(--p-surface)); }
.faceLabel, .hintIdle {
  position:absolute; left:50%; bottom:.75rem; transform:translateX(-50%); z-index:5; display:inline-flex; align-items:center; gap:.45rem;
  padding:.25rem .75rem; border-radius:999px; white-space:nowrap; font-size:.65rem; font-weight:800; letter-spacing:.06em; text-transform:uppercase;
  color:var(--p-gold-light); background:#080808; border:1px solid rgba(201,168,76,.34);
}
.faceLabel span, .cat span { width:6px; height:6px; border-radius:999px; background:currentColor; box-shadow:0 0 8px currentColor; }
.hintIdle { color:rgba(245,240,232,.55); border-color:rgba(245,240,232,.1); text-transform:none; letter-spacing:.04em; transition:opacity .18s; }
.hasFlip:hover .hintIdle, .hasFlip.peeking .hintIdle { opacity:0; }
.hiTouch { display:none; } @media (hover:none), (max-width:768px) { .hiMouse { display:none; } .hiTouch { display:inline; } }
.cardContent { padding:1.5rem; display:flex; flex-direction:column; min-height:100%; flex-grow:1; }
.cat { margin-bottom:.75rem; }
.catGold { color:var(--p-gold-light); } .catSage { color:#a3b18a; } .catAccent { color:var(--p-gold); } .catCream { color:var(--p-text); }
.securityBadge {
  width:fit-content; margin-bottom:.75rem; padding:.25rem .5rem; border-radius:.375rem;
  color:var(--p-gold-light); background:rgba(232,213,163,.11); border:1px solid rgba(232,213,163,.24);
  font-size:.75rem; font-weight:700;
}
.cardContent h3 { margin:0 0 .65rem; font-family:var(--font-inter), Inter, sans-serif; font-size:clamp(1.35rem,2vw,2rem); line-height:1.1; letter-spacing:-.035em; }
.cardContent p { color:var(--p-muted); font-size:.95rem; line-height:1.65; margin:0 0 1rem; }
.cardContent ul { display:flex; flex-direction:column; gap:.45rem; margin:0 0 1rem; padding:0; list-style:none; }
.cardContent li { display:flex; gap:.55rem; color:var(--p-muted); font-size:.92rem; line-height:1.45; }
.cardContent li::before { content:''; width:5px; height:5px; margin-top:.5rem; border-radius:999px; background:var(--p-gold); flex:0 0 auto; }
.tags { display:flex; flex-wrap:wrap; gap:.4rem; margin-bottom:1.25rem; }
.tags span { padding:.15rem .65rem; border-radius:999px; border:1px solid var(--p-border); background:var(--p-surface-3); color:var(--p-muted); font-size:.75rem; font-weight:600; }
.scoreRow { display:flex; gap:.5rem; margin-bottom:1rem; }
.scoreRow span { min-width:44px; padding:.3rem .5rem; display:flex; flex-direction:column; align-items:center; border-radius:.5rem; border:1px solid var(--p-border); background:var(--p-surface-3); }
.scoreRow strong { font-size:.82rem; line-height:1; color:#a3b18a; }
.scoreRow small { margin-top:.15rem; color:var(--p-faint); font-size:.52rem; letter-spacing:.08em; text-transform:uppercase; }
.cardFooter { margin-top:auto; padding-top:1rem; border-top:1px solid var(--p-border); display:flex; align-items:center; justify-content:space-between; gap:1rem; }
.metrics { display:flex; flex-wrap:wrap; gap:.75rem; }
.metrics span { display:inline-flex; align-items:center; gap:.35rem; color:var(--p-muted); font-size:.75rem; }
.metrics i { width:7px; height:7px; border-radius:999px; display:block; }
.metrics i.sage { background:#a3b18a; box-shadow:0 0 6px rgba(163,177,138,.48); }
.metrics i.gold { background:var(--p-gold); box-shadow:0 0 6px rgba(201,168,76,.42); }
.viewLink, .nextButton, .portfolioCta a {
  display:inline-flex; align-items:center; justify-content:center; gap:.5rem; color:var(--p-gold);
  border:1px solid rgba(201,168,76,.38); background:rgba(201,168,76,.11); border-radius:999px;
  padding:.55rem 1rem; font-weight:800; font-size:.9rem; transition:background .18s, box-shadow .18s, transform .18s;
}
.viewLink:hover, .nextButton:hover { background:rgba(201,168,76,.18); box-shadow:0 0 20px rgba(201,168,76,.18); transform:translateX(2px); }
.viewLink svg { width:13px; height:13px; transition:transform .18s; }
.viewLink:hover svg { transform:translateX(3px); }
.nextCard { padding:2rem; display:flex; flex-direction:column; justify-content:center; min-height:100%; }
.nextCard h3 { font-family:var(--font-inter), Inter, sans-serif; font-size:clamp(1.6rem,2.5vw,2.3rem); line-height:1.05; letter-spacing:-.04em; margin:1.5rem 0 1rem; }
.nextCard p { color:var(--p-muted); line-height:1.7; margin:0 0 2rem; }
.nextButton { width:fit-content; }
.portfolioCta { margin-top:clamp(3rem,6vw,5rem); display:flex; flex-direction:column; align-items:center; text-align:center; gap:1rem; }
.portfolioCta h3 { margin:0; font-family:var(--font-inter), Inter, sans-serif; font-size:clamp(1.5rem,3vw,2.3rem); letter-spacing:-.035em; }
.portfolioCta p { margin:0; max-width:44ch; color:var(--p-muted); line-height:1.7; }
.portfolioCta a { margin-top:.5rem; background:var(--p-gold); color:#080808; box-shadow:0 0 28px rgba(201,168,76,.28); }
.portfolioCta a:hover { background:var(--p-gold-light); box-shadow:0 0 50px rgba(201,168,76,.42); transform:translateY(-2px); }
.sAudrey { background:linear-gradient(145deg,#080808 0%,#111111 58%,#0b0a08 100%); }
.sAudrey::before,.sAudrey::after { content:''; position:absolute; border-radius:50%; }
.sAudrey::before { top:-80px; right:-80px; width:400px; height:400px; background:radial-gradient(circle,rgba(201,168,76,.16),transparent 65%); }
.sAudrey::after { bottom:-60px; left:-60px; width:300px; height:300px; background:radial-gradient(circle,rgba(129,143,119,.1),transparent 65%); }
.aoRing,.aoRing2,.aoMono,.aoTag,.aoChips,.aoScores { position:absolute; }
.aoRing,.aoRing2 { top:50%; left:50%; transform:translate(-50%,-54%); border-radius:50%; border:1px solid rgba(201,168,76,.24); }
.aoRing { width:200px; height:200px; box-shadow:0 0 60px rgba(201,168,76,.08), inset 0 0 50px rgba(201,168,76,.04); }
.aoRing2 { width:138px; height:138px; border-color:rgba(201,168,76,.15); }
.aoMono { top:50%; left:50%; transform:translate(-50%,-59%); font-family:var(--font-inter); font-size:3.4rem; font-weight:900; letter-spacing:-.07em; background:linear-gradient(135deg,#c9a84c,#e8d5a3 45%,#8a6e2e); -webkit-background-clip:text; background-clip:text; color:transparent; }
.aoTag { bottom:2rem; left:50%; transform:translateX(-50%); color:rgba(201,168,76,.58); font-size:.65rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; white-space:nowrap; }
.aoChips { right:1.25rem; bottom:4rem; display:flex; flex-direction:column; align-items:flex-end; gap:.5rem; }
.aoChips div { padding:.2rem .5rem; border-radius:.5rem; border:1px solid rgba(201,168,76,.2); background:rgba(201,168,76,.08); color:rgba(232,213,163,.72); font-size:.58rem; font-weight:800; }
.aoScores { left:1.25rem; bottom:1rem; display:flex; gap:.5rem; }
.aoScores span { min-width:38px; padding:.3rem .5rem; display:flex; flex-direction:column; align-items:center; border-radius:.5rem; border:1px solid rgba(201,168,76,.12); background:rgba(245,240,232,.04); color:#a3b18a; font-weight:900; font-size:.72rem; }
.aoScores small { color:rgba(245,240,232,.34); font-size:.48rem; text-transform:uppercase; }
.sMba,.sShamrock,.sMayra,.sEggs { background:linear-gradient(145deg,#080808,#111111 58%,#0b0a08); }
.mbaGlow,.shRadial,.myG1,.myG2,.egGlow { position:absolute; border-radius:50%; background:radial-gradient(circle,rgba(201,168,76,.12),transparent 68%); }
.mbaGlow { width:320px; height:180px; top:50%; left:50%; transform:translate(-50%,-50%); }
.mbaBed { position:absolute; top:50%; left:50%; width:156px; height:88px; transform:translate(-50%,-62%); border:1px solid rgba(201,168,76,.28); border-radius:.75rem; background:linear-gradient(180deg,rgba(201,168,76,.13),rgba(129,143,119,.09)); box-shadow:0 8px 24px rgba(0,0,0,.5),0 0 40px rgba(201,168,76,.09); }
.mbaBed::before { content:''; position:absolute; inset:7px; border:1px solid rgba(201,168,76,.18); border-radius:.5rem; }
.mbaBed::after { content:''; position:absolute; top:50%; left:50%; width:90px; height:2px; transform:translate(-50%,-50%); background:linear-gradient(90deg,transparent,rgba(232,213,163,.34),transparent); }
.mbaHeadline { position:absolute; top:1.25rem; left:50%; transform:translateX(-50%); white-space:nowrap; font-weight:900; font-size:1.35rem; letter-spacing:-.05em; color:var(--p-gold-light); }
.mbaOffer { position:absolute; top:1rem; right:1rem; padding:.2rem .65rem; border-radius:999px; color:var(--p-gold-light); background:rgba(201,168,76,.13); border:1px solid rgba(201,168,76,.3); font-size:.75rem; font-weight:900; }
.mbaSub { position:absolute; bottom:2.75rem; left:50%; transform:translateX(-50%); color:rgba(201,168,76,.55); font-size:.62rem; font-weight:800; letter-spacing:.18em; text-transform:uppercase; white-space:nowrap; }
.mbaPulses { position:absolute; bottom:1.25rem; left:50%; transform:translateX(-50%); display:flex; gap:1rem; white-space:nowrap; }
.mbaPulses span { display:flex; align-items:center; gap:.3rem; color:rgba(232,213,163,.72); font-size:.62rem; font-weight:800; }
.mbaPulses i { width:7px; height:7px; border-radius:50%; background:var(--p-gold); box-shadow:0 0 8px rgba(201,168,76,.6); }
.sShamrock { background:linear-gradient(140deg,#070807,#10140e 55%,#080808); }
.shRadial { top:-50px; right:-50px; width:340px; height:340px; }
.shStats { position:absolute; top:1rem; left:1.25rem; display:flex; flex-direction:column; }
.shStats strong { color:rgba(232,213,163,.88); font-size:1.25rem; }
.shStats span,.shRbac { color:rgba(232,213,163,.68); font-size:.58rem; text-transform:uppercase; letter-spacing:.08em; }
.shRbac { position:absolute; top:1rem; right:1rem; padding:.25rem .55rem; border-radius:999px; background:rgba(201,168,76,.1); border:1px solid rgba(201,168,76,.24); font-weight:900; }
.shClover { position:absolute; top:42%; left:50%; transform:translate(-50%,-50%); width:90px; height:90px; }
.shClover span { position:absolute; width:38px; height:38px; border-radius:50% 50% 0 50%; background:linear-gradient(135deg,rgba(129,143,119,.48),rgba(58,71,52,.32)); border:1px solid rgba(129,143,119,.34); }
.shClover span:nth-child(1){top:0;left:50%;transform:translateX(-50%)} .shClover span:nth-child(2){top:50%;left:0;transform:translateY(-50%) rotate(270deg)} .shClover span:nth-child(3){top:50%;right:0;transform:translateY(-50%) rotate(90deg)} .shClover span:nth-child(4){bottom:0;left:50%;transform:translateX(-50%) rotate(180deg)}
.shClover i { position:absolute; bottom:-14px; left:50%; width:3px; height:16px; transform:translateX(-50%); background:linear-gradient(to bottom,rgba(129,143,119,.5),transparent); border-radius:999px; }
.shBar { position:absolute; left:1.25rem; right:1.25rem; bottom:1.25rem; }
.shBar div { display:flex; justify-content:space-between; color:rgba(232,213,163,.68); font-size:.62rem; font-weight:800; margin-bottom:.3rem; }
.shBar b { display:block; height:5px; border-radius:999px; background:rgba(245,240,232,.06); overflow:hidden; }
.shBar i { display:block; width:68%; height:100%; background:linear-gradient(90deg,rgba(201,168,76,.55),rgba(232,213,163,.85)); box-shadow:0 0 8px rgba(201,168,76,.28); }
.myG1 { top:-90px; right:-90px; width:380px; height:380px; } .myG2 { bottom:-70px; left:-70px; width:300px; height:300px; background:radial-gradient(circle,rgba(129,143,119,.08),transparent 65%); }
.myOuter,.myInner { position:absolute; top:50%; left:50%; transform:translate(-50%,-56%); border-radius:50%; border:1px solid rgba(201,168,76,.13); }
.myOuter { width:175px; height:175px; } .myInner { width:120px; height:120px; opacity:.7; }
.myLetter { position:absolute; top:50%; left:50%; transform:translate(-50%,-60%); font-size:4.8rem; font-weight:900; letter-spacing:-.07em; background:linear-gradient(135deg,#c9a84c,#f5f0e8 50%,#8a6e2e); -webkit-background-clip:text; background-clip:text; color:transparent; opacity:.85; }
.myDivider { position:absolute; top:62%; left:50%; width:120px; height:1px; transform:translate(-50%,-50%); background:linear-gradient(90deg,transparent,rgba(201,168,76,.38),transparent); }
.myPills { position:absolute; bottom:1.25rem; left:50%; transform:translateX(-50%); display:flex; gap:.5rem; white-space:nowrap; }
.myPills span { padding:.2rem .65rem; border-radius:999px; background:rgba(201,168,76,.08); border:1px solid rgba(201,168,76,.2); color:rgba(232,213,163,.7); font-size:.62rem; font-weight:800; }
.sEggs { background:linear-gradient(145deg,#0b0905,#17130a 55%,#0b0905); }
.egGlow { top:-70px; left:50%; width:420px; height:320px; transform:translateX(-50%); background:radial-gradient(ellipse,rgba(201,168,76,.13),transparent 65%); }
.egIcons { position:absolute; top:1rem; left:1.25rem; right:1.25rem; display:flex; justify-content:space-between; color:rgba(245,240,232,.3); font-size:.65rem; font-weight:900; letter-spacing:.12em; }
.egEgg { position:absolute; top:50%; left:50%; width:68px; height:84px; transform:translate(-50%,-60%); border-radius:50% 50% 50% 50% / 60% 60% 40% 40%; border:1px solid rgba(201,168,76,.3); background:linear-gradient(160deg,rgba(232,213,163,.2),rgba(201,168,76,.13)); box-shadow:0 0 40px rgba(201,168,76,.12), inset 0 0 18px rgba(201,168,76,.06); }
.egYolk { position:absolute; top:50%; left:50%; width:30px; height:30px; transform:translate(-50%,-58%); border-radius:50%; border:1px solid rgba(201,168,76,.24); background:radial-gradient(circle,rgba(232,213,163,.42),rgba(201,168,76,.14) 70%); }
.egName { position:absolute; bottom:2.5rem; left:50%; transform:translateX(-50%); white-space:nowrap; font-weight:900; color:var(--p-gold-light); }
.egSub { position:absolute; bottom:1.25rem; left:50%; transform:translateX(-50%); white-space:nowrap; color:rgba(201,168,76,.46); font-size:.62rem; font-weight:800; letter-spacing:.15em; text-transform:uppercase; }
@media (max-width:900px) { .portfolioGrid.three { grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media (max-width:700px) {
  .portfolioSection { padding:5rem 0; }
  .portfolioGrid.two,.portfolioGrid.three { grid-template-columns:1fr; }
  .scene,.scene.tall { height:260px; }
  .cardFooter { flex-direction:column; align-items:flex-start; }
  .viewLink { align-self:stretch; }
}
`;
