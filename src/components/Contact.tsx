
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 md:py-48 bg-[#FBFBFD] relative overflow-hidden px-6">
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[#0071E3]/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-[1400px] mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-20 items-start">

                    {/* Meta Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="lg:col-span-5 space-y-20"
                    >
                        <div className="space-y-10">
                            <div className="flex items-center gap-4 text-[#0071E3]">
                                <div className="h-[2px] w-12 bg-[#0071E3]"></div>
                                <h2 className="text-[12px] font-black uppercase tracking-[0.6em]">05 / THE CONNECTION</h2>
                            </div>
                            <div className="space-y-10">
                                <h3 className="text-7xl md:text-[7rem] font-bold tracking-tighter text-[#1D1D1F] leading-[0.85] italic">
                                    Let's <br /> <span className="text-[#86868B] not-italic">Sync.</span>
                                </h3>
                                <p className="text-xl md:text-2xl text-[#86868B] font-medium max-w-md leading-relaxed">
                                    Envisioning future-ready architectures and bespoke digital narratives.
                                </p>
                            </div>
                        </div>


                        <div className="flex flex-wrap gap-4 pt-6">
                            {[
                                { Icon: Github, name: "GitHub" },
                                { Icon: Linkedin, name: "LinkedIn" },
                                { Icon: Twitter, name: "Threads" },
                                { Icon: Instagram, name: "Instagram" }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-black/[0.04] text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-all shadow-sm"
                                    title={social.name}
                                >
                                    <social.Icon size={20} strokeWidth={2} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Interaction Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-black/[0.03] shadow-[0_40px_100px_rgba(0,0,0,0.03)] relative z-10">
                            <form className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#86868B] ml-1">Service Details</label>
                                        <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-black/10 py-5 px-1 text-2xl font-bold text-[#1D1D1F] focus:border-[#0071E3] outline-none transition-all placeholder:text-[#1D1D1F]/5" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#86868B] ml-1">Digital Identity</label>
                                        <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-black/10 py-5 px-1 text-2xl font-bold text-[#1D1D1F] focus:border-[#0071E3] outline-none transition-all placeholder:text-[#1D1D1F]/5" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#86868B] ml-1">Narrative</label>
                                    <textarea rows={4} placeholder="Your vision or project details..." className="w-full bg-transparent border-b border-black/10 py-5 px-1 text-2xl font-bold text-[#1D1D1F] focus:border-[#0071E3] outline-none transition-all placeholder:text-[#1D1D1F]/5 resize-none"></textarea>
                                </div>
                                <button className="group w-full bg-[#1D1D1F] text-white py-8 rounded-[2.5rem] text-xl font-bold hover:bg-[#0071E3] transition-all duration-500 flex items-center justify-center gap-4 shadow-xl active:scale-[0.98]">
                                    Transmit Message <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* Modular Footer */}
                <footer className="mt-48 pt-20 border-t border-black/5">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16">
                        <div className="space-y-6">
                            <Link to="/" className="text-3xl font-extrabold tracking-tighter italic">
                                ASHIK <span className="animate-blink font-serif font-normal text-[#0071E3]">&lt;/&gt;</span>
                            </Link>
                            <p className="text-xs font-bold text-[#86868B] uppercase tracking-[0.4em]">Student Entrepreneur — Bangladesh</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
                            <div className="space-y-6">
                                <p className="text-[10px] font-bold text-[#1D1D1F] uppercase tracking-widest">Navigation</p>
                                <div className="flex flex-col gap-4 text-sm font-bold text-[#86868B] uppercase tracking-widest">
                                    <a href="#about" className="hover:text-[#0071E3]">Research</a>
                                    <a href="/portfolio" className="hover:text-[#0071E3]">Works</a>
                                    <a href="/admin" className="hover:text-[#1D1D1F]">Studio Admin</a>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <p className="text-[10px] font-bold text-[#1D1D1F] uppercase tracking-widest">Legal</p>
                                <div className="flex flex-col gap-4 text-sm font-bold text-[#86868B] uppercase tracking-widest">
                                    <span className="opacity-50">Privacy</span>
                                    <span className="opacity-50">Cookies</span>
                                    <span className="opacity-50">© 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 pt-10 border-t border-black/5 flex justify-between items-center text-[9px] font-bold text-[#86868B] uppercase tracking-[0.5em]">
                        <span>Handcrafted with Precision</span>
                        <span>Bangladesh Studio</span>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
