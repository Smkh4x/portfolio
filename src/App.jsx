import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import SeoHead from './components/SeoHead';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const ContactForm = lazy(() => import('./components/ContactForm'));
const FloatingSymbols = lazy(() => import('./components/FloatingSymbols'));
import profileImg from './assets/profile.jpg';
import profileImgOriginal from './assets/rofilePR.jpg';

// ─── Data ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'Omni Dashboard',
    desc: 'A real-time financial tracking platform with automated reporting and custom data hooks.',
    tags: ['React', 'TypeScript', 'Node.js'],
    github: '#', demo: '#',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx4RMgH0wWTMsaSNi01VAZJ2VLXGEThObvwate-IacZf-_e57_oOjYX9irQwcsZmN4aWUQwIQYQLREHrNgUIlZiut91cgH4DKKHbp0dVPxdPxC2Q5UBSPy-iss_eD4uVF7q4xrE4me38tz_d-EMyCT4DD0-x8DedeDKkyWGy2qrGz_fHlI9oA40ww-woFDucf-daQ3ag09oHkDMV6viWbMykQ8bdNci6aDxGqxqELJbIA1A7Dl5VdtuXarYocB9wbSqH3PTW8cWM8',
  },
  {
    title: 'Apex Commerce',
    desc: 'High-performance headless e-commerce storefront with atomic design architecture.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
    github: '#', demo: '#',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDUB3VTBr_2jyYDsnom0wU82qI2gGGA-jK-npyU-GH-Kz4_VCeS0aYXRHp3KgJyy67SQ0m7-XbmWly8KPO9icJT8jzdS95lhMnlGyh9T_nTxHRL1kT9AwWn_93D3oE1Iz-AHPXJFkUa_oWrEbIGZq3tmeHW62EdqXzqKdqcLY-z1n_EZPk_jz0bEV78PFgygOGB6NTr9dWo7sGflOqEGfIF8pyCs_BLK9kB-7rRg2lSRAEs64GGW2roF_nbfhnVGNBOqsg0ftKxa0',
  },
];

const SKILLS = ['React / Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Go', 'Tailwind CSS'];
const STATS = [{ v: '5+', l: 'Years experience' }, { v: '40+', l: 'Projects shipped' }, { v: '99%', l: 'Client satisfaction' }, { v: '3', l: 'OSS packages' }];

// ─── Helpers ──────────────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}>
      {children}
    </motion.div>
  );
}


