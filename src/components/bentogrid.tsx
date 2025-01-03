"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function BentoGridThirdDemo() {
  return (
    <BentoGrid className="max-w-7xl top-0 md:auto-rows-[20rem] text-[#e4dcc7]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-[#e4dcc7]/[0.3] bg-dot-[#e4dcc7]/[0.3] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-[#e4dcc7]/[0.3] p-2  items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900">
          <p className="text-xs text-[#e4dcc7]">Ohh todays fashion is so boring</p>
        </div>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-[#e4dcc7]/[0.3] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900">
          <p className="text-xs text-[#e4dcc7]">Lets add some magic...</p>
        </div>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-[#e4dcc7]/[0.3] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900">
          <p className="text-xs text-[#e4dcc7]">Art + Mix Reality = Artemyx</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const texts = [
    "Augmented",
    "Reality",
    "Technology",
    "Elevating",
    "Modern",
    "Youthful",
    "Experiences",
  ];
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-[#e4dcc7]/[0.3] bg-dot-[#e4dcc7]/[0.3] flex-col space-y-2"
    >
      {texts.map((text, i) => (
        <motion.div
          key={"skeleton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-[#e4dcc7]/[0.3] p-2 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        >
          <p className="text-xs text-[#e4dcc7]">{text}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-[#e4dcc7]/[0.3] rounded-lg bg-dot-[#e4dcc7]/[0.3] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-[#e4dcc7]/[0.3] bg-dot-[#e4dcc7]/[0.3] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-[#e4dcc7]/[0.3] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Image
          src="/avtar/h100.png"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-[#e4dcc7] mt-4">
          Design Creating
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Build
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-[#e4dcc7]/[0.3] border border-neutral-200 flex flex-col items-center justify-center">
        <Image
          src="/avtar/omega.png"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-[#e4dcc7] mt-4">
          Ar Implementation
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Integration
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-[#e4dcc7]/[0.3] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Image
          src="/avtar/blaze.png"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-[#e4dcc7] mt-4">
          Accessiable through Snapchat
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Deployment
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-[#e4dcc7]/[0.3] bg-dot-[#e4dcc7]/[0.3] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-[#e4dcc7]/[0.3] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <Image
          src="/avtar/chanchal.png"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-[#e4dcc7]">Your Wish is Our Command.</p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-[#e4dcc7]/[0.3] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-[#e4dcc7]">Amazing.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "AR Based Digital Avatar",
    description: (
      <span className="text-sm text-[#e4dcc7]">
        Experience our AR-powered Clothes which embrace the Amazing of Future.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Customzied Design With AR",
    description: (
      <span className="text-sm text-[#e4dcc7]">
        Get personalized design and AR features.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Dynamic Style Suggestions",
    description: (
      <span className="text-sm text-[#e4dcc7]">
        Discover new styles and outfits curated just for you.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Three Phase Work",
    description: (
      <span className="text-sm text-[#e4dcc7]">
        Our Work is Done in three Phase.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "On Demand Products",
    description: (
      <span className="text-sm text-[#e4dcc7]">
        Make Order for your specific on demand clothing.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
export default BentoGridThirdDemo;