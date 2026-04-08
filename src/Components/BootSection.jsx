'use client';

import { useGSAP } from '@gsap/react';
import gsap, { ScrollTrigger, SplitText } from 'gsap/all';

const boots = [
  { id: 1, name: 'F50 Elite FG', desc: 'Ultralight speed boot for fast attackers', price: '$260' },
  { id: 2, name: 'Messi F50 Elite FG', desc: 'F50 with Messi signature edition', price: '$270' },
  { id: 3, name: 'Predator Elite FG', desc: 'Max control with textured grip zones', price: '$260' },
  {
    id: 4,
    name: 'Predator Elite Laceless FG',
    desc: 'Laceless version for cleaner strike',
    price: '$260',
  },
  {
    id: 5,
    name: 'Predator Pro FT Turf',
    desc: 'Turf-ready Predator for firm surfaces',
    price: '$160',
  },
  {
    id: 6,
    name: 'Copa Pure 2 Elite Knit FG',
    desc: 'Soft knit upper for touch and comfort',
    price: '$230',
  },
  { id: 7, name: 'Copa Pure III FG', desc: 'Latest Copa with refined leather feel', price: '$200' },
  {
    id: 8,
    name: 'Copa Mundial FG',
    desc: 'Classic kangaroo leather, timeless boot',
    price: '$150',
  },
  { id: 9, name: 'X Crazyfast.1 FG', desc: 'Sock-fit collar, lightest X silo', price: '$220' },
  {
    id: 10,
    name: 'Youth Predator Elite FT FG',
    desc: 'Elite control boot for young players',
    price: '$150',
  },
];
gsap.registerPlugin(ScrollTrigger, SplitText);
const leftBoots = boots.slice(0, 5);
const rightBoots = boots.slice(5, 10);

const BootCard = ({ boot, reverse = false }) => (
  <div
    className={`group flex   items-center gap-5 py-6 border-b border-white/10
    hover:border-white/30 transition-all duration-300 cursor-pointer
    ${reverse ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
  >
    {/* Number */}
    <span
      className="text-5xl font-black text-white/10 group-hover:text-white/20
      transition-all duration-300 leading-none w-12 shrink-0 font-[var(--font-modern-negra)]"
    >
      {String(boot.id).padStart(2, '0')}
    </span>

    {/* Info */}
    <div className="flex-1 info-name-des min-w-0">
      <h3
        className="text-white  font-medium text-xl font-bebas tracking-widest leading-tight
        group-hover:text-yellow-400 transition-colors duration-300 truncate"
      >
        {boot.name}
      </h3>
      <p className="text-white/40 text-sm mt-1 leading-snug line-clamp-1">{boot.desc}</p>
    </div>

    {/* Price */}
    <span
      className="shrink-0  info-price font-bebas text-yellow-400 font-medium text-xl tracking-tight
      group-hover:scale-110 transition-transform duration-300 origin-center"
    >
      {boot.price}
    </span>
  </div>
);

const BootsSection = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create('#boots h2', {
      type: 'words',
    });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#boots',
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
      .from('.info-name-des', {
        opacity: 0,
        duration: 0.8,
        ease: 'power1.inOut',
        stagger: 0.05,
      })
      .from('.info-price', {
        opacity: 0,
        duration: 0.8,
        ease: 'power1.inOut',
        stagger: 0.05,
      });
  });
  return (
    <section
      id="boots"
      className="relative w-full min-h-screen bg-transparent overflow-hidden py-24 px-6"
    >
      {/* Background decorative text */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        text-[20vw] font-black text-white/[0.03] select-none pointer-events-none
        whitespace-nowrap font-bebas z-0"
      >
        ADIDAS
      </span>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase font-semibold mb-3">
          Collection
        </p>
        <h2 className="font-modern-negra text-[clamp(3rem,8vw,6rem)] leading-none tracking-widest text-white uppercase">
          Soccer <span className="text-[#FF2D00]">Boots </span>
        </h2>
        <div className="w-16 h-[2px] bg-yellow-400 mx-auto mt-6" />
      </div>

      {/* Two-column grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16">
        {/* Left Column */}
        <div>
          {leftBoots.map(boot => (
            <BootCard key={boot.id} boot={boot} reverse={false} />
          ))}
        </div>

        {/* Divider */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px]
          bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />

        {/* Right Column */}
        <div>
          {rightBoots.map(boot => (
            <BootCard key={boot.id} boot={boot} reverse={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BootsSection;
