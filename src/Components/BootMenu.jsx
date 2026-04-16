'use client';

import { AllBoots } from '../../constants/index';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const titleSplitRef = useRef(null);
  const descSplitRef = useRef(null);

  useGSAP(() => {
    // ✅ Revert previous instances via ref, not static method
    if (titleSplitRef.current) titleSplitRef.current.revert();
    if (descSplitRef.current) descSplitRef.current.revert();

    gsap.fromTo(
      '.boot-img',
      { opacity: 0, xPercent: -8, scale: 0.96 },
      { opacity: 1, xPercent: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
    );

    gsap.fromTo(
      '.boot-counter',
      { yPercent: 60, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.5, ease: 'expo.out' },
    );

    // ✅ Save instance to ref
    titleSplitRef.current = new SplitText('.boot-title', { type: 'chars' });
    gsap.fromTo(
      titleSplitRef.current.chars,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.025, delay: 0.1 },
    );

    // ✅ Save instance to ref
    descSplitRef.current = new SplitText('.boot-desc', { type: 'lines' });
    gsap.fromTo(
      descSplitRef.current.lines,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 },
    );

    gsap.fromTo(
      '.boot-tag',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.5, ease: 'back.out(2)' },
    );

    gsap.fromTo(
      '.accent-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power4.out', transformOrigin: 'left' },
    );
  }, [currentIndex]);
  const totalBoots = AllBoots.length;
  const goToSlide = index => setCurrentIndex((index + totalBoots) % totalBoots);
  const getBootAt = offset => AllBoots[(currentIndex + offset + totalBoots) % totalBoots];

  const currentBoot = getBootAt(0);
  const prevBoot = getBootAt(-1);
  const nextBoot = getBootAt(1);
  console.log(currentBoot);
  return (
    <section
      id="menu"
      className="relative w-full min-h-screen bg-black overflow-hidden py-16 px-5 md:px-12"
    >
      {/* ── Noise overlay ─────────────────────────────────── */}
      <div className="noisy absolute inset-0 opacity-20 pointer-events-none z-0" />

      {/* ── Background giant number ───────────────────────── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span
          className="boot-counter font-bebas text-[30vw] leading-none text-white/[0.03]"
          style={{ lineHeight: 1 }}
        >
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
      </div>

      {/* ── Top bar ───────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between mb-12 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3">
          <div className="accent-line w-8 h-[2px] bg-[#FF2D00] origin-left" />
          <span className="text-[#FF2D00] text-[10px] tracking-[0.4em] uppercase">
            Boot Collection
          </span>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center gap-2">
          {AllBoots.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? 'w-6 h-1.5 bg-[#FF2D00]'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to boot ${i + 1}`}
            />
          ))}
        </div>

        {/* Count */}
        <span className="text-white/30 text-xs tracking-widest font-light">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalBoots).padStart(2, '0')}
        </span>
      </div>

      {/* ── Named tabs ───────────────────────────────────── */}
      <nav
        className="relative z-10 max-w-7xl mx-auto mb-10 overflow-x-auto scrollbar-none
  [-webkit-overflow-scrolling:touch]"
      >
        {' '}
        {/* ✅ scroll on parent, iOS momentum */}
        <div className="flex Bootbutton gap-6 md:gap-10 min-w-max px-1 pb-1">
          {/* ✅ min-w-max stays on child so it overflows the parent */}
          {AllBoots.map((boot, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={boot.id}
                onClick={() => goToSlide(index)}
                className={`relative pb-2 text-xs md:text-sm tracking-[0.2em] uppercase
            transition-all duration-300 font-bebas whitespace-nowrap flex-shrink-0
            ${isActive ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
              >
                {boot.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF2D00]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[65vh]">
        {/* LEFT — prev/next + metadata */}
        <div className="lg:col-span-3 flex flex-col justify-between h-full gap-8">
          {/* Category badge */}
          <div>
            <span className="inline-block border border-[#FF2D00]/40 text-[#FF2D00] text-[9px] tracking-[0.4em] uppercase px-3 py-1 rounded-full mb-4">
              {currentBoot.category || 'Speed'}
            </span>

            {/* Big number */}
            <div className="overflow-hidden">
              <p className="boot-counter font-bebas text-7xl md:text-9xl text-white/10 leading-none">
                {String(currentIndex + 1).padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* Tags / tech */}
          <div className="flex flex-wrap gap-2">
            {(currentBoot.technology || ['Speed', 'Precision', 'Control']).map(tag => (
              <span
                key={tag}
                className="boot-tag text-[9px] tracking-[0.2em] uppercase px-3 py-1
                  bg-white/5 border border-white/10 rounded-full text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Prev boot */}
          <button
            onClick={() => goToSlide(currentIndex - 1)}
            className="group flex items-center gap-3 text-left"
          >
            <div
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center
              group-hover:border-[#FF2D00] group-hover:bg-[#FF2D00]/10 transition-all duration-300"
            >
              <span className="text-white text-xs">←</span>
            </div>
            <div>
              <p className="text-[9px] text-white/30 tracking-[0.3em] uppercase mb-0.5">Previous</p>
              <p className="text-white/60 text-sm font-bebas tracking-wider group-hover:text-white transition-colors">
                {prevBoot.name}
              </p>
            </div>
          </button>
        </div>

        {/* CENTER — boot image ─────────────────────────── */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          {/* Glow behind boot */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full bg-[#FF2D00]/5 blur-3xl" />
          </div>

          <img
            key={currentIndex}
            src={currentBoot.image}
            alt={currentBoot.name}
            className="boot-img relative z-10 h-[55vh] w-auto object-contain
              drop-shadow-[0_0_60px_rgba(255,45,0,0.15)]"
          />
        </div>

        {/* RIGHT — details ─────────────────────────────── */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full gap-8">
          {/* Title */}
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-3 font-light">
              {currentBoot.collection || 'Signature Collection'}
            </p>

            {/* Title */}
            <div className="overflow-hidden" key={`title-${currentIndex}`}>
              <h2 className="boot-title font-bebas text-4xl md:text-6xl text-white leading-none tracking-wide uppercase">
                {currentBoot.title}
              </h2>
            </div>
            {/* Red rule */}
            <div className="accent-line mt-4 mb-5 h-[1px] bg-[#FF2D00] origin-left" />
            {/* Description */}
            <div className="overflow-hidden" key={`desc-${currentIndex}`}>
              <p className="boot-desc text-white/50 text-sm leading-relaxed tracking-wide">
                {currentBoot.description}
              </p>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/20 text-[9px]  tracking-[0.3em] uppercase mb-1">Price</p>
              <p className="font-bebas text-3xl text-white tracking-wider">
                {currentBoot.price || '$280'}
              </p>
            </div>

            <button
              className="group flex items-center gap-2 bg-[#FF2D00] hover:bg-[#cc2400]
              transition-colors px-5 py-2.5 rounded-full"
            >
              <span className="text-white text-xs tracking-[0.3em] uppercase font-light">
                Explore
              </span>
              <span className="text-white text-xs group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>

          {/* Colorway */}
          <div>
            <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-2">Colorway</p>
            <p className="text-white/40 text-xs tracking-wider">
              {currentBoot.colorway || 'Core Black / White'}
            </p>
          </div>

          {/* Next boot */}
          <button
            onClick={() => goToSlide(currentIndex + 1)}
            className="group flex items-center gap-3 text-left self-end"
          >
            <div>
              <p className="text-[9px] text-white/30 tracking-[0.3em] uppercase mb-0.5 text-right">
                Next
              </p>
              <p className="text-white/60 text-sm font-bebas tracking-wider group-hover:text-white transition-colors">
                {nextBoot.name}
              </p>
            </div>
            <div
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center
              group-hover:border-[#FF2D00] group-hover:bg-[#FF2D00]/10 transition-all duration-300"
            >
              <span className="text-white text-xs">→</span>
            </div>
          </button>
        </div>
      </div>

      {/* ── Bottom red line ───────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF2D00]/20 z-10" />
    </section>
  );
};

export default Menu;
