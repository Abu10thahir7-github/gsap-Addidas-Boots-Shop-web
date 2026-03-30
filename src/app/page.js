import Image from "next/image";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Navbar from "@/Components/Navbar";

gsap.registerPlugin(ScrollTrigger, SplitText);
export default function Home() {
  return (
    <main>
      <Navbar />
    </main>
  );
}
