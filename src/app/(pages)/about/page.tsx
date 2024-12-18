"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { BentoGrid } from "@/components/ui/bento-grid";
import BentoGridThirdDemo from "@/components/bentogrid";
import TextRevealCardPreview from "@/components/testrevelcard";
import Footer from "@/components/Footer";



const AboutPage = () => {
    return (
            <>
        <div className="dark:bg-black dark:bg-grid-[#e4dcc7]/[0.09] p-4 sm:p-6 md:p-8 lg:p-10">
            <TextRevealCardPreview />
            <BentoGridThirdDemo />
        </div>
        <Footer />
        
        </>
    );
}

export default AboutPage;
