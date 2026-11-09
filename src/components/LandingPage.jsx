import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GetpinStyleFooter from './GetpinStyleFooter';

const FAQS = [
  {
    q: 'What is Meeiva?',
    a: 'Meeiva is a video chat and networking platform built for authentic 1-on-1 conversations, spontaneous discovery, and real-time collaboration around shared interests.'
  },
  {
    q: 'When does the beta launch?',
    a: "We're rolling out early beta access in waves on iOS (TestFlight) and Android. Joining the waitlist puts you in the queue, and inviting friends moves you up."
  },
  {
    q: 'How do you keep conversations safe?',
    a: 'Every call has one-tap skip, mute, and report controls. All reports are immediately reviewed by our automated and human moderation team.'
  },
  {
    q: 'Is Meeiva free?',
    a: 'Early beta testers get completely free access. Any future pricing will be shared well in advance, and early founding members will receive permanent perks.'
  }
];

export default function LandingPage({ onBack }) {
  const [heroEmail, setHeroEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleJoin = (emailVal) => {
    if (!emailVal || !emailVal.includes('@')) return;
    try {
      const saved = JSON.parse(localStorage.getItem('meetiva_waitlist') || '[]');
      saved.push({ email: emailVal, timestamp: new Date().toISOString() });
      localStorage.setItem('meetiva_waitlist', JSON.stringify(saved));
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  const handleBack = (e) => {
    e?.preventDefault();
    if (onBack) {
      onBack();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-[#111827] font-sans selection:bg-[#1E88E5] selection:text-white overflow-x-hidden">
      {/* ── Top Navigation Bar ─────────────────────────────── */}
      <header className="relative z-30 max-w-[1300px] mx-auto px-6 sm:px-12 py-7 flex items-center justify-between gap-4">
        {/* Brand logo */}
        <a href="#top" className="flex items-center">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-[#0080FF]">Mee</span>
            <span className="text-[#72B4FA]">iva</span>
          </span>
        </a>

        {/* Outline Pill Button */}
        <a
          href="#waitlist"
          className="inline-flex items-center px-5 sm:px-6 py-2 rounded-full border border-gray-400/80 hover:border-gray-900 text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95"
        >
          join to the waitlist
        </a>
      </header>

      {/* ── Hero Section (Exact replicate of the design) ────── */}
      <section id="top" className="relative z-10 max-w-[1000px] mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28 flex flex-col items-center text-center">
        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-[76px] font-black tracking-[-0.03em] leading-[1.08] text-black">
          Join to waitlist for
        </h1>
        <h2 className="mt-1 sm:mt-2 text-5xl sm:text-7xl lg:text-[76px] font-black tracking-[-0.03em] leading-[1.08] text-[#1E88E5]">
          meeiva app
        </h2>

        {/* Subtitles */}
        <p className="mt-8 text-base sm:text-lg font-medium text-gray-700">
          Enter your email to get notified when it's your turn to join.
        </p>
        <p className="mt-1 text-sm sm:text-base font-normal text-gray-400">
          His working on mobile and web as well
        </p>

        {/* Pill Input Form */}
        <form
          id="waitlist"
          onSubmit={(e) => {
            e.preventDefault();
            handleJoin(heroEmail);
          }}
          className="mt-8 w-full max-w-[480px] flex items-center bg-white border border-gray-300 rounded-full p-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] focus-within:border-[#1E88E5] focus-within:ring-2 focus-within:ring-[#1E88E5]/20 transition-all"
        >
          <input
            type="email"
            required
            value={heroEmail}
            onChange={(e) => setHeroEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 min-w-0 px-4 sm:px-5 py-2.5 text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-full bg-[#0080FF] hover:bg-[#0070E0] text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {submitted ? 'Joined ✓' : 'join to the waitlist'}
          </button>
        </form>

        {/* Down Arrow Chevron */}
        <a
          href="#how"
          aria-label="Scroll down"
          className="mt-20 inline-flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors animate-bounce"
        >
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section id="how" className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-8 py-20 border-t border-gray-100">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            From hello to collaboration in three steps.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-gray-200/60 hover:bg-white/70 transition-all duration-300">
            <span className="w-10 h-10 rounded-full bg-[#0080FF] flex items-center justify-center text-base font-bold text-white">
              1
            </span>
            <h3 className="mt-5 text-xl font-bold text-gray-900">Create your account</h3>
            <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">
              Choose a username or continue with Google. It takes less than a minute.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-gray-200/60 hover:bg-white/70 transition-all duration-300">
            <span className="w-10 h-10 rounded-full bg-[#0080FF] flex items-center justify-center text-base font-bold text-white">
              2
            </span>
            <h3 className="mt-5 text-xl font-bold text-gray-900">Tap to match</h3>
            <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">
              One tap starts a safe video chat with someone new. Not feeling it? Skip to the next person anytime.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-gray-200/60 hover:bg-white/70 transition-all duration-300">
            <span className="w-10 h-10 rounded-full bg-[#0080FF] flex items-center justify-center text-base font-bold text-white">
              3
            </span>
            <h3 className="mt-5 text-xl font-bold text-gray-900">Talk, chat, collaborate</h3>
            <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">
              Keep ideas flowing with floating chat cards, then turn great conversations into real projects.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ───────────────────────────────────── */}
      <section id="faq" className="relative z-10 max-w-[820px] mx-auto px-6 sm:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 text-center">
          Frequently asked questions
        </h2>

        <div className="mt-10 flex flex-col gap-3">
          {FAQS.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white/40 backdrop-blur-xl border border-gray-200/60 hover:bg-white/70 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-semibold text-gray-900 text-base sm:text-lg cursor-pointer"
                >
                  <span>{item.q}</span>
                  <span className={`material-symbols-outlined text-[#0080FF] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    keyboard_arrow_down
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Footer ── */}
      <GetpinStyleFooter onBack={handleBack} />
    </div>
  );
}
