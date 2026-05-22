'use client';
import Image from "next/image";


import AddContactButton from './components/AddContact';
import SlideButton from './components/SlideButton';
import { useState, useEffect } from 'react';
import Loader from './components/Loader'; // adjust path based on your folder

export default function Home() {
  const phoneNumber = '+639175741332';
  const emailAddress = 'ryrcu1994@yahoo.com';

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500); // 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="fixed inset-0"><Loader /></div>;
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-8 font-[family-name:var(--font-geist-sans)] select-none">
      <div className="relative group w-full flex justify-center">
        {/* Tablet & Desktop Ambient Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-35 transition duration-1000 group-hover:duration-300 pointer-events-none hidden md:block"></div>
        
        {/* Outer border container with rotating conic gradient */}
        <div className="relative w-full max-w-[290px] min-[360px]:max-w-[340px] sm:max-w-[360px] md:max-w-[380px] p-[2px] rounded-2xl overflow-hidden bg-slate-900 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(30,58,138,0.4)] hover:-translate-y-0.5">
          
          {/* Rotating Light Line (Conic Gradient) */}
          <div className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0055ff_0%,#00f0ff_25%,#090d16_50%,#00f0ff_75%,#0055ff_100%)]"></div>
          
          {/* Calling Card Inner Container */}
          <div className="relative w-full bg-slate-950 rounded-[14px] overflow-hidden flex flex-col">
            
            {/* Card Header Image */}
            <a href="#" className="w-full select-none pointer-events-none">
              <img className="w-full h-auto object-cover" src="card-background.png" alt="" />
            </a>

            {/* Profile Name & Title Section */}
            <div className="relative w-full bg-gradient-to-b from-blue-900 to-blue-950 pb-5 pt-3 flex flex-col items-center">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20">
                <Image
                  aria-hidden
                  src="/star.svg"
                  alt="Star icon"
                  width={65}
                  height={65}
                  className="animate-pulse animate-duration-3000"
                />
              </div>

              <div className="flex flex-col items-center mt-8 px-4 w-full">
                <h2 className="text-[19px] min-[360px]:text-[22px] sm:text-2xl font-black text-white text-center tracking-wide leading-tight">
                  PBGEN RANDY Y ARCEO
                </h2>
                <p className="text-[7px] tracking-[0.25em] min-[360px]:tracking-[0.4em] text-blue-200 text-center uppercase font-medium mt-1">
                  Acting, Deputy Regional Director for Administration
                </p>
              </div>
            </div>

            {/* Call & Email Actions Section */}
            <div className="flex gap-y-4 items-center flex-col pt-6 pb-2 w-full px-4 min-[360px]:px-6 bg-slate-950/40">
              <SlideButton
                iconSrc="/telephone-call.png"
                text="SLIDE TO CALL"
                targetUrl={`tel:${phoneNumber}`}
                successText="CALLING..."
                activeColorClass="from-blue-600 to-cyan-500"
              />
              <SlideButton
                iconSrc="/mail.png"
                text="SLIDE TO EMAIL"
                targetUrl={`mailto:${emailAddress}`}
                successText="EMAILING..."
                activeColorClass="from-indigo-600 to-purple-500"
              />
            </div>

            {/* Save Contact Section */}
            <div className="bg-slate-950/40 pb-4">
              <AddContactButton />
            </div>

            {/* Footer Logo & Tagline */}
            <div className="flex flex-col items-center gap-2 pb-6 pt-2 px-5 bg-slate-950/40 border-t border-slate-900/50">
              <Image
                src="/Bagong-Pilipinas-logo.svg"
                alt="Bagong Pilipinas Logo"
                width={42}
                height={42}
                className="opacity-90 drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
                aria-hidden="true"
              />
              <p className="text-[10px] min-[360px]:text-xs text-center text-slate-400 font-medium max-w-[260px] min-[360px]:max-w-[300px] leading-relaxed">
                “Bagong PNP para sa Bagong Pilipinas: Serbisyong Mabilis, Tapat, at Nararamdaman”
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
