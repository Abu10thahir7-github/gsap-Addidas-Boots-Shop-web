'use client';
import React, { useEffect, useRef, useState } from 'react';
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
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const ctaRef = useRef(null);
  const lineRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ─── GSAP context ──────────────────────────────────────────── */
  useGSAP(() => {
    /* 1. Start hidden */
    gsap.set(navRef.current, { yPercent: -130, opacity: 0 });
    gsap.set(arrowRef.current, { opacity: 0, y: -12 });

    /* 2. Entrance timeline */
    const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'expo.out' } });

    tl
      /* nav pill drops in */
      .to(navRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
      })
      /* progress line expands from center */
      .fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6',
      )
      /* logo slides in */
      .fromTo(logoRef.current, { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, '-=0.5')
      /* links stagger up */
      .fromTo(
        linksRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.07 },
        '-=0.4',
      )
      /* CTA pops in */
      .fromTo(
        ctaRef.current,
        { scale: 0.82, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' },
        '-=0.3',
      );

    if (menuRef.current) {
      gsap.set(menuRef.current, { xPercent: -100, display: 'none' });
    }
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (menuOpen) {
      tl.set(menuRef.current, { display: 'block' })
        .fromTo(menuRef.current, { xPercent: -100 }, { xPercent: 0, duration: 0.45 })
        .fromTo(
          menuItemsRef.current,
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35, stagger: 0.08 },
          '-=0.25',
        );
    } else {
      tl.to(menuItemsRef.current, {
        x: -24,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power2.in',
      })
        .to(menuRef.current, { xPercent: -100, duration: 0.35 }, '-=0.15')
        .set(menuRef.current, { display: 'none' });
    }

    return () => tl.kill();
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  /* ─── Show nav on arrow click ───────────────────────────────── */

  /* ─── Link hover: underline clip-path reveal ────────────────── */
  const onLinkEnter = e => {
    gsap.to(e.currentTarget.querySelector('.link-line'), {
      scaleX: 1,
      transformOrigin: 'left center',
      duration: 0.35,
      ease: 'power3.out',
    });
    gsap.to(e.currentTarget.querySelector('.link-num'), {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: 'power2.out',
    });
    gsap.to(e.currentTarget, { color: '#ffffff', duration: 0.2 });
  };

  const onLinkLeave = e => {
    gsap.to(e.currentTarget.querySelector('.link-line'), {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.28,
      ease: 'power2.in',
    });
    gsap.to(e.currentTarget.querySelector('.link-num'), {
      opacity: 0,
      y: 4,
      duration: 0.2,
      ease: 'power2.in',
    });
    gsap.to(e.currentTarget, { color: 'rgba(255,255,255,0.55)', duration: 0.2 });
  };

  /* ─── CTA hover: white fill wipe up ─────────────────────────── */
  const onCtaEnter = e => {
    gsap.to(e.currentTarget.querySelector('.cta-fill'), {
      scaleY: 1,
      transformOrigin: 'bottom center',
      duration: 0.35,
      ease: 'power3.out',
    });
    gsap.to(e.currentTarget.querySelector('.cta-label'), {
      color: '#000',
      duration: 0.3,
    });
  };

  const onCtaLeave = e => {
    gsap.to(e.currentTarget.querySelector('.cta-fill'), {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.28,
      ease: 'power2.in',
    });
    gsap.to(e.currentTarget.querySelector('.cta-label'), {
      color: '#fff',
      duration: 0.25,
    });
  };

  return (
    <>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50">
        {/* Hairline gradient across the very top */}
        <div
          ref={lineRef}
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
        />

        {/* Pill */}
        <div
          className="hidden md:block"
          style={{
            background: 'rgba(10, 10, 10, 0.72)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.12) inset',
          }}
        >
          <div
            ref={logoRef}
            className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative">
                <Image
                  src={logo}
                  className="object-contain w-6 h-7.5 transition-transform duration-300 group-hover:scale-110"
                  alt="Adidas logo"
                />
              </div>
              <span className="font-bebas text-lg tracking-[0.18em] text-white/80 group-hover:text-white transition-colors duration-200 hidden sm:block">
                ADIDAS
              </span>
            </Link>

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
                      className="link-num absolute top-0 text-[8px] font-mono text-[#ff2d00]/80 tracking-widest leading-none"
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
              className="relative hidden md:block shrink-0 overflow-hidden px-4 py-1.5 rounded-xl cursor-pointer"
              style={{
                border: '1px solid rgba(255,255,255,0.18)',
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
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
          className="absolute z-50 m-5 right-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10"
        >
          <span
            className={`absolute h-0.5 w-5 bg-white transition-transform duration-300 ${
              menuOpen ? 'rotate-45' : '-translate-y-1.5'
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-white transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-white transition-transform duration-300 ${
              menuOpen ? '-rotate-45' : 'translate-y-1.5'
            }`}
          />
        </button>
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 z-50 min-h-screen bg-[#070707]/96 backdrop-blur-xl px-6 py-8 md:hidden overflow-hidden"
          aria-hidden={!menuOpen}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-bebas text-sm uppercase tracking-[0.28em] text-white/70">
              Menu
            </span>
          </div>

          <ul className="space-y-6">
            {navbarLinks.map((link, i) => (
              <li key={`mobile-${link.id}`}>
                <Link
                  ref={el => (menuItemsRef.current[i] = el)}
                  href={link.href || `#${link.id}`}
                  onClick={closeMenu}
                  className="block text-2xl font-bebas uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:text-[#ff2d00]"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
