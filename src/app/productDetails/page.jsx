'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import AnimatedButton from '@/Components/UI/AnimatedButton';
import { useParams } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger, SplitText);

const product = {
  id: 1,
  name: 'F50 Elite',
  fullName: 'Adidas F50 Elite FG/AG',
  collection: 'Pure Victory Pack',
  category: 'Speed',
  colorway: 'Solar Yellow / Core Black / Solar Red',
  colorHex: '#FFD600',
  price: 280,
  badge: 'New',
  rating: 4.9,
  reviews: 312,
  wornBy: 'Lamine Yamal',
  year: '2025',
  surface: ['FG', 'AG'],
  weight: '165g',
  sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
  images: [
    'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/8eba1050b38d443fadb574323e7c60ae_9366/F50_ELITE_Laceless_Firm_Ground_Soccer_Cleats_Blue_JR6461_HM1.jpg',
    'https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/19c6e4e0e870465ca29d40eea586f7e5_faec/F50_ELITE_Laceless_Firm_Ground_Soccer_Cleats_Blue_JR6461_HM3_hover.tiff.jpg',
    'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/82b6867d4aef41508ea567787121154d_9366/F50_ELITE_Laceless_Firm_Ground_Soccer_Cleats_Blue_JR6461_HM4_hover.jpg',
    'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/27dac5182de747e188884bb6a29fa4ed_9366/F50_ELITE_Laceless_Firm_Ground_Soccer_Cleats_Blue_JR6461_HM5.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e58771260a474ddd8313463bfe95d0d4_9366/F50_ELITE_Laceless_Firm_Ground_Soccer_Cleats_Blue_JR6461_HM7.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/957178c88c784dafbf18fc70bd594b11_9366/F50_ELITE_Laceless_Firm_Ground_Soccer_Cleats_Blue_JR6461_HM8.jpg',
    'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/d35b6da17f0f4a7fb8766f6019b19e5a_9366/F50_ELITE_Laceless_Firm_Ground_Soccer_Cleats_Blue_JR6461_HM9.jpg',
    'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/35606e0718aa4a6294e31c04d3f86bed_9366/F50_ELITE_Laceless_Firm_Ground_Soccer_Cleats_Blue_JR6461_HM10.jpg',
    'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/42d437ff816d45e499d434b67abe27e1_9366/F50_ELITE_Laceless_Firm_Ground_Soccer_Cleats_Blue_JR6461_HM11.jpg',
  ],
  description:
    'The next generation of pure speed. The F50 Elite is obsessively engineered for explosive acceleration — a featherlight Sprintweb upper wraps the foot in a locked-in second-skin fit, while the revolutionary Aerocage structure keeps every transfer of energy heading forward.',
  technology: [
    {
      name: 'Sprintweb Upper',
      desc: 'A mono-material mesh removes every unnecessary gram while maintaining structural integrity at high speed.',
      icon: '⚡',
      num: '01',
    },
    {
      name: 'Aerocage Structure',
      desc: 'Precision-placed reinforcements channel energy directly into the ground strike for maximum propulsion.',
      icon: '◈',
      num: '02',
    },
    {
      name: 'Sprintframe Soleplate',
      desc: 'Asymmetric stud layout mirrors the natural sprint gait, maximising traction at full pace.',
      icon: '◎',
      num: '03',
    },
    {
      name: 'Second-Skin Fit',
      desc: 'A low-profile last hugs the foot anatomy to eliminate dead space and prevent slippage.',
      icon: '◇',
      num: '04',
    },
  ],
  specs: [
    { label: 'Upper', value: 'Sprintweb Mono-Mesh' },
    { label: 'Soleplate', value: 'Sprintframe FG/AG' },
    { label: 'Weight', value: '165g (UK 8.5)' },
    { label: 'Closure', value: 'Lace' },
    { label: 'Surface', value: 'Firm Ground · Artificial Grass' },
    { label: 'Stud Shape', value: 'Conical + Bladed Hybrid' },
    { label: 'Fit', value: 'True to size' },
    { label: 'Made In', value: 'Vietnam' },
  ],
  reviewList: [
    {
      name: 'Marco V.',
      rating: 5,
      country: '🇮🇹',
      boot: 'UK 9',
      text: "Lightest boot I've worn. First touch felt sharper and more responsive. Worth every penny.",
      date: 'Apr 2025',
    },
    {
      name: 'Seo J.',
      rating: 5,
      country: '🇰🇷',
      boot: 'UK 8',
      text: 'Lockdown from the Aerocage is insane. Zero heel slip even cutting at full pace.',
      date: 'Mar 2025',
    },
    {
      name: 'Priya R.',
      rating: 5,
      country: '🇮🇳',
      boot: 'UK 7',
      text: 'True to size and comfortable straight out of the box. Solar yellow colorway is stunning in person.',
      date: 'Mar 2025',
    },
    {
      name: 'James K.',
      rating: 4,
      country: '🇬🇧',
      boot: 'UK 10',
      text: 'Incredible for speed but the upper runs slightly narrow. Go half a size up for wide feet.',
      date: 'Feb 2025',
    },
  ],
  related: [
    {
      id: 2,
      name: 'Predator 25 Elite',
      price: 300,
      colorHex: '#FF2D00',
      badge: 'New',
      img: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/c0ba7bbb8746456e951dea23e3b6f001_9366/F50_Sparkfusion_Elite_Mid_Cut_Firm_Ground_-_Artificial_Grass_Soccer_Cleats_White_KJ1435_HM1.jpg',
    },
    {
      id: 3,
      name: 'Copa Pure 3 Elite',
      price: 260,
      colorHex: '#F5F5F5',
      badge: 'Sale',
      img: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/22a0b960972443fc96280a91db3da040_9366/F50_SPARKFUSION_ELITE_Mid_Cut_Firm_Ground_-_Artificial_Ground_Soccer_Cleats_Womens_Blue_JR6476_HM1.jpg',
    },
    {
      id: 4,
      name: 'F50 Road to Glory',
      price: 300,
      colorHex: '#d4a017',
      badge: 'Limited',
      img: 'https://assets.adidas.com/images/w_85,h_85,f_auto,q_auto,fl_lossy,c_fill,g_auto/cf16a3ff20a84f4cab3c4a78a12b7c4a_9366/F50_Sparkfusion_Elite_Mid_Firm_Ground-Artificial_Grass_Cleats_Orange_JH7647_HM1.jpg',
    },
    {
      id: 5,
      name: 'F50 Heartbreaker',
      price: 285,
      colorHex: '#FF6BB0',
      badge: 'Signature',
      img: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/de7b196e04d242f7a9ddd4b804f3791a_9366/COPA_PURE_IV_ELITE_Firm_Ground_Soccer_Cleats_Brown_JS4243_HM1.jpg',
    },
  ],
};

