'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function SlideButton({ iconSrc, text, targetUrl, successText, activeColorClass = 'from-red-600 to-rose-500' }) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef(null);
  const handleRef = useRef(null);

  const getDragRange = () => {
    if (containerRef.current && handleRef.current) {
      // 8px is for container padding (p-1 is 4px on each side)
      return containerRef.current.clientWidth - handleRef.current.clientWidth - 8;
    }
    return 0;
  };

  const handleStart = (clientX) => {
    if (isCompleted) return;
    setIsDragging(true);
    const initialDragRange = getDragRange();
    handleRef.current.dataset.startX = clientX - dragX;
    handleRef.current.dataset.maxDrag = initialDragRange;
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const startX = parseFloat(handleRef.current.dataset.startX || '0');
    const maxDrag = parseFloat(handleRef.current.dataset.maxDrag || '0');
    const currentX = clientX - startX;
    setDragX(Math.max(0, Math.min(currentX, maxDrag)));
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const maxDrag = parseFloat(handleRef.current.dataset.maxDrag || '0');

    if (dragX >= maxDrag * 0.90) {
      setDragX(maxDrag);
      setIsCompleted(true);
      
      // Delay before redirecting to allow the completed animation to be seen
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 300);

      // Auto-reset after a delay
      setTimeout(() => {
        setDragX(0);
        setIsCompleted(false);
      }, 3000);
    } else {
      setDragX(0);
    }
  };

  useEffect(() => {
    const onMouseMove = (e) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, dragX]);

  const maxDragValue = containerRef.current ? getDragRange() : 0;
  const progressPercent = maxDragValue > 0 ? (dragX / maxDragValue) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[320px] h-16 bg-slate-900/80 border border-slate-700/50 rounded-full flex items-center p-1 overflow-hidden select-none shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] touch-none"
    >
      {/* Background Completed Progress Gradient */}
      <div 
        className={`absolute left-1 top-1 bottom-1 bg-gradient-to-r ${activeColorClass} rounded-full transition-all duration-75 ease-out`}
        style={{ 
          width: `calc(${progressPercent}% + 56px)`,
          opacity: progressPercent > 5 ? 1 : 0.3
        }}
      />

      {/* Central Text Hint */}
      <span 
        className="absolute inset-0 flex items-center justify-center text-xs font-bold tracking-widest text-slate-200 pointer-events-none transition-opacity duration-150 select-none"
        style={{ opacity: Math.max(0, 1 - progressPercent / 75) }}
      >
        {isCompleted ? successText : text}
      </span>

      {/* Slide Handle */}
      <div
        ref={handleRef}
        className={`w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing touch-none select-none z-10`}
        style={{
          transform: `translateX(${dragX}px)`,
          transition: isDragging ? 'none' : 'transform 250ms cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <div className="relative w-7 h-7 flex items-center justify-center">
          <Image 
            src={iconSrc}
            alt="Action Icon"
            width={28}
            height={28}
            className={`select-none pointer-events-none transition-all duration-300 ${isCompleted ? 'animate-bounce' : 'opacity-90'}`}
          />
        </div>
      </div>
    </div>
  );
}
