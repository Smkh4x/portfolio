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
      aria-label="Meetiva App Waitlist"
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 group select-none"
    >
      {/* Soft atmospheric radial blue glow underneath */}
      <div
        className="absolute -inset-3 rounded-full bg-[#1E88E5]/45 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      <SpecularButton
        size="lg"
        radius={9999}
        tint="#ffffff"
        tintOpacity={0.15}
        blur={14}
        textColor="#051326"
        lineColor="#ffffff"
        baseColor="#2563EB"
        intensity={1.8}
        idleIntensity={0.8}
        shineSize={28}
        shineFade={42}
        thickness={1.6}
        glow={1.4}
        autoAnimate
        speed={0.4}
        followMouse
        proximity={300}
        onClick={handleClick}
        className="shadow-2xl transition-all duration-300 group-hover:scale-105 active:scale-95 font-bold cursor-pointer"
        style={{
          background: 'linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)',
          color: '#051326',
          boxShadow: '0 12px 35px -6px rgba(29, 78, 216, 0.65), 0 0 20px rgba(59, 130, 246, 0.4)'
        }}
        aria-label="Meetiva App"
      >
        <span className="flex items-center justify-center px-4 py-1">
          <span className="font-extrabold text-[15px] sm:text-base tracking-tight text-[#051326] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
            Meetiva
          </span>
        </span>
      </SpecularButton>
    </aside>
  );
}
