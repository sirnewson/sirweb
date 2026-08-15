import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin lime rail at the top of the viewport that tracks page scroll. */
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            aria-hidden
            style={{ scaleX }}
            className="fixed left-0 right-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-primary via-primary to-white shadow-[0_0_12px_rgba(242,139,44,0.6)]"
        />
    );
};

export default ScrollProgress;
