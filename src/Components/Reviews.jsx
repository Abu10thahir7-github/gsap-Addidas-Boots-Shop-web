'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { reviews } from '../../constants';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Split into two rows
const row1 = reviews.slice(0, 4);
const row2 = reviews.slice(4, 8);

const StarRating = ({ rating, color }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="none">
        <polygon
          points="5,1 6.2,3.8 9.5,3.8 6.9,5.7 7.9,8.5 5,6.8 2.1,8.5 3.1,5.7 0.5,3.8 3.8,3.8"
          fill={i <= rating ? color : 'rgba(255,255,255,0.1)'}
        />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review, onClick, isActive }) => {
  const avatarRef = useRef();

  const handleMouseEnter = () => {
    gsap.to(avatarRef.current, {
      scale: 1.15,
      rotate: 6,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(avatarRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
  <div
    onClick={() => onClick(review.id)}
    className="review-card relative flex-shrink-0 cursor-pointer"
    style={{
      width: isActive ? '380px' : '300px',
      background: isActive
        ? `linear-gradient(135deg, ${review.color}12, #111 80%)`
        : 'rgba(255,255,255,0.03)',
      border: `1px solid ${isActive ? review.color + '50' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: '1.25rem',
      padding: '1.5rem',
      transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1), background 0.4s, border-color 0.4s',
    }}
  >
    {/* Top row */}
    <div className="flex items-start justify-between mb-3 gap-2">
      <div className="flex items-center gap-3"
       ref={avatarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
        {/* Avatar */}
        <Image
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(review.name) }`}
          width={40}
          height={40}
          alt="avatar"
          unoptimized
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '1rem',
              letterSpacing: '0.08em',
              color: '#fff',
              lineHeight: 1,
              marginBottom: '2px',
            }}
          >
            {review.name}
          </p>
          <p
            style={{
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.05em',
            }}
          >
            {review.role}
          </p>
        </div>
      </div>

      {/* Boot chip */}
      <Image src={review.bootImage} alt={review.name} width={40} height={40} />
    </div>

    {/* Stars + country */}
    <div className="flex items-center justify-between mb-3">
      <StarRating rating={review.rating} color={review.color} />
      <img
        src={`https://flagcdn.com/${review.flag}.svg`}
        alt={review.country}
        className="w-5 h-4 object-cover"
      />
    </div>

    {/* Quote */}
    <p
      style={{
        fontFamily: 'var(--font-poppins, sans-serif)',
        fontSize: '0.82rem',
        color: 'rgba(255,255,255,0.75)',
        lineHeight: 1.6,
        fontStyle: 'italic',
        marginBottom: isActive ? '0.75rem' : 0,
      }}
    >
      "{review.quote}"
    </p>

    {/* Expanded detail */}
    {isActive && (
      <div
        style={{
          overflow: 'hidden',
          animation: 'expandIn 0.4s ease forwards',
        }}
      >
        <div
          style={{
            height: '1px',
            background: `linear-gradient(to right, ${review.color}40, transparent)`,
            marginBottom: '0.75rem',
          }}
        />
        <p
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}
        >
          {review.detail}
        </p>
      </div>
    )}

    {/* Active indicator dot */}
    {isActive && (
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: review.color,
          boxShadow: `0 0 10px ${review.color}`,
        }}
      />
    )}
  </div>
);
};

