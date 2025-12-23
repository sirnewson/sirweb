import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import DriftCinemaxBanner from '../components/DriftCinemaxBanner';
import WorkCinemaxBanner from '../components/WorkCinemaxBanner';
import PageTransition from '../components/PageTransition';
import MediaModal from '../components/MediaModal';

const Home = () => {
    const principles = [
        { number: '01', title: 'Purpose-Driven', desc: 'Every design decision serves a strategic purpose. Beauty with meaning, not just aesthetics.' },
        { number: '02', title: 'Human-Centered', desc: 'Technology serves people, not the other way around. Empathy and intuition guide the experience.' },
        { number: '03', title: 'Future-Focused', desc: 'Building for today while anticipating tomorrow. Innovation balanced with timeless principles.' },
    ];

    const recentWork = [
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

    const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string; type: 'image' | 'video' } | null>(null);

    return (
        <div className="bg-neutral-black min-h-screen">
            <PageTransition>
                <Hero showButtons={true} />
                <WorkCinemaxBanner />

                {/* Art of Thoughtful Design */}
                <section id="about" className="py-32 px-6 bg-neutral-black relative">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-24"
                        >
                            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 text-white">The Art of Thoughtful Design</h2>
                            <p className="text-primary tracking-widest uppercase text-sm md:text-base">Three principles that guide every project</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {principles.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="border-t border-white/20 pt-8 group hover:border-primary/50 transition-colors duration-300"
                                >
                                    <div className="font-display text-6xl font-bold text-white/10 mb-4 group-hover:text-primary/20 transition-colors duration-300">{item.number}</div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                                    <p className="text-white/70 leading-relaxed group-hover:text-white transition-colors duration-300">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Selected Work */}
                <section id="work" className="py-24 px-6 bg-neutral-black">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Selected Work</h2>
                        <p className="text-white/60">Curated projects and visual explorations</p>
                    </div>
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
                        {recentWork.map((project, index) => (
                            <div
                                key={index}
                                className="group relative block rounded-2xl overflow-hidden break-inside-avoid cursor-pointer"
                                onClick={() => setSelectedMedia({ src: project.image, title: project.title, type: project.type as 'image' | 'video' })}
                            >
                                {project.type === 'video' ? (
                                    <iframe
                                        src={project.image}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none min-h-[400px]"
                                        allow="autoplay; encrypted-media"
                                        frameBorder="0"
                                    ></iframe>
                                ) : (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                    <h3 className="text-white text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                                    <div className="mt-4 text-white text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                        {project.type === 'video' ? 'Watch Video' : 'View Project'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="flex justify-center pb-24 -mt-12 bg-neutral-black">
                    <a
                        href="/gallery"
                        className="px-8 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center gap-2 group"
                    >
                        View More Work <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>

                {/* Trusted By */}
                <section id="clients" className="py-24 px-6 bg-neutral-black border-t border-white/10">
                    <div className="text-center mb-16">
                        <p className="text-primary tracking-[0.2em] uppercase text-sm font-bold">Trusted By</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 max-w-6xl mx-auto opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {[
                            { icon: 'fab fa-google', name: 'Google' },
                            { icon: 'fab fa-microsoft', name: 'Microsoft' },
                            { icon: 'fab fa-spotify', name: 'Spotify' },
                            { icon: 'fab fa-amazon', name: 'Amazon' },
                            { icon: 'fab fa-airbnb', name: 'Airbnb' },
                            { icon: 'fab fa-uber', name: 'Uber' },
                        ].map((client, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 group cursor-default">
                                <i className={`${client.icon} text-4xl md:text-5xl text-white group-hover:text-primary transition-colors duration-300`}></i>
                                <span className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-300">{client.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Biggest Projects */}
                <section className="py-32 px-6 bg-neutral-black relative overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-24">
                            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Ecosystem</p>
                            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">Our Digital Universe</h2>
                            <p className="text-white/60 text-lg max-w-2xl mx-auto">
                                Platforms we've built to empower creators, connect communities, and drive innovation.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'TAK Network',
                                    desc: 'AI & tech media space connecting innovators, creators, and visionaries. Building the future of collaborative tech content.',
                                    tags: ['Community', 'Media', 'Tech'],
                                    link: 'https://taknetwork.online/',
                                    color: 'text-cyan-400',
                                    border: 'hover:border-cyan-400/50',
                                    icon: 'fas fa-globe',
                                    bg: 'from-cyan-400/10 to-transparent'
                                },
                                {
                                    title: 'YXM Digital',
                                    desc: 'AI tools and solutions platform. Empowering businesses with intelligent automation, creative AI, and cutting-edge technology.',
                                    tags: ['AI Tools', 'Solutions', 'Innovation'],
                                    link: 'https://yxm.digital/',
                                    color: 'text-primary',
                                    border: 'hover:border-primary/50',
                                    icon: 'fas fa-robot',
                                    bg: 'from-primary/10 to-transparent'
                                },
                                {
                                    title: 'PataKazi',
                                    desc: "Learn the skills to pivot your career in the AI economy. Or find verified experts to get the job done.",
                                    tags: ['Freelancing', 'Jobs', 'Marketplace'],
                                    link: 'https://www.patakazi.co.ke/',
                                    color: 'text-purple-400',
                                    border: 'hover:border-purple-400/50',
                                    icon: 'fas fa-briefcase',
                                    bg: 'from-purple-400/10 to-transparent'
                                }
                            ].map((project, index) => (
                                <a
                                    key={index}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative bg-neutral-medium p-10 rounded-3xl border border-white/5 ${project.border} transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10">
                                        <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-8 ${project.color} group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20`}>
                                            <i className={project.icon}></i>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-4 font-display">{project.title}</h3>
                                        <p className="text-white/60 leading-relaxed mb-8 min-h-[80px]">{project.desc}</p>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1 rounded-full bg-black/20 text-xs text-white/50 uppercase tracking-wider border border-white/5 backdrop-blur-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${project.color}`}>
                                            Visit {project.title} <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Learn AI Section */}
                <section className="py-32 px-6 bg-neutral-dark border-y border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <div className="inline-block p-4 rounded-full bg-primary/10 mb-8 animate-pulse">
                            <i className="fas fa-sparkles text-3xl text-primary"></i>
                        </div>
                        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            Learn How to Generate <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">with AI Today</span>
                        </h2>
                        <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            Ready to unlock the power of AI for your creative projects? Book a personalized session and discover how to bring your imagination to life with cutting-edge AI tools.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a
                                href="mailto:sirnewson@gmail.com"
                                className="px-10 py-5 rounded-full bg-neutral-medium border border-white/10 text-white font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 min-w-[200px]"
                            >
                                <i className="fas fa-envelope mr-2"></i> Book via Email
                            </a>
                            <a
                                href="https://wa.me/254702480771?text=Hi,%20I'd%20like%20to%20book%20a%20personalized%20AI%20training%20session."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-10 py-5 rounded-full bg-primary text-black font-bold text-lg hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(191,255,0,0.3)] hover:shadow-[0_0_50px_rgba(191,255,0,0.5)] min-w-[200px]"
                            >
                                <i className="fab fa-whatsapp mr-2"></i> WhatsApp
                            </a>
                        </div>
                    </div>
                </section>

                {/* Testimonial */}
                <section className="py-40 px-6 bg-neutral-black relative overflow-hidden">
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <i className="fas fa-quote-left text-5xl text-primary/50 mb-8 block" />
                        <blockquote className="font-display text-2xl md:text-4xl font-bold text-white leading-relaxed mb-12">
                            "Sir Newson didn't just design a website; they crafted a digital soul for our brand. The attention to detail and the seamless blend of art and function is unlike anything we've seen."
                        </blockquote>
                        <cite className="not-italic block mb-12">
                            <span className="block font-bold text-primary mb-2">Sarah Jenkins</span>
                            <span className="text-white/70 text-sm">CEO, Future Finance</span>
                        </cite>

                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Drift Library</h2>

                        <p className="text-white/60 mb-8 text-lg">
                            A global archive of essays exploring the architecture of the mind, the digital soul, and the quiet spaces in between.
                        </p>
                        <a href="https://thedriftlibrary.yxm.digital/" target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-4 bg-primary text-black rounded-full font-semibold hover:bg-white transition-colors shadow-lg shadow-primary/20">
                            Start Reading
                        </a>
                    </div>

                    <div className="mt-12">
                        <DriftCinemaxBanner />
                    </div>
                </section>

                <MediaModal
                    isOpen={!!selectedMedia}
                    onClose={() => setSelectedMedia(null)}
                    src={selectedMedia?.src || ''}
                    title={selectedMedia?.title || ''}
                    type={selectedMedia?.type || 'image'}
                />

                <Footer />
            </PageTransition>
        </div>
    );
};

export default Home;
