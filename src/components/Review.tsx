"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-[#e4dcc7]/[0.09] items-center justify-center relative overflow-hidden border-[#e4dcc7]">
      <h1 className="text-3xl align-center mb-20 text-[#e4dcc7]">Hear Our Harmony: Voices of Amazingness</h1>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
      <br />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The AR feature on these t-shirts is mind-blowing! It's like stepping into a new dimension every time I scan it.",
    name: "Arjun Mehta",
    title: "Tech Enthusiast",
  },
  {
    quote:
      "I love how the designs come to life with AR. It's a perfect blend of fashion and technology.",
    name: "Priya Sharma",
    title: "Fashion Blogger",
  },
  {
    quote:
      "These AR t-shirts are a game-changer. The interactive experience is something I've never seen before.",
    name: "Ravi Patel",
    title: "Gadget Guru",
  },
  {
    quote:
      "The quality of the t-shirts is fantastic, and the AR feature adds a unique twist that makes them stand out.",
    name: "Anjali Singh",
    title: "Lifestyle Influencer",
  },
  {
    quote:
      "Wearing these AR t-shirts is so much fun! It's like having a piece of the future in my wardrobe.",
    name: "Vikram Rao",
    title: "Early Adopter",
  },
];
export default InfiniteMovingCardsDemo;