
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero: React.FC = () => {
    const { data } = useData();
    const heroData = data.hero;
    const [displayText, setDisplayText] = useState("");
    const name = heroData.lastName;
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    useEffect(() => {
        let i = 0;
        setDisplayText("");
        const timer = setInterval(() => {
            if (i < name.length) {
                setDisplayText(name.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 150);
        return () => clearInterval(timer);
    }, [name]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.2, ease: "easeOut" }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, x: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
        }
    };

    return (
        <section id="home" className="relative min-h-screen bg-mesh overflow-hidden flex flex-col justify-center px-6 pt-52 pb-20">
            {/* Massive Parallax Background Text */}
            <motion.div
                style={{ y: y1, opacity: 0.02 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none z-0"
            >
                <h1 className="text-[32vw] font-bold tracking-tighter leading-none italic uppercase">{heroData.firstName}</h1>
            </motion.div>

            <div className="max-w-[1400px] mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">

                {/* Left Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-7 flex flex-col"
                >
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-4 text-[#0071E3] mb-8"
                    >
                        <div className="h-[2px] w-12 bg-[#0071E3]"></div>
                        <span className="text-2xl md:text-3xl font-bold tracking-tight italic">{heroData.greeting}</span>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h1 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-bold leading-[0.82] tracking-tighter text-[#1D1D1F] drop-shadow-2xl">
                            {heroData.firstName} <br />
                            <span className="text-gradient-blue italic pl-[3vw] relative inline-block">
                                {displayText}
                                <span className="animate-blink text-[#1D1D1F] ml-1 font-normal opacity-40">|</span>
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div variants={itemVariants} className="max-w-4xl mt-12">
                        <p className="text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1F]">
                            {heroData.description}
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mt-20">
                        <a href="#portfolio" className="group bg-[#1D1D1F] text-white px-14 py-6 rounded-full font-bold text-xl hover:bg-[#0071E3] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 elevation-2 shadow-black/10 flex items-center gap-4">
                            View Portfolio
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                <ArrowDown size={18} className="-rotate-90" />
                            </div>
                        </a>
                        <a href="#contact" className="px-14 py-6 rounded-full font-bold text-xl border border-black/10 text-black hover:bg-black/5 active:scale-[0.98] transition-all duration-500 flex items-center gap-3">
                            Let's Talk
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Profile Card - High-End Widget Style */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-5 hidden lg:flex justify-center"
                >
                    <div className="relative group max-w-[420px] w-full">
                        {/* Hover Glow Effect */}
                        <div className="absolute -inset-10 bg-gradient-to-tr from-[#0071E3]/20 to-indigo-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        {/* Main Identity Card */}
                        <div className="relative z-10 glass rounded-[4rem] border border-white/60 overflow-hidden elevation-3 transition-all duration-1000 group-hover:-translate-y-4">
                            {/* Photo Section - Reduced Height Aspect */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#FBFBFD] border-b border-black/[0.03]">
                                <img
                                    src={heroData.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&h=600&fit=crop"}
                                    alt={`${heroData.firstName} ${heroData.lastName}`}
                                    className="w-full h-full object-cover object-top scale-[1.05] group-hover:scale-110 transition-transform duration-[2s] grayscale-[0.3] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"></div>

                                {/* Status Chip Overlay */}
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-2xl px-5 py-2.5 rounded-full border border-white/50 flex items-center gap-2.5 elevation-1">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                    <span className="text-[10px] font-black tracking-[0.2em] text-[#1D1D1F] uppercase">Active</span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="px-10 py-8 bg-white/30 backdrop-blur-3xl">
                                <div className="space-y-4 mb-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/20">
                                        <Zap size={12} fill="currentColor" />
                                        <span className="text-[9px] font-black tracking-widest uppercase">Executive</span>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-3xl font-bold tracking-tighter text-[#1D1D1F] leading-tight">Co-founder & <br /> Head of Product</h4>
                                        <p className="text-xl font-bold text-[#0071E3] tracking-tighter italic opacity-80">Raredev INC.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            <div className="absolute right-12 bottom-0 h-[80%] hidden lg:flex flex-col items-center justify-end pb-12 gap-8 text-[#86868B]/40">
                <div className="rotate-90 origin-right translate-x-12 mb-20 whitespace-nowrap">
                    <span className="text-[10px] font-bold tracking-[1em] uppercase">{heroData.roles[0] || "SYSTEM ARCHITECT"}</span>
                </div>
                <div className="w-[1px] h-32 bg-black/5"></div>
                <div className="flex flex-col items-center gap-6">
                    <div className="w-12 h-12 rounded-full border border-black/[0.05] flex items-center justify-center text-[#0071E3] glass elevation-1">
                        <ArrowDown size={20} className="animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
