'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const BlastLoader = () => {
  const [phase, setPhase] = useState(0);
  // phase 0 → hidden, 1 → logo in, 2 → text in, 3 → bar fills

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);   // logo appears
    const t2 = setTimeout(() => setPhase(2), 700);   // text slides up
    const t3 = setTimeout(() => setPhase(3), 1100);  // bar starts filling
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/bg-background.jpg')] bg-cover bg-center flex items-center justify-center overflow-hidden">

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Radial glow behind logo */}
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
          opacity: phase >= 1 ? 1 : 0,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6">

        {/* Logo — scale + fade in */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'scale(1) translateY(0px)' : 'scale(0.6) translateY(20px)',
          }}
        >
          {/* Spinning ring around logo */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-[170px] h-[170px] rounded-full border-2 border-transparent"
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6, #06b6d4, #6366f1, #3b82f6) border-box',
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'destination-out',
                maskComposite: 'exclude',
                animation: phase >= 1 ? 'spin 2.5s linear infinite' : 'none',
              }}
            />
            {/* Glow ring */}
            <div
              className="absolute w-[155px] h-[155px] rounded-full"
              style={{
                boxShadow: phase >= 1 ? '0 0 30px 8px rgba(59,130,246,0.35)' : 'none',
                transition: 'box-shadow 0.8s ease',
              }}
            />
            <Image
              src="/NCRPO_logo.png"
              alt="SPD Logo"
              width={250}
              height={250}
              className="relative z-10 drop-shadow-[0_4px_16px_rgba(59,130,246,0.5)]"
              priority
            />
          </div>
        </div>

        {/* Text block — slide up + fade in */}
        <div
          className="flex flex-col items-center text-center gap-1 transition-all duration-700 ease-out"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0px)' : 'translateY(18px)',
          }}
        >
          <h1 className="text-lg font-extrabold tracking-widest text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] uppercase">
            National Capital Region Police Office
          </h1>
          <p
            className="text-[11px] tracking-[0.3em] uppercase font-medium transition-all duration-500"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              color: '#93c5fd',
              transitionDelay: '150ms',
            }}
          >
            We Care We Dare
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="w-48 h-[3px] rounded-full bg-white/10 overflow-hidden transition-opacity duration-500"
          style={{ opacity: phase >= 3 ? 1 : 0 }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #6366f1)',
              width: phase >= 3 ? '100%' : '0%',
              transition: 'width 2.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

      </div>

      {/* Keyframe for the spinning ring (inline style fallback) */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BlastLoader;
