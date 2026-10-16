import React, { useState, useEffect, useRef } from 'react';
import SeoHead from './components/SeoHead';
import ContactForm from './components/ContactForm';
import PixelTrail from './components/PixelTrail';
import ASCIIText from './components/ASCIIText';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Projects Data (Curated 3 Featured Projects) ───────────────────────────
const PROJECTS = [
  {
    title: 'Meetiva – Interest-Based Video Matching Mobile App',
    category: 'Mobile',
    desc: 'Mobile application that connects people through interest-based, one-to-one video matching, designed around meaningful connections rather than random interactions. Includes backend logic that matches users with shared interests and joins them into a room. Built with React Native and Expo.',
    tags: ['React Native', 'Expo', 'WebRTC', 'Node.js'],
    github: 'https://github.com/Smkh4x/Meetiva',
    demo: 'https://github.com/Smkh4x/Meetiva',
  },
  {
    title: 'Management Dashboard System for Training Centers',
    category: 'Fullstack',
    desc: 'Web-based system for managing training centers, learners, enrollments, and payment tracking, with role-based access (Admin, Manager, Staff) and a responsive interface for mobile and desktop devices. Full-stack implementation integrating a React frontend, RESTful Node.js/Express.js API, and a MySQL database.',
    tags: ['React', 'Node.js', 'Express.js', 'MySQL', 'TailwindCSS'],
    github: 'https://github.com/Smkh4x',
    demo: 'https://github.com/Smkh4x',
  },
  {
    title: 'Quiz Mind',
    category: 'Web',
    desc: 'A logic-based quiz platform that challenges users with smart questions to sharpen critical thinking, problem-solving, and reasoning skills. ⭐ 9 stars on GitHub.',
    tags: ['JavaScript', 'React', 'CSS'],
    github: 'https://github.com/Smkh4x/Quiz-Mind',
    demo: 'https://github.com/Smkh4x/Quiz-Mind',
  },
];

