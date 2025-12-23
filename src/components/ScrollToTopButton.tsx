import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_20px_rgba(191,255,0,0.4)] hover:shadow-[0_0_30px_rgba(191,255,0,0.6)] hover:-translate-y-1 transition-all duration-300"
                >
                    <i className="fas fa-arrow-up text-lg font-bold"></i>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTopButton;
