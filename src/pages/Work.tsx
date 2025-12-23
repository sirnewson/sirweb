import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';

import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';

import { Link } from 'react-router-dom';
import { clientsData } from '../data/clients';
import ParallaxImageRows from '../components/ParallaxImageRows';

const Work = () => {
    const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string; type: 'image' | 'video' } | null>(null);

    // Get 5 images from specific clients for Recent Work
    const targetClients = ['muthokinju', 'mkurugenzi', 'tenacity-locks'];
    const clientRecentWork = targetClients.flatMap(clientId => {
        const client = clientsData.find(c => c.id === clientId);
        if (!client) return [];
        // Take first 5 images from each client's gallery
        return client.gallery.slice(0, 5).map((img) => ({
            title: `${client.name}`,
            image: img,
            type: 'image'
        }));
    });

    const miscRecentWork = [
        { title: 'Matatu Culture', image: '/assets/images/matatu_964f2996.webp', type: 'image' },
        { title: 'Amber Ray', image: '/assets/images/AMBER-RAY_dd19587e.webp', type: 'image' },
        { title: 'Main Audio', image: '/assets/images/Main-Audio-Cover_39e05667.webp', type: 'image' },
        { title: 'Flaqo Draft', image: '/assets/images/flaqo-draft-progress_79469446.webp', type: 'image' },
        { title: 'Josae 1M', image: '/assets/images/josae-1m_026dd95f.webp', type: 'image' },
        { title: 'Vibes Profile', image: '/assets/images/vibes-profile-cover_7ccfe994.webp', type: 'image' }
    ];

    // Combine and shuffle, then take 9
    const recentWork = [...clientRecentWork, ...miscRecentWork].slice(0, 9);

    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Selected Work</span>}
                subtitle="Curated Projects"
            />

            {/* Client Showcase (Parallax Rows) */}
            <section className="py-24 px-0 bg-neutral-black border-b border-white/5">
                <ParallaxImageRows
                    topRowImages={clientsData.slice(0, 5).map(c => c.image)}
                    bottomRowImages={clientsData.slice(5).map(c => c.image)}
                />
            </section>

            {/* Recent Work Section */}
            <section className="py-24 px-6 bg-neutral-dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Recent Work</h2>
                        <p className="text-white/60">Latest projects showcasing creative direction and design excellence</p>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                        {[...recentWork, ...recentWork].map((work, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="relative rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 group cursor-pointer break-inside-avoid"
                                onClick={() => setSelectedMedia({ src: work.image, title: work.title, type: work.type as 'image' | 'video' })}
                            >
                                {work.type === 'video' ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                    >
                                        <source src={work.image} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={work.image}
                                        alt={work.title}
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <p className="text-white text-xs font-bold uppercase tracking-widest text-center px-2">{work.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Grid */}
            <section className="py-24 px-6 bg-neutral-dark border-y border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Philosophy</p>
                        <h2 className="font-display text-4xl font-bold text-white">The Art & Thought of Design</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { number: '01', icon: 'fas fa-eye', title: 'Vision', desc: 'See beyond the obvious. Design starts with seeing what others miss.' },
                            { number: '02', icon: 'fas fa-brain', title: 'Strategy', desc: 'Every pixel serves a purpose. Every color tells a story.' },
                            { number: '03', icon: 'fas fa-heart', title: 'Emotion', desc: 'Design that moves people. Create connections, not just aesthetics.' },
                            { number: '04', icon: 'fas fa-rocket', title: 'Innovation', desc: 'Push boundaries. Challenge conventions. Create the unexpected.' },
                            { number: '05', icon: 'fas fa-balance-scale', title: 'Balance', desc: 'Harmony between chaos and order. Beauty in simplicity.' },
                            { number: '06', icon: 'fas fa-bolt', title: 'Impact', desc: 'Design that creates change. Work that leaves a mark.' },
                            { number: '07', icon: 'fas fa-infinity', title: 'Evolution', desc: 'Continuous growth. Never settle. Always improving.' },
                            { number: '08', icon: 'fas fa-star', title: 'Excellence', desc: 'Obsess over details. Craft matters. Quality over quantity.' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-neutral-medium p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-300 text-center group"
                            >
                                <div className="font-display text-6xl font-bold text-primary/20 mb-4 group-hover:text-primary/40 transition-colors">{item.number}</div>
                                <div className="text-3xl text-primary mb-6"><i className={item.icon}></i></div>
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Creative Partnerships (Interactive Grid) */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Collaborations</p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Creative Partnerships</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {clientsData.map((client, index) => (
                            <Link to={`/clients/${client.id}`} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/5"
                                >
                                    {/* Background Image */}
                                    <img
                                        src={client.image}
                                        alt={client.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                    {/* Border Glow Effect */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-300 pointer-events-none" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="text-primary text-xs uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            {client.category}
                                        </div>
                                        <h3 className="text-white text-xl font-bold font-display leading-tight group-hover:text-primary transition-colors duration-300">
                                            {client.name}
                                        </h3>
                                        <div className="h-1 w-0 bg-primary mt-3 group-hover:w-12 transition-all duration-500 delay-200" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <MediaModal
                isOpen={!!selectedMedia}
                onClose={() => setSelectedMedia(null)}
                src={selectedMedia?.src || ''}
                title={selectedMedia?.title || ''}
                type={selectedMedia?.type || 'image'}
            />
        </div>
    );
};

export default Work;
