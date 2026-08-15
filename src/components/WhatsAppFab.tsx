import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const WHATSAPP_URL =
    'https://wa.me/254702480771?text=' +
    encodeURIComponent('Hi Sir Newson, I have something I want to make ready.');

const WhatsAppFab = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggle = () => setIsVisible(window.scrollY > 400);
        window.addEventListener('scroll', toggle);
        return () => window.removeEventListener('scroll', toggle);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Message Sir Newson on WhatsApp"
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 10 }}
                    className="group fixed bottom-8 left-8 z-50 flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] py-4 pl-4 pr-4 text-black shadow-[0_0_24px_rgba(37,211,102,0.35)] transition-all duration-300 hover:pr-6 hover:shadow-[0_0_34px_rgba(37,211,102,0.55)]"
                >
                    <i className="fab fa-whatsapp text-2xl" />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-[12rem] group-hover:opacity-100">
                        Make it ready
                    </span>
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default WhatsAppFab;
