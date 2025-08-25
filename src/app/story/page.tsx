'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { IoEye, IoSparkles } from "react-icons/io5";
import { TfiThought } from "react-icons/tfi";
import { PiCellSignalHighBold } from "react-icons/pi";
import Link from 'next/link';

const StoryPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = useState(0);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const [visibleItems, setVisibleItems] = useState(new Set<number>());


  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlaying) return;
    if (activeItem < timelineItems.length - 1) {
      const timer = setTimeout(() => setActiveItem((prev) => prev + 1), 1500);
      return () => clearTimeout(timer);
    } else {
      setAutoPlaying(false);
    }
  }, [activeItem, autoPlaying]);

  useEffect(() => {
    setVisibleItems((prev) => {
      const newSet = new Set(prev);
      newSet.add(activeItem);
      return newSet;
    });
  }, [activeItem]);

  const handleItemClick = (index: number) => {
    if (!autoPlaying) {
      setActiveItem(index);
    }
  };


  const faqData = [
    // PRICING & TRIAL SECTION
    {
      question: 'What subscription plans are available?',
      answer: 'We offer three subscription plans: Starter Plan (ideal for smaller companies or consultants), Team Plan (for growing teams needing regular access and deeper reports), and Enterprise Plan (for high-volume users with full access, white-glove support, and optional per-query add-ons). Pricing and plan details are available on Pricing Page also available via a meeting.',
    },
    {
      question: 'Can I try AgentAstro before subscribing?',
      answer: 'Yes. We offer a trial period so you can explore the platform and see its value firsthand. We also provide discounted pricing during the trial for early adopters.',
    },
    {
      question: 'Can I purchase queries without a full subscription?',
      answer: 'Yes. We offer per-query pricing for occasional users. Packages of 10 or 20 queries can be purchased separately, making Agent Astro accessible even for smaller projects.',
    },

    // DATA SECURITY SECTION
    {
      question: 'How is my data protected?',
      answer: 'Agent Astro uses only publicly available regulatory data. No confidential company information is uploaded or stored unless explicitly shared by you. We follow best practices in security, privacy, and data handling.',
    },

    // PRODUCT OVERVIEW SECTION
    {
      question: 'What is AgentAstro?',
      answer: 'Agent Astro is an AI-powered regulatory intelligence tool designed specifically for medical device companies. We help teams accelerate the FDA approval process by simplifying research, identifying predicate devices, and surfacing key insights from regulatory databases like 510(k), De Novo, and PMA.',
    },
    {
      question: 'What makes AgentAstro different?',
      answer: "Agent Astro stands out by using AI to uncover patterns and insights, being specifically tailored for FDA medical device submissions, developed with regulatory experts, and offering flexible access through various subscription and pricing options.",
    },
    {
      question: 'Who is AgentAstro for?',
      answer: 'Agent Astro is built for Regulatory Affairs professionals, Medical Device developers, Startups and multinational companies navigating U.S. FDA requirements, and Consultants specializing in FDA submissions.',
    },

    // PRODUCT MECHANICS SECTION
    {
      question: 'What problems does AgentAstro solve?',
      answer: "Agent Astro helps you find relevant predicate devices quickly, understand past FDA decisions and trends, streamline your research and submission prep process, save dozens of hours per application, and reduce your regulatory team's size and workload.",
    },
    {
      question: 'How does AgentAstro work?',
      answer: "Using publicly available FDA data and proprietary AI workflows, Agent Astro compiles and contextualizes device information, highlights approval timelines and key decision points, identifies substantial equivalence pathways, and provides insights that enable faster, more confident decision-making.",
    },

    // GETTING STARTED
    {
      question: 'How do I get started?',
      answer: 'You can request a meeting or purchase a query package today. Just visit our Contact page to begin.',
    },
  ];

  const teamMembers = [
    {
      name: 'Adam J. Smith',
      role: 'Founder - CEO',
      bio: 'Adam is a seasoned leader with over 25 years of experience, renowned for building teams and guiding organizations in solving complex challenges.',
      color: 'from-pink-400 to-purple-500',
      image: '/Team/adam.png'
    },
    {
      name: 'Dr. Axel Gedeon Mengara',
      role: 'Chief Technology Officer',
      bio: 'Axel is AI Leader with a PhD and 10+ years of experience specializing in leading the rapid design, development, and deployment  of AI products.',
      color: 'from-blue-400 to-cyan-500',
      image: '/Team/axel.png'
    },
  ];

  const advisors = [
    {
      name: 'Frank Baylis',
      image: '/Advisor/frank.png',
      bio: 'Frank Baylis is leader in medtech and public policy, and currently serving as Executive Chairman of Baylis Medical Technologies.',
    },
    {
      name: 'Lanna Millien',
      image: '/Advisor/lanna.png',
      bio: 'Lanna Millien is a seasoned healthcare business leader with over 20 years\' experience in pharmaceuticals and medical devices.',
    },
    {
      name: 'Danny Minogue',
      image: '/Advisor/danny.png',
      bio: 'Danny Minogue is pioneering leader in advanced surgical technologies and healthcare innovation with over 40 years of transformative impact in Canada.',
    },
    {
      name: 'Jay Litkey',
      image: '/Advisor/jay.png',
      bio: 'Jay Litkey, a serial SaaS entrepreneur with over 25 years of experience who founded Embotics, currently serves as SVP at Flexera and advisor to AgentAstro.',
    }
  ];

  const timelineItems = [
    {
      title: 'The Problem We Saw',
      content: 'Regulatory teams spending months manually searching through fragmented FDA databases, often missing critical insights that could accelerate their approval pathways.',
      gradient: 'from-blue-500/10 to-blue-700/10',
      border: 'border-red-300/20',
      textColor: 'text-red-200',
      dotGradient: "from-emerald-600 to-teal-700",
      side: 'left',
      icon: IoEye,
    },
    {
      title: 'The Spark of Innovation',
      content: 'Watching teams waste 6+ months on predicate searches, miss critical FDA feedback patterns, and submit incomplete applications due to fragmented data, we knew AI could transform this broken process.',
      border: 'border-yellow-300/20',
      textColor: 'text-yellow-200',
      dotGradient: "from-blue-700 to-cyan-700",
      side: 'right',
      icon: IoSparkles,
    },
    {
      title: 'The Breakthrough',
      content: 'We developed proprietary AI algorithms that could analyze regulatory patterns across thousands of submissions, turning months of research into minutes of insight.',
      gradient: 'from-green-500/10 to-teal-500/10',
      border: 'border-green-300/20',
      textColor: 'text-green-200',
      dotGradient: "from-purple-600 to-violet-600",
      side: 'left',
      icon: TfiThought,
    },
    {
      title: 'The Impact Today',
      content: 'AgentAstro now powers regulatory decisions for hundreds of medical device companies, reducing research time and accelerating patient access to life-saving technologies.',
      gradient: 'from-purple-500/15 to-blue-500/15',
      border: 'border-purple-300/30',
      textColor: 'text-purple-200',
      dotGradient: "from-pink-400 to-rose-600",
      side: 'right',
      special: true,
      icon: PiCellSignalHighBold,
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to right, #EBEEF2 0%, #007EA6 50%, #061A40 100%)'
      }}
    >
      <Navbar />

      <section className="relative px-3 py-12 lg:px-3 overflow-hidden">
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="animate-slideInDown stagger-2">
            <h2 className="font-gesta text-5xl lg:text-5xl font-extrabold mb-7 text-white">
              Behind the Journey
            </h2>
            <p className="font-gesta text-2xl lg:text-2xl font-bold mb-8  bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-white/90 leading-tight animate-pulseText hover-lift">
              Every great path begins with a single step, and ours started with a shared vision to revolutionize the FDA 510(k) approval process through intelligent AI automation.
            </p>
            <div className="flex justify-center animate-scaleIn stagger-4" >
              <Link href="/started">
                <button className="font-gesta text-lg group relative flex items-center gap-2 text-black font-semibold hover:text-black-700 transition-all duration-300" >
                  Start Your Journey
                  <span className="absolute left-0 bottom-0 h-0.5 bg-white w-0 group-hover:w-full transition-all duration-300" > </span>
                  < ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-5 lg:px-6 ">
        <div className="mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-gesta text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-gradient">
              Our Evolution
            </h2>
          </div>

          <div className="relative mb-12">
            <div className="max-w-4xl mx-auto">
              <div
                className={`relative overflow-hidden rounded-3xl p-8 backdrop-blur-sm border transition-all duration-700 transform ${visibleItems.has(activeItem) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  } ${timelineItems[activeItem].gradient} ${timelineItems[activeItem].border} bg-[#EBEEF2] border-blue-900 hover:scale-105 hover:shadow-2xl group`}
              >
                <div className="relative z-10">
                  <h3
                    className={`font-gesta text-3xl font-bold mb-6 text-blue-900/90 transition-all duration-500`}>
                    {timelineItems[activeItem].title}
                  </h3>
                  <p className="font-gesta text-black text-xl leading-relaxed">{timelineItems[activeItem].content}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-center">
              <div className="relative w-full max-w-4xl">
                <svg className="absolute inset-0 w-full h-32 pointer-events-none" viewBox="0 0 800 128" aria-hidden="true" focusable="false">
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgb(239 68 68)" stopOpacity="1" />
                      <stop offset="25%" stopColor="rgb(251 191 36)" stopOpacity="1" />
                      <stop offset="50%" stopColor="rgb(34 197 94)" stopOpacity="1" />
                      <stop offset="75%" stopColor="rgb(168 85 247)" stopOpacity="1" />
                      <stop offset="100%" stopColor="rgb(59 130 246)" stopOpacity="1" />
                    </linearGradient>
                    <filter id="glow" colorInterpolationFilters="sRGB">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M 50 64 Q 200 20, 350 64 T 550 64 Q 700 20, 750 64"
                    stroke="url(#pathGradient)"
                    strokeWidth="3"
                    fill="none"
                    filter="url(#glow)"
                    className="animate-pulse"
                  />
                </svg>

                <div className="hidden md:flex relative justify-between items-center py-8 px-4 lg:px-6">
                  {timelineItems.map((item, index) => (
                    <div
                      key={index}
                      className={`timeline-item relative cursor-pointer group transition-all duration-500 ${visibleItems.has(index) ? 'animate-bounceIn' : 'opacity-0'
                        }`}
                      data-index={index}
                      onClick={() => handleItemClick(index)}
                      style={{ animationDelay: `${index * 0.2}s` }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={activeItem === index}
                      aria-label={`Select timeline step ${index + 1}: ${item.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleItemClick(index);
                        }
                      }}
                    >
                      <div
                        className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${item.dotGradient} flex items-center justify-center transition-all duration-300 ${activeItem === index
                          ? 'scale-125 shadow-2xl ring-4 ring-white/30'
                          : 'scale-100 hover:scale-110 shadow-lg'
                          } group-hover:shadow-2xl`}
                      >
                        {activeItem === index && (
                          <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
                        )}
                        {React.createElement(item.icon, {
                          className: `w-6 h-6 text-white transition-all duration-300 ${activeItem === index ? 'animate-pulse' : ''
                            }`,
                        })}
                      </div>

                      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 text-center">
                        <div
                          className={`px-3 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 ${activeItem === index
                            ? `bg-black ${item.gradient} ${item.border} scale-105`
                            : 'bg-white/5 border-white/20 hover:bg-white/10'
                            }`}
                        >
                          <p className={`font-gesta text-base font-bold ${activeItem === index ? item.textColor : 'text-black'}`}>
                            {item.title}
                          </p>
                        </div>
                      </div>

                      {activeItem === index && (
                        <>
                          <div className="absolute -top-2 -right-2 w-2 h-2 bg-white/50 rounded-full animate-ping"></div>
                          <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-bounce"></div>
                          <div className="absolute top-1/2 -right-4 w-1 h-1 bg-purple-400/50 rounded-full animate-pulse"></div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="md:hidden relative pt-8 pb-4">
                  <div className="absolute left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-green-400 via-blue-400 via-purple-400 to-red-400 opacity-30"></div>

                  <div className="space-y-8 max-w-sm mx-auto">
                    {timelineItems.map((item, index) => (
                      <div
                        key={index}
                        className={`relative flex items-start cursor-pointer group transition-all duration-500 ${visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                          }last:mb-0`}
                        onClick={() => handleItemClick(index)}
                        style={{ animationDelay: `${index * 0.2}s` }}
                        tabIndex={0}
                        role="button"
                        aria-pressed={activeItem === index}
                        aria-label={`Select timeline step ${index + 1}: ${item.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleItemClick(index);
                          }
                        }}
                      >
                        <div className="relative flex-shrink-0">
                          <div
                            className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${item.dotGradient} flex items-center justify-center transition-all duration-300 ${activeItem === index
                              ? 'scale-110 shadow-2xl ring-4 ring-white/30'
                              : 'scale-100 hover:scale-105 shadow-lg'
                              } group-hover:shadow-2xl`}
                          >
                            {activeItem === index && (
                              <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
                            )}
                            {React.createElement(item.icon, {
                              className: `w-6 h-6 text-white transition-all duration-300 ${activeItem === index ? 'animate-pulse' : ''
                                }`,
                            })}
                          </div>

                          {activeItem === index && (
                            <>
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/50 rounded-full animate-ping"></div>
                              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-bounce"></div>
                            </>
                          )}
                        </div>

                        <div className="ml-6 flex-1 min-w-0">
                          <div
                            className={`px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${activeItem === index
                              ? `bg-black ${item.gradient} ${item.border} scale-105 shadow-xl`
                              : 'bg-white/5 border-white/20 hover:bg-white/10'
                              }`}
                          >
                            <h3 className={`font-gesta text-base font-bold leading-tight ${activeItem === index ? item.textColor : 'text-black'
                              }`}>
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      <section id="team-section" data-animate className="px-6 py-10 lg:px-12 lg:py-24 xl:px-16 xl:py-16">
        <div className="mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 transform ${isVisible['team-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
          >
            <h2 className="font-gesta text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Meet the Team
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl w-full mx-auto mb-20">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 transform ${isVisible['team-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  } card-3d hover-lift`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-[#EBEEF2] rounded-3xl p-8 border border-white/20 transition-all duration-500 hover:scale-110 hover:rotate-1 text-center relative overflow-hidden group-hover:shadow-2xl hover-glow animate-float-slow h-full flex flex-col">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.color.replace(
                      'from-',
                      'from-'
                    ).replace('to-', 'to-').replace('-400', '-400/10').replace('-500', '-400/10')} opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient`}
                  ></div>

                  <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 mx-auto mb-6 rounded-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                    />
                    <h3 className="font-gesta text-2xl font-bold mb-2 text-gray-900 animate-slideInDown text-center">
                      {member.name}
                    </h3>
                    <p className="text-lg font-gesta text-blue-900/90 font-semibold mb-4 animate-fadeIn text-center" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                      {member.role}
                    </p>
                    <p className="font-gesta text-gray-900 text-base leading-relaxed animate-slideInUp text-center max-w-xs mx-auto" style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
                      {member.bio}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400/50 rounded-full animate-bounce-slow"></div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`text-center mb-12 transition-all duration-1000 transform ${isVisible['team-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            style={{ animationDelay: '0.5s' }}
          >
            <h3 className="font-gesta text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Strategic Advisors
            </h3>
            <p className="font-gesta text-blue-100 text-xl max-w-2xl mx-auto">
              Guided by regulatory experts and industry leaders who understand the challenges you face.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6">
            {advisors.map((advisor, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 transform ${isVisible['team-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="bg-[#EBEEF2] rounded-3xl p-6 border border-white/30 transition-all duration-500 hover:scale-105 hover:-rotate-1 text-center group-hover:shadow-2xl h-full flex flex-col">
                  <div className="flex flex-col items-center justify-center flex-grow">
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="w-28 h-28 mx-auto mb-4 rounded-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                    />
                    <h4 className="font-gesta text-xl font-bold mb-3 text-black text-center">
                      {advisor.name}
                    </h4>
                    <p className="font-gesta text-gray-900 text-medium  leading-relaxed text-center">
                      {advisor.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq-section" data-animate className="px-6 py-4 lg:px-4">
        <div className="mx-auto max-w-4xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 transform ${isVisible['faq-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
          >
            <h2 className="font-gesta text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Your guide to using AgentAstro
            </h2>
          </div>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 transform ${isVisible['faq-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  } hover-lift`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 overflow-hidden hover:scale-105 hover:shadow-xl hover-glow animate-slideInLeft card-3d">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300 group"
                    aria-expanded={openFAQ === index}
                  >
                    <span className="font-gesta text-lg font-semibold text-white pr-4 group-hover:text-blue-200 transition-colors duration-300">{faq.question}</span>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-blue-300 transition-all duration-300 rotate-180 animate-bounce-slow" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-300 transition-all duration-300 group-hover:animate-wiggle" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 pb-6">
                      <div className="font-gesta text-lg text-blue-100 leading-relaxed animate-fadeIn animate-slideInUp">{faq.answer}</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
          <div
            className={`text-center mt-12 transition-all duration-1000 transform ${isVisible['faq-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            style={{ animationDelay: '0.5s' }}
          >
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.9s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideInDown {
          animation: slideInDown 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }
        .animate-rotateIn {
          animation: rotateIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes floatReverse {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-2deg);
          }
        }
        .animate-float-reverse {
          animation: floatReverse 8s ease-in-out infinite reverse;
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float-slow {
          animation: floatSlow 10s ease-in-out infinite;
        }

        @keyframes pulse-bg {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        .animate-pulse-bg {
          animation: pulse-bg 4s ease-in-out infinite;
        }

        @keyframes pulseText {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
        .animate-pulseText {
          animation: pulseText 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-btnMagnetic {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }
        .animate-btnMagnetic:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        .animate-btnMagnetic:hover:before {
          left: 100%;
        }
        .animate-btnMagnetic:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.9) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-bounceIn {
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blinkCursor {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: white;
          }
        }
        .animate-typewriter {
          overflow: hidden;
          border-right: 2px solid;
          white-space: nowrap;
          animation: typewriter 3s steps(40, end), blinkCursor 0.75s step-end infinite;
        }

        @keyframes morphShape {
          0%,
          100% {
            border-radius: 50%;
          }
          25% {
            border-radius: 25% 75%;
          }
          50% {
            border-radius: 75% 25%;
          }
          75% {
            border-radius: 25% 75% 75% 25%;
          }
        }
        .animate-morph {
          animation: morphShape 8s ease-in-out infinite;
        }

        .card-3d {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .card-3d:hover {
          transform: rotateY(10deg) rotateX(5deg);
        }

        .parallax-slow {
          transform: translateZ(-1px) scale(2);
        }
        .parallax-medium {
          transform: translateZ(-0.5px) scale(1.5);
        }
        .parallax-fast {
          transform: translateZ(0);
        }

        .stagger-1 {
          animation-delay: 0.1s;
        }
        .stagger-2 {
          animation-delay: 0.2s;
        }
        .stagger-3 {
          animation-delay: 0.3s;
        }
        .stagger-4 {
          animation-delay: 0.4s;
        }
        .stagger-5 {
          animation-delay: 0.5s;
        }

        @media (max-width: 768px) {
          .text-6xl {
            font-size: 2.5rem;
          }
          .text-8xl {
            font-size: 3.2rem;
          }
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          transition: all 0.3s ease;
        }

        .hover-tilt:hover {
          transform: rotate(3deg) scale(1.05);
          transition: all 0.3s ease;
        }

        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
          transition: all 0.3s ease;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.6s ease;
        }
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div >
  );
};

export default StoryPage;