'use client';
import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import image1 from '../../public/assets/images/Adidas F50 ads.jpg';
import image2 from '../../public/assets/images/adidas Predator Poster.jpg';
import image3 from '../../public/assets/images/adidas Roteiro.jpg';
import image4 from '../../public/assets/images/adidas Sparkfusion.jpg';
import image5 from '../../public/assets/images/Football Professional.jpg';
import { useGSAP } from '@gsap/react';
import gsap, { ScrollTrigger, SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─── Constants ─────────────────────────────────────────────────────────── */
const RED = '#FF2D00';

const CARDS = [
  {
    id: 1,
    label: '01 · Design',
    title: 'Engineered\nSpeed',
    category: 'Design Philosophy',
    src: image1,
    type: 'image',
    description:
      'The F50 was born in the lab, engineered to shave milliseconds off every stride. Every curve, every ventilation channel, every stitch placement was obsessed over by Adidas performance engineers. The result: a boot that feels like an extension of the foot itself.',
    stats: [
      { value: '105g', label: 'Boot Weight' },
      { value: '2004', label: 'Year Born' },
      { value: '0.3s', label: 'Faster Per Stride' },
    ],
    tags: ['Lightweight', 'Adifit', 'Sprint Frame'],
  },
  {
    id: 2,
    label: '02 · Film',
    title: 'Born To\nDominate',
    category: 'Predator Legacy',
    src: '/assets/video/PredetorVideo.mp4',
    type: 'video',
    description:
      "The Predator line was a revolution. Rubber elements engineered for maximum ball control, swerve, and power. Worn by Zidane, Beckham, and Gerrard, it became the boot of the world's most creative players — a tool for those who bend the game to their will.",
    stats: [
      { value: '3×', label: 'World Cup Wins' },
      { value: '1994', label: 'First Predator' },
      { value: '∞', label: 'Iconic Goals' },
    ],
    tags: ['Predator', 'Control', 'Power Strike'],
  },
  {
    id: 3,
    label: '03 · Fit',
    title: 'Precision\nFit',
    category: 'Biomechanics',
    src: image2,
    type: 'image',
    description:
      'Adidas developed the Adifit interior lining — a sock-like second skin that wraps the foot with zero dead zones. The upper material was engineered to stretch exactly where the foot expands under sprint load, eliminating pressure points at peak velocity.',
    stats: [
      { value: '360°', label: 'Foot Wrap' },
      { value: '12', label: 'Fit Points' },
      { value: '0mm', label: 'Dead Space' },
    ],
    tags: ['Adifit', 'Sock Liner', 'Anatomical'],
  },
  {
    id: 4,
    label: '04 · Film',
    title: 'F50 In\nAction',
    category: 'On The Pitch',
    src: '/assets/video/F50 Video.mp4',
    type: 'video',
    description:
      "Watch the F50 perform under real match conditions. From explosive first steps off the line to pinpoint crosses delivered at full sprint — this is the boot that rewrote what's possible at the highest level of the beautiful game.",
    stats: [
      { value: '128', label: 'Goals Scored' },
      { value: '34km/h', label: 'Top Sprint Speed' },
      { value: '#1', label: 'Speed Boot 2010' },
    ],
    tags: ['Match Tested', 'Sprint Tested', 'World Cup'],
  },
  {
    id: 5,
    label: '05 · Game',
    title: 'Game\nReady',
    category: 'Performance Tech',
    src: image3,
    type: 'image',
    description:
      'The Roteiro — crafted for the 2004 Euros — was the first football approved for a major tournament that featured a thermal bonding system instead of traditional stitching. The F50 was right there alongside it, pushing what performance footwear could mean.',
    stats: [
      { value: 'UEFA', label: 'Euro 2004' },
      { value: 'TF', label: 'Bonded Upper' },
      { value: '9', label: 'Stud Configurations' },
    ],
    tags: ['Tournament', 'Turf Ready', 'Thermal Bond'],
  },
  {
    id: 6,
    label: '06 · Style',
    title: 'Street To\nPitch',
    category: 'Culture & Style',
    src: image4,
    type: 'image',
    description:
      'The Sparkfusion crossed the boundary between pitch and street, signalling a new era where football boots became cultural objects. Worn off the field, it sparked a generation of collectors who saw cleats as wearable art — not just tools of the game.',
    stats: [
      { value: '2006', label: 'Sparkfusion Launch' },
      { value: '3', label: 'Limited Colourways' },
      { value: 'Icon', label: 'Collector Status' },
    ],
    tags: ['Lifestyle', 'Limited Edition', 'Collector'],
  },
  {
    id: 7,
    label: '07 · Vision',
    title: 'Beyond\nLimits',
    category: 'The Future',
    src: image5,
    type: 'image',
    description:
      "The professional athlete of tomorrow needs more than a great boot — they need a system. Adidas's vision for F50 was always total integration: boot, insole, data tracking, and material science working as one unified platform. The limit is only what we haven't imagined yet.",
    stats: [
      { value: '2050', label: 'Vision Year' },
      { value: 'AI', label: 'Fit Mapping' },
      { value: '∞', label: 'Possibility' },
    ],
    tags: ['Innovation', 'Future Tech', 'Next Gen'],
  },
];

const TICKER_ITEMS = [
  'Engineered Speed',
  'Predator Legacy',
  'Precision Fit',
  'F50 In Action',
  'Game Ready',
  'Street To Pitch',
  'Beyond Limits',
];

/* ─── Section Heading ────────────────────────────────────────────────────── */
/*
  memo() prevents re-renders when About's state (activeCard, modalKey, mounted)
  changes — keeping SplitText DOM nodes safe from React reconciliation.
*/
const SectionHeading = memo(({ sectionRef }) => {
  const h2Ref = useRef(null);

  useGSAP(() => {
    if (!h2Ref.current || !sectionRef?.current) return;

    const split = SplitText.create(h2Ref.current, { type: 'words' });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top center' },
    });

    tl.from(split.words, {
      opacity: 0,
      xPercent: 100,
      duration: 0.5,
      ease: 'expo.out',
      stagger: 0.06,
    })
      .from('.subtitle-about', {
        opacity: 0,
        yPercent: 100,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.05,
      })
      .from('.tilt-card', {
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
        stagger: 0.05,
      });

    return () => split.revert();
  }, []);

  return (
    <div className="mb-4 overflow-hidden">
      {/* ── Top label row ── */}
      <div className="subtitle-about flex items-center gap-3 mb-6">
        <div className="h-px w-8 shrink-0" style={{ background: RED }} />
        <span
          className="text-[9px] tracking-[0.55em] uppercase"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          About The Collection
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <span
          className="text-[9px] tracking-[0.4em] uppercase hidden sm:inline"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >
          07 Stories
        </span>
      </div>

      {/* ── Main title + right badge ── */}
      <div className="flex items-end justify-between gap-4">
        <h2
          ref={h2Ref}
          className="font-bebas leading-none tracking-widest text-white uppercase"
          style={{ fontSize: 'clamp(3.5rem,9vw,7.5rem)' }}
        >
          The <span style={{ color: RED }}>Legacy</span>
        </h2>

        {/* Ghost F50 number */}
        <span
          className="font-bebas hidden md:block leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(5rem,10vw,9rem)',
            color: 'rgba(255,255,255,0.03)',
            paddingBottom: '0.1em',
          }}
        >
          F50
        </span>
      </div>

      {/* ── Stats strip ── */}
      <div
        className="subtitle-about flex items-center flex-wrap gap-x-6 gap-y-2 mt-4 pt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {[
          { label: 'Since', value: '2004' },
          { label: 'Chapter', value: '07' },
          { label: 'Brand', value: 'Adidas' },
        ].map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && (
              <span
                className="hidden sm:inline w-1 h-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              />
            )}
            <span
              className="text-[9px] tracking-[0.4em] uppercase"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              {s.label}{' '}
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{s.value}</span>
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});
SectionHeading.displayName = 'SectionHeading';

