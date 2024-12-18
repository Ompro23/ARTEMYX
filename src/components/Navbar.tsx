"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-[#e4dcc7]">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 left-1/2 transform -translate-x-1/2 justify-center align-center max-w-xl mx-auto z-50", className)} // Changed max-w-2xl to max-w-xl
    >
      <Menu setActive={setActive}>
        <Link href="/">
          <MenuItem setActive={setActive} active={active} item="Home">
          </MenuItem>
        </Link>

        <Link href="/shop">
          <MenuItem setActive={setActive} active={active} item="Shop">
          {/* <div className="flex flex-col space-y-4 text-sm"> */}
            {/* <HoveredLink href="/shop">Tshirt</HoveredLink>
            <HoveredLink href="/hoddie">Hoddie</HoveredLink>
            <HoveredLink href="/ondemand">On Demand</HoveredLink> */}
            {/* <HoveredLink href="/enterprise">Enterprise</HoveredLink> */}
          {/* </div> */}
          </MenuItem>
        </Link>

        <Link href="/about">
          <MenuItem setActive={setActive} active={active} item="About">
            {/* <div className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
            </div> */}
          
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
