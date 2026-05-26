import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Hero from '../components/Hero';

import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';

import { Link } from 'react-router-dom';
import { clientsData } from '../data/clients';
import ParallaxImageRows from '../components/ParallaxImageRows';

const Work = () => {
    useEffect(() => {
        document.title = "Selected Work | Brand Identity, Websites & Visual Storytelling by Sir Newson";
    }, []);

    const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string; type: 'image' | 'video' } | null>(null);

    // Get 5 images from specific clients for Recent Work
    const recentWork = [
        { title: 'Wild Idea', image: '/assets/images/recent_images/wild-idea.webp', type: 'image' },
        { title: 'Profile', image: '/assets/images/recent_images/profilee.webp', type: 'image' },
        { title: 'Silver', image: '/assets/images/recent_images/silver.webp', type: 'image' },
        { title: 'Countrywide', image: '/assets/images/recent_images/countrywide-1.webp', type: 'image' },
        { title: 'Fun Concept', image: '/assets/images/recent_images/fun-concept.webp', type: 'image' },
        { title: 'Youtube', image: '/assets/images/recent_images/youytubeee.webp', type: 'image' },
        { title: 'Cartoon', image: '/assets/images/recent_images/cartoon.webp', type: 'image' },
        { title: 'Njugush 3M Post', image: '/assets/images/recent_images/njugush-3m-post.webp', type: 'image' },
        { title: 'Post File', image: '/assets/images/recent_images/post-file.webp', type: 'image' },
        { title: 'The Gikonyore Experience', image: '/assets/images/recent_work_gikonyore.webp', type: 'image' },
        { title: 'Saturday Dosage Season 4', image: '/assets/images/recent_work_saturday_dosage_wide.webp', type: 'image' },
        { title: 'DJ Dibul Brand Identity', image: '/assets/images/recent_work_dj_dibul_wide.webp', type: 'image' },
        { title: 'Motion Reel 01', image: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/68c95f3b08cbbd8bb6bd69f786162eda/iframe?autoplay=true&loop=true&muted=true&controls=false', type: 'video' },
        { title: 'Midnight Poetry Tour', image: '/assets/images/recent_work_midnight_poetry.webp', type: 'image' },
        { title: 'Mkurugenzi Hoodies', image: '/assets/images/recent_work_mkurugenzi_hoodies_men.webp', type: 'image' },
        { title: 'Motion Reel 02', image: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/a5a314e4a0dc189a3abcf9b61a1adddb/iframe?autoplay=true&loop=true&muted=true&controls=false', type: 'video' },
        { title: 'Big Voices Fest', image: '/assets/images/recent_work_big_voices_fest.webp', type: 'image' },
        { title: 'Tenacity Locks Xmas', image: '/assets/images/recent_work_tenacity_locks_xmas.webp', type: 'image' },
        { title: 'Saturday Dosage Character', image: '/assets/images/recent_work_saturday_dosage_portrait.webp', type: 'image' },
        { title: 'Mkurugenzi Women', image: '/assets/images/recent_work_mkurugenzi_hoodies_women.webp', type: 'image' },
        { title: 'DJ Dibul Portrait', image: '/assets/images/recent_work_dj_dibul_portrait.webp', type: 'image' },
        { title: 'KAB Project', image: '/assets/images/kab-1_61b51219.webp', type: 'image' },
        { title: 'Billboard Design', image: '/assets/images/billbaord_ea33edfb.webp', type: 'image' },
        { title: 'Motion Reel 03', image: 'https://customer-zeyxzc88epauzzxx.cloudflarestream.com/68d09a1216c77a6fbff83ba6ba528c8b/iframe?autoplay=true&loop=true&muted=true&controls=false', type: 'video' },
        { title: 'Cleaning Concept', image: '/assets/images/cleanshelf-concept-3_3b0dacbc.webp', type: 'image' },
    ];

    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Selected Work</span>}
                subtitle="Selected Work with a Sense of Identity"
                shortParagraph="A curated collection of brand visuals, websites, campaigns, and creative systems shaped with clarity, restraint, and emotional presence."
            />

            {/* Client Showcase (Parallax Rows) */}
            <section className="py-16 md:py-24 px-0 bg-neutral-black border-b border-white/5">
                <ParallaxImageRows
                    topRowImages={clientsData.slice(0, 5).map(c => c.image)}
                    bottomRowImages={clientsData.slice(5).map(c => c.image)}
                />
            </section>

            {/* Recent Work Section */}
            <section className="py-16 md:py-24 px-6 bg-neutral-dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Recent Work</h2>
                        <p className="text-white/60">Latest projects showcasing creative direction and design excellence</p>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                        {recentWork.map((work, index) => (
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
            <section className="py-16 md:py-24 px-6 bg-neutral-dark border-y border-white/10">
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
            <section className="py-20 md:py-32 px-6">
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

            {/* Branding Section */}
            <section className="py-16 md:py-24 px-6 bg-neutral-dark border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Visual Identity</p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Branding</h2>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
                        {[
                            { title: 'New Home of Fashion', image: '/assets/images/branding/NEW HOME OF FAHION.webp' },
                            { title: 'Tech 2', image: '/assets/images/branding/TECH 2.webp' },
                            { title: 'Branding Board', image: '/assets/images/branding/branding board.webp' },
                            { title: 'Logo', image: '/assets/images/branding/logo.webp' },
                            { title: 'Main Logo', image: '/assets/images/branding/main logo oon yellow.webp' },
                            { title: 'White', image: '/assets/images/branding/white.webp' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: (index % 4) * 0.05 }}
                            >
                                <TiltCard onClick={() => setSelectedMedia({ src: item.image, title: item.title, type: 'image' })}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </TiltCard>
                            </motion.div>
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

const TiltCard = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="break-inside-avoid rounded-xl overflow-hidden border border-white/10 hover:border-primary hover:shadow-[0_0_30px_#BFFF004D] transition-all duration-300 group mb-4 cursor-pointer relative bg-white/5"
        >
            <div style={{ transform: "translateZ(20px)" }} className="p-4">
                {children}
            </div>
        </motion.div>
    );
};

export default Work;
