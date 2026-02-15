
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Faster spring configuration for tighter tracking
    // Increased stiffness and decreased damping for speed
    const springConfig = { damping: 20, stiffness: 450, mass: 0.3 };

    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleHover = () => setIsHovering(true);
        const handleUnhover = () => setIsHovering(false);

        window.addEventListener('mousemove', mouseMove);

        const attachListeners = () => {
            const list = document.querySelectorAll('button, a, .group, input, textarea, [role="button"]');
            list.forEach(el => {
                el.addEventListener('mouseenter', handleHover);
                el.addEventListener('mouseleave', handleUnhover);
            });
        };

        attachListeners();
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white mix-blend-difference z-[9999999] pointer-events-none hidden md:block"
            style={{
                x: cursorX,
                y: cursorY,
                scale: isHovering ? 1.8 : 1, // Slightly smaller hover scale for snappier feel
            }}
        />
    );
};

export default CustomCursor;
