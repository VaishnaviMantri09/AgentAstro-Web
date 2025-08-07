'use client';
import { useState, useEffect } from 'react';
import { Navbar } from '@/sections/Navbar';
import { FcOnlineSupport, FcApproval } from "react-icons/fc";
import { GrPlan } from "react-icons/gr";
import React from 'react';
import Footer from '@/sections/Footer';
import { loadStripe } from '@stripe/stripe-js';

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
            yearlyPrice: 249.92,
            yearlyTotal: 2999,
            monthlyPriceId: process.env.NEXT_PUBLIC_STARTER_MONTHLY_PRICE_ID ?? '',
            yearlyPriceId: process.env.NEXT_PUBLIC_STARTER_YEARLY_PRICE_ID ?? '',
            popular: false,
        },
        {
            name: 'Team Plan',
            users: 'Up to 3 Users',
            monthlyPrice: 449,
            yearlyPrice: 374.92,
            yearlyTotal: 4499,
            popular: true,
            monthlyPriceId: process.env.NEXT_PUBLIC_TEAM_MONTHLY_PRICE_ID ?? 'price_team_monthly',
            yearlyPriceId: process.env.NEXT_PUBLIC_TEAM_YEARLY_PRICE_ID ?? 'price_team_yearly',
        },
        {
            name: 'Enterprise Plan',
            users: 'Up to 5 Users',
            monthlyPrice: 599,
            yearlyPrice: 499.92,
            yearlyTotal: 5999,
            monthlyPriceId: process.env.NEXT_PUBLIC_ENTERPRISE_MONTHLY_PRICE_ID ?? 'price_enterprise_monthly',
            yearlyPriceId: process.env.NEXT_PUBLIC_ENTERPRISE_YEARLY_PRICE_ID ?? 'price_enterprise_yearly',
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



            const response = await fetch('/api/create-checkout-session', {
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
        <div className="min-h-screen relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #bfdbfe 0%, #2563eb 50%, #1e3a8a 90%)'
            }}>

            <Navbar />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 md:w-48 lg:w-64 h-24 sm:h-32 md:h-48 lg:h-64 bg-gradient-to-r from-blue-200 to-cyan-300 rounded-full opacity-20 blur-xl animate-float-slow"></div>
                <div className="absolute top-3/4 right-1/4 w-32 sm:w-48 md:w-72 lg:w-96 h-32 sm:h-48 md:h-72 lg:h-96 bg-gradient-to-r from-sky-200 to-blue-300 rounded-full opacity-15 blur-2xl animate-float-reverse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-20 sm:w-24 md:w-36 lg:w-48 h-20 sm:h-24 md:h-36 lg:h-48 bg-gradient-to-r from-cyan-200 to-teal-300 rounded-full opacity-25 blur-xl animate-float-fast"></div>
                <div className="absolute top-1/2 right-1/3 w-12 sm:w-16 md:w-24 lg:w-32 h-12 sm:h-16 md:h-24 lg:h-32 bg-gradient-to-r from-purple-200 to-pink-300 rounded-full opacity-30 blur-lg animate-drift"></div>
                <div className="absolute bottom-1/3 right-1/4 w-24 sm:w-28 md:w-42 lg:w-56 h-24 sm:h-28 md:h-42 lg:h-56 bg-gradient-to-r from-indigo-200 to-blue-300 rounded-full opacity-20 blur-xl animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
            </div>

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
                
                .animate-float-slow {
                animation: float-slow 8s ease-in-out infinite;
                }
                
                .animate-float-reverse {
                animation: float-reverse 12s ease-in-out infinite;
                }
                
                .animate-float-fast {
                animation: float-fast 6s ease-in-out infinite;
                }
                
                .animate-drift {
                animation: drift 10s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                animation: pulse-slow 4s ease-in-out infinite;
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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4 sm:mb-6 drop-shadow-sm leading-tight">
                        Flexible Pricing For Your Regulatory Needs
                    </h1>
                    <p className={`text-base sm:text-lg text-black mx-auto max-w-3xl mb-4 sm:mb-6 px-2 leading-relaxed transition-all duration-1000 ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
                        Unlock the best value for your compliance needs. Our transparent plans scale with your business, whether you're an individual, a growing team, or an enterprise. Pick a billing cycle and discover what's right for you.
                    </p>
                </div>

                <div className={`mt-12 sm:mt-16 lg:mt-20 text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 drop-shadow-sm animate-bounce-gentle">
                        What You Get?
                    </h2>

                    <div className="w-full max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                            {[
                                {
                                    icon: <FcOnlineSupport />,
                                    title: "Support",
                                    description: "Get help whenever you need it with our dedicated support team.",
                                    gradient: "from-blue-500 to-cyan-500",
                                    delay: "stagger-1"
                                },
                                {
                                    icon: <GrPlan />,
                                    title: "Evaluation Strategy",
                                    description: "Customised problem solving to ensure you meet regulatory standards.",
                                    gradient: "from-emerald-500 to-teal-500",
                                    delay: "stagger-2"
                                },
                                {
                                    icon: <FcApproval />,
                                    title: "Quick FDA Approval",
                                    description: "Express route to your FDA approval process with our services.",
                                    gradient: "from-sky-500 to-blue-500",
                                    delay: "stagger-3"
                                }
                            ].map((feature, index) => (
                                <div key={index} className={`flex flex-col items-center p-6 sm:p-8 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-blue-100 hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-105 hover:shadow-2xl group animate-scale-in ${feature.delay} w-full`}>
                                    <div className={`w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg animate-bounce-gentle group-hover:animate-rotate`}>
                                        {typeof feature.icon === "string" ? (
                                            <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                            </svg>
                                        ) : (
                                            React.cloneElement(feature.icon, { className: "w-6 sm:w-8 h-6 sm:h-8 text-white" })
                                        )}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300 text-center">{feature.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 text-center transition-colors duration-300 group-hover:text-gray-700 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`flex flex-col items-center justify-center mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-12 text-center animate-bounce-gentle">Choose Your Subscription</h2>
                    <div className="flex items-center gap-3 sm:gap-4 animate-scale-in stagger-1">
                        <span className={`text-base sm:text-lg font-medium transition-all duration-300 ${!isYearly ? 'text-black transform scale-110' : 'text-white'}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="relative w-14 sm:w-16 h-7 sm:h-8 bg-gray-200 backdrop-blur-sm rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:scale-110 hover:shadow-lg group"
                        >
                            <div className={`absolute top-1 left-1 w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg transition-all duration-500 transform group-hover:scale-110 ${isYearly ? 'translate-x-7 sm:translate-x-8' : ''}`} />
                        </button>
                        <span className={`text-base sm:text-lg font-medium transition-all duration-300 ${isYearly ? 'text-black transform scale-110' : 'text-white'}`}>
                            Yearly
                        </span>
                    </div>
                </div>

                <div className="w-full max-w-6xl mx-auto mb-10 sm:mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-16">
                        {plans.map((plan, index) => (
                            <div
                                key={plan.name}
                                className={`relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 sm:hover:-translate-y-6 hover:scale-105 border border-blue-100 group animate-fade-in-up stagger-${index + 5} w-full ${plan.popular ? 'ring-2 ring-blue-400 scale-105 animate-glow' : ''}`}
                                style={{
                                    background: plan.popular
                                        ? 'linear-gradient(135deg, rgba(219, 234, 254, 0.8), rgba(165, 243, 252, 0.8))'
                                        : 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(20px)',
                                    animationDelay: `${index * 0.2}s`
                                }}
                            >
                                <div className="p-4 sm:p-6 flex flex-col h-full">
                                    <div className="text-center mb-2 sm:mb-3">
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-blue-600 transition-all duration-300 transform group-hover:scale-110">{plan.name}</h3>
                                        <p className="text-sm sm:text-base text-gray-600 font-medium group-hover:text-blue-500 transition-colors duration-300">{plan.users}</p>
                                    </div>

                                    <div className="text-center mb-3 sm:mb-4">
                                        <div className="mb-1 sm:mb-2">
                                            <span className="text-3xl sm:text-4xl font-bold text-gray-800 group-hover:text-blue-600 transition-all duration-500 transform group-hover:scale-110 inline-block">
                                                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                            </span>
                                            <span className="text-gray-600 text-lg sm:text-xl ml-2 group-hover:text-blue-500 transition-colors duration-300">
                                                Per month
                                            </span>
                                        </div>
                                        {isYearly && (
                                            <p className="text-gray-500 text-sm sm:text-base group-hover:text-blue-400 transition-colors duration-300 animate-fade-in">
                                                ${plan.yearlyTotal.toLocaleString()} Billed Annually
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-auto">
                                        <button
                                            onClick={() => handleSubscribe(plan)}
                                            disabled={loading === plan.name}
                                            className={`relative w-full py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold text-base sm:text-lg transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden group-button hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${plan.popular
                                                ? 'bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 hover:from-blue-600 hover:via-sky-600 hover:to-cyan-600 text-white shadow-lg focus:ring-blue-400'
                                                : 'bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white shadow-lg focus:ring-blue-400'
                                                }`}
                                        >
                                            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-button-hover:translate-x-full transition-transform duration-1000"></div>
                                            <span className="relative z-10 transition-all duration-300 flex items-center justify-center gap-2">
                                                {loading === plan.name ? (
                                                    <>
                                                        <div className="w-5 sm:w-6 h-5 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span className="text-sm sm:text-base">Processing...</span>
                                                    </>
                                                ) : (
                                                    'Subscribe'
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}