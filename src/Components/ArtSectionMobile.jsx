"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CARDS } from "../../constants";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ── Art cards data ────────────────────────────────────────────────────────────



// ── Main component ────────────────────────────────────────────────────────────
export default function ArtSection() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const cards = gsap.utils.toArray(".art-card");
      const totalWidth = (CARDS.length - 1) * 100; // vw units offset

      // ── Horizontal scroll pin ───────────────────────────────────────────
      const hScroll = gsap.to(track, {
        x: () => `-${totalWidth}vw`,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth * 8}`,  // scroll length
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // ── Per-card entrance animations ────────────────────────────────────
      cards.forEach((card, i) => {
        const imageEl   = card.querySelector(".art-img");
        const clipEl    = card.querySelector(".art-clip");
        const titleEl   = card.querySelector(".art-title");
        const subEl     = card.querySelector(".art-sub");
        const labelEl   = card.querySelector(".art-label");
        const tagEl     = card.querySelector(".art-tag");
        const noiseEl   = card.querySelector(".art-noise");

        // split title into chars
        const split = new SplitText(titleEl, { type: "chars,lines" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: hScroll,
            start: "left 80%",
            end: "left 20%",
            scrub: 0.6,
          },
        });

        // clip-path reveal on image
        tl.fromTo(
          clipEl,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power3.out", duration: 1 },
          0
        );

        // parallax image scale
        tl.fromTo(
          imageEl,
          { scale: 1.3, y: "6%" },
          { scale: 1, y: "0%", ease: "power2.out", duration: 1 },
          0
        );

        // staggered char reveal
        tl.fromTo(
          split.chars,
          { y: "120%", opacity: 0, rotateX: -90 },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            stagger: 0.025,
            ease: "back.out(1.4)",
            duration: 0.8,
          },
          0.15
        );

        // sub + label fade
        tl.fromTo(
          [subEl, labelEl, tagEl],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, ease: "power2.out", duration: 0.6 },
          0.4
        );

        // noise layer flicker
        tl.fromTo(
          noiseEl,
          { opacity: 0 },
          { opacity: 0.07, ease: "power1.inOut", duration: 0.5 },
          0.1
        );
      });

      // ── Section heading entrance ─────────────────────────────────────────
      const headSplit = new SplitText(".art-section-heading", { type: "chars" });
      gsap.fromTo(
        headSplit.chars,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.05,
          ease: "power3.out",
          duration: 0.9,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: wrapperRef }
  );

  return (
    // Block is mobile-only via md:hidden — remove if you want it everywhere
    <section
      ref={wrapperRef}
      className="relative w-full bg-[#070707] overflow-hidden md:hidden"
      style={{ height: "100svh" }}
    >
      {/* ── Section label (fixed top) ─────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-6">
        <span
          className="art-section-heading font-['Bebas_Neue'] text-[11px] tracking-[0.35em] text-white/40 uppercase"
        >
          Adidas F50 / Art
        </span>
        <span className="font-['Bebas_Neue'] text-[10px] tracking-[0.3em] text-[#FF2D00] uppercase">
          Scroll →
        </span>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/10">
        <div
          ref={progressBarRef}
          className="h-full bg-[#FF2D00] w-0 transition-none"
          style={{ willChange: "width" }}
        />
      </div>

      {/* ── Horizontal track ─────────────────────────────────────────────── */}
      <div
        ref={trackRef}
        className="absolute inset-0 flex"
        style={{ width: `${CARDS.length * 100}vw`, willChange: "transform" }}
      >
        {CARDS.map((card, i) => (
          <ArtCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}

// ── Individual card ───────────────────────────────────────────────────────────
function ArtCard({ card, index }) {
  return (
    <div
      className="art-card relative flex-shrink-0 w-screen h-screen overflow-hidden"
      style={{ background: "#070707" }}
    >
      {/* ── Noise texture overlay ──────────────────────────────────────── */}
      <div
        className="art-noise absolute inset-0 z-20 pointer-events-none opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Ghost index number ──────────────────────────────────────────── */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 font-['Bebas_Neue'] text-[38vw] leading-none text-white/[0.03] select-none pointer-events-none"
        aria-hidden
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* ── Image clip reveal ──────────────────────────────────────────── */}
      <div
        className="art-clip absolute inset-x-0 top-0 h-[62svh] overflow-hidden"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="art-img w-full h-full object-cover object-center scale-125"
          src={card.img}
          alt={card.title}
          draggable={false}
        />

        {/* gradient fade at bottom of image */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5"
          style={{
            background: "linear-gradient(to bottom, transparent, #070707)",
          }}
        />

        {/* accent color tint */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${card.accent}22 0%, transparent 60%)`,
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* ── Card tag pill ──────────────────────────────────────────────── */}
      <div
        className="art-tag absolute z-20 opacity-0"
        style={{ top: "calc(62svh - 20px)", right: "20px" }}
      >
        <span
          className="font-['Bebas_Neue'] text-[10px] tracking-[0.3em] uppercase px-3 py-1"
          style={{
            background: card.accent,
            color: "#070707",
            letterSpacing: "0.25em",
          }}
        >
          {card.tag}
        </span>
      </div>

      {/* ── Text area ──────────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 px-5 pb-12 flex flex-col gap-3"
        style={{ top: "58svh" }}
      >
        {/* label */}
        <p
          className="art-label font-['Bebas_Neue'] text-[10px] tracking-[0.4em] opacity-0"
          style={{ color: card.accent }}
        >
          {card.label}
        </p>

        {/* main title — multiline */}
        <h2
          className="art-title font-['Bebas_Neue'] text-white leading-[0.88] overflow-hidden"
          style={{
            fontSize: "clamp(3.2rem, 18vw, 5rem)",
            whiteSpace: "pre-line",
            perspective: "600px",
          }}
        >
          {card.title}
        </h2>

        {/* divider */}
        <div
          className="w-8 h-[1.5px]"
          style={{ background: card.accent }}
        />

        {/* sub text */}
        <p
          className="art-sub text-white/50 font-['Poppins'] text-[12px] leading-relaxed opacity-0 max-w-[80%]"
        >
          {card.sub}
        </p>

        {/* CTA */}
        <button
          className="art-sub self-start mt-1 font-['Bebas_Neue'] text-[11px] tracking-[0.35em] uppercase px-4 py-2 border opacity-0"
          style={{
            borderColor: card.accent,
            color: card.accent,
          }}
        >
          Explore →
        </button>
      </div>

      {/* ── Vertical accent line ───────────────────────────────────────── */}
      <div
        className="absolute left-5 z-20 w-[1px]"
        style={{
          top: "62svh",
          height: "30px",
          background: `linear-gradient(to bottom, ${card.accent}, transparent)`,
        }}
      />
    </div>
  );
}
