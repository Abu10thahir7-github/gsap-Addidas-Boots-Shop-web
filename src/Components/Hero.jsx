'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import HeroLeft from '../../public/assets/images/hero-left.png';
import HeroRight from '../../public/assets/images/hero-right.png';

gsap.registerPlugin(ScrollTrigger, SplitText); // ✅ register both

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText('.title', {
      type: 'chars, words',
    });

   

    // Apply text-gradient class once before animating
    heroSplit.chars.forEach(char => char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
    });

    gsap.from('.subtitle', {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1,
    });

    // ✅ RESPONSIVE ANIMATION
    const mm = gsap.matchMedia();

    mm.add('(max-width: 767px)', () => {
      // 📱 MOBILE
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        .to(
          '.hero-left-boot',
          {
            y: 670,
            x: 100,
            rotate: -30,
            ease: 'power4.inOut',
          },
          0,
        )
        .to(
          '.hero-right-boot',
          {
            y: 650,
            x: -100,
            rotate: 50,
            ease: 'power4.inOut',
          },
          0,
        )
    });

    mm.add('(min-width: 768px)', () => {
      // 💻 DESKTOP
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        .to(
          '.hero-left-boot',
          {
            y: 700,
            x: 200,
            rotate: -30,
            ease: 'power4.inOut',
          },
          0,
        )
        .to(
          '.hero-right-boot',
          {
            y: 590,
            x: -200,
            rotate: 50,
            ease: 'power4.inOut',
          },
          0,
        )
    });

    const startValue = isMobile ? 'top 90%' : 'center 60%';
    const endValue = isMobile ? '120% top' : 'bottom top';

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'video',
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="  ">
        <Image
          src={HeroLeft}
          className="absolute w-[170px] md:w-[350px]  h-auto left-[-100px] md:left-[-122px] md:bottom-[272px] hero-left-boot"
          width={1000}
          height={500}
          alt="hero-left"
          priority
        />
        <Image
          src={HeroRight}
          className="absolute w-[170px] md:w-[350px] h-auto right-[-100px] md:right-[-122px] md:bottom-[102px] hero-right-boot"
          width={1000}
          height={500}
          alt="hero-right"
          priority
        />

        <div className="body  mx-auto max-w-6xl">
          <div className="content  ">
            <h1 className="title font-bebas">Addidas</h1>
            <div className="space-y-5 ">
              <p></p>
              <p className="subtitle font-bebas text-3xl md:text-5xl text-center">
                BORN FOR <span className="text-[#FF2D00]">SPEED</span> <br />{' '}
                <span className="text-[#FF2D00]">BUILT</span> FOR GLORY
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Wrapper fills the full viewport */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/assets/video/output.mp4"
          className="w-full h-full object-cover !top-0  "
        />
      </div>
    </>
  );
};

export default Hero;
