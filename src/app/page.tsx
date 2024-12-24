"use client";

import { useState, useEffect } from "react";
import { Gift, Gamepad2, Snowflake } from "lucide-react";

export default function GiftReveal() {
    const [isRevealed, setIsRevealed] = useState(false);
    const [shakeGift, setShakeGift] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [shakeCount, setShakeCount] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleReveal = () => {
        setIsRevealed(true);
        if (typeof window !== "undefined") {
            import("canvas-confetti").then((confetti) => {
                confetti.default({
                    particleCount: 200,
                    spread: 90,
                    origin: { y: 0.6 },
                    ticks: 400,
                    colors: [
                        "#FFD700",
                        "#FF4500",
                        "#00FF00",
                        "#1E90FF",
                        "#FF1493",
                    ],
                });
            });
        }
    };

    const handleShake = () => {
        setShakeGift(true);
        setShakeCount((prevCount) => prevCount + 1);
        if (typeof window !== "undefined") {
            const snowflakes = document.querySelectorAll(".snowflake");
            snowflakes.forEach((flake) => {
                const element = flake as HTMLElement;
                element.style.animation = "none";
                void element.offsetHeight; // Trigger reflow
                element.style.animation = "";
            });
        }
        setTimeout(() => setShakeGift(false), 500);
    };

    if (!mounted) {
        return null; // or a loading spinner
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-red-700 to-green-700 flex flex-col items-center justify-center p-4'>
            <h1 className='text-4xl md:text-6xl font-extrabold text-white mb-8 text-center animate-pulse'>
                Julegave fra mamma og pappa
            </h1>

            {!isRevealed ? (
                <div
                    className={`relative bg-red-500 rounded-lg shadow-xl p-8 w-full max-w-md transform transition-all duration-500 ease-in-out hover:scale-105 ${
                        shakeGift ? "animate-shake" : ""
                    }`}
                >
                    <div className='absolute inset-0 overflow-hidden'>
                        {[...Array(20)].map((_, i) => (
                            <Snowflake
                                key={i}
                                className='snowflake text-white opacity-50 absolute animate-float'
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    fontSize: `${Math.random() * 20 + 10}px`,
                                    animationDuration: `${
                                        Math.random() * 3 + 2
                                    }s`,
                                    animationDelay: `${Math.random() * 2}s`,
                                }}
                            />
                        ))}
                    </div>
                    <div className='absolute top-0 left-1/2 w-4 h-full bg-green-600 transform -translate-x-1/2'></div>
                    <div className='absolute top-1/2 left-0 w-full h-4 bg-green-600 transform -translate-y-1/2'></div>
                    <div className='relative flex flex-col items-center z-10'>
                        <Gift className='w-24 h-24 text-white mb-4 animate-bounce' />
                        <p
                            className='text-2xl text-center mb-6 text-yellow-200 font-bold'
                            style={{
                                textShadow:
                                    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                            }}
                        >
                            En spesiell gave venter på deg! Er du klar til å
                            avsløre den?
                        </p>
                        <div className='relative flex flex-col sm:flex-row justify-between w-full mt-4 z-20 px-2 sm:px-4 space-y-4 sm:space-y-0 sm:space-x-4'>
                            <button
                                onClick={handleShake}
                                className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 sm:px-4 text-sm sm:text-base rounded-full transition duration-300 ease-in-out transform hover:scale-105 border-2 border-white'
                            >
                                Rist på gaven
                            </button>
                            {shakeCount >= 10 ? (
                                <button
                                    onClick={handleReveal}
                                    className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 sm:px-4 text-sm sm:text-base rounded-full transition duration-300 ease-in-out transform hover:scale-105 border-2 border-white'
                                >
                                    Åpne gaven
                                </button>
                            ) : (
                                <p className='text-white text-center text-sm sm:text-base'>
                                    Rist gaven {10 - shakeCount} ganger til!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <GiftCard />
            )}
        </div>
    );
}

function GiftCard() {
    const [showContent, setShowContent] = useState(false);
    const [vBucksCount, setVBucksCount] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
            animateVBucks();
            if (typeof window !== "undefined") {
                import("canvas-confetti").then((confetti) => {
                    confetti.default({
                        particleCount: 200,
                        spread: 90,
                        origin: { y: 0.6 },
                        ticks: 400,
                        colors: [
                            "#FFD700",
                            "#FF4500",
                            "#00FF00",
                            "#1E90FF",
                            "#FF1493",
                        ],
                    });
                });
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const animateVBucks = () => {
        let count = 0;
        const interval = setInterval(() => {
            count += 500;
            setVBucksCount(count);
            if (count >= 13500) {
                clearInterval(interval);
            }
        }, 100);
    };

    return (
        <div
            className='mt-8 bg-white rounded-lg shadow-xl p-8 w-full max-w-md opacity-0 transform translate-y-4 transition-all duration-500 ease-in-out'
            style={{ opacity: 1, transform: "translateY(0)" }}
        >
            <h2 className='text-4xl font-extrabold text-center mb-4 text-red-600 animate-pulse'>
                Gratulerer!
            </h2>
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
                    {vBucksCount.toLocaleString()} V-Bucks!
                </p>
                <Gamepad2 className='w-16 h-16 mx-auto mt-4 text-green-500 animate-bounce' />
                <p className='mt-4 text-center text-gray-900'>
                    Nå har du nok v-bucks til å kunne kjøpe deg det du ønsker!
                </p>
            </div>
        </div>
    );
}
