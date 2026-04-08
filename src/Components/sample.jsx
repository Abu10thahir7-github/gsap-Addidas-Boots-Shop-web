"use client";
import Image from 'next/image';
import React, { useRef } from 'react';
import UnderImge from '../../public/assets/images/Adidas Predator Precision LIMITED COLLECTION.jpg';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Art = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const containerRef = useRef(null);

  useGSAP(() => {
    const start = isMobile ? 'top 20%' : 'top top';

    // ── Entrance: stagger the stat items ───────────────────
    gsap.from('.art-stat', {
      y: 40, opacity: 0, stagger: 0.12, duration: 0.9,
      ease: 'power3.out', delay: 0.2,
    });

    // ── Entrance: diagonal lines draw in ───────────────────
    gsap.from('.art-diag-line', {
      scaleY: 0, duration: 1.2, ease: 'power4.out',
      stagger: 0.1, transformOrigin: 'top',
    });

    // ── Scroll timeline ─────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#art',
        start,
        end: 'bottom center',
        scrub: 1.5,
        pin: true,
      },
    });

    tl
      // Fade out top block
      .to('.will-fade', {
        opacity: 0, y: -40, stagger: 0.15, ease: 'power2.inOut',
      })
      // Ghost text shrinks back
      .to('.ghost-text', {
        opacity: 0, scale: 0.92, duration: 0.8, ease: 'power2.in',
      }, '<0.1')
      // Image mask blows fully open
      .to('.masked-img', {
        scale: 2.2,
        maskSize: '500%',
        maskPosition: 'center',
        duration: 1.2,
        ease: 'power2.inOut',
      }, '<0.2')
      // Dark overlay lifts
      .to('.img-overlay', { opacity: 0, duration: 0.8 }, '<0.3')
      // Reveal content fades in
      .to('#masked-content', {
        opacity: 1, y: 0, duration: 1, ease: 'expo.out',
      });

  }, { scope: containerRef });

  return (
    <section
      id="art"
      ref={containerRef}
      className="relative min-h-dvh w-full overflow-hidden bg-[#080808] flex flex-col"
      style={{ marginTop: '5rem' }}
    >

      {/* ── SVG diagonal accent lines ───────────────────── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" preserveAspectRatio="none">
        <line className="art-diag-line" x1="12%" y1="0" x2="6%" y2="100%"
          stroke="#d4a017" strokeWidth="0.5" strokeOpacity="0.2" />
        <line className="art-diag-line" x1="88%" y1="0" x2="94%" y2="100%"
          stroke="#d4a017" strokeWidth="0.5" strokeOpacity="0.2" />
        <line className="art-diag-line" x1="50%" y1="0" x2="48%" y2="100%"
          stroke="#FF2D00" strokeWidth="0.3" strokeOpacity="0.08" />
      </svg>

      {/* ── Ghost background text ────────────────────────── */}
      <div className="ghost-text absolute inset-0 flex items-center justify-center
        pointer-events-none select-none z-[1] overflow-hidden">
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

      {/* ── Top horizontal rule ──────────────────────────── */}
      <div className="relative z-10 w-full flex items-center gap-4 px-8 md:px-16 pt-10 will-fade">
        <span className="font-bebas text-[10px] tracking-[0.5em] text-[#d4a017] uppercase opacity-70">
          F50 · Limited
        </span>
        <div className="flex-1 h-px"
          style={{ background: 'linear-gradient(to right, #d4a01740, transparent)' }} />
        <span className="font-bebas text-[10px] tracking-[0.5em] text-white/20 uppercase">
          2025
        </span>
      </div>

      {/* ── Main layout ──────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-between
        px-8 md:px-16 pb-10 pt-6 container mx-auto max-w-7xl">

        {/* ── HEADLINE BLOCK ─────────────────────────────── */}
        <div className="will-fade flex flex-col md:flex-row md:items-end justify-between gap-6">

          {/* Big title */}
          <div className="relative">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-[1px] bg-[#FF2D00]" />
              <span className="text-[#FF2D00] text-[9px] tracking-[0.5em] uppercase">
                Section 04
              </span>
            </div>

            <h2
              className="font-bebas leading-[0.85] uppercase"
              style={{ fontSize: 'clamp(4.5rem, 13vw, 11rem)' }}
            >
              {/* Line 1 — white solid */}
              <span className="block text-white">The</span>
              {/* Line 2 — gold outline */}
              <span
                className="block"
                style={{
                  WebkitTextStroke: '2px #d4a017',
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
              { value: '2025', label: 'Season' },
              { value: '04', label: 'Chapter' },
              { value: 'FG/AG', label: 'Surface' },
            ].map(({ value, label }) => (
              <div key={label} className="art-stat flex flex-col items-center md:items-end gap-1">
                <span className="font-bebas text-3xl md:text-4xl text-white tracking-wider">
                  {value}
                </span>
                <span className="text-[9px] tracking-[0.4em] uppercase text-white/25">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── IMAGE STAGE ────────────────────────────────── */}
        <div className="relative flex justify-center items-center my-6 md:my-0 flex-1">

          {/* Corner brackets */}
          {[
            'top-0 left-0 border-t border-l',
            'top-0 right-0 border-t border-r',
            'bottom-0 left-0 border-b border-l',
            'bottom-0 right-0 border-b border-r',
          ].map((pos, i) => (
            <div key={i} className={`will-fade absolute ${pos} w-6 h-6 border-[#d4a017]/30 z-20`} />
          ))}

          {/* Image container */}
          <div
            className="relative overflow-hidden"
            style={{
              width: 'min(58vw, 860px)',
              height: 'clamp(260px, 46vh, 480px)',
              borderRadius: '1.25rem',
            }}
          >
            {/* Dark overlay (removed on scroll) */}
            <div
              className="img-overlay absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, #080808 0%, transparent 60%, #080808 100%)',
              }}
            />

            <Image
              src={UnderImge}
              alt="F50 Boot Art"
              fill
              className="masked-img object-cover"
              style={{
                maskImage: 'radial-gradient(ellipse 55% 55% at center, black 0%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 55% 55% at center, black 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Floating side labels */}
          <span
            className="will-fade absolute left-0 top-1/2 -translate-y-1/2 font-bebas
              text-[9px] tracking-[0.4em] text-white/20 uppercase hidden md:block"
            style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
          >
            Adidas · Predator · Limited
          </span>
          <span
            className="will-fade absolute right-0 top-1/2 -translate-y-1/2 font-bebas
              text-[9px] tracking-[0.4em] text-[#d4a017]/40 uppercase hidden md:block"
            style={{ writingMode: 'vertical-rl' }}
          >
            Crafted for Champions
          </span>
        </div>

        {/* ── REVEAL CONTENT ─────────────────────────────── */}
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

          {/* Reveal heading */}
          <h3
            className="font-bebas uppercase tracking-[0.12em] text-white"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)', lineHeight: 1 }}
          >
            Made with{' '}
            <span style={{ WebkitTextStroke: '1px #d4a017', color: 'transparent' }}>
              Craft
            </span>
            , Poured with{' '}
            <span className="text-[#FF2D00]">Passion</span>
          </h3>

          {/* Body */}
          <p className="font-poppins text-sm text-white/40 max-w-sm leading-relaxed tracking-wide">
            This isn't just a boot. It's a carefully crafted moment — where precision
            engineering meets the art of the beautiful game.
          </p>

          {/* CTA */}
          <div className="mt-2 flex items-center gap-6">
            <button className="group flex items-center gap-2 border border-[#d4a017]/40
              hover:border-[#d4a017] px-6 py-2 rounded-full transition-all duration-300">
              <span className="font-bebas text-xs tracking-[0.4em] uppercase text-[#d4a017]/70
                group-hover:text-[#d4a017] transition-colors">
                Explore Collection
              </span>
              <span className="text-[#d4a017]/50 text-xs group-hover:translate-x-1
                group-hover:text-[#d4a017] transition-all">→</span>
            </button>

            <button className="group flex items-center gap-2">
              <span className="font-bebas text-xs tracking-[0.4em] uppercase text-white/25
                group-hover:text-white/50 transition-colors">
                Watch Film
              </span>
              <div className="w-5 h-5 rounded-full border border-white/20 flex items-center
                justify-center group-hover:border-white/40 transition-colors">
                <span className="text-white/30 text-[8px]">▶</span>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* ── Bottom gold rule ──────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full h-px z-10"
        style={{ background: 'linear-gradient(to right, transparent, #d4a01730, transparent)' }} />

    </section>
  );
};

export default Art;