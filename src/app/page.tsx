"use client";

import { useState, useEffect } from "react";
import { Gift } from "lucide-react";
import confetti from "canvas-confetti";

export default function GiftReveal() {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleReveal = () => {
        setIsRevealed(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-red-700 to-green-700 flex flex-col items-center justify-center p-4'>
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-8 text-center'>
                Julegave fra mamma og pappa
            </h1>

            <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md transform transition-all duration-500 ease-in-out hover:scale-105'>
                <div className='flex flex-col items-center'>
                    <Gift className='w-16 h-16 text-red-500 mb-4' />
                    <p className='text-xl text-center mb-6'>
                        En spesiell gave venter på deg! Er du klar til å avsløre
                        den?
                    </p>
                    <button
                        onClick={handleReveal}
                        className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105'
                    >
                        Avslør gaven
                    </button>
                </div>
            </div>

            {isRevealed && <GiftCard />}
        </div>
    );
}

function GiftCard() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className='mt-8 bg-white rounded-lg shadow-xl p-8 w-full max-w-md opacity-0 transform translate-y-4 transition-all duration-500 ease-in-out'
            style={{ opacity: 1, transform: "translateY(0)" }}
        >
            <h2 className='text-3xl font-bold text-center mb-4'>Gratulerer!</h2>
            <p className='text-xl text-center mb-4'>
                Du har fått en episk gave til Fortnite:
            </p>
            <div
                className={`transition-opacity duration-1000 ${
                    showContent ? "opacity-100" : "opacity-0"
                }`}
            >
                <p
                    className='text-4xl font-bold text-center text-red-600 transform transition-all duration-500 ease-in-out'
                    style={{
                        transform: showContent ? "scale(1)" : "scale(0.5)",
                    }}
                >
                    13,500 V-Bucks!
                </p>
                <p className='mt-4 text-center text-gray-600'>
                    Nå kan du kjøpe alle de kule skinnene og emotes du ønsker
                    deg!
                </p>
            </div>
        </div>
    );
}
