
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight, Medal, Award } from 'lucide-react';
import { useData } from '../context/DataContext';

const Accomplishments: React.FC = () => {
    const { data } = useData();
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedItems = isExpanded ? data.accomplishments : data.accomplishments.slice(0, 4);

    return (
        <section id="awards" className="py-48 bg-white relative overflow-hidden px-6">
            {/* Background Narrative - Big Tech Style */}
            <div className="absolute top-1/2 left-[-10vw] -translate-y-1/2 text-[35vw] font-black italic text-black/[0.01] pointer-events-none select-none uppercase leading-none">
                Honors
            </div>

            <div className="max-w-[1400px] mx-auto px-8 relative z-10">
                <header className="mb-32">
                    <div className="max-w-4xl space-y-8">
                        <div className="flex items-center gap-4 text-[#0071E3]">
                            <div className="h-[2px] w-12 bg-[#0071E3]"></div>
                            <h2 className="text-[12px] font-black uppercase tracking-[0.6em]">03 / RECOGNITION</h2>
                        </div>
                        <h3 className="text-7xl md:text-[7rem] font-bold tracking-tighter text-[#1D1D1F] leading-[0.85]">
                            Honors & <br />
                            <span className="italic text-gradient-blue">Credits.</span>
                        </h3>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-3 w-full">
                    <AnimatePresence mode="popLayout">
                        {displayedItems.map((acc, index) => (
                            <motion.div
                                key={acc.title}
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative"
                            >
                                <div className="px-10 py-5 md:px-14 md:py-7 rounded-[2.5rem] bg-[#FBFBFD]/60 backdrop-blur-xl border border-black/[0.02] hover:bg-white hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-700 flex flex-row items-center justify-between gap-10 overflow-hidden">

                                    <div className="flex items-center gap-10 flex-1">
                                        {/* Icon Container - iOS Style Squircles */}
                                        <div className="w-16 h-16 bg-white rounded-[1.5rem] shadow-sm border border-black/[0.03] flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#1D1D1F] group-hover:text-white transition-all duration-500 shrink-0">
                                            {index % 2 === 0 ? <Medal size={28} strokeWidth={1.2} /> : <Award size={28} strokeWidth={1.2} />}
                                        </div>

                                        {/* Content - iOS Typography Hierarchy */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-14 flex-1">
                                            <h4 className="text-3xl md:text-4xl font-black text-[#1D1D1F] tracking-tighter leading-tight group-hover:text-[#0071E3] transition-colors duration-500">
                                                {acc.title}
                                            </h4>

                                            <div className="hidden md:block w-[1px] h-4 bg-black/[0.08]"></div>

                                            <p className="text-xl font-bold text-[#86868B] italic opacity-60 tracking-tight">
                                                {acc.org}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action & Meta - iOS Control Center Vibe */}
                                    <div className="flex items-center gap-10 shrink-0">
                                        <div className="hidden sm:inline-flex flex-col items-end">
                                            <span className="text-[10px] font-black text-[#0071E3] uppercase tracking-[0.2em]">{acc.type}</span>
                                            <span className="text-[10px] font-bold text-[#86868B] tracking-widest uppercase">{acc.year}</span>
                                        </div>

                                        <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#0071E3] group-hover:text-white transition-all duration-500 shadow-sm">
                                            <ArrowUpRight size={22} strokeWidth={2.5} />
                                        </div>
                                    </div>
                                </div>

                                {/* Subtle Apple-style accent */}
                                <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-black/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-20 flex justify-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="group flex items-center gap-6 bg-[#F5F5F7] hover:bg-[#1D1D1F] px-10 py-5 rounded-full transition-all duration-1000 scale-100 active:scale-95 shadow-sm"
                    >
                        <span className="text-sm font-black text-[#1D1D1F] group-hover:text-white transition-colors duration-700 uppercase tracking-[0.3em]">
                            {isExpanded ? "Browse Less" : "Honors Archive"}
                        </span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${isExpanded ? 'bg-white/10 text-white rotate-180' : 'bg-white text-black shadow-sm group-hover:rotate-90'}`}>
                            <Plus size={20} strokeWidth={3} />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Accomplishments;
