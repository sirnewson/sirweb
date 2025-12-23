import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import shopBannerBg from '../assets/shop_banner_bg.webp';

const GlobalShopBanner = () => {
    return (
        <section className="py-12 px-6 bg-neutral-black">
            <div className="max-w-7xl mx-auto">
                <Link to="/shop">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.5 }}
                        className="relative rounded-[2rem] overflow-hidden h-[400px] flex items-center justify-center text-center group cursor-pointer"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={shopBannerBg}
                                alt="Shop Banner Background"
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                            {/* Noise Overlay */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 max-w-4xl mx-auto">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-primary font-bold text-base mb-6"
                            >
                                The pieces people keep coming back for. <br />
                                Find your fit. Lock your style.
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
                            >
                                Invest in your Identity. <br />
                                <span className="italic text-white/80">Own the pieces that define who you are.</span>
                            </motion.h2>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <span className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg group-hover:bg-primary transition-colors duration-300">
                                    Visit Shop <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </Link>
            </div>
        </section>
    );
};

export default GlobalShopBanner;
