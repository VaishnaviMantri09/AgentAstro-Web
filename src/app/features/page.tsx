'use client';
import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRightCircleFill } from "react-icons/bs";
import { SiSmartthings, SiCoinmarketcap } from "react-icons/si";
import { TbDeviceDesktopQuestion, TbReport } from "react-icons/tb";
import { Navbar } from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import Link from 'next/link';

const FeaturesPage = () => {
    const features = [
        {
            id: 'predicate-search',
            title: 'Advanced Predicate Search',
            description: "Search FDA databases using intuitive, natural language prompts no complex filters or keyword guesswork. ",
            benefit: 'Find the most relevant predicates in seconds, not hours.',
            imageUrl: '/Features/predicate-search.jpg',
            imageAlt: 'Advanced Predicate Search',
        },
        {
            id: 'regulatory-reporting',
            title: 'Detailed Regulatory Reporting',
            description: 'Generate expert level reports that compile and Contextualize FDA data to support your substantial equivalence narrative.',
            benefit: 'Strengthen your submission with clear documentation.',
            imageUrl: '/Features/regulatory-reporting.jpeg',
            imageAlt: 'Detailed Regulatory Reporting',
        },
        {
            id: 'secure-compliant',
            title: 'Secure & Compliant',
            description: 'Your private information is protected and never used to train AI models. All subscriber data is encrypted in transit and at rest, with strict safeguards to ensure confidentiality.',
            benefit: 'Enterprise-grade protection for sensitive regulatory work.',
            imageUrl: '/Features/secure-compliant.jpeg',
            imageAlt: 'Secure & Compliant',
        },
        {
            id: 'device-comparison',
            title: 'Device Comparison',
            description: 'Easily compare device specs, testing protocols, and regulatory pathways side by side, in one view.',
            benefit: 'Spot differences, justify similarities, and make faster decisions.',
            imageUrl: '/Features/device-comparison.jpg',
            imageAlt: 'Device Comparison',
        },
    ];

    type FeatureType = typeof features[number];

    const FeatureSection = ({
        feature,
        isLeft,
    }: {
        feature: FeatureType;
        isLeft: boolean;
    }) => {
        const ref = useRef<HTMLDivElement>(null);
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const el = ref.current;
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(el);
                    }
                },
                { threshold: 0.3 }
            );
            observer.observe(el);
            return () => observer.disconnect();
        }, []);

        return (
            <div
                ref={ref}
                className={`
        flex flex-col md:flex-row items-center py-12 
        transition-all duration-700 ease-out
        ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0'}
        ${!isVisible && (isLeft ? 'md:-translate-x-6' : 'md:translate-x-6')}
        `}
            >
                <div
                    className={`
            w-full md:w-1/2 mb-8 md:mb-0 
            ${isLeft ? 'md:pr-16 pr-4' : 'md:pl-16 pl-4'}
        `}
                >
                    <div className="max-w-lg mx-auto md:mx-0">
                        <h2 className="text-3xl font-bold mb-6 leading-tight font-gesta">
                            {feature.title}
                        </h2>

                        <p className="text-xl text-white  mb-3 leading-relaxed font-gesta">
                            {feature.description}
                        </p>
                        <div className="flex items-start mb-2 p-4 bg-gray-50 rounded-xl">
                            <BsArrowRightCircleFill className="w-5 h-5 text-black mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-800 text-xl font-semibold font-gesta">
                                {feature.benefit}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <div className="relative w-full h-64 flex items-center justify-center">
                        <div
                            className={`absolute inset-0 bg-gradient-to-br black opacity-50 rounded-2xl`}
                        ></div>
                        <div className="relative z-10 w-full h-full p-4">
                            <img
                                src={feature.imageUrl}
                                alt={feature.imageAlt}
                                className="w-full h-full object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105" />
                            <div
                                className={`absolute inset-0 bg-gradient-to-black  opacity-5 rounded-1xl pointer-events-none`}
                            ></div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };

    return (

        <div
            className="min-h-screen"
            style={{
                background: 'linear-gradient(to right, #EBEEF2 0%, #007EA6 50%, #061A40 100%)'
            }}
        >
            <Navbar />
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center py-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-gesta">
                        Your Gateway to Faster
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-white block font-gesta">
                            Smarter FDA Submissions
                        </span>
                    </h1>
                    <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4 font-gesta">
                        Explore powerful features that simplify your workflow and accelerate approvals.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                            { icon: SiSmartthings, value: 'Predicate Intelligence', },
                            { icon: TbDeviceDesktopQuestion, value: 'Device Comparison' },
                            { icon: TbReport, value: 'Submission-Ready Reporting' },
                            { icon: SiCoinmarketcap, value: 'Market Insights' },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200"
                            >
                                <stat.icon className="w-8 h-8 text-black mx-auto mb-3" />
                                <div className="text-xl font-semibold text-gray-900 font-gesta">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    {features.map((feature, index) => (
                        <FeatureSection
                            key={feature.id}
                            feature={feature}
                            isLeft={index % 2 === 0}
                        />
                    ))}
                </div>

                <div className="text-center bg-gradient-to-r bg-[#EBEEF2] rounded-3xl p-12 text-gray-900 mt-16 mb-16">
                    <h3 className="text-3xl font-bold mb-4 font-gesta">Ready to Accelerate Your FDA Submissions?</h3>
                    <p className="text-xl font-semibold opacity-90 mb-8 max-w-2xl mx-auto font-gesta">
                        Join regulatory teams already using Agent Astro to streamline submissions, cut costs, and move faster with confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/started">
                            <button className="text-xl font-gesta w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-lg s-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 shadow-lg transition-colors text-justify">
                                Book a Demo
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
            <Footer />
        </div >
    );
};

export default FeaturesPage;
