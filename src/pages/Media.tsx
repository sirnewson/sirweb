import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Media = () => {
    const learningVideos = [
        { id: '_nZZ2En2HJU', title: 'Video 1' },
        { id: 'mzQXULlPmcA', title: 'Video 2' },
        { id: 'fF4Ipu6zKmQ', title: 'Video 3' },
        { id: 'IiuopJlYIis', title: 'Video 4' },
    ];

    const musicVideos = [
        { id: 'dCLEeJY5SHA', title: 'Music 1' },
        { id: 'EDFo2TGNLAw', title: 'Music 2' },
        { id: 'FchYPEazSds', title: 'Music 3' },
        { id: 'hsMHaX4v08w', title: 'Music 4' },
    ];



    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Sir Newson Media</span>}
                subtitle="Watch & Listen"
            />

            <div className="px-8 py-12 space-y-16 max-w-[1600px] mx-auto">
                {/* Learning Section */}
                <section>
                    <h2 className="text-4xl font-display font-bold text-white mb-12 pl-4 border-l-4 border-primary">Learning</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {learningVideos.map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(191,255,0,0.2)] transition-all duration-500 aspect-video"
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto"
                                ></iframe>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Music Section */}
                <section>
                    <h2 className="text-4xl font-display font-bold text-white mb-12 pl-4 border-l-4 border-secondary">Music</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {musicVideos.map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500 aspect-video"
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto"
                                ></iframe>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Drift Tv Section */}
                <section>
                    <h2 className="text-4xl font-display font-bold text-white mb-12 pl-4 border-l-4 border-white">Drift Tv</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { id: 'q_BKt1-O5rU', title: 'Drift Tv 1' },
                            { id: '0xm7FEyCVEo', title: 'Drift Tv 2' },
                            { id: 'wcLglidDLiQ', title: 'Drift Tv 3' },
                            { id: '4ToTt-gjsdg', title: 'Drift Tv 4' },
                        ].map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500 aspect-video"
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto"
                                ></iframe>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

                                {/* Watch More Button */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pointer-events-none">
                                    <button className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                                        Watch More
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Media;
