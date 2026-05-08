'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import UnderImge from '../../public/assets/images/ARTbgImage.png';

import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';

const Art = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }, undefined, matches => matches);
  const containerRef = useRef(null);

  useGSAP(() => {
    const start = isMobile ? 'top 20%' : 'top top';

    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#art',
        start,
        end: 'bottom center',
        scrub: 1.5,
        pin: true,
      },
    });

    maskTimeline
      .from('.will-fade', {
        opacity: 0,
        y: -30,
        stagger: 0.2,
        ease: 'power2.inOut',
      })
      .to('.will-fade', { opacity: 0, y: -30, stagger: 0.2, ease: 'power2.inOut' })
      .to('.masked-img', {
        scale: 1.9,
        maskPosition: 'center',
        maskSize: '400%',
        duration: 1,
        ease: 'power2.inOut',
      })
      .to('#masked-content', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
  });

  return (
    <section
      id="art"
      ref={containerRef}
      style={{
        minHeight: '100dvh',

        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '0',
        marginTop: '5rem',
      }}
    >
      {/* ── SVG diagonal accent lines ───────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        preserveAspectRatio="none"
      >
        <line
          className="art-diag-line"
          x1="12%"
          y1="0"
          x2="6%"
          y2="100%"
          stroke="#d4a017"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
        <line
          className="art-diag-line"
          x1="88%"
          y1="0"
          x2="94%"
          y2="100%"
          stroke="#d4a017"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
        <line
          className="art-diag-line"
          x1="50%"
          y1="0"
          x2="48%"
          y2="100%"
          stroke="#FF2D00"
          strokeWidth="0.3"
          strokeOpacity="0.08"
        />
      </svg>

      <div className="ghost-text absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden">
        <span
          className="font-bebas leading-none tracking-tighter text-[22vw] md:text-[18vw]"
          style={{
            WebkitTextStroke: '1px rgba(212,160,23,0.08)',
            color: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          PREDATOR
        </span>
      </div>

      <div
        className="container  "
        style={{
          position: 'relative',
          zIndex: 2,

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top label */}
        <div className="relative z-10 w-full flex items-center gap-4  pb-10 will-fade">
          <div className="w-5 h-[1px] bg-[#d4a017]" />
          <span className="font-bebas text-sm tracking-[0.5em] text-[#d4a017] uppercase opacity-70">
            F50 · Limited
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to right, #d4a01740, transparent)' }}
          />
          <span className="font-bebas text-[10px] tracking-[0.5em] text-white/20 uppercase">
            2026
          </span>
        </div>

        <div className="will-fade p-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Big title */}
          <div className="relative">
            {/* Eyebrow */}

            <h2
              className="font-bebas leading-[0.85] uppercase"
              style={{ fontSize: 'clamp(4.5rem, 13vw, 11rem)' }}
            >
              {/* Line 1 — white solid */}
              <span className="block text-white ">The</span>
              {/* Line 2 — gold outline */}
              <span
                className="block "
                style={{
                  WebkitTextStroke: '2px #FF2D00',
                  color: 'transparent',
                  letterSpacing: '0.06em',
                }}
              >
                ART
              </span>
            </h2>
          </div>

          {/* Right stats block */}
          <div className="flex gap-8 md:gap-12 md:pb-4">
            {[
              { value: '2026', label: 'Season' },
              { value: '04', label: 'Chapter' },
              { value: 'FG/AG', label: 'Surface' },
            ].map(({ value, label }) => (
              <div key={label} className="art-stat flex flex-col items-center md:items-end gap-1">
                <span className="font-bebas text-3xl md:text-4xl text-white tracking-wider">
                  {value}
                </span>
                <span className="text-[9px] tracking-[0.4em] uppercase text-white/25">{label}</span>
              </div>
            ))}
          </div>
        </div>
        {[
          'top-0 left-0 border-t border-l',
          'top-0 right-0 border-t border-r',
          'bottom-0 left-0 border-b border-l',
          'bottom-0 right-0 border-b border-r',
        ].map((pos, i) => (
          <div
            key={i}
            className={`will-fade m-5 absolute ${pos} w-6 h-6 border-[#d4a017]/30 z-20`}
          />
        ))}
        {/* Masked Image */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div
            className="cocktail-img"
            style={{
              width: '100%',
              height: '100vh',
              borderRadius: '2rem',
              overflow: 'hidden',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -70%)',
            }}
          >
            <video
              src="/assets/video/bootanimation.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="masked-img"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transformOrigin: 'center center',
              }}
            />
          </div>
        </div>

        <span
          className="will-fade absolute left-0 top-1/2 -translate-y-1/2 font-bebas text-[12px] tracking-[0.4em] text-white/20 uppercase hidden md:block"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
        >
          Adidas · Predator · Limited
        </span>
        <span
          className="will-fade absolute right-0 top-1/2 -translate-y-1/2 font-bebas text-[12px] tracking-[0.4em] text-[#d4a017]/40 uppercase hidden md:block"
          style={{ writingMode: 'vertical-rl' }}
        >
          Crafted for Champions
        </span>

        {/* Masked reveal content */}
        <div
          id="masked-content"
          className="text-center flex flex-col items-center gap-3"
          style={{ opacity: 0, transform: 'translateY(24px)' }}
        >
          {/* Gold divider */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-px bg-[#d4a017] opacity-50" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4a017] opacity-70" />
            <div className="w-10 h-px bg-[#d4a017] opacity-50" />
          </div>

          {/* CTAs */}
          <div className="mt-4 flex items-center gap-6">
            <button className="group border border-white/20 backdrop-blur-sm bg-white/5 text-white/80 text-[10px] tracking-[0.4em] uppercase px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all">
              <span className="font-bebas text-lg tracking-[0.4em] uppercase text-white group-hover:text-[#FF2D00] transition-colors">
                Explore Collection
              </span>
              <span className="text-white/50 text-lg group-hover:translate-x-1 group-hover:text-[#FF2D00] transition-all">
                →
              </span>
            </button>

            <button className="group flex items-center gap-2">
              <span className="font-bebas text-lg tracking-[0.4em] uppercase text-[#FF2D00] group-hover:text-white/50 transition-colors">
                Watch Film
              </span>
              <div className="w-5 h-5 rounded-full border border-[#FF2D00] flex items-center justify-center group-hover:border-white/40 transition-colors">
                <span className="text-[#FF2D00] group-hover:border-white/40 text-[8px]">▶</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Art;
