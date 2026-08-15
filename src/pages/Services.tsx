import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import ServiceEcosystem from '../components/ServiceEcosystem';
import PresentationPillars from '../components/PresentationPillars';
import Footer from '../components/Footer';
import { ScrollReveal, Float, Magnetic } from '../components/Animated';

const outcomes = [
    'Look trusted before the first call',
    'Make your offers easier to understand',
    'Turn scattered visuals into a consistent, ready-to-use brand world',
    'Guide visitors toward WhatsApp, inquiry, or purchase',
    'Build a premium digital presence that is genuinely ready to grow',
    'Create reusable systems instead of one-off design chaos'
];

const process = [
    ['01', 'Clarify', 'We identify what needs to be communicated, sold, launched, or understood.'],
    ['02', 'Shape', 'The raw material is organised into a strong visual, narrative, or digital direction.'],
    ['03', 'Present', 'The idea becomes professional content, design, video, a website, or a complete system.'],
    ['04', 'Release', 'The final work is prepared for publishing, launching, selling, or sharing.']
];

const Services = () => {
    return (
        <main className="bg-neutral-black min-h-screen text-white bg-hexagon-grid">
            <SEO
                title="Services | Website Design, Branding & Presentation Systems | Sir Newson"
                description="I prepare founders, creators, and businesses for the internet: premium website design, brand identity, creative direction, and AI visual systems that make your work ready to launch, sell, and be trusted."
                keywords="website design Kenya, Nairobi web designer, brand identity Kenya, creative director Nairobi, AI visuals Kenya, landing page design, digital presence systems, presentation architect Kenya"
            />
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Services</span>}
                subtitle="Digital Presence • Brand Systems • AI Creative Direction"
                shortParagraph="I help founders, creators, and businesses prepare the parts of their brand people judge first: the website, the identity, the visuals, and the system behind how everything connects."
                primaryCtaLabel="Build My Website"
                primaryCtaPath="/website"
                secondaryCtaLabel="Start a Project"
                secondaryCtaPath="/contact"
            />

            <ServiceEcosystem />

            <PresentationPillars />

            <section className="px-6 py-20 md:py-28 border-b border-white/5 bg-neutral-dark/70">
                <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <ScrollReveal direction="left" duration={0.7}>
                        <div>
                            <p className="text-primary text-xs font-semibold uppercase tracking-[0.25em] mb-4 font-mono">What you are buying</p>
                            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">Not decoration. Readiness.</h2>
                            <p className="mt-6 text-white/70 leading-relaxed text-lg">Most people do not have time to understand your greatness slowly. They judge fast. The work here is to make your value visible, believable, and ready to act on — before you have to explain it.</p>
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
                                <div className="rounded-[12px] border border-white/10 bg-white/[0.03] p-6 h-full">
                                    <Float y={2} duration={3 + index} className="w-fit mb-3">
                                        <p className="text-primary font-semibold">0{index + 1}</p>
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
                        <p className="text-primary text-xs font-semibold uppercase tracking-[0.25em] mb-4 font-mono">The Sir Newson Readiness Framework</p>
                        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-12">Simple enough to move fast. Deep enough to matter.</h2>
                    </ScrollReveal>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 text-left">
                        {process.map(([num, title, desc], index) => (
                            <ScrollReveal
                                key={title}
                                direction="up"
                                delay={index * 0.08}
                                duration={0.65}
                            >
                                <div className="rounded-[12px] border border-white/10 bg-white/[0.03] p-7 h-full">
                                    <Float y={2.5} duration={4 + index} className="w-fit mb-5">
                                        <p className="text-primary font-semibold">{num}</p>
                                    </Float>
                                    <h3 className="font-display text-2xl font-semibold mb-4">{title}</h3>
                                    <p className="text-white/70 leading-7 text-sm">{desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                    <ScrollReveal direction="up" delay={0.2} duration={0.6}>
                        <p className="mt-12 font-display text-xl font-semibold text-white md:text-2xl">
                            Clarify it. <span className="text-primary">Shape it.</span> Present it. <span className="text-primary">Release it.</span>
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="px-6 py-24 text-center">
                <ScrollReveal direction="up" duration={0.8}>
                    <div className="max-w-4xl mx-auto rounded-[16px] border border-primary/20 bg-primary p-10 md:p-16 text-black">
                        <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight">Let's make your brand ready to trust, buy from, and remember.</h2>
                        <p className="mt-6 text-black/85 text-lg">Start with a website, brand system, or creative direction sprint. The goal is simple: make the outside finally match the value inside — and get it ready for the world.</p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <Magnetic>
                                <Link to="/website" className="rounded-[8px] bg-black px-8 py-4 text-white font-semibold hover:bg-clay hover:text-black transition-colors block text-center">View Website Packages</Link>
                            </Magnetic>
                            <Magnetic>
                                <Link to="/contact" className="rounded-[8px] border border-black/20 px-8 py-4 text-black font-semibold hover:bg-black hover:text-white transition-colors block text-center">Start a Project</Link>
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
