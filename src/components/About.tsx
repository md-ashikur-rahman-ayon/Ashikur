
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Microscope } from 'lucide-react';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
    const { data } = useData();
    const aboutData = data.about;

    return (
        <section id="about" className="relative py-48 bg-white overflow-hidden px-6">
            {/* Background Texture - One UI style */}
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none select-none overflow-hidden">
                <div className="absolute top-1/2 left-[-10vw] -translate-y-1/2 text-[40vw] font-black italic uppercase leading-none text-black">
                    Intro
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                    {/* Visual Canvas - iOS Glass Aesthetic */}
                    <div className="lg:col-span-6 relative group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full aspect-[4/5] bg-gradient-to-br from-[#FBFBFD] to-[#F2F2F7] rounded-[4rem] overflow-hidden border border-black/5 flex items-center justify-center p-12 relative shadow-[0_40px_100px_rgba(0,0,0,0.04)] hover:shadow-[0_60px_120px_rgba(0,0,0,0.08)] transition-all duration-1000"
                        >
                            <div className="absolute inset-0 bg-mesh opacity-20"></div>
                            <div className="w-full h-full rounded-[3rem] overflow-hidden relative z-10 transition-all duration-1000">
                                {aboutData.image ? (
                                    <img
                                        src={aboutData.image}
                                        alt="About"
                                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full border border-dashed border-black/10 rounded-[3rem] flex flex-col items-center justify-center gap-8 italic text-[#86868B]/40 text-xl font-medium">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: [-5, 5, 0] }}
                                            className="text-[#1D1D1F] opacity-100"
                                        >
                                            <Microscope size={80} strokeWidth={0.8} className="text-[#0071E3]/40" />
                                        </motion.div>
                                        <span className="tracking-[0.4em] font-sans font-black text-[10px] uppercase text-[#1D1D1F]/60">Identity Synthesis</span>
                                    </div>
                                )}

                                <div className="absolute bottom-12 left-12 p-8 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-xl group-hover:-translate-y-4 group-hover:translate-x-4 transition-all duration-700">
                                    <ShieldCheck className="text-[#0071E3]" size={40} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Dynamic Status Tag - Repositioned & Compact */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="absolute -bottom-10 -right-10 bg-[#1D1D1F] text-white p-10 rounded-[4rem] shadow-[0_48px_80px_rgba(0,0,0,0.2)] max-w-xs group-hover:scale-105 transition-all duration-1000 border border-white/10 z-20"
                        >
                            <Sparkles className="text-[#0071E3] mb-4 animate-pulse" size={24} />
                            <p className="text-xl font-black italic leading-tight tracking-tight">{aboutData.status}</p>
                        </motion.div>
                    </div>

                    {/* Content Architecture - Typography Focus */}
                    <div className="lg:col-span-6 space-y-20">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-[#0071E3]">
                                <div className="h-[2px] w-12 bg-[#0071E3]"></div>
                                <h2 className="text-[12px] font-black uppercase tracking-[0.6em]">01 / THE MISSION</h2>
                            </div>
                            <h3 className="text-7xl md:text-[7rem] font-bold tracking-tighter text-[#1D1D1F] leading-[0.82]">
                                Driven by <br />
                                <span className="text-[#0071E3] italic">Intentional</span> <br />
                                {aboutData.mission}
                            </h3>
                        </div>

                        <div className="space-y-12">
                            <p className="text-3xl md:text-4xl font-bold text-[#1D1D1F] leading-[1.1] tracking-tighter">
                                {aboutData.bio}
                            </p>
                            <div className="h-[1px] w-32 bg-black/[0.08]"></div>
                            <p className="text-2xl font-medium text-[#86868B] leading-relaxed max-w-xl tracking-tight">
                                {aboutData.subBio}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
