import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DriftCinemaxBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            id: 1,
            title: 'The Infinite Ocean',
            desc: 'Navigating the depths of digital creativity.',
            image: 'https://cdn.midjourney.com/72552a5f-ad84-4216-b218-9d2d6ee27fe6/0_1.png'
        },
        {
            id: 2,
            title: 'Mirrors and Mirages',
            desc: 'Reflections on AI and human identity.',
            image: 'https://cdn.midjourney.com/9c4d7d86-4c7e-4a05-ac3b-75c2019576e1/0_0.png'
        },
        {
            id: 3,
            title: 'Not Choosing',
            desc: 'The power of indecision in design.',
            image: 'https://cdn.midjourney.com/2aa68c8a-188f-46c3-9a74-192d3db3e5b6/0_0.png'
        },
        {
            id: 4,
            title: 'Between Sent and Seen',
            desc: 'Communication in the digital age.',
            image: 'https://cdn.midjourney.com/becdf96b-1be9-4de2-a5ae-513685535c9a/0_0.png'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[600px] md:h-[700px] rounded-[2.5rem] overflow-hidden group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[currentIndex].image}
                        alt={slides[currentIndex].title}
                        className="w-full h-full object-cover"
                    />
                    {/* Cinematic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                    {/* Noise Texture */}
                    <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20 z-20">
                <div className="max-w-3xl">
                    <motion.div
                        key={`text-${currentIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-primary tracking-[0.3em] uppercase text-sm font-bold mb-4">
                            Drift Library • Vol. 0{slides[currentIndex].id}
                        </p>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            {slides[currentIndex].title}
                        </h2>
                        <p className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
                            {slides[currentIndex].desc}
                        </p>

                        <a
                            href="https://thedriftlibrary.yxm.digital/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold hover:bg-white hover:text-black transition-all duration-300 group-hover:translate-x-2"
                        >
                            Start Reading <i className="fas fa-arrow-right"></i>
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-12 right-12 z-20 flex gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-12 bg-primary' : 'w-4 bg-white/20 hover:bg-white/40'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default DriftCinemaxBanner;
