import React from 'react';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    href: 'https://www.instagram.com/meeiva.app/'
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    href: 'https://www.linkedin.com/company/meeiva/posts/?feedView=all'
  },
  {
    name: 'YouTube',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    href: 'https://youtube.com/@josephalmona?si=9cQqZjmPkzhIPKz6'
  }
];

export default function GetpinStyleFooter({ onBack }) {
  return (
    <footer className="relative w-full overflow-x-hidden select-none bg-gradient-to-b from-[#FFFFFF] via-[#D8ECFE] to-[#5CA8F8] pt-12 sm:pt-20 pb-8 sm:pb-12 border-none">
      {/* ── Main Container ── */}
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Massive White Wordmark with zero clipping */}
        <div className="w-full flex items-center justify-center overflow-visible">
          <h2 className="text-[23vw] sm:text-[24vw] font-black tracking-[-0.04em] leading-none text-white text-center select-none py-2 drop-shadow-[0_4px_30px_rgba(255,255,255,0.7)]">
            meeiva
          </h2>
        </div>

        {/* Social Icons (Instagram, LinkedIn, YouTube) in light rounded pills */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 text-[#2563EB]/70 px-4">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-white/60 bg-white/40 hover:bg-white/80 hover:text-[#1D4ED8] flex items-center justify-center transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Back to Portfolio */}
        {onBack && (
          <div className="mt-8 text-center px-4">
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-semibold text-white/90 hover:text-white underline transition-colors cursor-pointer drop-shadow-sm"
            >
              ← Back to Developer Portfolio
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
