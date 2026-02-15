
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Github, ExternalLink, X, Search, Calendar, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';

const Portfolio: React.FC = () => {
    const { data } = useData();
    const projects = data.portfolio.slice(0, 3);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="portfolio" className="relative py-48 bg-white overflow-hidden px-6">
            <div className="max-w-[1400px] mx-auto px-8 relative z-10">
                <header className="mb-32">
                    <div className="w-full space-y-10">
                        <div className="flex items-center gap-4 text-[#0071E3]">
                            <div className="h-[2px] w-12 bg-[#0071E3]"></div>
                            <h2 className="text-[12px] font-black uppercase tracking-[0.6em]">04 / PORTFOLIO</h2>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12">
                            <h3 className="text-7xl md:text-[8rem] font-bold tracking-tighter text-[#1D1D1F] leading-[0.8] italic">
                                Visual <br />
                                <span className="not-italic text-[#86868B]">Identity.</span>
                            </h3>

                            <div className="flex justify-end lg:mb-6">
                                <Link to="/portfolio">
                                    <button
                                        className="group flex items-center gap-6 bg-[#F5F5F7] hover:bg-[#1D1D1F] px-10 py-5 rounded-full transition-all duration-1000 scale-100 active:scale-95 shadow-sm"
                                    >
                                        <span className="text-sm font-black text-[#1D1D1F] group-hover:text-white transition-colors duration-700 uppercase tracking-[0.3em]">
                                            Expand Archive
                                        </span>
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1D1D1F] shadow-sm group-hover:rotate-90 transition-all duration-700">
                                            <Plus size={20} strokeWidth={3} />
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => project.image && setSelectedImage(project.image)}
                            className="group relative h-[600px] rounded-[3.5rem] border border-black/[0.05] overflow-hidden bg-white cursor-zoom-in transition-all duration-1000 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] hover:-translate-y-4"
                        >
                            {/* Project Asset */}
                            <div className="absolute inset-0 z-0">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out opacity-80 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#F5F5F7]"></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 pointer-events-none"></div>
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/60 blur-3xl pointer-events-none"></div>
                                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Content Layout - Adjusted for smaller, downward title */}
                            <div className="relative z-10 h-full p-10 flex flex-col pointer-events-none">

                                {/* Top Badges */}
                                <div className="flex justify-between items-start mb-auto pointer-events-auto">
                                    <div className="flex gap-2">
                                        <div className="px-4 py-2 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 shadow-xl">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">{project.category}</span>
                                        </div>
                                        <div className="px-4 py-2 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 shadow-xl">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">{project.year}</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <Search size={16} />
                                    </div>
                                </div>

                                {/* Bottom Info - Refined & Compressed */}
                                <div className="space-y-6 pt-10">
                                    <div className="space-y-2">
                                        <h4 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-2xl">
                                            {project.title}
                                        </h4>
                                        <div className="w-10 h-1 bg-[#0071E3] rounded-full"></div>
                                    </div>
                                    <p className="text-white/70 text-sm font-medium leading-relaxed max-w-[280px] drop-shadow-md line-clamp-2">
                                        {project.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2 pointer-events-auto">
                                        {project.tech.map((t, idx) => (
                                            <span
                                                key={idx}
                                                className="px-4 py-1.5 bg-black/30 backdrop-blur-3xl rounded-lg border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/80"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Exhibit */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-all"
                        >
                            <X size={32} />
                        </motion.button>

                        <motion.img
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            src={selectedImage}
                            alt="Full Asset Display"
                            className="max-w-full max-h-full object-contain rounded-[2.5rem] shadow-2xl border border-white/10"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
