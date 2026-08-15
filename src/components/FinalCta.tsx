import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollReveal, WordRise } from './Animated';

const WHATSAPP = '254702480771';

const quickPicks = [
    { label: 'A product', icon: 'fas fa-box-open', message: 'Hi Sir Newson, I have a product I want to make ready for sale.' },
    { label: 'A video', icon: 'fas fa-film', message: 'Hi Sir Newson, I have footage I want edited and ready to publish.' },
    { label: 'A campaign', icon: 'fas fa-bullhorn', message: 'Hi Sir Newson, I have an event or campaign I want to make ready.' },
    { label: 'A website', icon: 'fas fa-globe', message: 'Hi Sir Newson, I want my business ready for the internet.' },
    { label: 'A brand', icon: 'fas fa-gem', message: 'Hi Sir Newson, I want my brand ready to be taken seriously.' },
    { label: 'An idea', icon: 'fas fa-lightbulb', message: 'Hi Sir Newson, I have an idea I want to make visible.' },
];

const wa = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

/**
 * Sits directly under the client logos: proof, then the ask. Each tile opens
 * WhatsApp with the message already written, so no form stands in the way.
 */
const FinalCta = () => {
    return (
        <section className="aurora-section relative overflow-hidden border-y border-white/5 px-4 py-20 md:px-6 md:py-28">
            <div className="relative mx-auto max-w-6xl">
                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
                    {/* The ask */}
                    <div>
                        <ScrollReveal direction="up" duration={0.6}>
                            <span className="inline-flex items-center gap-2 rounded-[6px] border border-sunset/30 bg-sunset/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.24em] text-sunset">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunset/70" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sunset" />
                                </span>
                                Start here
                            </span>
                        </ScrollReveal>

                        <h2 className="mt-6 font-display text-[2.6rem] leading-[0.98] md:text-6xl">
                            <WordRise text="What are you trying" />
                            <br />
                            <span className="italic text-sunset"><WordRise text="to make ready?" delay={0.12} /></span>
                        </h2>

                        <ScrollReveal direction="up" delay={0.2} duration={0.6}>
                            <p className="mt-6 max-w-md text-sm leading-7 text-white/62 md:text-base">
                                Tap what you have. It opens WhatsApp with the message already written —
                                no forms, no waiting.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.3} duration={0.6}>
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <a
                                    href={wa('Hi Sir Newson, I have something I want to make ready.')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2.5 rounded-[8px] bg-lime px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-soft-black transition hover:bg-golden-hour"
                                >
                                    <i className="fab fa-whatsapp text-base" />
                                    Message on WhatsApp
                                    <i className="fas fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1" />
                                </a>
                                <Link
                                    to="/contact"
                                    className="rounded-[8px] border border-white/15 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 transition hover:border-sunset/50 hover:text-sunset"
                                >
                                    Or send a brief
                                </Link>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.4} duration={0.6}>
                            <p className="mt-7 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                                <span className="h-px w-6 bg-white/20" />
                                Usually replies the same day
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* The picks */}
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:gap-3">
                        {quickPicks.map((pick, i) => (
                            <motion.a
                                key={pick.label}
                                href={wa(pick.message)}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -3 }}
                                className="glow-stroke glow-stroke--hover group relative flex aspect-square flex-col justify-between overflow-hidden rounded-[12px] border border-white/10 bg-neutral-dark/70 p-4 backdrop-blur-sm"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white/[0.06] text-sunset transition-colors duration-300 group-hover:bg-sunset group-hover:text-soft-black">
                                    <i className={`${pick.icon} text-xs`} />
                                </span>

                                <span>
                                    <span className="block font-editorial text-xl leading-tight text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                                        {pick.label}
                                    </span>
                                    <span className="mt-1 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30 transition-colors group-hover:text-sunset">
                                        <i className="fab fa-whatsapp text-[9px]" />
                                        Send it
                                    </span>
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCta;
