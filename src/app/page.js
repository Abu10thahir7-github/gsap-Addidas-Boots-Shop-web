'use client';
import Image from 'next/image';
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';
import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero';
import BootSection from '@/Components/BootSection';
import About from '@/Components/About';
import Art from '@/Components/Art';
import BootMenu from '@/Components/BootMenu';
import Reviews from '@/Components/Reviews';
import Stores from '@/Components/StoreLocation';
import Footer from '@/Components/Footer';
import ProductDetail from './productDetails/page';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.registerPlugin(ScrollTrigger, SplitText);
export default function Home() {
  const cursorRef = useRef(null);
  // custom cursor
  useEffect(() => {
    const move = e => {
      if (cursorRef.current)
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: 'power3.out',
        });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <main>
      <div
        ref={cursorRef}
        className="fixed w-[18px] h-[18px] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        style={{ border: '1px solid rgba(255,45,0,0.65)', left: 0, top: 0 }}
      />
      <Hero />
      <BootSection />
      <About />
      <Art />
      <BootMenu />
      <Reviews />
      <Stores />
    </main>
  );
}
