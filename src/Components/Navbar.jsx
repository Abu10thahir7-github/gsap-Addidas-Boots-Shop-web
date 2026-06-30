'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/../public/assets/images/logo.webp';
import { navbarLinks, socials } from '../../constants';

/* ─────────────────────── Liquid Glass CSS ───────────────────────── */
const liquidGlassStyles = `
  /* ── Keyframes ─────────────────────────────────────────────────── */
  @keyframes sheen {
    0%   { transform: translateX(-120%) skewX(-20deg); }
    100% { transform: translateX(220%)  skewX(-20deg); }
  }
  @keyframes floatGlass {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-2px); }
  }

  /* ── Desktop pill ──────────────────────────────────────────────── */
  .lg-pill {
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.18) 0%,
      rgba(255,255,255,0.06) 40%,
      rgba(255,255,255,0.12) 100%
    );
    backdrop-filter: blur(48px) saturate(220%) brightness(1.08);
    -webkit-backdrop-filter: blur(48px) saturate(220%) brightness(1.08);
    border: 1px solid rgba(255,255,255,0.28);
    border-bottom-color: rgba(255,255,255,0.10);
    box-shadow:
      0 2px 0 rgba(255,255,255,0.30) inset,       /* top specular */
      0 -1px 0 rgba(255,255,255,0.06) inset,       /* bottom inner */
      1px 0 0 rgba(255,255,255,0.14) inset,        /* left sheen */
      0 12px 60px rgba(0,0,0,0.55),
      0 2px 12px rgba(0,0,0,0.40),
      0 0 0 0.5px rgba(255,255,255,0.08);
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    animation: floatGlass 6s ease-in-out infinite;
  }

  /* Sheen sweep on load */
  .lg-pill::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255,255,255,0.18) 50%,
      transparent 70%
    );
    animation: sheen 3.5s ease-in-out 0.8s 1 forwards;
    pointer-events: none;
    z-index: 1;
  }

  /* Bottom edge refraction strip */
  .lg-pill::after {
    content: '';
    position: absolute;
    bottom: 0; left: 8px; right: 8px; height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(255,255,255,0.22) 30%,
      rgba(255,255,255,0.35) 50%,
      rgba(255,255,255,0.22) 70%,
      transparent
    );
    pointer-events: none;
  }

  /* ── Desktop nav links ─────────────────────────────────────────── */
  .lg-link {
    border-radius: 12px;
    transition: background 0.25s, box-shadow 0.25s;
  }
  .lg-link:hover {
    background: rgba(255,255,255,0.10);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.22) inset,
      0 4px 16px rgba(0,0,0,0.20);
  }

  /* ── CTA button ────────────────────────────────────────────────── */
  .lg-cta {
    background: linear-gradient(
      160deg,
      rgba(255,255,255,0.22) 0%,
      rgba(255,255,255,0.06) 100%
    );
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.30);
    border-bottom-color: rgba(255,255,255,0.10);
    box-shadow:
      0 1.5px 0 rgba(255,255,255,0.35) inset,
      0 8px 24px rgba(0,0,0,0.35),
      0 0 0 0.5px rgba(255,255,255,0.12);
    border-radius: 14px;
    overflow: hidden;
    position: relative;
  }
  .lg-cta::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 50%;
    background: linear-gradient(180deg, rgba(255,255,255,0.15), transparent);
    pointer-events: none;
  }

  /* ── Mobile top bar ────────────────────────────────────────────── */
  .lg-mobile-bar {
    background: linear-gradient(
      180deg,
      rgba(255,255,255,0.15) 0%,
      rgba(255,255,255,0.06) 100%
    );
    backdrop-filter: blur(40px) saturate(200%) brightness(1.06);
    -webkit-backdrop-filter: blur(40px) saturate(200%) brightness(1.06);
    border-bottom: 1px solid rgba(255,255,255,0.18);
    box-shadow:
      0 1.5px 0 rgba(255,255,255,0.25) inset,
      0 8px 32px rgba(0,0,0,0.45);
  }

  /* ── Icon buttons (mobile) ─────────────────────────────────────── */
  .lg-icon-btn {
    background: linear-gradient(
      145deg,
      rgba(255,255,255,0.16) 0%,
      rgba(255,255,255,0.05) 100%
    );
    border: 1px solid rgba(255,255,255,0.22);
    border-bottom-color: rgba(255,255,255,0.08);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.28) inset,
      0 4px 12px rgba(0,0,0,0.30);
    border-radius: 50%;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: box-shadow 0.2s, background 0.2s;
  }
  .lg-icon-btn:hover {
    background: rgba(255,255,255,0.20);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.38) inset,
      0 6px 20px rgba(0,0,0,0.40);
  }

  /* ── Hamburger button ──────────────────────────────────────────── */
  .lg-hamburger {
    background: linear-gradient(
      145deg,
      rgba(255,255,255,0.18) 0%,
      rgba(255,255,255,0.06) 100%
    );
    border: 1px solid rgba(255,255,255,0.26);
    border-bottom-color: rgba(255,255,255,0.09);
    box-shadow:
      0 1.5px 0 rgba(255,255,255,0.30) inset,
      0 4px 16px rgba(0,0,0,0.35);
    border-radius: 50%;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  /* ── Full-screen mobile menu ────────────────────────────────────── */
  .lg-menu-bg {
    background: linear-gradient(
      160deg,
      rgba(12,10,10,0.92) 0%,
      rgba(20,8,5,0.96) 100%
    );
    backdrop-filter: blur(60px) saturate(180%);
    -webkit-backdrop-filter: blur(60px) saturate(180%);
  }

  /* ── Category pill chips ────────────────────────────────────────── */
  .lg-chip {
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.13) 0%,
      rgba(255,255,255,0.04) 100%
    );
    border: 1px solid rgba(255,255,255,0.18);
    border-bottom-color: rgba(255,255,255,0.07);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.22) inset,
      0 4px 12px rgba(0,0,0,0.25);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: box-shadow 0.2s, background 0.2s;
  }
  .lg-chip:hover {
    background: rgba(255,255,255,0.16);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.32) inset,
      0 6px 18px rgba(0,0,0,0.35);
  }

  /* ── Quick-link cards ──────────────────────────────────────────── */
  .lg-card {
    background: linear-gradient(
      145deg,
      rgba(255,255,255,0.10) 0%,
      rgba(255,255,255,0.03) 100%
    );
    border: 1px solid rgba(255,255,255,0.14);
    border-bottom-color: rgba(255,255,255,0.05);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.18) inset,
      0 4px 14px rgba(0,0,0,0.28);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: box-shadow 0.25s, background 0.25s, transform 0.2s;
  }
  .lg-card:hover {
    background: rgba(255,255,255,0.12);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.26) inset,
      0 8px 24px rgba(0,0,0,0.38);
    transform: translateY(-1px);
  }

  /* ── Featured drop card ────────────────────────────────────────── */
  .lg-featured {
    background: linear-gradient(
      135deg,
      rgba(255,45,0,0.12) 0%,
      rgba(30,10,5,0.85) 50%,
      rgba(10,5,3,0.90) 100%
    );
    border: 1px solid rgba(255,45,0,0.28);
    border-top-color: rgba(255,45,0,0.45);
    box-shadow:
      0 1.5px 0 rgba(255,45,0,0.22) inset,
      0 0 40px rgba(255,45,0,0.08),
      0 8px 32px rgba(0,0,0,0.50);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    position: relative;
    overflow: hidden;
  }
  .lg-featured::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(255,45,0,0.60) 50%,
      transparent
    );
  }

  /* ── Social icon buttons ────────────────────────────────────────── */
  .lg-social {
    background: linear-gradient(
      145deg,
      rgba(255,255,255,0.10) 0%,
      rgba(255,255,255,0.03) 100%
    );
    border: 1px solid rgba(255,255,255,0.13);
    border-bottom-color: rgba(255,255,255,0.05);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.18) inset,
      0 3px 10px rgba(0,0,0,0.25);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: box-shadow 0.2s, background 0.2s;
  }
  .lg-social:hover {
    background: rgba(255,255,255,0.14);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.26) inset,
      0 6px 16px rgba(0,0,0,0.35);
  }

  /* ── Shop Now CTA (mobile menu) ────────────────────────────────── */
  .lg-shop-cta {
    background: linear-gradient(
      145deg,
      rgba(255,65,20,1.0) 0%,
      rgba(210,30,0,1.0) 100%
    );
    border: 1px solid rgba(255,100,60,0.55);
    border-bottom-color: rgba(180,20,0,0.60);
    box-shadow:
      0 1.5px 0 rgba(255,120,80,0.45) inset,
      0 6px 24px rgba(255,45,0,0.35),
      0 2px 8px rgba(0,0,0,0.40);
    transition: box-shadow 0.25s, transform 0.2s;
  }
  .lg-shop-cta:hover {
    box-shadow:
      0 1.5px 0 rgba(255,140,100,0.55) inset,
      0 10px 32px rgba(255,45,0,0.50),
      0 4px 12px rgba(0,0,0,0.45);
    transform: translateY(-1px);
  }
`;

