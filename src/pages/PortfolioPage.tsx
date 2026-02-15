
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, X, Search, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import CustomCursor from '../components/CustomCursor';
import { useData } from '../context/DataContext';

const PortfolioPage: React.FC = () => {
    const { data } = useData();
    const allProjects = data.portfolio;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <CustomCursor />

            <main className="pt-48 pb-32 px-6">
                <div className="max-w-[1400px] mx-auto px-8">
                    {/* Back Navigation */}
                    <div className="mb-20">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-4 text-[#0071E3] font-bold text-sm uppercase tracking-[0.3em] hover:opacity-70 transition-all"
                        >
                            <div className="w-10 h-10 rounded-full border border-[#0071E3]/20 flex items-center justify-center group-hover:-translate-x-2 transition-transform">
                                <ArrowLeft size={18} />
                            </div>
                            Back to Studio
                        </Link>
                    </div>

                    {/* Editorial Header */}
                    <header className="mb-40 relative text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15vw] font-black italic text-black/[0.01] pointer-events-none select-none uppercase leading-none -translate-y-1/2">
                            Archive
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-10 relative z-10"
                        >
                            <div className="flex items-center justify-center gap-4 text-[#0071E3]">
                                <div className="h-[2px] w-12 bg-[#0071E3]"></div>
                                <span className="text-[12px] font-black uppercase tracking-[0.6em]">Portfolio Exhibit</span>
                                <div className="h-[2px] w-12 bg-[#0071E3]"></div>
                            </div>
                            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-[0.8] text-[#1D1D1F]">
                                Graphic <br />
                                <span className="italic text-[#86868B]">Archive.</span>
                            </h1>
                        </motion.div>
                    </header>

                    {/* Grid Layout - Standardized Refined Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {allProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                onClick={() => project.image && setSelectedImage(project.image)}
                                className="group relative h-[600px] rounded-[3.5rem] border border-black/[0.05] overflow-hidden bg-white cursor-zoom-in transition-all duration-1000 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] hover:-translate-y-4"
                            >
                                {/* Background Asset */}
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

                                {/* Content Architecture */}
                                <div className="relative z-10 h-full p-10 flex flex-col pointer-events-none">
                                    {/* Header - Metadata */}
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

                                    {/* Bottom - Smaller Downward Title */}
                                    <div className="space-y-6 pt-10">
                                        <div className="space-y-2">
                                            <h4 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-2xl">
                                                {project.title}
                                            </h4>
                                            <div className="w-10 h-1 bg-[#0071E3] rounded-full"></div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-2 pointer-events-auto">
                                            {project.tech.map((t, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-4 py-1.5 bg-black/30 backdrop-blur-3xl rounded-lg border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/80 transition-all hover:bg-[#0071E3]"
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
            </main>

            <Contact />

            {/* Modal Exhibit */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-16 cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-all z-10"
                        >
                            <X size={40} />
                        </motion.button>

                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Master Asset View"
                            className="max-w-full max-h-full object-contain rounded-[3rem] shadow-2xl border border-white/10"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PortfolioPage;
