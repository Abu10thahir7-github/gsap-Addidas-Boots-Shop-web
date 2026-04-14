import Image from 'next/image';
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';
import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero';
import BootSection from '@/Components/BootSection';
import About from '@/Components/About';
import Art from '@/Components/Art';
import BootMenu from '@/Components/BootMenu';
import Reviews from '@/Components/Reviews';

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.registerPlugin(ScrollTrigger, SplitText);
export default function Home() {
  return (
    <main>
      <Navbar />

      <div className="h-screen"></div>
      <Hero />
      <BootSection />
      <About />
      <Art />
      <BootMenu />
      <Reviews />
    </main>
  );
}
