"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card) => (
    <Card key={card.src} card={card} />
  ));

  return (
    <div className="w-full h-full py-20 dark:bg-black dark:bg-grid-[#e4dcc7]/[0.09]">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-[#e4dcc7] dark:text-[#e4dcc7] font-sans ">
      Enter the ARTEMYX.
      </h2>
      <Carousel items={cards} />
      <br />
      <br />
      <br />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Step 1",
    title: "Buy Tshirt.",
    src: "/info/step1.png",
    content: <DummyContent />,
  },
  {
    category: "Step 2",
    title: "Get Ar Lens.",
    src: "/info/step2.png",
    content: <DummyContent />,
  },
  {
    category: "Step 3",
    title: "Scan Tshirt.",
    src: "/info/step3.png",
    content: <DummyContent />,
  },

  {
    category: "Step 4",
    title: "Enjoy the AR Experience.",
    src: "/info/step4.gif",
    content: <DummyContent />,
  },
  {
    category: "Step 5",
    title: "Flex your AR.",
    src: "/info/step5.gif",
    content: <DummyContent />,
  },
  {
    category: "Step 6",
    title: "Buy more Tshirts.",
    src: "/info/step6.png",
    content: <DummyContent />,
  },
];

export default AppleCardsCarouselDemo;