'use client';
import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, AlertCircle, ArrowRight, } from 'lucide-react';
import { SiGooglemeet } from "react-icons/si";
import { Navbar } from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { FaGlobeAfrica } from "react-icons/fa";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export default function StartedPage() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
        'idle'
    );

    const [isCalModalOpen, setIsCalModalOpen] = useState(false);

    const openCalModal = () => setIsCalModalOpen(true);
    const closeCalModal = () => setIsCalModalOpen(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log('Form submitted:', formData);

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
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
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="font-gesta text-5xl md:text-6xl font-bold bg-clip-text text-white mb-4">
                            Connect Now
                        </h1>
                        <p className="font-gesta text-xl text-white/90 max-w-2xl mx-auto">
                            The First Step Towards FDA Approval Starts Here. Whether you have
                            a question, need assistance, we're here to help.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-8">
                            <div className="bg-[#EBEEF2] backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                                <h2 className="font-gesta text-3xl font-bold text-gray-900 mb-6">
                                    Ways to Reach Us
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-gradient-to-r from-gray-600 to-gray-600 p-3 rounded-full">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-gesta text-xl text-black font-bold">Phone</p>
                                            <p className="font-gesta text-black">+1 (877) 257-5257</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="bg-gradient-to-r from-gray-600 to-gray-600 p-3 rounded-full">
                                            <SiGooglemeet className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-gesta text-xl text-black font-bold">
                                                Reserve your Meeting Slot
                                            </p>

                                            <button
                                                onClick={openCalModal}
                                                className="font-gesta group relative flex items-center gap-2 text-black font-semibold transition-all duration-300"
                                            >
                                                Schedule Call
                                                <span className="absolute left-0 bottom-0 h-0.5 bg-black w-0 group-hover:w-full transition-all duration-300"></span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="bg-gradient-to-r from-gray-600 to-gray-600 p-3 rounded-full">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-gesta text-xl text-black font-bold">Email</p>
                                            <p className="font-gesta text-black">info@agentastro.ai</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="bg-gradient-to-r from-gray-600 to-gray-600 p-3 rounded-full">
                                            <FaGlobeAfrica className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-gesta text-xl text-black font-bold">Mailing Address</p>
                                            <p className="font-gesta text-black">
                                                265 Franklin St, Suite 1702
                                                <br />
                                                Boston, MA,02110 United States
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#EBEEF2] backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-16">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-xl font-medium text-black mb-2 font-gesta"
                                        >
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`font-gesta w-full px-4 py-3 bg-[#061A40] border rounded-lg text-white placeholder-gray-300 focus:outline-none transition-all ${errors.name ? 'border-red-400' : 'border-white/30'
                                                }`}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-400 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-xl font-medium text-black mb-2 font-gesta"
                                        >
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`font-gesta w-full px-4 py-3 bg-[#061A40] border rounded-lg text-white placeholder-gray-300 focus:outline-none transition-all ${errors.email ? 'border-red-400' : 'border-white/30'
                                                }`}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-400 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-xl font-medium text-black mb-2 font-gesta"
                                    >
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className={`font-gesta w-full px-4 py-3 bg-[#061A40] border rounded-lg text-white placeholder-gray-300 focus:outline-none transition-all ${errors.subject ? 'border-red-400' : 'border-white/30'
                                            }`}
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-xl font-medium text-black mb-2 font-gesta"
                                    >
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={`font-gesta w-full px-4 py-3 bg-[#061A40] border rounded-lg text-white placeholder-gray-300 focus:outline-none transition-all resize-none ${errors.message ? 'border-red-400' : 'border-white/30'
                                            }`}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {submitStatus === 'success' && (
                                    <div className="font-gesta bg-green-500/20 border border-green-400 rounded-lg p-4 flex items-center text-green-300">
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Message sent successfully! We'll get back to you soon.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="font-gesta bg-red-500/20 border border-red-400 rounded-lg p-4 flex items-center text-red-300">
                                        <AlertCircle className="w-5 h-5 mr-2" />
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-4 px-6 rounded-lg  focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="font-gesta animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span className="font-gesta">Send Message</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {
                isCalModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] relative">
                            <button
                                onClick={closeCalModal}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Close calendar"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <iframe
                                src="https://cal.com/agentsify/15min"
                                width="100%"
                                height="100%"
                                style={{ border: 'none', borderRadius: '16px' }}
                                allowFullScreen
                                title="Schedule Call Calendar"
                            />
                        </div>
                    </div>
                )
            }

            <Footer />
        </div >
    );
}
