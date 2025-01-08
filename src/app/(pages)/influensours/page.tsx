"use client";

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BackgroundLines } from "@/components/ui/background-lines";
import Link from "next/link";
import { motion } from "framer-motion";
import productDetails from "@/data/influence/influ-1.json";
import Footer from "@/components/Footer";

const ThreeDCardDemo: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(
    productDetails.products[0]
  );

  useEffect(() => {
    const updateVisitorCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/influensours", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error("Error updating visitor count:", error);
      }
    };

    updateVisitorCount();
  }, []);
  const words = ["Influencers", "Artemyx", "Ar", "Amazingness"];
  return (
    <>
      <HeroHighlight className="h-full">
        <div
          className="z-1"
          style={{ backgroundImage: "url('/logo/logo-beig.png')" }}
        >
          {/* Influencer Card */}

          {/* <h1 className="md:text-7xl text-3xl lg:text-5xl font-bold text-center text-white relative h-40 mt-20">
        The World of Influencers
      </h1> */}
          <div className="h-40 flex justify-center items-center px-4">
            <div className="text-2xl lg:text-5xl mx-auto font-normal text-neutral-600 dark:text-[#e4dcc7] ">
              The World of
              <FlipWords words={words} /> <br />
            </div>
          </div>
          <BackgroundLines className="">
            <CardContainer className="inter-var m-4 w-full h-full flex justify-center">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-[#e4dcc7]/[0.4] dark:bg-[black] dark:border-[#e4dcc7]/[0.2] border-black/[0.1] w-full lg:w-1/2 h-full rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-[#e4dcc7]"
                >
                  <Highlight className="text-black dark:text-white">
                    Saloni Patel
                  </Highlight>
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="/influensours/Saloni_Patel.png"
                    height={1000}
                    width={1000}
                    priority
                    className="h-80 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="Influencer Image"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-20 flex-col">
                  <CardItem
                    translateZ={20}
                    className="rounded-xl text-xs font-normal dark:text-[#e4dcc7]"
                  >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Atque, nesciunt illo?
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-[#e4dcc7] mt-2"
                  >
                    Visitors: {visitorCount}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </BackgroundLines>
          {/* Dynamic Product Card */}
          <div className="h-60 bg-transparent flex flex-col items-center justify-center  rounded-md">
            <h1 className="md:text-7xl text-3xl lg:text-5xl font-bold text-center text-white relative ">
              All Products
            </h1>
            <div className="w-[20rem] h-10 relative overflow-hidden rounded-b-full">
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="rgba(255, 255, 255, 0.8)"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>
            <div className="bg-gray-50 md:relative group/card dark:bg-[black] dark:hover:shadow-2xl dark:hover:shadow-[#e4dcc7]/[0.1] dark:bg-[black] dark:border-[#e4dcc7]/[0.2]  w-auto lg:w-[50vw] lg:h-[50rem] rounded-xl p-4 lg:p-12 border lg:mx-auto m-3">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10 w-full justify-center align-center content-center">
              {/* Left Side: Product Thumbnails */}
              <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-[30%] overflow-x-auto lg:overflow-visible justify-center">
              {productDetails.products.map((product) => (
                <div
                key={product.id}
                className={`cursor-pointer border ${
                  selectedProduct.id === product.id
                  ? "border-[#e4dcc7]"
                  : "border-transparent"
                } p-1 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg dark:hover:shadow-[#e4dcc7]/[0.2]`}
                onMouseEnter={() => setSelectedProduct(product)}
                >
                <Image
                  src={product.thumbnail}
                  height={50}
                  width={120}
                  alt={product.name}
                  className="w-30 lg:w-30 h-30 rounded-md object-cover cursor-pointer hover:opacity-80 align-center justify-center content-center"
                />
                </div>
              ))}
              </div>

              {/* Right Side: Main Display Card */}
              <div className="flex items-center justify-center lg:w-[70%] w-full mt-4 lg:mt-0 dark:hover:shadow-[#e4dcc7]/[0.2]">
                <CardContainer className="w-full h-full dark:hover:shadow-[#e4dcc7]/[0.2]">
                  <CardBody className="bg-gray-50 relative group/card dark:bg-[black] dark:hover:shadow-2xl dark:hover:shadow-[#e4dcc7]/[0.4] dark:bg-[black] dark:border-[#e4dcc7]/[0.2]  rounded-xl border p-4 lg:p-6 w-full h-full flex flex-col justify-center">
                    <CardItem
                      translateZ="50"
                      className="text-lg lg:text-xl font-bold text-neutral-600 dark:text-[#e4dcc7] text-center"
                    >
                      {selectedProduct.name}
                    </CardItem>

                    <CardItem
                      translateZ="100"
                      className="flex justify-center items-center flex-grow w-[100%]"
                    >
                      <Image
                        src={selectedProduct.thumbnail}
                        height={500}
                        width={500}
                        className="h-full w-full object-contain rounded-xl mx-auto"
                        alt="Product Thumbnail"
                      />
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-xs lg:text-sm mt-2 dark:text-[#e4dcc7] text-center"
                    >
                      {selectedProduct.description}
                    </CardItem>
                    <br />
                    <div className="flex justify-center mt-4">
                      <CardItem
                        translateZ={20}
                        as="a"
                        href={selectedProduct.buylink}
                        target="__blank"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4] text-xs font-bold"
                      >
                        Buy Now
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </HeroHighlight>
    </>
  );
};

export default ThreeDCardDemo;
