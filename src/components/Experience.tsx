
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Briefcase, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ExperienceItem {
    id: number;
    period: string;
    role: string;
    company: string;
    description: string;
    location: string;
}

const ExperienceCard = ({ experience, index }: { experience: ExperienceItem, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="group relative p-10 md:p-14 rounded-[3.5rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col justify-between overflow-hidden"
    >
        {/* iOS style background sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

        <div className="relative z-10">
            {/* Top Bar - One UI & iOS fusion */}
            <div className="flex flex-wrap justify-between items-center mb-12 gap-6">
                <div className="flex items-center gap-3 px-5 py-2 bg-[#0071E3]/5 rounded-full border border-[#0071E3]/10">
                    <Calendar size={14} className="text-[#0071E3]" />
                    <span className="text-[11px] font-black text-[#0071E3] tracking-widest uppercase">{experience.period}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#86868B] uppercase tracking-[0.2em]">
                    <MapPin size={12} strokeWidth={2.5} />
                    {experience.location}
                </div>
            </div>

            {/* Role & Company - Typography refinement */}
            <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tighter leading-tight group-hover:text-[#0071E3] transition-colors duration-500">
                        {experience.role}
                    </h3>
                    <motion.div
                        className="w-14 h-14 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#0071E3] group-hover:text-white transition-all duration-500 shadow-sm"
                        whileHover={{ scale: 1.1, rotate: 45 }}
                    >
                        <ArrowUpRight size={24} />
                    </motion.div>
                </div>
                <p className="text-2xl font-semibold text-[#86868B] tracking-tight">{experience.company}</p>
            </div>

            {/* Description - Material Design inspired readability */}
            <div className="mt-14 pt-10 border-t border-black/[0.03]">
                <p className="text-xl md:text-2xl font-medium text-[#1D1D1F]/70 leading-[1.6] tracking-tight group-hover:text-[#1D1D1F] transition-colors duration-500">
                    {experience.description}
                </p>
            </div>
        </div>

        {/* Decorative Watermark Icon - Big Tech Aesthetic */}
        <div className="absolute -bottom-12 -right-12 p-10 opacity-[0.03] group-hover:opacity-[0.08] group-hover:-translate-y-8 group-hover:-translate-x-4 transition-all duration-[1.5s] ease-out pointer-events-none">
            <Briefcase size={280} strokeWidth={0.5} />
        </div>

    </motion.div>
);

const Experience: React.FC = () => {
    const { data } = useData();
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedItems = isExpanded ? data.experience : data.experience.slice(0, 2);

    return (
        <section id="experience" className="py-48 bg-[#FBFBFD] relative overflow-hidden px-6">
            {/* Background decorative text - One UI style */}
            <div className="absolute top-40 right-[-10vw] text-[25vw] font-black text-black/[0.01] select-none pointer-events-none italic uppercase leading-none">
                Works
            </div>

            <div className="max-w-[1400px] mx-auto px-8 relative z-10">
                <header className="mb-32">
                    <div className="max-w-4xl space-y-8">
                        <div className="flex items-center gap-4 text-[#0071E3]">
                            <div className="h-[2px] w-12 bg-[#0071E3]"></div>
                            <h2 className="text-[12px] font-black uppercase tracking-[0.6em]">02 / TENURE</h2>
                        </div>
                        <h3 className="text-7xl md:text-[7rem] font-bold tracking-tighter text-[#1D1D1F] leading-[0.85]">
                            Selected <br />
                            <span className="italic relative inline-block">
                                Experience.
                                <svg className="absolute -bottom-4 left-0 w-full h-8 text-[#0071E3]/20 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="6" />
                                </svg>
                            </span>
                        </h3>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <AnimatePresence mode="popLayout">
                        {displayedItems.map((exp, index) => (
                            <ExperienceCard key={exp.id} experience={exp} index={index} />
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-32 flex justify-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="group flex items-center gap-6 bg-[#F5F5F7] hover:bg-[#1D1D1F] px-10 py-5 rounded-full transition-all duration-1000 scale-100 active:scale-95 shadow-sm"
                    >
                        <span className="text-sm font-black text-[#1D1D1F] group-hover:text-white transition-colors duration-700 uppercase tracking-[0.3em]">
                            {isExpanded ? "Collapse Archive" : "Experience Archive"}
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

export default Experience;
