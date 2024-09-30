"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export function BackgroundBeamsDemo() {
    const [email, setEmail] = useState("");
    const [query, setQuery] = useState("");

    // Updated chat IDs for multiple devices
    const chatIds = [2133944571, 6409031492];  // Added 6409031492

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Construct the message
        const message = `New contact form submission:\n\nEmail: ${email}\nQuery: ${query}\nPhone Number: 6351497589`;

        // Telegram API URL base
        const telegramAPIBase = `https://api.telegram.org/bot7554727592:AAElzbLj4vMTUUWCwP4nQwWpn13lpq3zsRw/sendMessage`;

        // Send the message to each chat ID
        for (const chatId of chatIds) {
            try {
                const response = await fetch(telegramAPIBase, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_id: chatId,   // Current chat ID
                        text: message,     // Message content
                    }),
                });

                if (response.ok) {
                    console.log(`Message sent successfully to chat ID: ${chatId}`);
                } else {
                    console.error(`Failed to send message to chat ID: ${chatId}`, await response.json());
                }
            } catch (error) {
                console.error(`Error sending message to chat ID: ${chatId}`, error);
            }
        }

        // Reset form fields
        setEmail("");
        setQuery("");
    };

    return (
        <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="relative z-10 text-4xl sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
                    Contact Us
                </h1>
               
                <form onSubmit={handleSubmit} className="relative z-10 mt-4">
                    <input
                        type="email"
                        placeholder="  Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full bg-neutral-950 placeholder:text-neutral-700 mb-4"
                        required
                    />
                    <textarea
                        placeholder="  Your query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full bg-neutral-950 placeholder:text-neutral-700 mb-4"
                        rows={4}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white rounded-lg py-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <BackgroundBeams />
        </div>
    );
}

export default BackgroundBeamsDemo;
