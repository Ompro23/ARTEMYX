"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
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
          </MenuItem>
        </Link>

        <Link href="/about">
          <MenuItem setActive={setActive} active={active} item="About">
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
