import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';

const Motion = () => {
    const baseVideos = [
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/68c95f3b08cbbd8bb6bd69f786162eda/watch', isLandscape: true },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/a5a314e4a0dc189a3abcf9b61a1adddb/watch', isLandscape: true },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/68d09a1216c77a6fbff83ba6ba528c8b/watch', isLandscape: false },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/a85960e0a1a8385f592261c1cce3a444/watch', isLandscape: false },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/b184b7220d7961a078652e118f3d86b8/watch', isLandscape: false },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/8b6b20084e069f2487cbc07340e85114/watch', isLandscape: true },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/da7d2e4ee6a2ecb565bce0dce1011687/watch', isLandscape: true },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/c289565bc74da851e20a630d03918193/watch', isLandscape: true },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/ab73136f10d4b830bc7d96ea7dce458b/watch', isLandscape: false },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/70b1c42a47a620ab80459900e8b1b7a9/watch', isLandscape: false },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/f8568c446ee5471325638b9d3843549f/watch', isLandscape: false },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/7edb7ab544c218b3e31c474ce84a598e/watch', isLandscape: false },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/d24e0d49a2d44a835daa759d5b321a69/watch', isLandscape: false },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/1c66aad99f756dc9c67e5e59a738ee42/watch', isLandscape: true },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/cd0e485a2f749e4840fc95dd184dedab/watch', isLandscape: false },
        { url: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/277237c8d43e0b72da6e66d9ddf98571/watch', isLandscape: false }
    ];

    // Use the videos directly
    const videos = baseVideos;

    const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string } | null>(null);

    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<>Motion & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Visuals</span></>}
                subtitle="A Collection of Cinematic Moments"
            />

            <section className="py-24 px-6">
                <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6 max-w-[1920px] mx-auto">
                    {videos.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                            className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 hover:border-primary hover:shadow-[0_0_30px_#BFFF004D] transition-all duration-300 group relative bg-neutral-medium cursor-pointer"
                            onClick={() => setSelectedMedia({ src: item.url.replace('/watch', '/iframe'), title: `Motion Sequence 0${(index % 16) + 1}` })}
                        >
                            <div className={`relative w-full ${item.isLandscape ? 'aspect-video' : 'aspect-[9/16]'} bg-black`}>
                                <iframe
                                    src={item.url.replace('/watch', '/iframe') + '?autoplay=true&loop=true&muted=true&controls=false'}
                                    className="w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                    allowFullScreen={true}
                                ></iframe>
                                <div className="absolute inset-0 bg-transparent cursor-pointer" onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedMedia({ src: item.url.replace('/watch', '/iframe'), title: `Motion Sequence 0${(index % 16) + 1}` });
                                }}></div>
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                                <div>
                                    <p className="text-primary text-xs uppercase tracking-widest mb-1">Motion Reel</p>
                                    <h3 className="text-white font-bold text-lg">Sequence 0{(index % 16) + 1}</h3>
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
