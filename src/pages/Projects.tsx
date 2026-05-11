import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

import Footer from '../components/Footer';
import { projectsData } from '../data/projects';

const Projects = () => {
    useEffect(() => {
        document.title = "Creative Projects, Digital Systems & Visual Ideas | Sir Newson";
    }, []);
    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<>Ideas Built <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Beyond the Brief</span></>}
                subtitle="Creative Branches"
                shortParagraph="Some projects begin as client work. Others begin as curiosity, culture, storytelling, or a need to create something useful. This space brings together the systems, platforms, and visual ideas I am building over time."
            />

            <section className="py-32 px-6 relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {projectsData.map((project, index) => (
                        <Link to={`/projects/${project.id}`} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative bg-neutral-medium/30 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 hover:border-transparent transition-all duration-500"
                            >
                                {/* Gradient Border Glow on Hover */}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-[1px] -z-10 bg-neutral-black rounded-3xl" />

                                {/* Image */}
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-8 relative">
                                    <div className="text-primary text-xs uppercase tracking-widest mb-2 font-bold">{project.category}</div>
                                    <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-white text-sm font-medium group-hover:gap-4 transition-all">
                                        <span>Explore Concept</span>
                                        <i className="fas fa-arrow-right text-primary"></i>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>



            {/* Website Showcase Grid */}
            <section className="py-32 px-6 bg-neutral-dark border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Live Projects</p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Digital Experiences</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { title: 'Visuals Eta', url: 'https://visuals-eta.vercel.app/', image: '/assets/images/screenshots/visuals_eta.webp' },
                            { title: 'Web Gallery Game', url: 'https://webgallerygame.vercel.app/', image: '/assets/images/screenshots/web_gallery.webp' },
                            { title: 'UTube Player', url: 'https://utubeplayer-mu.vercel.app/', image: '/assets/images/screenshots/utube_player.webp' },
                            { title: 'Solitaire Dark', url: 'https://solitaire-six-black.vercel.app/', image: '/assets/images/screenshots/solitaire_dark.webp' },
                            { title: 'Sphere Audio', url: 'https://sphereaudio.vercel.app/', image: '/assets/images/screenshots/sphere_audio.webp' },
                            { title: 'Particle Ad', url: 'https://particlead.vercel.app/', image: '/assets/images/screenshots/particle_ad.webp' },
                            { title: 'Dimensional Two', url: 'https://dimensional-two.vercel.app/', image: '/assets/images/screenshots/dimensional_two.webp' },
                            { title: 'Wak Two', url: 'https://wak-two.vercel.app/', image: '/assets/images/screenshots/wak_two.webp' },
                            { title: 'Driftpad', url: 'https://driftpad.yxm.digital/', image: '/assets/images/screenshots/driftpad.webp' },
                            { title: 'TAK Network', url: 'https://taknetwork.online/', image: '/assets/images/screenshots/tak_network.webp' },
                            { title: 'YXM Digital', url: 'https://yxm.digital/', image: '/assets/images/screenshots/yxm_digital.webp' },
                            { title: 'PataKazi', url: 'https://www.patakazi.co.ke/', image: '/assets/images/screenshots/patakazi.webp' },
                            { title: 'WallTV', url: 'https://walltv.vercel.app/', image: '/assets/images/screenshots/walltv.webp' },
                            { title: 'OrdaFasta', url: 'https://www.ordafasta.co.ke/', image: '/assets/images/screenshots/ordafasta.webp' },
                            { title: 'FlowClock', url: 'https://flowclock-rose.vercel.app/', image: '/assets/images/screenshots/flowclock.webp' },
                            { title: 'Finder YXM', url: 'https://finder.yxm.digital/', image: '/assets/images/screenshots/finder_yxm.webp' },
                            { title: 'CaptionsMaster', url: 'https://captionsmaster.yxm.digital/', image: '/assets/images/screenshots/captionsmaster.webp' }
                        ].map((site, index) => (
                            <motion.a
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl bg-neutral-medium"
                            >
                                <div className="aspect-[16/10] overflow-hidden bg-neutral-800">
                                    <img
                                        src={site.image}
                                        alt={site.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'https://placehold.co/600x400/1a1a1a/FFF?text=' + encodeURIComponent(site.title);
                                        }}
                                    />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-display font-bold text-white mb-2">{site.title}</h3>
                                    <div className="flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        <span>View Website</span>
                                        <i className="fas fa-external-link-alt text-sm"></i>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Projects;
