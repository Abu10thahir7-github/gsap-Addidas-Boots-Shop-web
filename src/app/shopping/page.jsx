'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import { products } from '../../../constants';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import AnimatedButton from '@/Components/UI/AnimatedButton';
import { useRouter } from 'next/navigation';



gsap.registerPlugin(ScrollTrigger, SplitText);
// ── PRODUCT DATA ────────────────────────────────────────────────

const BADGE_COLORS = {
  New: { bg: 'rgba(255,45,0,0.15)', color: '#FF2D00', border: 'rgba(255,45,0,0.3)' },
  Limited: { bg: 'rgba(212,160,23,0.15)', color: '#d4a017', border: 'rgba(212,160,23,0.3)' },
  Sale: { bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
  Signature: { bg: 'rgba(168,85,247,0.15)', color: '#a855f7', border: 'rgba(168,85,247,0.3)' },
  Heritage: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
};

const Stars = ({ rating }) => (
  <div style={{ display: 'flex', gap: 1, alignItems: 'center' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <svg key={i} width="9" height="9" viewBox="0 0 10 10">
        <polygon
          points="5,1 6.2,3.8 9.5,3.8 6.9,5.7 7.9,8.5 5,6.8 2.1,8.5 3.1,5.7 0.5,3.8 3.8,3.8"
          fill={i <= Math.round(rating) ? '#FF2D00' : 'rgba(255,255,255,0.1)'}
        />
      </svg>
    ))}
  </div>
);

