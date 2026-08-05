import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Float, ScrollReveal, Magnetic, TextReveal } from './Animated';

interface HeroProps {
    title?: React.ReactNode;
    subtitle?: string;
    shortParagraph?: string;
    primaryCtaLabel?: string;
    primaryCtaPath?: string;
    secondaryCtaLabel?: string;
    secondaryCtaPath?: string;
    /** Understated credibility line under the CTAs. Landing hero only. */
    trustLine?: string;
}

const Hero = ({
    title = "I Make Ideas Ready for the World.",
    subtitle = "Creative Direction • Presentation Systems • Digital Experiences",
    shortParagraph = "You bring the raw material — photos, footage, a product, a rough idea. I shape it into something clear, professional, and ready to meet its audience.",
    primaryCtaLabel = "View Work",
    primaryCtaPath = "/work",
    secondaryCtaLabel = "Start a Project",
    secondaryCtaPath = "/contact",
    trustLine
}: HeroProps) => {
    const location = useLocation();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start']
    });

    // Content drifts up and dissolves; the backdrop pushes down. Subtle depth split.
    const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -90]), {
        stiffness: 120,
        damping: 30,
        mass: 0.4
    });
    const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const backdropY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const backdropScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.16]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden pt-36 pb-16 flex flex-col items-center justify-center font-sans border-b border-white/5"
        >
            <motion.div
                style={{ y: backdropY, scale: backdropScale }}
                className="absolute inset-0 z-0 select-none pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/80 via-neutral-black/60 to-neutral-black z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-25"
                >
                    <source src="/uploads/motion%20and%20video/water-background.mp4" type="video/mp4" />
                </video>
            </motion.div>

            <div className="absolute inset-0 bg-hexagon-grid opacity-40 mix-blend-color-dodge pointer-events-none z-5" />
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1.12, 1, 1.12], opacity: [0.4, 0.75, 0.4] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
            />

            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl w-full mx-auto"
            >
                <Float y={5} rotate={1.5} duration={5} className="mb-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative w-28 h-28 md:w-32 md:h-32 group cursor-pointer flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-xl clip-hexagon" />
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent p-[2px] clip-hexagon group-hover:from-primary transition-all duration-500">
                            <div className="w-full h-full bg-neutral-black clip-hexagon relative overflow-hidden">
                                <img
                                    src="/assets/images/new-logo_e9f3d068.webp"
                                    alt="Sir Newson brand mark"
                                    className="w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
                                />
                                <img
                                    src="/assets/images/facee_63957c48.webp"
                                    alt="Sir Newson portrait"
                                    className="w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700 ease-out opacity-0 scale-105 group-hover:scale-100 group-hover:opacity-100"
                                />
                            </div>
                        </div>
                    </motion.div>
                </Float>

                {typeof title === 'string' ? (
                    <TextReveal
                        text={title}
                        className="font-display text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg justify-center"
                    />
                ) : (
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="font-display text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg"
                    >
                        {title}
                    </motion.h1>
                )}

                {subtitle && (
                    <ScrollReveal direction="up" delay={0.2} duration={0.6}>
                        <p className="text-primary font-display font-medium tracking-[0.15em] text-xs md:text-sm uppercase mb-4 text-glow">
                            {subtitle}
                        </p>
                    </ScrollReveal>
                )}

                {shortParagraph && (
                    <ScrollReveal direction="up" delay={0.35} duration={0.8}>
                        <p className="text-white/70 text-base md:text-lg max-w-2xl mb-8 leading-relaxed font-light">
                            {shortParagraph}
                        </p>
                    </ScrollReveal>
                )}

                <ScrollReveal direction="up" delay={0.5} duration={0.8} className="flex flex-col sm:flex-row items-center gap-4">
                    <Magnetic>
                        <Link
                            to={primaryCtaPath}
                            className={`px-6 py-3 rounded-full font-bold text-xs md:text-sm transition-all duration-300 ${
                                location.pathname === primaryCtaPath
                                    ? 'bg-white text-black shadow-lg shadow-white/10'
                                    : 'bg-primary text-black hover:bg-white shadow-[0_0_20px_rgba(191,255,0,0.25)]'
                            }`}
                        >
                            {primaryCtaLabel}
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link
                            to={secondaryCtaPath}
                            className={`px-6 py-3 rounded-full border font-bold text-xs md:text-sm transition-all duration-300 ${
                                location.pathname === secondaryCtaPath
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                            }`}
                        >
                            {secondaryCtaLabel}
                        </Link>
                    </Magnetic>
                </ScrollReveal>

                {trustLine && (
                    <ScrollReveal direction="up" delay={0.65} duration={0.8}>
                        <p className="mt-7 text-[11px] font-medium tracking-wide text-white/40">{trustLine}</p>
                    </ScrollReveal>
                )}
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                style={{ opacity: contentOpacity }}
                className="relative z-10 mt-14 flex flex-col items-center gap-2"
            >
                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-white/25">Scroll</span>
                <div className="h-10 w-px overflow-hidden bg-white/10">
                    <motion.div
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="h-full w-full bg-primary"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
