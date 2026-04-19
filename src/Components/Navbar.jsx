'use client';
import React, { useRef, useState } from 'react';
import { navbarLinks } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import logo from '@/../public/assets/images/logo.png';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const arrowRef = useRef(null);
  const [navVisible, setNavVisible] = useState(false);

  useGSAP(() => {
    // ── Entrance: nav starts hidden above viewport
    gsap.set(navRef.current, { yPercent: -130, opacity: 0 });

    // ── Arrow pulse loop (subtle breathe)
    gsap.to(arrowRef.current, {
      y: 6,
      duration: 1.1,
      ease: 'sine.inOut',
    });

    // ── Hide nav when user scrolls down
    let lastScrollY = 0;
    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: self => {
        const currentScrollY = self.scroll();
        const isScrollingDown = currentScrollY > lastScrollY;
        const isPastThreshold = currentScrollY > 60;

        if (isScrollingDown && isPastThreshold) {
          // Hide nav
          gsap.to(navRef.current, {
            yPercent: -130,
            opacity: 0,
            duration: 0.1,
            ease: 'power2.inOut',
            overwrite: 'auto',
            onComplete: () => setNavVisible(false),
          });
          // Reveal arrow
          gsap.to(arrowRef.current, {
            opacity: 1,
            scale: 1,
            pointerEvents: 'auto',
            duration: 0.1,
            ease: 'back.out(1.4)',
            overwrite: 'auto',
          });
        }

        lastScrollY = currentScrollY;
      },
    });
  });

  const showNav = () => {
    if (navVisible) return;
    setNavVisible(true);

    // Slide nav in
    gsap.to(navRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.1,
      ease: 'expo.out',
      overwrite: 'auto',
    });

    // Hide arrow
    gsap.to(arrowRef.current, {
      opacity: 0,
      scale: 0.7,
      pointerEvents: 'none',
      duration: 0.1,
      ease: 'power2.in',
      overwrite: 'auto',
    });
  };

  return (
    <>
      {/* ── Down-arrow trigger ─────────────────────────────────── */}
      <button
        ref={arrowRef}
        onClick={showNav}
        aria-label="Show navigation"
        className="fixed top-0 left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center gap-0.5 pt-2 cursor-pointer group"
        style={{ background: 'none', border: 'none', padding: 0 }}
      >
        {/* Pill handle */}
        <span
          className="w-10 h-1 rounded-full transition-all duration-300 group-hover:w-14"
          style={{ background: 'rgba(255,255,255,0.35)' }}
        />

        {/* Chevron */}
        <svg
          width="28"
          height="18"
          viewBox="0 0 28 18"
          fill="none"
          className="mt-0.5 transition-transform duration-300 group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <polyline
            points="3,4 14,14 25,4"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <polyline
            points="3,10 14,20 25,10"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[999] px-4 sm:px-6 py-3">
        <div
          className="max-w-4xl mx-auto flex items-center justify-between rounded-2xl px-4 sm:px-5 py-2.5"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(28px) saturate(180%) brightness(1.05)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.05)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.25),
              0 1px 0 rgba(255, 255, 255, 0.22) inset,
              0 -1px 0 rgba(0, 0, 0, 0.08) inset
            `,
          }}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <Image
              src={logo}
              className="object-contain w-[26px] h-[34px] drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              alt="Adidas logo"
            />
            <span
              className="font-bebas text-xl tracking-[0.12em] text-white/90 transition-colors duration-200 group-hover:text-white hidden sm:block"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
            >
              ADIDAS
            </span>
          </a>

          {/* Nav Links — hidden on mobile */}
          <ul className="hidden md:flex items-center gap-1">
            {navbarLinks.map(link => (
              <li key={link.id}>
                <Link
                  href={link.href || `#${link.id}`}
                  className="relative font-bebas text-sm tracking-[0.1em] text-white/75 hover:text-white px-3 py-1.5 rounded-xl transition-all duration-200 hover:bg-white/10 active:bg-white/15 group"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                >
                  {link.title}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/0 group-hover:bg-white/60 transition-all duration-200" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile: compact scrollable links */}
          <ul className="flex md:hidden items-center gap-0.5 overflow-x-auto max-w-[calc(100vw-180px)] no-scrollbar">
            {navbarLinks.map(link => (
              <li key={link.id} className="shrink-0">
                <Link
                  href={link.href || `#${link.id}`}
                  className="font-bebas text-xs tracking-[0.08em] text-white/70 hover:text-white px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-white/10 whitespace-nowrap block"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#shop"
            className="font-bebas text-xs sm:text-sm tracking-[0.12em] text-white px-3 sm:px-4 py-1.5 rounded-xl transition-all duration-200 active:scale-95 shrink-0"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.2) inset',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
              e.currentTarget.style.boxShadow =
                '0 4px 16px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.3) inset';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.boxShadow =
                '0 2px 8px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.2) inset';
            }}
          >
            SHOP NOW
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
