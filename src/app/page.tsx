import Image from "next/image";
import Hero from "@/components/Hero"; // Adjust the path as necessary
import Info from "@/components/Info"; // Adjust the path as necessary
import Review from "@/components/Review";
import Wave from "@/components/Wave";
import Tooltip from "@/components/Tooltip";
import ThreeDcard from "@/components/Threedcard";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    < >
      <Hero />
      <Info />
      <Review/>
      <Wave/>
      {/* <ThreeDcard/> */}
      <Footer/>
    </>
  );
}


// className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]"