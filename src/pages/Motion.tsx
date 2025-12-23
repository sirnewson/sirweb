import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';

const Motion = () => {
    const baseVideos = [
        'https://cdn.midjourney.com/video/d1863d34-2080-4e5f-ab90-f86d66131995/0.mp4',
        'https://cdn.midjourney.com/video/d0d9357e-3c4f-4c97-9092-3808023a06ff/0.mp4',
        'https://cdn.midjourney.com/video/45b2b40c-7aa5-4195-b93f-2d87a66a6157/0.mp4',
        'https://cdn.midjourney.com/video/c675cd10-e960-42bb-bdd3-d0a339707fe9/0.mp4',
        'https://cdn.midjourney.com/video/06212c8e-9d68-43d1-b0ba-4b572b97e3ca/0.mp4',
        'https://cdn.midjourney.com/video/a864a88b-b995-48bd-a424-e45091e46d73/0.mp4'
    ];

    // Repeat videos 3 times
    const videos = [...baseVideos, ...baseVideos, ...baseVideos];

    const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string } | null>(null);

    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<>Motion & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Visuals</span></>}
                subtitle="A Collection of Cinematic Moments"
            />

            <section className="py-24 px-6">
                <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6 max-w-[1920px] mx-auto">
                    {videos.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                            className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 hover:border-primary hover:shadow-[0_0_30px_#BFFF004D] transition-all duration-300 group relative bg-neutral-medium cursor-pointer"
                            onClick={() => setSelectedMedia({ src, title: `Motion Sequence 0${(index % 6) + 1}` })}
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            >
                                <source src={src} type="video/mp4" />
                            </video>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div>
                                    <p className="text-primary text-xs uppercase tracking-widest mb-1">Motion Reel</p>
                                    <h3 className="text-white font-bold text-lg">Sequence 0{(index % 6) + 1}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <MediaModal
                isOpen={!!selectedMedia}
                onClose={() => setSelectedMedia(null)}
                src={selectedMedia?.src || ''}
                title={selectedMedia?.title || ''}
                type="video"
            />

            <Footer />
        </div>
    );
};

export default Motion;
