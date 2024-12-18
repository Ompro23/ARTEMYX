"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import productDetails from "@/data/product_details.json";
import Footer from "@/components/Footer";

const ThreeDCardDemo: React.FC = () => {
  return (
    <><div className="min-h-screen bg-black py-12 pt-36 dark:bg-grid-[#e4dcc7]/[0.09]">
      <h1 className="text-lg md:text-6xl text-center font-sans font-bold mb-2 text-[#e4dcc7]">All Products</h1>
      <div className="flex flex-wrap justify-center">
        {productDetails.products.map((product) => (
          <CardContainer key={product.id} className="inter-var m-4">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-[#e4dcc7]/[0.2] dark:bg-black dark:border-[#e4dcc7]/[0.4] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-[#e4dcc7]"
              >
                {product.name}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-[#e4dcc7"
              >
                {product.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={product.thumbnail}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-2xl"
                  alt="thumbnail" />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={product.link}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-[#e4dcc7]"
                >
                  AR →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={product.buylink}
                  target="__blank"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]"
                >
                  Buy Now
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

        ))}
      </div>
      <br />
    </div><Footer /></>

  );
};

export default ThreeDCardDemo;
