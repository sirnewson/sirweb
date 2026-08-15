import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projectsData.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) return <div>Project not found</div>;

    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={project.title}
                subtitle={project.category}
            />

            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-2xl md:text-3xl text-white/85 leading-relaxed font-display">
                        {project.details}
                    </p>
                </div>
            </section>

            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.gallery.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="rounded-[12px] overflow-hidden border border-white/10 hover:border-primary/50 transition-colors"
                        >
                            <img src={img} alt="Project detail" className="w-full h-full object-cover" />
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className="text-center py-24">
                <Link to="/projects" className="inline-block px-8 py-3 rounded-[8px] border border-white/20 text-white hover:bg-clay hover:text-black transition-all">
                    Back to Projects
                </Link>
            </div>

            <Footer />
        </div>
    );
};

export default ProjectDetails;
