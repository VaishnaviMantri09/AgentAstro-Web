'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MdSend } from "react-icons/md";
import logosrc from "@/../public/logo.png";
import { IoIosCheckbox } from "react-icons/io";

const chatScript: { from: 'bot' | 'user'; text: string }[] = [
  { from: 'bot', text: "Hi there. I'm AgentAstro – the AI that simplifies FDA 510(k) approvals. How can I help you today?" },
  { from: 'user', text: "I wanted to know, Is the Aspire RX-LP6 Aspiration Catheter legally marketed? answer yes or no ?" },
  { from: 'bot', text: "Yes.The Aspire RX- LP6 Aspiration Catheter is substantially equivalent to other legally marketed thrombus aspiration catheters.The FDA determined that the Aspire MAX 7 - 11F Mechanical Thrombectomy System and Aspire Mechanical Aspirator are substantially equivalent to legally marketed predicate devices.Similarly, the Aspiron Aspiration Catheter(K190619) is substantially equivalent to legally marketed predicate devices." },
  { from: 'user', text: "Also could you Compare the Aspire RX-LP6 Aspiration Catheter, Aspire MAX Aspiration Catheter, Zelante DVT ClotHunter Helical Rotation Device and Merit Medical Concierge Catheters based on Intended Use, Indications for Use, Contraindications, and Target Population in a table format." },
  {
    from: 'bot', text: `Here's a comparison table for the Aspire RX-LP6 and Aspire MAX Aspiration Catheters:
| Feature | Aspire RX- LP6 | Aspire MAX |
| ------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------|
| Intended Use | Single - use device for physicians experienced in diagnostic and interventional procedures, used with manually operated piston syringes to remove fresh, soft emboli and thrombi from coronary and peripheral vasculature | Single - use device for physicians experienced in diagnostic and interventional procedures, used with manually operated piston syringes to remove fresh, soft emboli and thrombi from peripheral and coronary vasculature |
| Indications for Use | Removal of fresh, soft emboli and thrombi from vessels in the coronary and peripheral vasculature | Removal of fresh, soft emboli and thrombi from vessels in the peripheral vasculature |
| Contraindications | Vessels < 2mm in diameter; removal of fibrous, adherent, or calcified material(e.g., chronic clot, atherosclerotic plaque); venous system; cerebral vasculature | Removal of fibrous, adherent, or calcified material(e.g., chronic clot and atherosclerotic plaque); neurovascular use; vessels < 2.0mm diameter for Aspire MAX 5 and < 2.5mm diameter for Aspire MAX 6 |
| Target Population | Not specified in provided sources. | Not specified in provided sources. |`
  },
  { from: 'user', text: "Thank you so much for the above Information." },
  { from: 'bot', text: "You're welcome. If you have any more questions, feel free to ask anytime." },
];

const parseMarkdownTable = (markdown: string) => {
  const lines = markdown.trim().split('\n');
  const tableStart = lines.findIndex(line => line.includes('|'));

  if (tableStart === -1) return null;

  const tableLines = lines.slice(tableStart);
  if (tableLines.length < 3) return null;

  const headers = tableLines[0].split('|').map(cell => cell.trim()).filter(cell => cell);
  const dataRows = tableLines.slice(2).map(line =>
    line.split('|').map(cell => cell.trim()).filter(cell => cell)
  );

  return { headers, dataRows };
};

const hasMarkdownTable = (text: string) => {
  return text.includes('|') && text.includes('---');
};

const items = [
  "Use it to accelerate 510(k) submissions.",
  "Strengthen compliance strategies.",
  "Uncover Insights on predicate devices.",
  "All services in one secure platform.",
];

type BubbleProps = {
  from: 'bot' | 'user';
  text: string;
  delay: number;
  show: boolean;
};

const Bubble = ({ from, text, delay, show }: BubbleProps) => {
  const isTable = hasMarkdownTable(text);
  const tableData = isTable ? parseMarkdownTable(text) : null;

  return (
    <div
      className={`flex ${from === 'bot' ? 'justify-start' : 'justify-end'} mb-2 md:mb-3 transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {from === 'bot' && (
        <div className="font-gesta w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-md flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 mt-1">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 border-gray-900 bg-black">
            <img
              src={logosrc.src}
              alt="AgentAstro.AI Logo"
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
            />
          </div>
        </div>
      )}

      <div className={`${isTable ? 'max-w-full' : 'max-w-xs'}font-gesta  px-3 py-2 md:px-4 md:py-2 rounded-2xl shadow-sm text-base md:text-lg leading-relaxed ${from === 'bot' ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
        {isTable && tableData ? (
          <div className="overflow-x-auto">
            <div className="font-gesta mb-2 text-base md:text-lg">
              {text.split('\n')[0]}
            </div>
            <table className="min-w-full border-collapse border border-gray-300 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  {tableData.headers.map((header, idx) => (
                    <th key={idx} className="font-gesta text-lg border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.dataRows.map((row, rowIdx) => (
                  <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="font-gesta text-base border border-gray-300 px-2 py-1 text-gray-600 align-top">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          text
        )}
      </div>

      {from === 'user' && (
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 md:ml-3 flex-shrink-0 mt-1">
          <MdSend className="text-blue-600 w-3 h-3 md:w-5 md:h-5" />
        </div>
      )}
    </div>
  );
};

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
    <div className="font-gesta max-w-xs px-3 py-2 md:px-4 md:py-2 rounded-2xl shadow-sm text-xs md:text-sm leading-relaxed bg-gray-100 text-gray-800 flex items-center">
      <span>Thinking...</span>
      <div className="dot-flashing ml-2"></div>
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

    const delay = 5000;

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
    <div className="font-gesta w-full max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-[320px] md:h-[428px] lg:h-[396px]">
      <div className="px-3 py-2 md:px-4 md:py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl flex-shrink-0">
        <h3 className="font-gesta text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
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
        .dot-flashing:before, .dot-flashing:after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #6366f1;
          animation: dotFlashing 0.6s infinite;
        }
        .dot-flashing:before {
          left: 0;
          animation-delay: 0s;
        }
        .dot-flashing:after {
          left: 8px;
          animation-delay: 0.2s;
        }
        @keyframes dotFlashing {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};


const WhosAgentastro = () => (
  <div className="bg-transparent">
    <div className="max-w-sm md:max-w-4xl lg:max-w-7xl mx-auto px-2 py-2 md:px-4 md:py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 items-start">
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
        <div className="flex justify-center lg:justify-center">
          <ChatbotPanel />
        </div>
      </div>
    </div>
  </div>
);

export default WhosAgentastro;



