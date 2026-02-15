import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/db';

interface Project {
    id: number;
    title: string;
    category: string;
    year: string;
    tech: string[];
    bg: string;
    desc: string;
    image?: string;
}

interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    logo?: string;
}

interface Accomplishment {
    title: string;
    year: string;
    org: string;
    type: string;
}

interface SiteData {
    hero: {
        greeting: string;
        firstName: string;
        lastName: string;
        description: string;
        roles: string[];
        image?: string;
    };
    about: {
        mission: string;
        bio: string;
        subBio: string;
        status: string;
        image?: string;
    };
    portfolio: Project[];
    experience: Experience[];
    accomplishments: Accomplishment[];
}

const defaultData: SiteData = {
    hero: {
        greeting: "Hola, Yo soy",
        firstName: "Ashikur",
        lastName: "Rahman",
        description: "A student entrepreneur from Bangladesh.",
        roles: ["Architect", "Developer", "Designer"],
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&h=600&fit=crop"
    },
    about: {
        mission: "Physics.",
        bio: "I am Ashikur Rahman, a STEM researcher and creative lead dedicated to the intersection of science and society.",
        subBio: "My approach combines analytical rigor with a designer's eye, focusing on building high-impact platforms that empower students globally.",
        status: "Currently architecting sustainable ecosystems for youth innovation.",
        image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85"
    },
    portfolio: [
        { id: 1, title: "Vanguard Brand Identity", category: "Branding", year: "2024", tech: ["Logos", "Guidelines", "Figma"], bg: "bg-[#F5F5F7]", desc: "A comprehensive visual system for a premium automotive brand, focusing on timeless elegance." },
        { id: 2, title: "Aesthetic Editorial", category: "Layout", year: "2024", tech: ["InDesign", "Typography", "Grid Systems"], bg: "bg-[#FBFBFD]", desc: "A high-concept fashion publication exploring minimalist architecture and silhouette." }
    ],
    experience: [
        {
            id: 1,
            period: "JANUARY 2024 - PRESENT",
            role: "Co-Founder & CSO",
            company: "Youth Ink",
            location: "Kuala Lumpur, MY",
            description: "Leading strategic initiatives to build impactful youth-driven organizations. Oversaw the successful launch of 4 major projects globally."
        },
        {
            id: 2,
            period: "SUMMER 2023",
            role: "Research Intern",
            company: "Quantum Leap Labs",
            location: "Dhaka, BD",
            description: "Assisted in data analysis for quantum computing simulations. Developed a Python-based utility for automated testing."
        },
        {
            id: 3,
            period: "2022 - 2023",
            role: "Lead Developer",
            company: "STEM Hub",
            location: "Global Remote",
            description: "Directed a team of 12 students to create an open-source platform for STEM education in Bangladesh."
        },
        {
            id: 4,
            period: "2021",
            role: "Voluntary Lead",
            company: "Eco Warriors",
            location: "Rajshahi, BD",
            description: "Organized nationwide awareness campaigns for environmental conservation using digital storytelling."
        }
    ],
    accomplishments: [
        { title: "National STEM Champion", year: "2024", org: "Ministry of Education", type: "Major" },
        { title: "Top 30 Under 30 nominee", year: "2023", org: "Youth Global Forum", type: "Distinction" },
        { title: "Quantum Computing Grant", year: "2023", org: "Tech Pioneers", type: "Grant" },
        { title: "Sustainable Leadership Award", year: "2022", org: "Eco Summit", type: "Honor" },
        { title: "Best Innovator Award", year: "2022", org: "StartUp Dhaka", type: "Merit" },
        { title: "Young Scientist Finalist", year: "2021", org: "Science Fair Intl.", type: "Science" }
    ]
};

interface DataContextType {
    data: SiteData;
    updateData: (newData: SiteData) => Promise<void>;
    resetData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<SiteData>(defaultData);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const saved = await loadData();
                if (saved) {
                    setData(saved as SiteData);
                }
            } catch (e) {
                console.error('Failed to load DB:', e);
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, []);

    const updateData = async (newData: SiteData) => {
        try {
            await saveData(newData);
            setData(newData);
        } catch (error) {
            console.error('CRITICAL STORAGE ERROR:', error);
            throw new Error('QUOTA_EXCEEDED');
        }
    };

    const resetData = async () => {
        await saveData(defaultData);
        setData(defaultData);
    };

    if (isLoading) {
        return <div className="min-h-screen bg-white flex items-center justify-center italic text-[#86868B]">Loading Studio...</div>;
    }

    return (
        <DataContext.Provider value={{ data, updateData, resetData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
