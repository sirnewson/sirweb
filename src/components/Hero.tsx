import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface HeroProps {
    title?: React.ReactNode;
    subtitle?: string;
    shortParagraph?: string;
}

const Hero = ({
    title = "Sir Newson",
    subtitle = "Product Design • Web Systems • AI Systems • Marketing Direction",
    shortParagraph = "Designing premium digital products, high-performance web systems, AI-powered workflows, and strategic marketing directions for brands building in the digital age."
}: HeroProps) => {
    const location = useLocation();

    return (
        <section className="relative w-full overflow-hidden pt-36 pb-16 flex flex-col items-center justify-center font-sans border-b border-white/5">
            {/* Background Ocean/Water Motion Video */}
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

            {/* Hexagonal Pattern Overlay for atmospheric depth */}
            <div className="absolute inset-0 bg-hexagon-grid opacity-40 mix-blend-color-dodge pointer-events-none z-5" />

            {/* Glowing Ambient Orbs for immersive visual weight */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl w-full mx-auto">
                {/* Animated Hexagonal Profile Avatar */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative w-28 h-28 md:w-32 md:h-32 mb-6 group cursor-pointer flex items-center justify-center"
                >
                    {/* Glowing Hex Background */}
                    <div className="absolute inset-0 bg-primary/20 blur-xl clip-hexagon" />
                    
                    {/* Hex Outer Border */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent p-[2px] clip-hexagon group-hover:from-primary transition-all duration-500">
                        {/* Hex Image Container */}
                        <div className="w-full h-full bg-neutral-black clip-hexagon relative overflow-hidden">
                            <img
                                src="/assets/images/new-logo_e9f3d068.webp"
                                alt="Sir Newson Logo"
                                className="w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
                            />
                            <img
                                src="/assets/images/facee_63957c48.webp"
                                alt="Sir Newson Face"
                                className="w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700 ease-out opacity-0 scale-105 group-hover:scale-100 group-hover:opacity-100"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Title / Brand Name */}
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg"
                >
                    {title}
                </motion.h1>

                {/* Subtitle / Focus */}
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-primary font-display font-medium tracking-[0.15em] text-xs md:text-sm uppercase mb-4 text-glow"
                >
                    {subtitle}
                </motion.p>

                {/* Description */}
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/70 text-base md:text-lg max-w-2xl mb-8 leading-relaxed font-light"
                >
                    {shortParagraph}
                </motion.p>

                {/* Action Buttons with active states based on path */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4"
                >
                    <Link
                        to="/work"
                        className={`px-6 py-3 rounded-full font-bold text-xs md:text-sm transition-all duration-300 ${
                            location.pathname === '/work'
                                ? 'bg-white text-black shadow-lg shadow-white/10'
                                : 'bg-primary text-black hover:bg-white shadow-[0_0_20px_rgba(191,255,0,0.25)]'
                        }`}
                    >
                        View Work
                    </Link>
                    <Link
                        to="/contact"
                        className={`px-6 py-3 rounded-full border font-bold text-xs md:text-sm transition-all duration-300 ${
                            location.pathname === '/contact'
                                ? 'bg-white text-black border-white'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                        }`}
                    >
                        Start a Project
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
