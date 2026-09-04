import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PubShell from '../../components/pub/PubShell';
import SEO from '../../components/SEO';
import { visuals } from '../../data/publication';
import { studioUrl } from '../../lib/site';
import type { Visual } from '../../data/publication';

/**
 * A curated lab, not a client portfolio. Image-heavy, selective, and it links
 * out to the studio rather than absorbing the whole site into a portfolio.
 */
const Visuals = () => {
    const [open, setOpen] = useState<Visual | null>(null);

    return (
        <PubShell>
            <SEO
                title="Visuals — Drift"
                description="A visual laboratory: brand identities, posters, photography, typography and image experiments from Sir Newson, published in Drift."
                path="/visuals"
            />

            <header className="px-6 pb-12 pt-20 md:px-12 md:pt-28">
                <div className="mx-auto max-w-[1600px]">
                    <p className="pub-kicker pub-accent">Visuals</p>
                    <h1 className="pub-display mt-6 max-w-[12ch] text-6xl md:text-[9rem]">The lab</h1>
                    <p className="pub-soft mt-8 max-w-[52ch] text-lg leading-relaxed">
                        Identity work, posters, typography and image experiments. Selected rather than
                        catalogued — the full studio archive lives elsewhere.
                    </p>
                    <a
                        href={studioUrl('/work')}
                        className="pub-kicker pub-rule mt-8 inline-block border px-6 py-3 transition hover:bg-[color:var(--ink)] hover:text-[color:var(--ground)]"
                    >
                        Sir Newson Visuals — full archive →
                    </a>
                </div>
            </header>

            <section className="px-6 pb-24 md:px-12">
                <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
                    {visuals.map((v, i) => (
                        <motion.button
                            key={v.id}
                            type="button"
                            onClick={() => setOpen(v)}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            className={`group block text-left ${v.tall ? 'md:row-span-2' : ''}`}
                        >
                            <div className={`pub-frame ${v.tall ? 'aspect-[3/4] md:aspect-[3/5]' : 'aspect-[4/5]'}`}>
                                <img src={v.src} alt={v.title} loading="lazy" />
                            </div>
                            <div className="mt-3 flex items-baseline justify-between gap-3">
                                <p className="pub-kicker pub-faint">{v.index}</p>
                                <p className="pub-kicker">{v.title}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </section>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setOpen(null)}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-[#011111]/94 p-6"
                    >
                        <motion.figure
                            initial={{ scale: 0.97, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="max-h-full w-full max-w-4xl overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={open.src} alt={open.title} className="mx-auto max-h-[74vh] w-auto" />
                            <figcaption className="mt-5 text-[#FFFFFF]">
                                <p className="pub-kicker opacity-60">{open.index}</p>
                                <p className="pub-headline mt-2 text-2xl">{open.title}</p>
                                <p className="mt-2 max-w-[46ch] text-sm opacity-70">{open.note}</p>
                            </figcaption>
                        </motion.figure>
                        <button
                            type="button"
                            onClick={() => setOpen(null)}
                            className="pub-kicker absolute right-6 top-6 text-[#FFFFFF]"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </PubShell>
    );
};

export default Visuals;
