'use client';
import { useState, useEffect } from 'react';
import { Navbar } from '@/sections/Navbar';
import { BiSupport } from "react-icons/bi";
import { GrPlan } from "react-icons/gr";
import { RiUser3Fill } from "react-icons/ri";
import React from 'react';
import Footer from '@/sections/Footer';
import { loadStripe } from '@stripe/stripe-js';
import { FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { BiDevices } from "react-icons/bi";
import { SiCoinmarketcap, SiFsecure } from "react-icons/si";
import { TbBrightness2 } from "react-icons/tb";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}
const stripePromise = loadStripe(stripePublishableKey);

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState<string | null>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const plans = [
        {
            name: 'Starter Plan',
            users: 'Single User Account',
            monthlyPrice: 299,
            yearlyPrice: 249,
            yearlyTotal: 2999,
            monthlyPriceId: process.env.NEXT_PUBLIC_STARTER_MONTHLY_PRICE_ID!,
            yearlyPriceId: process.env.NEXT_PUBLIC_STARTER_YEARLY_PRICE_ID!,
            popular: false,
            features: [
                { icon: FaSearch, text: 'Advanced predicate search.', highlight: false },
                { icon: BiDevices, text: 'Device comparison.', highlight: false },
                { icon: TbReportAnalytics, text: 'Submission-ready reporting.', highlight: false },
                { icon: SiCoinmarketcap, text: 'Market intelligence.', highlight: false },
                { icon: SiFsecure, text: 'Secure, encrypted data (never used for AI training).', highlight: false },
                { icon: RiUser3Fill, text: 'Standard support & onboarding.', highlight: false },
            ]
        },
        {
            name: 'Team Plan',
            users: 'Up to 3 Users',
            monthlyPrice: 449,
            yearlyPrice: 375,
            yearlyTotal: 4499,
            popular: true,
            monthlyPriceId: process.env.NEXT_PUBLIC_TEAM_MONTHLY_PRICE_ID!,
            yearlyPriceId: process.env.NEXT_PUBLIC_TEAM_YEARLY_PRICE_ID!,
            features: [
                { icon: FaSearch, text: 'Advanced predicate search.', highlight: false },
                { icon: BiDevices, text: 'Device comparison.', highlight: false },
                { icon: TbReportAnalytics, text: 'Submission-ready reporting.', highlight: false },
                { icon: SiCoinmarketcap, text: 'Market intelligence.', highlight: false },
                { icon: SiFsecure, text: 'Secure, encrypted data (never used for AI training).', highlight: false },
                { icon: RiUser3Fill, text: 'Standard support & onboarding.', highlight: false },
            ]
        },
        {
            name: 'Enterprise Plan',
            users: 'Up to 5+ Users',
            monthlyPrice: 599,
            yearlyPrice: 499,
            yearlyTotal: 5999,
            monthlyPriceId: process.env.NEXT_PUBLIC_ENTERPRISE_MONTHLY_PRICE_ID!,
            yearlyPriceId: process.env.NEXT_PUBLIC_ENTERPRISE_YEARLY_PRICE_ID!,
            features: [
                { icon: FaSearch, text: 'Advanced predicate search.', highlight: false },
                { icon: BiDevices, text: 'Device comparison.', highlight: false },
                { icon: TbReportAnalytics, text: 'Submission-ready reporting.', highlight: false },
                { icon: SiCoinmarketcap, text: 'Market intelligence.', highlight: false },
                { icon: SiFsecure, text: 'Secure, encrypted data (never used for AI training).', highlight: false },
                { icon: RiUser3Fill, text: 'Standard support & onboarding.', highlight: false },
                { icon: BiSupport, text: 'Priority support & dedicated onboarding', highlight: true },
            ]
        },
    ];

    const handleSubscribe = async (plan: {
        name: string;
        users: string;
        monthlyPrice: number;
        yearlyPrice: number;
        yearlyTotal: number;
        monthlyPriceId: string;
        yearlyPriceId: string;
        popular?: boolean;
        features: Array<{ icon: any; text: string; highlight: boolean }>;
    }) => {
        setLoading(plan.name);

        try {
            const stripe = await stripePromise;
            const priceId = isYearly ? plan.yearlyPriceId : plan.monthlyPriceId;
            if (!priceId) {
                alert('Subscription price is not configured properly. Please contact support.');
                setLoading(null);
                return;
            }

            const response = await fetch('/api/payment-details-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: priceId,
                    planName: plan.name,
                    isYearly: isYearly,
                }),
            });

            const session = await response.json();

            if (session.error) {
                console.error('Error creating checkout session:', session.error);
                alert('Failed to start checkout process. Please try again.');
                return;
            }

            if (!stripe) {
                alert('Stripe.js failed to load. Please refresh and try again.');
                return;
            }

            const result = await stripe.redirectToCheckout({
                sessionId: session.sessionId,
            });

            if (result.error) {
                console.error('Stripe checkout error:', result.error);
                alert('Failed to redirect to checkout. Please try again.');
            }

        } catch (error) {
            console.error('Subscription error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(null);
        }
    };

    return (
        <div
            className="min-h-screen"
            style={{
                background: 'linear-gradient(to right, #EBEEF2 0%, #007EA6 50%, #061A40 100%)'
            }}
        >
            <Navbar />
            <style jsx>{`
                @keyframes float-slow {
                0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
                25% { transform: translateY(-15px) translateX(10px) scale(1.05); }
                50% { transform: translateY(-30px) translateX(0px) scale(1.1); }
                75% { transform: translateY(-15px) translateX(-10px) scale(1.05); }
                }
                
                @keyframes float-reverse {
                0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                33% { transform: translateY(20px) translateX(-15px) rotate(120deg); }
                66% { transform: translateY(-20px) translateX(15px) rotate(240deg); }
                }
                
                @keyframes float-fast {
                0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
                50% { transform: translateY(-40px) scale(1.2) rotate(180deg); }
                }
                
                @keyframes drift {
                0% { transform: translateX(0px) translateY(0px); }
                25% { transform: translateX(30px) translateY(-20px); }
                50% { transform: translateX(0px) translateY(-40px); }
                75% { transform: translateX(-30px) translateY(-20px); }
                100% { transform: translateX(0px) translateY(0px); }
                }
                
                @keyframes pulse-slow {
                0%, 100% { opacity: 0.2; transform: scale(1); }
                50% { opacity: 0.4; transform: scale(1.1); }
                }
                
                @keyframes glow {
                0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
                50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 40px rgba(6, 182, 212, 0.3); }
                }
                
                @keyframes fade-in {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(50px); }
                to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes scale-in {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
                }
                
                @keyframes bounce-gentle {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
                }
                
                @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
                }
                
                .animate-glow {
                animation: glow 2s ease-in-out infinite;
                }
                
                .animate-fade-in {
                animation: fade-in 1s ease-out;
                }
                
                .animate-fade-in-up {
                animation: fade-in-up 1s ease-out;
                }
                
                .animate-scale-in {
                animation: scale-in 0.8s ease-out;
                }
                
                .animate-bounce-gentle {
                animation: bounce-gentle 2s ease-in-out infinite;
                }
                
                .animate-rotate {
                animation: rotate 20s linear infinite;
                }
                
                .stagger-1 { animation-delay: 0.1s; }
                .stagger-2 { animation-delay: 0.2s; }
                .stagger-3 { animation-delay: 0.3s; }
                .stagger-4 { animation-delay: 0.4s; }
                .stagger-5 { animation-delay: 0.5s; }
                .stagger-6 { animation-delay: 0.6s; }
            `}</style>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">

                <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h1 className="text-5xl sm:text-5xl md:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-sm leading-tight font-gesta">
                        Flexible Pricing For Your Regulatory Needs
                    </h1>
                    <p className={`font-gesta text-xl sm:text-xl text-white/90 mx-auto max-w-3xl mb-4 sm:mb-6 px-2 leading-relaxed transition-all duration-1000 ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
                        Unlock the best value for your compliance needs. Our transparent plans scale with your business, whether you're an individual, a growing team, or an enterprise. Pick a billing cycle and discover what's right for you.
                    </p>
                </div>

                <div className={`flex flex-col items-center justify-center mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
                    <h2 className="font-gesta text-3xl sm:text-4xl font-bold text-black mb-6 text-center">Simple, Transparent Pricing for Every Team</h2>
                    <p className={`font-gesta text-xl font-semibold text-white mx-auto max-w-3xl mb-4 sm:mb-6 px-2 leading-relaxed transition-all duration-1000 ${isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
                        Choose the right plan based on team size.
                    </p>
                    <span className={`font-gesta text-xl font-bold bg-[#EBEEF2] text-black px-4 py-1 mb-4 rounded-full transition-all duration-300 ${isYearly ? 'opacity-100 scale-100' : 'opacity-100 scale-100'}`}>
                        {isYearly ? 'Save 15% with annual billing.' : 'Flexible Payment Options.'}
                    </span>

                    <div className="flex flex-col items-center gap-4 animate-scale-in stagger-1">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <span className={`font-gesta text-xl font-bold transition-all duration-300 ${!isYearly ? 'transform scale-110' : ''}`}
                                style={{ color: !isYearly ? '#061A40' : '#EBEEF2' }}>
                                Monthly
                            </span>
                            <button
                                onClick={() => setIsYearly(!isYearly)}
                                className="relative w-14 sm:w-16 h-7 sm:h-8 backdrop-blur-sm rounded-full transition-all duration-300 focus:outline-none hover:scale-110 hover:shadow-lg group"
                                style={{
                                    backgroundColor: '#EBEEF2'
                                }}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-5 sm:w-6 h-5 sm:h-6 rounded-full shadow-lg transition-all duration-500 transform group-hover:scale-110 ${isYearly ? 'translate-x-7 sm:translate-x-8' : ''}`}
                                    style={{
                                        background: 'linear-gradient(135deg, #061A40 0%, #007EA6 50%, #061A40 100%)'
                                    }}
                                />
                            </button>
                            <span className={`font-gesta text-xl font-bold transition-all duration-300 ${isYearly ? 'transform scale-110' : ''}`}
                                style={{ color: isYearly ? '#061A40' : '#EBEEF2' }}>
                                Yearly
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-7xl mx-auto mb-10 sm:mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                        {plans.map((plan, index) => (
                            <div
                                key={plan.name}
                                className={`relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 sm:hover:-translate-y-6 hover:scale-105 border border-blue-100 group animate-fade-in-up stagger-${index + 5} w-full ${plan.popular ? 'scale-105 animate-glow' : ''}`}
                                style={{
                                    backdropFilter: 'blur(20px)',
                                    animationDelay: `${index * 0.2}s`
                                }}
                            >
                                <div className="p-6 sm:p-8 flex flex-col h-full">
                                    <div className="text-center mb-4 sm:mb-6">
                                        <h3 className="font-gesta text-xl sm:text-3xl font-semibold text-gray-600 mb-2 transition-all duration-300 transform group-hover:scale-110">{plan.name}</h3>
                                        <p className="font-gesta text-2xl font-bold text-gray-900 transition-colors duration-300">{plan.users}</p>
                                    </div>

                                    <div className="text-center mb-6 sm:mb-8">
                                        <div className="mb-2">
                                            <span className="font-gesta text-4xl sm:text-5xl font-bold text-gray-800 transition-all duration-500 transform group-hover:scale-110 inline-block">
                                                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                            </span>
                                            <span className="font-gesta text-gray-600 text-xl sm:text-2xl ml-2 transition-colors duration-300">
                                                /mo
                                            </span>
                                        </div>
                                        {isYearly && (
                                            <p className="font-gesta text-gray-900 font-semibold text-xl sm:text-2xl  transition-colors duration-300 animate-fade-in">
                                                ${plan.yearlyTotal.toLocaleString()} Billed Annually
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex-grow mb-6 sm:mb-8">
                                        <div className="space-y-4">
                                            {plan.features.map((feature, featureIndex) => {
                                                const IconComponent = feature.icon;
                                                return (
                                                    <div key={featureIndex} className="flex items-center gap-3 group-feature">
                                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${feature.highlight}`}>
                                                            <IconComponent className="w-5 h-5 text-black" />
                                                        </div>
                                                        <span className={`font-gesta text-xl transition-all duration-300 group-feature-hover:translate-x-1 ${feature.highlight
                                                            ? 'text-gray-800 font-semibold'
                                                            : 'text-gray-600'
                                                            }`}>
                                                            {feature.text}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <button
                                            type="button"
                                            onClick={() => handleSubscribe(plan)}
                                            disabled={loading === plan.name}
                                            className="font-gesta relative w-full py-4 sm:py-5 px-6 sm:px-8 rounded-xl font-semibold text-xl transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden bg-black hover:bg-gray-800 text-white shadow-lg focus:ring-gray-400 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            <span className="relative z-10 transition-all duration-300 flex items-center justify-center gap-2">
                                                {loading === plan.name ? (
                                                    <>
                                                        <div className="w-5 sm:w-6 h-5 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span className="font-gesta text-xl">Processing...</span>
                                                    </>
                                                ) : (
                                                    'Subscribe Now'
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`mt-12 sm:mt-16 lg:mt-20 text-center mb-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
                    <h1 className="font-gesta text-3xl sm:text-5xl font-bold text-gray-100 mb-6 sm:mb-8 drop-shadow-sm animate-bounce-gentle">
                        What You Get?
                    </h1>

                    <div className="w-full max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                            {[
                                {
                                    icon: <BiSupport />,
                                    title: "Support",
                                    description: "Get help whenever you need it with our dedicated support team.",
                                    gradient: "bg-[#007EA6]",
                                    delay: "stagger-1"
                                },
                                {
                                    icon: <GrPlan />,
                                    title: "Evaluation Strategy",
                                    description: "Customised problem solving to ensure you meet regulatory standards.",
                                    gradient: "bg-[#007EA6]",
                                    delay: "stagger-2"
                                },
                                {
                                    icon: <TbBrightness2 />,
                                    title: "Quick FDA Approval",
                                    description: "Express route to your FDA approval process with our services.",
                                    gradient: "bg-[#007EA6]",
                                    delay: "stagger-3"
                                }
                            ].map((feature, index) => (
                                <div key={index} className={`flex flex-col items-center p-6 sm:p-8 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-blue-100 hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-105 hover:shadow-2xl group animate-scale-in ${feature.delay} w-full`}>
                                    <div className={`w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg animate-bounce-gentle group-hover:animate-rotate`}>
                                        {typeof feature.icon === "string" ? (
                                            <svg className="w-6 sm:w-8 h-6 sm:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                            </svg>
                                        ) : (
                                            React.cloneElement(feature.icon, { className: "w-6 sm:w-8 h-6 sm:h-8 text-black" })
                                        )}
                                    </div>
                                    <h3 className="font-gesta text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4 transition-colors duration-300 text-center">{feature.title}</h3>
                                    <p className="font-gesta  sm:text-xl text-gray-600 text-center transition-colors duration-300 group-hover:text-gray-700 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}