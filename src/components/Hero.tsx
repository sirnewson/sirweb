import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroProps {
    title?: React.ReactNode;
    subtitle?: string;
    videoUrl?: string;
}

const Hero = ({
    title = <>Crafting Digital <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Masterpieces</span></>,
    subtitle = "Creative Director & Digital Artist",
    videoUrl = "https://cdn.pixabay.com/video/2024/06/06/215484_large.mp4",
    showButtons = false,
    shortParagraph = "Building visual identities, dynamic web experiences, and AI-enhanced creative solutions for ambitious brands.",
    stats = true
}: HeroProps & { showButtons?: boolean; shortParagraph?: string; stats?: boolean }) => {
    return (
        <section className="relative min-h-[120vh] w-full overflow-hidden flex items-center justify-center py-32">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-neutral-black/50 z-10" /> {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/80 via-transparent to-neutral-black z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105 opacity-60"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-48 md:pt-64 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        className="mb-8 inline-block relative"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                        <div className="relative w-24 h-24 md:w-32 md:h-32 group cursor-pointer">
                            <img
                                src="/assets/images/new-logo_e9f3d068.webp"
                                alt="Sir Newson"
                                className="w-full h-full object-cover rounded-full absolute inset-0 z-10 drop-shadow-[0_0_15px_rgba(191,255,0,0.3)] border-2 border-primary/20 transition-opacity duration-500 group-hover:opacity-0"
                            />
                            <img
                                src="/assets/images/facee_63957c48.webp"
                                alt="Sir Newson"
                                className="w-full h-full object-cover rounded-full absolute inset-0 z-10 drop-shadow-[0_0_15px_rgba(191,255,0,0.3)] border-2 border-primary/20 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                            />
                        </div>
                    </motion.div>

                    <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-6 text-sm md:text-base text-glow">
                        {subtitle}
                    </h2>
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                        {title}
                    </h1>

                    {shortParagraph && (
                        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            {shortParagraph}
                        </p>
                    )}

                    {showButtons && (
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                            <Link
                                to="/work"
                                className="px-8 py-4 rounded-full bg-primary text-black font-semibold text-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_#BFFF004D] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
                            >
                                View Selected Work
                            </Link>
                            <Link
                                to="/contact"
                                className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                            >
                                Build With Me
                            </Link>
                        </div>
                    )}

                    {stats && (
                        <div className="mt-16 mb-16 flex flex-wrap justify-center gap-6 md:gap-12 text-white/50 text-sm uppercase tracking-widest font-bold">
                            <span>10+ Years in Design</span>
                            <span className="hidden md:inline">•</span>
                            <span>Visual Concepts</span>
                            <span className="hidden md:inline">•</span>
                            <span>Creative Worlds</span>
                        </div>
                    )}

                    {/* Scroll Indicator (Moved inside to flow below stats) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="flex flex-col items-center gap-2 text-white/30"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
                    </motion.div>
                </motion.div>
            </div>


        </section>
    );
};

export default Hero;
