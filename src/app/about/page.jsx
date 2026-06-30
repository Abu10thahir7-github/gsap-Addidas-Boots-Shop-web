'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import messi from '../../../public/assets/images/messi.webp';
import AnimatedButton from '@/Components/UI/AnimatedButton';

gsap.registerPlugin(ScrollTrigger, SplitText);

// ── DATA ─────────────────────────────────────────────────────────
const timeline = [
  {
    year: '1994',
    title: 'The Origin',
    tag: 'Predator Born',
    desc: 'Craig Johnston engineers the original Predator with rubber fins for unmatched control. The legend begins.',
    accent: '#FF2D00',
  },
  {
    year: '1998',
    title: 'World Cup Dominance',
    tag: 'Paris Glory',
    desc: 'Beckham. Zidane. The Predator defines a generation as France lifts the World Cup on home soil.',
    accent: '#d4a017',
  },
  {
    year: '2006',
    title: 'F50 Arrives',
    tag: 'Speed Era',
    desc: 'The F50 launches — featherlight, forward-slanted, built for a new generation of speed merchants.',
    accent: '#FF2D00',
  },
  {
    year: '2010',
    title: 'The Fastest Boot Ever',
    tag: 'F50 adiZero',
    desc: 'At 165g, the F50 adiZero becomes the lightest boot in professional football. A record that stood for years.',
    accent: '#d4a017',
  },
  {
    year: '2022',
    title: 'Predator Reborn',
    tag: 'Tech Overhaul',
    desc: 'Strikeskin zones replace rubber fins. Aerocage structures redefine fit. Old soul, new science.',
    accent: '#FF2D00',
  },
  {
    year: '2025',
    title: 'Pure Victory',
    tag: 'Next Chapter',
    desc: 'F50 Elite and Predator 25 launch together in the Pure Victory Pack. Messi. Bellingham. Yamal. The game evolves.',
    accent: '#d4a017',
  },
];

const dna = [
  {
    icon: '⚡',
    title: 'Speed',
    sub: 'F50 Lineage',
    desc: 'Every gram matters. Every millisecond counts. The F50 is obsessively engineered for pure acceleration — lighter, lower, faster.',
    color: '#FF2D00',
    num: '01',
  },
  {
    icon: '◎',
    title: 'Control',
    sub: 'Predator DNA',
    desc: 'The Predator was born for players who see the game differently. Touch. Vision. Precision. Control is an art form.',
    color: '#d4a017',
    num: '02',
  },
  {
    icon: '◈',
    title: 'Touch',
    sub: 'Copa Heritage',
    desc: 'Soft leather. Premium feel. The Copa Pure carries a 70-year legacy — for the technician who lives in the details.',
    color: '#FF2D00',
    num: '03',
  },
  {
    icon: '◇',
    title: 'Heritage',
    sub: 'Archive Soul',
    desc: 'We honour where we came from. Every revival, every retro drop — a love letter to the history of the beautiful game.',
    color: '#d4a017',
    num: '04',
  },
];

const players = [
  {
    name: 'Lionel Messi',
    role: 'GOAT · Inter Miami',
    boot: 'F50 Elite',
    flag: 'ar',
    accent: '#d4a017',
    wide: true,
  },
  {
    name: 'Jude Bellingham',
    role: 'Midfielder · Real Madrid',
    boot: 'Predator 25 Elite',
    flag: 'gb',
    accent: '#FF2D00',
    image: '/assets/images/bellimgum.webp',
    wide: false,
  },
  {
    name: 'Lamine Yamal',
    role: 'Winger · FC Barcelona',
    boot: 'F50 Heartbreaker',
    flag: 'es',
    accent: '#FF2D00',
    image: '/assets/images/yamal.webp',
    wide: false,
  },
  {
    name: 'Thomas Müller',
    role: 'Forward · Bayern',
    boot: 'Copa Pure 3',
    flag: 'de',
    accent: '#d4a017',
    image: '/assets/images/muller.webp',
    wide: false,
  },
  {
    name: 'Pedri',
    role: 'Midfielder · FC Barcelona',
    boot: 'Predator Blaze',
    flag: 'es',
    accent: '#d4a017',
    image: '/assets/images/pedri.webp',
    wide: false,
  },
];

const manifesto = ["We don't make boots.", 'We make weapons.', 'For the beautiful game.'];

const values = [
  { n: '1949', l: 'Founded' },
  { n: '75+', l: 'Years Of Football' },
  { n: '180+', l: 'Countries' },
  { n: '3', l: 'Iconic Silos' },
  { n: '8', l: 'World Cup Finals' },
  { n: '1B+', l: 'Boots Sold' },
];

