import React, { useMemo } from 'react';

// ── Symbols pool ─────────────────────────────────────────────
const SYMBOLS = ['</>', '{}', '[]', '()', '<>', '=>', '/*', '//', '&&', '||'];

// ── Deterministic seeded "random" ────────────────────────────
// Avoids re-generating on every render while keeping variation
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateSymbols(count) {
  return Array.from({ length: count }, (_, i) => {
    const r = (offset) => seededRandom(i * 13 + offset);
    return {
      id: i,
      symbol: SYMBOLS[Math.floor(r(0) * SYMBOLS.length)],
      x: r(1) * 100,           // % left
      y: r(2) * 100,           // % top
      size: 11 + r(3) * 14,    // px  11–25
      opacity: 0.045 + r(4) * 0.055, // 0.045–0.1
      duration: 18 + r(5) * 22, // s  18–40
      delay: -(r(6) * 20),      // negative = start mid-loop
      driftX: (r(7) - 0.5) * 60, // px  −30 to +30
      driftY: (r(8) - 0.5) * 50, // px  −25 to +25
      rotate: (r(9) - 0.5) * 20, // deg −10 to +10
      // colour from palette: near-white, light-gray, soft-blue
      color: ['#424656', '#0050cb', '#727687', '#c2c6d8'][Math.floor(r(10) * 4)],
    };
  });
}

// ── Component ────────────────────────────────────────────────
export default function FloatingSymbols() {
  // Desktop: 28 symbols | we hide ~half on mobile via CSS
  const symbols = useMemo(() => generateSymbols(28), []);

  return (
    <>
      {/* Inject keyframes once */}
      <style>{`
        @keyframes float-symbol {
          0% {
            transform:
              translate(0px, 0px)
              rotate(var(--rot-start));
            opacity: 0;
          }
          8% { opacity: var(--sym-opacity); }
          50% {
            transform:
              translate(var(--drift-x), var(--drift-y))
              rotate(var(--rot-end));
          }
          92% { opacity: var(--sym-opacity); }
          100% {
            transform:
              translate(0px, 0px)
              rotate(var(--rot-start));
            opacity: 0;
          }
        }

        /* Hide odd-indexed symbols on small screens to reduce density */
        @media (max-width: 640px) {
          .float-sym:nth-child(odd) { display: none; }
        }
      `}</style>

      {/* Fixed background layer — pointer-events:none so it never blocks UI */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        {symbols.map((s) => (
          <span
            key={s.id}
            className="float-sym"
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: `${s.size}px`,
              color: s.color,
              lineHeight: 1,
              whiteSpace: 'nowrap',
              // CSS custom properties consumed by the keyframe
              '--sym-opacity': s.opacity,
              '--drift-x': `${s.driftX}px`,
              '--drift-y': `${s.driftY}px`,
              '--rot-start': `${-s.rotate}deg`,
              '--rot-end': `${s.rotate}deg`,
              animation: `float-symbol ${s.duration}s ${s.delay}s ease-in-out infinite`,
              willChange: 'transform, opacity',
            }}
          >
            {s.symbol}
          </span>
        ))}
      </div>
    </>
  );
}
