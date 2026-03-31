'use client';
import React, { useRef } from 'react';
import Image from 'next/image';

import HeroLeft from '@/../public/assets/hero-left.png';
import HeroRight from '@/../public/assets/hero-right.png';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {

   const videoRef = useRef();
   const isMobile = useMediaQuery({maxWidth:767})
  useGSAP(() => {
    const heroSplit = new SplitText('.title', { type: 'chars, words' });
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

    heroSplit.chars.forEach(char => char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
    });
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.6,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to('.hero-left-boot', { x: 200 }, 0)
      .to('.hero-right-boot', { x: -200 }, 0);


      const startValue = isMobile ? 'top 50%': 'center 60%'
      const endValue = isMobile ? '120% top ': 'bottom top'
  }, []);
  return (
    <>
      <section id="hero" className="relative w-full h-screen">
        <h1 className="font-bebas title text-center text-8xl font-bold text-white pt-2">
          Addidas F50
        </h1>

        {/* Left Image */}
        <Image
          src={HeroLeft}
          className="absolute w-[350px] h-auto left-[-122px] bottom-[272px] hero-left-boot"
          width={1000}
          height={500}
          alt="hero-left"
        />

        {/* Right Image */}
        <Image
          src={HeroRight}
          className="absolute w-[350px] h-auto right-[-122px] bottom-[102px] hero-right-boot"
          width={1000}
          height={500}
          alt="hero-right"
        />
        <div>
          <p className="subtitle absolute top-1/2  ml-9 font-medium text-gray-500 text-2xl">
            BORN FOR SPEED. <br /> BUILT FOR GLORY.
          </p>
          <p className=" subtitle mr-9 text-end font-medium text-gray-500 text-2xl">
            Feel Nothing. <br /> Beat Everyone.
          </p>
        </div>
      </section>
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/video/animation-video.mp4"
          muted
          playsInline
          preload="auto"
        ></video>
      </div>
    </>
  );
};

export default Hero;
