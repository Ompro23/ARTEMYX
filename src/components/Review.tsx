"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[30rem] flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.07] items-center justify-center relative overflow-hidden ">
      <h1 className="text-3xl align-center mb-10 text-white">Hear Our Harmony: Voices of Amazingness</h1>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The AR feature on these t-shirts is mind-blowing! It's like stepping into a new dimension every time I scan it.",
    name: "Alex Johnson",
    title: "Tech Enthusiast",
  },
  {
    quote:
      "I love how the designs come to life with AR. It's a perfect blend of fashion and technology.",
    name: "Samantha Lee",
    title: "Fashion Blogger",
  },
  {
    quote:
      "These AR t-shirts are a game-changer. The interactive experience is something I've never seen before.",
    name: "Michael Brown",
    title: "Gadget Guru",
  },
  {
    quote:
      "The quality of the t-shirts is fantastic, and the AR feature adds a unique twist that makes them stand out.",
    name: "Emily Davis",
    title: "Lifestyle Influencer",
  },
  {
    quote:
      "Wearing these AR t-shirts is so much fun! It's like having a piece of the future in my wardrobe.",
    name: "Chris Wilson",
    title: "Early Adopter",
  },
];
export default InfiniteMovingCardsDemo;