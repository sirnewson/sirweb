import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const servicesData = [
    {
        category: "Brand Identity & Visual Systems",
        icon: "fa-fingerprint",
        services: [
            { title: "Identity Design", desc: "Logos, typography, color direction, and brand mood." },
            { title: "Brand Systems", desc: "Visual rules that create a consistent premium presence." },
            { title: "Visual Language", desc: "Establishing a timeless and refined aesthetic for modern brands." }
        ]
    },
    {
        category: "Website & Digital Presence",
        icon: "fa-laptop-code",
        services: [
            { title: "Intentional Web Design", desc: "Clean, intentional websites designed to feel modern and trustworthy." },
            { title: "User Experience", desc: "Easy to explore interfaces across every screen and device." },
            { title: "Digital Ecosystems", desc: "Scalable digital platforms built for long-term growth." }
        ]
    },
    {
        category: "Creative Direction",
        icon: "fa-compass",
        services: [
            { title: "Visual Concepts", desc: "Creative vision and direction for brands that need a stronger voice." },
            { title: "Campaign Direction", desc: "End-to-end guidance for high-impact visual campaigns." },
            { title: "Storytelling Systems", desc: "Content moodboards, layouts, and narrative structures." }
        ]
    },
    {
        category: "Editorial & Content Design",
        icon: "fa-book-open",
        services: [
            { title: "Social Visuals", desc: "Carousels, campaign visuals, and brand stories designed with clarity." },
            { title: "Marketing Materials", desc: "Presentations and sales assets with a polished, premium feel." },
            { title: "Content Architecture", desc: "Structuring editorial content for maximum emotional resonance." }
        ]
    },
    {
        category: "Motion & Visual Storytelling",
        icon: "fa-film",
        services: [
            { title: "Cinematic Visuals", desc: "High-end motion concepts and atmospheric creative assets." },
            { title: "Brand Reels", desc: "Dynamic video content that helps ideas feel alive." },
            { title: "Immersive Experiences", desc: "Motion design that captivates and holds attention." }
        ]
    }
];

const Services = () => {
    useEffect(() => {
        document.title = "Creative Direction & Brand Design Services in Kenya | Sir Newson";
    }, []);

    return (
        <div className="bg-neutral-black min-h-screen">
            <Navbar />
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Premium Services</span>}
                subtitle="Creative Direction & Brand Design"
                shortParagraph="Bespoke creative direction, brand identity systems, and digital experiences designed for ambitious brands that want to be remembered."
            />

            <section className="py-16 md:py-24 px-6 relative">
                {/* Background Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto space-y-16 md:space-y-32">
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
            <section className="py-16 md:py-24 px-6 border-t border-white/5 relative overflow-hidden">
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
