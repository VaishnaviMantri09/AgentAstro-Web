'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowRight, Calendar } from 'lucide-react';
import { articles } from '../../../data/articles';
import { Navbar } from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import Image from 'next/image';
import Link from 'next/link';

const ArticlePage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const article = articles.find((a) => a.slug === slug);
  const similarArticles = articles.filter((a) => a.slug !== slug).slice(0, 8);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center px-6">
          <h1 className="font-gesta text-5xl font-extrabold text-red-500 mb-6">404 - Not Found</h1>
          <p className="font-gesta text-gray-300 mb-8 text-xl">
            The article you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const cleanContent = article.content.replace(/<style[\s\S]*?<\/style>/gi, '');

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to right, #EBEEF2 0%, #007EA6 50%, #061A40 100%)'
      }}
    >
      <Navbar />
      <header className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16 lg:py-24 flex flex-col items-start lg:flex-row lg:items-center gap-10 lg:gap-24">
        <div className="lg:w-1/2 flex justify-center lg:justify-start w-full">
          {article.image && (
            <div className="relative w-full max-w-[900px] h-48 sm:h-72 md:h-96 rounded-3xl shadow-2xl ring-2 ring-indigo-600 ring-offset-4 ring-offset-transparent hover:ring-offset-indigo-700 transition">
              <Image
                src={article.image}
                alt={article.title || 'Article Image'}
                fill
                className="object-cover rounded-3xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>

        <div className="lg:w-1/2 mt-6 md:mt-10 lg:mt-0 max-w-xl space-y-4 md:space-y-6 pl-4 md:pl-8 ">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-white/90 mb-4 md:mb-6">
            <span className="font-gesta bg-black backdrop-blur-sm px-3 py-1 rounded-full text-lg">
              {article.category}
            </span>
          </div>
          <h1 className="font-gesta text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-wide text-indigo-50 drop-shadow-md ">
            {article.title}
          </h1>
          <p className="font-gesta text-lg md:text-xl text-gray-100 font-semibold leading-relaxed drop-shadow">
            {article.excerpt}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-6 md:mb-5 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <section className="w-full lg:w-2/3">
          <article
            className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-3xl shadow-xl p-4 md:p-10 xl:p-14 border border-indigo-700 animate-fadeIn"
            aria-label={article.title}
          >
            <div
              className="prose prose-indigo max-w-none"
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          </article>
        </section>
        <aside className="w-full lg:w-1/3 flex-shrink-0">
          <div className="bg-gray-900 bg-opacity-70 rounded-3xl shadow-lg p-4 md:p-6 border border-indigo-800">
            <h3 className="font-gesta text-lg md:text-xl font-bold text-indigo-200 mb-4 md:mb-5">Similar Articles</h3>
            <ul className="space-y-4 md:space-y-6">
              {similarArticles.map((sim) => (
                <li key={sim.slug} className="border-b border-indigo-700 pb-4 last:border-b-0 last:pb-0">
                  <button
                    onClick={() => router.push(`/updates/${sim.slug}`)}
                    className="block text-left w-full"
                  >
                    <p className="text-indigo-100 font-semibold font-gesta">{sim.title}</p>
                    <p className="text-indigo-400 text-sm mt-1 line-clamp-2 font-gesta">{sim.excerpt}</p>
                  </button>
                </li>
              ))}
              {similarArticles.length === 0 && (
                <li className="text-indigo-300 font-gesta">No similar articles found.</li>
              )}
            </ul>
          </div>
        </aside>
      </main>

      <section className="px-3 py-10 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r bg-[#EBEEF2] rounded-xl"></div>
            <div className="relative  rounded-xl p-12 border border-white/30 ">
              <h2 className="font-gesta text-3xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-black">
                Unlock the Fast Lane to FDA Success
              </h2>
              <p className="font-gesta text-xl text-blue-900/90 leading-relaxed mb-6">
                Be part of a growing community streamlining FDA approvals with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href='/started'>
                  <button className="font-gesta group bg-black text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 shadow-xl ">
                    Join Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />

      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        .prose {
          color: #ddd;
          font-family: 'Gesta', sans-serif;
        }
        .prose h2 {
          color: #061A40;
          font-weight: 1000;
          margin-top: 1em;
          margin-bottom: 1em;
          position: relative;
          padding-left: 1.75rem;
          font-size: 1.5rem;
          font-family: 'Gesta', sans-serif;
        }
        .prose h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 4rem;
          background: linear-gradient(135deg, #818cf8, #7c3aed);
          border-radius: 4px;
          font-family: 'Gesta', sans-serif;
        }
        .prose h3 {
          color: #c7d2fe;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-family: 'Gesta', sans-serif;
        }
        .prose p {
          line-height: 1.9;
          font-size: 1.15rem;
          color: #d1d5db;
          font-family: 'Gesta', sans-serif;
        }
        .prose ul, .prose ol {
          padding-left: 1.75rem;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
          font-family: 'Gesta', sans-serif;
        }
        .prose li {
          margin-bottom: 0.85rem;
          color: #d1d5db;
          line-height: 1.7;
          font-size: 1.05rem;
          font-family: 'Gesta', sans-serif;
        }
        .prose li::marker {
          color: #818cf8;
          font-weight: 800;
          font-size: 1.05rem;
          font-family: 'Gesta', sans-serif;
        }
        .prose a {
          color: #a78bfa;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.3s ease;
          font-family: 'Gesta', sans-serif;
        }
        .prose a:hover {
          color: #d8b4fe;
          font-family: 'Gesta', sans-serif;
        }
        .prose blockquote {
          border-left: 5px solid #8b5cf6;
          background-color: rgba(139, 92, 246, 0.1);
          padding-left: 1.5rem;
          font-style: italic;
          color: #c4b5fd;
          font-family: 'Gesta', sans-serif;
        }
        @media (max-width: 640px) {
          .prose p, .prose ul, .prose ol, .prose li { font-size: 1.5rem; font-family: 'Gesta', sans-serif; }
          .prose h1 { font-size: 2rem; font-family: 'Gesta', sans-serif; }
          .prose h2 { font-size: 1.25rem; font-family: 'Gesta', sans-serif; }
        }
      `}</style>
    </div>
  );
};

export default ArticlePage;
