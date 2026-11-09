import React from 'react';
import SpecularButton from './SpecularButton';

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
      {/* Ambient Pulsing Aura that blends with dark portfolio */}
      <div
        className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#0080FF]/50 via-[#38BDF8]/40 to-[#22D3EE]/30 blur-2xl opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none"
        aria-hidden="true"
      />

      <SpecularButton
        size="md"
        radius={9999}
        tint="#ffffff"
        tintOpacity={0.16}
        blur={14}
        textColor="#ffffff"
        lineColor="#ffffff"
        baseColor="#0077EE"
        intensity={1.6}
        idleIntensity={0.7}
        shineSize={26}
        shineFade={40}
        thickness={1.5}
        glow={1.4}
        autoAnimate
        speed={0.4}
        followMouse
        proximity={280}
        onClick={handleClick}
        className="cursor-pointer shadow-[0_10px_35px_-4px_rgba(0,128,255,0.65),0_0_25px_rgba(56,189,248,0.35)] transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-0.5 active:scale-95 border border-white/30 backdrop-blur-md"
        style={{
          background: 'linear-gradient(135deg, #1E88E5 0%, #0066CC 100%)',
          color: '#ffffff'
        }}
        aria-label="Explore Meetiva Project"
      >
        <span className="flex items-center gap-2.5 px-3.5 py-1">
          {/* Glowing pulse indicator dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>

          {/* Project Name */}
          <span className="font-extrabold text-[14px] tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            Meetiva
          </span>

          {/* Arrow badge */}
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-white text-xs font-bold transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </SpecularButton>
    </aside>
  );
}
