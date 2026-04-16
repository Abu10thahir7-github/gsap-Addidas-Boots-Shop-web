"use client";
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const navLinks = [
  {
    heading: 'Collection',
    links: ['F50 Elite', 'Predator 25', 'Copa Pure 3', 'Road to Glory', 'Heritage Archive'],
  },
  {
    heading: 'Experience',
    links: ['Our Story', 'Technology', 'The Art', 'Film Studio', 'Player Stories'],
  },
  {
    heading: 'Support',
    links: ['Find a Store', 'Size Guide', 'Returns', 'Shipping Info', 'Contact Us'],
  },
];

const socials = [
  {
    name: 'IG',
    label: 'Instagram',
    href: '#',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    name: 'X',
    label: 'Twitter / X',
    href: '#',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    name: 'YT',
    label: 'YouTube',
    href: '#',
    path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    name: 'TK',
    label: 'TikTok',
    href: '#',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
];

const Footer = () => {
  const footerRef = useRef(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const inputRef = useRef(null);

  const handleSubscribe = () => {
    if (!email.includes('@')) return;
    gsap.to(inputRef.current, {
      scale: 0.97, duration: 0.1, yoyo: true, repeat: 1,
      onComplete: () => setSubscribed(true),
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useGSAP(() => {
    // Nav columns stagger in
    gsap.from('.footer-col', {
      scrollTrigger: { trigger: '#footer', start: 'top 90%' },
      y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
    });

    // Newsletter block slides in
    gsap.from('.footer-newsletter', {
      scrollTrigger: { trigger: '#footer', start: 'top 85%' },
      x: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2,
    });

    // Bottom bar fades in
    gsap.from('.footer-bottom', {
      scrollTrigger: { trigger: '.footer-bottom', start: 'top 98%' },
      y: 20, opacity: 0, duration: 0.8, ease: 'power2.out',
    });

    // Big wordmark scrubs in
    gsap.from('.footer-wordmark', {
      scrollTrigger: { trigger: '.footer-wordmark', start: 'top 95%' },
      yPercent: 40, opacity: 0, duration: 1.2, ease: 'expo.out',
    });
  }, { scope: footerRef });

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .footer-link {
          position: relative;
          display: inline-block;
          transition: color 0.25s;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: #FF2D00;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .footer-link:hover::after { width: 100%; }
        .footer-link:hover { color: rgba(255,255,255,0.9); }

        .social-btn {
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .social-btn:hover {
          transform: translateY(-4px);
          border-color: rgba(255,45,0,0.5) !important;
          background: rgba(255,45,0,0.08) !important;
        }

        .subscribe-btn {
          transition: all 0.3s;
        }
        .subscribe-btn:hover {
          background: #cc2400;
          letter-spacing: 0.5em;
        }

        .back-top-btn {
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .back-top-btn:hover {
          transform: translateY(-4px);
          border-color: rgba(255,45,0,0.5);
          box-shadow: 0 8px 30px rgba(255,45,0,0.15);
        }
        .back-top-btn:hover .arrow-icon {
          transform: translateY(-3px);
        }
        .arrow-icon { transition: transform 0.3s; }

        .wordmark-char {
          display: inline-block;
          transition: color 0.2s, -webkit-text-stroke 0.2s;
        }
        .footer-wordmark:hover .wordmark-char {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,45,0,0.4);
        }
      `}</style>

      <footer
        id="footer"
        ref={footerRef}
        className="relative w-full bg-[#050505] overflow-hidden"
      >
        {/* ── Noise overlay ───────────────────────────────── */}
        <div className="noisy absolute inset-0 opacity-[0.03] pointer-events-none z-0" />

        {/* ── Top red rule ────────────────────────────────── */}
        <div className="w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, #FF2D00, transparent)' }} />

        {/* ── Diagonal accent ─────────────────────────────── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none">
          <line x1="0" y1="0" x2="8%" y2="100%"
            stroke="#d4a017" strokeWidth="0.5" strokeOpacity="0.06" />
          <line x1="100%" y1="0" x2="92%" y2="100%"
            stroke="#FF2D00" strokeWidth="0.5" strokeOpacity="0.04" />
        </svg>

        {/* ══════════════════════════════════════════════════
            MAIN FOOTER BODY
        ══════════════════════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* ── LEFT BRAND BLOCK ────────────────────────── */}
            <div className="footer-col lg:col-span-4 flex flex-col gap-8">

              {/* Logo + tagline */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* Three stripes mark */}
                  <div className="flex gap-[3px]">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-[3px] rounded-full"
                        style={{
                          height: `${14 + i * 4}px`,
                          background: i === 2 ? '#FF2D00' : '#fff',
                          marginTop: 'auto',
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="font-bebas text-2xl tracking-[0.3em] text-white uppercase"
                    style={{ letterSpacing: '0.25em' }}
                  >
                    Adidas F50
                  </span>
                </div>

                <p className="text-white/30 text-sm leading-relaxed tracking-wide max-w-xs">
                  Born from the pursuit of pure speed. The F50 is more than a boot
                  — it's the weapon of champions.
                </p>
              </div>

              {/* Social links */}
              <div>
                <p className="text-[9px] tracking-[0.45em] uppercase text-white/20 mb-4">
                  Follow The Journey
                </p>
                <div className="flex gap-2 flex-wrap">
                  {socials.map(s => (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.label}
                       className="social-btn w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <svg
                        width="14" height="14" viewBox="0 0 24 24"
                        fill="rgba(255,255,255,0.5)"
                      >
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Awards/badges */}
              <div className="flex gap-4 flex-wrap">
                {['FIFA Partner', '2025 Season', 'UCL Official'].map(badge => (
                  <span
                    key={badge}
                    className="text-[8px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.2)',
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* ── CENTER NAV COLUMNS ──────────────────────── */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-6">
              {navLinks.map(col => (
                <div key={col.heading} className="footer-col flex flex-col gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-px bg-[#FF2D00]" />
                      <p className="font-bebas text-[10px] tracking-[0.45em] uppercase text-[#FF2D00]">
                        {col.heading}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-3">
                      {col.links.map(link => (
                        <li key={link}>
                          <a
                            href="#"
                            className="footer-link text-[13px] text-white/35 tracking-wide"
                            onClick={e => e.preventDefault()}
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* ── RIGHT NEWSLETTER ────────────────────────── */}
            <div className="footer-newsletter lg:col-span-3 flex flex-col gap-6">

              {/* Heading */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-px bg-[#d4a017]" />
                  <p className="font-bebas text-[10px] tracking-[0.45em] uppercase text-[#d4a017]">
                    Insider Access
                  </p>
                </div>
                <h3
                  className="font-bebas leading-none text-white uppercase mb-2"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
                >
                  Get First
                  <br />
                  <span style={{ WebkitTextStroke: '1px #d4a017', color: 'transparent' }}>
                    Drop Access
                  </span>
                </h3>
                <p className="text-white/25 text-xs leading-relaxed tracking-wide">
                  Limited releases. Player collabs.
                  <br />No spam — just speed.
                </p>
              </div>

              {/* Input */}
              {!subscribed ? (
                <div ref={inputRef} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                    placeholder="your@email.com"
                    className="w-full bg-transparent text-white text-sm tracking-wider
                      outline-none placeholder:text-white/20"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.12)',
                      padding: '0.75rem 3rem 0.75rem 0',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={e => e.target.parentElement.style.setProperty(
                      '--b', '#FF2D00')}
                  />
                  <button
                    onClick={handleSubscribe}
                    className="absolute right-0 top-1/2 -translate-y-1/2
                      text-white/40 hover:text-[#FF2D00] transition-colors text-lg"
                    aria-label="Subscribe"
                  >
                    →
                  </button>
                </div>
              ) : (
                <div
                  className="flex items-center gap-3 py-3"
                  style={{ borderBottom: '1px solid rgba(212,160,23,0.3)' }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid #34d39950' }}
                  >
                    <span className="text-emerald-400 text-[10px]">✓</span>
                  </span>
                  <p className="text-emerald-400/80 text-xs tracking-wider">
                    You're on the list. Watch your inbox.
                  </p>
                </div>
              )}

              {/* Stats row */}
              <div className="flex gap-6">
                {[
                  { n: '240K', l: 'Subscribers' },
                  { n: 'Weekly', l: 'Drops' },
                ].map(({ n, l }) => (
                  <div key={l} className="flex flex-col gap-0.5">
                    <span className="font-bebas text-xl text-white/50 leading-none">
                      {n}
                    </span>
                    <span className="text-[8px] tracking-[0.3em] uppercase text-white/20">
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            GIANT WORDMARK
        ══════════════════════════════════════════════════ */}
        <div className="footer-wordmark relative z-10 overflow-hidden
          select-none text-center px-4 mt-4 cursor-default"
          onClick={scrollToTop}
          title="Back to top"
        >
          {'ADIDAS'.split('').map((char, i) => (
            <span
              key={i}
              className="wordmark-char font-bebas text-white/[0.05]"
              style={{
                fontSize: 'clamp(5rem, 19vw, 17rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                WebkitTextStroke: '1px rgba(255,255,255,0.05)',
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════════════ */}
        <div
          className="footer-bottom relative z-10 max-w-7xl mx-auto
            px-6 md:px-12 py-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex flex-col md:flex-row items-center
            justify-between gap-4">

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start
              gap-x-5 gap-y-2">
              {['Privacy Policy', 'Terms of Use', 'Cookie Settings', 'Accessibility'].map(item => (
                <a
                  key={item}
                  href="#"
                  className="footer-link text-[10px] tracking-[0.2em] uppercase text-white/20"
                  onClick={e => e.preventDefault()}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/15 text-center">
              © 2025 Adidas AG · F50 Collection · All rights reserved
            </p>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="back-top-btn flex items-center gap-2.5 group
                px-4 py-2 rounded-full"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <span className="text-[9px] tracking-[0.35em] uppercase text-white/25
                group-hover:text-white/50 transition-colors">
                Back to Top
              </span>
              <span className="arrow-icon text-white/25 text-xs
                group-hover:text-[#FF2D00] transition-colors">
                ↑
              </span>
            </button>

          </div>
        </div>

        {/* ── Bottom accent ───────────────────────────────── */}
        <div className="w-full h-[2px]"
          style={{
            background: 'linear-gradient(to right, transparent, #FF2D00, #d4a017, #FF2D00, transparent)',
          }}
        />
      </footer>
    </>
  );
};

export default Footer;