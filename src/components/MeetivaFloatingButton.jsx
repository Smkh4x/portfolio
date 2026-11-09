import React from 'react';

export default function MeetivaFloatingButton({ onNavigate }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/meetiva');
    } else {
      window.history.pushState({}, '', '/meetiva');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <aside
      aria-label="Meetiva App"
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 select-none group"
    >
      {/* Soft atmospheric blue radial glow underneath */}
      <div
        className="absolute -inset-4 rounded-full bg-[#1E88E5]/50 blur-2xl opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={handleClick}
        aria-label="Open Meetiva"
        className="relative inline-flex items-center justify-center px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gradient-to-b from-[#42A5F5] to-[#1E88E5] text-[#0A1628] font-bold text-base sm:text-[17px] tracking-tight cursor-pointer overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-0.5 active:scale-95 shadow-[0_12px_32px_rgba(30,136,229,0.55),_0_2px_8px_rgba(0,0,0,0.15)] ring-1 ring-white/40"
      >
        {/* Specular curved glass rim highlight at top */}
        <span
          aria-hidden="true"
          className="absolute inset-x-2 top-0.5 h-[45%] rounded-full bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none"
        />

        {/* Crisp lower rim reflection */}
        <span
          aria-hidden="true"
          className="absolute inset-x-4 bottom-0.5 h-[1.5px] rounded-full bg-white/40 pointer-events-none"
        />

        {/* Text exactly matching image: "Meetiva" in dark high-contrast typography */}
        <span className="relative z-10 font-bold text-[#051326] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
          Meetiva
        </span>
      </button>
    </aside>
  );
}
