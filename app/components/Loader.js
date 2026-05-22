'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const BlastLoader = () => {
  const [phase, setPhase] = useState(0);
  // 0 → hidden | 1 → logo in | 2 → text in | 3 → bar fills

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 750);
    const t3 = setTimeout(() => setPhase(3), 1050);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/bg-background.jpg')] bg-cover bg-center flex items-center justify-center overflow-hidden">

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Large ambient radial glow — breathes with logo */}
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 0.8s ease',
          animation: phase >= 1 ? 'breathe 3s ease-in-out infinite' : 'none',
        }}
      />

      {/* Main content — tighter gap */}
      <div className="relative z-10 flex flex-col items-center gap-2 px-6">

        {/* ── LOGO BLOCK ── */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'scale(1) translateY(0px)' : 'scale(0.5) translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <div className="relative flex items-center justify-center">

            {/* Outer ring — spins clockwise, dashed */}
            <div
              className="absolute rounded-full"
              style={{
                width: 190,
                height: 190,
                border: '2px dashed rgba(99,102,241,0.55)',
                animation: phase >= 1 ? 'spinCW 6s linear infinite' : 'none',
              }}
            />

            {/* Middle ring — spins counter-clockwise, solid gradient */}
            <div
              className="absolute rounded-full"
              style={{
                width: 170,
                height: 170,
                border: '2.5px solid transparent',
                backgroundImage: 'conic-gradient(from 0deg, #3b82f6 0%, #06b6d4 40%, transparent 60%, #6366f1 80%, #3b82f6 100%)',
                backgroundOrigin: 'border-box',
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'destination-out',
                maskComposite: 'exclude',
                animation: phase >= 1 ? 'spinCCW 3s linear infinite' : 'none',
              }}
            />

            {/* Inner glow ring — breathes */}
            <div
              className="absolute rounded-full"
              style={{
                width: 152,
                height: 152,
                boxShadow: phase >= 1
                  ? '0 0 0 3px rgba(59,130,246,0.15), 0 0 28px 6px rgba(59,130,246,0.3), inset 0 0 20px 4px rgba(59,130,246,0.1)'
                  : 'none',
                transition: 'box-shadow 0.9s ease',
                animation: phase >= 1 ? 'glowPulse 2.5s ease-in-out infinite' : 'none',
                borderRadius: '50%',
              }}
            />

            {/* Logo image */}
            <Image
              src="/pnp-logo.png"
              alt="SPD Logo"
              width={250}
              height={250}
              className="relative z-10"
              style={{
                filter: phase >= 1
                  ? 'drop-shadow(0 0 12px rgba(255, 0, 64, 0.5)) drop-shadow(0 4px 16px rgba(0,0,0,0.6))'
                  : 'none',
                transition: 'filter 0.8s ease',
                animation: phase >= 1 ? 'logoFloat 4s ease-in-out infinite' : 'none',
              }}
              priority
            />

          </div>
        </div>

        {/* ── TEXT BLOCK — tight to logo ── */}
        <div
          className="flex flex-col items-center text-center"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0px)' : 'translateY(14px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            gap: '2px',
          }}
        >
          <h1
            className="font-extrabold uppercase text-white"
            style={{
              fontSize: '1rem',
              letterSpacing: '0.2em',
              textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 20px rgba(59,130,246,0.4)',
              lineHeight: 1.2,
            }}
          >
        philippine national police
          </h1>
          
        </div>

        {/* ── PROGRESS BAR ── */}
        <div
          style={{
            marginTop: '14px',
            width: '160px',
            height: '2px',
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: '9999px',
              background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #6366f1)',
              width: phase >= 3 ? '100%' : '0%',
              transition: 'width 2.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 0 8px rgba(59,130,246,0.7)',
            }}
          />
        </div>

      </div>

      <style>{`
        @keyframes spinCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinCCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(59,130,246,0.15), 0 0 28px 6px rgba(59,130,246,0.3), inset 0 0 20px 4px rgba(59,130,246,0.1); }
          50%       { box-shadow: 0 0 0 5px rgba(99,102,241,0.2),  0 0 40px 12px rgba(99,102,241,0.45), inset 0 0 28px 8px rgba(99,102,241,0.15); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1);    opacity: 0.9; }
          50%       { transform: scale(1.15); opacity: 1;   }
        }
      `}</style>
    </div>
  );
};

export default BlastLoader;
