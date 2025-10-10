"use client";
import React from "react";


type Testimonial = {
  text: string;
  name: string;
};

const testimonials: Testimonial[] = [
  {
    text: "AgentAstro represents the next evolution of regulatory affairs: Combining AI powered industry expertise for faster approvals.",
    name: "Jay Litkey",
  },
  {
    text: "AgentAstro’s insights empower teams to navigate submissions with confidence, saving time and resources across operations.",
    name: "Lanna Millien",
  },
  {
    text: "AgentAstro gave us valuable insights into the FDA 510(k) process and regulatory requirements.",
    name: "Chattar Rathore",
  },
  {
    text: "As a subscriber,AgentAstro is a promising tool that speeds up and improves confidence in regulatory submissions.",
    name: "Navin Dewagan",
  },
];

const firstRow = testimonials.slice(0, 2);
const secondRow = testimonials.slice(2, 4);

export default function Testimonials() {
  return (
    <div className="testimonials-wrapper">
      <div className="testimonials-section">
        <div className="section-header">
          <h1 className="main-title font-gesta text-3xl">What do our Users are Saying</h1>
        </div>
        <div className="testimonials-container">
          <div className="testimonials-row">
            <div className="row-track row-left">
              {[...firstRow, ...firstRow].map((testimonial, idx) => (
                <div className="testimonial-card" key={`row1-${idx}`}>
                  <div className="user-info">
                    <div className="user-details font-gesta">
                      <div className="user-name font-gesta">{testimonial.name}</div>
                    </div>
                  </div>
                  <div className="testimonial-text font-gesta">"{testimonial.text}"</div>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonials-row">
            <div className="row-track row-right">
              {[...secondRow, ...secondRow].map((testimonial, idx) => (
                <div className="testimonial-card" key={`row2-${idx}`}>
                  <div className="user-info">
                    <div className="user-details">
                      <div className="user-name font-gesta">{testimonial.name}</div>
                    </div>
                  </div>
                  <div className="testimonial-text font-gesta">"{testimonial.text}"</div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-overlay fade-left"></div>
          <div className="fade-overlay fade-right"></div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-wrapper {
          background: transparent;
          width: 100%;
          padding: 40px 0;
        }

        .testimonials-section {
          max-width: 900px;
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
          height: 400px;
          overflow: hidden;
          border-radius: 24px;
          background: background: linear-gradient(to right, #F5F7FA 0%, #A7C7D9 50%, #4A6E8D 100%);
          border: 2px solid #e2e8f0;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px 0;
        }

        .testimonials-row {
          height: 50%;
          overflow: hidden;
          position: relative;
        }

        .row-track {
          display: flex;
          gap: 20px;
          height: 100%;
          will-change: transform;
          align-items: center;
        }

        .row-left {
          animation: scrollLeft 25s linear infinite;
        }

        .row-right {
          animation: scrollRight 30s linear infinite;
        }

        .row-track:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 10px));
          }
        }

        @keyframes scrollRight {
          from {
            transform: translateX(calc(-50% - 10px));
          }
          to {
            transform: translateX(0);
          }
        }

        .testimonial-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          flex-shrink: 0;
          min-width: 320px;
          max-width: 320px;
          min-height: 140px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-self: flex-start;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }

        .user-details {
          min-width: 0;
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          font-size: 16px;
          color: #1e293b;
          margin-bottom: 1px;
        }

        .user-handle {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }

        .testimonial-text {
          font-size: 16px;
          line-height: 1.5;
          color: #475569;
          font-weight: 400;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .fade-overlay {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          pointer-events: none;
          z-index: 10;
        }

        @media (max-width: 1024px) {
          .testimonials-section {
            padding: 0 16px 50px 16px;
          }

          .main-title {
            font-size: 2.5rem;
          }

          .testimonials-container {
            height: 350px;
            border-radius: 20px;
            gap: 16px;
            padding: 16px 0;
          }

          .row-track {
            gap: 16px;
          }

          .testimonial-card {
            padding: 16px;
            min-width: 280px;
            max-width: 280px;
            min-height: 130px;
          }

          .section-header {
            margin-bottom: 32px;
          }

          .user-name {
            font-size: 16px; 
          }

          .testimonial-text {
            font-size: 14px; 
            line-height: 1.5;
          }

          .fade-overlay {
            width: 60px;
          }
        }

        @media (max-width: 640px) {
          .testimonials-wrapper {
            padding: 20px 0;
          }

          .testimonials-section {
            padding: 0 16px 20px 16px;
          }

          .main-title {
            font-size: 2rem;
            margin-bottom: 12px;
          }

          .section-header {
            margin-bottom: 24px;
          }

          .testimonials-container {
            height: 300px;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            gap: 12px;
            padding: 12px 0;
          }

          .row-track {
            gap: 12px;
          }

          .row-left {
            animation-duration: 20s;
          }

          .row-right {
            animation-duration: 25s;
          }

          .testimonial-card {
            padding: 14px;
            border-radius: 12px;
            min-width: 240px;
            max-width: 240px;
            min-height: 120px;
          }


          .user-name {
            font-size: 15px; 
          }

          .user-handle {
            font-size: 12px;
          }

          .testimonial-text {
            font-size: 14px; 
            line-height: 1.45;
          }

          .fade-overlay {
            width: 40px;
          }
        }

        @media (max-width: 480px) {
          .testimonials-wrapper {
            padding: 16px 0;
          }

          .testimonials-section {
            padding: 0 12px 16px 12px;
          }

          .main-title {
            font-size: 1.75rem;
            line-height: 1.3;
            margin-bottom: 20px;
          }

          .section-header {
            margin-bottom: 20px;
          }

          .testimonials-container {
            height: 320px;
            border-radius: 12px;
            gap: 8px;
            padding: 8px 0;
          }

          .testimonial-card {
            padding: 12px;
            border-radius: 10px;
            min-width: 200px;
            max-width: 200px;
            min-height: 110px;
          }

          .testimonial-card:hover {
            transform: translateY(-2px);
          }

          .user-info {
            margin-bottom: 8px;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
            margin-right: 8px;
          }

          .user-name {
            font-size: 14px;
          }

          .user-handle {
            font-size: 11px; 
          }

          .testimonial-text {
            font-size: 13px; 
            line-height: 1.4;
          }

          .row-track {
            gap: 8px;
          }

          .fade-overlay {
            width: 30px;
          }
        }

        @media (max-width: 360px) {
          .testimonials-section {
            padding: 0 8px 12px 8px;
          }

          .main-title {
            font-size: 1.5rem;
            margin-bottom: 16px;
          }

          .section-header {
            margin-bottom: 16px;
          }

          .testimonials-container {
            height: 300px;
            gap: 6px;
            padding: 6px 0;
          }

          .testimonial-card {
            padding: 10px;
            min-width: 180px;
            max-width: 180px;
            min-height: 100px;
          }

          .user-info {
            margin-bottom: 6px;
          }

          .user-name {
            font-size: 13px; 
          }

          .user-handle {
            font-size: 10px;
          }

          .testimonial-text {
            font-size: 12px; 
            line-height: 1.35;
          }

          .row-track {
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
}
