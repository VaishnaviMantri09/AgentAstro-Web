'use client';
import React from "react";

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

export default function KeyBenefits() {
    return (
        <section className="w-full py-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 font-gesta">
                        Core Advantages
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#061A40] to-[#EBEEF2] mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="group relative p-8 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                        >

                            {/* Title */}
                            <h3 className="font-gesta text-3xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                {benefit.title}
                            </h3>

                            {/* Description */}
                            <p className="font-semibold text-lg font-gesta text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#061A40] to-[#EBEEF2] rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}