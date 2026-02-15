
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Section tracking logic
            const sections = ['home', 'about', 'experience'];
            const current = sections.find(section => {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (current) {
                const nameMap: { [key: string]: string } = {
                    'home': 'Home',
                    'about': 'About',
                    'experience': 'Work'
                };
                setActiveSection(nameMap[current]);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Set portfolio as active if on portfolio page
    useEffect(() => {
        if (location.pathname === '/portfolio') {
            setActiveSection('Portfolio');
        }
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', href: '/#home' },
        { name: 'About', href: '/#about' },
        { name: 'Work', href: '/#experience' },
        { name: 'Portfolio', href: '/portfolio' },
    ];

    return (
        <nav className={`fixed w-full z-[100] top-0 left-0 transition-all duration-700 px-6 ${scrolled ? 'py-4' : 'py-8'}`}>
            <div className={`max-w-[1400px] mx-auto flex items-center justify-between px-8 py-4 rounded-[2rem] transition-all duration-700 ${scrolled ? 'glass elevation-2 shadow-black/5' : 'bg-transparent border-transparent'}`}>

                {/* Brand Identity - Mac Style */}
                <Link to="/" className="text-2xl font-extrabold tracking-tighter text-[#1D1D1F] flex items-center gap-2 italic">
                    ASHIK <span className="animate-blink font-serif font-normal text-[#0071E3] ml-1">&lt;/&gt;</span>
                </Link>

                {/* Desktop Menu - iOS Style Segments */}
                <div className="hidden md:flex items-center gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.02] relative">
                    <LayoutGroup>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setActiveSection(link.name)}
                                className={`relative px-6 py-2 rounded-full text-[11px] font-bold transition-all duration-500 uppercase tracking-widest z-10 ${activeSection === link.name ? 'text-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F]'
                                    }`}
                            >
                                {activeSection === link.name && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-[-1]"
                                        transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                                    />
                                )}
                                {link.name}
                            </a>
                        ))}
                    </LayoutGroup>
                </div>

                {/* CTA - Apple Silicon Style Button */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="#contact"
                        className="group flex items-center gap-2 bg-[#1D1D1F] text-white px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#0071E3] hover:scale-105 active:scale-95 transition-all shadow-lg"
                    >
                        Inquire <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-500" />
                    </a>
                </div>

                {/* Mobile Menu Trigger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden w-12 h-12 flex items-center justify-center text-[#1D1D1F] bg-black/5 rounded-full hover:bg-black/10 transition-colors"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu Overlay - Google/Material Design style */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="fixed inset-0 bg-white/80 z-[90] flex flex-col items-center justify-center p-10"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center gap-8"
                        >
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setActiveSection(link.name);
                                    }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`text-5xl font-black tracking-tighter italic transition-all ${activeSection === link.name ? 'text-[#0071E3]' : 'text-[#1D1D1F] hover:text-[#0071E3]'
                                        }`}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="group flex items-center gap-4 text-3xl font-bold text-[#0071E3]"
                            >
                                Let's Talk <ArrowUpRight size={32} />
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
