'use client';
import React, { useState, useEffect, useRef } from "react";

const benefits = [
    {
        title: "Advance",
        description: "Accelerate your 510(k) process by automating time-consuming predicate searches.",
    },
    {
        title: "Validate",
        description: "Build a stronger case with data-backed insights that enhance your FDA submissions.",
    },
    {
        title: "Optimization",
        description: "Reduce costs and delays by identifying opportunities to avoid unnecessary testing.",
    }
];

export function KeyBenefits() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startAutoCycle = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex((prevIndex) => {
                if (prevIndex === null) return 0;
                return (prevIndex + 1) % benefits.length;
            });
        }, 3000);
    };

    useEffect(() => {
        startAutoCycle();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleClick = (index: number) => {
        setActiveIndex(index);
        startAutoCycle();
    };

    return (
        <section className="relative w-full pt-4 pb-6 sm:pt-4 sm:pb-8 md:pt-8 md:pb-10 lg:pt-6 lg:pb-8">
            <div className="absolute inset-0 z-0 opacity-90" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-gesta">
                        Core Advantages
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto mb-6 rounded-full shadow-lg animate-pulse" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            tabIndex={0}
                            onClick={() => handleClick(index)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') handleClick(index);
                            }}
                            className={`
                            flex flex-col items-center text-center
                            relative
                            p-8 rounded-2xl border shadow-lg backdrop-blur-2xl transition-all
                            hover:scale-105 hover:shadow-indigo-400/40 hover:border-white
                            active:scale-95
                            cursor-pointer
                            duration-300
                            outline-none focus:ring-2 focus:ring-blue-400
                            ${index === 0 ? "bg-white border-blue-200" :
                                    index === 1 ? "bg-white border-pink-200" :
                                        "bg-white border-yellow-200"
                                }
    `}
                        >
                            <div className="mb-4 flex items-center justify-center items-baseline -space-x-1">
                                <span className="text-4xl font-bold text-indigo-800 font-gesta">
                                    {benefit.title}
                                </span>
                            </div>

                            <p className="text-blue-900 text-base leading-relaxed mb-4 font-gesta">
                                {benefit.description}
                            </p>

                            <div
                                className={`
                                    w-full h-0.5 bg-black rounded-full transition-all duration-300 mt-auto
                                `}
                                style={{
                                    width: activeIndex === index ? '100%' : '0%',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
