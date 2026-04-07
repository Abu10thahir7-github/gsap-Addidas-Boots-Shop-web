'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import HeroLeft from '../../public/assets/hero-left.png';
import HeroRight from '../../public/assets/hero-right.png';

gsap.registerPlugin(ScrollTrigger, SplitText); // ✅ register both

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText('.title', {
      type: 'chars, words',
    });

    const paragraphSplit = new SplitText('.subtitle', {
      type: 'lines',
    });

    // Apply text-gradient class once before animating
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
      stagger: 0.06,
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
      .to('.hero-left-boot', { y: 200, x: 100 }, 0)
      .to('.hero-right-boot', { y: -200, x: -200 }, 0)
      .to('.arrow', { y: 100 }, 0);

    const startValue = isMobile ? 'top 50%' : 'center 60%';
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
        <h1 className="title">Addidas</h1>

        <Image
          src={HeroLeft}
          className="absolute w-[350px] h-auto left-[-122px] bottom-[272px] hero-left-boot"
          width={1000}
          height={500}
          alt="hero-left"
        />
        <Image
          src={HeroRight}
          className="absolute w-[350px] h-auto right-[-122px] bottom-[102px] hero-right-boot"
          width={1000}
          height={500}
          alt="hero-right"
        />

        {/* ✅ Add the "body" class here */}
        <div className="body container mx-auto absolute left-1/2 -translate-x-1/2 lg:bottom-20 top-auto md:top-[30vh] flex justify-between items-end px-5">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p></p>
              <p className="subtitle font-bebas">
                BORN FOR <span className="text-[#FF2D00]">SPEED</span> <br /> <span className="text-[#FF2D00]">BUILT</span>  FOR GLORY
              </p>
            </div>

            <div className="view-cocktails ">
              <a href="#boots" className='font-light tracking-widest font-bebas'>View Boots</a>
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
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
};

export default Hero;
