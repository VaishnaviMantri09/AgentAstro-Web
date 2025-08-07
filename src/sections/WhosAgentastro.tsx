'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MdSend } from "react-icons/md";
import logosrc from "@/../public/logo.png";
import { IoIosCheckbox } from "react-icons/io";


const chatScript: { from: 'bot' | 'user'; text: string }[] = [
  { from: 'bot', text: "Hi there! I'm AgentAstro.AI – the AI that simplifies FDA 510(k) approvals. How can I help you today?" },
  { from: 'user', text: "I wanted to know how can you help me FDA Approval?" },
  { from: 'bot', text: "I can guide you through the FDA approval process by interpreting regulations, mapping out the necessary requirements for your specific product." },
  { from: 'user', text: "How do you do that?" },
  { from: 'bot', text: " Absolutely! I use AI-powered tailored recommendations to streamline your submission strategy." },
  { from: 'user', text: "Sounds cool! How do I start?" },
  { from: 'bot', text: "To begin, simply connect with our team. We'll assess your product details and guide you through the next steps to prepare your FDA 510(k) submission." },
  { from: 'user', text: "Great! I'll reach out soon." },
  { from: 'bot', text: "Looking forward to it! Remember, with AgentAstro.AI, you're not alone in the FDA approval journey. We're here to help!" },
  { from: 'user', text: "Thanks for the info!" },
  { from: 'bot', text: "You're welcome! If you have any more questions, feel free to ask anytime." },
];


const items = [
  "AI guidance for FDA 510(k) approvals.",
  "Tailored recommendations for your product.",
  "Streamlined submission strategies.",
  "Expert insights on regulatory requirements.",
];


type BubbleProps = {
  from: 'bot' | 'user';
  text: string;
  delay: number;
  show: boolean;
};


const Bubble = ({ from, text, delay, show }: BubbleProps) => (
  <div
    className={`flex ${from === 'bot' ? 'justify-start' : 'justify-end'} mb-2 md:mb-3 transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {from === 'bot' && (
      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-md flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 mt-1">
        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 border-gray-900 bg-black">
          <img
            src={logosrc.src}
            alt="AgentAstro.AI Logo"
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
          />
        </div>
      </div>
    )}
    <div className={`max-w-xs px-3 py-2 md:px-4 md:py-2 rounded-2xl shadow-sm text-xs md:text-sm leading-relaxed ${from === 'bot' ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
      {text}
    </div>
    {from === 'user' && (
      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 md:ml-3 flex-shrink-0 mt-1">
        <MdSend className="text-blue-600 w-3 h-3 md:w-5 md:h-5" />
      </div>
    )}
  </div>
);


const TypingBubble = () => (
  <div className="flex justify-start mb-2 md:mb-3">
    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-md flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 mt-1">
      <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 border-gray-900 bg-black">
        <img
          src={logosrc.src}
          alt="AgentAstro.AI Logo"
          className="w-6 h-6 md:w-8 md:h-8 object-contain"
        />
      </div>
    </div>
    <div className="max-w-xs px-3 py-2 md:px-4 md:py-2 rounded-2xl shadow-sm text-xs md:text-sm leading-relaxed bg-gray-100 text-gray-800 flex items-center">
      <span>Thinking...</span>
      <span className="dot-flashing"></span>
    </div>
  </div>
);


const ChatbotPanel = () => {
  const [msgs, setMsgs] = useState([chatScript[0]]);
  const [active, setActive] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (active >= chatScript.length) return;


    if (chatScript[active].from === 'bot') {
      setIsTyping(true);
    }


    const delay = 18000;


    const timer = setTimeout(() => {
      setMsgs((script) => [...script, chatScript[active]]);
      setActive((a) => a + 1);
      setIsTyping(false);
    }, delay);


    return () => clearTimeout(timer);
  }, [active]);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [msgs, isTyping]);


  return (
    <div
      className="w-full max-w-sm md:max-w-md lg:w-96 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-[320px] md:h-[428px] lg:h-[396px]"
    >
      <div className="px-3 py-2 md:px-4 md:py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl flex-shrink-0">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 border-gray-900 bg-black">
            <img
              src={logosrc.src}
              alt="AgentAstro.AI Logo"
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
            />
          </div>
          AgentAstro
        </h3>
      </div>


      <div
        ref={chatContainerRef}
        className="flex-1 px-3 py-2 md:px-4 md:py-3 overflow-y-auto scroll-smooth"
        onScroll={(e) => e.stopPropagation()}
      >
        <div>
          {msgs.map((msg, idx) => (
            <Bubble key={idx} {...msg} delay={idx * 100} show={true} />
          ))}
          {isTyping && <TypingBubble />}
          <div ref={chatEndRef} className="h-1" />
        </div>
      </div>
      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: 20px;
          height: 6px;
          display: inline-block;
        }
        .dot-flashing:before, .dot-flashing:after, .dot-flashing div {
          content: "";
          display: inline-block;
          position: absolute;
          top: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #6366f1;
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        .dot-flashing:before {
          left: 0;
          animation: dotFlashing 0.6s infinite;
        }
        .dot-flashing:after {
          left: 8px;
          animation: dotFlashing 0.6s 0.2s infinite;
        }
        .dot-flashing div {
          left: 16px;
          animation: dotFlashing 0.6s 0.4s infinite;
        }
        @keyframes dotFlashing {
          0% {
            transform: scale(0);
          }
          50%, 100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div >
  );
};


const WhosAgentastro = () => (
  <div className="bg-transparent">
    <div className="max-w-sm md:max-w-4xl lg:max-w-7xl mx-auto px-2 py-2 md:px-4 md:py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 items-start">
        <div className="lg:col-span-2 flex justify-center">
          <div className="w-full max-w-3xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-indigo-400/5 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }}></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="relative p-4 md:p-6 lg:p-8 xl:p-10">
              <div className="text-center mb-6 md:mb-8">
                <h4 className="text-2xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
                  Meet AgentAstro
                </h4>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
                <p className="mt-4 text-gray-600 font-bold text-sm md:text-base">
                  Whether you're business leader seeking strategic clarity or organization aiming for smarter integrations. Your AI-powered assistant will help you for navigating the approval process with ease.
                </p>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {items.map((text, idx) => (
                  <li key={idx} className="flex items-start">
                    <IoIosCheckbox className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0" />
                    <span className="ml-2 md:ml-3 font-semibold text-sm md:text-base text-indigo-900">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:justify-center">
          <ChatbotPanel />
        </div>
      </div>
    </div>
  </div>
);


export default WhosAgentastro;