"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    fetch("/api/email-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Subscription failed");
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => setIsSubscribed(false), 3000);
      })
      .catch(() => alert("Failed to subscribe. Please try again later."))
      .finally(() => setIsLoading(false));
  };

  const getLocalizedPath = (path: string): string => path;

  const footerLinks = {
    general: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Updates", href: "/updates" },
      { name: "Our Story", href: "/story" },
    ],
    support: [
      { name: "Contact Us", href: "/started" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/company/agentastro-ai/",
      label: "LinkedIn",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
      <footer className="bg-[#061A40] backdrop-blur-sm border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
            <div className="lg:col-span-4">
              <div className="mb-6 flex items-center space-x-4">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="Agent Astro AI"
                    height={40}
                    width={40}
                    className="text-white border-2 border-gray-400 shadow-md p-1 rounded-lg"
                  />
                </Link>
                <div className="flex flex-col">
                  <h2 className="font-gesta text-2xl font-bold text-white tracking-tight">
                    Agent Astro
                  </h2>
                  <p className="font-gesta text-[#EBEEF2] text-base font-medium">
                    Faster, Smarter, FDA Submissions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-4xl">
                <div className="lg:col-span-2 bg-gradient-to-br from-white/95 to-indigo-50/90 rounded-xl p-6 border border-white/30 hover:border-white/50 transition-all duration-300 shadow-lg backdrop-blur-sm">
                  <h3 className="font-gesta text-xl font-semibold mb-2 text-gray-800"> Don't Miss Out !</h3>
                  <p className="font-gesta text-gray-600 text-base mb-3">
                    Subscribe to our newsletter to get the latest updates.
                  </p>
                  {isSubscribed ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium font-gesta">Successfully subscribed!</span>
                    </div>
                  ) : (
                    <form
                      name="newsletter-subscription"
                      onSubmit={handleSubscribe}
                      className="space-y-2"
                    >
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="font-gesta w-full bg-white/80 border rounded-lg pl-10 pr-4 py-2.5 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent text-base shadow-sm"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading || !email}
                        className="font-gesta text-xl w-full bg-[#007EA6] text-gray-100 px-4 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        {isLoading ? "Subscribing..." : "Subscribe Now"}
                      </button>
                    </form>
                  )}
                </div>


                <div className="lg:col-span-1 bg-gradient-to-br from-sky-100/95 to-cyan-50/90 rounded-xl p-4 border border-sky-200/50 hover:border-sky-300/70 transition-all duration-300 group shadow-lg backdrop-blur-sm">
                  <div className="flex flex-col items-center text-center h-full">
                    <h3 className="font-gesta text-gray-800 font-semibold text-lg mb-2"> Transform Your Workflow</h3>
                    <p className="font-gesta text-gray-600 text-base mb-4 leading-relaxed flex-grow">
                      Discover how AI can streamline your operations.
                    </p>
                    <a
                      href={getLocalizedPath("/started")}
                      className="font-gesta inline-flex items-center justify-center w-full bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white px-3 py-2.5 rounded-lg font-medium text-base transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mt-auto"
                    >
                      Get Started
                      <ArrowRight className="w-3 h-3 ml-1.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-2xl font-gesta">General</h3>
              <ul className="space-y-2 font-gesta">
                {footerLinks.general.map((link) => (
                  <li key={link.name}>
                    <a
                      href={getLocalizedPath(link.href)}
                      className="font-gesta text-xl text-[#EBEEF2] transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-gesta text-white font-semibold mb-4 text-2xl">Support</h3>
              <ul className="space-y-2 font-gesta">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={getLocalizedPath(link.href)}
                      className="text-xl font-gesta text-[#EBEEF2] transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <div className="font-gesta text-[#EBEEF2] text-xl">
                © {new Date().getFullYear()} Agent Astro, All rights reserved.
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-[#EBEEF2] text-xl mr-2 font-gesta">Follow Us</span>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="font-gesta hover:text-white transition-colors duration-200 p-2 rounded-lg"
                  >
                    {React.cloneElement(social.icon, { className: "w-6 h-6" })}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 md:gap-8">
              <a
                href={getLocalizedPath("/privacy")}
                className="font-gesta text-[#EBEEF2] text-base transition-colors duration-200 hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href={getLocalizedPath("/terms")}
                className="font-gesta text-[#EBEEF2] text-base transition-colors duration-200 hover:underline"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
