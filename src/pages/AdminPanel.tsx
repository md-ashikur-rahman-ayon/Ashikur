import React, { useState } from 'react';
import { LayoutDashboard, FileText, User, Award, Settings, Save, LogOut, Plus, Trash2, Image as ImageIcon, Briefcase, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import { useData } from '../context/DataContext';

const AdminPanel: React.FC = () => {
    const { data, updateData, resetData } = useData();
    const [activeTab, setActiveTab] = useState('Hero');
    const [localData, setLocalData] = useState(data);

    const categories = [
        { name: 'Hero', icon: User },
        { name: 'About', icon: FileText },
        { name: 'Experience', icon: Briefcase },
        { name: 'Awards', icon: Award },
        { name: 'Portfolio', icon: LayoutDashboard },
        { name: 'Settings', icon: Settings }
    ];

    const handleSave = async () => {
        try {
            await updateData(localData);
            alert('Studio synced successfully! Your changes are now live.');
        } catch (error: any) {
            if (error.message === 'QUOTA_EXCEEDED') {
                alert('🔴 SYNC FAILED: These photos are too high-resolution for even the advanced storage. \n\nPlease try slightly smaller files or fewer massive images.');
            } else {
                alert('An unexpected error occurred while syncing.');
            }
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
        const file = e.target.files?.[0];
        const inputElement = e.target;
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Pro-Grade Scaling: Max 2560px (Ultra HD)
                // This preserves 4K-level detail while avoiding browser crashes
                const MAX_SIZE = 2560;
                if (width > height) {
                    if (width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    }
                } else {
                    if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                // Cinematic Quality Compression (0.9 is nearly perfect fidelity)
                const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.9);
                callback(optimizedBase64);
                inputElement.value = '';
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const updateHero = (field: string, value: any) => {
        setLocalData({
            ...localData,
            hero: { ...localData.hero, [field]: value }
        });
    };

    const updateAbout = (field: string, value: any) => {
        setLocalData({
            ...localData,
            about: { ...localData.about, [field]: value }
        });
    };

    const addListItem = (type: 'experience' | 'portfolio' | 'accomplishments') => {
        if (type === 'experience') {
            const newItem = { id: Date.now(), company: 'New Company', role: 'Role', period: '2024', location: 'Location', description: 'Description' };
            setLocalData({ ...localData, experience: [newItem, ...localData.experience] });
        } else if (type === 'portfolio') {
            const newItem = { id: Date.now(), title: 'New Project', category: 'Category', year: '2024', tech: ['Tech'], bg: 'bg-white', desc: 'Description' };
            setLocalData({ ...localData, portfolio: [newItem, ...localData.portfolio] });
        } else if (type === 'accomplishments') {
            const newItem = { title: 'New Award', year: '2024', org: 'Organization', type: 'Major' };
            setLocalData({ ...localData, accomplishments: [newItem, ...localData.accomplishments] });
        }
    };

    const removeListItem = (type: 'experience' | 'portfolio' | 'accomplishments', index: number) => {
        const newList = [...(localData[type] as any)];
        newList.splice(index, 1);
        setLocalData({ ...localData, [type]: newList });
    };

    return (
        <div className="min-h-screen bg-white text-[#1D1D1F] flex font-sans">
            <CustomCursor />
            {/* Sidebar */}
            <aside className="w-80 border-r border-[#E5E7EB] bg-[#FBFBFD] p-10 flex flex-col justify-between fixed h-full overflow-y-auto">
                <div>
                    <div className="text-3xl font-extrabold mb-20 italic tracking-tighter text-[#1D1D1F]">
                        STUDIO <span className="text-[#0071E3]">ADMIN</span>
                    </div>
                    <nav className="space-y-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveTab(cat.name)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-bold transition-all ${activeTab === cat.name
                                    ? 'bg-[#0071E3] text-white shadow-lg'
                                    : 'text-[#86868B] hover:bg-neutral-100 hover:text-[#1D1D1F]'
                                    }`}
                            >
                                <cat.icon size={22} /> {cat.name}
                            </button>
                        ))}
                    </nav>
                </div>

                <Link to="/" className="flex items-center gap-4 text-[#86868B] hover:text-[#0071E3] transition-colors text-lg font-bold mt-10">
                    <LogOut /> Back to Site
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-80 p-20">
                <header className="flex justify-between items-center mb-20">
                    <div className="space-y-2">
                        <p className="text-sm font-bold uppercase tracking-widest text-[#0071E3]">Architecture Control</p>
                        <h1 className="text-6xl font-bold tracking-tighter">Edit {activeTab}</h1>
                    </div>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-10 py-4 bg-[#1D1D1F] text-white rounded-full font-bold text-lg hover:bg-[#0071E3] transition-all shadow-xl hover:scale-105 active:scale-95"
                    >
                        <Save size={24} /> Sync Changes
                    </button>
                </header>

                <div className="max-w-5xl space-y-16">
                    {activeTab === 'Hero' && (
                        <div className="space-y-12 bg-[#FBFBFD] p-12 rounded-[3.5rem] border border-black/[0.02]">
                            {/* Hero Photo Upload */}
                            <div className="flex items-center gap-12 mb-12">
                                <div className="relative group w-48 h-48 rounded-[3rem] overflow-hidden border-2 border-dashed border-black/10 hover:border-[#0071E3] transition-all bg-white shadow-sm">
                                    {localData.hero.image ? (
                                        <>
                                            <img src={localData.hero.image} alt="Hero" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => updateHero('image', undefined)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            >
                                                <Plus size={12} className="rotate-45" />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white"><Camera size={40} className="text-[#86868B]" /></div>
                                    )}
                                    <label
                                        htmlFor="hero-photo-upload"
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity z-20"
                                    >
                                        <span className="text-xs font-black text-white uppercase tracking-widest">Replace Photo</span>
                                    </label>
                                    <input
                                        id="hero-photo-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, (base64) => updateHero('image', base64))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">Hero Identity Photo</h3>
                                    <p className="text-[#86868B] font-medium max-w-xs leading-relaxed">This portrait will represent you in the main Hero card across the site.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#86868B]">Greeting</label>
                                    <input
                                        type="text"
                                        value={localData.hero.greeting}
                                        onChange={(e) => updateHero('greeting', e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-black/5 py-4 text-2xl font-bold focus:border-[#0071E3] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#86868B]">First Name</label>
                                    <input
                                        type="text"
                                        value={localData.hero.firstName}
                                        onChange={(e) => updateHero('firstName', e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-black/5 py-4 text-2xl font-bold focus:border-[#0071E3] outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#86868B]">Last Name (Typing Effect)</label>
                                    <input
                                        type="text"
                                        value={localData.hero.lastName}
                                        onChange={(e) => updateHero('lastName', e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-black/5 py-4 text-2xl font-bold focus:border-[#0071E3] outline-none transition-all italic"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#86868B]">Tagline / Description</label>
                                    <textarea
                                        rows={3}
                                        value={localData.hero.description}
                                        onChange={(e) => updateHero('description', e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-black/5 py-4 text-2xl font-bold focus:border-[#0071E3] outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'About' && (
                        <div className="space-y-12 bg-[#FBFBFD] p-12 rounded-[3.5rem] border border-black/[0.02]">
                            {/* About Photo Upload */}
                            <div className="flex items-center gap-12 mb-12">
                                <div className="relative group w-48 h-48 rounded-[3rem] overflow-hidden border-2 border-dashed border-black/10 hover:border-[#0071E3] transition-all bg-white shadow-sm">
                                    {localData.about.image ? (
                                        <>
                                            <img src={localData.about.image} alt="About" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => updateAbout('image', undefined)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            >
                                                <Plus size={12} className="rotate-45" />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white"><ImageIcon size={40} className="text-[#86868B]" /></div>
                                    )}
                                    <label
                                        htmlFor="about-photo-upload"
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity z-20"
                                    >
                                        <span className="text-xs font-black text-white uppercase tracking-widest">Replace Photo</span>
                                    </label>
                                    <input
                                        id="about-photo-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, (base64) => updateAbout('image', base64))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">About Section Photo</h3>
                                    <p className="text-[#86868B] font-medium max-w-xs leading-relaxed">This image will appear in your 'About' section, adding a visual touch to your bio.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#86868B]">Status Tag</label>
                                <input
                                    type="text"
                                    value={localData.about.status}
                                    onChange={(e) => updateAbout('status', e.target.value)}
                                    className="w-full bg-transparent border-b-2 border-black/5 py-4 text-2xl font-bold focus:border-[#0071E3] outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#86868B]">Mission Statement</label>
                                <input
                                    type="text"
                                    value={localData.about.mission}
                                    onChange={(e) => updateAbout('mission', e.target.value)}
                                    className="w-full bg-transparent border-b-2 border-black/5 py-4 text-4xl font-bold focus:border-[#0071E3] outline-none transition-all italic"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#86868B]">Core Bio</label>
                                <textarea
                                    rows={4}
                                    value={localData.about.bio}
                                    onChange={(e) => updateAbout('bio', e.target.value)}
                                    className="w-full bg-white p-8 rounded-[2rem] border border-black/5 text-xl font-bold focus:border-[#0071E3] outline-none transition-all resize-none shadow-sm"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#86868B]">Detailed Context</label>
                                <textarea
                                    rows={4}
                                    value={localData.about.subBio}
                                    onChange={(e) => updateAbout('subBio', e.target.value)}
                                    className="w-full bg-white p-8 rounded-[2rem] border border-black/5 text-xl font-medium text-[#86868B] focus:border-[#0071E3] outline-none transition-all resize-none shadow-sm"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'Experience' && (
                        <div className="space-y-8">
                            <button
                                onClick={() => addListItem('experience')}
                                className="w-full py-6 border-2 border-dashed border-[#E5E7EB] rounded-[2.5rem] flex items-center justify-center gap-3 text-[#86868B] font-bold hover:border-[#0071E3] hover:text-[#0071E3] transition-all bg-[#FBFBFD]"
                            >
                                <Plus size={20} /> Add Professional Milestone
                            </button>
                            {localData.experience.map((exp, idx) => (
                                <div key={exp.id} className="bg-[#FBFBFD] p-10 rounded-[3rem] border border-black/[0.02] space-y-8 relative group">
                                    <button
                                        onClick={() => removeListItem('experience', idx)}
                                        className="absolute top-8 right-8 text-[#86868B] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-[#86868B]">Role</label>
                                            <input
                                                type="text"
                                                value={exp.role}
                                                onChange={(e) => {
                                                    const newList = [...localData.experience];
                                                    newList[idx].role = e.target.value;
                                                    setLocalData({ ...localData, experience: newList });
                                                }}
                                                className="w-full bg-transparent border-b border-black/5 py-2 text-xl font-bold outline-none focus:border-[#0071E3]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-[#86868B]">Company</label>
                                            <input
                                                type="text"
                                                value={exp.company}
                                                onChange={(e) => {
                                                    const newList = [...localData.experience];
                                                    newList[idx].company = e.target.value;
                                                    setLocalData({ ...localData, experience: newList });
                                                }}
                                                className="w-full bg-transparent border-b border-black/5 py-2 text-xl font-bold outline-none focus:border-[#0071E3]"
                                            />
                                        </div>
                                    </div>
                                    <textarea
                                        rows={2}
                                        value={exp.description}
                                        onChange={(e) => {
                                            const newList = [...localData.experience];
                                            newList[idx].description = e.target.value;
                                            setLocalData({ ...localData, experience: newList });
                                        }}
                                        className="w-full bg-white p-6 rounded-2xl border border-black/5 text-lg font-medium outline-none focus:border-[#0071E3]"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'Portfolio' && (
                        <div className="space-y-8">
                            <button
                                onClick={() => addListItem('portfolio')}
                                className="w-full py-6 border-2 border-dashed border-[#E5E7EB] rounded-[2.5rem] flex items-center justify-center gap-3 text-[#86868B] font-bold hover:border-[#0071E3] hover:text-[#0071E3] transition-all bg-[#FBFBFD]"
                            >
                                <Plus size={20} /> Add Project Showcase
                            </button>
                            <div className="grid grid-cols-1 gap-10">
                                {localData.portfolio.map((project, idx) => (
                                    <div key={project.id} className="bg-[#FBFBFD] p-10 rounded-[3rem] border border-black/[0.02] flex gap-10 relative group">
                                        <button
                                            onClick={() => removeListItem('portfolio', idx)}
                                            className="absolute top-8 right-8 text-[#86868B] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 size={24} />
                                        </button>

                                        <div className="relative group/img w-48 h-48 rounded-3xl overflow-hidden border border-black/5 flex flex-col items-center justify-center gap-2 shrink-0 bg-white hover:border-[#0071E3] transition-all">
                                            {project.image ? (
                                                <>
                                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => {
                                                            const newList = [...localData.portfolio];
                                                            newList[idx].image = undefined;
                                                            setLocalData({ ...localData, portfolio: newList });
                                                        }}
                                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity z-10"
                                                    >
                                                        <Plus size={12} className="rotate-45" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <ImageIcon size={40} strokeWidth={1} className="text-[#86868B]" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#86868B]">Project Photo</span>
                                                </>
                                            )}
                                            <label
                                                htmlFor={`portfolio-upload-${project.id}`}
                                                className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer transition-opacity z-20"
                                            >
                                                <span className="text-[9px] font-black text-white uppercase tracking-widest">Update</span>
                                            </label>
                                            <input
                                                id={`portfolio-upload-${project.id}`}
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, (base64) => {
                                                    const newList = [...localData.portfolio];
                                                    newList[idx].image = base64;
                                                    setLocalData({ ...localData, portfolio: newList });
                                                })}
                                            />
                                        </div>

                                        <div className="flex-1 space-y-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black uppercase tracking-widest text-[#86868B]">Project Title</label>
                                                    <input
                                                        type="text"
                                                        value={project.title}
                                                        onChange={(e) => {
                                                            const newList = [...localData.portfolio];
                                                            newList[idx].title = e.target.value;
                                                            setLocalData({ ...localData, portfolio: newList });
                                                        }}
                                                        className="w-full bg-transparent border-b border-black/5 py-2 text-xl font-bold outline-none focus:border-[#0071E3]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black uppercase tracking-widest text-[#86868B]">Category</label>
                                                    <input
                                                        type="text"
                                                        value={project.category}
                                                        onChange={(e) => {
                                                            const newList = [...localData.portfolio];
                                                            newList[idx].category = e.target.value;
                                                            setLocalData({ ...localData, portfolio: newList });
                                                        }}
                                                        className="w-full bg-transparent border-b border-black/5 py-2 text-xl font-bold outline-none focus:border-[#0071E3]"
                                                    />
                                                </div>
                                            </div>
                                            <textarea
                                                rows={2}
                                                value={project.desc}
                                                onChange={(e) => {
                                                    const newList = [...localData.portfolio];
                                                    newList[idx].desc = e.target.value;
                                                    setLocalData({ ...localData, portfolio: newList });
                                                }}
                                                className="w-full bg-white p-6 rounded-2xl border border-black/5 text-lg font-medium outline-none focus:border-[#0071E3]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Awards' && (
                        <div className="space-y-8">
                            <button
                                onClick={() => addListItem('accomplishments')}
                                className="w-full py-6 border-2 border-dashed border-[#E5E7EB] rounded-[2.5rem] flex items-center justify-center gap-3 text-[#86868B] font-bold hover:border-[#0071E3] hover:text-[#0071E3] transition-all bg-[#FBFBFD]"
                            >
                                <Plus size={20} /> Add Recognition Item
                            </button>
                            <div className="grid grid-cols-1 gap-4">
                                {localData.accomplishments.map((acc, idx) => (
                                    <div key={idx} className="bg-[#FBFBFD] p-8 rounded-[2rem] border border-black/[0.02] flex items-center justify-between group">
                                        <div className="flex gap-10 flex-1 items-center">
                                            <input
                                                type="text"
                                                value={acc.title}
                                                onChange={(e) => {
                                                    const newList = [...localData.accomplishments];
                                                    newList[idx].title = e.target.value;
                                                    setLocalData({ ...localData, accomplishments: newList });
                                                }}
                                                className="bg-transparent border-b border-black/5 py-2 text-xl font-bold outline-none focus:border-[#0071E3] flex-1"
                                            />
                                            <input
                                                type="text"
                                                value={acc.org}
                                                placeholder="Organization"
                                                onChange={(e) => {
                                                    const newList = [...localData.accomplishments];
                                                    newList[idx].org = e.target.value;
                                                    setLocalData({ ...localData, accomplishments: newList });
                                                }}
                                                className="bg-transparent border-b border-black/5 py-2 text-lg font-medium text-[#86868B] outline-none focus:border-[#0071E3] flex-1"
                                            />
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <input
                                                type="text"
                                                value={acc.year}
                                                className="w-16 bg-transparent border-b border-black/5 text-right font-bold"
                                                onChange={(e) => {
                                                    const newList = [...localData.accomplishments];
                                                    newList[idx].year = e.target.value;
                                                    setLocalData({ ...localData, accomplishments: newList });
                                                }}
                                            />
                                            <button
                                                onClick={() => removeListItem('accomplishments', idx)}
                                                className="text-[#86868B] hover:text-red-500 transition-all ml-4"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Settings' && (
                        <div className="bg-[#FBFBFD] p-12 rounded-[3.5rem] border border-black/[0.02] text-center space-y-8">
                            <div className="w-24 h-24 bg-[#0071E3]/5 rounded-full flex items-center justify-center mx-auto text-[#0071E3]">
                                <Settings size={48} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold">System Preferences</h3>
                                <p className="text-[#86868B] text-xl max-w-lg mx-auto">Global architectural settings and persistence management. Wipe local storage or export site builds.</p>
                            </div>
                            <div className="flex justify-center gap-6 pt-10">
                                <button className="px-10 py-4 border border-black/5 rounded-full font-bold hover:bg-black/5 transition-all text-lg">Export JSON</button>
                                <button
                                    onClick={async () => {
                                        if (confirm('Are you sure you want to reset all site data?')) {
                                            await resetData();
                                            window.location.reload();
                                        }
                                    }}
                                    className="px-10 py-4 border border-red-500/20 text-red-500 rounded-full font-bold hover:bg-red-500/5 transition-all text-lg"
                                >
                                    Reset to Default
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
