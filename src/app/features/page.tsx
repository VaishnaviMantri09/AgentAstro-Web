'use client';
import React, { useState, useEffect, useRef } from 'react';
import { IoPeopleSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { FcProcess } from "react-icons/fc";
import { BsShieldFillCheck, BsArrowRightCircleFill } from "react-icons/bs";
import { Navbar } from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import Link from 'next/link';

const FeaturesPage = () => {
    const features = [
        {
            id: 'predicate-search',
            title: 'Advanced Predicate Search',
            description: "Search the FDA’s 510(k) database using intuitive, natural language prompts no complex filters or keyword guesswork.",
            benefit: 'Find the most relevant predicates in seconds, not hours.',
            imageUrl: '/Features/features-search.jpg',
            imageAlt: 'Advanced Predicate Search',
        },
        {
            id: 'regulatory-reporting',
            title: 'Detailed Regulatory Reporting',
            description: 'Generate expert level reports that compile and contextualise FDA data to support your substantial equivalence narrative.',
            benefit: 'Strengthen your submission with clear documentation.',
            imageUrl: '/Features/features-reporting.jpg',
            imageAlt: 'Detailed Regulatory Reporting',
        },
        {
            id: 'data-management',
            title: 'Secure Data Management',
            description: 'All user activity and file transfers are protected with industry-standard encryption.In Transit,SSL/TLS encryption safeguards all communications.At Rest,AES-256 encryption secures stored data and files.',
            benefit: 'Enterprise protection for your sensitive information.',
            imageUrl: '/Features/features-data-management.jpg',
            imageAlt: 'Secure Data Management',
        },
        {
            id: 'compliance-architecture',
            title: 'Compliance-Ready Architecture',
            description: 'Engineered to align with FDA guidelines and meet HIPAA and GDPR requirements.',
            benefit: 'Confidence in every query and report.',
            imageUrl: '/Features/features-compliance.jpg',
            imageAlt: 'Compliance-Ready Architecture',
        },
        {
            id: 'device-comparison',
            title: 'Predicate Device Comparison',
            description: 'Easily compare device specs, testing protocols, and regulatory pathways side by side, in one view.',
            benefit: 'Spot differences, justify similarities, and make faster decisions.',
            imageUrl: '/Features/features-comparison.jpg',
            imageAlt: 'Predicate Device Comparison',
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
                        <h2
                            style={{
                                color: 'white',
                                WebkitTextStroke: '1.5px #1e40af',

                            }}
                            className="text-3xl font-bold mb-6 leading-tight">
                            {feature.title}
                        </h2>

                        <p className="text-xl text-white  mb-3 leading-relaxed">
                            {feature.description}
                        </p>
                        <div className="flex items-start mb-2 p-4 bg-gray-50 rounded-xl">
                            <BsArrowRightCircleFill className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-800 font-semibold">
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
                                className="w-full h-full object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f3f4f6"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280" font-family="system-ui" font-size="18">
                        ${feature.title}
                    </text>
                    </svg>
                `)}`;
                                }}
                            />
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
                background: 'linear-gradient(135deg, #bfdbfe 0%, #2563eb 50%, #1e3a8a 90%)'
            }}
        >
            <Navbar />
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center py-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Your Gateway for Streamlined
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-white block">
                            Regulatory Excellence
                        </span>
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                        Explore our powerful features crafted to simplify your regulatory process and speed up your product launch.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                            { icon: IoPeopleSharp, value: 'Happy Customers', },
                            { icon: FaStar, value: 'Strong Suggestion' },
                            { icon: FcProcess, value: 'Faster Processing' },
                            { icon: BsShieldFillCheck, value: 'Secure & Compliant' },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200"
                            >
                                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
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

                <div className="text-center bg-gradient-to-r from-sky-100 to-blue-400 rounded-3xl p-12 text-indigo-900 mt-16 mb-16">
                    <h3 className="text-3xl font-bold mb-4"> We would Be Glad to Schedule a Call</h3>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        A lot of medical device companies already using our platform to
                        accelerate their regulatory submissions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/started">
                            <button className="px-8 py-4 border-2 border-blue-900 text-black font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                                Join Us
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