// ─── App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);

  const handleGithubClick = (e) => {
    e.preventDefault();
    if (githubLoading) return;
    setGithubLoading(true);
    setTimeout(() => {
      window.open('https://github.com/Smkh4x', '_blank', 'noopener,noreferrer');
      setTimeout(() => setGithubLoading(false), 400);
    }, 1100);
  };

  const handleLinkedinClick = (e) => {
    e.preventDefault();
    if (linkedinLoading) return;
    setLinkedinLoading(true);
    setTimeout(() => {
      window.open('https://www.linkedin.com/in/youssef-almona', '_blank', 'noopener,noreferrer');
      setTimeout(() => setLinkedinLoading(false), 400);
    }, 1100);
  };

  const handleViewProjects = (e) => {
    e.preventDefault();
    if (sweeping) return;
    setSweeping('work');
    setTimeout(() => {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }, 480);
    setTimeout(() => setSweeping(false), 900);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (sweeping) return;
    setSweeping('contact');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 480);
    setTimeout(() => setSweeping(false), 900);
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('youssef.dev.sec@gmail.com').then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    });
  };

  // Active nav tracking via IntersectionObserver
  const [activeNav, setActiveNav] = useState('work');

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 350);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Active nav section tracking — matches update.html IntersectionObserver logic
    const sections = ['work', 'about', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveNav(e.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));

    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  const navClass = (id) =>
    id === activeNav
      ? 'font-label-md text-label-md text-primary font-semibold transition-colors'
      : 'font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors';

  return (
    <>
      <SeoHead
        title="Youssef Al Mona | Full-Stack Developer Portfolio"
        description="Youssef Al Mona builds modern web applications with React, Node.js, and thoughtful UI systems for startups and growing products."
        path="/"
      />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[120] focus:bg-primary focus:text-on-primary focus:px-4 focus:py-2 focus:rounded-sm">
        Skip to content
      </a>
      {/* Splash */}
      <AnimatePresence>
        {!ready && (
          <motion.div key="splash" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-surface">
            <span className="material-symbols-outlined text-primary text-[48px] animate-pulse">terminal</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ FULL-SCREEN SWEEP EFFECT ═════════════════════════════ */}
      <AnimatePresence>
        {sweeping && (
          <motion.div
            key="sweep"
            className="fixed inset-0 z-[90] pointer-events-none"
            style={{ originX: 0 }}
          >
            {/* Primary sweep — slides in from left */}
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: [0, 1, 1, 0] }}
              transition={{ duration: 0.85, times: [0, 0.4, 0.55, 1], ease: 'easeInOut' }}
            />
            {/* Secondary sweep — slightly delayed, lighter shade */}
            <motion.div
              className="absolute inset-0 bg-primary-fixed"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: [0, 1, 1, 0] }}
              transition={{ duration: 0.85, times: [0, 0.4, 0.55, 1], ease: 'easeInOut', delay: 0.07 }}
            />
            {/* Center flash label */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.85, times: [0, 0.38, 0.56, 0.75] }}
            >
              <span className="font-label-caps text-label-caps text-on-primary tracking-widest" style={{ fontSize: 13 }}>
                {sweeping === 'contact' ? 'GET IN TOUCH' : 'FEATURED WORK'}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'} bg-surface text-on-surface overflow-x-hidden`}>

        {/* ══ ANIMATED BACKGROUND ═════════════════════════════ */}
        <Suspense fallback={null}>
          <FloatingSymbols />
        </Suspense>

        {/* ══ HEADER ════════════════════════════════════════════ */}
        <header id="site-header"
          className={`fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 transition-shadow duration-300${scrolled ? ' scrolled' : ''}`}>
          <div className="flex items-center justify-between h-16 px-gutter max-w-container-max mx-auto w-full">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group" aria-label="Go to homepage">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>terminal</span>
              <span className="font-headline-lg font-bold tracking-tight text-on-surface"
                style={{ fontSize: 18, lineHeight: 1 }}>ALMONA</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-stack-lg" aria-label="Primary navigation">
              <a href="#work" className={navClass('work')}>Work</a>
              <a href="#about" className={navClass('about')}>About</a>
              <a href="#contact" className={navClass('contact')}>Contact</a>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -mr-2 text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div key="drawer"
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden border-t border-outline-variant/30 bg-surface">
                <nav className="flex flex-col px-gutter py-4 gap-1">
                  {['work', 'about', 'contact'].map(s => (
                    <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)}
                      className="capitalize font-label-md text-label-md text-on-surface-variant hover:text-primary py-3 border-b border-outline-variant/20 last:border-0 transition-colors">
                      {s}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main id="main-content" className="w-full">

          {/* ══ HERO ══════════════════════════════════════════════ */}
          <section className="min-h-screen flex flex-col items-center justify-center px-gutter pt-16 pb-16 sm:pb-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="max-w-container-max w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">

              {/* ── Profile image — hover to reveal original ── */}
              <div className="hero-profile-wrapper flex-shrink-0">
                <div className="hero-profile-img profile-hover-wrap">
                  {/* AI-enhanced — default */}
                  <img
                    src={profileImg}
                    alt="Youssef Al Mona — Full-stack Developer"
                    className="profile-layer profile-layer-ai"
                    loading="eager"
                    decoding="async"
                  />
                  {/* Original — revealed on hover */}
                  <img
                    src={profileImgOriginal}
                    alt="Youssef Al Mona — Original photo"
                    className="profile-layer profile-layer-original"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              {/* ── Text + CTAs ── */}
              <div className="flex flex-col items-center md:items-start gap-stack-md text-center md:text-left max-w-xl">

                {/* Headline */}
                <h1 className="font-headline-xl text-headline-xl text-on-surface headline-responsive" style={{ marginTop: 4 }}>
                  Hi, I'm Youssef Al Mona, a{' '}
                  <span className="text-primary">Full-stack&nbsp;Developer</span>
                </h1>

                {/* Subtext */}
                <p className="font-body-lg text-body-lg text-on-surface-variant hero-subtitle">
                  I build high-performance web applications with a focus on clean
                  user interfaces and resilient backend logic.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap items-center md:items-start justify-center md:justify-start gap-stack-md w-full sm:w-auto" style={{ marginTop: 8 }}>
                  <button
                    onClick={handleViewProjects}
                    className="w-full sm:w-auto bg-on-surface text-on-primary font-label-md text-label-md px-8 py-4 hover:bg-primary transition-colors duration-300 text-center cursor-pointer">
                    View Projects
                  </button>
                  <a href="#contact"
                    onClick={handleContactClick}
                    className="w-full sm:w-auto border border-outline-variant text-on-surface font-label-md text-label-md px-8 py-4 hover:border-outline hover:text-primary transition-colors duration-300 text-center">
                    Contact Me
                  </a>
                  <div className="relative w-full sm:w-auto">
                    <button
                      onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
                      className="cv-download-btn w-full font-label-md text-label-md px-8 py-4 text-center transition-colors duration-300 flex items-center justify-center gap-2">
                      Download CV
                      <span className="material-symbols-outlined transition-transform duration-300" style={{ fontSize: 18, transform: cvDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                    </button>
                    <AnimatePresence>
                      {cvDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-full mt-2 bg-surface border border-outline-variant shadow-lg overflow-hidden z-50 flex flex-col"
                        >
                          <a href="/assets/cv.pdf" download="Almona-CV-EN.pdf" onClick={() => setCvDropdownOpen(false)} className="px-4 py-3 text-center text-label-md text-on-surface hover:bg-primary hover:text-on-primary transition-colors">
                            English
                          </a>
                          <a href="/assets/cvFR.pdf" download="Almona-CV-FR.pdf" onClick={() => setCvDropdownOpen(false)} className="px-4 py-3 text-center text-label-md text-on-surface hover:bg-primary hover:text-on-primary transition-colors border-t border-outline-variant/30">
                            Français
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              className="absolute bottom-8 flex flex-col items-center gap-1 opacity-40"
              style={{ left: '50%', transform: 'translateX(-50%)' }}>
              <motion.span
                animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
                className="material-symbols-outlined block" style={{ fontSize: 20 }}>
                keyboard_arrow_down
              </motion.span>
            </motion.div>
          </section>

          {/* ══ PROJECTS ══════════════════════════════════════════ */}
          <section id="work" className="py-section-gap px-gutter max-w-container-max mx-auto">

            {/* Section label */}
            <Reveal className="mb-stack-lg">
              <h2 className="font-label-caps text-label-caps text-primary uppercase section-label">Featured Work</h2>
            </Reveal>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
              {PROJECTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <article className="project-card bg-surface border border-outline-variant/40 overflow-hidden transition-all duration-500 hover:border-outline hover:shadow-md flex flex-col">
                    <div className="aspect-video overflow-hidden border-b border-outline-variant/30 relative bg-surface-container">
                      <img className="project-image w-full h-full object-cover"
                        src={p.img} alt={p.title} loading="lazy" />
                    </div>
                    <div className="p-stack-lg flex flex-col flex-1">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-stack-sm">
                        {p.tags.map(t => (
                          <span key={t} className="font-label-caps text-label-caps px-2 py-1 border border-outline-variant text-on-surface-variant">{t}</span>
                        ))}
                      </div>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">{p.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg flex-1">{p.desc}</p>
                      <div className="flex items-center gap-stack-lg pt-stack-sm border-t border-outline-variant/20">
                        <a href={p.github} className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>code</span> GitHub
                        </a>
                        <a href={p.demo} className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>open_in_new</span> Live Demo
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ══ ABOUT ═════════════════════════════════════════════ */}
          <section id="about" className="py-section-gap border-y border-outline-variant/20 bg-surface-container-low">
            <div className="max-w-container-max mx-auto px-gutter">

              {/* ── Section label ── */}
              <Reveal className="mb-10">
                <h2 className="font-label-caps text-label-caps text-primary uppercase section-label">About Me</h2>
              </Reveal>

              {/* ── Bio ── */}
              <Reveal className="mb-12">
                <p className="font-headline-lg text-headline-lg text-on-surface leading-snug" style={{ maxWidth: 720 }}>
                  I specialize in bridging{' '}
                  <em className="not-italic text-on-surface-variant">technical precision</em>
                  {' '}and{' '}
                  <em className="not-italic text-on-surface-variant">human-centered design</em>.
                </p>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-md" style={{ maxWidth: 680 }}>
                  Self-taught developer from Fkih Ben Salah, Morocco — building full-stack web and mobile apps, exploring AI tooling, and shipping real products with clean code and thoughtful UIs.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* ── Formation ── */}
                <Reveal>
                  <p className="font-label-caps text-label-caps text-primary uppercase section-label mb-8">Formation</p>

                  {/* Entry 1 */}
                  <div className="relative pl-6 pb-10 border-l-2 border-outline-variant/40">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-surface-container-low" />
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-headline-lg text-on-surface" style={{ fontSize: 17 }}>CCFBS – Simplon Maghreb</h3>
                      <span className="font-label-caps text-label-caps text-primary bg-primary-fixed px-2 py-0.5 rounded-sm">2026</span>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant mb-2">Full Stack &amp; Mobile Development Training</p>
                    <p className="font-body-md text-body-md text-on-surface-variant/70">
                      Intensive professional training at Ccfbs-Simplon Maghreb covering full-stack web and mobile development with modern frameworks and industry practices.
                    </p>
                  </div>

                  {/* Entry 2 */}
                  <div className="relative pl-6 border-l-2 border-outline-variant/20">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-outline-variant border-2 border-surface-container-low" />
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-headline-lg text-on-surface" style={{ fontSize: 17 }}>Self-Study &amp; Continuous Learning</h3>
                      <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-sm">2022 – Present</span>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant mb-2">Fkih Ben Salah, Morocco</p>
                    <p className="font-body-md text-body-md text-on-surface-variant/70">
                      Independently mastering computer science, web &amp; mobile development, UI/UX design, and modern AI tools through projects, courses, and real-world building.
                    </p>
                  </div>

                  {/* Languages */}
                  <div className="mt-10 pt-8 border-t border-outline-variant/30">
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">Languages</p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { lang: 'Arabic', level: 'Native', color: '#0050cb' },
                        { lang: 'English', level: 'B2', color: '#424656' },
                        { lang: 'French', level: 'A1', color: '#727687' },
                      ].map(l => (
                        <div key={l.lang} className="flex items-center gap-2 px-3 py-2 bg-surface border border-outline-variant/50 rounded-sm">
                          <span className="font-label-caps text-label-caps text-on-surface">{l.lang}</span>
                          <span className="font-label-caps text-label-caps px-1.5 py-0.5 rounded-sm text-on-primary" style={{ background: l.color, fontSize: 9 }}>{l.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* ── Skills ── */}
                <Reveal delay={0.1}>
                  <p className="font-label-caps text-label-caps text-primary uppercase section-label mb-8">Skills</p>

                  <div className="flex flex-col gap-6">
                    {[
                      {
                        icon: '⟨/⟩', label: 'Core Languages', color: '#0050cb',
                        items: ['JavaScript', 'TypeScript', 'HTML / CSS', 'C', 'SQL', 'NoSQL'],
                      },
                      {
                        icon: '◈', label: 'Frontend & Mobile', color: '#a33200',
                        items: ['React', 'React Native', 'Zustand', 'TailwindCSS', 'Nativewind', 'Material-UI', 'Axios'],
                      },
                      {
                        icon: '⬡', label: 'Backend & APIs', color: '#3a7d44',
                        items: ['Node.js', 'Express.js'],
                      },
                      {
                        icon: '✦', label: 'AI Tools', color: '#6b3fa0',
                        items: ['Anthropic Claude API', 'Claude Code', 'Cursor IDE', 'Antigravity'],
                      },
                      {
                        icon: '◎', label: 'DevOps & Databases', color: '#b25a00',
                        items: ['Git', 'Docker', 'MongoDB', 'PostgreSQL', 'MySQL', 'Linux'],
                      },
                    ].map((cat) => (
                      <div key={cat.label}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-label-caps" style={{ color: cat.color, fontSize: 14 }}>{cat.icon}</span>
                          <span className="font-label-caps text-label-caps text-on-surface-variant">{cat.label}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cat.items.map(item => (
                            <span key={item}
                              className="font-label-caps text-label-caps px-3 py-1.5 bg-surface border border-outline-variant/50 text-on-surface-variant hover:border-outline hover:text-on-surface transition-colors cursor-default"
                              style={{ fontSize: 10 }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>

              </div>
            </div>
          </section>

          {/* ══ CONTACT ═══════════════════════════════════════════ */}
          <section id="contact" className="py-section-gap px-gutter max-w-container-max mx-auto">
            <div className="max-w-2xl mx-auto">

              {/* Heading */}
              <Reveal className="text-center mb-12">
                <h2 className="font-label-caps text-label-caps text-primary uppercase section-label" style={{ display: 'inline-block' }}>
                  Get In Touch
                </h2>
                <p className="font-headline-xl text-headline-xl text-on-surface mt-stack-lg headline-responsive">
                  Let's build something{' '}
                  <span className="italic font-normal text-on-surface-variant">remarkable</span>.
                </p>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-md max-w-md mx-auto">
                  Have a project in mind? Reach out through any of these channels or send a message directly below.
                </p>
              </Reveal>

              {/* Contact links */}
              <Reveal className="flex flex-wrap justify-center gap-8 mb-12">
                {/* Email — click to reveal & copy */}
                <button
                  onClick={handleEmailClick}
                  className="contact-link group flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer relative"
                  aria-label="Copy email address"
                >
                  <div className={`contact-icon transition-all duration-300 ${emailCopied ? 'border-primary bg-primary-fixed' : ''}`}>
                    <span className="material-symbols-outlined text-on-surface" style={{ fontSize: 22 }}>
                      {emailCopied ? 'check' : 'mail'}
                    </span>
                  </div>
                  <span className="contact-label font-label-caps text-label-caps text-on-surface-variant transition-colors">
                    {emailCopied ? 'Copied!' : 'Email'}
                  </span>

                  {/* Animated email reveal tooltip */}
                  <AnimatePresence>
                    {emailCopied && (
                      <motion.span
                        key="email-tooltip"
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-on-surface text-on-primary font-label-caps text-label-caps px-3 py-1 rounded-sm shadow-md"
                        style={{ fontSize: 10, zIndex: 10 }}
                      >
                        youssef.dev.sec@gmail.com
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                {/* GitHub — upload animation on click */}
                <button
                  onClick={handleGithubClick}
                  className="contact-link group flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer relative"
                  aria-label="Open GitHub profile"
                  style={{ minWidth: 64 }}
                >
                  {/* Icon circle */}
                  <div className={`contact-icon transition-all duration-300 overflow-hidden ${githubLoading ? 'border-primary bg-primary-fixed' : ''
                    }`}>
                    <AnimatePresence mode="wait">
                      {githubLoading ? (
                        <motion.span
                          key="upload"
                          className="material-symbols-outlined"
                          style={{ fontSize: 22, color: '#0050cb' }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: [-4, -10, -4], opacity: 1 }}
                          transition={{ y: { repeat: Infinity, duration: 0.7, ease: 'easeInOut' }, opacity: { duration: 0.2 } }}
                        >upload</motion.span>
                      ) : (
                        <motion.span
                          key="code"
                          className="material-symbols-outlined text-on-surface"
                          style={{ fontSize: 22 }}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >code</motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Label */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={githubLoading ? 'going' : 'label'}
                      className="contact-label font-label-caps text-label-caps transition-colors"
                      style={{ color: githubLoading ? '#0050cb' : undefined }}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                    >
                      {githubLoading ? 'Going...' : 'GitHub'}
                    </motion.span>
                  </AnimatePresence>

                  {/* Progress bar */}
                  <div style={{ width: 56, height: 2, background: '#c2c6d8', borderRadius: 2, overflow: 'hidden', marginTop: 2 }}>
                    <motion.div
                      style={{ height: '100%', background: '#0050cb', borderRadius: 2, originX: 0 }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: githubLoading ? 1 : 0 }}
                      transition={{ duration: 1.0, ease: 'easeInOut' }}
                    />
                  </div>
                </button>
                {/* LinkedIn — upload animation on click */}
                <button
                  onClick={handleLinkedinClick}
                  className="contact-link group flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer relative"
                  aria-label="Open LinkedIn profile"
                  style={{ minWidth: 64 }}
                >
                  <div className={`contact-icon transition-all duration-300 overflow-hidden ${linkedinLoading ? 'border-primary bg-primary-fixed' : ''
                    }`}>
                    <AnimatePresence mode="wait">
                      {linkedinLoading ? (
                        <motion.span
                          key="upload-li"
                          className="material-symbols-outlined"
                          style={{ fontSize: 22, color: '#0050cb' }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: [-4, -10, -4], opacity: 1 }}
                          transition={{ y: { repeat: Infinity, duration: 0.7, ease: 'easeInOut' }, opacity: { duration: 0.2 } }}
                        >upload</motion.span>
                      ) : (
                        <motion.span
                          key="person-li"
                          className="material-symbols-outlined text-on-surface"
                          style={{ fontSize: 22 }}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >person_outline</motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.span
                      key={linkedinLoading ? 'li-going' : 'li-label'}
                      className="contact-label font-label-caps text-label-caps transition-colors"
                      style={{ color: linkedinLoading ? '#0050cb' : undefined }}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                    >
                      {linkedinLoading ? 'Going...' : 'LinkedIn'}
                    </motion.span>
                  </AnimatePresence>

                  <div style={{ width: 56, height: 2, background: '#c2c6d8', borderRadius: 2, overflow: 'hidden', marginTop: 2 }}>
                    <motion.div
                      style={{ height: '100%', background: '#0050cb', borderRadius: 2, originX: 0 }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: linkedinLoading ? 1 : 0 }}
                      transition={{ duration: 1.0, ease: 'easeInOut' }}
                    />
                  </div>
                </button>
              </Reveal>

              {/* Divider */}
              <Reveal>
                <div className="relative border-t border-outline-variant/30 mb-10">
                  <span className="divider-label bg-surface font-label-caps text-label-caps text-on-surface-variant">
                    OR SEND A MESSAGE
                  </span>
                </div>
              </Reveal>

              {/* Form — EmailJS logic lives inside ContactForm */}
              <Reveal>
                <Suspense fallback={<p className="text-center text-on-surface-variant">Loading contact form…</p>}>
                  <ContactForm />
                </Suspense>
              </Reveal>

            </div>
          </section>

        </main>

        {/* ══ FOOTER ════════════════════════════════════════════ */}
        <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low">
          <div className="flex items-center justify-center py-stack-lg px-gutter">
            <p className="font-label-caps text-label-caps text-on-surface-variant/60">© 2025 ALMONA. BUILT FOR PRECISION.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
