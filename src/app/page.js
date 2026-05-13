import Hero from '@/Components/Hero';
import BootSection from '@/Components/BootSection';
import About from '@/Components/About';
import Art from '@/Components/Art';
import BootMenu from '@/Components/BootMenu';
import Reviews from '@/Components/Reviews';
import Stores from '@/Components/StoreLocation';
import ArtSection from '@/Components/ArtSectionMobile';

export default function Home() {
  return (
    <main>
      <Hero />
      <BootSection />
      <About />
      <div className="hidden md:block">
        <Art />
      </div>
      <div className=" block md:hidden ">
        <ArtSection />
      </div>
      <BootMenu />
      <Reviews />
      <Stores />
    </main>
  );
}
