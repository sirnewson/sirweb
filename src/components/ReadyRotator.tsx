import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const phrases = [
    'ready to post.',
    'ready to launch.',
    'ready to sell.',
    'ready for the internet.',
    'ready for the world.'
];

const ReadyRotator = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % phrases.length);
        }, 2400);
        return () => window.clearInterval(timer);
    }, []);

    return (
        <section className="border-y border-white/5 bg-neutral-dark/70 px-6 py-14">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 text-center sm:flex-row sm:items-baseline sm:gap-4">
                <span className="font-display text-3xl font-black leading-[1.35] text-white/50 md:text-5xl">
                    We make it
                </span>
                <span className="relative block h-[1.35em] w-full overflow-hidden font-display text-3xl font-black md:text-5xl sm:w-auto sm:min-w-[10ch] sm:text-left">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={phrases[index]}
                            initial={{ y: '110%', opacity: 0 }}
                            animate={{ y: '0%', opacity: 1 }}
                            exit={{ y: '-110%', opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="block whitespace-nowrap font-display text-3xl font-black leading-[1.35] text-primary md:text-5xl"
                        >
                            {phrases[index]}
                        </motion.span>
                    </AnimatePresence>
                </span>
            </div>
        </section>
    );
};

export default ReadyRotator;
