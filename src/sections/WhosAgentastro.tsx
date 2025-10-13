'use client';
import React, { useState } from 'react';
import { IoIosCheckbox } from "react-icons/io";
import { useEffect } from 'react';

const flashcardImages = [
  "/WhosAgentastro/FlashCard-1.jpeg",
  "/WhosAgentastro/FlashCard-2.jpeg",
  "/WhosAgentastro/FlashCard-3.jpeg",
  "/WhosAgentastro/FlashCard-4.jpeg",
  "/WhosAgentastro/FlashCard-5.png",
  "/WhosAgentastro/FlashCard-6.png",
];

const items = [
  "Use it to accelerate 510(k) submissions.",
  "Strengthen compliance strategies.",
  "Uncover Insights on predicate devices.",
  "All services in one secure platform.",
];

const FlashcardPanel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[800px] h-[250px] sm:h-[290px] md:h-[450px] relative">
      {flashcardImages.map((img, idx) => {
        let position = idx - currentIndex;

        if (position < -2) {
          position += flashcardImages.length;
        }

        if (position < -1 || position > 3) return null;

        let translateY, scale, opacity, zIndex;
        if (position === -1) {
          translateY = 0;
          scale = 0.95;
          opacity = 0;
          zIndex = 1;
        }
        else if (position === 0) {
          translateY = 0;
          scale = 1;
          opacity = 1;
          zIndex = 10;
        } else if (position === 1) {
          translateY = 20;
          scale = 0.95;
          opacity = 0.8;
          zIndex = 9;
        }
        else if (position === 2) {
          translateY = 40;
          scale = 0.9;
          opacity = 0.6;
          zIndex = 8;
        }
        else if (position === 3) {
          translateY = 60;
          scale = 0.85;
          opacity = 0.4;
          zIndex = 7;
        }

        return (
          <div
            key={idx}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity: opacity,
              zIndex: zIndex,
            }}
          >
            <div className="w-full h-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <img
                  src={img}
                  alt={`Flashcard ${idx + 1}`}
                  className="object-contain w-full h-full"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div >
  );
};

const WhosAgentastro = () => (
  <div className="bg-transparent">
    <div className="max-w-sm md:max-w-4xl lg:max-w-7xl mx-auto px-2 py-2 md:px-4 md:py-4 mb-12 md:mb-15 space-y-12">
      <div className="flex justify-center items-start">
        <div className="lg:col-span-2 flex justify-center">
          <div className="w-full max-w-3xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-indigo-400/5 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }}></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="relative p-4 md:p-6 lg:p-8 xl:p-10">
              <div className="text-center mb-6 md:mb-8">
                <h4 className="font-gesta text-3xl md:text-4xl font-extrabold mb-4  bg-clip-text text-black animate-fade-in">
                  Meet AgentAstro
                </h4>
                <p className="font-gesta mt-4 text-gray-600 font-semibold text-base text-xl md:text-xl">
                  AgentAstro helps regulatory teams cut months of work into hours by combining FDA data with AI-powered analysis.
                </p>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {items.map((text, idx) => (
                  <li key={idx} className="flex items-start">
                    <IoIosCheckbox className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0" />
                    <span className="ml-2 md:ml-3 font-semibold text-base md:text-lg text-gray-600 font-gesta">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <FlashcardPanel />
      </div>
    </div >
  </div >
);

export default WhosAgentastro;
