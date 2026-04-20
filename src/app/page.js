import Hero from '@/Components/Hero';
import BootSection from '@/Components/BootSection';
import About from '@/Components/About';
import Art from '@/Components/Art';
import BootMenu from '@/Components/BootMenu';
import Reviews from '@/Components/Reviews';
import Stores from '@/Components/StoreLocation';

export default function Home() {
  return (
    <main>
      <Hero />
      <BootSection />
      <About />
      <Art />
      <BootMenu />
      <Reviews />
      <Stores />
    </main>
  );
}
