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
            className="relative w-full overflow-hidden pt-36 pb-20 flex flex-col font-sans border-b border-white/5 md:pt-44"
        >
            <motion.div
                style={{ y: backdropY, scale: backdropScale }}
                className="absolute inset-0 z-0 select-none pointer-events-none"
            >
                {/* Aurora — pure CSS, in place of the old background clip */}
                <div className="absolute inset-0 bg-soft-black" />
                <div className="aurora">
                    <span className="aurora__band aurora__band--one" />
                    <span className="aurora__band aurora__band--two" />
                    <span className="aurora__band aurora__band--three" />
                    <span className="aurora__band aurora__band--four" />
                </div>
                {/* Settles the ambers back toward the ground so type stays legible */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-soft-black/70 via-soft-black/45 to-soft-black" />
            </motion.div>

            {/* Eclipse loop, right side, blended so only its light shows */}
            <motion.div
                style={{ y: backdropY }}
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 z-[6] h-[46%] w-[72%] select-none sm:h-[58%] sm:w-[60%] lg:inset-y-0 lg:h-full lg:w-[52%]"
            >
                <video
                    src="/uploads/loops/nav.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover opacity-90 mix-blend-lighten"
                />
                {/* Feathers the left edge so it melts into the copy column */}
                <div className="absolute inset-0 bg-gradient-to-r from-soft-black via-soft-black/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-soft-black via-soft-black/20 to-transparent lg:hidden" />
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-soft-black to-transparent lg:w-40" />
            </motion.div>

            <div className="absolute inset-0 bg-hexagon-grid opacity-25 mix-blend-color-dodge pointer-events-none z-5" />
            <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay pointer-events-none z-5" />

            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-5 text-left md:px-10 lg:pr-[24rem]"
            >
                <Float y={5} rotate={1.5} duration={5} className="mb-7">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative w-20 h-20 md:w-24 md:h-24 group cursor-pointer flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-xl clip-hexagon" />
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent p-[2px] clip-hexagon group-hover:from-primary transition-all duration-500">
                            <div className="w-full h-full bg-neutral-black clip-hexagon relative overflow-hidden">
                                <img
                                    src="/assets/images/facee_63957c48.webp"
                                    alt="Sir Newson portrait"
                                    className="w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
                                />
                                <img
                                    src="/assets/images/new-logo_e9f3d068.webp"
                                    alt="Sir Newson brand mark"
                                    className="w-full h-full object-cover absolute inset-0 z-10 opacity-0 scale-105 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100 sepia saturate-150 hue-rotate-[330deg]"
                                />
                            </div>
                        </div>
                    </motion.div>
                </Float>

                {typeof title === 'string' ? (
                    <TextReveal
                        text={title}
                        className="font-editorial text-[3.2rem] leading-[0.95] md:text-7xl lg:text-8xl font-bold text-warm-white mb-4"
                    />
                ) : (
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="font-editorial text-[3.2rem] leading-[0.95] md:text-7xl lg:text-8xl font-bold text-warm-white mb-4"
                    >
                        {title}
                    </motion.h1>
                )}

                {subtitle && (
                    <ScrollReveal direction="up" delay={0.2} duration={0.6}>
                        <p className="text-golden-hour font-mono font-medium tracking-[0.22em] text-[10px] md:text-[11px] uppercase mb-5">
                            {subtitle}
                        </p>
                    </ScrollReveal>
                )}

                {shortParagraph && (
                    <ScrollReveal direction="up" delay={0.35} duration={0.8}>
                        <p className="text-warm-white/72 text-base md:text-lg max-w-xl mb-9 leading-relaxed font-light">
                            {shortParagraph}
                        </p>
                    </ScrollReveal>
                )}

                <ScrollReveal direction="up" delay={0.5} duration={0.8} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Magnetic>
                        <Link
                            to={primaryCtaPath}
                            className={`px-6 py-3 rounded-full font-bold text-xs md:text-sm transition-all duration-300 ${
                                location.pathname === primaryCtaPath
                                    ? 'bg-warm-white text-soft-black shadow-lg'
                                    : 'bg-lime text-soft-black hover:bg-golden-hour shadow-[0_6px_28px_rgba(191,255,0,0.28)]'
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
                                    ? 'bg-warm-white text-soft-black border-warm-white'
                                    : 'bg-warm-white/[0.06] hover:bg-warm-white/12 border-warm-white/20 text-warm-white'
                            }`}
                        >
                            {secondaryCtaLabel}
                        </Link>
                    </Magnetic>
                </ScrollReveal>

                {trustLine && (
                    <ScrollReveal direction="up" delay={0.65} duration={0.8}>
                        <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.16em] text-warm-white/50">{trustLine}</p>
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
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-warm-white/45">Scroll</span>
                <div className="h-10 w-px overflow-hidden bg-warm-white/20">
                    <motion.div
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="h-full w-full bg-golden-hour"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
