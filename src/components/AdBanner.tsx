import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdBanner = () => {
    return (
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/shop">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="relative rounded-3xl overflow-hidden bg-primary p-12 md:p-24 text-center cursor-pointer group"
                    >
                        {/* Abstract Background Pattern */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 left-0 w-full h-full bg-noise mix-blend-overlay" />
                            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/20 via-transparent to-transparent animate-spin-slow" />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <p className="text-black font-bold tracking-[0.3em] uppercase text-sm md:text-base">Limited Edition Collection</p>
                            <h2 className="font-display text-4xl md:text-7xl font-bold text-black leading-tight">
                                Own a Piece of <br />
                                <span className="text-white drop-shadow-lg">The Future</span>
                            </h2>
                            <p className="text-black/70 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                                Exclusive merch, luxury artifacts, and digital art.
                                Curated for the visionaries.
                            </p>
                            <div className="pt-8">
                                <span className="inline-block px-8 py-4 bg-black text-white rounded-full font-bold text-lg group-hover:bg-white group-hover:text-black transition-colors duration-300 shadow-xl">
                                    Visit The Shop <i className="fas fa-arrow-right ml-2"></i>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            </div>
        </section>
    );
};

export default AdBanner;