const Stars = ({ rating, size = 10 }) => (
  <div className="flex gap-0.5 items-center">
    {[1, 2, 3, 4, 5].map(i => (
      <svg key={i} width={size} height={size} viewBox="0 0 10 10">
        <polygon
          points="5,1 6.2,3.8 9.5,3.8 6.9,5.7 7.9,8.5 5,6.8 2.1,8.5 3.1,5.7 0.5,3.8 3.8,3.8"
          fill={i <= Math.round(rating) ? '#FF2D00' : 'rgba(255,255,255,0.1)'}
        />
      </svg>
    ))}
  </div>
);

export default function ProductDetail() {
  const params = useParams();
  const id = Number(params.id);

  const product = products.find(p => p.id === id);
  const pageRef = useRef(null);
  const cursorRef = useRef(null);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('tech');
  const [sizeGuide, setSizeGuide] = useState(false);
  const [imgZoom, setImgZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleImgMouseMove = e => {
    if (!imgZoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      gsap.to('.size-section', {
        keyframes: [{ x: -6 }, { x: 6 }, { x: -4 }, { x: 4 }, { x: 0 }],
        duration: 0.35,
      });
      return;
    }
    gsap
      .timeline()
      .to('.add-btn', { scale: 0.95, duration: 0.1 })
      .to('.add-btn', { scale: 1, duration: 0.25, ease: 'back.out(2)' });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const switchImage = i => {
    if (i === activeImg) return;
    gsap
      .timeline()
      .to('.main-img', { opacity: 0, scale: 0.96, duration: 0.18, ease: 'power2.in' })
      .call(() => setActiveImg(i))
      .to('.main-img', { opacity: 1, scale: 1, duration: 0.32, ease: 'power3.out' });
  };

  useGSAP(
    () => {
      // entrance
      gsap.from('.breadcrumb', { y: -18, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.from('.product-img-wrap', {
        scale: 0.93,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        delay: 0.1,
      });

      gsap.from('.detail-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.25,
      });

      const ns = new SplitText('.product-name', { type: 'chars' });
      gsap.from(ns.chars, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.022,
        duration: 0.7,
        ease: 'expo.out',
        delay: 0.35,
      });

      const els = [
        '.meta-row',
        '.price-row',
        '.color-row',
        '.size-section',
        '.qty-row',
        '.cta-row',
        '.chips-row',
      ];
      els.forEach((sel, i) =>
        gsap.from(sel, {
          y: 18,
          opacity: 0,
          duration: 0.55,
          ease: 'power3.out',
          delay: 0.5 + i * 0.08,
        }),
      );

      gsap.from('.h-line', {
        scaleX: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.55,
        transformOrigin: 'left',
      });
      gsap.from('.v-line', {
        scaleY: 0,
        duration: 1.5,
        ease: 'power4.out',
        transformOrigin: 'top',
      });

      // scroll sections
      gsap.from('.tech-card', {
        scrollTrigger: { trigger: '.tech-grid', start: 'top 80%' },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.4)',
      });
      gsap.from('.spec-row', {
        scrollTrigger: { trigger: '.specs-table', start: 'top 80%' },
        x: -20,
        opacity: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.from('.review-card', {
        scrollTrigger: { trigger: '.reviews-grid', start: 'top 80%' },
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      });
      gsap.from('.related-card', {
        scrollTrigger: { trigger: '.related-grid', start: 'top 85%' },
        scale: 0.93,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(1.3)',
      });

      document.querySelectorAll('.sec-title').forEach(el => {
        const s = new SplitText(el, { type: 'chars' });
        gsap.from(s.chars, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          yPercent: 110,
          opacity: 0,
          stagger: 0.02,
          duration: 0.7,
          ease: 'expo.out',
        });
      });
    },
    { scope: pageRef },
  );
  if (!product) {
    return <div className="text-white p-10">Product not found</div>;
  }
  return (
    <>
      {/* cursor ring */}
      <div
        ref={cursorRef}
        className="fixed w-[18px] h-[18px] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        style={{ border: '1px solid rgba(255,45,0,0.65)', left: 0, top: 0 }}
      />

      <div ref={pageRef} className="min-h-screen bg-[#070707] overflow-hidden">
        {/* NAV */}
        <nav
          className="sticky top-0 z-50 h-14 flex items-center justify-between px-5 md:px-12"
          style={{
            background: 'rgba(7,7,7,0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-[3px] items-end">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{ height: `${11 + i * 3}px`, background: i === 2 ? '#FF2D00' : '#fff' }}
                />
              ))}
            </div>
            <span
              className="text-white text-xl tracking-[0.25em] uppercase"
              style={{ fontFamily: 'var(--bebas)' }}
            >
              F50 STORE
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Collections', 'Athletes', 'Stories', 'Stores'].map(n => (
              <a
                key={n}
                href="#"
                className="text-white/30 hover:text-white transition-colors text-[10px] tracking-[0.2em] uppercase"
                onClick={e => e.preventDefault()}
              >
                {n}
              </a>
            ))}
          </div>
          <button
            className="flex items-center font-bebas gap-2 bg-[#FF2D00] hover:bg-[#cc2400] transition-colors rounded-full px-4 py-1.5"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.3em',
              color: '#fff',
            }}
          >
            Cart · 0
          </button>
        </nav>

        {/* BREADCRUMB */}
        <div className="breadcrumb flex items-center gap-2 px-5 md:px-12 py-4 flex-wrap">
          {['Home', 'Shop', 'Speed', 'F50 Elite'].map((b, i, arr) => (
            <span key={b} className="flex items-center gap-2">
              <a
                href="#"
                className={`text-[10px] tracking-[0.25em] uppercase transition-colors ${i === arr.length - 1 ? 'text-[#FF2D00]' : 'text-white/25 hover:text-white/50'}`}
                onClick={e => e.preventDefault()}
              >
                {b}
              </a>
              {i < arr.length - 1 && <span className="text-white/15 text-[10px]">/</span>}
            </span>
          ))}
        </div>

        {/* ═══════════ HERO SPLIT ═══════════ */}
        <section
          className="pdp-grid grid grid-cols-1 lg:grid-cols-2 gap-0"
          style={{ maxWidth: 1440, margin: '0 auto', minHeight: '92vh' }}
        >
          {/* LEFT — gallery */}
          <div className="relative flex flex-col lg:flex-row gap-4 p-5 md:p-10">
            {/* thumbs */}
            <div className="flex lg:flex-col gap-3 order-2 lg:order-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => switchImage(i)}
                  className={`thumb-item flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'active' : 'border-white/[0.07]'}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <img src={img} alt="" className="w-full h-full object-contain " />
                </button>
              ))}
            </div>

            {/* main image */}
            <div
              className="product-img-wrap order-1 lg:order-2 flex-1 relative rounded-3xl overflow-hidden select-none cursor-crosshair"
              style={{ background: 'linear-gradient(135deg,#111,#0a0a0a)', minHeight: 460 }}
              onClick={() => setImgZoom(z => !z)}
              onMouseMove={handleImgMouseMove}
              onMouseLeave={() => setImgZoom(false)}
            >
              {/* badge */}
              <span
                className="absolute top-4 left-4 z-10 text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full"
                style={{
                  fontFamily: 'var(--bebas)',
                  background: 'rgba(255,45,0,0.15)',
                  color: '#FF2D00',
                  border: '1px solid rgba(255,45,0,0.3)',
                }}
              >
                {product.badge}
              </span>

              {/* zoom hint */}
              <span
                className="absolute top-4 right-4 z-10 text-[9px] tracking-[0.2em] uppercase px-3 py-1 rounded-full text-white/30 border border-white/10"
                style={{ fontFamily: 'var(--bebas)' }}
              >
                {imgZoom ? 'Zoomed' : 'Zoom ↗'}
              </span>

              {/* color swatch */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{
                    background: product.colorHex,
                    boxShadow: `0 0 8px ${product.colorHex}60`,
                  }}
                />
                <span
                  className="text-[9px] tracking-[0.2em] text-white/30 uppercase"
                  style={{ fontFamily: 'var(--bebas)' }}
                >
                  {product.colorway.split('/')[0].trim()}
                </span>
              </div>

              {/* image */}
              <div
                className="w-full h-full transition-transform duration-300"
                style={
                  imgZoom
                    ? { transform: `scale(2)`, transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                    : {}
                }
              >
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="main-img w-full h-full object-contain "
                  style={{ filter: 'drop-shadow(0 30px 60px rgba(255,45,0,0.1))' }}
                />
              </div>

              {/* ghost F50 */}
              <span
                className="absolute bottom-6 right-6 pointer-events-none select-none"
                style={{
                  fontFamily: 'var(--bebas)',
                  fontSize: '5rem',
                  lineHeight: 1,
                  WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                  color: 'transparent',
                }}
              >
                F50
              </span>
            </div>

            {/* v-line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <line
                className="v-line"
                x1="3%"
                y1="0"
                x2="1%"
                y2="100%"
                stroke="#FF2D00"
                strokeWidth="0.6"
                strokeOpacity="0.14"
              />
            </svg>
          </div>

          {/* RIGHT — details */}
          <div
            className="flex flex-col justify-center px-5 md:px-10 lg:px-14 py-10 lg:py-0
            border-l border-white/[0.06] relative overflow-hidden"
          >
            {/* bg glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 80% 50%,rgba(255,45,0,0.04),transparent)',
              }}
            />

            <div className="relative z-10 flex flex-col gap-6 max-w-xl">
              {/* eyebrow */}
              <div className="detail-eyebrow flex items-center gap-3">
                <div className="w-3 h-px bg-[#FF2D00]" />
                <span
                  className="text-[#FF2D00] text-[10px] tracking-[0.5em] uppercase"
                  style={{ fontFamily: 'var(--bebas)' }}
                >
                  {product.collection}
                </span>
                <span
                  className="text-white/20 text-[10px] tracking-[0.3em]"
                  style={{ fontFamily: 'var(--bebas)' }}
                >
                  · {product.year}
                </span>
              </div>

              {/* name */}
              <div className="overflow-hidden">
                <h1
                  className="product-name font-bebas leading-[0.85] uppercase"
                  style={{ fontFamily: 'var(--bebas)', fontSize: 'clamp(3.5rem,7vw,6rem)' }}
                >
                  <span className="block text-white">{product.name}</span>
                </h1>
                <p className="   text-white/25 text-xs tracking-[0.25em] uppercase mt-2">
                  {product.fullName}
                </p>
              </div>

              {/* meta */}
              <div className="meta-row flex items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Stars rating={product.rating} size={11} />
                  <span className="text-white/60 text-xs tracking-wider">{product.rating}</span>
                  <span className="text-white/25 text-xs">({product.reviews})</span>
                </div>
                {product.wornBy && (
                  <div
                    className="flex items-center gap-2 rounded-full px-3 py-1"
                    style={{
                      background: 'rgba(212,160,23,0.08)',
                      border: '1px solid rgba(212,160,23,0.25)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a017]" />
                    <span
                      className="text-[#d4a017] text-[9px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: 'var(--bebas)' }}
                    >
                      Worn by {product.wornBy}
                    </span>
                  </div>
                )}
              </div>

              {/* price */}
              <div className="price-row flex items-end gap-4">
                <span
                  className="leading-none font-bebas text-white"
                  style={{
                    fontFamily: 'var(--bebas)',
                    fontSize: 'clamp(2.5rem,5vw,4rem)',
                    letterSpacing: '0.04em',
                  }}
                >
                  ${product.price}
                </span>
                <div className="flex gap-2 mb-1 flex-wrap">
                  {product.surface.map(s => (
                    <span
                      key={s}
                      className="text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full text-white/40 border border-white/10"
                      style={{ fontFamily: 'var(--bebas)' }}
                    >
                      {s}
                    </span>
                  ))}
                  <span
                    className="text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full text-white/40 border border-white/10"
                    style={{ fontFamily: 'var(--bebas)' }}
                  >
                    {product.weight}
                  </span>
                </div>
              </div>

              {/* divider */}
              <div
                className="h-line h-px origin-left"
                style={{ background: 'linear-gradient(to right,rgba(255,45,0,0.5),transparent)' }}
              />

              {/* color */}
              <div className="color-row">
                <p
                  className="text-[9px] tracking-[0.4em] uppercase text-white/25 mb-3"
                  style={{ fontFamily: 'var(--bebas)' }}
                >
                  Color · <span className="text-white/45">{product.colorway}</span>
                </p>
                <div className="flex gap-2.5">
                  {[
                    ['#FFD600', 'Solar Yellow'],
                    ['#FF2D00', 'Lucid Red'],
                    ['#1a1a1a', 'Core Black'],
                  ].map(([hex, label]) => (
                    <button
                      key={label}
                      title={label}
                      className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                      style={{
                        background: hex,
                        borderColor: hex === product.colorHex ? '#fff' : 'transparent',
                        boxShadow: hex === product.colorHex ? `0 0 10px ${hex}60` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* sizes */}
              <div className="size-section">
                <div className="flex items-center justify-between mb-3">
                  <p
                    className="text-[9px] tracking-[0.4em] uppercase text-white/25"
                    style={{ fontFamily: 'var(--bebas)' }}
                  >
                    Select Size (UK)
                    {!selectedSize && <span className="text-[#FF2D00] ml-1">*</span>}
                  </p>
                  <button
                    onClick={() => setSizeGuide(true)}
                    className="text-[9px] tracking-[0.3em] uppercase text-[#FF2D00]/60 hover:text-[#FF2D00] transition-colors underline underline-offset-2"
                    style={{ fontFamily: 'var(--bebas)' }}
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`size-btn font-bebas w-[46px] h-[38px] rounded-lg text-sm border transition-all ${selectedSize === sz ? 'sel' : 'border-white/10 bg-white/[0.03] text-white/40'}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* qty */}
              <div className="qty-row flex items-center gap-4">
                <p
                  className="text-[9px] tracking-[0.4em] uppercase text-white/25"
                  style={{ fontFamily: 'var(--bebas)' }}
                >
                  Qty
                </p>
                <div className="flex items-center gap-4 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="text-white/40 hover:text-white text-lg leading-none transition-colors w-5 text-center"
                  >
                    −
                  </button>
                  <span
                    className="text-white font-bebas min-w-[1.5rem] text-center"
                    style={{ fontFamily: 'var(--bebas)', fontSize: '1.2rem' }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="text-white/40 hover:text-white text-lg leading-none transition-colors w-5 text-center"
                  >
                    +
                  </button>
                </div>
                {!selectedSize && (
                  <span
                    className="text-[10px] tracking-[0.15em] text-[#FF2D00]/60 uppercase"
                    style={{ fontFamily: 'var(--bebas)' }}
                  >
                    Select size first
                  </span>
                )}
              </div>

              {/* cta */}
              <div className="cta-row flex gap-3">
                <AnimatedButton
                  onClick={handleAddToCart}
                  className="add-btn flex-1 flex items-center justify-center gap-2 text-white rounded-xl py-4"
                  style={{
                    background: addedToCart ? ' ' : '',
                    border: addedToCart ? '1px solid rgba(52,211,153,0.45)' : 'none',
                    fontFamily: 'var(--bebas)',
                    fontSize: '0.95rem',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    boxShadow: '0 6px 24px rgba(255,45,0,0.2)',
                  }}
                  Parentstyle={{}}
                >
                  {addedToCart ? (
                    <>
                      <span className="text-emerald-400">✓</span>
                      <span className="text-emerald-400">Added to Bag</span>
                    </>
                  ) : (
                    'Add to Bag →'
                  )}
                </AnimatedButton>

                <button
                  onClick={() => setWishlisted(w => !w)}
                  className="w-14 h-14 rounded-xl flex items-center justify-center border text-lg transition-all hover:scale-105"
                  style={{
                    background: wishlisted ? 'rgba(255,45,0,0.12)' : 'rgba(255,255,255,0.04)',
                    borderColor: wishlisted ? 'rgba(255,45,0,0.5)' : 'rgba(255,255,255,0.1)',
                    color: wishlisted ? '#FF2D00' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {wishlisted ? '♥' : '♡'}
                </button>
              </div>

              {/* chips */}
              <div className="chips-row flex gap-4 flex-wrap">
                {[
                  ['🚚', 'Free shipping over $150'],
                  ['↩', '30-day returns'],
                  ['✓', 'Authenticity guaranteed'],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 text-white/30 text-[10px] tracking-[0.05em]"
                  >
                    <span className="text-xs">{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ STICKY TABS ═══════════ */}
        <div
          className="sticky top-14 z-40 border-b border-white/[0.06]"
          style={{ background: 'rgba(7,7,7,0.96)', backdropFilter: 'blur(20px)' }}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-12 flex overflow-x-auto scrollbar-none">
            {[
              ['tech', 'Technology'],
              ['specs', 'Specifications'],
              ['reviews', 'Reviews'],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="tab-btn relative px-6 py-4 whitespace-nowrap transition-colors"
                style={{
                  fontFamily: 'var(--bebas)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: activeTab === key ? '#fff' : 'rgba(255,255,255,0.3)',
                }}
              >
                {label}
                {activeTab === key && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF2D00]"
                    style={{ animation: 'fadeUp 0.2s ease' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════ TECHNOLOGY TAB ═══════════ */}
        {activeTab === 'tech' && (
          <section className="max-w-7xl mx-auto px-5 md:px-12 py-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-1 rounded-full bg-[#FF2D00]" />
              <span
                className="text-[#FF2D00] text-[10px] tracking-[0.5em] uppercase"
                style={{ fontFamily: 'var(--bebas)' }}
              >
                What's Inside
              </span>
            </div>
            <div className="overflow-hidden mb-10">
              <h2
                className="sec-title font-bebas leading-[0.88] uppercase"
                style={{ fontFamily: 'var(--bebas)', fontSize: 'clamp(3rem,7vw,6rem)' }}
              >
                <span className="text-white block">Built For</span>
                <span
                  className="block"
                  style={{ WebkitTextStroke: '1.5px #FF2D00', color: 'transparent' }}
                >
                  Speed
                </span>
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 mb-14">
              <p className="text-white/40 text-sm leading-relaxed tracking-wide max-w-xl">
                {product.description}
              </p>
              <div className="flex gap-10 md:ml-auto">
                {[
                  { n: product.weight, l: 'Boot Weight' },
                  { n: '4', l: 'Tech Zones' },
                ].map(({ n, l }) => (
                  <div key={l} className="flex flex-col items-center gap-1">
                    <span
                      className="text-[#FF2D00] font-bebas leading-none"
                      style={{ fontFamily: 'var(--bebas)', fontSize: '2.5rem' }}
                    >
                      {n}
                    </span>
                    <span
                      className="text-[9px] tracking-[0.35em] uppercase text-white/25"
                      style={{ fontFamily: 'var(--bebas)' }}
                    >
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="tech-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.technology.map((t, i) => (
                <div
                  key={t.name}
                  className="tech-card rounded-2xl p-6 relative overflow-hidden"
                  style={{
                    background:
                      i % 2 === 0
                        ? 'linear-gradient(135deg,rgba(255,45,0,0.07),rgba(255,255,255,0.02))'
                        : 'linear-gradient(135deg,rgba(212,160,23,0.07),rgba(255,255,255,0.02))',
                    border: `1px solid ${i % 2 === 0 ? 'rgba(255,45,0,0.15)' : 'rgba(212,160,23,0.15)'}`,
                  }}
                >
                  <span
                    className="absolute bottom-2 right-3 pointer-events-none select-none"
                    style={{
                      fontFamily: 'var(--bebas)',
                      fontSize: '4.5rem',
                      lineHeight: 1,
                      color: i % 2 === 0 ? 'rgba(255,45,0,0.05)' : 'rgba(212,160,23,0.05)',
                    }}
                  >
                    {t.num}
                  </span>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-lg transition-transform duration-300 hover:scale-110 hover:rotate-6"
                    style={{
                      background: i % 2 === 0 ? 'rgba(255,45,0,0.12)' : 'rgba(212,160,23,0.12)',
                      border: `1px solid ${i % 2 === 0 ? 'rgba(255,45,0,0.25)' : 'rgba(212,160,23,0.25)'}`,
                      color: i % 2 === 0 ? '#FF2D00' : '#d4a017',
                    }}
                  >
                    {t.icon}
                  </div>
                  <p
                    className="mb-2 text-[9px] tracking-[0.4em] uppercase"
                    style={{
                      fontFamily: 'var(--bebas)',
                      color: i % 2 === 0 ? 'rgba(255,45,0,0.7)' : 'rgba(212,160,23,0.7)',
                    }}
                  >
                    Zone {t.num}
                  </p>
                  <h4
                    className="text-white font-bebas mb-3 leading-tight"
                    style={{
                      fontFamily: 'var(--bebas)',
                      fontSize: '1.1rem',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {t.name}
                  </h4>
                  <p className="text-white/40 text-xs leading-relaxed tracking-wide">{t.desc}</p>
                  <div
                    className="mt-4 h-px"
                    style={{
                      background: `linear-gradient(to right,${i % 2 === 0 ? '#FF2D00' : '#d4a017'}50,transparent)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════ SPECS TAB ═══════════ */}
        {activeTab === 'specs' && (
          <section className="max-w-7xl mx-auto px-5 md:px-12 py-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-1 rounded-full bg-[#d4a017]" />
              <span
                className="text-[#d4a017] text-[10px] tracking-[0.5em] uppercase"
                style={{ fontFamily: 'var(--bebas)' }}
              >
                Full Details
              </span>
            </div>
            <div className="overflow-hidden mb-12">
              <h2
                className="sec-title font-bebas leading-[0.88] uppercase"
                style={{ fontFamily: 'var(--bebas)', fontSize: 'clamp(3rem,7vw,6rem)' }}
              >
                <span className="text-white block">By The</span>
                <span
                  className="block"
                  style={{ WebkitTextStroke: '1.5px #d4a017', color: 'transparent' }}
                >
                  Numbers
                </span>
              </h2>
            </div>
            <div className="specs-cols specs-table grid grid-cols-1 md:grid-cols-2 gap-x-16">
              {product.specs.map(s => (
                <div
                  key={s.label}
                  className="spec-row flex items-center justify-between py-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span
                    className="text-white/30 text-xs tracking-[0.25em]  "
                    style={{ fontFamily: 'var(--bebas)' }}
                  >
                    {s.label}
                  </span>
                  <span className="text-white  text-sm tracking-wider">{s.value}</span>
                </div>
              ))}
            </div>
            {/* size chart */}
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-1 rounded-full bg-[#FF2D00]" />
                <span
                  className="text-[#FF2D00] text-[10px] tracking-[0.5em] uppercase"
                  style={{ fontFamily: 'var(--bebas)' }}
                >
                  Size Conversion
                </span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
                <table className="w-full text-center text-xs" style={{ minWidth: 400 }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      {['UK', 'EU', 'US', 'CM'].map(h => (
                        <th
                          key={h}
                          className="py-3 px-4 text-white/30 font-normal tracking-[0.3em] uppercase"
                          style={{ fontFamily: 'var(--bebas)', fontSize: '0.8rem' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['6', '39', '6.5', '24'],
                      ['7', '40.5', '7.5', '25'],
                      ['8', '42', '8.5', '26'],
                      ['9', '43.5', '9.5', '27'],
                      ['10', '44.5', '10.5', '28'],
                      ['11', '46', '11.5', '29'],
                    ].map((row, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                          background: i % 2 ? 'rgba(255,255,255,0.01)' : 'transparent',
                        }}
                      >
                        {row.map((cell, j) => (
                          <td key={j} className="py-3 px-4 text-white/50 font-bebas">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ REVIEWS TAB ═══════════ */}
        {activeTab === 'reviews' && (
          <section className="max-w-7xl mx-auto px-5 md:px-12 py-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-1 rounded-full bg-[#FF2D00]" />
              <span
                className="text-[#FF2D00] text-[10px] tracking-[0.5em] uppercase"
                style={{ fontFamily: 'var(--bebas)' }}
              >
                Real Players · Real Verdict
              </span>
            </div>
            {/* summary */}
            <div className="flex flex-col md:flex-row gap-10 mb-14 items-start">
              <div className="flex flex-col items-center md:items-start gap-2">
                <span
                  className="text-white leading-none"
                  style={{ fontFamily: 'var(--bebas)', fontSize: '6rem' }}
                >
                  {product.rating}
                </span>
                <Stars rating={product.rating} size={14} />
                <span className="text-white/30 text-xs tracking-wider">
                  {product.reviews} verified reviews
                </span>
              </div>
              <div className="flex flex-col gap-2 flex-1 max-w-xs">
                {[5, 4, 3, 2, 1].map(n => {
                  const p = n === 5 ? 78 : n === 4 ? 16 : n === 3 ? 4 : n === 2 ? 1 : 1;
                  return (
                    <div key={n} className="flex items-center gap-3">
                      <span className="text-white/40 font-bebas text-sm w-3">{n}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${p}%`,
                            background: n >= 4 ? '#FF2D00' : 'rgba(255,255,255,0.15)',
                          }}
                        />
                      </div>
                      <span className="text-white/25 font-bebas text-sm w-8 text-right">{p}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="reviews-grid grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviewList.map((r, i) => (
                <div
                  key={i}
                  className="review-card rounded-2xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                        style={{
                          background: 'rgba(255,45,0,0.1)',
                          border: '1px solid rgba(255,45,0,0.2)',
                          fontFamily: 'var(--bebas)',
                          color: '#FF2D00',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {r.name
                          .split(' ')
                          .map(w => w[0])
                          .join('')}
                      </div>
                      <div>
                        <p
                          className="text-white font-bebas text-sm"
                          style={{
                            fontFamily: 'var(--bebas)',
                            fontSize: '1rem',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {r.name}
                        </p>
                        <p className="text-white/25 text-xs">
                          {r.country} · UK {r.boot}
                        </p>
                      </div>
                    </div>
                    <span className="text-white/20 font-bebas text-xs tracking-wider">
                      {r.date}
                    </span>
                  </div>
                  <Stars rating={r.rating} size={10} />
                  <p
                    className="text-white/50 text-sm leading-relaxed tracking-wide mt-3"
                    style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}
                  >
                    "{r.text}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════ RELATED ═══════════ */}
        <section className="border-t border-white/[0.06] py-20 px-5 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-1 rounded-full bg-[#d4a017]" />
              <span
                className="text-[#d4a017] text-[10px] tracking-[0.5em] uppercase"
                style={{ fontFamily: 'var(--bebas)' }}
              >
                Complete The Kit
              </span>
            </div>
            <div className="overflow-hidden mb-8">
              <h2
                className="sec-title font-bebas text-white leading-[0.88] uppercase"
                style={{ fontFamily: 'var(--bebas)', fontSize: 'clamp(2.5rem,5vw,5rem)' }}
              >
                You May
                <br />
                <span style={{ WebkitTextStroke: '1.5px #d4a017', color: 'transparent' }}>
                  Also Like
                </span>
              </h2>
            </div>
            <div className="related-grid grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.related.map(p => (
                <div
                  key={p.id}
                  className="related-card rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="relative h-48 flex items-center justify-center "
                    style={{ background: 'linear-gradient(135deg,#111,#0a0a0a)' }}
                  >
                    {p.badge && (
                      <span
                        className="absolute top-3 left-3 text-[8px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full z-10"
                        style={{
                          fontFamily: 'var(--bebas)',
                          background: 'rgba(255,45,0,0.15)',
                          color: '#FF2D00',
                          border: '1px solid rgba(255,45,0,0.3)',
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                    <div
                      className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full border border-white/20 z-10"
                      style={{ background: p.colorHex, boxShadow: `0 0 6px ${p.colorHex}50` }}
                    />
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' }}
                    />
                  </div>
                  <div className="p-4">
                    <h4
                      className="text-white font-bebas mb-1 leading-tight"
                      style={{
                        fontFamily: 'var(--bebas)',
                        fontSize: '1.05rem',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {p.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-white/70 font-bebas"
                        style={{ fontFamily: 'var(--bebas)', fontSize: '1.1rem' }}
                      >
                        ${p.price}
                      </span>
                      <button
                        className="text-[9px] tracking-[0.25em] uppercase text-[#FF2D00]/60 hover:text-[#FF2D00] transition-colors"
                        style={{ fontFamily: 'var(--bebas)' }}
                      >
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div
          className="h-[2px]"
          style={{
            background: 'linear-gradient(to right,transparent,#FF2D00,#d4a017,#FF2D00,transparent)',
          }}
        />
      </div>

      {/* SIZE GUIDE MODAL */}
      {sizeGuide && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
          onClick={() => setSizeGuide(false)}
        >
          <div
            className="relative bg-[#0e0e0e] border border-white/[0.08] rounded-3xl max-w-md w-full p-8"
            style={{ animation: 'popIn 0.3s cubic-bezier(0.4,0,0.2,1)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSizeGuide(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors border border-white/10 bg-white/[0.04]"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-1 rounded-full bg-[#FF2D00]" />
              <span
                className="text-[#FF2D00] text-[10px] tracking-[0.5em] uppercase"
                style={{ fontFamily: 'var(--bebas)' }}
              >
                F50 Size Guide
              </span>
            </div>
            <h3
              className="text-white font-bebas mb-2"
              style={{ fontFamily: 'var(--bebas)', fontSize: '2rem', letterSpacing: '0.06em' }}
            >
              Find Your Fit
            </h3>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              F50 Elite runs <strong className="text-white/60">true to size</strong>. Wide feet? Go
              half a size up.
            </p>
            <div className="overflow-hidden rounded-xl border border-white/[0.07]">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {['UK', 'EU', 'US', 'CM'].map(h => (
                      <th
                        key={h}
                        className="py-3 px-3 font-normal text-white/30 tracking-[0.25em] uppercase"
                        style={{ fontFamily: 'var(--bebas)', fontSize: '0.75rem' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['6', '39', '6.5', '24'],
                    ['7', '40.5', '7.5', '25'],
                    ['8', '42', '8.5', '26'],
                    ['9', '43.5', '9.5', '27'],
                    ['10', '44.5', '10.5', '28'],
                    ['11', '46', '11.5', '29'],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        background: i % 2 ? 'rgba(255,255,255,0.01)' : 'transparent',
                      }}
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="py-3 font-bebas px-3 text-white/50 text-xs">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
