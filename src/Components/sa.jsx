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
  const navRef   = useRef(null);
  const arrowRef = useRef(null);
  const logoRef  = useRef(null);
  const linksRef = useRef([]);
  const ctaRef   = useRef(null);
  const lineRef  = useRef(null);
  const [navVisible, setNavVisible] = useState(false);

  /* ─── GSAP context ──────────────────────────────────────────── */
  useGSAP(() => {

    /* 1. Start hidden */
    gsap.set(navRef.current,   { yPercent: -130, opacity: 0 });
    gsap.set(arrowRef.current, { opacity: 0, y: -12 });

    /* 2. Entrance timeline */
    const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'expo.out' } });

    tl
      /* nav pill drops in */
      .to(navRef.current, {
        yPercent: 0, opacity: 1, duration: 1.1,
      })
      /* progress line expands from center */
      .fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      /* logo slides in */
      .fromTo(logoRef.current,
        { x: -18, opacity: 0 },
        { x: 0,   opacity: 1, duration: 0.5 },
        '-=0.5'
      )
      /* links stagger up */
      .fromTo(linksRef.current,
        { y: 14, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.45, stagger: 0.07 },
        '-=0.4'
      )
      /* CTA pops in */
      .fromTo(ctaRef.current,
        { scale: 0.82, opacity: 0 },
        { scale: 1,    opacity: 1, duration: 0.45, ease: 'back.out(2)' },
        '-=0.3'
      )
      .call(() => setNavVisible(true));

    /* 3. Arrow float loop */
    gsap.to(arrowRef.current, {
      y: 7, duration: 1.2,
      ease: 'sine.inOut', yoyo: true, repeat: -1,
    });

    /* 4. Scroll hide / reveal */
    let lastY = 0;
    ScrollTrigger.create({
      start: 'top top', end: 'max',
      onUpdate: self => {
        const curY     = self.scroll();
        const goingDown = curY > lastY;
        const past      = curY > 60;

        if (goingDown && past) {
          gsap.to(navRef.current, {
            yPercent: -130, opacity: 0,
            duration: 0.45, ease: 'power3.inOut', overwrite: 'auto',
            onComplete: () => setNavVisible(false),
          });
          gsap.to(arrowRef.current, {
            opacity: 1, y: 0,
            duration: 0.4, ease: 'back.out(1.6)', overwrite: 'auto',
            pointerEvents: 'auto',
          });
        }
        lastY = curY;
      },
    });
  }, []);

  /* ─── Show nav on arrow click ───────────────────────────────── */
  const showNav = () => {
    if (navVisible) return;
    setNavVisible(true);
    gsap.to(navRef.current, {
      yPercent: 0, opacity: 1,
      duration: 0.7, ease: 'expo.out', overwrite: 'auto',
    });
    gsap.to(arrowRef.current, {
      opacity: 0, y: -12,
      duration: 0.35, ease: 'power2.in', overwrite: 'auto',
      onComplete: () => gsap.set(arrowRef.current, { pointerEvents: 'none' }),
    });
  };

  /* ─── Link hover: underline clip-path reveal ────────────────── */
  const onLinkEnter = (e) => {
    gsap.to(e.currentTarget.querySelector('.link-line'), {
      scaleX: 1, transformOrigin: 'left center',
      duration: 0.35, ease: 'power3.out',
    });
    gsap.to(e.currentTarget.querySelector('.link-num'), {
      opacity: 1, y: 0, duration: 0.25, ease: 'power2.out',
    });
    gsap.to(e.currentTarget, { color: '#ffffff', duration: 0.2 });
  };

  const onLinkLeave = (e) => {
    gsap.to(e.currentTarget.querySelector('.link-line'), {
      scaleX: 0, transformOrigin: 'right center',
      duration: 0.28, ease: 'power2.in',
    });
    gsap.to(e.currentTarget.querySelector('.link-num'), {
      opacity: 0, y: 4, duration: 0.2, ease: 'power2.in',
    });
    gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.55)', duration: 0.2 });
  };

  /* ─── CTA hover: white fill wipe up ─────────────────────────── */
  const onCtaEnter = (e) => {
    gsap.to(e.currentTarget.querySelector('.cta-fill'), {
      scaleY: 1, transformOrigin: 'bottom center',
      duration: 0.35, ease: 'power3.out',
    });
    gsap.to(e.currentTarget.querySelector('.cta-label'), {
      color: '#000', duration: 0.3,
    });
  };

  const onCtaLeave = (e) => {
    gsap.to(e.currentTarget.querySelector('.cta-fill'), {
      scaleY: 0, transformOrigin: 'top center',
      duration: 0.28, ease: 'power2.in',
    });
    gsap.to(e.currentTarget.querySelector('.cta-label'), {
      color: '#fff', duration: 0.25,
    });
  };

  return (
    <>
      {/* ── Arrow trigger ─────────────────────────────────────── */}
      <button
        ref={arrowRef}
        onClick={showNav}
        aria-label="Show navigation"
        style={{ opacity: 0, pointerEvents: 'none' }}
        className="fixed top-0 left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center gap-1 pt-3 cursor-pointer group bg-transparent border-none"
      >
        <span
          className="block w-9 h-[3px] rounded-full transition-all duration-300 group-hover:w-14"
          style={{ background: 'rgba(255,255,255,0.3)' }}
        />
        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="mt-0.5">
          <polyline points="2,3 12,11 22,3" stroke="rgba(255,255,255,0.85)"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="2,8 12,16 22,8" stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[999] px-4 sm:px-6 pt-4">

        {/* Hairline gradient across the very top */}
        <div
          ref={lineRef}
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
        />

        {/* Pill */}
        <div
          className="max-w-4xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl"
          style={{
            background:           'rgba(10, 10, 10, 0.72)',
            backdropFilter:       'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border:               '1px solid rgba(255,255,255,0.10)',
            boxShadow:            '0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.12) inset',
          }}
        >
          {/* Logo */}
          <a ref={logoRef} href="#home" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative">
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 16px rgba(255,255,255,0.25)' }}
              />
              <Image
                src={logo}
                className="object-contain w-[24px] h-[30px] transition-transform duration-300 group-hover:scale-110"
                alt="Adidas logo"
              />
            </div>
            <span className="font-bebas text-lg tracking-[0.18em] text-white/80 group-hover:text-white transition-colors duration-200 hidden sm:block">
              ADIDAS
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navbarLinks.map((link, i) => (
              <li key={link.id}>
                <Link
                  ref={el => (linksRef.current[i] = el)}
                  href={link.href || `#${link.id}`}
                  onMouseEnter={onLinkEnter}
                  onMouseLeave={onLinkLeave}
                  className="relative flex flex-col items-center px-3.5 py-1.5"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {/* index */}
                  <span
                    className="link-num absolute top-0 text-[8px] font-mono text-white/30 tracking-widest leading-none"
                    style={{ opacity: 0, transform: 'translateY(4px)' }}
                  >
                    0{i + 1}
                  </span>
                  {/* label */}
                  <span className="font-bebas text-[13px] tracking-[0.16em] mt-2 leading-none">
                    {link.title}
                  </span>
                  {/* underline */}
                  <span
                    className="link-line absolute bottom-0.5 left-3.5 right-3.5 h-px bg-white"
                    style={{ transform: 'scaleX(0)', transformOrigin: 'right center' }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile links (scrollable) */}
          <ul
            className="flex md:hidden items-center gap-0.5 overflow-x-auto max-w-[calc(100vw-180px)]"
            style={{ scrollbarWidth: 'none' }}
          >
            {navbarLinks.map((link, i) => (
              <li key={link.id} className="shrink-0">
                <Link
                  ref={el => (linksRef.current[i] = el)}
                  href={link.href || `#${link.id}`}
                  className="font-bebas text-[11px] tracking-[0.1em] text-white/60 hover:text-white px-2.5 py-1.5 block whitespace-nowrap transition-colors duration-200"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            ref={ctaRef}
            href="#shop"
            onMouseEnter={onCtaEnter}
            onMouseLeave={onCtaLeave}
            className="relative shrink-0 overflow-hidden px-4 py-1.5 rounded-xl cursor-pointer"
            style={{
              border:     '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.06)',
            }}
          >
            <span
              className="cta-fill absolute inset-0 bg-white rounded-xl"
              style={{ transform: 'scaleY(0)', transformOrigin: 'bottom center' }}
            />
            <span className="cta-label relative z-10 font-bebas text-[13px] tracking-[0.18em] text-white">
              SHOP NOW
            </span>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;