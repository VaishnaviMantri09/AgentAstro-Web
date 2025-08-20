"use client";
import React from "react";

const avatars = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
];

type Testimonial = {
  text: string;
  imageSrc: string;
  name: string;
  username: string;
};

const testimonials: Testimonial[] = [
  {
    text: "Agent Astro represents the next evolution of regulatory affairs: Combining AI powered industry expertise for faster approvals.",
    imageSrc: avatars[0],
    name: "Jay Litkey",
    username: "@jaylitkey",
  },
  {
    text: "Agent Astro’s insights empower teams to navigate submissions with confidence, saving time and resources across operations.",
    imageSrc: avatars[1],
    name: "Lanna Millien",
    username: "@lannamillien",
  },
  {
    text: "I was amazed at how quickly we integrated AgentAstro.ai into our regulatory workflow.",
    imageSrc: avatars[2],
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "Agent Astro gave us valuable insights into the FDA 510(k) process and regulatory requirements.",
    imageSrc: avatars[3],
    name: "Chattar Rathore",
    username: "@chattarrathore",
  },
  {
    text: "We’ve reduced unnecessary costs since adopting AgentAstro.ai—the platform’s ability to identify optimal solutions.",
    imageSrc: avatars[4],
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: avatars[5],
    name: "Riley Smith",
    username: "@rileysmith1",
  },
];

const firstRow = testimonials.slice(0, 3);
const secondRow = testimonials.slice(3, 6);

export default function Testimonials() {
  return (
    <div className="testimonials-wrapper">
      <div className="testimonials-section">
        <div className="section-header">
          <h1 className="main-title font-gesta">What our users Say ?</h1>
        </div>
        <div className="testimonials-container">
          <div className="testimonials-row">
            <div className="row-track row-left">
              {[...firstRow, ...firstRow].map((testimonial, idx) => (
                <div className="testimonial-card" key={`row1-${idx}`}>
                  <div className="user-info">
                    <img
                      src={testimonial.imageSrc}
                      alt={testimonial.name}
                      className="user-avatar"
                    />
                    <div className="user-details font-gesta">
                      <div className="user-name font-gesta">{testimonial.name}</div>
                      <div className="user-handle font-gesta">{testimonial.username}</div>
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
                    <img
                      src={testimonial.imageSrc}
                      alt={testimonial.name}
                      className="user-avatar"
                    />
                    <div className="user-details">
                      <div className="user-name font-gesta">{testimonial.name}</div>
                      <div className="user-handle font-gesta">{testimonial.username}</div>
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
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 60px 20px;
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
          background: linear-gradient(120deg, #d1f2ff 0%, #90caf9 100%);
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
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
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
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 12px;
          border: 2px solid #f1f5f9;
        }

        .user-details {
          min-width: 0;
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          font-size: 14px;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .user-handle {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }

        .testimonial-text {
          font-size: 13px;
          line-height: 1.5;
          color: #475569;
          font-weight: 400;
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
          }

          .section-header {
            margin-bottom: 32px;
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
          }

          .user-avatar {
            width: 36px;
            height: 36px;
            margin-right: 10px;
          }

          .user-name {
            font-size: 13px;
          }

          .user-handle {
            font-size: 11px;
          }

          .testimonial-text {
            font-size: 12px;
            line-height: 1.4;
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
          }

          .testimonials-container {
            height: 280px;
            border-radius: 12px;
            gap: 10px;
            padding: 10px 0;
          }

          .testimonial-card {
            padding: 12px;
            border-radius: 10px;
            min-width: 200px;
            max-width: 200px;
          }

          .testimonial-card:hover {
            transform: translateY(-2px);
          }

          .user-avatar {
            width: 32px;
            height: 32px;
            margin-right: 8px;
          }

          .user-name {
            font-size: 12px;
          }

          .user-handle {
            font-size: 10px;
          }

          .testimonial-text {
            font-size: 11px;
          }

          .row-track {
            gap: 10px;
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
          }

          .testimonials-container {
            height: 260px;
          }

          .testimonial-card {
            padding: 10px;
            min-width: 180px;
            max-width: 180px;
          }
        }
      `}</style>
    </div>
  );
}