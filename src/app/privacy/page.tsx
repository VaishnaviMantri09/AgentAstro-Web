'use client';
import React from 'react';
import { Mail, ExternalLink, UserCheck } from 'lucide-react';
import { MdLocationPin } from "react-icons/md";
import { FaSquareCheck, FaCircleInfo } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { AiFillStop } from "react-icons/ai";
import { Navbar } from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const PrivacyPolicy = () => {

    const sections = [
        {
            id: 'who-we-are',
            title: 'Who We Are',
            content: (
                <div className="space-y-6">
                    <p className="font-gesta text-gray-900 leading-relaxed text-xl">
                        AgentAstroInc. is a Canadian company that provides regulatory intelligence tools for medical device companies and professionals. Our software aggregates publicly available data to help users better understand regulatory pathways.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-xl p-6 border group hover:border-[#061A40] transition-all hover:shadow-md">
                            <MdLocationPin className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="font-gesta font-semibold text-gray-900 mb-2 text-xl">Head Office</h4>
                            <p className="font-gesta text-gray-900 text-xl">Ottawa, Ontario, Canada</p>
                        </div>
                        <div className="rounded-xl p-6 border group hover:border-[#061A40] transition-all hover:shadow-md">
                            <TbWorld className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="font-gesta font-semibold text-gray-900 mb-2 text-xl">U.S. Office</h4>
                            <p className="font-gesta text-gray-900 text-xl">265 Franklin Street, Suite 1702<br />Boston, MA 02110</p>
                        </div>
                    </div>

                    <div className="rounded-xl p-6 border hover:border-[#061A40]">
                        <div className="flex items-start space-x-4">
                            <div>
                                <p className="text-gray-900 mb-3 font-gesta text-xl ">We are subject to Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA). Where applicable, we also comply with other data protection laws, including the California Consumer Privacy Act (CCPA) and the EU General Data Protection Regulation (GDPR).</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'information-collect',
            title: 'Information We Collect',
            content: (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 border hover:border-[#061A40]">
                            <div className="flex items-center space-x-3 mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 font-gesta">Information You Provide Directly</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    'Name, email address, company name, and other contact details.',
                                    'Billing and payment information (collected via Stripe).',
                                    'Account credentials and preferences.',
                                    'Content you upload to the Services, such as regulatory data, documents, or notes'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center space-x-3 text-gray-900">
                                        <FaSquareCheck className="w-4 h-4 flex-shrink-0 " />
                                        <span className="text-xl font-gesta">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-6 border hover:border-[#061A40]">
                            <div className="flex items-center space-x-3 mb-4">
                                <h3 className="font-gesta text-xl font-semibold text-gray-900">Collected Automatically</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    'IP address, device type, browser type.',
                                    'Usage data (pages viewed, features accessed, time spent).',
                                    'Log and diagnostic data.',
                                    'Cookies and similar technologies (see Section 3).'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center space-x-3 text-gray-900">
                                        <FaSquareCheck className="w-4 h-4 flex-shrink-0 " />
                                        <span className="text-xl font-gesta">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'cookies',
            title: 'Cookies and Tracking',
            content: (
                <div className="space-y-6">
                    <p className="font-gesta text-xl text-gray-900 leading-relaxed">
                        We use cookies and similar technologies to:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                type: 'Essential',
                                desc: 'Enable essential site functionality.',
                            },
                            {
                                type: 'Analytics',
                                desc: 'Analyze usage patterns and improve our Services.',
                            },
                            {
                                type: 'Preferences',
                                desc: 'Remember user preferences.',
                            },
                        ].map((cookie, idx) => (
                            <div key={idx} className={`bg-white rounded-xl p-5 border hover:border-[#061A40] hover:shadow-md transition-all shadow-sm`}>
                                <h4 className="font-semibold text-xl text-gray-900 mb-2 font-gesta">{cookie.type}</h4>
                                <p className="text-gray-900 text-xl font-gesta">{cookie.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border border-[#061A40] rounded-lg p-4">
                        <p className="text-black text-xl font-gesta">
                            <FaCircleInfo className="inline w-4 h-4 mr-2" />
                            You can manage cookie preferences via our website cookie banner or in your browser settings. Some cookies are necessary for the platform to function and cannot be disabled.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'how-we-use',
            title: 'How We Use Your Information',
            content: (
                <div className="space-y-6">
                    <p className="font-gesta text-xl text-gray-900 leading-relaxed">
                        We use your information to:
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { text: 'Provide, maintain, and operate the Services.' },
                            { text: 'Process payments and manage subscriptions.' },
                            { text: 'Respond to inquiries and provide support.' },
                            { text: 'Send important account and service updates.' },
                            { text: 'Improve and develop the platform.' },
                            { text: 'Comply with legal obligations.' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-4 bg-white rounded-xl border hover:border-[#061A40] hover:shadow-md transition-all shadow-sm">
                                <span className="text-gray-900 font-medium font-gesta text-xl">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-xl p-6 border border-[#061A40]">
                        <div className="flex items-center space-x-3">
                            <AiFillStop className="w-8 h-8" />
                            <div>
                                <p className="font-gesta text-xl text-black">We do not sell or rent your personal information.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'sharing',
            title: 'How We Share Information',
            content: (
                <div className="space-y-4">
                    <p className="font-gesta text-xl text-gray-900 leading-relaxed mb-4">
                        We may share information with:
                    </p>

                    {[
                        {
                            desc: 'Service providers (e.g., Stripe, cloud hosting, analytics) under contractual confidentiality obligations.',
                        },
                        {
                            desc: 'Legal authorities if required to comply with applicable laws or legal processes.',
                        },
                        {
                            desc: 'Business successors in the event of a merger, acquisition, or sale of assets.',
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex space-x-4 p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all shadow-sm">
                            <div className="flex-1">
                                <p className="text-gray-900 text-xl font-gesta">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        {
            id: 'security',
            title: 'Data Ownership, Storage and Security',
            content: (
                <div className="space-y-6">
                    <div className="rounded-xl p-6 border hover:border-[#061A40]">
                        <h4 className="font-gesta text-xl font-bold text-gray-900 mb-2">User Content:</h4>
                        <p className="text-gray-900 text-xl font-gesta">
                            Any documents, data, or content you upload remain your property. You grant AgentAstroa limited license to process such content solely for providing the Services.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-6 border hover:border-[#061A40] shadow-sm">
                            <h4 className="font-gesta text-xl font-semibold text-gray-900 mb-2">Storage :</h4>
                            <p className="text-gray-900 text-xl font-gesta">
                                Your data may be stored in Canada, the United States, or other jurisdictions where service providers operate.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 border hover:border-[#061A40] shadow-sm">
                            <h4 className="font-gesta text-xl font-semibold text-gray-900 mb-2">Security:</h4>
                            <p className="text-gray-900 text-xl font-gesta">
                                We use industry-standard safeguards, including encryption in transit and at rest, to protect your data. However, no system is completely secure, and you use the Services at your own risk.
                            </p>
                        </div>
                    </div>

                </div>
            )
        },
        {
            id: 'your-rights',
            title: 'Data Retention and Your Rights',
            content: (
                <div className="space-y-4">
                    <p className="font-gesta text-xl text-gray-900 leading-relaxed">
                        We retain information as long as needed to provide the Services, meet legal obligations, resolve disputes, and enforce agreements.
                    </p>
                    <p className="font-gesta text-xl text-gray-900 leading-relaxed">
                        Your rights include (subject to applicable law):
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            {
                                right: 'Access',
                                desc: 'Accessing the personal information we hold about you.',
                            },
                            {
                                right: 'Correction',
                                desc: 'Requesting corrections to inaccurate or outdated information.',
                            },
                            {
                                right: 'Deletion',
                                desc: 'Requesting deletion/erasure of your data, unless retention is legally required.',
                            },
                            {
                                right: 'Withdrawal',
                                desc: 'Withdrawing consent to processing, subject to legal or contractual restrictions.',
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="rounded-xl p-5 border hover:border-[#061A40]">
                                <p className="text-gray-900 text-xl font-gesta">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border border-[#061A40] rounded-xl p-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-6 h-6" />
                                <div>
                                    <p className="text-gray-900 font-semibold font-gesta text-xl">To exercise your rights contact us at : &nbsp;
                                        <a href="mailto:info@agentastro.ai" className="text-[#061A40] font-semibold  transition-colors">
                                            info@agentastro.ai
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'international',
            title: 'International Users',
            content: (
                <div className="border hover:border-[#061A40] rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                        <p className="font-gesta text-xl text-gray-900 leading-relaxed">
                            If you access the Services from outside Canada, including the United States or European Union, your data will be transferred to and processed in Canada, the U.S., or other jurisdictions where our providers operate. These regions may not have the same privacy protections as your home country, but we will take steps to ensure your information is handled in accordance with this Policy.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'third-party',
            title: 'Third-Party Links',
            content: (
                <div className="bg-white border hover:border-[#061A40] rounded-xl p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                        <ExternalLink className="w-6 h-6 flex-shrink-0 mt-1" />
                        <p className="font-gesta text-xl text-gray-900 leading-relaxed">
                            Our Services may contain links to third-party websites. We are not responsible for their content or privacy practices. We encourage you to review the privacy policies of any third-party services you use.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'children',
            title: "Children’s Privacy",
            content: (
                <div className="border border-[#061A40] rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                        <UserCheck className="w-8 h-8  flex-shrink-0" />
                        <div>
                            <p className="font-gesta text-xl text-gray-900">
                                Our Services are not directed to children under the age of 16, or under 13 where U.S. COPPA law applies. We do not knowingly collect personal information from minors. If we learn that a child has provided personal information, we will delete it promptly.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'changes',
            title: 'Changes to This Policy',
            content: (
                <div className="space-y-4">
                    <p className="font-gesta text-xl text-gray-900 leading-relaxed">
                        We may update this Privacy Policy from time to time. If material changes are made, we will notify you by email or through the Services. Your continued use after updates constitutes acceptance of the revised Policy.
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
            < div className=" relative overflow-hidden" >

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-2 py-8">
                    <div className="text-center animate-fade-in">
                        <h2 className="font-gesta text-4xl md:text-5xl font-bold text-white mb-6">
                            Privacy Policy
                        </h2>
                        <p className="font-gesta text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-2">
                            AgentAstroInc. (“Agent Astro,” “we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website, application,
                            and services (collectively, the “Services”).
                        </p>
                        <p className="font-gesta text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">By accessing or using our Services, you agree to the terms of this Privacy Policy.
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-xl text-black font-gesta font-bold">
                            <span>Effective: May 2025</span>
                            <span>•</span>
                            <span>Updated: August 2025</span>
                        </div>
                    </div>
                </div>
            </div >

            < div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12" >
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
                                    <h2 className="text-3xl font-bold text-gray-900 font-gesta">{section.title}</h2>
                                </div>
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <div className="bg-gradient-to-r bg-[#EBEEF2] rounded-2xl p-10 border  text-center relative overflow-hidden">
                        <div className="relative">
                            <h3 className="font-gesta text-xl font-bold text-black mb-3">If you have questions about this Privacy Policy or your personal information, please contact:</h3>
                            <p className="font-gesta text-xl text-gray-900 mb-6 max-w-2xl mx-auto">
                                AgentAstroInc.<br />
                                Head Office: Ottawa, Ontario, Canada<br />
                                U.S. Office: 265 Franklin Street, Suite 1702, Boston, MA 02110, United States<br />
                            </p>
                            <p className="text-gray-900 font-semibold font-gesta text-xl">Email us at : &nbsp;
                                <a href="mailto:info@agentastro.ai" className="text-[#061A40] font-semibold transition-colors">
                                    info@agentastro.ai
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
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
        </div >
    );
};

export default PrivacyPolicy;