'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);
/* ─────────────────────────────────────────────
   REAL-TIME OPEN CHECK (TIMEZONE BASED)
───────────────────────────────────────────── */
const isStoreOpenNow = (hours, timezone) => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));

  const [openStr, closeStr] = hours.split(' – ');
  const [openH, openM] = openStr.split(':').map(Number);
  const [closeH, closeM] = closeStr.split(':').map(Number);

  const openTime = new Date(now);
  openTime.setHours(openH, openM, 0);

  const closeTime = new Date(now);
  closeTime.setHours(closeH, closeM, 0);

  if (closeH === 0) {
    closeTime.setDate(closeTime.getDate() + 1);
  }

  return now >= openTime && now <= closeTime;
};
const stores = [
  {
    id: 1,
    city: 'London',
    country: 'UK',
    flag: 'gb',
    region: 'Europe',
    address: '415 Oxford Street, London W1C 2AX',
    phone: '+44 20 7499 1234',
    hours: '10:00 – 21:00',
    timezone: 'Europe/London',
    tag: 'Flagship',
    tagColor: '#FF2D00',
    coords: { x: 50, y: 28 },
    since: '2009',
  },
  {
    id: 2,
    city: 'Mumbai',
    country: 'India',
    flag: 'in',
    region: 'Asia',
    address: 'Mumbai Store Address',
    phone: '+91 98765 43210',
    hours: '10:00 – 24:00',
    timezone: 'Asia/Kolkata',
    tag: 'Elite Store',
    tagColor: '#d4a017',
    coords: { x: 67, y: 36 },
    since: '2011',
  },
  {
    id: 3,
    city: 'Tokyo',
    country: 'Japan',
    flag: 'jp',
    region: 'Asia',
    address: 'Tokyo Address',
    phone: '+81 3 3497 0011',
    hours: '11:00 – 21:00',
    timezone: 'Asia/Tokyo',
    tag: 'F50 Studio',
    tagColor: '#FF2D00',
    coords: { x: 76, y: 32 },
    since: '2014',
  },
  {
    id: 4,
    city: 'New York',
    country: 'USA',
    flag: 'us',
    region: 'Americas',
    address: '565 Fifth Avenue, New York, NY',
    phone: '+1 212 239 2700',
    hours: '10:00 – 21:00',
    timezone: 'America/New_York',
    tag: 'Flagship',
    tagColor: '#FF2D00',
    coords: { x: 15, y: 23 },
    since: '2007',
  },
  {
    id: 5,
    city: 'Dubai',
    country: 'UAE',
    flag: 'ae',
    region: 'Middle East',
    address: 'Dubai Mall',
    phone: '+971 4 339 8888',
    hours: '09:00 – 21:00',
    timezone: 'Asia/Dubai',
    tag: 'Concept Store',
    tagColor: '#d4a017',
    coords: { x: 55, y: 40 },
    since: '2018',
  },
  {
    id: 6,
    city: 'São Paulo',
    country: 'Brazil',
    flag: 'br',
    region: 'Americas',
    address: 'Av. Paulista',
    phone: '+55 11 3064 4444',
    hours: '09:00 – 22:00',
    timezone: 'America/Sao_Paulo',
    tag: 'F50 Studio',
    tagColor: '#FF2D00',
    coords: { x: 29, y: 50 },
    since: '2016',
  },
];

const regions = ['All', 'Europe', 'Asia', 'Americas', 'Middle East'];

