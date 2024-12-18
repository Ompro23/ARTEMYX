"use client";

import { useState, useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader"; // Import the Loader component

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
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Simulate a 2-second loading delay
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after timeout
    }, 7000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {isLoading ? (
          <Loader onFinish={() => setIsLoading(false)} /> // Show loader while loading
        ) : (
          <>
            <div>
              <Navbar />
            </div>
            {children}
          </>
        )}
      </body>
    </html>
  );
}
