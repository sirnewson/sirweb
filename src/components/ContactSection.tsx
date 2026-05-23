import { motion } from 'framer-motion';

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-6 bg-neutral-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Get in Touch</p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Let's Build Something With Presence</h2>
                    <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Whether you are shaping a new brand, refining an existing identity, launching a website, or building a visual direction for your next chapter, I would love to hear what you are working on.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-neutral-medium/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
                    >
                        <form className="space-y-6" onSubmit={(e) => {
                            e.preventDefault();
                            const name = (document.getElementById('name') as HTMLInputElement).value;
                            const email = (document.getElementById('email') as HTMLInputElement).value;
                            const message = (document.getElementById('message') as HTMLTextAreaElement).value;

                            const whatsappMessage = `Hi Sir Newson, my name is ${name} (${email}). ${message}`;
                            const whatsappUrl = `https://wa.me/254702480771?text=${encodeURIComponent(whatsappMessage)}`;

                            window.open(whatsappUrl, '_blank');
                        }}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full bg-neutral-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full bg-neutral-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    className="w-full bg-neutral-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="Tell me about your project..."
                                    defaultValue={new URLSearchParams(window.location.search).get('interest') ? `Hi, I'm interested in ${new URLSearchParams(window.location.search).get('interest')}.` : ''}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-black font-bold py-4 rounded-lg hover:bg-white transition-colors duration-300 shadow-[0_0_20px_#BFFF004D] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2"
                            >
                                <i className="fab fa-whatsapp text-xl"></i>
                                Start a Project
                            </button>
                        </form>
                    </motion.div>

                    {/* Social Links & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
                            <div className="flex flex-wrap gap-4">
                                <a href="https://twitter.com/sirnewson" target="_blank" rel="noopener noreferrer" className="w-12 h-12 clip-hexagon bg-neutral-medium flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 group shadow-lg">
                                    <i className="fab fa-twitter text-lg group-hover:scale-110 transition-transform"></i>
                                </a>
                                <a href="https://instagram.com/sirnewson" target="_blank" rel="noopener noreferrer" className="w-12 h-12 clip-hexagon bg-neutral-medium flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 group shadow-lg">
                                    <i className="fab fa-instagram text-lg group-hover:scale-110 transition-transform"></i>
                                </a>
                                <a href="https://linkedin.com/in/sirnewson" target="_blank" rel="noopener noreferrer" className="w-12 h-12 clip-hexagon bg-neutral-medium flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 group shadow-lg">
                                    <i className="fab fa-linkedin-in text-lg group-hover:scale-110 transition-transform"></i>
                                </a>
                                <a href="mailto:sirnewson@gmail.com" className="w-12 h-12 clip-hexagon bg-neutral-medium flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 group shadow-lg">
                                    <i className="fas fa-envelope text-lg group-hover:scale-110 transition-transform"></i>
                                </a>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-neutral-medium to-neutral-dark p-8 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-2">Based in</h3>
                            <p className="text-white/60 mb-6">Nairobi, Kenya<br />Available for remote work worldwide.</p>

                            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                            <a href="mailto:sirnewson@gmail.com" className="text-primary hover:text-white transition-colors">sirnewson@gmail.com</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
