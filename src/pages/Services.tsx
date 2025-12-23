import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const servicesData = [
    {
        category: "Creative Design",
        icon: "fa-paint-brush",
        services: [
            { title: "Brand Identity Design", desc: "Clean, timeless logos and full identity systems." },
            { title: "Product Marketing Visuals", desc: "High-end product scenes, 3D edits, and mockups." },
            { title: "Social Media Design", desc: "Posters, carousels, campaigns, and visual storytelling." },
            { title: "3D & AI Visual Creation", desc: "Advanced product manipulation and cinematic AI scenes." }
        ]
    },
    {
        category: "Content & Strategy",
        icon: "fa-chess-queen",
        services: [
            { title: "Content Strategy & Planning", desc: "Daily content pillars for brands and creators." },
            { title: "Reels & Video Editing", desc: "Educative reels, cinematic edits, and storytelling." },
            { title: "Copywriting & Captions", desc: "Hooks, scripts, and persuasive messaging." }
        ]
    },
    {
        category: "Web & AI Development",
        icon: "fa-code",
        services: [
            { title: "Website Design", desc: "Minimal, modern sites for brands and businesses." },
            { title: "Web App Development", desc: "React apps, dashboards, and custom systems." },
            { title: "AI Tool Creation", desc: "Custom AI agents, generators, automations, and workflows." }
        ]
    },
    {
        category: "Music & Audio",
        icon: "fa-music",
        services: [
            { title: "Music Production & Fusions", desc: "Explore Radio mixes and brand sound design." },
            { title: "AI-Enhanced Music Creation", desc: "Suno-guided compositions and vocal concepts." }
        ]
    },
    {
        category: "Media & Brand Story",
        icon: "fa-microphone-alt",
        services: [
            { title: "TAK Network Media", desc: "Tech, AI, business, and football content production." },
            { title: "Brand Messaging & Positioning", desc: "Tone-of-voice, storytelling, and identity alignment." },
            { title: "Drift Notes Writing", desc: "Philosophical reflections, quotes, and ebooks." }
        ]
    },
    {
        category: "Photography & Visual Storytelling",
        icon: "fa-camera",
        services: [
            { title: "Creative Photography Concepts", desc: "Sky art, lifestyle visuals, and narrative images." },
            { title: "Tourism & Cultural Visuals", desc: "Scenes showcasing Kenya’s beauty and culture." }
        ]
    },
    {
        category: "Marketing & Advertising",
        icon: "fa-bullhorn",
        services: [
            { title: "Campaign Design & Execution", desc: "Restaurants, safaris, events, and retail ads." },
            { title: "Product & Luxury Listing Content", desc: "Cars, houses, smartphones, and lifestyle products." }
        ]
    },
    {
        category: "Kids & Education",
        icon: "fa-child",
        services: [
            { title: "Kids eBooks & Storytelling", desc: "Illustrated stories for Ebusoma and YouTube." },
            { title: "Early Learning Systems", desc: "CBC-aligned content and interactive experiences." }
        ]
    },
    {
        category: "Entrepreneurial System Building",
        icon: "fa-rocket",
        services: [
            { title: "Ecommerce & Funnels", desc: "Quick Shopping, Tenacity, and product funnels." },
            { title: "Creative Platforms & Ecosystems", desc: "Travotu, Explore, Pata-Fashion, and more." }
        ]
    }
];

const Services = () => {
    return (
        <div className="bg-neutral-black min-h-screen">
            <Navbar />
            <Hero
                title="Services"
                subtitle="Expertise & Offerings"
            />

            <section className="py-24 px-6 relative">
                {/* Background Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto space-y-32">
                    {servicesData.map((category) => (
                        <div key={category.category} className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-4 mb-12"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary text-xl border border-white/10">
                                    <i className={`fas ${category.icon}`} />
                                </div>
                                <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
                                    {category.category}
                                </h2>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.services.map((service, index) => (
                                    <motion.div
                                        key={service.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group p-8 rounded-2xl bg-neutral-medium border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:bg-white/5"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-white/60 text-sm leading-relaxed">
                                            {service.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>



            {/* Contact CTA */}
            <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
                        Ready to build something <span className="text-primary">iconic</span>?
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                        Whether it's a full brand overhaul, a custom AI tool, or a cinematic visual campaign—let's bring your vision to life.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl shadow-white/5"
                    >
                        <span>Start a Project</span>
                        <i className="fas fa-arrow-right" />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Services;
