import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxImageRowsProps {
    topRowImages: string[];
    bottomRowImages: string[];
}

const ParallaxImageRows = ({ topRowImages, bottomRowImages }: ParallaxImageRowsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const springConfig = { damping: 50, stiffness: 400 };
    const scrollY = useSpring(scrollYProgress, springConfig);

    const xLeft = useTransform(scrollY, [0, 1], ["0%", "-50%"]);
    const xRight = useTransform(scrollY, [0, 1], ["-50%", "0%"]);

    return (
        <div ref={containerRef} className="py-24 overflow-hidden space-y-8 bg-neutral-black">
            {/* Top Row - Scrolls Left */}
            <motion.div style={{ x: xLeft }} className="flex gap-8 w-max">
                {[...topRowImages, ...topRowImages].map((src, index) => (
                    <div key={`top-${index}`} className="w-[300px] h-[400px] rounded-[12px] overflow-hidden relative border border-white/10 bg-black">
                        <img src={src} alt="" className="w-full h-full object-cover opacity-95" />
                    </div>
                ))}
            </motion.div>

            {/* Bottom Row - Scrolls Right */}
            <motion.div style={{ x: xRight }} className="flex gap-8 w-max">
                {[...bottomRowImages, ...bottomRowImages].map((src, index) => (
                    <div key={`bottom-${index}`} className="w-[300px] h-[400px] rounded-[12px] overflow-hidden relative border border-white/10 bg-black">
                        <img src={src} alt="" className="w-full h-full object-cover opacity-95" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default ParallaxImageRows;