// ── QUICK VIEW MODAL ─────────────────────────────────────────────
const QuickView = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  if (!product) return null;
  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#0e0e0e',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1.5rem',
          maxWidth: 800,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          animation: 'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {/* Image */}
          <div
            style={{
              background: 'linear-gradient(135deg, #111, #0a0a0a)',
              borderRadius: '1.5rem 0 0 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 380,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {product.badge && (
              <span
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  zIndex: 2,
                  ...BADGE_COLORS[product.badge],
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  borderRadius: 99,
                  border: `1px solid ${BADGE_COLORS[product.badge].border}`,
                }}
              >
                {product.badge}
              </span>
            )}
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: '85%',
                height: '85%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 40px rgba(255,45,0,0.1))',
              }}
            />
          </div>

          {/* Details */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: 32,
                height: 32,
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            <div>
              <p
                style={{
                  color: '#FF2D00',
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                {product.collection}
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-bebas, sans-serif)',
                  fontSize: '2rem',
                  color: '#fff',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {product.name}
              </h2>
              {product.wornBy && (
                <p
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: 11,
                    marginTop: 4,
                    letterSpacing: '0.1em',
                  }}
                >
                  Worn by {product.wornBy}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Stars rating={product.rating} />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span
                style={{
                  fontFamily: 'var(--font-bebas, sans-serif)',
                  fontSize: '2.2rem',
                  color: '#fff',
                  letterSpacing: '0.05em',
                }}
              >
                ${product.price}
              </span>
              {discount > 0 && (
                <>
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.25)',
                      fontSize: 16,
                      textDecoration: 'line-through',
                    }}
                  >
                    ${product.originalPrice}
                  </span>
                  <span
                    style={{
                      background: 'rgba(52,211,153,0.15)',
                      color: '#34d399',
                      fontSize: 10,
                      padding: '2px 8px',
                      borderRadius: 99,
                      border: '1px solid rgba(52,211,153,0.3)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Surface tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {product.surface.map(s => (
                <span
                  key={s}
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: 99,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Size selector */}
            <div>
              <p
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: 10,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Select Size (UK)
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      width: 44,
                      height: 36,
                      borderRadius: 8,
                      cursor: 'pointer',
                      background: selectedSize === sz ? '#FF2D00' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${selectedSize === sz ? '#FF2D00' : 'rgba(255,255,255,0.08)'}`,
                      color: selectedSize === sz ? '#fff' : 'rgba(255,255,255,0.5)',
                      fontSize: 12,
                      fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: '6px 12px',
                }}
              >
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    fontSize: 16,
                    lineHeight: 1,
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    color: '#fff',
                    fontFamily: 'var(--font-bebas, sans-serif)',
                    fontSize: '1.2rem',
                    minWidth: 24,
                    textAlign: 'center',
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    fontSize: 16,
                    lineHeight: 1,
                  }}
                >
                  +
                </button>
              </div>

              <AnimatedButton
                onClick={() => {
                  if (!selectedSize) {
                    alert('Please select a size');
                    return;
                  }
                  onAddToCart(product, selectedSize, qty);
                  onClose();
                }}
                text="ADD TO CART"
                bgColor="#FF2D00"
                textColor="#FF2D00"
                hoverTextColor="#fff"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── CART DRAWER ──────────────────────────────────────────────────
const CartDrawer = ({ cart, onClose, onRemove, onQtyChange }) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: 'min(420px, 100vw)',
          background: '#0a0a0a',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          animation: 'slideInRight 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF2D00' }} />
            <span
              style={{
                fontFamily: 'var(--font-bebas, sans-serif)',
                fontSize: '1.4rem',
                color: '#fff',
                letterSpacing: '0.2em',
              }}
            >
              YOUR BAG
            </span>
            <span
              style={{
                background: '#FF2D00',
                color: '#fff',
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {cart.reduce((s, i) => s + i.qty, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: 32,
              height: 32,
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 14,
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
              <p
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-bebas, sans-serif)',
                  fontSize: '1.1rem',
                }}
              >
                YOUR BAG IS EMPTY
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={`${item.id}-${item.size}`}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 12,
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '90%', height: '90%', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-bebas, sans-serif)',
                      color: '#fff',
                      fontSize: '1rem',
                      letterSpacing: '0.08em',
                      margin: '0 0 2px',
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, margin: '0 0 8px' }}>
                    UK {item.size} · {item.color}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 8,
                        padding: '3px 8px',
                      }}
                    >
                      <button
                        onClick={() => onQtyChange(item, Math.max(1, item.qty - 1))}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'rgba(255,255,255,0.4)',
                          cursor: 'pointer',
                          fontSize: 13,
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{ color: '#fff', fontSize: 13, minWidth: 16, textAlign: 'center' }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onQtyChange(item, item.qty + 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'rgba(255,255,255,0.4)',
                          cursor: 'pointer',
                          fontSize: 13,
                        }}
                      >
                        +
                      </button>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-bebas, sans-serif)',
                        color: '#fff',
                        fontSize: '1.1rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      ${item.price * item.qty}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    fontSize: 14,
                    alignSelf: 'flex-start',
                    padding: 2,
                    transition: 'color 0.2s',
                  }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-bebas, sans-serif)',
                  fontSize: '1.8rem',
                  color: '#fff',
                  letterSpacing: '0.05em',
                }}
              >
                ${total}
              </span>
            </div>
            <button
              style={{
                width: '100%',
                background: '#FF2D00',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '14px',
                fontFamily: 'var(--font-bebas, sans-serif)',
                fontSize: '1rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ── PRODUCT CARD ─────────────────────────────────────────────────
const ProductCard = ({ product, onQuickView, onAddToWishlist, isWishlisted, view }) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  if (view === 'list')
    return (
      <div
        onClick={() => router.push(`/productDetails/${product.id}`)}
        className="product-card-stagger"
        style={{
          display: 'flex',
          gap: 20,
          padding: '1.2rem',
          background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${hovered ? 'rgba(255,45,0,0.2)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: '1rem',
          transition: 'all 0.3s',
          cursor: 'pointer',
          alignItems: 'center',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            width: 100,
            height: 80,
            borderRadius: 10,
            overflow: 'hidden',
            flexShrink: 0,
            background: 'rgba(255,255,255,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={product.img}
            alt={product.name}
            style={{
              width: '90%',
              height: '90%',
              objectFit: 'contain',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.4s',
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
            <span
              style={{
                fontFamily: 'var(--font-bebas, sans-serif)',
                fontSize: '1.2rem',
                color: '#fff',
                letterSpacing: '0.08em',
              }}
            >
              {product.name}
            </span>
            {product.badge && (
              <span
                style={{
                  fontSize: 8,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  ...BADGE_COLORS[product.badge],
                  padding: '2px 7px',
                  borderRadius: 99,
                  border: `1px solid ${BADGE_COLORS[product.badge].border}`,
                }}
              >
                {product.badge}
              </span>
            )}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginBottom: 6 }}>
            {product.collection} · {product.surface.join(' / ')}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Stars rating={product.rating} />
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10 }}>
              ({product.reviews})
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-bebas, sans-serif)',
                fontSize: '1.4rem',
                color: '#fff',
              }}
            >
              ${product.price}
            </span>
            {discount > 0 && (
              <span
                style={{
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: 12,
                  textDecoration: 'line-through',
                }}
              >
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => onQuickView(product)}
            style={{
              background: '#FF2D00',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '7px 16px',
              cursor: 'pointer',
              fontFamily: 'var(--font-bebas, sans-serif)',
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Quick View
          </button>
        </div>
      </div>
    );

  return (
    <div
     onClick={() => router.push(`/productDetails/${product.id}`)}
      style={{
        position: 'relative',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(255,45,0,0.25)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(255,45,0,0.08)' : 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 2,
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
        }}
      >
        {product.badge && (
          <span
            style={{
              fontSize: 8,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              padding: '3px 9px',
              borderRadius: 99,
              ...BADGE_COLORS[product.badge],
              border: `1px solid ${BADGE_COLORS[product.badge].border}`,
            }}
          >
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span
            style={{
              fontSize: 8,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              padding: '3px 9px',
              borderRadius: 99,
              background: 'rgba(52,211,153,0.15)',
              color: '#34d399',
              border: '1px solid rgba(52,211,153,0.3)',
            }}
          >
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={e => {
          e.stopPropagation();
          onAddToWishlist(product.id);
        }}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          background: isWishlisted ? 'rgba(255,45,0,0.2)' : 'rgba(0,0,0,0.4)',
          border: `1px solid ${isWishlisted ? 'rgba(255,45,0,0.5)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '50%',
          width: 32,
          height: 32,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          transition: 'all 0.2s',
          color: isWishlisted ? '#FF2D00' : 'rgba(255,255,255,0.4)',
        }}
      >
        {isWishlisted ? '♥' : '♡'}
      </button>

      {/* Image */}
      <div
        style={{
          background: 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)',
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Color dot */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: product.colorHex,
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: `0 0 8px ${product.colorHex}60`,
          }}
        />
        <img
          src={product.img}
          alt={product.name}
          style={{
            width: '80%',
            height: '80%',
            objectFit: 'contain',
            transform: hovered ? 'scale(1.1) rotate(-2deg)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
          }}
        />

        {/* Hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedButton
            text="QUICK VIEW"
            onClick={() => onQuickView(product)}
            className=" "
            style={{
              background: '#FF2D00',
              border: 'none',
              boxShadow: '0 4px 20px rgba(255,45,0,0.3)',
            }}
          />
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '1rem' }}>
        <p
          style={{
            color: '#FF2D00',
            fontSize: 8,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom: 3,
          }}
        >
          {product.collection}
        </p>
        <h3
          className="font-bebas"
          style={{
            fontSize: '1.15rem',
            color: '#fff',
            letterSpacing: '0.06em',
            margin: '0 0 4px',
            lineHeight: 1.1,
          }}
        >
          {product.name}
        </h3>
        {product.wornBy && (
          <p
            style={{
              color: 'rgba(255,255,255,0.25)',
              fontSize: 10,
              letterSpacing: '0.05em',
              marginBottom: 6,
            }}
          >
            Worn by {product.wornBy}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Stars rating={product.rating} />
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10 }}>({product.reviews})</span>
        </div>

        {/* Surface chips */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
          {product.surface.map(s => (
            <span
              key={s}
              style={{
                fontSize: 8,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: 99,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              {s}
            </span>
          ))}
          <span
            style={{
              fontSize: 8,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              padding: '2px 8px',
              borderRadius: 99,
              background: `${product.colorHex}18`,
              border: `1px solid ${product.colorHex}30`,
              color: product.colorHex,
            }}
          >
            {product.color}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span
              className="font-bebas"
              style={{
                fontFamily: 'var(--font-bebas, sans-serif)',
                fontSize: '1.5rem',
                color: '#fff',
                letterSpacing: '0.04em',
              }}
            >
              ${product.price}
            </span>
            {discount > 0 && (
              <span
                className="font-bebas"
                style={{
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: '1rem',
                  textDecoration: 'line-through',
                }}
              >
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span
            style={{
              color: 'rgba(255,255,255,0.2)',
              fontSize: 10,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── FILTER SIDEBAR ───────────────────────────────────────────────
const FilterSidebar = ({ filters, setFilters, onClose, isMobile }) => {
  const categories = ['Speed', 'Control', 'Touch', 'Heritage'];
  const surfaces = ['FG', 'AG', 'MG'];
  const collections = [...new Set(products.map(p => p.collection))];

  const toggle = (key, val) =>
    setFilters(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val],
    }));

  const CheckRow = ({ label, checked, onChange, accent = '#FF2D00' }) => (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        padding: '6px 0',
        transition: 'opacity 0.2s',
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          flexShrink: 0,
          background: checked ? accent : 'transparent',
          border: `1px solid ${checked ? accent : 'rgba(255,255,255,0.15)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
      >
        {checked && <span style={{ color: '#fff', fontSize: 9, lineHeight: 1 }}>✓</span>}
      </div>
      <span
        style={{
          fontSize: 12,
          color: checked ? '#fff' : 'rgba(255,255,255,0.45)',
          letterSpacing: '0.05em',
          transition: 'color 0.2s',
        }}
      >
        {label}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
    </label>
  );

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Category */}
      <div>
        <p
          style={{
            color: '#FF2D00',
            fontSize: 9,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ display: 'inline-block', width: 12, height: 1, background: '#FF2D00' }} />
          Category
        </p>
        {categories.map(c => (
          <CheckRow
            key={c}
            label={c}
            checked={filters.category.includes(c)}
            onChange={() => toggle('category', c)}
          />
        ))}
      </div>

      {/* Price range */}
      <div>
        <p
          style={{
            color: '#FF2D00',
            fontSize: 9,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ display: 'inline-block', width: 12, height: 1, background: '#FF2D00' }} />
          Price Range
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
            color: 'rgba(255,255,255,0.5)',
            fontSize: 12,
          }}
        >
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min={0}
          max={350}
          step={10}
          value={filters.priceRange[1]}
          onChange={e =>
            setFilters(f => ({ ...f, priceRange: [f.priceRange[0], +e.target.value] }))
          }
          style={{ width: '100%', accentColor: '#FF2D00' }}
        />
      </div>

      {/* Surface */}
      <div>
        <p
          style={{
            color: '#FF2D00',
            fontSize: 9,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ display: 'inline-block', width: 12, height: 1, background: '#FF2D00' }} />
          Surface
        </p>
        {surfaces.map(s => (
          <CheckRow
            key={s}
            label={s}
            checked={filters.surface.includes(s)}
            onChange={() => toggle('surface', s)}
          />
        ))}
      </div>

      {/* Collection */}
      <div>
        <p
          style={{
            color: '#d4a017',
            fontSize: 9,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ display: 'inline-block', width: 12, height: 1, background: '#d4a017' }} />
          Collection
        </p>
        {collections.map(c => (
          <CheckRow
            key={c}
            label={c}
            checked={filters.collection.includes(c)}
            onChange={() => toggle('collection', c)}
            accent="#d4a017"
          />
        ))}
      </div>

      {/* Badge */}
      <div>
        <p
          style={{
            color: '#d4a017',
            fontSize: 9,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ display: 'inline-block', width: 12, height: 1, background: '#d4a017' }} />
          Availability
        </p>
        {['New', 'Sale', 'Limited', 'Signature', 'Heritage'].map(b => (
          <CheckRow
            key={b}
            label={b}
            checked={filters.badge.includes(b)}
            onChange={() => toggle('badge', b)}
            accent="#d4a017"
          />
        ))}
      </div>

      {/* Reset */}
      <AnimatedButton
        onClick={() =>
          setFilters({
            category: [],
            priceRange: [0, 350],
            surface: [],
            collection: [],
            badge: [],
          })
        }
        className="text-center"
        text="Reset All Filters"
      />
    </div>
  );

  if (isMobile)
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9997, display: 'flex' }}>
        <div
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
          }}
        />
        <div
          style={{
            position: 'relative',
            width: 'min(340px, 90vw)',
            background: '#0a0a0a',
            borderRight: '1px solid rgba(255,255,255,0.07)',
            overflowY: 'auto',
            padding: '1.5rem',
            animation: 'slideInLeft 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-bebas, sans-serif)',
                color: '#fff',
                fontSize: '1.3rem',
                letterSpacing: '0.2em',
              }}
            >
              FILTERS
            </span>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: 30,
                height: 30,
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 13,
              }}
            >
              ✕
            </button>
          </div>
          {content}
        </div>
      </div>
    );

  return (
    <div
      className="filter"
      style={{
        width: 220,
        flexShrink: 0,
        position: 'sticky',
        top: 80,
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        paddingRight: '0.5rem',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-bebas, sans-serif)',
          color: '#fff',
          fontSize: '1.2rem',
          letterSpacing: '0.2em',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            width: 3,
            height: 16,
            background: '#FF2D00',
            borderRadius: 99,
            display: 'inline-block',
          }}
        />
        FILTERS
      </p>
      {content}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════
// MAIN SHOP PAGE
// ══════════════════════════════════════════════════════════════════
export default function ShopPage() {
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 350],
    surface: [],
    collection: [],
    badge: [],
  });
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useGSAP(() => {
    const titleSplit = new SplitText('.shop-title', { type: 'chars' });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#shop',
        start: 'top center',
      },
    });

    scrollTimeline
      .from('.shop-subtitle', {
        y: 110,
        opacity: 0,
        stagger: 0.06,
        duration: 1.4,
        ease: 'expo.out',
      })
      .from(
        titleSplit.chars,
        {
          yPercent: 110,
          opacity: 0,
          stagger: 0.06,
          duration: 1.4,
          ease: 'expo.out',
        },
        '<',
      ) // 👈 same start time

      .from(
        '.product-count',
        {
          y: 110,
          opacity: 0,
          stagger: 0.06,
          duration: 1.4,
          ease: 'expo.out',
        },
        '<',
      )

      .from(
        '.filter',
        {
          x: -60,
          opacity: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '<',
      )

      .from(
        '.stagger',
        {
          y: 60,
          opacity: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '<',
      );
  });
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search)
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.collection.toLowerCase().includes(search.toLowerCase()),
      );
    if (filters.category.length) list = list.filter(p => filters.category.includes(p.category));
    if (filters.surface.length)
      list = list.filter(p => filters.surface.some(s => p.surface.includes(s)));
    if (filters.collection.length)
      list = list.filter(p => filters.collection.includes(p.collection));
    if (filters.badge.length) list = list.filter(p => filters.badge.includes(p.badge));
    list = list.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'reviews') list.sort((a, b) => b.reviews - a.reviews);
    else if (sort === 'newest')
      list.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
    return list;
  }, [filters, sort, search]);

  const addToCart = (product, size, qty = 1) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id && i.size === size);
      if (existing)
        return c.map(i =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i,
        );
      return [...c, { ...product, size, qty }];
    });
  };

  const removeFromCart = item =>
    setCart(c => c.filter(i => !(i.id === item.id && i.size === item.size)));

  const updateQty = (item, qty) =>
    setCart(c => c.map(i => (i.id === item.id && i.size === item.size ? { ...i, qty } : i)));

  const toggleWishlist = id =>
    setWishlist(w => (w.includes(id) ? w.filter(x => x !== id) : [...w, id]));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const activeFilterCount =
    filters.category.length +
    filters.surface.length +
    filters.collection.length +
    filters.badge.length +
    (filters.priceRange[1] < 350 ? 1 : 0);

  return (
    <section id="Shop">
      <div style={{ minHeight: '100vh', background: '#070707' }}>
        {/* ── TOP NAV ──────────────────────────────────── */}
        <nav
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'rgba(7,7,7,0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link
              href={'/'}
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: '1.3rem',
                letterSpacing: '0.2em',
                color: '#fff',
              }}
            >
              Back
            </Link>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: wishlist.length ? '#FF2D00' : 'rgba(255,255,255,0.4)',
                fontSize: 16,
                position: 'relative',
                padding: 6,
              }}
            >
              ♥
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#FF2D00',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 14,
                    height: 14,
                    fontSize: 8,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: cartCount > 0 ? '#FF2D00' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${cartCount > 0 ? '#FF2D00' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 10,
                padding: '7px 14px',
                cursor: 'pointer',
                color: '#fff',
                transition: 'all 0.3s',
              }}
            >
              <span style={{ fontSize: 13 }}>🛒</span>
              {cartCount > 0 && (
                <span
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* ── PAGE HEADER ──────────────────────────────── */}
        <div
          style={{
            padding: '3rem 1.5rem 2rem',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255,45,0,0.06), transparent)',
              pointerEvents: 'none',
            }}
          />
          <div className="flex flex-row justify-between max-w-[1400px] mx-auto   items-center gap-4">
            <div style={{}}>
              <div
                className="shop-subtitle"
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
              >
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF2D00' }} />
                <span
                  style={{
                    color: '#FF2D00',
                    fontSize: 9,
                    letterSpacing: '0.5em',
                    textTransform: 'uppercase',
                  }}
                >
                  Boot Collection · 2025
                </span>
              </div>
              <h1
                className="shop-title"
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  color: '#fff',
                  letterSpacing: '0.04em',
                  lineHeight: 0.9,
                  margin: '0 0 0.5rem',
                }}
              >
                ALL <span style={{ color: '#FF2D00' }}>BOOTS</span>
              </h1>
              <p
                className="product-count"
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, letterSpacing: '0.08em' }}
              >
                {filtered.length} of {products.length} products
              </p>
            </div>

            {/* Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '6px 12px',
                width: 'min(320px, 40vw)',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 23 }}>⌕</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search boots..."
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: 12,
                  letterSpacing: '0.05em',
                  width: '100%',
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    fontSize: 12,
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── TOOLBAR ──────────────────────────────────── */}
        <div
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              margin: '0 auto',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            {/* Mobile filter toggle */}
            {isMobile && (
              <button
                onClick={() => setFilterOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background:
                    activeFilterCount > 0 ? 'rgba(255,45,0,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeFilterCount > 0 ? 'rgba(255,45,0,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  padding: '7px 12px',
                  cursor: 'pointer',
                  color: activeFilterCount > 0 ? '#FF2D00' : 'rgba(255,255,255,0.5)',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                ≡ Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            )}

            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: 10,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                }}
              >
                Sort:
              </span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: '6px 10px',
                  color: '#fff',
                  fontSize: 11,
                  cursor: 'pointer',
                  outline: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                <option value="featured" style={{ background: '#111' }}>
                  Featured
                </option>
                <option value="newest" style={{ background: '#111' }}>
                  Newest
                </option>
                <option value="price-asc" style={{ background: '#111' }}>
                  Price: Low → High
                </option>
                <option value="price-desc" style={{ background: '#111' }}>
                  Price: High → Low
                </option>
                <option value="rating" style={{ background: '#111' }}>
                  Top Rated
                </option>
                <option value="reviews" style={{ background: '#111' }}>
                  Most Reviewed
                </option>
              </select>
            </div>

            {/* Active filter chips */}
            {filters.category.map(c => (
              <span
                key={c}
                onClick={() =>
                  setFilters(f => ({
                    ...f,
                    category: f.category.filter(x => x !== c),
                  }))
                }
                style={{
                  background: 'rgba(255,45,0,0.1)',
                  color: '#FF2D00',
                  border: '1px solid rgba(255,45,0,0.3)',
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  borderRadius: 99,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {c} ✕
              </span>
            ))}
            {filters.surface.map(s => (
              <span
                key={s}
                onClick={() =>
                  setFilters(f => ({
                    ...f,
                    surface: f.surface.filter(x => x !== s),
                  }))
                }
                style={{
                  background: 'rgba(212,160,23,0.1)',
                  color: '#d4a017',
                  border: '1px solid rgba(212,160,23,0.3)',
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  borderRadius: 99,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {s} ✕
              </span>
            ))}

            {/* View toggle */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              {['grid', 'list'].map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    background: view === v ? '#FF2D00' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${view === v ? '#FF2D00' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 8,
                    width: 32,
                    height: 32,
                    cursor: 'pointer',
                    color: view === v ? '#fff' : 'rgba(255,255,255,0.4)',
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  {v === 'grid' ? '⊞' : '☰'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN LAYOUT ──────────────────────────────── */}
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            paddingBlock: '1.5rem',
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Desktop sidebar */}
          {!isMobile && (
            <FilterSidebar filters={filters} setFilters={setFilters} isMobile={false} />
          )}

          {/* Product grid */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: '5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👟</div>
                <p
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: '1.5rem',
                    letterSpacing: '0.2em',
                  }}
                >
                  NO BOOTS FOUND
                </p>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, marginTop: 6 }}>
                  Try adjusting your filters
                </p>
              </div>
            ) : view === 'list' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filtered.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    view="list"
                    className="product-grid stagger"
                    onQuickView={setQuickViewProduct}
                    onAddToWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(p.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="product-grid stagger">
                {filtered.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    view="grid"
                    onQuickView={setQuickViewProduct}
                    onAddToWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(p.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MODALS / DRAWERS ──────────────────────────── */}
      {isMobile && filterOpen && (
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          isMobile={true}
          onClose={() => setFilterOpen(false)}
        />
      )}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={addToCart}
        />
      )}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQtyChange={updateQty}
        />
      )}
    </section>
  );
}
