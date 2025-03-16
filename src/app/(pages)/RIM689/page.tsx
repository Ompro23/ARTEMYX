"use client";

import { HeroHighlight } from "@/components/ui/hero-highlight";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BackgroundLines } from "@/components/ui/background-lines";
import productDetails from "@/data/influence/RIM689.json";
import Link from "next/link";


const ThreeDCardDemo: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(
    productDetails.products[0]
  );

  // Fetch Visitor Count
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch("/api/visitor-count/RIM689", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVisitorCount(data.count); // Assuming the server returns `{ count: number }`
      } catch (error) {
        console.error("Error fetching visitor count:", error);
        setVisitorCount(null); // Set to null if fetching fails
      }
    };

    fetchVisitorCount();
  }, []);

  const words = ["Influencers", "Artemyx", "Augmentation", "Amazingness"];

  return (
    <>
      <HeroHighlight className="h-full">
        <div
          className="z-1"
          style={{ backgroundImage: "url('/logo/logo-beig.png')" }}
        >
          {/* Flip Words Section */}
          <div className="h-40 flex justify-center items-center px-4">
            <div className="text-2xl lg:text-5xl mx-auto font-normal text-neutral-600 dark:text-[#e4dcc7]">
              The World of
              <FlipWords words={words} /> <br />
            </div>
          </div>

          {/* 3D Card Section */}
          <BackgroundLines>
            <CardContainer className="inter-var m-4 w-full lg:w-[77%] md:w-[60] h-full flex justify-center">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-[#e4dcc7]/[0.4] dark:bg-[black] dark:border-[#e4dcc7]/[0.2] border-black/[0.1] w-full lg:w-1/2 h-full rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-[#e4dcc7]"
                >
                  Rimpi Borpatragohain
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="/influensours/Rimpi_Borpatragohain.jpeg"
                    height={1000}
                    width={1000}
                    priority
                    className="h-80 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="Influencer Image"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-10 flex-col">
                  <CardItem
                    translateZ={20}
                    className="rounded-xl text-xs font-normal dark:text-[#e4dcc7]"
                  >
                    Hii my name is Rimpi Borpatragohain from north east india!
                  </CardItem>
                  <br />
                  <CardItem
                    translateZ={20}
                    className="rounded-xl text-xs font-normal dark:text-[#e4dcc7]"
                  >
                    I decided to go with this design because among realities of life, a bit of magic only makes us shine brighter ✨
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-[#e4dcc7] mt-2"
                  >
                    Visitors: {visitorCount !== null ? visitorCount : "Loading..."}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </BackgroundLines>

          {/* Product Display Section */}
          <div className="h-60 bg-transparent flex flex-col items-center justify-center rounded-md">
            <h1 className="md:text-7xl text-3xl lg:text-5xl font-bold text-center text-white relative">
              All Products
            </h1>
            <div className="w-[20rem] h-10 relative overflow-hidden rounded-b-full">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="rgba(255, 255, 255, 0.8)"
              />
            </div>
          </div>
          <div className="bg-gray-50 md:relative group/card dark:bg-[black] dark:hover:shadow-2xl dark:hover:shadow-[#e4dcc7]/[0.1] w-auto lg:w-[50vw] lg:h-[50] mb-20 rounded-xl p-4 lg:p-12 border lg:mx-auto m-3">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10 w-full justify-center">
              {/* Thumbnails */}
              <div className="flex flex-row lg:flex-col gap-2 lg:gap-10 w-full lg:w-[20%] overflow-x-auto lg:overflow-visible justify-center">
                {productDetails.products.map((product) => (
                  <div
                    key={product.id}
                    className={`cursor-pointer border ${selectedProduct.id === product.id
                        ? "border-[#e4dcc7]"
                        : "border-transparent"
                      } p-1 rounded-md transition-transform duration-300 ease-in-out transform lg:hover:scale-110 lg:hover:shadow-lg lg:dark:hover:shadow-[#e4dcc7]/[0.2] flex justify-center items-center`}
                    onMouseEnter={() => setSelectedProduct(product)}
                  >
                    <Image
                      src={product.thumbnail}
                      height={100}
                      width={100}
                      alt={product.name}
                      // className="lg:w-24 lg:h-24 rounded-md object-cover w-16 h-16" for large side images
                      className="lg:w-20 lg:h-20 rounded-md object-cover w-16 h-16"
                    />
                  </div>
                ))}
              </div>

              {/* Main Product Card */}
              <div className="flex items-center justify-center lg:w-[70%] w-full mt-4 lg:mt-0  dark:hover:shadow-[#e4dcc7]/[0.2]">
                <CardContainer className="w-full h-full dark:hover:shadow-[#e4dcc7]/[0.2]">
                  <CardBody className="bg-gray-50 relative group/card dark:bg-[black] lg:dark:hover:shadow-2xl lg:dark:hover:shadow-[#e4dcc7]/[0.4] rounded-xl border p-4 lg:p-6 w-full h-[35rem] flex flex-col justify-center">
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
                        src={selectedProduct.secondaryImage}
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
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-xs lg:text-sm mt-2 dark:text-[#e4dcc7] text-center justify-center"
                    >
                      Price : ₹{selectedProduct.price}
                    </CardItem>
                    <br />
                    <div className="flex justify-center mt-4">
                    <CardItem
                    translateZ={20}
                    as={Link}
                    href={`/checkout?productId=${selectedProduct.id}&source=RIM689`}
                    className="px-4 py-3 m-2 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]"
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
      </HeroHighlight>
    </>
  );
};

export default ThreeDCardDemo;