"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import productDetails from "@/data/product_details.json";
import Footer from "@/components/Footer";

const ThreeDCardDemo: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const updateVisitorCount = async () => {
      try {
        // Fetch and increment the visitor count
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

  return (
    <>
      <div className="min-h-screen bg-black py-12 pt-36 dark:bg-grid-white/[0.07]">
        {/* Influencer Card */}
        <CardContainer className="inter-var m-4 w-full h-full">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-half h-full rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Saloni Patel
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="/influensours/Saloni_Patel.png"
                height="1000"
                width="1000"
                priority // LCP Optimization
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Influencer Image"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                Visitors: {visitorCount}
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>

        {/* Product Cards */}
        <h1 className="text-lg md:text-6xl text-center font-sans font-bold mb-2 text-white">
          All Products
        </h1>
        <div className="flex flex-wrap justify-center">
          {productDetails.products.map((product) => (
            <CardContainer key={product.id} className="inter-var m-4">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {product.name}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {product.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={product.thumbnail}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="Product Thumbnail"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-20">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={product.link}
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    AR →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="a"
                    href={product.buylink}
                    target="__blank"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    Buy Now
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThreeDCardDemo;
