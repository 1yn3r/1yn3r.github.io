
import React, { useState } from 'react';
import { useScrambleText } from '../hooks/useScrambleText';

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { text: brandText, scramble: scrambleBrand, reset: resetBrand } = useScrambleText("1YN3R");
    const navLinks = [
        { href: "#home", label: "home" },
        { href: "#about", label: "about" },
        { href: "/CV.pdf", label: "download cv", isExternal: true },
        { href: "#highlights", label: "highlights" },
        { href: "#timeline", label: "timeline" },
        { href: "#certifications", label: "certs" },
        { href: "#skills", label: "skills" },
        { href: "#arsenal", label: "arsenal" },
        { href: "#projects", label: "cases" },
        { href: "#ctfs", label: "ctfs" },
        { href: "#analyzer", label: "analyzer" },
        { href: "#contact", label: "contact" }
    ];

    return (
        <header className="sticky top-0 z-40 bg-[#0d0d0d]/80 backdrop-blur-sm border-b border-green-500/20">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#home" className="text-2xl font-bold font-mono text-white tracking-wider" onMouseEnter={scrambleBrand} onMouseLeave={resetBrand}>
                    <span className="text-green-400 terminal-glow">$</span> {brandText}
                </a>
                <ul className="hidden md:flex items-center space-x-8 font-mono text-sm">
                    {navLinks.map(link => 
                        <li key={link.href}>
                            <a href={link.href} 
                               className="text-gray-300 hover:text-white transition-colors duration-300"
                               {...(link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                                [ {link.label} ]
                            </a>
                        </li>
                    )}
                </ul>
                <button onClick={() => setMobileMenuOpen(p => !p)} className="md:hidden text-white" aria-label="Open menu">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </nav>
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-black/90 font-mono`}>
                <ul className="flex flex-col items-center space-y-4 py-4">
                    {navLinks.map(link => 
                        <li key={link.href}>
                            <a href={link.href} 
                               onClick={() => setMobileMenuOpen(false)} 
                               className="text-gray-300 hover:text-white"
                               {...(link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                                [ {link.label} ]
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};
