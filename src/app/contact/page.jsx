'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import StoreLocation from '@/Components/StoreLocation';
gsap.registerPlugin(ScrollTrigger, SplitText);

// ── CONSTANTS ────────────────────────────────────────────────────
const contacts = [
  {
    icon: '📍',
    label: 'Headquarters',
    value: 'Adi-Dassler-Str. 1\n91074 Herzogenaurach, Germany',
    accent: '#FF2D00',
  },
  {
    icon: '✉',
    label: 'Email Us',
    value: 'f50.support@adidas.com',
    accent: '#d4a017',
  },
  {
    icon: '☎',
    label: 'Hotline',
    value: '+49 9132 84-0\nMon–Fri · 08:00–18:00 CET',
    accent: '#FF2D00',
  },
  {
    icon: '◎',
    label: 'Media & Press',
    value: 'press.f50@adidas.com',
    accent: '#d4a017',
  },
];

const topics = [
  'Boot Fitting & Sizing',
  'Order & Shipping',
  'Returns & Refunds',
  'Team & Club Enquiries',
  'Press & Media',
  'Sponsorship',
  'General Feedback',
  'Other',
];

const socials = [
  { name: 'Instagram', handle: '@adidas', icon: 'IG' },
  { name: 'Twitter / X', handle: '@adidas', icon: '𝕏' },
  { name: 'YouTube', handle: 'Adidas Football', icon: '▶' },
  { name: 'TikTok', handle: '@adidas', icon: '♪' },
];

