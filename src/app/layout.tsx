"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname(); // Get current route

  // Define routes where Navbar should not appear
  const noNavbarRoutes = ["/DMK300", "/RIM689", "/SAL100","/checkout","/artemin"]; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  const showNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {isLoading ? (
          <Loader onFinish={() => setIsLoading(false)} />
        ) : (
          <>
            {showNavbar && <Navbar />} {/* Conditionally render Navbar */}
            {children}
          </>
        )}
      </body>
    </html>
  );
}
