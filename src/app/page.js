import Image from "next/image";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Navbar from "@/Components/Navbar";
import Hero from "@/Components/Hero";

gsap.registerPlugin(ScrollTrigger, SplitText);
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="h-screen bg-black"  />


    </main>
  );
}
