import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface HeroProps {
    title?: React.ReactNode;
    subtitle?: string;
    shortParagraph?: string;
    primaryCtaLabel?: string;
    primaryCtaPath?: string;
    secondaryCtaLabel?: string;
    secondaryCtaPath?: string;
}

const Hero = ({
    title = "Sir Newson",
    subtitle = "Creative Director • Website Design • Brand Systems • AI Visuals",
    shortParagraph = "I help ambitious brands look trusted, explain their value clearly, and turn attention into action through premium websites, brand identity systems, visual storytelling, and AI-powered creative workflows.",
    primaryCtaLabel = "View Work",
    primaryCtaPath = "/work",
    secondaryCtaLabel = "Start a Project",
    secondaryCtaPath = "/contact"
}: HeroProps) => {
    const location = useLocation();

    return (
        <section className="relative w-full overflow-hidden pt-36 pb-16 flex flex-col items-center justify-center font-sans border-b border-white/5">
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/80 via-neutral-black/60 to-neutral-black z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-25 scale-105"
                >
                    <source src="https://cdn.pixabay.com/video/2019/05/17/23719-336712399_large.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="absolute inset-0 bg-hexagon-grid opacity-40 mix-blend-color-dodge pointer-events-none z-5" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl w-full mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative w-28 h-28 md:w-32 md:h-32 mb-6 group cursor-pointer flex items-center justify-center"
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

                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg"
                >
                    {title}
                </motion.h1>

                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-primary font-display font-medium tracking-[0.15em] text-xs md:text-sm uppercase mb-4 text-glow"
                >
                    {subtitle}
                </motion.p>

                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/70 text-base md:text-lg max-w-2xl mb-8 leading-relaxed font-light"
                >
                    {shortParagraph}
                </motion.p>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
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
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;