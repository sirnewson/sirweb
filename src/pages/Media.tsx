import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Media = () => {
    const aiSpotify = [
        'https://open.spotify.com/embed/show/6bSPqenYtlBc7AU6H5sjca?utm_source=generator',
        'https://open.spotify.com/embed/episode/3OzKJg5zMy9FmTv12ADslC?utm_source=generator'
    ];

    const musicSpotify = [
        'https://open.spotify.com/embed/playlist/7ajYnk5oEH9SN9uk5uB2Sr?utm_source=generator',
        'https://open.spotify.com/embed/playlist/5T2xfEPaWhogIZh4nNHDAa?utm_source=generator',
        'https://open.spotify.com/embed/playlist/1N6Tcp6OVpGVXOn8k8Ykza?utm_source=generator',
        'https://open.spotify.com/embed/playlist/3wKE8dfiyWOIGEwUS433YJ?utm_source=generator'
    ];

    const aiVideos = [
        { id: 'Ok-xpKjKp2g', title: 'How AI Works' },
        { id: 'ZvxNlmVnfp4', title: 'Neural Networks' },
        { id: 'k_onqn68GHY', title: 'AI Explained' },
        { id: 'Yq0QkCxoTHM', title: 'Machine Learning' },
        { id: 'nVyD6THcvDQ', title: 'AI Logic' },
        { id: 'aZ5EsdnpLMI', title: 'AI Future' },
        { id: '0bnxF9YfyFI', title: 'Deep Learning' },
        { id: 'nMwiQE8Nsjc', title: 'AI Models' },
        { id: '0xS68sl2D70', title: 'Generative AI' },
        { id: '0yCJMt9Mx9c', title: 'TED AI' },
        { id: 'KKNCiRWd_j0', title: 'TED Future' },
        { id: 'U9d0p96N1iw', title: 'TED Tech' }
    ];

    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Sir Newson Media</span>}
                subtitle="Watch & Listen"
            />

            <div className="px-8 py-12 space-y-24 max-w-[1600px] mx-auto">
                {/* AI & Learning Section */}
                <section>
                    <h2 className="text-4xl font-display font-bold text-white mb-12 pl-4 border-l-4 border-primary">AI & Learning</h2>

                    {/* Spotify Podcasts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {aiSpotify.map((src, index) => (
                            <motion.div
                                key={`ai-spotify-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(191,255,0,0.2)] transition-all duration-500"
                            >
                                <iframe
                                    style={{ borderRadius: '12px' }}
                                    src={src}
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </motion.div>
                        ))}
                    </div>

                    {/* AI Videos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {aiVideos.map((video, index) => (
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
                    <h2 className="text-4xl font-display font-bold text-white mb-12 pl-4 border-l-4 border-[#1DB954]">Music Playlists</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {musicSpotify.map((src, index) => (
                            <motion.div
                                key={`music-spotify-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="rounded-2xl overflow-hidden border border-white/10 hover:border-[#1DB954]/50 hover:shadow-[0_0_30px_rgba(29,185,84,0.2)] transition-all duration-500"
                            >
                                <iframe
                                    style={{ borderRadius: '12px' }}
                                    src={src}
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
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
