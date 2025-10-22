'use client';
import React from "react";

const benefits = [
    {
        title: "Predicate Intelligence",
        description: "Identify the right predicate devices in seconds.",
    },
    {
        title: "Submission-Ready Reporting",
        description: "Generate structured reports aligned with FDA expectations.",
    },
    {
        title: "Compliance Confidence",
        description: "Build on secure, validated data you can trust.",
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="group relative p-8 bg-white rounded-lg border border-gray-200 transition-all duration-300
                            text-center min-h-[100px] "
                        >
                            <h3 className="font-gesta text-3xl font-bold text-gray-900 mb-3 transition-colors duration-300">
                                {benefit.title}
                            </h3>
                            <p className="font-semibold text-xl font-gesta text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}