"use client";

import { useState, useEffect } from 'react';

export default function Loading() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) {
        return null; // or return your main content here
    }

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <img src="/logo/artemyx.gif" alt="Loading" className="w-auto" />
        </div>
    );
}