// ── ANIMATED COUNTER ────────────────────────────────────────────
const Count = ({ val }) => {
  const [v, setV] = useState('0');
  const ref = useRef(null);
  useEffect(() => {
    const num = parseFloat(val.replace(/[^0-9.]/g, ''));
    const suffix = val.replace(/[0-9.]/g, '');
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        let s = 0;
        const step = num / 50;
        const t = setInterval(() => {
          s += step;
          if (s >= num) {
            setV(num % 1 === 0 ? Math.floor(num).toLocaleString() + suffix : num + suffix);
            clearInterval(t);
          } else setV(Math.floor(s) + suffix);
        }, 20);
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [val]);
  return <span ref={ref}>{v}</span>;
};

// ══════════════════════════════════════════════════════════════════
export default function AboutPage() {
  const pageRef = useRef(null);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [hoveredDna, setHoveredDna] = useState(null);

  useGSAP(
    () => {
      // ── Hero ────────────────────────────────────────────────────
      const heroSplit = new SplitText('.about-hero-h1', { type: 'chars' });

      gsap.from(heroSplit.chars, {
        yPercent: 130,
        opacity: 0,
        rotateX: -90,
        stagger: 0.025,
        duration: 1,
        ease: 'expo.out',
        delay: 0.1,
      });
      gsap.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.hero-sub', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.8 });
      gsap.from('.hero-cta-row', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 1,
      });
      gsap.from('.hero-scroll-line', {
        scaleY: 0,
        duration: 1.4,
        ease: 'power4.out',
        delay: 1.2,
        transformOrigin: 'top',
      });
      gsap.from('.hero-side-label', { opacity: 0, duration: 1, delay: 1.3 });
      gsap.from('.about-diag', {
        scaleY: 0,
        duration: 1.8,
        ease: 'power4.out',
        stagger: 0.1,
        transformOrigin: 'top',
      });

      // ── Origin quote ────────────────────────────────────────────
      const quoteSplit = new SplitText('.origin-quote', { type: 'words' });
      gsap.from(quoteSplit.words, {
        scrollTrigger: { trigger: '.origin-section', start: 'top 75%' },
        y: 40,
        opacity: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'power3.out',
      });
      gsap.from('.origin-meta', {
        scrollTrigger: { trigger: '.origin-section', start: 'top 70%' },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.3,
      });

      // ── Values counter row ──────────────────────────────────────
      gsap.from('.values-row', {
        scrollTrigger: { trigger: '.values-row', start: 'top 82%' },
        y: 50,
        opacity: 0,

        duration: 0.7,
        ease: 'back.out(1.5)',
      });
      //story section
      const scrollTimelineStory = gsap.timeline({
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top center',
        },
      });
      const storyH2Split = new SplitText('.story-h2', { type: 'chars' });

      scrollTimelineStory.from(storyH2Split.chars, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: 'expo.out',
      });
      scrollTimelineStory.from('.timeline-nav', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'power3.out',
      });
      scrollTimelineStory.from('.timeline-line', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'power3.out',
      });
      scrollTimelineStory.from('.timeline-item', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'power3.out',
      });
      scrollTimelineStory.from('.timeline-active-card', {
        y: 50,
        opacity: 0,

        duration: 0.5,
        ease: 'power3.out',
      });

      //dna section
      const scrollTimelineDna = gsap.timeline({
        scrollTrigger: {
          trigger: '.dna-section',
          start: 'top center',
        },
      });
      const DnaH2Split = new SplitText('.dna-section h2', { type: 'chars' });

      scrollTimelineDna.from(DnaH2Split.chars, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: 'expo.out',
      });
      scrollTimelineDna.from('.dna-card', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });
      //player section
      const scrollTimelinePlayers = gsap.timeline({
        scrollTrigger: {
          trigger: '.players-section',
          start: 'top center',
        },
      });
      const PlayersH2Split = new SplitText('.players-section h2', { type: 'chars' });

      scrollTimelinePlayers.from(PlayersH2Split.chars, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: 'expo.out',
      });
      scrollTimelinePlayers.from('.player-card', {
        scale: 0.93,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'back.out(1.3)',
      });

      //mission section
      const scrollTimelineMission = gsap.timeline({
        scrollTrigger: {
          trigger: '.mission-grid',
          start: 'top center',
        },
      });
      const MissionH2Split = new SplitText('.mission-grid h2', { type: 'chars' });

      scrollTimelineMission.from(
        '.mission-left',
        {
          xPercent: -210,
          opacity: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: 'expo.out',
        },
        '<',
      );
      scrollTimelineMission.from(
        '.mission-right',
        {
          xPercent: 110,
          opacity: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: 'expo.out',
        },
        '<',
      );
      scrollTimelineMission.from(MissionH2Split.chars, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: 'expo.out',
      });

      // ── Manifesto ────────────────────────────────────────────────
      const manifestoLines = document.querySelectorAll('.manifesto-line');
      manifestoLines.forEach((line, i) => {
        const split = new SplitText(line, { type: 'chars' });
        gsap.from(split.chars, {
          scrollTrigger: { trigger: line, start: 'top 88%' },
          yPercent: 110,
          opacity: 0,
          stagger: 0.02 + i * 0.005,
          duration: 0.8,
          ease: 'expo.out',
        });
      });

      // ── Brand pillars horizontal scroll hint ────────────────────
      gsap.from('.pillar-tag', {
        scrollTrigger: { trigger: '.pillars-strip', start: 'top 90%' },
        x: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: 'power3.out',
      });
    },
    { scope: pageRef },
  );

  return (
    <>
      <div
        ref={pageRef}
        style={{ background: 'var(--bg)', minHeight: '100vh', overflow: 'hidden' }}
      >
        {/* ══════════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════════ */}
        <section
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '6rem 1.5rem 5rem',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Noise */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.025,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px',
            }}
          />

          {/* Radial glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,45,0,0.09), transparent)',
            }}
          />

          {/* Diagonal SVG */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
            preserveAspectRatio="none"
          >
            {[
              ['9%', '0', '3%', '100%', '#FF2D00', '0.12'],
              ['91%', '0', '97%', '100%', '#d4a017', '0.09'],
              ['50%', '0', '47%', '100%', '#FF2D00', '0.04'],
            ].map(([x1, y1, x2, y2, stroke, op], i) => (
              <line
                key={i}
                className="about-diag"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={stroke}
                strokeWidth="0.7"
                strokeOpacity={op}
              />
            ))}
          </svg>

          {/* Side labels */}
          {[
            {
              side: 'left',
              text: 'Founded · Herzogenaurach · 1949',
              color: 'rgba(255,255,255,0.12)',
              rot: 'rotate(180deg)',
            },
            {
              side: 'right',
              bottum: 'bottom',
              text: 'F50 · Speed · Control · Touch',
              color: 'rgba(255,45,0,0.3)',
              rot: 'none',
            },
          ].map(({ side, text, color, rot }) => (
            <span
              key={side}
              className="hero-side-label  hidden md:block "
              style={{
                position: 'absolute',
                [side]: '1.5rem',

                writingMode: 'vertical-rl',
                transform: `translateY(-50%) ${rot}`,
                fontFamily: 'var(--bebas)',
                fontSize: 9,
                letterSpacing: '0.45em',
                color,
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              {text}
            </span>
          ))}

          {/* Ghost BG */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              userSelect: 'none',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--bebas)',
                fontSize: 'clamp(6rem,25vw,20rem)',
                lineHeight: 1,
                WebkitTextStroke: '1px rgba(255,45,0,0.05)',
                color: 'transparent',
              }}
            >
              OUR STORY
            </span>
          </div>

          {/* Content */}
          <div
            className="flex flex-col gap-[70px] md:gap-0"
            style={{ position: 'relative', zIndex: 2, maxWidth: 920 }}
          >
            <p
              className="hero-eyebrow"
              style={{
                fontFamily: 'var(--bebas)',
                fontSize: 10,
                letterSpacing: '0.55em',
                color: '#FF2D00',
                textTransform: 'uppercase',
                marginBottom: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <span
                style={{ width: 24, height: 1, background: '#FF2D00', display: 'inline-block' }}
              />
              Adidas F50 · Est. 1949
              <span
                style={{ width: 24, height: 1, background: '#FF2D00', display: 'inline-block' }}
              />
            </p>

            <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
              <h1
                className="about-hero-h1 font-bebas"
                style={{
                  fontSize: 'clamp(5rem,19vw,15rem)',
                  lineHeight: 0.85,
                  letterSpacing: '0.01em',
                }}
              >
                <span style={{ display: 'block', color: '#fff' }}>Born</span>
                <span
                  style={{
                    display: 'block',
                    WebkitTextStroke: '2px #FF2D00',
                    color: 'transparent',
                    letterSpacing: '0.06em',
                  }}
                >
                  To Win
                </span>
              </h1>
            </div>

            <p
              className="hero-sub"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1rem,2.5vw,1.5rem)',
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.7,
                maxWidth: 520,
                margin: '0 auto 2.5rem',
                letterSpacing: '0.02em',
              }}
            >
              Seventy-five years of obsessive engineering. Three boot families. One philosophy — the
              game deserves the best.
            </p>

            <div
              className="hero-cta-row"
              style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <a
                href="#story"
                style={{
                  background: '#FF2D00',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: 99,
                  padding: '12px 28px',
                  fontFamily: 'var(--bebas)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  boxShadow: '0 8px 30px rgba(255,45,0,0.25)',
                  transition: 'all 0.3s',
                }}
              >
                Our Story ↓
              </a>
              <a
                href="#dna"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  borderRadius: 99,
                  padding: '12px 24px',
                  fontFamily: 'var(--bebas)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s',
                }}
              >
                The DNA
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            2. VALUES ROW
        ══════════════════════════════════════════════ */}
        <div
          className="values-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6,1fr)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {values.map(({ n, l }, i) => (
            <div
              key={l}
              className="val-item"
              style={{
                padding: '2rem 1rem',
                textAlign: 'center',
                borderRight: i < values.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <p
                className="font-bebas"
                style={{
                  color: i % 2 === 0 ? '#FF2D00' : '#d4a017',
                  fontSize: 'clamp(1.6rem,3.5vw,3rem)',
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                <Count val={n} />
              </p>
              <p
                style={{
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                }}
              >
                {l}
              </p>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════
            3. ORIGIN / MISSION
        ══════════════════════════════════════════════ */}
        <section
          id="story"
          className="origin-section"
          style={{
            padding: '6rem 1.5rem',
            maxWidth: 1300,
            margin: '0 auto',
          }}
        >
          <div
            className="origin-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '5rem',
              alignItems: 'center',
            }}
          >
            {/* Left — big quote */}
            <div>
              <div
                className="origin-meta"
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem' }}
              >
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF2D00' }} />
                <span
                  className=""
                  style={{
                    fontFamily: 'var(--bebas)',
                    fontSize: 10,
                    letterSpacing: '0.5em',
                    color: '#FF2D00',
                    textTransform: 'uppercase',
                  }}
                >
                  Origin · 1949
                </span>
              </div>

              <blockquote
                className="origin-quote"
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.8rem,4vw,3.2rem)',
                  lineHeight: 1.2,
                  color: '#fff',
                  borderLeft: '2px solid #FF2D00',
                  paddingLeft: '1.5rem',
                  margin: '0 0 2rem',
                }}
              >
                "I want to make the best sports shoes in the world for athletes."
              </blockquote>

              <p
                className="origin-meta"
                style={{
                  fontFamily: 'var(--bebas)',
                  fontSize: 10,
                  letterSpacing: '0.4em',
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}
              >
                — Adi Dassler, Founder · 1949
              </p>

              <p
                className="origin-meta"
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.8,
                  letterSpacing: '0.04em',
                  maxWidth: 440,
                }}
              >
                From a cobbler's workshop in Herzogenaurach, Germany, Adi Dassler's obsession with
                athletic performance gave birth to one of the world's most iconic brands.
                Seventy-five years later, that obsession hasn't dimmed.
              </p>
            </div>

            {/* Right — stacked info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  year: '1954',
                  event:
                    "Germany wins the World Cup in Adidas boots. The brand's first global moment.",
                  color: '#FF2D00',
                },
                {
                  year: '1970',
                  event:
                    'The Telstar ball and Adidas boots appear in Mexico — the first fully televised World Cup.',
                  color: '#d4a017',
                },
                {
                  year: '1994',
                  event: 'The Predator launches. Football footwear is changed forever.',
                  color: '#FF2D00',
                },
                {
                  year: '2006',
                  event: 'F50 tunit debuts — modular, lightweight, radical. Speed has a new name.',
                  color: '#d4a017',
                },
              ].map(({ year, event, color }) => (
                <div
                  key={year}
                  className="origin-meta "
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    padding: '1rem 1.25rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '0.875rem',
                    alignItems: 'center',
                  }}
                >
                  <span
                    className="font-bebas"
                    style={{
                      fontFamily: 'var(--bebas)',
                      fontSize: '1.5rem',
                      color,
                      lineHeight: 1,
                      letterSpacing: '0.05em',
                      flexShrink: 0,
                      minWidth: 52,
                    }}
                  >
                    {year}
                  </span>
                  <div
                    style={{
                      width: 1,
                      background: `${color}30`,
                      alignSelf: 'stretch',
                      flexShrink: 0,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.7,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            4. MARQUEE STRIP
        ══════════════════════════════════════════════ */}
        <div
          className="pillars-strip"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
            padding: '1rem 0',
            background: 'rgba(255,45,0,0.03)',
          }}
        >
          <div
            style={{
              display: 'flex',
              animation: 'marqueeL 18s linear infinite',
              width: 'max-content',
              gap: '2rem',
            }}
          >
            {[...Array(3)].flatMap((_, outerIndex) =>
              [
                'Speed',
                'Control',
                'Touch',
                'Heritage',
                'F50',
                'Predator',
                'Copa Pure',
                '2025',
                'Champions League',
                'World Cup',
                'Messi',
                'Bellingham',
                'Yamal',
              ].map((w, i) => (
                <span
                  key={`${outerIndex}-${w}-${i}`} // ✅ unique now
                  className="pillar-tag"
                  style={{
                    fontFamily: 'var(--bebas)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    color:
                      i % 3 === 0 ? '#FF2D00' : i % 3 === 1 ? '#d4a017' : 'rgba(255,255,255,0.2)',
                    padding: '0 1.5rem',
                  }}
                >
                  {i % 4 === 0 ? '✦' : '·'} {w}
                </span>
              )),
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            5. TIMELINE
        ══════════════════════════════════════════════ */}
        <section
          id="story"
          className="timeline-section"
          style={{
            padding: '6rem 1.5rem',
            maxWidth: 1300,
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '3rem' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#d4a017' }} />
            <span
              style={{
                fontFamily: 'var(--bebas)',
                fontSize: 10,
                letterSpacing: '0.5em',
                color: '#d4a017',
                textTransform: 'uppercase',
              }}
            >
              Heritage · Timeline
            </span>
          </div>

          <div style={{ overflow: 'hidden', marginBottom: '3rem' }}>
            <h2
              className="font-bebas story-h2"
              style={{
                fontSize: 'clamp(3rem,8vw,7rem)',
                lineHeight: 0.88,
                letterSpacing: '0.02em',
              }}
            >
              <span style={{ display: 'block', color: '#fff' }}>75 Years</span>
              <span
                style={{
                  display: 'block',
                  WebkitTextStroke: '1.5px #d4a017',
                  color: 'transparent',
                  letterSpacing: '0.06em',
                }}
              >
                Of Excellence
              </span>
            </h2>
          </div>

          {/* Timeline nav pills */}
          <div
            className="timeline-nav"
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '3rem',
              overflowX: 'auto',
              paddingBottom: 4,
              scrollbarWidth: 'none',
            }}
          >
            {timeline.map((t, i) => (
              <button
                suppressHydrationWarning
                key={t.year}
                onClick={() => setActiveTimeline(i)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 99,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--bebas)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.25em',
                  background: activeTimeline === i ? timeline[i].accent : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeTimeline === i ? timeline[i].accent : 'rgba(255,255,255,0.08)'}`,
                  color: activeTimeline === i ? '#fff' : 'rgba(255,255,255,0.35)',
                  transition: 'all 0.25s',
                }}
              >
                {t.year}
              </button>
            ))}
          </div>

          {/* Horizontal timeline line */}
          <div style={{ position: 'relative', marginBottom: '3rem' }}>
            <div
              className="timeline-line"
              style={{
                height: 1,
                background: 'rgba(255,255,255,0.08)',
                width: '100%',
              }}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${timeline.length},1fr)`,
                gap: 0,
              }}
            >
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className="timeline-item tl-item-btn"
                  onClick={() => setActiveTimeline(i)}
                  style={{ opacity: activeTimeline === i ? 1 : 0.35, textAlign: 'center' }}
                >
                  <div
                    className="timeline-dot"
                    style={{
                      width: activeTimeline === i ? 14 : 8,
                      height: activeTimeline === i ? 14 : 8,
                      borderRadius: '50%',
                      background: activeTimeline === i ? t.accent : 'rgba(255,255,255,0.25)',
                      margin: '-22px auto 12px',
                      boxShadow: activeTimeline === i ? `0 0 12px ${t.accent}` : 'none',
                      transition: 'all 0.3s',
                      animation: activeTimeline === i ? 'pulseGlow 2s infinite' : 'none',
                    }}
                  />
                  <span
                    className="font-bebas"
                    style={{
                      fontFamily: 'var(--bebas)',
                      fontSize: '1.1rem',
                      color: activeTimeline === i ? t.accent : 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.1em',
                      transition: 'color 0.3s',
                    }}
                  >
                    {t.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active card */}
          <div
            className="timeline-active-card flex flex-col md:grid"
            style={{
              padding: '2.5rem',
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${timeline[activeTimeline].accent}30`,
              borderRadius: '1.5rem',
              animation: 'fadeUp 0.4s ease',
              key: activeTimeline,
              gridTemplateColumns: 'auto 1fr',
              gap: '2rem',
              alignItems: 'start',
            }}
          >
            <div>
              <span
                className="font-bebas"
                style={{
                  fontSize: 'clamp(4rem,8vw,7rem)',
                  lineHeight: 1,
                  color: timeline[activeTimeline].accent,
                  letterSpacing: '0.04em',
                }}
              >
                {timeline[activeTimeline].year}
              </span>
            </div>
            <div>
              <span
                className="font-bebas"
                style={{
                  display: 'inline-block',

                  fontSize: 9,
                  letterSpacing: '0.4em',
                  color: timeline[activeTimeline].accent,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                  padding: '3px 12px',
                  borderRadius: 99,
                  background: `${timeline[activeTimeline].accent}15`,
                  border: `1px solid ${timeline[activeTimeline].accent}30`,
                }}
              >
                {timeline[activeTimeline].tag}
              </span>
              <h3
                className="font-bebas"
                style={{
                  fontSize: 'clamp(1.5rem,3vw,2.5rem)',
                  color: '#fff',
                  letterSpacing: '0.06em',
                  margin: '0.5rem 0 1rem',
                }}
              >
                {timeline[activeTimeline].title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.8,
                  letterSpacing: '0.04em',
                  maxWidth: 560,
                }}
              >
                {timeline[activeTimeline].desc}
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            6. DNA CARDS
        ══════════════════════════════════════════════ */}
        <section
          id="dna"
          className="dna-section"
          style={{
            padding: '6rem 1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.01)',
          }}
        >
          <div style={{ maxWidth: 1300, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '3rem' }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF2D00' }} />
              <span
                style={{
                  fontFamily: 'var(--bebas)',
                  fontSize: 10,
                  letterSpacing: '0.5em',
                  color: '#FF2D00',
                  textTransform: 'uppercase',
                }}
              >
                Boot DNA · Four Pillars
              </span>
            </div>

            <div style={{ overflow: 'hidden', marginBottom: '3rem' }}>
              <h2
                className="font-bebas"
                style={{
                  fontSize: 'clamp(3rem,8vw,7rem)',
                  lineHeight: 0.88,
                }}
              >
                <span style={{ display: 'block', color: '#fff' }}>What We</span>
                <span
                  style={{
                    display: 'block',
                    WebkitTextStroke: '1.5px #FF2D00',
                    color: 'transparent',
                    letterSpacing: '0.06em',
                  }}
                >
                  Stand For
                </span>
              </h2>
            </div>

            <div
              className="dna-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4,1fr)',
                gap: '1rem',
              }}
            >
              {dna.map((d, i) => (
                <div
                  key={d.title}
                  className="dna-card"
                  onMouseEnter={() => setHoveredDna(i)}
                  onMouseLeave={() => setHoveredDna(null)}
                  style={{
                    padding: '2rem 1.5rem',
                    borderRadius: '1.25rem',
                    cursor: 'default',
                    background:
                      hoveredDna === i
                        ? `linear-gradient(135deg, ${d.color}10, rgba(255,255,255,0.02))`
                        : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${hoveredDna === i ? d.color + '40' : 'rgba(255,255,255,0.07)'}`,
                    boxShadow: hoveredDna === i ? `0 20px 50px ${d.color}10` : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Ghost number */}
                  <span
                    className="font-bebas"
                    style={{
                      position: 'absolute',
                      bottom: -10,
                      right: 10,

                      fontSize: '5rem',
                      color: `${d.color}07`,
                      lineHeight: 1,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    {d.num}
                  </span>

                  {/* Icon */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      marginBottom: '1.25rem',
                      background: `${d.color}12`,
                      border: `1px solid ${d.color}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      color: d.color,
                      transition: 'all 0.3s',
                      transform: hoveredDna === i ? 'scale(1.1) rotate(8deg)' : 'none',
                    }}
                  >
                    {d.icon}
                  </div>

                  <p
                    className="font-bebas"
                    style={{
                      fontSize: 12,
                      letterSpacing: '0.4em',
                      color: d.color,
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    {d.sub}
                  </p>
                  <h3
                    className="font-bebas"
                    style={{
                      fontSize: '1.8rem',
                      color: '#fff',
                      letterSpacing: '0.06em',
                      lineHeight: 1,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {d.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.75,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {d.desc}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    style={{
                      marginTop: '1.5rem',
                      height: 1,
                      background: `linear-gradient(to right, ${d.color}50, transparent)`,
                      transform: hoveredDna === i ? 'scaleX(1)' : 'scaleX(0.3)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            7. PLAYERS BENTO
        ══════════════════════════════════════════════ */}
        <section
          className="players-section"
          style={{
            padding: '6rem 1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            maxWidth: 1300,
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '3rem' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#d4a017' }} />
            <span
              style={{
                fontFamily: 'var(--bebas)',
                fontSize: 10,
                letterSpacing: '0.5em',
                color: '#d4a017',
                textTransform: 'uppercase',
              }}
            >
              The Athletes · Our Players
            </span>
          </div>

          <div style={{ overflow: 'hidden', marginBottom: '3rem' }}>
            <h2
              className="font-bebas"
              style={{
                fontFamily: 'var(--bebas)',
                fontSize: 'clamp(3rem,8vw,7rem)',
                lineHeight: 0.88,
              }}
            >
              <span style={{ display: 'block', color: '#fff' }}>World Class</span>
              <span
                style={{
                  display: 'block',
                  WebkitTextStroke: '1.5px #d4a017',
                  color: 'transparent',
                  letterSpacing: '0.06em',
                }}
              >
                Family
              </span>
            </h2>
          </div>

          {/* ─── PLAYERS BENTO ─────────────────────────────── */}
          <div
            className="players-bento"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            {/* ── WIDE CARD — Messi ──────────────────────────── */}
            <div
              className="player-card wide-card"
              style={{
                gridColumn: 'span 2',
                gridRow: 'span 2',
                padding: '2.5rem',
                borderRadius: '1.5rem',
                background: 'linear-gradient(135deg, rgba(212,160,23,0.10) 0%, rgba(0,0,0,0) 60%)',
                border: '1px solid rgba(212,160,23,0.22)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 320,
                transition: 'border-color 0.4s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,160,23,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(212,160,23,0.22)')}
            >
              {/* Ghost jersey number */}
              <span
                style={{
                  position: 'absolute',
                  bottom: -24,
                  left: '38%',
                  fontFamily: 'var(--bebas)',
                  fontSize: '14rem',
                  lineHeight: 1,
                  WebkitTextStroke: '1px rgba(212,160,23,0.07)',
                  color: 'transparent',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  zIndex: 1,
                }}
              >
                10
              </span>

              {/* ── Messi Image — right side cutout ── */}
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: '52%',
                  height: '105%',
                  zIndex: 2,

                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Image
                  priority
                  src={messi}
                  alt="Lionel Messi"
                  fill
                  unoptimized
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'bottom right',
                    filter: 'drop-shadow(-8px 0 30px rgba(212,160,23,0.25))',
                  }}
                />
              </div>

              {/* ── Text Content — left side ── */}
              <div style={{ position: 'relative', zIndex: 3, maxWidth: '55%' }}>
                {/* Flag + badge row */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}
                >
                  <Image
                    priority
                    src="https://flagcdn.com/ar.svg"
                    width={28}
                    height={20}
                    alt="Argentina"
                    unoptimized
                    style={{ borderRadius: 3, objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--bebas)',
                      fontSize: 9,
                      letterSpacing: '0.4em',
                      color: '#d4a017',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: 99,
                      background: 'rgba(212,160,23,0.12)',
                      border: '1px solid rgba(212,160,23,0.28)',
                    }}
                  >
                    Signature
                  </span>
                </div>

                <h3
                  className="font-bebas"
                  style={{
                    fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                    color: '#fff',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  Lionel
                  <br />
                  Messi
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--bebas)',
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem',
                  }}
                >
                  GOAT · Inter Miami CF
                </p>

                {/* Boot badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'rgba(212,160,23,0.10)',
                    border: '1px solid rgba(212,160,23,0.25)',
                    borderRadius: 99,
                    padding: '5px 14px',
                  }}
                >
                  <span
                    style={{ width: 5, height: 5, borderRadius: '50%', background: '#d4a017' }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--bebas)',
                      fontSize: 9,
                      letterSpacing: '0.3em',
                      color: '#d4a017',
                      textTransform: 'uppercase',
                    }}
                  >
                    F50 Elite · Messi Edition
                  </span>
                </div>

                {/* Thin gold line accent */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: -40,
                    left: 0,
                    width: 48,
                    height: 2,
                    background: 'linear-gradient(to right, #d4a017, transparent)',
                    borderRadius: 99,
                  }}
                />
              </div>
            </div>

            {/* ── SMALL CARDS ─────────────────────────────────── */}
            {players.slice(1).map((p, i) => (
              <div
                key={p.name}
                className="player-card"
                style={{
                  padding: '1.4rem',
                  borderRadius: '1.25rem',
                  background:
                    i % 2 === 0
                      ? 'linear-gradient(135deg, rgba(255,45,0,0.07), rgba(0,0,0,0))'
                      : 'linear-gradient(135deg, rgba(212,160,23,0.07), rgba(0,0,0,0))',
                  border: `1px solid ${p.accent}22`,
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 200,
                  transition: 'border-color 0.35s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${p.accent}55`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = `${p.accent}22`)}
              >
                {/* Ghost jersey number */}
                <span
                  className="font-bebas"
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    left: '30%',
                    fontSize: '5.5rem',
                    lineHeight: 1,
                    WebkitTextStroke: `1px ${p.accent}09`,
                    color: 'transparent',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 1,
                  }}
                >
                  {String(i + 2).padStart(2, '0')}
                </span>

                {/* ── Player Image — bottom-right cutout ── */}
                {p.image && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      width: '55%',
                      height: '90%',
                      zIndex: 2,

                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Image
                      priority
                      src={p.image}
                      alt={p.name}
                      fill
                      unoptimized
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'bottom right',
                        filter: `drop-shadow(-6px 0 20px ${p.accent}30)`,
                      }}
                    />
                  </div>
                )}

                {/* ── Text Content — left ── */}
                <div style={{ position: 'relative', zIndex: 3, maxWidth: '60%' }}>
                  {/* Flag + badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      marginBottom: '0.75rem',
                    }}
                  >
                    <Image
                      priority
                      src={`https://flagcdn.com/${p.flag}.svg`}
                      width={22}
                      height={16}
                      alt={p.name}
                      unoptimized
                      style={{ borderRadius: 2, objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--bebas)',
                        fontSize: 8,
                        letterSpacing: '0.3em',
                        color: p.accent,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: 99,
                        background: `${p.accent}12`,
                        border: `1px solid ${p.accent}28`,
                      }}
                    >
                      Adidas Athlete
                    </span>
                  </div>

                  <h4
                    className="font-bebas"
                    style={{
                      fontSize: '1.3rem',
                      color: '#fff',
                      letterSpacing: '0.06em',
                      lineHeight: 1.1,
                      marginBottom: 4,
                    }}
                  >
                    {p.name}
                  </h4>

                  <p
                    style={{
                      fontFamily: 'var(--bebas)',
                      fontSize: 9,
                      letterSpacing: '0.25em',
                      color: 'rgba(255,255,255,0.28)',
                      textTransform: 'uppercase',
                      marginBottom: '0.85rem',
                    }}
                  >
                    {p.role}
                  </p>

                  {/* Boot label */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '3px 10px',
                      borderRadius: 99,
                      background: `${p.accent}10`,
                      border: `1px solid ${p.accent}20`,
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: p.accent,
                        opacity: 0.8,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--bebas)',
                        fontSize: 8,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: p.accent,
                        opacity: 0.85,
                      }}
                    >
                      {p.boot}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            8. MISSION STRIP
        ══════════════════════════════════════════════ */}
        <section
          className="mission-grid"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          {/* Left */}
          <div
            className="mission-left"
            style={{
              padding: '5rem 3rem 5rem',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,45,0,0.02)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--bebas)',
                fontSize: 9,
                letterSpacing: '0.5em',
                color: '#FF2D00',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{ width: 16, height: 1, background: '#FF2D00', display: 'inline-block' }}
              />
              Our Mission
            </p>
            <h2
              className="font-bebas"
              style={{
                fontSize: 'clamp(2rem,4vw,3.5rem)',
                color: '#fff',
                lineHeight: 1,
                letterSpacing: '0.04em',
                marginBottom: '1.5rem',
              }}
            >
              The Game
              <br />
              <span style={{ WebkitTextStroke: '1.5px #FF2D00', color: 'transparent' }}>
                Deserves More
              </span>
            </h2>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.8,
                letterSpacing: '0.04em',
                marginBottom: '2rem',
              }}
            >
              We believe football boots are instruments, not accessories. Every gram, every texture,
              every last measures the difference between a good touch and a great one. That's what
              drives us.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {[
                { n: '165g', l: 'Lightest Boot' },
                { n: '30+', l: 'Years R&D' },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p
                    className="font-bebas"
                    style={{
                      fontSize: '2rem',
                      color: '#FF2D00',
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {n}
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.25)',
                    }}
                  >
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div
            className="mission-right"
            style={{
              padding: '5rem 3rem 5rem',
              background: 'rgba(212,160,23,0.02)',
            }}
          >
            <p
              style={{
                fontSize: 9,
                letterSpacing: '0.5em',
                color: '#d4a017',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{ width: 16, height: 1, background: '#d4a017', display: 'inline-block' }}
              />
              Our Values
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                {
                  title: 'Athlete First',
                  body: 'Every decision starts and ends with the athlete. What do they need? What slows them down? What can we remove, refine, reimagine?',
                  num: '01',
                },
                {
                  title: 'Obsessive Craft',
                  body: 'We iterate until perfect. Not until good enough. Our R&D labs run 365 days a year because the game never stops.',
                  num: '02',
                },
                {
                  title: 'Legacy Matters',
                  body: 'We honour where we came from — the Predator, the Copa, the F50. History is our foundation, not our limitation.',
                  num: '03',
                },
              ].map(({ title, body, num }) => (
                <div
                  key={title}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span
                    className="font-bebas"
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.15)',
                      letterSpacing: '0.1em',
                      flexShrink: 0,
                      paddingTop: 2,
                    }}
                  >
                    {num}
                  </span>
                  <div>
                    <h4
                      className="font-bebas"
                      style={{
                        fontSize: '1.1rem',
                        color: '#fff',
                        letterSpacing: '0.08em',
                        marginBottom: 5,
                      }}
                    >
                      {title}
                    </h4>
                    <p
                      style={{
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.35)',
                        lineHeight: 1.75,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            9. MANIFESTO
        ══════════════════════════════════════════════ */}
        <section
          style={{
            padding: '8rem 1.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            backgroundImage: 'url("/assets/images/stadium.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,

              pointerEvents: 'none',
              background:
                'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255,45,0,0.07), #00000087)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--bebas)',
                fontSize: 9,
                letterSpacing: '0.55em',
                color: 'rgba(255,255,255,0.2)',
                textTransform: 'uppercase',
                marginBottom: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: 'rgba(255,255,255,0.15)',
                  display: 'inline-block',
                }}
              />
              The Manifesto
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: 'rgba(255,255,255,0.15)',
                  display: 'inline-block',
                }}
              />
            </p>

            {manifesto.map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <p
                  className="manifesto-line manifesto-size font-bebas"
                  style={{
                    fontFamily: i % 2 === 0 ? 'font-bebas' : 'var(--serif)',
                    fontStyle: i % 2 !== 0 ? 'normal' : 'italic',
                    fontSize: 'clamp(2rem,7vw,9rem)',
                    lineHeight: 0.95,
                    letterSpacing: i % 2 === 0 ? '0.02em' : '-0.01em',
                    color: i === 1 ? 'transparent' : '#fff',
                    WebkitTextStroke: i === 1 ? '2px #FF2D00' : 'none',
                    marginBottom: '0.25rem',
                  }}
                >
                  {line}
                </p>
              </div>
            ))}

            <div
              style={{
                marginTop: '3rem',
                height: 1,
                maxWidth: 200,
                margin: '3rem auto 0',
                background: 'linear-gradient(to right, transparent, #FF2D00, transparent)',
              }}
            />

            <p
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.08em',
                marginTop: '2rem',
                marginBottom: '2.5rem',
              }}
            >
              — The Adidas F50 Creed
            </p>

            <AnimatedButton text="Shop The Collection → " href="/shopping" />
          </div>
        </section>

        {/* Bottom bar */}
        <div
          style={{
            height: 2,
            background:
              'linear-gradient(to right, transparent, #FF2D00, #d4a017, #FF2D00, transparent)',
          }}
        />
      </div>
    </>
  );
}
