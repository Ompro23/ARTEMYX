"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Blaze",
    designation: "Error 404",
    image:
      "/avtar/blaze.png",
  },
  {
    id: 2,
    name: "ChanChan",
    designation: "Hacker",
    image:
      "/avtar/chanchal.png",
  },
  {
    id: 3,
    name: "Omega",
    designation: "Magician",
    image:
      "/avtar/omega.png",
  },
  {
    id: 4,
    name: "H1000",
    designation: "Creator",
    image:
      "/avtar/h100.png",
  },
  // {
  //   id: 5,
  //   name: "Tyler Durden",
  //   designation: "Soap Developer",
  //   image:
  //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  // },
  // {
  //   id: 6,
  //   name: "Dora",
  //   designation: "The Explorer",
  //   image:
  //     "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  // },
];

export function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40 ">
      <p className="text-2xl md:text-4xl lg:text-7xl text-[white] font-bold inter-var text-center">
        Meet The Fanatics
      </p>
      <br />
      <br />
      
      <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
      
    </WavyBackground>
  );
}

export default WavyBackgroundDemo;