// ── ANIMATED COUNTER ────────────────────────────────────────────
const Counter = ({ to, suffix = '' }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = to / 60;
          const t = setInterval(() => {
            start += step;
            if (start >= to) {
              setVal(to);
              clearInterval(t);
            } else setVal(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

// ── FLOATING LABEL INPUT ─────────────────────────────────────────
const FloatInput = ({
  label,
  type = 'text',
  value,
  onChange,
  required,
  multiline,
  accent = '#FF2D00',
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const base = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused ? accent : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 12,
    padding: multiline ? '2rem 1rem 0.75rem' : '1.6rem 1rem 0.5rem',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxShadow: focused ? `0 0 0 2px ${accent}20` : 'none',
    resize: 'none',
    fontFamily: 'inherit',
    letterSpacing: '0.03em',
    minHeight: multiline ? 130 : 'auto',
  };

  return (
    <div style={{ position: 'relative' }}>
      <label
        style={{
          position: 'absolute',
          left: '1rem',
          top: active ? '0.45rem' : '50%',
          transform: multiline ? 'none' : active ? 'none' : 'translateY(-50%)',
          fontSize: active ? 9 : 13,
          color: active ? accent : 'rgba(255,255,255,0.3)',
          letterSpacing: active ? '0.35em' : '0.05em',
          textTransform: active ? 'uppercase' : 'none',
          transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {label}
        {required && <span style={{ color: accent, marginLeft: 2 }}>*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={base}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={base}
        />
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════
// MAIN CONTACT PAGE
// ══════════════════════════════════════════════════════════════════
export default function ContactPage() {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 2000);
  };
  useGSAP(
    () => {
      // Hero entrance
      const heroSplit = new SplitText('.contact-hero-title', { type: 'chars' });

      gsap.from(heroSplit.chars, {
        yPercent: 120,
        opacity: 0,
        rotateX: -60,
        stagger: 0.03,
        duration: 0.9,
        ease: 'expo.out',
        delay: 0.2,
      });

      gsap.from(['.contact-eyebrow', '.contact-subtext'], {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.4,
        delay: 0.2,
      });

      gsap.from('.diag-line', {
        scaleY: 0,
        duration: 1.8,
        ease: 'power4.out',
        stagger: 0.15,
        transformOrigin: 'top',
      });

      // Scroll-triggered helpers
      const scrollFrom = (trigger, targets, vars, position = '') => {
        const tl = gsap.timeline({ scrollTrigger: { trigger, start: 'top center' } });
        []
          .concat(targets)
          .forEach(([sel, v], i) => tl.from(sel, { ...vars, ...v }, i === 0 ? '' : position));
        return tl;
      };

      // Stats
      gsap.from('.stat-item', {
        scrollTrigger: { trigger: '.stats-row', start: 'top 85%' },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.5)',
      });

      // Main grid panels + children
      const gridTl = gsap.timeline({
        scrollTrigger: { trigger: '.main-grid', start: 'top center' },
      });
      gridTl
        .from(
          ['.form-panel', '.info-panel'],
          {
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: { each: 0, from: 'start', amount: 0 },
            x: i => (i === 0 ? -50 : 50),
          },
          '<',
        )
        .from(
          ['.form-panel div', '.info-panel div'],
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '<',
        );

      // FAQ row
      gsap
        .timeline({ scrollTrigger: { trigger: '.faq-row', start: 'top center' } })
        .from('.faq-row div', {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
        });

      // Bottom CTA
      gsap.from('.bottom-cta-text', {
        scrollTrigger: { trigger: '.bottom-cta', start: 'top 85%' },
        yPercent: 80,
        opacity: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: 'expo.out',
      });
    },
    { scope: pageRef },
  );

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor" />
      {/* <div
        className="cursor-dot"
        style={{ left: mousePos.x, top: mousePos.y, transition: 'left 0.1s, top 0.1s' }}
      /> */}

      <div
        ref={pageRef}
        style={{ minHeight: '100vh', background: 'var(--bg)', overflow: 'hidden' }}
      >
        {/* ══════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════ */}
        <section
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '6rem 1.5rem 4rem',
          }}
        >
          {/* Background radial glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,45,0,0.07), transparent)',
            }}
          />

          {/* Diagonal SVG lines */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
            preserveAspectRatio="none"
          >
            <line
              className="diag-line"
              x1="10%"
              y1="0"
              x2="4%"
              y2="100%"
              stroke="#FF2D00"
              strokeWidth="0.6"
              strokeOpacity="0.12"
            />
            <line
              className="diag-line"
              x1="90%"
              y1="0"
              x2="96%"
              y2="100%"
              stroke="#d4a017"
              strokeWidth="0.6"
              strokeOpacity="0.1"
            />
            <line
              className="diag-line"
              x1="50%"
              y1="0"
              x2="47%"
              y2="100%"
              stroke="#FF2D00"
              strokeWidth="0.3"
              strokeOpacity="0.05"
            />
          </svg>

          {/* Vertical side labels */}
          <span
            style={{
              position: 'absolute',
              left: '1.5rem',
              top: '50%',
              writingMode: 'vertical-rl',
              transform: 'translateY(-50%) rotate(180deg)',
              fontFamily: 'var(--font-bebas)',
              fontSize: 9,
              letterSpacing: '0.45em',
              color: 'rgba(255,255,255,0.15)',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            F50 · Adidas · 2025
          </span>
          <span
            style={{
              position: 'absolute',
              right: '1.5rem',
              top: '50%',
              writingMode: 'vertical-rl',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-bebas)',
              fontSize: 9,
              letterSpacing: '0.45em',
              color: 'rgba(255,45,0,0.3)',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            Get In Touch
          </span>

          {/* Ghost BG word */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              userSelect: 'none',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(8rem, 28vw, 18rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                WebkitTextStroke: '2px rgba(255,45,0,0.04)',
                color: 'transparent',
              }}
            >
              CONTACT
            </span>
          </div>

          {/* Hero content */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 900 }}>
            <p
              className="contact-eyebrow"
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 10,
                letterSpacing: '0.55em',
                color: '#FF2D00',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <span
                style={{ display: 'inline-block', width: 20, height: 1, background: '#FF2D00' }}
              />
              Connect With The Team
              <span
                style={{ display: 'inline-block', width: 20, height: 1, background: '#FF2D00' }}
              />
            </p>

            <div style={{ overflow: 'hidden' }}>
              <h1
                className="contact-hero-title hero-title-size font-bebas"
                style={{
                  fontSize: 'clamp(5rem, 18vw, 14rem)',
                  lineHeight: 0.88,
                  letterSpacing: '0.02em',
                  margin: '0 0 1.5rem',
                }}
              >
                <span style={{ color: '#fff', display: 'block' }}>Let's</span>
                <span
                  style={{
                    display: 'block',
                    WebkitTextStroke: '2px #FF2D00',
                    color: 'transparent',
                    letterSpacing: '0.06em',
                  }}
                >
                  Talk
                </span>
              </h1>
            </div>

            <p
              className="contact-subtext"
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: 14,
                letterSpacing: '0.08em',
                lineHeight: 1.8,
                maxWidth: 480,
                margin: '0 auto 2.5rem',
              }}
            >
              Whether it's a boot query, a press enquiry, or you simply want to talk football —
              we're here for it. Every message is read by a real person.
            </p>

            {/* CTA scroll down */}
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
            >
              <a
                href="#contact-form"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#FF2D00',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: 99,
                  padding: '12px 28px',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  boxShadow: '0 8px 30px rgba(255,45,0,0.25)',
                  transition: 'all 0.3s',
                }}
              >
                Send A Message →
              </a>
              <a
                href="#contact-info"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  borderRadius: 99,
                  padding: '12px 24px',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s',
                }}
              >
                Our Info
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              animation: 'fadeUp 1s ease 1.5s both',
            }}
          ></div>
        </section>

        {/* ══════════════════════════════════════════════
            STATS ROW
        ══════════════════════════════════════════════ */}
        <div
          className="stats-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { n: 24, suffix: 'h', label: 'Response Time', accent: '#FF2D00' },
            { n: 98, suffix: '%', label: 'Satisfaction Rate', accent: '#d4a017' },
            { n: 6, suffix: ' Langs', label: 'Support In', accent: '#FF2D00' },
            { n: 12000, suffix: '+', label: 'Messages Answered', accent: '#d4a017' },
          ].map(({ n, suffix, label, accent }, i) => (
            <div
              key={label}
              className="stat-item font-bebas "
              style={{
                padding: '2rem 1.5rem',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                textAlign: 'center',
              }}
            >
              <p
                className="font-bebas"
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  color: accent,
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                <Counter to={n} suffix={suffix} />
              </p>
              <p
                style={{
                  fontSize: 12,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════
            MAIN CONTENT — Form + Info
        ══════════════════════════════════════════════ */}
        <div
          style={{
            maxWidth: 1300,
            margin: '0 auto',
            padding: '5rem 1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="main-grid"
          id="contact-form"
        >
          {/* ── LEFT: CONTACT FORM ─────────────────────── */}
          <div className="form-panel">
            {/* Section label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem' }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF2D00' }} />
              <span
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 10,
                  letterSpacing: '0.5em',
                  color: '#FF2D00',
                  textTransform: 'uppercase',
                }}
              >
                Send A Message
              </span>
            </div>

            <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
              <h2
                className="font-bebas"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 0.9,
                  color: '#fff',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                We Read
                <br />
                <span style={{ WebkitTextStroke: '1.5px #d4a017', color: 'transparent' }}>
                  Every Word
                </span>
              </h2>
            </div>

            {!submitted ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-input-wrap">
                    <FloatInput
                      label="Full Name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-input-wrap">
                    <FloatInput
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Topic picker */}
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-bebas)',
                      fontSize: 9,
                      letterSpacing: '0.45em',
                      color: '#FF2D00',
                      textTransform: 'uppercase',
                      marginBottom: 10,
                    }}
                  >
                    Topic <span style={{ color: '#FF2D00' }}>*</span>
                  </p>
                  <div
                    className="topics-grid"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                    }}
                  >
                    {topics.map(t => (
                      <button
                        key={t}
                        className="topic-pill"
                        onClick={() => {
                          setActiveTopic(t);
                          setForm(f => ({ ...f, topic: t }));
                        }}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 99,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-bebas)',
                          fontSize: '0.75rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          background: activeTopic === t ? '#FF2D00' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${activeTopic === t ? '#FF2D00' : 'rgba(255,255,255,0.1)'}`,
                          color: activeTopic === t ? '#fff' : 'rgba(255,255,255,0.4)',
                          transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                          transform: activeTopic === t ? 'scale(1.04)' : 'scale(1)',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="form-input-wrap">
                  <FloatInput
                    label="Your Message"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                    multiline
                    accent="#d4a017"
                  />
                </div>

                {/* Character count */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: -8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.2)',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {form.message.length} / 1000
                  </span>
                  <div
                    style={{
                      height: 2,
                      borderRadius: 99,
                      overflow: 'hidden',
                      width: 80,
                      background: 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        borderRadius: 99,
                        background: '#d4a017',
                        width: `${Math.min(100, (form.message.length / 1000) * 100)}%`,
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                </div>

                {/* Privacy note */}
                <p
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.05em',
                    lineHeight: 1.6,
                  }}
                >
                  By submitting, you agree to our{' '}
                  <a href="#" style={{ color: '#FF2D00', textDecoration: 'none' }}>
                    Privacy Policy
                  </a>
                  . We respond within 24 hours on business days.
                </p>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="send-btn"
                  style={{
                    background: sending ? 'rgba(255,45,0,0.5)' : '#FF2D00',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '16px 32px',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '1rem',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    marginTop: 4,
                  }}
                >
                  {sending ? (
                    <>
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff',
                          animation: 'spin 0.7s linear infinite',
                          display: 'inline-block',
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </div>
            ) : (
              /* Success state */
              <div
                style={{
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  background: 'rgba(52,211,153,0.05)',
                  border: '1px solid rgba(52,211,153,0.2)',
                  borderRadius: '1.25rem',
                  animation: 'scaleIn 0.5s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(52,211,153,0.1)',
                    border: '1px solid rgba(52,211,153,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: 22,
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '2rem',
                    color: '#fff',
                    letterSpacing: '0.1em',
                    marginBottom: 8,
                  }}
                >
                  Message Sent!
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 13,
                    lineHeight: 1.8,
                    marginBottom: '1.5rem',
                  }}
                >
                  Thanks, <strong style={{ color: '#fff' }}>{form.name}</strong>. We'll reply to{' '}
                  <strong style={{ color: '#d4a017' }}>{form.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', topic: '', message: '' });
                    setActiveTopic(null);
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    padding: '10px 24px',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                  }}
                >
                  Send Another
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: INFO PANEL ──────────────────────── */}
          <div
            className="info-panel"
            id="contact-info"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Section label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#d4a017' }} />
              <span
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 10,
                  letterSpacing: '0.5em',
                  color: '#d4a017',
                  textTransform: 'uppercase',
                }}
              >
                Our Details
              </span>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <h2
                className="font-bebas"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 0.9,
                  color: '#fff',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Find Us
                <br />
                <span style={{ WebkitTextStroke: '1.5px #FF2D00', color: 'transparent' }}>
                  Anywhere
                </span>
              </h2>
            </div>

            {/* Contact cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {contacts.map((c, i) => (
                <div
                  key={c.label}
                  className="contact-card"
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderRadius: '1rem',
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-bebas)',
                      fontSize: 9,
                      letterSpacing: '0.4em',
                      color: c.accent,
                      textTransform: 'uppercase',
                      marginBottom: 4,
                    }}
                  >
                    {c.label}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.55)',
                      lineHeight: 1.7,
                      letterSpacing: '0.03em',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {c.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Live hours indicator */}
            <div
              style={{
                padding: '1.25rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(52,211,153,0.08)',
                    border: '1px solid rgba(52,211,153,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ color: '#34d399', fontSize: 14 }}>◎</span>
                </div>
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#34d399',
                    boxShadow: '0 0 6px #34d399',
                    animation: 'pulse 2s infinite',
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 10,
                    letterSpacing: '0.4em',
                    color: '#34d399',
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}
                >
                  Live Support
                </p>
                <p
                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}
                >
                  Our team is online · Mon–Fri 08:00–18:00 CET
                </p>
              </div>
            </div>

            {/* Map placeholder */}

            {/* Social links */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 9,
                  letterSpacing: '0.45em',
                  color: 'rgba(255,255,255,0.2)',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                Follow Us
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {socials.map((s, i) => (
                  <a
                    key={s.name}
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="social-row"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 10,
                      textDecoration: 'none',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.3s',
                      paddingLeft: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: i % 2 === 0 ? 'rgba(255,45,0,0.1)' : 'rgba(212,160,23,0.1)',
                          border: `1px solid ${i % 2 === 0 ? 'rgba(255,45,0,0.2)' : 'rgba(212,160,23,0.2)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          color: i % 2 === 0 ? '#FF2D00' : '#d4a017',
                          fontFamily: 'var(--font-bebas)',
                        }}
                      >
                        {s.icon}
                      </span>
                      <div>
                        <p
                          style={{
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.6)',
                            letterSpacing: '0.04em',
                            marginBottom: 1,
                          }}
                        >
                          {s.name}
                        </p>
                        <p
                          style={{
                            fontSize: 10,
                            color: 'rgba(255,255,255,0.25)',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {s.handle}
                        </p>
                      </div>
                    </div>
                    <span
                      className="social-arrow"
                      style={{
                        color: '#FF2D00',
                        fontSize: 12,
                        opacity: 0,
                        transform: 'translateX(-6px)',
                        transition: 'all 0.3s',
                      }}
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <StoreLocation />
        {/* ══════════════════════════════════════════════
            FAQ ROW
        ══════════════════════════════════════════════ */}
        <div
          className="faq-row"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '4rem 1.5rem',
          }}
        >
          <div style={{ maxWidth: 1300, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem' }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#d4a017' }} />
              <span
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 10,
                  letterSpacing: '0.5em',
                  color: '#d4a017',
                  textTransform: 'uppercase',
                }}
              >
                Quick Answers
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
              }}
            >
              {[
                {
                  q: 'How long does delivery take?',
                  a: 'Standard shipping is 3–5 business days. Express next-day available.',
                },
                {
                  q: 'Can I return a worn boot?',
                  a: 'Unworn items in original packaging can be returned within 30 days.',
                },
                {
                  q: 'Do you offer team discounts?',
                  a: 'Yes — club and team orders of 10+ pairs get 15% off. Contact us.',
                },
                {
                  q: 'How do I find my boot size?',
                  a: 'Download our size guide PDF or book a free fitting at any flagship store.',
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '1rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-bebas)',
                      fontSize: '1rem',
                      color: '#fff',
                      letterSpacing: '0.06em',
                      marginBottom: 8,
                      lineHeight: 1.2,
                    }}
                  >
                    {q}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.35)',
                      lineHeight: 1.7,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM CTA STRIP
        ══════════════════════════════════════════════ */}
        <div
          className="bottom-cta"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '5rem 1.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, transparent, rgba(255,45,0,0.04))',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'radial-gradient(ellipse 50% 80% at 50% 100%, rgba(255,45,0,0.08), transparent)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ overflow: 'hidden' }}>
              <p
                className="bottom-cta-text font-bebas"
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(3rem, 10vw, 9rem)',
                  lineHeight: 0.9,
                  color: '#fff',
                  letterSpacing: '0.02em',
                  marginBottom: 0,
                }}
              >
                We're Always{' '}
                <span style={{ WebkitTextStroke: '2px #FF2D00', color: 'transparent' }}>On</span>
              </p>
            </div>
            <p
              style={{
                color: 'rgba(255,255,255,0.25)',
                fontSize: 13,
                letterSpacing: '0.12em',
                marginTop: '1rem',
                marginBottom: '2rem',
              }}
            >
              No bots. No templates. Real humans who love football.
            </p>
            <a
              href="#contact-form"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#FF2D00',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 99,
                padding: '14px 32px',
                fontFamily: 'var(--font-bebas)',
                fontSize: '0.95rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                boxShadow: '0 8px 30px rgba(255,45,0,0.25)',
              }}
            >
              Start A Conversation →
            </a>
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div
          style={{
            height: 2,
            background:
              'linear-gradient(to right, transparent, #FF2D00, #d4a017, #FF2D00, transparent)',
          }}
        />
      </div>
    </>
  );
}
