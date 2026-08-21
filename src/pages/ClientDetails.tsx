import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clientsData } from '../data/clients';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const ClientDetails = () => {
    const { id } = useParams();
    const client = clientsData.find(c => c.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!client) {
        return (
            <div className="min-h-screen bg-neutral-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Client Not Found</h1>
                    <Link to="/clients" className="text-primary hover:text-white transition-colors">Back to Clients</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-neutral-black min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img src={client.image} alt={client.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-black via-neutral-black/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="inline-block px-4 py-1 border border-primary/50 rounded-[8px] text-primary text-sm uppercase tracking-widest mb-6 bg-black/30 backdrop-blur-sm">
                            {client.category}
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
                            {client.name}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Project Info */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-display font-bold text-white mb-8">The Project</h2>
                        <p className="text-white/78 text-lg leading-relaxed mb-12">
                            {client.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <i className="fas fa-bullseye text-primary"></i> The Challenge
                                </h3>
                                <p className="text-white/70 leading-relaxed">{client.challenge}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <i className="fas fa-lightbulb text-primary"></i> The Solution
                                </h3>
                                <p className="text-white/70 leading-relaxed">{client.solution}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-dark p-8 rounded-[12px] border border-white/5 h-fit">
                        <h3 className="text-white font-bold mb-6">Project Details</h3>
                        <ul className="space-y-6">
                            <li className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-white/62">Client</span>
                                <span className="text-white font-medium">{client.name}</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-white/62">Services</span>
                                <span className="text-white font-medium text-right">Branding, Strategy,<br />Digital Design</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-white/62">Year</span>
                                <span className="text-white font-medium">2024</span>
                            </li>
                        </ul>
                        <button className="w-full mt-8 py-4 bg-primary text-white rounded-[10px] font-bold hover:bg-clay hover:text-black transition-all duration-300">
                            Visit Live Site
                        </button>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-20 md:py-28 px-6 bg-neutral-dark border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-display font-bold text-white mb-16 text-center">Visual Identity</h2>
                    <div className="columns-1 md:columns-3 gap-8 space-y-8">
                        {client.gallery.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="rounded-[12px] overflow-hidden border border-white/5 break-inside-avoid"
                            >
                                <img src={img} alt={`${client.name} gallery ${index + 1}`} className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Next Project Navigation */}
            <section className="py-20 md:py-28 px-6 text-center">
                <Link to="/clients" className="inline-flex items-center gap-4 text-white hover:text-primary transition-colors group">
                    <span className="text-lg">View All Projects</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                </Link>
            </section>

            <Footer />
        </div>
    );
};

export default ClientDetails;