/* ─── Ticker ─────────────────────────────────────────────────────────────── */
const Ticker = () => {
  const trackRef = useRef(null);

  useGSAP(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 22,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="overflow-hidden my-5"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div
        ref={trackRef}
        className="flex items-center py-3"
        style={{ width: 'max-content', gap: '2.5rem' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center shrink-0"
            style={{ gap: '2.5rem' }}
          >
            <span
              className="font-bebas text-sm tracking-[0.35em] uppercase"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            >
              {item}
            </span>
            <span style={{ color: RED, fontSize: '0.65rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── Modal ──────────────────────────────────────────────────────────────── */
const CardModal = ({ card, onClose }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
        .fromTo(
          panelRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.55, ease: 'expo.out' },
          '-=0.15',
        )
        .fromTo(
          mediaRef.current,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.3',
        )
        .fromTo(
          contentRef.current?.querySelectorAll('.modal-anim'),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', stagger: 0.07 },
          '-=0.4',
        );
    },
    { dependencies: [card] },
  );

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, {
      clipPath: 'inset(0% 0% 100% 0%)',
      opacity: 0,
      duration: 0.4,
      ease: 'expo.in',
    }).to(overlayRef.current, { opacity: 0, duration: 0.25 }, '-=0.15');
  }, [onClose]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
    >
      <div
        ref={panelRef}
        onClick={e => e.stopPropagation()}
        className="relative w-full md:w-[90vw] max-w-5xl h-[92vh] md:h-[82vh] rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row"
        style={{ background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Media */}
        <div
          ref={mediaRef}
          className="relative w-full md:w-[46%] h-56 md:h-full flex-shrink-0 overflow-hidden"
        >
          <div className="noisy absolute inset-0 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />
          <div
            className="absolute right-0 top-0 bottom-0 w-px z-30"
            style={{ background: `linear-gradient(to bottom, transparent, ${RED} 40%, ${RED} 60%, transparent)` }}
          />
          {card.type === 'video' ? (
            <video autoPlay muted loop playsInline src={card.src} className="w-full h-full object-cover" />
          ) : (
            <Image src={card.src} alt={card.title} fill className="object-cover" />
          )}
          <div className="absolute top-5 left-5 z-30">
            <span
              className="text-[10px] tracking-[0.35em] uppercase px-3 py-1.5 rounded-full font-medium"
              style={{ background: 'rgba(255,45,0,0.15)', border: `1px solid rgba(255,45,0,0.4)`, color: RED }}
            >
              {card.label}
            </span>
          </div>
          <div className="absolute bottom-4 right-6 z-30 hidden md:block">
            <span className="font-bebas text-[90px] leading-none select-none" style={{ color: 'rgba(255,255,255,0.04)' }}>
              {String(card.id).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px self-stretch" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Content */}
        <div ref={contentRef} className="flex flex-col flex-1 overflow-y-auto p-7 md:p-10 gap-6">
          <div className="modal-anim flex items-center gap-3">
            <div className="h-px w-8" style={{ background: RED }} />
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: RED }}>{card.category}</span>
          </div>
          <h2 className="modal-anim font-bebas leading-none tracking-wider text-white whitespace-pre-line" style={{ fontSize: 'clamp(2.8rem,6vw,5rem)' }}>
            {card.title}
          </h2>
          <p className="modal-anim text-sm leading-relaxed tracking-wide max-w-md" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {card.description}
          </p>
          <div className="modal-anim h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="modal-anim grid grid-cols-3 gap-4">
            {card.stats.map(s => (
              <div key={s.label} className="flex flex-col gap-1.5 group/stat">
                <span className="font-bebas text-3xl md:text-4xl text-white tracking-wider leading-none group-hover/stat:text-[#FF2D00] transition-colors duration-300">
                  {s.value}
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="modal-anim h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="modal-anim flex flex-wrap gap-2">
            {card.tags.map(tag => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-full transition-colors duration-300 cursor-default hover:text-white/70"
                style={{ border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.4)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex-1" />
          <div className="modal-anim flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>
              Adidas F50 · Legacy
            </span>
            <button
              onClick={handleClose}
              className="flex items-center gap-2.5 text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 group/close hover:text-white"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Close
              <span
                className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center group-hover/close:border-white/50 group-hover/close:bg-white/5 transition-all duration-300"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── 3D Tilt Card ───── DO NOT MODIFY ──────────────────────────────────── */
const TiltCard = ({ children, className, onClick }) => {
  const cardRef = useRef(null);

  useGSAP(
    () => {
      const el = cardRef.current;
      if (!el) return;
      gsap.set(el, { transformPerspective: 800, transformOrigin: 'center center' });

      const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power3.out' });
      const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power3.out' });
      const glow = el.querySelector('.card-glare');

      const onMove = e => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        rotX(-y * 12);
        rotY(x * 14);
        if (glow)
          gsap.to(glow, {
            duration: 0.3,
            background: `radial-gradient(circle at ${(x + 1) * 50}% ${(y + 1) * 50}%, rgba(255,255,255,0.13) 0%, transparent 70%)`,
            opacity: 1,
          });
      };
      const onLeave = () => {
        rotX(0);
        rotY(0);
        if (glow) gsap.to(glow, { duration: 0.5, opacity: 0 });
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      className={`${className} cursor-pointer`}
      style={{ willChange: 'transform' }}
      onClick={onClick}
    >
      <div
        className="card-glare pointer-events-none absolute inset-0 z-40 rounded-2xl opacity-0"
        style={{ mixBlendMode: 'overlay' }}
      />
      {children}
    </div>
  );
};

/* ─── Expand Icon ───────────────────────────────────────────────────────── */
const ExpandIcon = () => (
  <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
    <div
      className="w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10"
      style={{ borderColor: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.04)' }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
);

/* ─── Card Label ─────────────────────────────────────────────────────────── */
const CardLabel = ({ label }) => (
  <div className="absolute top-4 left-4 z-30">
    <span
      className="text-[9px] tracking-[0.4em] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
      style={{
        color: 'rgba(255,255,255,0.4)',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.09)',
      }}
    >
      {label}
    </span>
  </div>
);

/* ─── Card Footer ────────────────────────────────────────────────────────── */
const CardFooter = ({ id, label, title }) => (
  <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
    {/* Ghost number watermark */}
    <span
      className="absolute bottom-3 right-4 font-bebas leading-none select-none pointer-events-none"
      style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.05)' }}
    >
      {String(id).padStart(2, '0')}
    </span>
    <span
      className="block text-[9px] tracking-[0.45em] uppercase mb-1.5"
      style={{ color: RED }}
    >
      {label}
    </span>
    <h3 className="font-bebas text-3xl text-white leading-none tracking-wider">
      {title.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </h3>
  </div>
);

/* ─── Noise + gradient overlays ─────────────────────────────────────────── */
const Noise = () => <div className="noisy z-10" />;
const GradientOverlay = ({ className = '' }) => (
  <div className={`absolute inset-0 z-20 ${className}`} />
);

/* ─── About ─────────────────────────────────────────────────────────────── */
const About = () => {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [modalKey, setModalKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  const openModal = useCallback(card => {
    setActiveCard(card);
    setModalKey(k => k + 1);
  }, []);
  const closeModal = useCallback(() => setActiveCard(null), []);

  useEffect(() => setMounted(true), []);

  /* Shared card class — rounded-2xl matches the card-glare in TiltCard */
  const base = 'tilt-card rounded-2xl overflow-hidden relative group';

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className="mx-auto max-w-6xl px-5 md:px-0 py-20"
      >
        {/* Section heading — memo protected */}
        <SectionHeading sectionRef={sectionRef} />

        {/* Scrolling ticker */}
        <Ticker />

        {/* ── Row 1: 3 | 6 | 3 columns ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 mb-3">

          {/* Card 1 — Design */}
          <TiltCard className={`xl:col-span-3 h-[340px] ${base}`} onClick={() => openModal(CARDS[0])}>
            <Noise />
            <GradientOverlay className="bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <Image
              width={500} height={500}
              src={image1} alt="Engineered Speed"
              className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            <CardLabel label="Design" />
            <ExpandIcon />
            <CardFooter id={1} label={CARDS[0].label} title={CARDS[0].title} />
          </TiltCard>

          {/* Card 2 — Video (Featured, wider) */}
          <TiltCard className={`xl:col-span-6 h-[340px] ${base}`} onClick={() => openModal(CARDS[1])}>
            <Noise />
            <GradientOverlay className="bg-gradient-to-t from-black/80 via-transparent to-black/25" />
            <video
              autoPlay muted loop playsInline preload="auto"
              src="/assets/video/PredetorVideo.mp4"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            {/* Video playing badge — appears on hover */}
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
              <span
                className="text-[9px] tracking-[0.5em] uppercase px-4 py-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                ▶ Playing
              </span>
            </div>
            <CardLabel label="Film" />
            <ExpandIcon />
            <CardFooter id={2} label={CARDS[1].label} title={CARDS[1].title} />
          </TiltCard>

          {/* Card 3 — Fit */}
          <TiltCard className={`xl:col-span-3 h-[340px] ${base}`} onClick={() => openModal(CARDS[2])}>
            <Noise />
            <GradientOverlay className="bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <Image
              width={500} height={500}
              src={image2} alt="Precision Fit"
              className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            <CardLabel label="Fit" />
            <ExpandIcon />
            <CardFooter id={3} label={CARDS[2].label} title={CARDS[2].title} />
          </TiltCard>
        </div>

        {/* ── Row 2: 3 | 3 | 3 | 3 columns ────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-12 gap-3">

          {/* Card 4 — Video */}
          <TiltCard className={`xl:col-span-3 h-[290px] ${base}`} onClick={() => openModal(CARDS[3])}>
            <Noise />
            <GradientOverlay className="bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <video
              autoPlay muted loop playsInline preload="auto"
              src="/assets/video/F50 Video.mp4"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            <CardLabel label="Film" />
            <ExpandIcon />
            <CardFooter id={4} label={CARDS[3].label} title={CARDS[3].title} />
          </TiltCard>

          {/* Card 5 — Game */}
          <TiltCard className={`xl:col-span-3 h-[290px] ${base}`} onClick={() => openModal(CARDS[4])}>
            <Noise />
            <GradientOverlay className="bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <Image
              width={500} height={500}
              src={image3} alt="Game Ready"
              className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            <CardLabel label="Game" />
            <ExpandIcon />
            <CardFooter id={5} label={CARDS[4].label} title={CARDS[4].title} />
          </TiltCard>

          {/* Card 6 — Style */}
          <TiltCard className={`xl:col-span-3 h-[290px] ${base}`} onClick={() => openModal(CARDS[5])}>
            <Noise />
            <GradientOverlay className="bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <Image
              width={500} height={500}
              src={image4} alt="Street To Pitch"
              className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            <CardLabel label="Style" />
            <ExpandIcon />
            <CardFooter id={6} label={CARDS[5].label} title={CARDS[5].title} />
          </TiltCard>

          {/* Card 7 — Vision */}
          <TiltCard className={`xl:col-span-3 h-[290px] ${base}`} onClick={() => openModal(CARDS[6])}>
            <Noise />
            <GradientOverlay className="bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <Image
              width={500} height={500}
              src={image5} alt="Beyond Limits"
              className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            {/* Special "FUTURE" badge for last card */}
            <div className="absolute top-4 left-4 z-30">
              <span
                className="text-[9px] tracking-[0.4em] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
                style={{
                  color: RED,
                  background: 'rgba(255,45,0,0.1)',
                  border: `1px solid rgba(255,45,0,0.25)`,
                }}
              >
                Vision
              </span>
            </div>
            <ExpandIcon />
            <CardFooter id={7} label={CARDS[6].label} title={CARDS[6].title} />
          </TiltCard>
        </div>
      </section>

      {/* Modal — client-side only, after mount */}
      {mounted && activeCard && (
        <CardModal key={modalKey} card={activeCard} onClose={closeModal} />
      )}
    </>
  );
};

export default About;