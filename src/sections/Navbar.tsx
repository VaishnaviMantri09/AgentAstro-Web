'use client';
import logo from "@/../public/logo-text-blue.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const MenuIcon = ({ className }: { className?: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleNavigation = (path: string) => {
        router.push(path);
        closeMobileMenu();
    };

    const isActive = (path: string) => {
        if (path.startsWith('#')) {
            return false;
        }
        return pathname === path;
    };

    return (
        <>
            <header>
                <div className="py-2 px-6 relative">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <Image
                                    src={logo}
                                    alt="AGENTASTRO.AI Logo"
                                    width={800}
                                    height={200}
                                    unoptimized
                                    priority
                                    className="h-16 w-auto object-contain scale-150 hover:scale-160 transition-transform origin-center"
                                />
                            </Link>
                        </div>

                        <nav className="hidden md:flex items-center space-x-8 font-gesta">
                            <button
                                onClick={() => handleNavigation('/features')}
                                className={`relative font-bold text-black hover:text-[#061A40] transition-colors pb-0.2 text-xl ${isActive('/features') ? 'text-gray-900' : ''
                                    }`}
                            >
                                Features
                                {isActive('/features') && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                                )}
                            </button>
                            <button
                                onClick={() => handleNavigation('/pricing')}
                                className={`relative font-bold text-black hover:text-[#061A40] transition-colors pb-0.2 text-xl ${isActive('/pricing') ? 'text-gray-900' : ''
                                    }`}
                            >
                                Pricing
                                {isActive('/pricing') && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                                )}
                            </button>
                            <button
                                onClick={() => handleNavigation('/updates')}
                                className={`relative font-bold text-black hover:text-[#061A40] transition-colors pb-0.2 text-xl ${isActive('/updates') ? 'text-gray-900' : ''
                                    }`}
                            >
                                Updates
                                {isActive('/updates') && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                                )}
                            </button>
                            <button
                                onClick={() => handleNavigation('/story')}
                                className={`relative font-bold text-black hover:text-black-900 transition-colors pb-0.2 text-xl ${isActive('/story') ? 'text-gray-900' : ''
                                    }`}
                            >
                                Our Story
                                {isActive('/story') && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                                )}
                            </button>
                        </nav>

                        <div className="hidden md:flex items-center font-gesta">
                            <Link href="/started">
                                <button className="text-lg bg-black text-white px-6 py-2 rounded-lg transition-colors">
                                    Get Started
                                </button>
                            </Link>
                        </div>

                        <div className="block md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 block"
                                aria-label="Toggle mobile menu"
                            >
                                <MenuIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {isMobileMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 font-gesta">
                            <div className="flex justify-end p-4">
                                <button
                                    onClick={closeMobileMenu}
                                    className="text-gray-500 hover:text-gray-700 p-1"
                                    aria-label="Close mobile menu"
                                >
                                    <CloseIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <nav className="px-6 pb-4 space-y-4">
                                <button
                                    onClick={() => handleNavigation('/features')}
                                    className={`block py-2 transition-colors w-full text-left text-xl ${isActive('/features')
                                        ? 'text-[#061A40] font-medium border-l-2 border-black pl-3'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Features
                                </button>
                                <button
                                    onClick={() => handleNavigation('/pricing')}
                                    className={`block py-2 transition-colors w-full text-left text-xl ${isActive('/pricing')
                                        ? 'text-[#061A40] font-medium border-l-2 border-black pl-3'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Pricing
                                </button>
                                <button
                                    onClick={() => handleNavigation('/updates')}
                                    className={`block py-2 transition-colors w-full text-left text-xl ${isActive('/updates')
                                        ? 'text-[#061A40] font-medium border-l-2 border-black pl-3'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Updates
                                </button>
                                <button
                                    onClick={() => handleNavigation('/story')}
                                    className={`block py-2 transition-colors w-full text-left text-xl ${isActive('/story')
                                        ? 'text-[#061A40] font-medium border-l-2 border-black pl-3'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Our Story
                                </button>
                                <Link href="/started">
                                    <button className="text-xl w-full bg-black text-white px-6 py-3 rounded-lg transition-colors mt-4">
                                        Get Started
                                    </button>
                                </Link>
                            </nav>
                        </div>
                    )}
                </div>
            </header >
        </>
    );
};