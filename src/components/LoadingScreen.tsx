import { BrandMatrixCanvas } from './BrandMatrix';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

const SpiralVortex = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-60 z-0 pointer-events-none mix-blend-screen">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="relative w-full h-full flex items-center justify-center"
            >
                {Array.from({ length: 60 }).map((_, i) => {
                    const startDistance = Math.random() * 20 + 5;
                    const endDistance = startDistance + Math.random() * 40 + 30;
                    return (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 origin-left"
                            style={{
                                rotate: `${Math.random() * 360}deg`,
                            }}
                        >
                            <motion.div
                                className="bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
                                style={{
                                    height: `${Math.random() * 2 + 1}px`,
                                    width: `${Math.random() * 80 + 40}px`,
                                    boxShadow: '0 0 10px #F28B2C',
                                }}
                                animate={{
                                    x: [`${startDistance}vw`, `${endDistance}vw`],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: Math.random() * 1.5 + 1.5,
                                    repeat: Infinity,
                                    ease: "easeIn",
                                    delay: Math.random() * 2
                                }}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

const LoadingScreen = () => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        const animation = animate(count, 100, { duration: 2.8 });
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
            className="fixed inset-0 z-[100] bg-soft-black overflow-hidden"
        >
            {/* Brand Matrix behind the counter — the same engine as the homepage */}
            <div className="pointer-events-none absolute inset-0">
                <BrandMatrixCanvas alwaysOn />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" />

            <SpiralVortex />

            <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
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

                {/* Avatar Hexagon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
                    animate={{ 
                        scale: 1, 
                        opacity: 1,
                        y: [0, -6, 0]
                    }}
                    whileHover={{ 
                        scale: 1.15,
                        rotate: 15,
                        y: -10
                    }}
                    whileTap={{ 
                        scale: 0.9,
                        rotate: -15
                    }}
                    transition={{
                        scale: { type: "spring", stiffness: 300, damping: 15 },
                        rotate: { type: "spring", stiffness: 300, damping: 15 },
                        y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center z-10 cursor-pointer"
                >
                    {/* Rotating Background Glow */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-primary/30 blur-2xl clip-hexagon" 
                    />
                    
                    {/* Rotating Border */}
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-primary/60 p-[2px] clip-hexagon"
                    />

                    {/* Non-rotating Inner Face Container (stays upright!) */}
                    <div className="absolute inset-[2px] bg-neutral-black clip-hexagon overflow-hidden flex items-center justify-center">
                        <img
                            src="/assets/images/facee_63957c48.webp"
                            alt="Sir Newson Avatar"
                            className="w-full h-full object-cover absolute inset-0 z-10 pointer-events-none"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Count + progress, anchored to the bottom */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-10 md:pb-10">
                <div className="mx-auto flex max-w-5xl items-end justify-between gap-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-warm-white/45">
                        Loading experience
                    </p>
                    <div className="font-display text-[5rem] font-semibold leading-[0.8] tabular-nums text-warm-white md:text-[8rem]">
                        {displayCount.toString().padStart(2, '0')}
                        <span className="ml-1 align-top font-mono text-lg text-sunset md:text-2xl">%</span>
                    </div>
                </div>

                {/* Progress rail — the glow travels left to right with the fill */}
                <div className="mx-auto mt-5 h-[3px] w-full max-w-5xl overflow-hidden rounded-full bg-warm-white/10">
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${displayCount}%` }}
                        transition={{ ease: 'linear', duration: 0.15 }}
                        className="relative h-full bg-gradient-to-r from-sunset via-lime to-golden-hour"
                    >
                        <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-lime shadow-[0_0_16px_4px_rgba(191,255,0,0.65)]" />
                    </motion.div>
                </div>
            </div>

        </motion.div>
    );
};

export default LoadingScreen;
