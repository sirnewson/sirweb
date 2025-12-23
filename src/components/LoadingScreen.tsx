import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        const animation = animate(count, 100, { duration: 2.5 });
        return animation.stop;
    }, []);

    useEffect(() => {
        const unsubscribe = rounded.on("change", v => setDisplayCount(v));
        return unsubscribe;
    }, [rounded]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-neutral-black flex flex-col items-center justify-center"
        >
            <div className="relative">
                {/* Pulsing Lime Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
                />

                {/* Logo */}
                <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src="/assets/images/Asset_204_ce118cb8.webp"
                    alt="Sir Newson"
                    className="w-32 md:w-48 relative z-10 brightness-0 invert"
                />
            </div>

            {/* Loading Bar */}
            <div className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="h-full bg-primary"
                />
            </div>

            <div className="mt-4 flex flex-col items-center">
                <div className="text-4xl font-display font-bold text-primary tabular-nums">
                    {displayCount.toString().padStart(3, '0')}
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 text-white/50 font-display tracking-widest text-xs"
                >
                    LOADING EXPERIENCE
                </motion.p>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
