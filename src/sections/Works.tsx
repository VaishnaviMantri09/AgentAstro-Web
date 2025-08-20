'use client';

type Step = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

const steps: Step[] = [
  {
    title: "Ask Questions",
    description: "Use natural language for your toughest regulatory queries; no advanced search skills needed.",
    icon: "1",
    color: "from-emerald-400 to-teal-600"
  },
  {
    title: "Identify Predicate Devices",
    description: "Instantly access and analyze FDA 510(k) data to uncover relevant predicate devices.",
    icon: "2",
    color: "from-blue-400 to-cyan-600"
  },
  {
    title: "Compare Details",
    description: "Review device specs, testing protocols, and regulatory pathways side by side.",
    icon: "3",
    color: "from-purple-400 to-violet-600"
  },
  {
    title: "Generate Reports",
    description: "Export clear, customized reports to support your substantial equivalence claims.",
    icon: "4",
    color: "from-pink-400 to-rose-600"
  },
];

export default function Works() {
  return (
    <section className="relative overflow-hidden py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className="absolute bottom-32 right-1/4 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute top-1/2 left-1/6 w-24 h-24 bg-white/3 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }} />
        <div className="absolute bottom-20 left-1/2 w-28 h-28 bg-white/3 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '3s', animationDuration: '7s' }} />
        <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-float" style={{ animationDelay: '3.5s' }} />
      </div>

      <div
        className="absolute inset-0 z-30 opacity-5"
        style={{
          backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 text-center relative z-40">
        <div className="mb-2">
          <h2 className="font-gesta text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-4 drop-shadow-2xl">
            How It{' '}
            <span className="font-gesta bg-gradient-to-r  bg-clip-text text-black animate-pulse">
              Works ?
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto mb-6 rounded-full shadow-lg animate-pulse" />
          <p className="font-gesta text-red  font-bold text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Transform your regulatory workflow with our intelligent process.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12 font-gesta">
          {steps.map((step: Step, idx: number) => (
            <div
              key={idx}
              className="group relative bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl px-6 py-10 flex flex-col items-center text-center border border-white/40 hover:scale-110 hover:bg-white transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 animate-fadeInUp"
              style={{
                animationDelay: `${idx * 0.1}s`,
                animationFillMode: 'backwards'
              }}
            >
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 scale-150`} />
                <div className={`relative w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-xl group-hover:rotate-12 transition-transform duration-300`}>
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {step.description}
              </p>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(45deg, transparent 30%, ${step.color.includes('emerald') ? 'rgba(52, 211, 153, 0.1)' :
                    step.color.includes('blue') ? 'rgba(96, 165, 250, 0.1)' :
                      step.color.includes('purple') ? 'rgba(167, 139, 250, 0.1)' :
                        'rgba(251, 113, 133, 0.1)'
                    } 70%, transparent)`
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="font-gesta text-base sm:text-lg md:text-xl text-gray-70 mb-5">
            Ready to streamline your FDA submissions?
          </p>
          <a href="/started"
            className="font-gesta inline-block px-8 py-3 text-base sm:text-lg font-semibold bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
            Connect with Us
          </a>
        </div>
      </div>

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

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
            }
            25% { 
              transform: translateY(-10px) rotate(5deg); 
            }
            50% { 
              transform: translateY(-20px) rotate(0deg); 
            }
            75% { 
              transform: translateY(-10px) rotate(-5deg); 
            }
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .hover\\:shadow-3xl:hover {
            box-shadow: 
              0 25px 50px -12px rgba(0, 0, 0, 0.25), 
              0 0 0 1px rgba(255, 255, 255, 0.1),
              0 0 30px rgba(59, 130, 246, 0.3);
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>

    </section>
  );
}
