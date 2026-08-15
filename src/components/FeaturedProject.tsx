import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ttntItems } from '../data/portfolio';
import { whatsappFor } from '../data/quickRates';
import { ScrollReveal } from './Animated';

const elements = [
    'Key art & bill concept',
    'Season 6 identity',
    'Programme design',
    'All-access & crew tags',
    'Social campaign',
    'Motion titles',
];

/**
 * The most recent large job, given the space a flagship deserves rather than
 * being flattened into the grid with everything else.
 */
const FeaturedProject = () => {
    const hero = ttntItems[0];
    const rest = ttntItems.slice(1, 5);

    if (!hero) return null;

    return (
        <section className="relative overflow-hidden border-t border-white/5 py-16 md:py-24">
            <video
                src="/uploads/loops/feature.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-black via-neutral-black/85 to-neutral-black" />
            <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-sunset/[0.08] blur-[140px]" />

            <div className="relative mx-auto max-w-7xl px-4 md:px-6">
                <div className="mb-8 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-2 rounded-[6px] bg-sunset px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-black">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black" />
                        </span>
                        Just wrapped
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
                        Live comedy tour · Njugush
                    </span>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                    <ScrollReveal direction="up" duration={0.8}>
                        <h2 className="font-display text-[3.4rem] leading-[0.92] tracking-tight sm:text-[5rem] lg:text-[7rem]">
                            TTNT <span className="italic text-sunset">6</span>
                        </h2>
                        <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
                            A full season identity for one of Kenya's biggest live comedy tours — key art, programme,
                            accreditation, campaign and motion. Everything the tour needed to look ready before the doors opened.
                        </p>

                        <ul className="mt-7 flex flex-wrap gap-2">
                            {elements.map((el) => (
                                <li
                                    key={el}
                                    className="rounded-[6px] border border-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60"
                                >
                                    {el}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href={whatsappFor({ client: 'TTNT 6', docket: 'events' })}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-[8px] bg-sunset px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-black transition hover:bg-clay"
                            >
                                <i className="fab fa-whatsapp text-base" /> Plan my event campaign
                            </a>
                            <Link
                                to="/events"
                                className="inline-flex items-center gap-2 rounded-[8px] border border-white/15 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 transition hover:border-sunset/50 hover:text-sunset"
                            >
                                Events docket <i className="fas fa-arrow-right text-[10px]" />
                            </Link>
                        </div>
                    </ScrollReveal>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden rounded-[12px] border border-white/10"
                    >
                        <img src={hero.src} alt={hero.title} loading="lazy" className="w-full object-cover" />
                        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-sunset/20" />
                    </motion.div>
                </div>

                {rest.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-3 md:mt-6 md:grid-cols-4 md:gap-4">
                        {rest.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: i * 0.06 }}
                                className="group relative overflow-hidden rounded-[10px] border border-white/10 bg-neutral-dark"
                            >
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    loading="lazy"
                                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                                />
                                <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition group-hover:ring-sunset/40" />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedProject;
