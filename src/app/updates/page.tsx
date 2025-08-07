'use client';
import React, { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Navbar } from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { articles } from '../../data/articles';
import { slugify } from '@/utils/slugify';

const UpdatesSection = () => {
    const [visibleArticles, setVisibleArticles] = useState(articles.slice(0, 4));
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const featuredArticle = visibleArticles.find(article => article.featured);
    const regularArticles = visibleArticles.filter(article => !article.featured);

    const handleReadMore = (articleTitle: string) => {
        const slug = slugify(articleTitle);
        window.open(`/updates/${slug}`, '_blank');
    };

    const handleLoadMore = () => {
        setVisibleArticles(articles);
    };

    const allArticlesCount = articles.length;

    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #bfdbfe 0%, #2563eb 50%, #1e3a8a 90%)'
            }}
            className="min-h-screen relative overflow-hidden"
        >
            <Navbar />
            <div className="relative overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-6 py-10">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
                            Latest Updates & Insights
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Stay informed with the latest developments in medical device regulations,
                            technology trends, and industry best practices.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
                {featuredArticle && (
                    <div className="mb-10">
                        <div
                            className="relative group cursor-pointer transform transition-all duration-700 hover:scale-[1.02]"
                            onClick={() => handleReadMore(featuredArticle.title)}
                        >
                            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-white/20 hover:shadow-2xl transition-all duration-500 border border-white/20">
                                <div className="grid lg:grid-cols-2 gap-0">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={featuredArticle.image}
                                            alt={featuredArticle.title}
                                            className="w-full h-80 lg:h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                                {featuredArticle.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{featuredArticle.date}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-3xl font-bold text-gray-800 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                                            {featuredArticle.title}
                                        </h3>

                                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                            {featuredArticle.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
                                                Read Full Article
                                                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-12">
                    <div className="flex items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Recent Articles</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularArticles.map((article, index) => (
                            <div
                                key={article.id}
                                className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                                style={{ animationDelay: `${index * 100}ms` }}
                                onMouseEnter={() => setHoveredCard(article.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => handleReadMore(article.title)}
                            >
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
                                    <div className="relative overflow-hidden h-48">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                                                {article.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                                                <ArrowRight className="w-4 h-4 text-gray-800" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{article.date}</span>
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-gray-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                            {article.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {article.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors duration-300 flex items-center gap-1">
                                                Read More
                                                <ArrowRight
                                                    className={`w-4 h-4 transform transition-transform duration-300 ${hoveredCard === article.id ? 'translate-x-1' : ''
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="text-center">
                    {visibleArticles.length < allArticlesCount && (
                        <button
                            onClick={handleLoadMore}
                            className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-12 py-4 rounded-full font-semibold hover:from-slate-800 hover:to-slate-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Load More Articles
                        </button>
                    )}
                </div>
            </div>
            <Footer />

            <style jsx>{`
        @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
            }
        }
        
        .animate-fade-in {
        animation: fade-in 1s ease-out;
        }
        
        .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        }
        
        .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        }
    `}</style>
        </div>
    );
};

export default UpdatesSection;
