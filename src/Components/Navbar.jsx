'use client';
import React, { useRef } from 'react';
import { navbarLinks } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import logo from '@/../public/assets/images/logo.png';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    let lastScrollY = 0;

    // Entrance animation on load
    gsap.fromTo(
      navRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.2, ease: 'power3.out', delay: 0.1 },
    );

    // Hide on scroll down / show on scroll up
    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: self => {
        const currentScrollY = self.scroll();
        const isScrollingDown = currentScrollY > lastScrollY;
        const isPastThreshold = currentScrollY > 80;

        if (isScrollingDown && isPastThreshold) {
          gsap.to(navRef.current, {
            yPercent: -320,
            duration: 0.5,
            ease: 'power2.inOut',
            overwrite: 'auto',
          });
        } else {
          gsap.to(navRef.current, {
            yPercent: 0,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }

        lastScrollY = currentScrollY;
      },
    });
  });

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[999] px-6 py-3">
      {/*
        Liquid glass container — mimics Apple iOS 26 glass pill
        Key properties:
          backdrop-filter: blur + saturate  → frosted glass
          background: white at ~8%          → tinted translucency
          border: white at ~18%             → edge highlight
          box-shadow inner highlight        → depth illusion
      */}
      <div
        className="max-w-4xl mx-auto flex items-center justify-between
                   rounded-2xl px-5 py-3"
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
        {/* Logo / Brand */}
        <a href="#home" className="flex items-center gap-2 group">
          <Image
            src={logo}
            className="object-contain w-[28px] h-[36px] drop-shadow-md
                       transition-transform duration-300 group-hover:scale-110"
            alt="Adidas logo"
          />
          <span
            className="font-bebas text-xl tracking-[0.12em] text-white/90
                       transition-colors duration-200 group-hover:text-white"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
          >
            ADIDAS
          </span>
        </a>

        {/* Nav Links */}
        <ul className="flex items-center gap-1">
          {navbarLinks.map(link => (
            <li key={link.id}>
              <a
                href={`/${link.id}`}
                className="relative font-bebas text-sm tracking-[0.1em]
                           text-white/75 hover:text-white
                           px-3 py-1.5 rounded-xl
                           transition-all duration-200
                           hover:bg-white/10
                           active:bg-white/15
                           group"
                style={{
                  textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                }}
              >
                {link.title}

                {/* Active/hover underline dot */}
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2
                             w-1 h-1 rounded-full bg-white/0
                             group-hover:bg-white/60
                             transition-all duration-200"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button — pill glass style */}
        <a
          href="#shop"
          className="font-bebas text-sm tracking-[0.12em] text-white
                     px-4 py-1.5 rounded-xl
                     transition-all duration-200
                     active:scale-95"
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
  );
};

export default Navbar;
