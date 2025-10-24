"use client";
import React from "react";

type Testimonial = {
  text: string;
  name: string;
  designation: string;
};

const testimonials: Testimonial[] = [
  {
    text: "As a subscriber, Agent Astro is a promising tool that speeds up and improves confidence in regulatory submissions.",
    name: "Navin Dewagan",
    designation: "CEO, Digital HealthCare Solutions",
  },
  {
    text: "Agent Astro represents the next evolution of regulatory affairs: Combining AI powered industry expertise for faster approvals.",
    name: "Jay Litkey",
    designation: "SVP, Flexera",
  },
  {
    text: "Agent Astro shows how AI can move regulatory affairs upstream, it help in shaping design choices, materials, and supply chain decisions from day one.",
    name: "Danny Minogue",
    designation: "CEO, Minogue Medical",
  },
  {
    text: "What Agent Astro is building is exactly what the medtech industry needs. This platform has potential to streamline regulatory process and lower barriers to innovation.",
    name: "Frank Baylis",
    designation: "Executive Chairman, Baylis Medical",
  },
  {
    text: "Agent Astro's insights empower teams to navigate submissions with confidence, saving time and resources across operations.",
    name: "Lanna Millien",
    designation: "Healthcare Executive",
  },
  {
    text: "Agent Astro gave us valuable insights into the FDA 510(k) process and regulatory requirements.",
    name: "Chattar Rathore",
    designation: "Regulatory & Compliance Director at Nûby",
  },
];

const firstRow = testimonials.slice(0, 3);
const secondRow = testimonials.slice(3, 6);

export default function Testimonials() {
  return (
    <div className="testimonials-wrapper">
      <div className="testimonials-section">
        <div className="section-header">
          <h1 className="main-title font-gesta text-3xl">
            What our Users are Saying
          </h1>
        </div>

        <div className="testimonials-container">
          {/* Desktop view */}
          <div className="desktop-view">
            <div className="testimonials-row">
              <div className="row-track row-left">
                {[...firstRow, ...firstRow].map((testimonial, idx) => (
                  <div className="testimonial-card" key={`row1-${idx}`}>
                    <div className="user-info">
                      <div className="user-details font-gesta">
                        <div className="user-name font-gesta">{testimonial.name}</div>
                        <div className="user-designation font-gesta">
                          {testimonial.designation}
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-text font-gesta">
                      "{testimonial.text}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="testimonials-row">
              <div className="row-track row-right">
                {[...secondRow, ...secondRow].map((testimonial, idx) => (
                  <div className="testimonial-card" key={`row2-${idx}`}>
                    <div className="user-info">
                      <div className="user-details font-gesta">
                        <div className="user-name font-gesta">{testimonial.name}</div>
                        <div className="user-designation font-gesta">
                          {testimonial.designation}
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-text font-gesta">
                      "{testimonial.text}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-overlay fade-left"></div>
            <div className="fade-overlay fade-right"></div>
          </div>

          {/* Mobile view */}
          <div className="mobile-view">
            <div className="mobile-track">
              {[...testimonials, ...testimonials].map((testimonial, idx) => (
                <div className="testimonial-card" key={`mobile-${idx}`}>
                  <div className="user-info">
                    <div className="user-details">
                      <div className="user-name font-gesta">{testimonial.name}</div>
                      <div className="user-designation font-gesta">
                        {testimonial.designation}
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-text font-gesta">"{testimonial.text}"</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-wrapper {
          background: transparent;
          width: 100%;
          padding: 40px 0;
        }

        .testimonials-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 60px 20px;
          position: relative;
          z-index: 2;
          width: 100%;
          box-sizing: border-box;
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .main-title {
          font-size: 3rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .testimonials-container {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background: linear-gradient(to right, #f5f7fa 0%, #a7c7d9 50%, #4a6e8d 100%);
          border: 2px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px 0;
        }

        /* DESKTOP VIEW */
        .desktop-view {
          display: block;
        }
        .mobile-view {
          display: none;
        }

        .testimonials-row {
          height: 45%;
          overflow: hidden;
          position: relative;
          margin-bottom: 25px; 
        }

        .row-track {
          display: flex;
          gap: 30px;
          height: 100%;
          will-change: transform;
          align-items: center;
        }

        .testimonials-row:last-child {
          margin-bottom: 0;
        }

        .row-left {
          animation: scrollLeft 35s linear infinite;
        }

        .row-right {
          animation: scrollRight 40s linear infinite;
        }

        .row-track:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 10px)); }
        }

        @keyframes scrollRight {
          from { transform: translateX(calc(-50% - 10px)); }
          to { transform: translateX(0); }
        }

        .testimonial-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s ease;
          flex-shrink: 0;
          min-width: 500px;
          max-width: 500px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .user-name {
          font-weight: 600;
          font-size: 20px;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .user-designation {
          font-size: 18px;
          color: black;
          font-weight: 500;
        }

        .testimonial-text {
          font-size: 18px;
          line-height: 1.7;
          color: black;
          font-weight: 400;
          margin-top: 8px;
        }

        .fade-overlay {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          pointer-events: none;
          z-index: 10;
        }

        /* MOBILE VIEW */
        @media (max-width: 768px) {
          .desktop-view { display: none; }
          .mobile-view {
            display: block;
            overflow: hidden;
            width: 100%;
            background: linear-gradient(to right, #f5f7fa 0%, #a7c7d9 50%, #4a6e8d 100%);
            box-shadow: 0 0 0 2px white;
            border-radius: 16px;
          }

          .testimonials-container {
            background: transparent;
            border: 0;
            padding: 0;
            overflow: hidden;
            width: 100%;
            border-radius: 16px;
          }

          .mobile-track {
            display: flex;
            gap: 16px;
            padding: 0 16px; 
            animation: scrollMobile 80s linear infinite;
            will-change: transform;
            width: fit-content;
          }

          @keyframes scrollMobile {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .mobile-track:hover {
            animation-play-state: paused;
          }

          .testimonial-card {
            flex: 0 0 calc(100vw - 32px); 
            min-width: calc(100vw - 32px);
            max-width: calc(100vw - 32px);
            padding: 24px;
            border-radius: 14px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .testimonial-text {
            font-size: 18px;
            line-height: 1.6;
            color: #1a1a1a;
            font-weight: 400;
            margin-top: 16px;
            word-wrap: break-word;
          }

          .user-name { font-size: 18px; font-weight: 600; }
          .user-designation { font-size: 16px; font-weight: 500; margin-top: 2px; }
        }

        @media (max-width: 480px) {
          .mobile-view { padding: 16px; }
          .testimonials-container { padding: 16px; border-radius: 14px; }
          .testimonial-card {
            flex: 0 0 calc(92vw - 8px);
            min-width: calc(92vw - 8px);
            max-width: calc(92vw - 8px);
            padding: 20px;
          }
          .testimonial-text { font-size: 18px; margin-top: 12px; }
          .user-name { font-size: 18px; }
          .user-designation { font-size: 18px; }
          .mobile-track { animation: scrollMobile 100s linear infinite; }
        }
      `}</style>
    </div>
  );
}
