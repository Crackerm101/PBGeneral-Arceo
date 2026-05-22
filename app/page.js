'use client';
import Image from "next/image";

import AddContactButton from './components/AddContact';
import SlideButton from './components/SlideButton';
import { useState, useEffect } from 'react';
import Loader from './components/Loader';

export default function Home() {
  const phoneNumber = '+639173536887';
  const emailAddress = 'cincoglennoliver@yahoo.com';

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="fixed inset-0"><Loader /></div>;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-4 px-4 sm:py-8 sm:px-8 font-[family-name:var(--font-geist-sans)] select-none">
      <div className="relative group w-full flex justify-center">

        {/* Tablet & Desktop Ambient Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-2xl blur-2xl opacity-20 group-hover:opacity-35 transition duration-1000 group-hover:duration-300 pointer-events-none hidden md:block"></div>

        {/* Outer border container with rotating conic gradient */}
        <div className="relative w-full max-w-[92vw] min-[360px]:max-w-[340px] sm:max-w-[380px] md:max-w-[400px] p-[2px] rounded-2xl overflow-hidden bg-slate-900 shadow-2xl transition-all duration-300 hover:-translate-y-0.5">

          {/* Rotating Light Line (Conic Gradient) */}
          <div
            className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite]"
            style={{
              background: 'conic-gradient(from 90deg at 50% 50%, rgba(37,99,235,0.55) 0%, rgba(96,165,250,0.35) 25%, #090d16 50%, rgba(96,165,250,0.35) 75%, rgba(37,99,235,0.55) 100%)',
            }}
          />

          {/* Calling Card Inner Container */}
          <div className="relative w-full bg-slate-950 rounded-[14px] overflow-hidden flex flex-col">

            {/* Card Header Image */}
            <a href="#" className="w-full select-none pointer-events-none">
              <img className="w-full h-auto object-cover" src="DD-CINCO.png" alt="" />
            </a>

            {/* Profile Name & Title Section */}
            <div className="relative w-full bg-gradient-to-b from-blue-900 to-blue-950 pb-4 pt-2 flex flex-col items-center">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20">
                <Image
                  aria-hidden
                  src="/star.svg"
                  alt="Star icon"
                  width={56}
                  height={56}
                  className="animate-pulse animate-duration-3000"
                />
              </div>

              <div className="flex flex-col items-center mt-7 px-4 w-full">
                <h2 className="text-[15px] min-[360px]:text-[17px] sm:text-xl font-black text-white text-center tracking-wide leading-tight">
                  PBGEN GLENN OLIVER C CINCO
                </h2>
                 <p className="text-[10px] min-[360px]:text-[14px] text-center text-slate-400 font-black max-w-[280px] leading-relaxed">
               DISTRICT DIRECTOR
              </p>
                 <p className="text-[10px] min-[360px]:text-[14px] text-center text-slate-400 font-medium max-w-[280px] leading-relaxed">
               BATCH 96
              </p>
                {/* Decorative line divider */}
                <div className="flex items-center justify-center gap-2 mt-2 w-full max-w-[200px]">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 to-blue-300/80" />
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-blue-300/70" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-blue-200/90 shadow-[0_0_4px_rgba(147,197,253,0.8)]" />
                    <div className="w-1 h-1 rounded-full bg-blue-300/70" />
                  </div>
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-blue-400/60 to-blue-300/80" />
                </div>
              </div>
            </div>

            {/* Call & Email Actions Section */}
            <div className="flex gap-y-3 items-center flex-col pt-4 pb-2 w-full px-4 min-[360px]:px-5 bg-slate-950/40">
              <SlideButton
                iconSrc="/telephone-call.png"
                text="SLIDE TO CALL"
                targetUrl={`tel:${phoneNumber}`}
                successText="CALLING..."
                activeColorClass="from-blue-600 to-blue-500"
              />
              <SlideButton
                iconSrc="/mail.png"
                text="SLIDE TO EMAIL"
                targetUrl={`mailto:${emailAddress}`}
                successText="EMAILING..."
                activeColorClass="from-blue-700 to-blue-500"
              />
            </div>

            {/* Save Contact Section */}
            <div className="bg-slate-950/40 pb-3">
              <AddContactButton />
            </div>

            {/* Footer Logo & Tagline */}
            <div className="flex flex-col items-center gap-2 pb-4 pt-2 px-5 bg-slate-950/40 border-t border-slate-900/50">
              <div className="flex items-center justify-center gap-3">
                <Image
                  src="/pnp-logo.svg"
                  alt="PNP Logo"
                  width={36}
                  height={36}
                  className="opacity-90 drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
                  aria-hidden="true"
                />
                <Image
                  src="/Bagong-Pilipinas-logo.svg"
                  alt="Bagong Pilipinas Logo"
                  width={36}
                  height={36}
                  className="opacity-90 drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
                  aria-hidden="true"
                />
              </div>
              <p className="text-[10px] min-[360px]:text-[11px] text-center text-slate-400 font-medium max-w-[280px] leading-relaxed">
                "Bagong PNP para sa Bagong Pilipinas: Serbisyong Mabilis, Tapat, at Nararamdaman"
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
