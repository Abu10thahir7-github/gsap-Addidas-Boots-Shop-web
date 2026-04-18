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
import Stores from '@/Components/StoreLocation';
import Footer from '@/Components/Footer';

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.registerPlugin(ScrollTrigger, SplitText);
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BootSection />
      <About />
      {/* <Art /> */}
      <BootMenu />
      <Reviews />
      <Stores />
    </main>
  );
}
