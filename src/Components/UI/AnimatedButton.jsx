import { useRef } from 'react';
import gsap from 'gsap';

const AnimatedButton = ({
  text = 'BUTTON',
  href = '#',
  className = '',
  onClick,
  textColor = '#fff',
  bgColor = '#fff',
  hoverTextColor = '',
  style = {},
  Parentstyle={},
  children,
}) => {
  const btnRef = useRef(null);

  const onEnter = e => {
    const el = e.currentTarget;

    gsap.to(el.querySelector('.cta-fill'), {
      scaleY: 1,
      transformOrigin: 'bottom center',
      duration: 0.35,
      ease: 'power3.out',
    });

    gsap.to(el.querySelector('.cta-label'), {
      color: '#000',
      duration: 0.3,
    });
  };

  const onLeave = e => {
    const el = e.currentTarget;

    gsap.to(el.querySelector('.cta-fill'), {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.28,
      ease: 'power2.in',
    });

    gsap.to(el.querySelector('.cta-label'), {
      color: hoverTextColor,
      duration: 0.3,
    });

    gsap.to(el.querySelector('.cta-label'), {
      color: textColor,
      duration: 0.25,
    });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative inline-block overflow-hidden px-4 py-1.5 rounded-xl cursor-pointer ${className}`}
      style={{
        border: '1px solid rgba(255,255,255,0.18)',
        background: 'rgba(255,255,255,0.06)',
        ...Parentstyle,
      }}
    >
      <span
        className="cta-fill absolute inset-0   rounded-xl"
        style={{
          transform: 'scaleY(0)',
          transformOrigin: 'bottom center',
          background: bgColor,

        }}
      />

      <span
        className="cta-label relative z-10 font-bebas text-[13px] tracking-[0.18em]  "
        style={{ color: textColor , ...style }}
      >
        {children ? children : text}
      </span>
    </a>
  );
};

export default AnimatedButton;
