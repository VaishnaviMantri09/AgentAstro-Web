'use client';
import React, { useState, useEffect } from 'react';
import { IoIosAlert } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa";
import { GiAmericanShield } from "react-icons/gi";
import { Navbar } from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const TermsOfService = () => {

    const sections = [
        {
            id: 'overview',
            number: '01',
            title: 'Overview of Services',
            content: (
                <div className="space-y-6">
                    <p className="font-gesta text-gray-900 leading-relaxed text-xl">
                        AgentAstro is a software platform developed by AgentAstro Inc. that aggregates, organizes, and presents publicly available regulatory data from sources such as the U.S. Food and Drug Administration (FDA).
                    </p>
                    <p className="font-gesta text-gray-900 leading-relaxed text-xl">
                        The Services use AI-enabled systems to process, analyze, and surface information that may assist users in identifying regulatory pathways, predicate devices, and submission precedents. While we strive for accuracy, the nature of machine learning and regulatory data integration means outputs may contain errors, inaccuracies, omissions, or outdated content.
                    </p>

                    <div className="border border-[#061A40] rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                            <IoIosAlert className="w-8 h-8 flex-shrink-0" />
                            <div>
                                <h4 className="font-gesta font-bold text-gray-900 text-xl mb-3">Important limitations:</h4>
                                <ul className="space-y-3">
                                    {[
                                        'The Services are provided for general informational purposes only.',
                                        'Outputs are not legal, regulatory, or compliance advice.',
                                        'AgentAstro outputs must not be filed directly with regulators without independent professional validation.',
                                        'Users remain solely responsible for ensuring compliance with all applicable regulatory requirements.',

                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center space-x-3 text-gray-900">
                                            <span className="text-xl font-gesta">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border border-[#061A40] rounded-xl p-6">
                        <h4 className="font-gesta text-xl font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                            <FaFileSignature className="w-8 h-8 flex-shrink-0" />
                            <span>You acknowledge and agree that:</span>
                        </h4>
                        <ul className="space-y-3">
                            {[
                                'The Services may generate incomplete or imprecise results.',
                                'AgentAstro makes no warranty as to correctness, completeness, or regulatory sufficiency of outputs.',
                                'All regulatory submissions and decisions remain your responsibility.',

                            ].map((item, idx) => (
                                <li key={idx} className="font-gesta flex items-start space-x-3 text-gray-800 text-xl">
                                    <span className="ml-7">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div >
            )
        },
        {
            id: 'account',
            number: '02',
            title: 'Account Registration and Access',
            content: (
                <div className="space-y-2">
                    <p className="font-gesta text-xl text-gray-900 leading-relaxed">
                        To access the Services, you must create an account and provide accurate, complete, and up-to-date information.
                    </p>
                    <p className="font-gesta text-xl text-gray-700 leading-relaxed">
                        You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. You agree not to share your credentials or allow others to access your account.
                    </p>
                </div>
            )
        },
        {
            id: 'payment',
            number: '03',
            title: 'Subscriptions and Payment',
            content: (
                <div className="space-y-3">
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        Access to certain features requires a paid subscription. Pricing, billing frequency, and payment terms are displayed at the point of purchase and may change with notice.
                    </p>
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        All prices are in U.S. dollars (USD).
                    </p>
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        Payments are processed through Stripe. By subscribing, you authorize us to charge your selected payment method.
                    </p>
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        Subscriptions automatically renew at the end of each billing period. By subscribing, you expressly consent to auto-renewal. You may opt out anytime in your account settings.
                    </p>
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        Cancellation takes effect at the end of the current billing period.
                    </p>

                    <div className="border border-[#061A40] rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                            <div>
                                <p className="text-gray-900 text-xl font-gesta font-semibold">
                                    Refunds are not offered, except as required by applicable consumer protection laws. Residents of jurisdictions with mandatory refund or cancellation rights (e.g., certain U.S. states or EU countries) are entitled to remedies consistent with those laws.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'acceptable-use',
            number: '04',
            title: 'Acceptable Use',
            content: (
                <div className="space-y-4">
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        You agree to use the Services lawfully and not to:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            {
                                desc: 'Reverse-engineer, copy, or resell the Services.',
                            },
                            {
                                desc: 'Use the Services to violate intellectual property or privacy rights of others.',
                            },
                            {
                                desc: 'Interfere with or disrupt the Services or servers.',
                            },
                            {
                                desc: 'Use automated tools (e.g., bots, scrapers) to access the Services.',
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-2 border hover:border-[#061A40] hover:shadow-md transition-all shadow-sm">
                                <p className="text-gray-900 font-gesta text-xl">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border border-[#061A40] rounded-xl p-2">
                        <div className="flex items-center space-x-3">
                            <IoIosAlert className="w-8 h-8" />
                            <div>
                                <p className="text-gray-900 font-gesta text-xl">We may suspend or terminate your account if you violate these Terms.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'intellectual-property',
            number: '05',
            title: 'Intellectual Property and User Content',
            content: (
                <div className="space-y-4">
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        All software, code, and original content within the Services are the property of AgentAstro or its licensors. We grant you a limited, non-exclusive, non-transferable license to use the Services for your internal business purposes while your subscription is active.
                    </p>
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        You retain ownership of all User Content you upload to the Services. By uploading User Content, you grant AgentAstro a limited license to process and display such content solely for the purpose of providing the Services. You represent that you have the rights and authorizations to upload any content you provide.
                    </p>

                    <div className="border border-[#061A40] rounded-xl p-3">
                        <div className="flex items-center space-x-2">
                            <GiAmericanShield className="w-6 h-6" />
                            <div>
                                <p className="text-gray-900 font-gesta text-xl">AgentAstro does not claim ownership of your User Content.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'data-privacy',
            number: '06',
            title: 'Data and Privacy',
            content: (
                <div className="space-y-3">
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        The Services are not designed to collect or process Protected Health Information (PHI). Users must not upload patient-identifiable data.
                    </p>
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        Your use of the Services is also governed by our Privacy Policy, which explains how we collect, use, and protect personal data. By using the Services, you consent to the collection and use of your data consistent with that policy.
                    </p>
                </div>
            )
        },
        {
            id: 'disclaimers',
            number: '07',
            title: 'Disclaimers',
            content: (
                <div className="space-y-6">
                    <div className="border border-[#061A40] rounded-xl p-3">
                        <div className="flex items-start space-x-4">
                            <div>
                                <p className="text-gray-900 text-xl font-gesta">
                                    The Services are provided “as is” and “as available,” without warranties of any kind. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border hover:border-[#061A40] shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-4 font-gesta text-xl">AgentAstro does not warrant that:</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                '1. The Services will be uninterrupted, secure, or error-free.',
                                '2. Outputs are suitable for regulatory filings without further professional review.',
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-2">
                                    <span className="text-gray-900 text-xl font-gesta">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'liability',
            number: '08',
            title: 'Limitation of Liability',
            content: (
                <div className="space-y-6">
                    <div className="border border-[#061A40] rounded-xl p-2">
                        <div className="flex items-start space-x-4">
                            <div>
                                <p className="text-gray-900 font-gesta text-xl">
                                    To the maximum extent permitted by law, AgentAstro is not liable for any indirect, incidental, special, consequential, or punitive damages (including lost profits, lost opportunities, or business interruption).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border hover:border-[#061A40] shadow-sm">
                        <h4 className="font-semibold font-gesta text-xl text-gray-900 mb-4">In particular, AgentAstro shall not be liable for:</h4>
                        <div className="grid gap-3">
                            {[
                                'Regulatory delays, denials, or enforcement actions based on reliance on the Services.',
                                'Errors or omissions in outputs, reports, or data surfaced by the Services.',
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-2 p-2 font-gesta text-xl rounded-lg">
                                    <IoIosAlert className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-900 text-xl font-gesta">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-1">
                        <div className="flex items-center space-x-3">
                            <div>
                                <p className="text-gray-900 text-xl font-gesta">
                                    Our total liability for any claim related to the Services is limited to the greater of (a) USD $100 or (b) the fees you paid to AgentAstro in the twelve (12) months prior to the event giving rise to the claim.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'governing-law',
            number: '09',
            title: 'Governing Law and Jurisdiction',
            content: (
                <div className="space-y-2">
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada, without regard to conflict of laws.
                    </p>
                    <p className="text-xl font-gesta text-gray-900 leading-relaxed">
                        Any disputes shall be resolved exclusively in the courts of Ontario, Canada. However, where required by statute, certain consumer protection laws of your jurisdiction (e.g., United States or European Union) may also apply.
                    </p>
                </div>
            )
        },
        {
            id: 'modifications',
            number: '10',
            title: 'Modifications',
            content: (
                <div className="space-y-4">
                    <p className="font-gesta text-xl text-gray-900 leading-relaxed">
                        We may update these Terms from time to time. If material changes are made, we will notify you by email or through the Services. Continued use after such updates constitutes acceptance of the revised Terms.
                    </p>
                </div>
            )
        }
    ];

    return (
        <div
            className="min-h-screen"
            style={{
                background: 'linear-gradient(to right, #EBEEF2 0%, #007EA6 50%, #061A40 100%)'
            }}
        >
            <Navbar />

            <div className="relative overflow-hidden">

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-gesta">
                            Terms of Service
                        </h1>
                        <p className="font-gesta text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-4">
                            Welcome to Agent Astro. These Terms of Service (“Terms”) govern your use of our website, application, and services (collectively, the “Services”), provided by AgentAstro Inc., a Canadian corporation with a U.S. office located in Boston, Massachusetts (“Agent Astro,” “we,” “us,” or “our”). By using our Services, you agree to be bound by these Terms.
                        </p>
                        <p className="font-gesta text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">If you do not agree to these Terms, you may not use the Services.
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-xl text-black font-gesta font-bold">
                            <span>Effective: May 2025</span>
                            <span>•</span>
                            <span>Updated: October 2025</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <div
                            key={section.id}
                            id={section.id}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-fade-in hover:shadow-lg transition-all shadow-md"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="p-8">
                                <div className="flex items-start space-x-4 mb-6">
                                    <h2 className="font-gesta text-3xl font-bold text-gray-900">{section.title}</h2>
                                </div>
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>


                <div className="mt-10">
                    <div className="bg-gradient-to-r bg-[#EBEEF2] rounded-2xl p-10 border  text-center relative overflow-hidden">
                        <div className="relative">
                            <h3 className="font-gesta text-xl font-bold text-black mb-3">If you have questions about this Privacy Policy or your personal information, please contact:</h3>
                            <p className="font-gesta text-xl text-gray-900 mb-6 max-w-2xl mx-auto">
                                AgentAstro Inc.<br />
                                Head Office: Ottawa, Ontario, Canada<br />
                                U.S. Office: 265 Franklin Street, Suite 1702, Boston, MA 02110, United States<br />
                            </p>
                            <p className="text-gray-900 font-semibold font-gesta text-xl">Email us at : &nbsp;
                                <a href="mailto:info@agentastro.ai" className="text-black font-semibold transition-colors">
                                    info@agentastro.ai
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default TermsOfService;