/* ── extra constants ─────────────────────────────────────────────── */
const categories = [
  { label: 'Football', tag: 'NEW', href: '#football' },
  { label: 'Running', tag: null,   href: '#running'  },
  { label: 'Training', tag: 'HOT', href: '#training' },
  { label: 'Originals', tag: null, href: '#originals'},
];

const quickLinks = [
  { label: 'Store Locator', icon: 'M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7Zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z', href: '#store' },
  { label: 'Size Guide',    icon: 'M3 7h18M3 12h18M3 17h12',       href: '#size'  },
  { label: 'Track Order',   icon: 'M5 12h14M13 6l6 6-6 6',          href: '#track' },
];

/* ─────────────────────────────────────────────────────────────────── */

const Navbar = () => {
  const navRef       = useRef(null);
  const logoRef      = useRef(null);
  const linksRef     = useRef([]);
  const ctaRef       = useRef(null);
  const lineRef      = useRef(null);
  const menuRef      = useRef(null);
  const menuItemsRef = useRef([]);
  const menuCatsRef  = useRef([]);
  const menuBottomRef= useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ─── Desktop entrance ──────────────────────────────────────────── */
  useGSAP(() => {
    gsap.set(navRef.current, { yPercent: -130, opacity: 0 });
    const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'expo.out' } });
    tl.to(navRef.current, { yPercent: 0, opacity: 1, duration: 1.1 })
      .fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo(logoRef.current,
        { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, '-=0.5')
      .fromTo(linksRef.current,
        { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.07 }, '-=0.4')
      .fromTo(ctaRef.current,
        { scale: 0.82, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, '-=0.3');

    if (menuRef.current) gsap.set(menuRef.current, { xPercent: -100, display: 'none' });
  }, []);

  /* ─── Mobile menu open / close ──────────────────────────────────── */
  useEffect(() => {
    if (!menuRef.current) return;
    const allItems = [...menuItemsRef.current, ...menuCatsRef.current];
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      tl.set(menuRef.current, { display: 'flex' })
        .fromTo(menuRef.current, { xPercent: -100 }, { xPercent: 0, duration: 0.5 })
        .fromTo(allItems,
          { x: -32, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.38, stagger: 0.055 }, '-=0.3')
        .fromTo(menuBottomRef.current,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2');
    } else {
      document.body.style.overflow = '';
      tl.to(menuBottomRef.current, { y: 10, opacity: 0, duration: 0.18 })
        .to(allItems,
          { x: -24, opacity: 0, duration: 0.18, stagger: 0.04, ease: 'power2.in' }, '-=0.1')
        .to(menuRef.current,
          { xPercent: -100, duration: 0.38, ease: 'power2.inOut' }, '-=0.1')
        .set(menuRef.current, { display: 'none' });
    }
    return () => tl.kill();
  }, [menuOpen]);

  /* ─── Link hover helpers ─────────────────────────────────────────── */
  const onLinkEnter = e => {
    gsap.to(e.currentTarget.querySelector('.link-line'), {
      scaleX: 1, transformOrigin: 'left center', duration: 0.35, ease: 'power3.out',
    });
    gsap.to(e.currentTarget.querySelector('.link-num'), {
      opacity: 1, y: 0, duration: 0.25, ease: 'power2.out',
    });
    gsap.to(e.currentTarget, { color: '#ffffff', duration: 0.2 });
  };
  const onLinkLeave = e => {
    gsap.to(e.currentTarget.querySelector('.link-line'), {
      scaleX: 0, transformOrigin: 'right center', duration: 0.28, ease: 'power2.in',
    });
    gsap.to(e.currentTarget.querySelector('.link-num'), {
      opacity: 0, y: 4, duration: 0.2, ease: 'power2.in',
    });
    gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.65)', duration: 0.2 });
  };

  const onCtaEnter = e => {
    gsap.to(e.currentTarget.querySelector('.cta-fill'), {
      scaleY: 1, transformOrigin: 'bottom center', duration: 0.35, ease: 'power3.out',
    });
    gsap.to(e.currentTarget.querySelector('.cta-label'), { color: '#000', duration: 0.3 });
  };
  const onCtaLeave = e => {
    gsap.to(e.currentTarget.querySelector('.cta-fill'), {
      scaleY: 0, transformOrigin: 'top center', duration: 0.28, ease: 'power2.in',
    });
    gsap.to(e.currentTarget.querySelector('.cta-label'), { color: '#fff', duration: 0.25 });
  };

  const toggleMenu = () => setMenuOpen(p => !p);
  const closeMenu  = () => setMenuOpen(false);

  return (
    <>
      {/* Inject liquid glass CSS */}
      <style dangerouslySetInnerHTML={{ __html: liquidGlassStyles }} />

      {/* ── Navbar shell ──────────────────────────────────────────── */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">

        {/* Ambient top shimmer line */}
        <div
          ref={lineRef}
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)',
          }}
        />

        {/* ── Desktop pill ─────────────────────────────────────────── */}
        <div className="hidden md:block lg-pill">
          <div
            ref={logoRef}
            className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3 relative z-10"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <Image
                priority
                src={logo}
                className="object-contain w-6 h-7 transition-transform duration-300 group-hover:scale-110"
                alt="Adidas logo"
              />
              <span className="font-bebas text-lg tracking-[0.18em] text-white/80 group-hover:text-white transition-colors duration-200 hidden sm:block">
                ADIDAS
              </span>
            </Link>

            {/* Nav links */}
            <ul className="hidden md:flex items-center gap-0.5">
              {navbarLinks.map((link, i) => (
                <li key={link.id}>
                  <Link
                    ref={el => (linksRef.current[i] = el)}
                    href={link.href || `#${link.id}`}
                    onMouseEnter={onLinkEnter}
                    onMouseLeave={onLinkLeave}
                    className="lg-link relative flex flex-col items-center px-3.5 py-1.5"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    <span
                      className="link-num absolute top-0 text-[8px] font-mono text-[#ff2d00]/80 tracking-widest leading-none"
                      style={{ opacity: 0, transform: 'translateY(4px)' }}
                    >
                      0{i + 1}
                    </span>
                    <span className="font-bebas text-[13px] tracking-[0.16em] mt-2 leading-none">
                      {link.title}
                    </span>
                    <span
                      className="link-line absolute bottom-0.5 left-3.5 right-3.5 h-px bg-[#ff2d00]"
                      style={{ transform: 'scaleX(0)', transformOrigin: 'right center' }}
                    />
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
              className="lg-cta relative hidden md:block shrink-0 px-5 py-1.5 cursor-pointer"
            >
              <span
                className="cta-fill absolute inset-0 bg-white"
                style={{
                  transform: 'scaleY(0)',
                  transformOrigin: 'bottom center',
                  borderRadius: '14px',
                }}
              />
              <span className="cta-label relative z-10 font-bebas text-[13px] tracking-[0.18em] text-white">
                SHOP NOW
              </span>
            </a>
          </div>
        </div>

        {/* ── Mobile top bar ───────────────────────────────────────── */}
        <div
          className={`flex md:hidden items-center justify-between px-4 py-3 -mx-4 -mt-3 ${
            menuOpen ? '' : 'lg-mobile-bar'
          }`}
          style={menuOpen ? { background: 'transparent' } : {}}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-[99]" onClick={closeMenu}>
            <Image priority src={logo} className="w-5 h-6 object-contain" alt="Adidas" />
            <span className="font-bebas text-base tracking-[0.2em] text-white">ADIDAS</span>
          </Link>

          {/* Right cluster */}
          <div className="flex items-center gap-2 z-[99]">
            {/* Search */}
            <button aria-label="Search" className="lg-icon-btn w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m16.5 16.5 4 4" />
              </svg>
            </button>

            {/* Cart */}
            <button aria-label="Cart" className="lg-icon-btn relative w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
              </svg>
              {/* Liquid glass dot badge */}
              <span
                className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full"
                style={{
                  background: 'linear-gradient(145deg,#ff5530,#ff2d00)',
                  border: '0.5px solid rgba(255,100,60,0.60)',
                  boxShadow: '0 0 6px rgba(255,45,0,0.70), 0 1px 0 rgba(255,120,80,0.50) inset',
                }}
              />
            </button>

            {/* Hamburger */}
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
              className="lg-hamburger relative w-9 h-9 flex items-center justify-center"
            >
              <span className={`absolute h-px w-4 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 scale-x-[1.2]' : '-translate-y-1.5'}`} />
              <span className={`absolute h-px w-4 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute h-px w-4 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 scale-x-[1.2]' : 'translate-y-1.5'}`} />
            </button>
          </div>
        </div>

        {/* ── Full-screen mobile menu ──────────────────────────────── */}
        <div
          ref={menuRef}
          aria-hidden={!menuOpen}
          className="lg-menu-bg fixed h-[100vh] inset-0 z-40 md:hidden flex-col"
          style={{ display: 'none' }}
        >
          {/* Left-edge accent — liquid glass tinted red */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{
              background: 'linear-gradient(180deg,rgba(255,45,0,0.90) 0%,rgba(255,45,0,0.20) 60%,transparent 100%)',
              boxShadow: '2px 0 12px rgba(255,45,0,0.25)',
            }}
          />

          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '180px',
            }}
          />

          {/* Glass sheen top-right corner highlight */}
          <div
            className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 100% 0%,rgba(255,255,255,0.07) 0%,transparent 60%)',
            }}
          />

          <div className="flex flex-col h-full px-6 pt-20 pb-8 overflow-y-auto relative z-10">

            {/* Section label */}
            <p className="text-[9px] font-mono tracking-[0.5em] text-white/25 uppercase mb-6">
              Navigation
            </p>

            {/* Primary links */}
            <ul className="space-y-1 mb-10">
              {navbarLinks.map((link, i) => (
                <li key={`m-${link.id}`}>
                  <Link
                    ref={el => (menuItemsRef.current[i] = el)}
                    href={link.href || `#${link.id}`}
                    onClick={closeMenu}
                    className="group flex items-center justify-between py-3 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[9px] text-[#ff2d00]/60 tracking-widest">
                        0{i + 1}
                      </span>
                      <span className="font-bebas text-3xl tracking-[0.14em] text-white group-hover:text-[#ff2d00] transition-colors duration-200">
                        {link.title}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-white/20 group-hover:text-[#ff2d00] transition-colors duration-200 -rotate-45"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Shop by Category */}
            <div ref={el => (menuCatsRef.current[0] = el)} className="mb-8">
              <p className="text-[9px] font-mono tracking-[0.5em] text-white/25 uppercase mb-4">
                Shop by Category
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={closeMenu}
                    className="lg-chip relative flex items-center gap-1.5 px-4 py-2 rounded-full font-bebas text-sm tracking-[0.16em] text-white/75 hover:text-white transition-colors duration-200"
                  >
                    {cat.label}
                    {cat.tag && (
                      <span
                        className="text-[7px] font-mono tracking-widest px-1.5 py-0.5 rounded-full text-[#ff2d00]"
                        style={{ background: 'rgba(255,45,0,0.15)', border: '1px solid rgba(255,45,0,0.25)' }}
                      >
                        {cat.tag}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div ref={el => (menuCatsRef.current[1] = el)} className="mb-8">
              <p className="text-[9px] font-mono tracking-[0.5em] text-white/25 uppercase mb-4">
                Quick Access
              </p>
              <div className="grid grid-cols-3 gap-2">
                {quickLinks.map(ql => (
                  <Link
                    key={ql.label}
                    href={ql.href}
                    onClick={closeMenu}
                    className="lg-card flex flex-col items-center gap-2 py-3 rounded-2xl text-center"
                  >
                    <svg className="w-4 h-4 text-[#ff2d00]" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={ql.icon} />
                    </svg>
                    <span className="font-bebas text-[10px] tracking-[0.14em] text-white/55 leading-tight">
                      {ql.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured drop */}
            <div
              ref={el => (menuCatsRef.current[2] = el)}
              className="lg-featured relative mb-8 rounded-2xl overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <span
                  className="font-mono text-[8px] tracking-[0.4em] uppercase px-2 py-1 rounded-full"
                  style={{
                    color: '#ff2d00',
                    background: 'rgba(255,45,0,0.12)',
                    border: '1px solid rgba(255,45,0,0.25)',
                    boxShadow: '0 1px 0 rgba(255,100,60,0.20) inset',
                  }}
                >
                  New Drop
                </span>
              </div>
              <div className="px-5 py-5">
                <p className="font-bebas text-[11px] tracking-[0.35em] text-white/30 uppercase mb-0.5">
                  Adidas F50
                </p>
                <p className="font-bebas text-2xl tracking-[0.12em] text-white mb-3 leading-tight">
                  Elite Edition<br />2025
                </p>
                <Link
                  href="#shop"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 font-bebas text-[11px] tracking-[0.2em] text-[#ff2d00] hover:text-white transition-colors duration-200"
                >
                  EXPLORE NOW
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Bottom: socials + CTA */}
            <div
              ref={menuBottomRef}
              className="mt-auto pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-[9px] font-mono tracking-[0.45em] uppercase text-white/20 mb-3">
                Follow The Journey
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {socials.map(s => (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.label}
                      className="lg-social w-9 h-9 rounded-xl flex items-center justify-center"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,0.50)">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
                <Link
                  href="#shop"
                  onClick={closeMenu}
                  className="lg-shop-cta flex items-center gap-2 px-5 py-2.5 rounded-xl font-bebas text-[12px] tracking-[0.2em] text-white"
                >
                  SHOP NOW
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;