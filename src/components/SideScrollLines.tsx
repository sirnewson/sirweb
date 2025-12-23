import { motion, useScroll, useSpring } from 'framer-motion';

const SideScrollLines = () => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {/* Left Line */}
            <div className="fixed left-0 top-0 bottom-0 w-[1px] bg-white/5 z-40 hidden md:block">
                <motion.div
                    className="absolute top-0 left-0 w-full bg-primary origin-top"
                    style={{ scaleY, height: '100%' }}
                />
            </div>

            {/* Right Line */}
            <div className="fixed right-0 top-0 bottom-0 w-[1px] bg-white/5 z-40 hidden md:block">
                <motion.div
                    className="absolute top-0 left-0 w-full bg-primary origin-top"
                    style={{ scaleY, height: '100%' }}
                />
            </div>
        </>
    );
};

export default SideScrollLines;
