import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    threshold?: number;
}

export const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    distance = 30,
    className = "",
    threshold = 0.08
}: ScrollRevealProps) => {
    const directionOffset = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {}
    }[direction];

    return (
        <motion.div
            initial={{ opacity: 0, ...directionOffset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: threshold }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1] // clean cubic bezier easeOutExpo
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface FloatProps {
    children: ReactNode;
    duration?: number;
    delay?: number;
    y?: number;
    x?: number;
    rotate?: number;
    className?: string;
}

export const Float = ({
    children,
    duration = 6,
    delay = 0,
    y = 8,
    x = 0,
    rotate = 0,
    className = ""
}: FloatProps) => {
    return (
        <motion.div
            animate={{
                y: y !== 0 ? [-y, y, -y] : 0,
                x: x !== 0 ? [-x, x, -x] : 0,
                rotate: rotate !== 0 ? [-rotate, rotate, -rotate] : 0
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface PulseGlowProps {
    children?: ReactNode;
    duration?: number;
    color?: string;
    className?: string;
}

export const PulseGlow = ({
    children,
    duration = 3,
    color = "rgba(191,255,0,0.25)",
    className = ""
}: PulseGlowProps) => {
    return (
        <motion.div
            animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [0.97, 1.03, 0.97]
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className={className}
            style={{
                boxShadow: `0 0 40px ${color}`,
                borderRadius: 'inherit'
            }}
        >
            {children}
        </motion.div>
    );
};

interface MagneticProps {
    children: ReactNode;
    range?: number;
    strength?: number;
    className?: string;
}

export const Magnetic = ({
    children,
    range = 50,
    strength = 0.3,
    className = ""
}: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < range) {
            x.set(distanceX * strength);
            y.set(distanceY * strength);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
};

interface TextRevealProps {
    text: string;
    delay?: number;
    duration?: number;
    className?: string;
    wordClassName?: string;
}

export const TextReveal = ({
    text,
    delay = 0,
    duration = 0.6,
    className = "",
    wordClassName = ""
}: TextRevealProps) => {
    const words = text.split(" ");
    
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: delay * i }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 18,
                stiffness: 120,
                duration
            }
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring" as const,
                damping: 18,
                stiffness: 120
            }
        }
    };

    return (
        <motion.span
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className={`inline-flex flex-wrap ${className}`}
        >
            {words.map((word, idx) => (
                <span key={idx} className="overflow-hidden inline-block mr-[0.22em] pb-[0.05em]">
                    <motion.span
                        variants={child}
                        className={`inline-block ${wordClassName}`}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
};

/* ---------------------------------------------------------------
   Scroll-linked primitives
   --------------------------------------------------------------- */

interface ParallaxProps {
    children: ReactNode;
    /** Pixels of travel across the full scroll pass. Negative moves up. */
    distance?: number;
    className?: string;
}

/** Moves content at a different rate than the page as it scrolls past. */
export const Parallax = ({ children, distance = -80, className = "" }: ParallaxProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
    const smoothY = useSpring(y, { stiffness: 120, damping: 30, mass: 0.4 });

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y: smoothY }}>{children}</motion.div>
        </div>
    );
};

interface RevealMaskProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

/** Wipes content into view behind a clip-path mask. Good for images and headings. */
export const RevealMask = ({ children, delay = 0, duration = 0.9, className = "" }: RevealMaskProps) => (
    <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

interface TiltProps {
    children: ReactNode;
    /** Max rotation in degrees. */
    max?: number;
    /** Adds a cursor-following light wash. */
    spotlight?: boolean;
    className?: string;
}

/** 3D tilt toward the cursor, with an optional spotlight that tracks the pointer. */
export const Tilt = ({ children, max = 7, spotlight = true, className = "" }: TiltProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const pointerX = useMotionValue(50);
    const pointerY = useMotionValue(50);
    const glow = useMotionValue(0);

    const springConfig = { stiffness: 200, damping: 20, mass: 0.4 };
    const smoothRotateX = useSpring(rotateX, springConfig);
    const smoothRotateY = useSpring(rotateY, springConfig);
    const smoothGlow = useSpring(glow, { stiffness: 150, damping: 25 });

    const background = useMotionTemplate`radial-gradient(340px circle at ${pointerX}% ${pointerY}%, rgba(191,255,0,0.14), transparent 70%)`;

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const px = (event.clientX - left) / width;
        const py = (event.clientY - top) / height;

        rotateY.set((px - 0.5) * max * 2);
        rotateX.set((0.5 - py) * max * 2);
        pointerX.set(px * 100);
        pointerY.set(py * 100);
    };

    const handleMouseEnter = () => glow.set(1);

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
        glow.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformStyle: 'preserve-3d',
                transformPerspective: 900
            }}
            className={`relative ${className}`}
        >
            {children}
            {spotlight && (
                <motion.div
                    aria-hidden
                    style={{ background, opacity: smoothGlow }}
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                />
            )}
        </motion.div>
    );
};
