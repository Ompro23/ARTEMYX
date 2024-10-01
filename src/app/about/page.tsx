"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
    {
        title: "Collaborative Editing",
        description:
            "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                Collaborative Editing
            </div>
        ),
    },
    {
        title: "Version control",
        description:
            "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
                Version control
            </div>
        ),
    },
    {
        title: "Running out of content",
        description:
            "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: (
            <div className="h-full w-full custom-red-bg flex items-center justify-center text-white">
                Running out of content
            </div>
        ),
    },
    {
        title: "Seamless Integration",
        description:
            "Integrate our platform with your existing tools and workflows effortlessly. Our seamless integration capabilities ensure that you can continue using the tools you love while enhancing your productivity with our features.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--pink-500))] flex items-center justify-center text-white mb-2 sm:mb-0">
                Seamless Integration
            </div>
        ),
    },
    {
        title: "",
        description:
            "Enjoy the AR Experience",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--pink-500))] flex items-center justify-center text-white mb-2 sm:mb-0">
                
            </div>
        ),
    },
 
    
];

const AboutPage = () => {
    return (
        <div className="">
            <StickyScroll content={content} />
        </div>
    );
}

export default AboutPage;
