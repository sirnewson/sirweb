import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WorkCinemaxBanner = () => {
    return (
        <section className="py-12 px-6 bg-neutral-black">
            <div className="max-w-7xl mx-auto">
                <Link to="/work">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.5 }}
                        className="relative rounded-[2.5rem] overflow-hidden h-[500px] md:h-[600px] group cursor-pointer"
                    >
                        {/* Video Background */}
                        <div className="absolute inset-0">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 scale-105 group-hover:scale-100 transition-transform duration-700"
                            >
                                <source src="/uploads/motion%20and%20video/big-screen-countdown.mp4" type="video/mp4" />
                            </video>

                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                            {/* Noise Texture */}
                            <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20 z-20">
                            <div className="max-w-3xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <p className="text-primary tracking-[0.3em] uppercase text-sm font-bold mb-4">
                                        Recent Work
                                    </p>
                                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                        Motion & Visuals <br />
                                        <span className="text-white/60">Collection</span>
                                    </h2>
                                    <p className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
                                        Exploring the boundaries of digital motion and storytelling.
                                    </p>

                                    <span className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold hover:bg-white hover:text-black transition-all duration-300 group-hover:translate-x-2">
                                        View All Work <i className="fas fa-arrow-right"></i>
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            </div>
        </section>
    );
};

export default WorkCinemaxBanner;