export default function App() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(false);
  const [dissolveProgress, setDissolveProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDismissingRef = useRef(false);

  const triggerDismiss = () => {
    if (isDismissingRef.current || introDismissed) return;
    isDismissingRef.current = true;

    const startTime = performance.now();
    const duration = 650; // 650ms smooth dissolve into mouse pixel trail

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      setDissolveProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIntroDismissed(true);
      }
    };

    requestAnimationFrame(step);
  };

  // Auto-dismiss Hey! intro after 2 seconds on mobile
  useEffect(() => {
    if (introDismissed || isDismissingRef.current) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      const timer = setTimeout(() => {
        triggerDismiss();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [introDismissed]);

  // Dismiss intro on scroll (wheel, touch, or keys)
  useEffect(() => {
    if (introDismissed || isDismissingRef.current) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > 6 || Math.abs(e.deltaX) > 6) {
        triggerDismiss();
      }
    };

    const onKeyDown = (e) => {
      if (['ArrowDown', 'Space', 'Enter', 'PageDown'].includes(e.code)) {
        triggerDismiss();
      }
    };

    let startY = 0;
    const onTouchStart = (e) => {
      if (e.touches?.[0]) startY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (e.touches?.[0] && Math.abs(e.touches[0].clientY - startY) > 12) {
        triggerDismiss();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [introDismissed]);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('youssef.dev.sec@gmail.com').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  return (
    <div className="home-page min-h-screen flex flex-col bg-[#1a1a1a] text-white selection:bg-[#031e58] selection:text-white relative">
      <SeoHead
        title="Youssef Almona | Full Stack Developer"
        description="Full Stack and Mobile Developer skilled in React Native, React, and Node.js with hands-on experience building cross-platform applications."
        path="/"
      />

      {/* ─── Interactive ASCII "Hey!" Entrance Gate (Full Screen) ────────────── */}
      <AnimatePresence>
        {!introDismissed && (
          <motion.div
            key="ascii-intro"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.35, ease: 'easeOut' }
            }}
            onClick={triggerDismiss}
            onTouchStart={triggerDismiss}
            className="fixed inset-0 z-40 bg-[#1a1a1a] cursor-pointer select-none overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full">
              <ASCIIText
                text="Hey!"
                asciiFontSize={8}
                colors={['#ffffff', '#e4e4e7', '#71717a']}
                textColor="#ffffff"
                textScale={0.85}
                blocks={0.9}
                waves={1}
                waveSpeed={1}
                chroma={0.5}
                tilt={1.2}
                hueShift={0.4}
                scramble={0.65}
                clickRipple
                idle
                interactive
                dissolve={dissolveProgress}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Pixel Trail Background (React Bits) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <PixelTrail
          gridSize={90}
          trailSize={0.055}
          maxAge={300}
          interpolate={6}
          color="#ffffff"
          trailColor="#383838"
          gooeyFilter={{ strength: 1.2 }}
          glow={0.2}
          shine={0.3}
        />
      </div>

      {/* Spacer for fixed header */}
      <div aria-hidden="true" className="h-14"></div>

      {/* ─── Fixed Header (matching tahaboussaden.me) ─────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-30 border-b border-white/10 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(26, 26, 26, 0.94)' }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4 sm:gap-6 min-w-0">
              <h1 className="text-sm font-semibold whitespace-nowrap flex-shrink-0">
                <a
                  className="transition-colors underline text-white hover:opacity-80"
                  href="/"
                >
                  Youssef Almona
                </a>
              </h1>

              {/* Desktop Navigation */}
              <nav className="hidden sm:flex items-center gap-5 sm:gap-6 text-sm">
                <a
                  className="transition-colors text-gray-400 hover:text-white hover:underline whitespace-nowrap"
                  href="#projects"
                >
                  Projects
                </a>
                <a
                  className="transition-colors text-gray-400 hover:text-white hover:underline whitespace-nowrap"
                  href="#experience"
                >
                  Experience
                </a>
                <a
                  className="transition-colors text-gray-400 hover:text-white hover:underline whitespace-nowrap"
                  href="#skills"
                >
                  Skills
                </a>
                <a
                  className="transition-colors text-gray-400 hover:text-white hover:underline whitespace-nowrap"
                  href="#contact"
                >
                  Contact
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Direct English CV Download */}
              <a
                href="/assets/cv.pdf"
                download="Youssef_Almona_CV.pdf"
                className="text-xs px-2.5 sm:px-3 py-1 rounded-full transition-colors bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1.5"
                title="Download CV"
              >
                <span className="material-symbols-outlined text-xs">download</span>
                <span>CV</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                className="sm:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all border border-white/10"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Liquid Glass Menu ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Click-away backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="sm:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Liquid Glass Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="sm:hidden fixed inset-x-3 top-14 z-40 p-3.5 rounded-2xl border border-white/20 overflow-hidden"
              style={{
                backgroundColor: 'rgba(28, 28, 30, 0.82)',
                backdropFilter: 'blur(32px) saturate(190%)',
                WebkitBackdropFilter: 'blur(32px) saturate(190%)',
                boxShadow: '0 24px 50px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.3), inset 0 0 20px 0 rgba(255, 255, 255, 0.03)'
              }}
            >
              {/* Liquid specular gloss top bar */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/[0.08] rounded-full blur-2xl pointer-events-none" />

              <nav className="flex flex-col space-y-1 relative z-10">
                {[
                  { label: 'Projects', href: '#projects', icon: 'folder_open' },
                  { label: 'Experience', href: '#experience', icon: 'school' },
                  { label: 'Skills', href: '#skills', icon: 'terminal' },
                  { label: 'Contact', href: '#contact', icon: 'send' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-medium text-white/85 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all"
                  >
                    <span className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-white/60">{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    <span className="text-white/30 text-xs font-mono">↗</span>
                  </a>
                ))}

                <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between px-2 text-xs text-white/50">
                  <span>Fkih Ben Salah, Morocco</span>
                  <a
                    href="/assets/cv.pdf"
                    download="Youssef_Almona_CV.pdf"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:underline flex items-center gap-1 font-medium"
                  >
                    <span className="material-symbols-outlined text-[13px]">download</span>
                    Download CV
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content Column (max-w-2xl px-4 sm:px-6) ───────────── */}
      <main className="flex-1 py-6 sm:py-10 md:py-12 relative z-10">
        <section className="w-full mx-auto px-4 sm:px-6 pb-0 pt-2 md:pt-4 max-w-2xl">
          {/* ── Intro (No profile image, text-only matching tahaboussaden.me) ── */}
          <div className="mb-6">
            <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              Youssef Almona
            </h1>
            <p className="text-[13px] sm:text-[14px] text-white/60">
              Full Stack Developer · Mobile & Web
            </p>
            <p className="text-[12px] text-white/40">
              Fkih Ben Salah, Morocco
            </p>
          </div>

          <div className="space-y-3 text-[13px] sm:text-[14px] leading-6 text-white/90">
            <p>
              I'm a{' '}
              <a
                href="https://github.com/Smkh4x"
                target="_blank"
                rel="noopener noreferrer"
                className="home-link"
              >
                Full Stack and Mobile Developer
              </a>{' '}
              with hands-on experience building cross-platform web and mobile applications.
            </p>
            <p>
              Skilled in{' '}
              <span className="text-white font-medium">React Native</span>,{' '}
              <span className="text-white font-medium">React</span>, and{' '}
              <span className="text-white font-medium">Node.js</span>, with a strong focus on code quality, API integration, and responsive interface development. Motivated to grow as a developer and contribute to real-world projects while continuously improving technical skills.
            </p>
          </div>

          {/* ── Now Section (matching tahaboussaden.me style) ── */}
          <h2 className="mt-8 text-[12px] uppercase tracking-widest font-semibold text-white/50 mb-4">
            Now
          </h2>
          <ul className="space-y-2.5 text-[14px] leading-6 text-white/90">
            <li className="flex gap-2.5 items-start">
              <span className="text-white/50 flex-shrink-0 mt-0.5">→</span>
              <span>
                Developing{' '}
                <a
                  href="https://github.com/Smkh4x/Meetiva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link"
                >
                  Meetiva
                </a>
                , an interest-based video matching mobile app built with React Native and Expo
              </span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-white/50 flex-shrink-0 mt-0.5">→</span>
              <span>
                Full Stack & Mobile Development Training at{' '}
                <span className="text-white/90 font-medium">CCFBS – Simplon Maghreb</span> (2026)
              </span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-white/50 flex-shrink-0 mt-0.5">→</span>
              <span>
                Building with modern AI tools & APIs including Anthropic Claude API, Claude Code, Cursor IDE, and Antigravity
              </span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-white/50 flex-shrink-0 mt-0.5">→</span>
              <span>
                Open for full-stack, mobile, and software engineering opportunities
              </span>
            </li>
          </ul>

          {/* ── Projects Section (Curated 3 Projects + GitHub CTA) ── */}
          <div id="projects" className="scroll-mt-20">
            <h2 className="mt-10 text-[12px] uppercase tracking-widest font-semibold text-white/50 mb-4">
              Featured Projects
            </h2>

            <div className="space-y-4">
              {PROJECTS.map((project, idx) => (
                <article key={project.title}>
                  <div className="flex items-baseline justify-between gap-2">
                    <a
                      href={project.demo || project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] font-medium text-white hover:underline inline-flex items-center gap-1 group"
                    >
                      <span>{project.title}</span>
                      <span className="text-white/40 group-hover:text-white transition-colors">↗</span>
                    </a>
                    <span className="text-xs text-white/40 whitespace-nowrap flex-shrink-0">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    {project.desc}
                  </p>


                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5 sm:gap-4 mt-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-xs flex-shrink-0 pt-1 xs:pt-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-link text-white/70 hover:text-white"
                      >
                        GitHub
                      </a>
                      {project.demo && project.demo !== project.github && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="home-link text-white/70 hover:text-white"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {idx !== PROJECTS.length - 1 && (
                    <div className="mt-4 h-px bg-white/10"></div>
                  )}
                </article>
              ))}
            </div>

            {/* "Show more projects on GitHub" Link/Button */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-white/50">
                Want to explore more of my work and experiments?
              </p>
              <a
                href="https://github.com/Smkh4x?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors group flex-shrink-0"
              >
                <span>More projects on GitHub</span>
                <span className="text-white/60 group-hover:text-white transition-colors">↗</span>
              </a>
            </div>
          </div>

          {/* ── Experience & Education Section ── */}
          <div id="experience" className="scroll-mt-20">
            <h2 className="mt-10 text-[12px] uppercase tracking-widest font-semibold text-white/50 mb-4">
              Education & Training
            </h2>

            <div className="space-y-4">
              {/* CCFBS Simplon */}
              <div>
                <div className="flex flex-col xs:flex-row xs:items-baseline xs:justify-between gap-0.5 xs:gap-2">
                  <span className="font-semibold text-[13px] sm:text-[14px]">
                    Full Stack & Mobile Development Training
                  </span>
                  <span className="text-xs text-white/50 whitespace-nowrap flex-shrink-0">
                    2026
                  </span>
                </div>
                <p className="text-[13px] sm:text-[14px] text-white/70 mt-0.5">CCFBS – Simplon Maghreb</p>
                <p className="text-xs sm:text-[13px] text-white/60 mt-1 leading-relaxed">
                  Intensive practical training focusing on full-stack web and cross-platform mobile development with modern frameworks, agile workflow, and industry best practices.
                </p>
                <div className="mt-4 h-px bg-white/10"></div>
              </div>

              {/* Self-Taught */}
              <div>
                <div className="flex flex-col xs:flex-row xs:items-baseline xs:justify-between gap-0.5 xs:gap-2">
                  <span className="font-semibold text-[13px] sm:text-[14px]">
                    Self-Taught & Continuous Learning
                  </span>
                  <span className="text-xs text-white/50 whitespace-nowrap flex-shrink-0">
                    2022 – Present
                  </span>
                </div>
                <p className="text-[13px] sm:text-[14px] text-white/70 mt-0.5">Fkih Ben Salah, Morocco</p>
                <p className="text-xs sm:text-[13px] text-white/60 mt-1 leading-relaxed">
                  Independent learning and practical skill development in computer science, web and mobile development, UI/UX design, and modern AI tools.
                </p>
              </div>
            </div>
          </div>

          {/* ── Technical Skills Section ── */}
          <div id="skills" className="scroll-mt-20">
            <h2 className="mt-10 text-[12px] uppercase tracking-widest font-semibold text-white/50 mb-4">
              Technical Skills
            </h2>

            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed">
              <div>
                <span className="font-semibold text-white/90">Core Languages: </span>
                <span className="text-white/60">
                  JavaScript, TypeScript, HTML5/CSS3, C, C++, MySQL, NoSQL
                </span>
              </div>
              <div>
                <span className="font-semibold text-white/90">Frontend & Mobile: </span>
                <span className="text-white/60">
                  React, React Native, Zustand, TailwindCSS, NativeWind, Material-UI, Axios, Reanimated, Responsive Design, CSS Animations
                </span>
              </div>
              <div>
                <span className="font-semibold text-white/90">Backend & API: </span>
                <span className="text-white/60">
                  Node.js, Express.js, REST API
                </span>
              </div>
              <div>
                <span className="font-semibold text-white/90">AI Tools: </span>
                <span className="text-white/60">
                  Anthropic Claude API, Claude Code, Cursor IDE, Antigravity
                </span>
              </div>
              <div>
                <span className="font-semibold text-white/90">DevOps & Databases: </span>
                <span className="text-white/60">
                  Git, Docker, MongoDB, PostgreSQL, MySQL, Linux
                </span>
              </div>
              <div>
                <span className="font-semibold text-white/90">Project Management: </span>
                <span className="text-white/60">
                  Agile/Scrum, Jira, Kanban, Sprint Planning
                </span>
              </div>
              <div>
                <span className="font-semibold text-white/90">Soft Skills: </span>
                <span className="text-white/60">
                  Problem-solving, Autonomy & self-learning, Teamwork, Adaptability, Clear communication, Time management, Attention to detail
                </span>
              </div>
              <div>
                <span className="font-semibold text-white/90">Languages: </span>
                <span className="text-white/60">
                  Arabic (Native) · English (B2) · French (A1)
                </span>
              </div>
            </div>
          </div>

          {/* ── Elsewhere Links (matching tahaboussaden.me Elsewhere section) ── */}
          <h2 className="mt-10 text-[12px] uppercase tracking-widest font-semibold text-white/50 mb-4">
            Elsewhere
          </h2>
          <div className="flex flex-wrap gap-4 text-[14px]">
            <a
              href="https://github.com/Smkh4x"
              target="_blank"
              rel="noopener noreferrer"
              className="home-link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/youssef-almona"
              target="_blank"
              rel="noopener noreferrer"
              className="home-link"
            >
              LinkedIn
            </a>
            <a
              href="mailto:youssef.dev.sec@gmail.com"
              className="home-link"
            >
              Email
            </a>
            <button
              onClick={handleCopyEmail}
              className="home-link bg-transparent border-none p-0 cursor-pointer text-white/70"
            >
              {copiedEmail ? 'Copied Email!' : 'Copy Email'}
            </button>
            <a
              href="/assets/cv.pdf"
              download="Youssef_Almona_CV.pdf"
              className="home-link"
            >
              Download CV
            </a>
          </div>

          {/* ── Contact Section ("Forum") ── */}
          <div id="contact" className="mt-10 pt-6 border-t border-white/10 scroll-mt-20">
            <h2 className="text-[12px] uppercase tracking-widest font-semibold text-white/50 mb-2">
              Send a Message
            </h2>
            <p className="text-[14px] leading-6 text-white/70 mb-5">
              Feel free to reach out directly using the form below or email me at{' '}
              <a href="mailto:youssef.dev.sec@gmail.com" className="home-link">
                youssef.dev.sec@gmail.com
              </a>{' '}
              if anything catches your interest.
            </p>

            <div className="bg-[#1e1e1e]/60 border border-white/10 rounded-lg p-5 sm:p-6">
              <ContactForm />
            </div>
          </div>

          {/* ── Minimalist Footer ── */}
          <footer className="mt-14 mb-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
            <p>© {new Date().getFullYear()} Youssef Almona</p>
            <p>Built with React & Tailwind CSS</p>
          </footer>
        </section>
      </main>
    </div>
  );
}