// SVG world map dots — simplified continent blobs
const MapDots = ({ stores, activeId, onSelect }) => {
  const gridLines = Array.from({ length: 9 }, (_, i) => i);
  const vLines = Array.from({ length: 13 }, (_, i) => i);

  return (
    <svg viewBox="0 0 100 70" className="w-full h-full" style={{ overflow: 'visible' }}>
      {/* ── Grid lines ─────────────────────────── */}
      {gridLines.map(i => (
        <line
          key={`h${i}`}
          x1="0"
          y1={(i * 70) / 8}
          x2="100"
          y2={(i * 70) / 8}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.2"
        />
      ))}
      {vLines.map(i => (
        <line
          key={`v${i}`}
          x1={(i * 100) / 12}
          y1="0"
          x2={(i * 100) / 12}
          y2="70"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.2"
        />
      ))}

      {/* ── Equator line ───────────────────────── */}
      <line
        x1="0"
        y1="35"
        x2="100"
        y2="35"
        stroke="rgba(212,160,23,0.12)"
        strokeWidth="0.3"
        strokeDasharray="1,2"
      />

      {/* ── Connection lines between stores ──────── */}
      {stores.map((s, i) => {
        const next = stores[(i + 1) % stores.length];
        const isRelated = activeId === s.id || activeId === next.id;
        return (
          <line
            key={`line-${i}`}
            x1={s.coords.x}
            y1={s.coords.y}
            x2={next.coords.x}
            y2={next.coords.y}
            stroke={isRelated ? 'rgba(255,45,0,0.3)' : 'rgba(255,255,255,0.04)'}
            strokeWidth={isRelated ? '0.4' : '0.2'}
            strokeDasharray="0.8,1.2"
            style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
          />
        );
      })}

      {/* ── Store pins ───────────────────────────── */}
      {stores.map(store => {
        const isActive = activeId === store.id;

        const isOpen = isStoreOpenNow(store.hours, store.timezone);
        return (
          <g key={store.id} onClick={() => onSelect(store.id)} style={{ cursor: 'pointer' }}>
            {/* Pulse ring */}
            {isOpen && (
              <circle
                cx={store.coords.x}
                cy={store.coords.y}
                r={isActive ? 3.5 : 2.5}
                fill="none"
                stroke={store.tagColor}
                strokeWidth="0.3"
                opacity={isActive ? 0.6 : 0.25}
                style={{ transition: 'all 0.4s' }}
              >
                <animate
                  attributeName="r"
                  values={isActive ? '2.5;4.5;2.5' : '1.8;3;1.8'}
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Pin dot */}
            <circle
              cx={store.coords.x}
              cy={store.coords.y}
              r={isActive ? 1.5 : 0.7}
              fill={isActive ? store.tagColor : 'rgba(255,255,255,0.5)'}
              style={{ transition: 'all 0.4s' }}
            />
            <circle
              cx={store.coords.x}
              cy={store.coords.y}
              r={isActive ? 0.6 : 0.4}
              fill="#fff"
              opacity={isActive ? 1 : 0.7}
              style={{ transition: 'all 0.4s' }}
            />

            {/* City label */}
            <text
              x={store.coords.x + 2}
              y={store.coords.y - 2}
              fontSize="2.2"
              fill={isActive ? store.tagColor : 'rgba(255,255,255,0.35)'}
              fontFamily="var(--font-bebas, sans-serif)"
              letterSpacing="0.05em"
              style={{ transition: 'fill 0.4s', userSelect: 'none' }}
            >
              {store.city.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Stores = () => {
  const sectionRef = useRef(null);
  const [activeId, setActiveId] = useState(1);
  const [activeRegion, setActiveRegion] = useState('All');

  /* 🔄 FORCE UPDATE EVERY MINUTE */
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate(n => n + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  const getStoreTime = timezone => {
    return new Date().toLocaleTimeString('en-IN', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const activeStore = stores.find(s => s.id === activeId);
  const isOpen = isStoreOpenNow(activeStore.hours, activeStore.timezone);
  const filtered = activeRegion === 'All' ? stores : stores.filter(s => s.region === activeRegion);

  useGSAP(() => {
    // Title entrance
    const split = new SplitText('.stores-title', { type: 'chars' });
    gsap.from(split.chars, {
      scrollTrigger: { trigger: '#stores', start: 'top 50%' },
      yPercent: 110,
      opacity: 0,
      stagger: 0.03,
      duration: 0.8,
      ease: 'expo.out',
    });

    gsap.from('.stores-meta', {
      scrollTrigger: { trigger: '#stores', start: 'top 55%' },
      y: 24,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.5,
    });

    gsap.from('.map-panel', {
      scrollTrigger: { trigger: '#stores', start: 'top 50%' },
      x: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
    });

    gsap.from('.list-panel', {
      scrollTrigger: { trigger: '#stores', start: 'top 50%' },
      x: -60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
    });
  });

  return (
    <>
      <section id="stores" className="relative w-full bg-[#070707] overflow-hidden py-24">
        {/* ── Noise ──────────────────────────────────────── */}
        <div className="noisy absolute inset-0 opacity-[0.025] pointer-events-none z-0" />

        {/* ── Ghost BG text ──────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span
            className="font-bebas text-[18vw] leading-none"
            style={{ WebkitTextStroke: '1px rgba(212,160,23,0.04)', color: 'transparent' }}
          >
            STORES
          </span>
        </div>

        {/* ── Diagonal accent lines ──────────────────────── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0"
            x2="15%"
            y2="100%"
            stroke="#d4a017"
            strokeWidth="0.5"
            strokeOpacity="0.07"
          />
          <line
            x1="100%"
            y1="0"
            x2="85%"
            y2="100%"
            stroke="#FF2D00"
            strokeWidth="0.5"
            strokeOpacity="0.05"
          />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* ── Header ──────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="stores-meta flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#FF2D00]" />
                <span className="text-[#FF2D00] text-[10px] tracking-[0.5em] uppercase">
                  Global · Live Store Network
                </span>
              </div>
              <div className="overflow-hidden">
                <h2
                  className="stores-title font-bebas uppercase leading-[0.88]"
                  style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
                >
                  <span className="text-white">Find A</span>
                  <br />
                  <span
                    style={{
                      WebkitTextStroke: '1.5px #d4a017',
                      color: 'transparent',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Store
                  </span>
                </h2>
              </div>
            </div>

            {/* Open count badge */}
            <div className="stores-meta flex items-center gap-6">
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    style={{ boxShadow: '0 0 6px #34d399' }}
                  />
                  <span className="font-bebas text-emerald-400 text-2xl leading-none">
                    {stores.filter(s => isStoreOpenNow(s.hours, s.timezone)).length}
                  </span>
                </div>
                <span className="text-[9px] tracking-[0.35em] uppercase text-white/25">
                  Open Now
                </span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col items-end gap-1">
                <span className="font-bebas text-white/30 text-2xl leading-none">
                  {stores.length}
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-white/25">
                  Total Stores
                </span>
              </div>
            </div>
          </div>

          {/* ── Region filter ───────────────────────────── */}
          <div className="stores-meta flex gap-2 flex-wrap mb-10">
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className="relative px-4 py-1.5 rounded-full text-[10px] tracking-[0.3em] uppercase font-bebas transition-all duration-300"
                style={{
                  background: activeRegion === r ? '#FF2D00' : 'rgba(255,255,255,0.04)',
                  color: activeRegion === r ? '#fff' : 'rgba(255,255,255,0.3)',
                  border: `1px solid ${activeRegion === r ? '#FF2D00' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {r}
              </button>
            ))}
          </div>

          {/* ── Main split layout ───────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT — store list ─────────────────────── */}
            <div className="list-panel lg:col-span-5 flex flex-col gap-2">
              {filtered.map((store, i) => {
                const isActive = activeId === store.id;
                const isOpen = isStoreOpenNow(store.hours, store.timezone);
                return (
                  <button
                    key={store.id}
                    onClick={() => setActiveId(store.id)}
                    className="store-row text-left w-full px-4 py-4 rounded-2xl"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${store.tagColor}14, rgba(255,255,255,0.03))`
                        : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isActive ? store.tagColor + '40' : 'rgba(255,255,255,0.06)'}`,
                      animationDelay: `${i * 0.06}s`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* City + address */}
                      <div className="flex items-start gap-3">
                        {/* Index */}
                        <span
                          className="font-bebas text-xs mt-0.5 flex-shrink-0"
                          style={{ color: isActive ? store.tagColor : 'rgba(255,255,255,0.15)' }}
                        >
                          {String(store.id).padStart(2, '0')}
                        </span>

                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <img
                              src={`https://flagcdn.com/${store.flag}.svg`}
                              alt={store.country}
                              className="w-5 h-4 object-cover"
                            />
                            <span
                              className="font-bebas text-xl leading-none tracking-wider"
                              style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}
                            >
                              {store.city}
                            </span>
                            <span
                              className="text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                              style={{
                                background: `${store.tagColor}18`,
                                color: store.tagColor,
                                border: `1px solid ${store.tagColor}30`,
                              }}
                            >
                              {store.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-white/30 tracking-wide leading-relaxed">
                            {store.address}
                          </p>
                        </div>
                      </div>

                      {/* Open/closed indicator */}
                      <div className="flex-shrink-0 flex flex-col items-end gap-1 mt-0.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{
                              background: isOpen ? '#34d399' : 'rgba(255,255,255,0.2)',
                              boxShadow: isOpen ? '0 0 5px #34d399' : 'none',
                            }}
                          />
                          <span
                            className="text-[9px] tracking-[0.2em] uppercase"
                            style={{ color: isOpen ? '#34d399' : 'rgba(255,255,255,0.2)' }}
                          >
                            {isOpen ? 'Open' : 'Closed'}
                          </span>
                        </div>
                        <span className="text-[9px] text-white/20 tracking-wider">
                          {getStoreTime(store.timezone)}
                        </span>
                      </div>
                    </div>

                    {/* Expanded detail row */}
                    {isActive && (
                      <div
                        className="mt-3 pt-3 flex items-center justify-between"
                        style={{
                          borderTop: `1px solid ${store.tagColor}20`,
                          animation: 'fadeInUp 0.3s ease forwards',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M5 1C3.3 1 2 2.3 2 4C2 6.5 5 9 5 9C5 9 8 6.5 8 4C8 2.3 6.7 1 5 1ZM5 5.2C4.3 5.2 3.8 4.7 3.8 4C3.8 3.3 4.3 2.8 5 2.8C5.7 2.8 6.2 3.3 6.2 4C6.2 4.7 5.7 5.2 5 5.2Z"
                              fill={store.tagColor}
                              opacity="0.7"
                            />
                          </svg>
                          <span className="text-[10px] text-white/30 tracking-wide">
                            {store.phone}
                          </span>
                        </div>
                        <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">
                          Est. {store.since}
                        </span>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 group"
                        >
                          <span
                            className="text-[9px] tracking-[0.3em] uppercase group-hover:text-white/70 transition-colors"
                            style={{ color: store.tagColor + 'aa' }}
                          >
                            Directions
                          </span>
                          <span style={{ color: store.tagColor + 'aa', fontSize: '10px' }}>→</span>
                        </a>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* RIGHT — map panel ────────────────────────── */}
            <div
              className="map-panel lg:col-span-7 relative rounded-3xl overflow-hidden"
              style={{
                backgroundImage: "url('/assets/images/map.png')",
                backgroundSize: 'contain',
                backgroundPosition: 'center',

                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: '480px',
              }}
            >
              {/* Corner markers */}
              {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map(
                (pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-4 h-4 pointer-events-none z-10`}
                    style={{
                      borderTop: i < 2 ? '1px solid rgba(212,160,23,0.3)' : 'none',
                      borderBottom: i >= 2 ? '1px solid rgba(212,160,23,0.3)' : 'none',
                      borderLeft: i % 2 === 0 ? '1px solid rgba(212,160,23,0.3)' : 'none',
                      borderRight: i % 2 === 1 ? '1px solid rgba(212,160,23,0.3)' : 'none',
                    }}
                  />
                ),
              )}

              {/* Map label */}
              <div className="absolute top-5 left-6 z-10 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#FF2D00]" />
                <span className="font-bebas text-[12px] tracking-[0.5em] uppercase text-white/25">
                  Worldwide Store Network · <span className="text-[#FF2D00]">Real-Time</span>
                </span>
              </div>

              {/* Coordinate display */}
              {activeStore && (
                <div className="absolute top-5 right-5 z-10 text-right coord-tick" key={activeId}>
                  <p className="font-bebas text-[12px] tracking-[0.3em] text-[#d4a017] uppercase">
                    Coordinates
                  </p>
                  <p className="font-bebas text-[12px] text-[#d4a017]/80 tracking-wider">
                    {activeStore.coords.x.toFixed(1)}°N · {activeStore.coords.y.toFixed(1)}°E
                  </p>
                </div>
              )}

              {/* SVG Map */}
              <div className="w-full h-full p-6 flex items-center">
                <MapDots stores={stores} activeId={activeId} onSelect={setActiveId} />
              </div>

              {/* Active store card overlay */}
              {activeStore && (
                <div
                  className="absolute bottom-4 left-4 right-4 rounded-2xl p-4 z-10 coord-tick"
                  key={`card-${activeId}`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(10,10,10,0.96), rgba(15,15,15,0.92))',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${activeStore.tagColor}30`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://flagcdn.com/${activeStore.flag}.svg`}
                        alt={activeStore.country}
                        className="w-5 h-4 object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bebas text-2xl text-white leading-none tracking-wider">
                            {activeStore.city}
                          </span>
                          <span className="font-bebas text-[15px] text-white/30 leading-none">
                            {activeStore.country}
                          </span>
                        </div>
                        <p className="text-[12px] text-white/30 tracking-wide mt-0.5">
                          {activeStore.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className="text-[11px] px-2.5 py-1 rounded-full font-bebas tracking-[0.2em]"
                        style={{
                          background: `${activeStore.tagColor}20`,
                          color: activeStore.tagColor,
                          border: `1px solid ${activeStore.tagColor}30`,
                        }}
                      >
                        {activeStore.tag}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: isOpen ? '#34d399' : 'rgba(255,255,255,0.2)',
                            boxShadow: isOpen ? '0 0 5px #34d399' : 'none',
                          }}
                        />
                        <span
                          className="text-[11px] tracking-[0.2em] uppercase"
                          style={{
                            color: activeStore.isOpen ? '#34d399' : 'rgba(255,255,255,0.2)',
                          }}
                        >
                          {isOpen ? 'Open Now' : 'Closed'}
                        </span>
                        <span className="text-[11px] text-white/20">· {activeStore.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom rule ─────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, #FF2D0020, transparent)' }}
        />
      </section>
    </>
  );
};

export default Stores;
