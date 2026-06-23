import React, { useState, useEffect, useRef } from 'react';
import ContactForm from './components/ContactForm';
import FloatingSymbols from './components/FloatingSymbols';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import profileImg from './assets/profile.jpg';

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
const STATS  = [{ v: '5+', l: 'Years experience' }, { v: '40+', l: 'Projects shipped' }, { v: '99%', l: 'Client satisfaction' }, { v: '3', l: 'OSS packages' }];

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
  const [ready,    setReady]    = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* Splash */}
      <AnimatePresence>
        {!ready && (
          <motion.div key="splash" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-surface">
            <span className="material-symbols-outlined text-primary text-[48px] animate-pulse">terminal</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'} bg-surface text-on-surface overflow-x-hidden`}>

        {/* ══ ANIMATED BACKGROUND ═════════════════════════════ */}
        <FloatingSymbols />

        {/* ══ HEADER ════════════════════════════════════════════ */}
        <header id="site-header"
          className={`fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 transition-shadow duration-300${scrolled ? ' scrolled' : ''}`}>
          <div className="flex items-center justify-between h-16 px-gutter max-w-container-max mx-auto w-full">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>terminal</span>
              <span className="font-headline-lg font-bold tracking-tight text-on-surface"
                style={{ fontSize: 18, lineHeight: 1 }}>ALEX.DEV</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-stack-lg">
              <a href="#work"    className={navClass('work')}>Work</a>
              <a href="#about"   className={navClass('about')}>About</a>
              <a href="#contact" className={navClass('contact')}>Contact</a>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -mr-2 text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Open menu">
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

        <main className="w-full">

          {/* ══ HERO ══════════════════════════════════════════════ */}
          <section className="min-h-screen flex flex-col items-center justify-center px-gutter pt-16 pb-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="max-w-container-max w-full mx-auto flex flex-col md:flex-row items-center md:items-center justify-center gap-12 md:gap-16">

              {/* ── Profile image ── */}
              <div className="hero-profile-wrapper flex-shrink-0">
                <div className="hero-profile-img">
                  <img
                    src={profileImg}
                    alt="Alex Carter — Full-stack Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* ── Text + CTAs ── */}
              <div className="flex flex-col items-center md:items-start gap-stack-md text-center md:text-left max-w-xl">

                {/* Status badge */}
                <div className="status-badge">
                  <span className="status-dot" />
                  AVAILABLE FOR NEW PROJECTS
                </div>

                {/* Headline */}
                <h1 className="font-headline-xl text-headline-xl text-on-surface headline-responsive" style={{ marginTop: 4 }}>
                  Hi, I'm Alex Carter, a{' '}
                  <span className="text-primary">Full-stack&nbsp;Developer</span>
                </h1>

                {/* Subtext */}
                <p className="font-body-lg text-body-lg text-on-surface-variant hero-subtitle">
                  I build high-performance web applications with a focus on clean
                  user interfaces and resilient backend logic.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-stack-md w-full sm:w-auto" style={{ marginTop: 8 }}>
                  <a href="#work"
                    className="w-full sm:w-auto bg-on-surface text-on-primary font-label-md text-label-md px-8 py-4 hover:bg-primary transition-colors duration-300 text-center">
                    View Projects
                  </a>
                  <a href="#contact"
                    className="w-full sm:w-auto border border-outline-variant text-on-surface font-label-md text-label-md px-8 py-4 hover:border-outline hover:text-primary transition-colors duration-300 text-center">
                    Contact Me
                  </a>
                  <a
                    href="/assets/cv.pdf"
                    download="Alex_Carter_CV.pdf"
                    className="cv-download-btn w-full sm:w-auto font-label-md text-label-md px-8 py-4 text-center transition-colors duration-300">
                    Download CV
                  </a>
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
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

                {/* Left */}
                <Reveal className="md:col-span-4">
                  <h2 className="font-label-caps text-label-caps text-primary uppercase section-label">The Philosophy</h2>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-10">
                    {STATS.map(s => (
                      <div key={s.l}>
                        <p className="font-headline-lg text-on-surface" style={{ fontSize: 36, letterSpacing: '-0.03em' }}>{s.v}</p>
                        <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* Right */}
                <Reveal delay={0.1} className="md:col-span-8">
                  <p className="font-headline-lg text-headline-lg text-on-surface leading-snug">
                    I specialize in bridging the gap between{' '}
                    <em className="not-italic text-on-surface-variant">technical precision</em>
                    {' '}and{' '}
                    <em className="not-italic text-on-surface-variant">human-centered design</em>.
                    My code is written for maintainability, and my interfaces are built for clarity.
                  </p>

                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-lg">
                    With a background in systems architecture and visual design, I approach every project
                    as a balance of robust logic and editorial aesthetics. I believe that professional
                    software shouldn't just work—it should feel effortless.
                  </p>

                  {/* Skills */}
                  <div className="mt-8 pt-8 border-t border-outline-variant/30">
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">Core Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {SKILLS.map(s => (
                        <span key={s} className="font-label-caps text-label-caps px-3 py-1.5 bg-surface border border-outline-variant/50 text-on-surface-variant hover:border-outline hover:text-on-surface transition-colors cursor-default">
                          {s}
                        </span>
                      ))}
                    </div>
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
                <a href="mailto:hello@alex.dev" className="contact-link group flex flex-col items-center gap-2">
                  <div className="contact-icon">
                    <span className="material-symbols-outlined text-on-surface" style={{ fontSize: 22 }}>mail</span>
                  </div>
                  <span className="contact-label font-label-caps text-label-caps text-on-surface-variant transition-colors">Email</span>
                </a>
                <a href="#" className="contact-link group flex flex-col items-center gap-2">
                  <div className="contact-icon">
                    <span className="material-symbols-outlined text-on-surface" style={{ fontSize: 22 }}>code</span>
                  </div>
                  <span className="contact-label font-label-caps text-label-caps text-on-surface-variant transition-colors">GitHub</span>
                </a>
                <a href="#" className="contact-link group flex flex-col items-center gap-2">
                  <div className="contact-icon">
                    <span className="material-symbols-outlined text-on-surface" style={{ fontSize: 22 }}>person_outline</span>
                  </div>
                  <span className="contact-label font-label-caps text-label-caps text-on-surface-variant transition-colors">LinkedIn</span>
                </a>
              </Reveal>

              {/* Divider */}
              <Reveal>
                <div className="relative border-t border-outline-variant/30 mb-10">
                  <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#f9f9f9', padding: '0 12px' }}
                    className="font-label-caps text-label-caps text-on-surface-variant">OR SEND A MESSAGE</span>
                </div>
              </Reveal>

              {/* Form — EmailJS logic lives inside ContactForm */}
              <Reveal>
                <ContactForm />
              </Reveal>

            </div>
          </section>

        </main>

        {/* ══ FOOTER ════════════════════════════════════════════ */}
        <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-stack-lg px-gutter max-w-container-max mx-auto w-full">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>terminal</span>
              <span className="font-label-caps text-label-caps text-on-surface">ALEX.DEV</span>
            </div>
            <div className="flex gap-stack-lg">
              {['GitHub', 'LinkedIn', 'Twitter'].map(s => (
                <a key={s} href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">{s}</a>
              ))}
            </div>
            <p className="font-label-caps text-label-caps text-on-surface-variant/60">© 2024 ALEX.DEV. BUILT FOR PRECISION.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
