import { ScrollReveal, Magnetic } from './Animated';

const ContactSection = () => {
    return (
        <section id="contact" className="py-20 md:py-28 px-6 relative overflow-hidden">
            {/* Background Glow */}

            <div className="max-w-4xl mx-auto relative z-10">
                <ScrollReveal direction="up" duration={0.6} className="text-center mb-16">
                    <div>
                        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Get in Touch</p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">What Are You Trying to Make Ready?</h2>
                        <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
                            Bring the raw material — the photos, footage, product, idea, or business. Tell me what needs to go from unfinished to ready, and I'll help you shape it into something the world can see.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <ScrollReveal
                        direction="left"
                        duration={0.6}
                        className="h-full"
                    >
                        <div className="bg-neutral-medium/50 backdrop-blur-xl p-8 rounded-[12px] border border-white/10 h-full">
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
                                    <label htmlFor="name" className="block text-sm font-medium text-white/85 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-neutral-black/50 border border-white/10 rounded-[8px] px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white/85 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-neutral-black/50 border border-white/10 rounded-[8px] px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-white/85 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        required
                                        className="w-full bg-neutral-black/50 border border-white/10 rounded-[8px] px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="Tell me what you're trying to make ready..."
                                        defaultValue={new URLSearchParams(window.location.search).get('interest') ? `Hi, I'm interested in ${new URLSearchParams(window.location.search).get('interest')}.` : ''}
                                    />
                                </div>
                                <Magnetic className="w-full">
                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-black font-bold py-4 rounded-[8px] hover:bg-clay transition-colors duration-300 shadow-[0_0_20px_rgba(242,139,44,0.30)] hover:shadow-[0_6px_24px_rgba(242,139,44,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <i className="fab fa-whatsapp text-xl"></i>
                                        Start a Project
                                    </button>
                                </Magnetic>
                            </form>
                        </div>
                    </ScrollReveal>

                    {/* Social Links & Info */}
                    <ScrollReveal
                        direction="right"
                        duration={0.6}
                        delay={0.15}
                        className="h-full"
                    >
                        <div className="flex flex-col justify-center space-y-8 h-full">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
                                <div className="flex flex-wrap gap-4">
                                    <Magnetic range={30} strength={0.3}>
                                        <a href="https://twitter.com/sirnewson" target="_blank" rel="noopener noreferrer" className="w-12 h-12 clip-hexagon bg-neutral-medium flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 group shadow-lg block">
                                            <i className="fab fa-twitter text-lg group-hover:scale-110 transition-transform"></i>
                                        </a>
                                    </Magnetic>
                                    <Magnetic range={30} strength={0.3}>
                                        <a href="https://instagram.com/sirnewson" target="_blank" rel="noopener noreferrer" className="w-12 h-12 clip-hexagon bg-neutral-medium flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 group shadow-lg block">
                                            <i className="fab fa-instagram text-lg group-hover:scale-110 transition-transform"></i>
                                        </a>
                                    </Magnetic>
                                    <Magnetic range={30} strength={0.3}>
                                        <a href="https://linkedin.com/in/sirnewson" target="_blank" rel="noopener noreferrer" className="w-12 h-12 clip-hexagon bg-neutral-medium flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 group shadow-lg block">
                                            <i className="fab fa-linkedin-in text-lg group-hover:scale-110 transition-transform"></i>
                                        </a>
                                    </Magnetic>
                                    <Magnetic range={30} strength={0.3}>
                                        <a href="mailto:sirnewson@gmail.com" className="w-12 h-12 clip-hexagon bg-neutral-medium flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 group shadow-lg block">
                                            <i className="fas fa-envelope text-lg group-hover:scale-110 transition-transform"></i>
                                        </a>
                                    </Magnetic>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-neutral-medium to-neutral-dark p-8 rounded-[12px] border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-2">Based in</h3>
                                <p className="text-white/70 mb-6">Nairobi, Kenya<br />Available for remote work worldwide.</p>

                                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                                <a href="mailto:sirnewson@gmail.com" className="text-primary hover:text-white transition-colors">sirnewson@gmail.com</a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
