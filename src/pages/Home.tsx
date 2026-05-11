import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import MediaModal from '../components/MediaModal';

const Home = () => {
    useEffect(() => {
        document.title = "Sir Newson | Creative Direction, Brand Identity & Premium Visual Systems";
    }, []);

    const dashboardCards = [
        { name: 'Work', path: '/work', desc: 'Selected visual concepts', icon: 'fas fa-briefcase' },
        { name: 'Projects', path: '/projects', desc: 'Creative ecosystems', icon: 'fas fa-layer-group' },
        { name: 'Services', path: '/services', desc: 'Design & tech systems', icon: 'fas fa-pen-nib' },
        { name: 'Gallery', path: '/gallery', desc: 'Visual archive', icon: 'fas fa-image' },
        { name: 'Motion', path: '/motion', desc: 'Cinematic movement', icon: 'fas fa-video' },
        { name: 'Media', path: '/media', desc: 'Stories & publishing', icon: 'fas fa-newspaper' },
        { name: 'Wynmind', path: '/drift-notes', desc: 'Thinking wing', icon: 'fas fa-brain' },
        { name: 'Shop', path: '/shop', desc: 'Digital & physical goods', icon: 'fas fa-shopping-cart' },
    ];

    const recentWork = [
        { title: 'The Gikonyore Experience', image: '/assets/images/recent_work_gikonyore.webp', type: 'image', desc: 'Cinematic brand experience and visual storytelling.' },
        { title: 'DJ Dibul Brand Identity', image: '/assets/images/recent_work_dj_dibul_wide.webp', type: 'image', desc: 'Comprehensive visual identity system and motion concepts.' },
        { title: 'Saturday Dosage Season 4', image: '/assets/images/recent_work_saturday_dosage_wide.webp', type: 'image', desc: 'Campaign visuals and digital rollout strategy.' },
        { title: 'Midnight Poetry Tour', image: '/assets/images/recent_work_midnight_poetry.webp', type: 'image', desc: 'Atmospheric visual concepts for live events and tours.' },
        { title: 'Big Voices Fest', image: '/assets/images/recent_work_big_voices_fest.webp', type: 'image', desc: 'Event branding and digital asset production.' },
        { title: 'Tenacity Locks Xmas', image: '/assets/images/recent_work_tenacity_locks_xmas.webp', type: 'image', desc: 'Product visuals and seasonal campaign direction.' }
    ];

    const services = [
        { title: 'Brand Identity & Visual Systems', desc: 'Logos, typography, color direction, brand mood, identity systems, and visual rules that create a consistent premium presence.', includes: ['Identity direction', 'Visual mood system', 'Campaign look and feel', 'Social media design direction', 'Brand usage guide'], link: '/services' },
        { title: 'Website & Digital Presence', desc: 'Clean, intentional websites designed to feel modern, trustworthy, and easy to explore across every screen.', includes: ['UX/UI Design', 'Frontend Development', 'Motion & Interactions', 'Performance Optimization', 'SEO Infrastructure'], link: '/services' },
        { title: 'Creative Direction', desc: 'Visual concepts, campaign direction, content moodboards, layouts, and storytelling systems for brands that need a stronger creative voice.', includes: ['Custom AI workflows', 'Prompt engineering', 'Concept generation', 'High-fidelity renders', 'Asset libraries'], link: '/services' },
        { title: 'Editorial & Content Design', desc: 'Carousels, campaign visuals, social visuals, presentations, brand stories, and marketing materials designed with clarity and polish.', includes: ['Social Media Visuals', 'Carousels & Layouts', 'Brand Storytelling', 'Presentations', 'Print Ready Assets'], link: '/services' }
    ];

    const digitalGoods = [
        { title: 'Prompt Vaults', icon: 'fas fa-terminal', status: 'Coming Soon' },
        { title: 'Visual Packs', icon: 'fas fa-layer-group', status: 'Available' },
        { title: 'Brand Templates', icon: 'fas fa-object-group', status: 'Available' },
        { title: 'Wall Art', icon: 'fas fa-image', status: 'Available' },
    ];

    const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string; type: 'image' | 'video' } | null>(null);

    return (
        <div className="bg-neutral-black min-h-screen">
            <PageTransition>
                <Hero 
                    showButtons={true} 
                    title={<>Creative Direction for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Visual Brands & Digital Systems</span></>}
                    subtitle="Creative Direction for Businesses"
                    shortParagraph="I help ambitious brands shape their identity, websites, content, and creative workflows into experiences people can feel, trust, and remember."
                />

                {/* Floating Cream Dashboard */}
                <section className="relative z-30 -mt-16 md:-mt-24 px-6 max-w-7xl mx-auto mb-40">
                    <div className="bg-[rgba(238,255,244,0.92)] backdrop-blur-xl rounded-[28px] p-8 md:p-12 border border-black/5 shadow-[0_20px_60px_rgba(1,17,17,0.08)]">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {dashboardCards.map((card, i) => (
                                <Link 
                                    key={i} 
                                    to={card.path}
                                    className="group block p-6 rounded-[20px] bg-[#011111] border border-white/5 hover-dark-lime-waves hover:border-primary/50 transition-all duration-300 shadow-lg"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                                        <i className={`${card.icon} text-lg text-white/70 group-hover:text-primary`}></i>
                                    </div>
                                    <h3 className="font-display font-bold text-xl text-white mb-2">{card.name}</h3>
                                    <p className="text-white/50 text-sm hidden md:block">{card.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Selected Work */}
                <section id="work" className="py-32 md:py-40 px-6 bg-neutral-black relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                            <div>
                                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Selected Work with a Sense of Identity</h2>
                                <p className="text-white/60 max-w-2xl">A curated collection of brand visuals, websites, campaigns, and creative systems shaped with clarity, restraint, and emotional presence.</p>
                            </div>
                            <Link to="/work" className="hidden md:flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
                                View All <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {recentWork.map((project, index) => (
                                <Link to="/work" key={index} className="group flex flex-col bg-[#011111] rounded-[28px] overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500 shadow-[0_20px_60px_rgba(1,17,17,0.08)]">
                                    <div 
                                        className="relative h-[300px] md:h-[400px] overflow-hidden cursor-pointer"
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-widest border border-white/10">
                                                Visual System
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-white text-2xl font-bold mb-2 font-display">{project.title}</h3>
                                        <p className="text-white/60 mb-6">{project.desc}</p>
                                        <div className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors">
                                            View Case <i className="fas fa-arrow-right"></i>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What I Build */}
                <section className="py-32 md:py-40 px-6 bg-[#011111] border-y border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Built for Brands That Care How They Are Remembered</h2>
                            <p className="text-white/60 max-w-3xl mx-auto text-lg mb-6">
                                Sir Newson is a creative direction and visual design studio focused on building refined brand identities, digital experiences, and visual systems. The work blends strategy, simplicity, storytelling, and a strong sense of atmosphere to help brands communicate with clarity and confidence.
                            </p>
                            <p className="text-white/60 max-w-3xl mx-auto text-lg">
                                The goal is not just to make things look good. It is to create a visual presence that feels trusted, elevated, and unmistakably aligned with the brand’s next level.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="bg-neutral-black p-8 md:p-10 rounded-[28px] border border-white/5 hover:border-primary/30 transition-all duration-300 flex flex-col h-full shadow-[0_20px_60px_rgba(1,17,17,0.08)]">
                                    <h3 className="text-2xl font-bold text-white mb-4 font-display">{service.title}</h3>
                                    <p className="text-white/60 mb-8 flex-grow">{service.desc}</p>
                                    
                                    <div className="mb-8">
                                        <p className="text-xs uppercase tracking-widest text-primary font-bold mb-4">Includes</p>
                                        <ul className="space-y-2">
                                            {service.includes.map((item, i) => (
                                                <li key={i} className="text-white/80 text-sm flex items-center gap-3">
                                                    <i className="fas fa-check text-primary text-xs"></i> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <Link to={service.link} className="inline-flex items-center justify-center w-full py-4 rounded-full bg-white/5 text-white font-bold hover:bg-primary hover:text-black transition-all duration-300">
                                        Let's Build
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Wynmind Feature */}
                <section className="py-32 px-6 bg-neutral-black relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15]"></div>
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="bg-[#011111] border border-white/10 rounded-[40px] p-10 md:p-20 text-center shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8">
                                <img src="https://i.ibb.co/BHzH7zP8/normal-logo.png" alt="Wynmind Logo" className="h-8 object-contain drop-shadow-[0_0_10px_rgba(191,255,0,0.5)] invert opacity-80" />
                            </div>
                            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">Wynmind</h2>
                            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                                A reflective space for ideas, visual thoughts, inner worlds, and drift notes. Win your mind. Through awareness.
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                {['Mental Clarity', 'Creative Awareness', 'Inner Visual Worlds'].map((tag, i) => (
                                    <span key={i} className="px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <Link to="/drift-notes" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-black font-bold text-lg hover:bg-white transition-all duration-300">
                                Enter Wynmind <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Digital Goods Preview */}
                <section className="py-32 md:py-40 px-6 bg-[#011111] border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                            <div className="max-w-2xl">
                                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Digital Goods</h2>
                                <p className="text-white/60">Tools, prompts, templates, and creative assets built for faster thinking and better execution.</p>
                            </div>
                            <Link to="/shop" className="hidden md:flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
                                View Shop <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {digitalGoods.map((item, i) => (
                                <Link key={i} to="/shop" className="group bg-neutral-black rounded-[24px] p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 text-center shadow-[0_20px_60px_rgba(1,17,17,0.08)]">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                        <i className={`${item.icon} text-2xl text-white/50 group-hover:text-primary`}></i>
                                    </div>
                                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                                    <span className="text-xs uppercase tracking-widest text-white/40">{item.status}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32 px-6 bg-neutral-black border-t border-white/5">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">
                            Got an idea that <br/><span className="text-primary italic font-serif">needs form?</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link to="/contact" className="px-10 py-5 rounded-full bg-primary text-black font-bold text-lg hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(191,255,0,0.2)] hover:shadow-[0_0_50px_rgba(191,255,0,0.4)]">
                                Start a Project
                            </Link>
                            <Link to="/work" className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300">
                                View Work
                            </Link>
                        </div>
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
