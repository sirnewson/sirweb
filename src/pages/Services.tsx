import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import ServiceEcosystem from '../components/ServiceEcosystem';
import Footer from '../components/Footer';
import { ScrollReveal, Float, Magnetic } from '../components/Animated';

const outcomes = [
    'Look trusted before the first call',
    'Make your offers easier to understand',
    'Turn scattered visuals into a consistent brand world',
    'Guide visitors toward WhatsApp, inquiry, or purchase',
    'Build a premium digital presence that compounds over time',
    'Create reusable systems instead of one-off design chaos'
];

const process = [
    ['01', 'Clarity', 'We define the buyer, offer, message, visual direction, and the action the brand must drive.'],
    ['02', 'Structure', 'We build the website, identity, or creative system around hierarchy, trust, and conversion.'],
    ['03', 'Presence', 'We polish the details so the final experience feels premium, clear, and memorable.']
];

const Services = () => {
    return (
        <main className="bg-neutral-black min-h-screen text-white bg-hexagon-grid">
            <SEO
                title="Services | Website Design, Branding & AI Creative Systems | Sir Newson"
                description="Premium website design, brand identity, creative direction and AI visual systems for founders, businesses and creators in Kenya and beyond."
                keywords="website design Kenya, Nairobi web designer, brand identity Kenya, creative director Nairobi, AI visuals Kenya, landing page design, digital presence systems"
            />
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Services</span>}
                subtitle="Digital Presence • Brand Systems • AI Creative Direction"
                shortParagraph="I help founders, creators, and businesses build the parts of their brand people judge first: the website, the identity, the visuals, and the system behind how everything connects."
                primaryCtaLabel="Build My Website"
                primaryCtaPath="/website"
                secondaryCtaLabel="Start a Project"
                secondaryCtaPath="/contact"
            />

            <ServiceEcosystem />

            <section className="px-6 py-20 md:py-28 border-b border-white/5 bg-neutral-dark/70">
                <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <ScrollReveal direction="left" duration={0.7}>
                        <div>
                            <p className="text-primary text-xs font-black uppercase tracking-[0.25em] mb-4">What you are buying</p>
                            <h2 className="font-display text-4xl md:text-5xl font-black leading-tight">Not design decoration. Business perception.</h2>
                            <p className="mt-6 text-white/60 leading-relaxed text-lg">Most people do not have time to understand your greatness slowly. They judge fast. The work here is to make your value visible, believable, and easy to act on.</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {outcomes.map((outcome, index) => (
                            <ScrollReveal
                                key={outcome}
                                direction="up"
                                delay={index * 0.06}
                                duration={0.6}
                            >
                                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 h-full">
                                    <Float y={2} duration={3 + index} className="w-fit mb-3">
                                        <p className="text-primary font-black">0{index + 1}</p>
                                    </Float>
                                    <p className="font-bold text-white leading-relaxed">{outcome}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 md:py-28 border-b border-white/5">
                <div className="max-w-6xl mx-auto text-center">
                    <ScrollReveal direction="up" duration={0.7}>
                        <p className="text-primary text-xs font-black uppercase tracking-[0.25em] mb-4">The process</p>
                        <h2 className="font-display text-4xl md:text-5xl font-black leading-tight mb-12">Simple enough to move fast. Deep enough to matter.</h2>
                    </ScrollReveal>
                    <div className="grid gap-5 md:grid-cols-3 text-left">
                        {process.map(([num, title, desc], index) => (
                            <ScrollReveal
                                key={title}
                                direction="up"
                                delay={index * 0.08}
                                duration={0.65}
                            >
                                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 h-full">
                                    <Float y={2.5} duration={4 + index} className="w-fit mb-5">
                                        <p className="text-primary font-black">{num}</p>
                                    </Float>
                                    <h3 className="font-display text-2xl font-black mb-4">{title}</h3>
                                    <p className="text-white/55 leading-7 text-sm">{desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-24 text-center">
                <ScrollReveal direction="up" duration={0.8}>
                    <div className="max-w-4xl mx-auto rounded-[2rem] border border-primary/20 bg-primary p-10 md:p-16 text-black">
                        <h2 className="font-display text-4xl md:text-6xl font-black leading-tight">Let us make your brand easier to trust, buy from, and remember.</h2>
                        <p className="mt-6 text-black/70 text-lg">Start with a website, brand system, or creative direction sprint. The goal is simple: make the outside finally match the value inside.</p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <Magnetic>
                                <Link to="/website" className="rounded-full bg-black px-8 py-4 text-white font-black hover:bg-white hover:text-black transition-colors block text-center">View Website Packages</Link>
                            </Magnetic>
                            <Magnetic>
                                <Link to="/contact" className="rounded-full border border-black/20 px-8 py-4 text-black font-black hover:bg-black hover:text-white transition-colors block text-center">Start a Project</Link>
                            </Magnetic>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
            <Footer />
        </main>
    );
};

export default Services;
