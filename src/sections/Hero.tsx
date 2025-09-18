"use client";
import React, { useEffect, useRef, useState } from 'react';
import LandingImage from '@/../public/landingicon.jpg';
import Link from "next/link";

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden py-12 sm:py-16 lg:py-12"
    >
      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="font-gesta text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-4 sm:mb-6 ">
            AI‑Powered
            <br />
            <span className="lg:whitespace-nowrap text-center font-gesta text-gray-800 bg-clip-text text-justify">
              Regulatory Intelligence
            </span>
          </h1>
          <p className="font-gesta text-xl sm:text-xl text-gray-100 mb-6 sm:mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0 ">
            Accelerate FDA 510(k) submissions with faster predicate searches and submission-ready reporting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
            <Link href="/started">
              <button className="text-xl font-gesta w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-lg s-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 shadow-lg transition-colors text-justify">
                Book a Demo
              </button>
            </Link>
            <Link href="/pricing">
              <button className="text-xl font-gesta w-full sm:w-auto bg-transparent text-gray-900 px-6 py-3 rounded-lg s-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-lg transition-colors text-justify border-2 border-gray-900">
                View Pricing
              </button>
            </Link>
          </div>
        </div>

        <div className="relative lg:ml-32 xl:ml-56 mt-8 sm:mt-12  lg:mt-0 w-full max-w-sm sm:max-w-md lg:max-w-md z-30">
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-2xl animate-pulse opacity-60"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 border border-white/50">
            <img
              src={LandingImage.src}
              alt="Approval Process"
              className="w-full h-auto rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-500 ease-out subtle-rocking-reverse"
              style={{ display: 'block' }}
            />
            <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-lg animate-bounce flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full shadow-lg animate-pulse flex items-center justify-center">
              <svg
                className="w-5 h-5 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-bounce,
          [class*='animate-'] {
            animation-duration: 0s !important;
            animation-iteration-count: 0 !important;
          }
        }
        @keyframes subtle-rocking {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }
        .subtle-rocking {
          animation: subtle-rocking 5s ease-in-out infinite;
        }
          @keyframes subtle-rocking-reverse {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(10deg);
          }
          75% {
            transform: rotate(-10deg);
          }
        }
        .subtle-rocking-reverse {
          animation: subtle-rocking-reverse 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .subtle-rocking {
            animation-duration: 0s !important;
            animation-iteration-count: 0 !important;
          }
        }

      }
      }
      `}</style>
    </section>
  );
};