const MarqueeRow = ({ items, direction = 1, activeId, onCardClick }) => {
  const doubled = [...items, ...items]; // duplicate for seamless loop

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        className={direction === 1 ? 'marquee-left' : 'marquee-right'}
        style={{ display: 'flex', gap: '1rem', width: 'max-content' }}
      >
        {doubled.map((review, i) => (
          <ReviewCard
            key={`${review.id}-${i}`}
            review={review}
            isActive={activeId === review.id}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
};

const Reviews = () => {
  const sectionRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const handleCardClick = id => {
    setActiveId(prev => (prev === id ? null : id));
  };

  useGSAP(
    () => {
      // Section heading entrance
      const titleSplit = new SplitText('.reviews-title', { type: 'chars' });
      gsap.from(titleSplit.chars, {
        scrollTrigger: {
          trigger: '#reviews',
          start: 'top 80%',
        },
        yPercent: 100,
        opacity: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: 'expo.out',
      });

      gsap.from('.reviews-meta', {
        scrollTrigger: { trigger: '#reviews', start: 'top 75%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.from('.rating-block', {
        scrollTrigger: { trigger: '#reviews', start: 'top 70%' },
        scale: 0.85,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'back.out(1.8)',
        delay: 0.2,
      });

      gsap.from('.marquee-wrap', {
        scrollTrigger: { trigger: '.marquee-wrap', start: 'top 85%' },
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef },
  );

  return (
    <>
      {/* ── Marquee CSS ─────────────────────────────────── */}
      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes expandIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .marquee-left  { animation: marqueeLeft  40s linear infinite; }
        .marquee-right { animation: marqueeRight 36s linear infinite; }
        .marquee-left:hover,
        .marquee-right:hover { animation-play-state: paused; }
      `}</style>

      <section
        id="reviews"
        ref={sectionRef}
        className="relative w-full bg-[#060606] overflow-hidden py-24"
      >
        {/* ── Noise ───────────────────────────────────────── */}
        <div className="noisy absolute inset-0 opacity-[0.025] pointer-events-none z-0" />

        {/* ── Background ghost text ─────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span
            className="font-bebas text-[20vw] leading-none"
            style={{ WebkitTextStroke: '1px rgba(255,45,0,0.04)', color: 'transparent' }}
          >
            REVIEWS
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* ── Section header ──────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
            <div>
              {/* Eyebrow */}
              <div className="reviews-meta flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#FF2D00]" />
                <span className="text-[#FF2D00] text-[10px] tracking-[0.5em] uppercase">
                  Real Players · Real Verdict
                </span>
              </div>

              {/* Title */}
              <div className="overflow-hidden">
                <h2
                  className="reviews-title font-bebas uppercase leading-[0.88]"
                  style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
                >
                  <span className="text-white">What They</span>
                  <br />
                  <span style={{ WebkitTextStroke: '1.5px #FF2D00', color: 'transparent' }}>
                    Say
                  </span>
                </h2>
              </div>
            </div>

            {/* Rating stats */}
            <div className="flex gap-6 md:gap-10">
              {[
                { value: '4.9', label: 'Avg Rating', accent: '#FF2D00' },
                { value: '12K+', label: 'Reviews', accent: '#d4a017' },
                { value: '98%', label: 'Recommend', accent: '#FF2D00' },
              ].map(({ value, label, accent }) => (
                <div key={label} className="rating-block flex flex-col items-center gap-1">
                  <span
                    className="font-bebas leading-none"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: accent }}
                  >
                    {value}
                  </span>
                  <span className="text-[9px] tracking-[0.35em] uppercase text-white/25">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Marquee rows ────────────────────────────────── */}
        <div className="flex flex-col gap-4 marquee-wrap">
          <MarqueeRow
            items={row1}
            direction={1}
            activeId={activeId}
            onCardClick={handleCardClick}
          />
          <MarqueeRow
            items={row2}
            direction={-1}
            activeId={activeId}
            onCardClick={handleCardClick}
          />
        </div>

        {/* ── Bottom CTA ──────────────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center gap-4 mt-14 px-6">
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase">
            Click any card to read the full review
          </p>
          <button
            className="group flex items-center gap-2 border border-white/10
            hover:border-[#FF2D00]/50 rounded-full px-7 py-2.5 transition-all duration-300"
          >
            <span
              className="font-bebas text-xs tracking-[0.4em] uppercase text-white/40
              group-hover:text-white/70 transition-colors"
            >
              View All Reviews
            </span>
            <span
              className="text-white/30 text-xs group-hover:translate-x-1
              group-hover:text-[#FF2D00] transition-all"
            >
              →
            </span>
          </button>
        </div>

        {/* ── Bottom rule ─────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, #FF2D0020, transparent)' }}
        />
      </section>
    </>
  );
};

export default Reviews;
