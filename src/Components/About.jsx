'use client';
import React from 'react';
import Image from 'next/image';
import image1 from '../../public/assets/images/Adidas F50 ads.jpg';
import image2 from '../../public/assets/images/adidas Predator Poster.jpg';
import image3 from '../../public/assets/images/adidas Roteiro.jpg';
import image4 from '../../public/assets/images/adidas Sparkfusion.jpg';
import image5 from '../../public/assets/images/Football Professional.jpg';
import image6 from '../../public/assets/images/Ice Cold.jpg';
import image7 from '../../public/assets/images/Predetor.jpg';
import { useGSAP } from '@gsap/react';
import gsap, { ScrollTrigger, SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText); // ✅ register both
const About = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create('#about h2', {
      type: 'words',
    });
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center',
      },
    });
    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        xPercent: 100,
        duration: 0.5,
        ease: 'expo.out',
        stagger: 0.06,
      })
      .from('.subtitle', {
        opacity: 0,
        xPercent: 100,
        duration: 0.5,
        ease: 'expo.out',
        stagger: 0.06,
      })
      .from('.topGrid div, .bottomGrid div', {
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
        stagger: 0.05,
      });
  });
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 md:px-0">
      {/* Section Heading */}
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-none tracking-widest text-white uppercase">
          The <span className="text-[#FF2D00]">Legacy</span>
        </h2>
        <p className="subtitle hidden md:block text-white/40 text-xs tracking-[0.3em] uppercase pb-3">
          Adidas F50 · Since 2004
        </p>
      </div>

      {/* Top Grid */}
      <div className="topGrid grid  md:grid-cols-1 xl:grid-cols-12 gap-4 mb-4">
        {/* Card 1 */}
        <div className="md:col-span-3 rounded-3xl overflow-hidden h-72 relative group">
          <div className="noisy z-10" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
          <Image
            className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
            width={500}
            height={500}
            src={image1}
            alt="Speed"
          />
          {/* Label */}
          <div className="absolute bottom-0 left-0 p-5 z-30">
            <span className="block text-[10px] tracking-[0.3em] text-[#FF2D00] uppercase mb-1">
              01 · Design
            </span>
            <h3 className="font-bebas text-3xl text-white leading-none tracking-wider">
              Engineered
              <br />
              Speed
            </h3>
          </div>
        </div>

        {/* Card 2 — Wide Video */}
        <div className="md:col-span-6 rounded-3xl overflow-hidden h-72 relative group">
          <div className="noisy z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 z-20" />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src="/assets/video/PredetorVideo.mp4"
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          {/* Center badge */}
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <span className="border border-white/20 backdrop-blur-sm bg-white/5 text-white/80 text-[10px] tracking-[0.4em] uppercase px-4 py-2 rounded-full">
              Predator Legacy
            </span>
          </div>
          {/* Bottom label */}
          <div className="absolute bottom-0 left-0 p-5 z-30">
            <span className="block text-[10px] tracking-[0.3em] text-[#FF2D00] uppercase mb-1">
              02 · Film
            </span>
            <h3 className="font-bebas text-4xl text-white leading-none tracking-wider">
              Born To
              <br />
              Dominate
            </h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="md:col-span-3 rounded-3xl overflow-hidden h-72 relative group">
          <div className="noisy z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
          <Image
            className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
            width={500}
            height={500}
            src={image2}
            alt="Fit"
          />
          <div className="absolute bottom-0 left-0 p-5 z-30">
            <span className="block text-[10px] tracking-[0.3em] text-[#FF2D00] uppercase mb-1">
              03 · Fit
            </span>
            <h3 className="font-bebas text-3xl text-white leading-none tracking-wider">
              Precision
              <br />
              Fit
            </h3>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="bottomGrid grid grid-cols-2 md:grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Card 4 — Video */}
        <div className="md:col-span-3 rounded-3xl overflow-hidden h-72 relative group">
          <div className="noisy z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src="/assets/video/F50 Video.mp4"
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 p-5 z-30">
            <span className="block text-[10px] tracking-[0.3em] text-[#FF2D00] uppercase mb-1">
              04 · Film
            </span>
            <h3 className="font-bebas text-3xl text-white leading-none tracking-wider">
              F50 In
              <br />
              Action
            </h3>
          </div>
        </div>

        {/* Card 5 */}
        <div className="md:col-span-3 rounded-3xl overflow-hidden h-72 relative group">
          <div className="noisy z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
          <Image
            className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
            width={500}
            height={500}
            src={image3}
            alt="Game"
          />
          <div className="absolute bottom-0 left-0 p-5 z-30">
            <span className="block text-[10px] tracking-[0.3em] text-[#FF2D00] uppercase mb-1">
              05 · Game
            </span>
            <h3 className="font-bebas text-3xl text-white leading-none tracking-wider">
              Game
              <br />
              Ready
            </h3>
          </div>
        </div>

        {/* Card 6 */}
        <div className="md:col-span-3 rounded-3xl overflow-hidden h-72 relative group">
          <div className="noisy z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
          <Image
            className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
            width={500}
            height={500}
            src={image4}
            alt="Street"
          />
          <div className="absolute bottom-0 left-0 p-5 z-30">
            <span className="block text-[10px] tracking-[0.3em] text-[#FF2D00] uppercase mb-1">
              06 · Style
            </span>
            <h3 className="font-bebas text-3xl text-white leading-none tracking-wider">
              Street To
              <br />
              Pitch
            </h3>
          </div>
        </div>

        {/* Card 7 */}
        <div className="md:col-span-3 rounded-3xl overflow-hidden h-72 relative group">
          <div className="noisy z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
          <Image
            className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
            width={500}
            height={500}
            src={image5}
            alt="Beyond"
          />
          <div className="absolute bottom-0 left-0 p-5 z-30">
            <span className="block text-[10px] tracking-[0.3em] text-[#FF2D00] uppercase mb-1">
              07 · Vision
            </span>
            <h3 className="font-bebas text-3xl text-white leading-none tracking-wider">
              Beyond
              <br />
              Limits
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
