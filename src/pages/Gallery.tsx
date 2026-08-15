import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';
import { portfolioItems, type PortfolioItem, type Docket } from '../data/portfolio';
import { whatsappFor } from '../data/quickRates';

const STORE = 'sirnewson_saved_ideas';

const FILTERS: { key: Docket | 'all' | 'saved'; label: string }[] = [
    { key: 'all', label: 'Everything' },
    { key: 'gallery', label: 'Posters' },
    { key: 'events', label: 'Events' },
    { key: 'graphics', label: 'Graphics' },
    { key: 'branding', label: 'Branding' },
    { key: 'product', label: 'Product' },
    { key: 'saved', label: 'Saved' },
];

const Gallery = () => {
    const [filter, setFilter] = useState<Docket | 'all' | 'saved'>('all');
    const [selected, setSelected] = useState<PortfolioItem | null>(null);
    const [saved, setSaved] = useState<Record<string, boolean>>(() => {
        try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; }
    });
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem(STORE, JSON.stringify(saved));
    }, [saved]);

    const savedCount = Object.values(saved).filter(Boolean).length;

    const items = useMemo(() => {
        if (filter === 'all') return portfolioItems;
        if (filter === 'saved') return portfolioItems.filter((i) => saved[i.id]);
        return portfolioItems.filter((i) => i.docket === filter);
    }, [filter, saved]);

    const ping = (msg: string) => {
        setToast(msg);
        window.setTimeout(() => setToast(null), 1800);
    };

    const toggleSave = (item: PortfolioItem, e: React.MouseEvent) => {
        e.stopPropagation();
        const on = !saved[item.id];
        setSaved((prev) => ({ ...prev, [item.id]: on }));
        ping(on ? 'Saved to your board' : 'Removed');
    };

    const copyLink = (item: PortfolioItem, e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`${window.location.origin}/gallery#${item.id}`);
        ping('Link copied');
    };

    return (
        <div className="min-h-screen bg-neutral-black text-white">
            <SEO
                title="Design Gallery | Posters, Campaigns & Visual Archive | Sir Newson"
                description="An open archive of posters, campaign key art, branding and product visuals by Sir Newson. Save the ideas you like and send them straight over on WhatsApp."
                keywords="poster design gallery Kenya, graphic design archive Nairobi, campaign visuals Kenya, design inspiration Kenya, Sir Newson gallery"
                path="/gallery"
            />

            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        className="fixed bottom-8 left-1/2 z-[90] -translate-x-1/2 rounded-[8px] bg-sunset px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-black shadow-2xl"
                    >
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="aurora-section relative overflow-hidden px-6 pb-10 pt-36 md:px-10 md:pt-44">
                <div className="mx-auto max-w-7xl">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">The Archive</p>
                    <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.98] md:text-8xl">
                        Everything, <span className="italic text-white/55">in one wall.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/62 md:text-base">
                        {portfolioItems.length} pieces across posters, events, branding and product.
                        Save what you like — your board stays on this device — then send it to me.
                    </p>
                </div>
            </section>

            {/* Sticky filter rail */}
            <div className="sticky top-0 z-40 border-y border-white/10 bg-neutral-black/85 px-6 py-3 backdrop-blur-xl md:px-10">
                <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto">
                    {FILTERS.map((f) => (
                        <button
                            key={f.key}
                            type="button"
                            onClick={() => setFilter(f.key)}
                            className={`shrink-0 rounded-[6px] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
                                filter === f.key
                                    ? 'bg-sunset text-black'
                                    : 'border border-white/12 text-white/60 hover:border-sunset/40 hover:text-sunset'
                            }`}
                        >
                            {f.label}
                            {f.key === 'saved' && savedCount > 0 && ` · ${savedCount}`}
                        </button>
                    ))}
                    <span className="ml-auto shrink-0 pl-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                        {items.length} shown
                    </span>
                </div>
            </div>

            {/* Masonry */}
            <section className="px-3 py-8 md:px-4 md:py-10">
                {items.length === 0 ? (
                    <div className="mx-auto max-w-md py-24 text-center">
                        <p className="font-display text-2xl text-white/70">Nothing saved yet.</p>
                        <p className="mt-3 text-sm text-white/50">
                            Tap the bookmark on anything you like and it will collect here.
                        </p>
                    </div>
                ) : (
                    <div className="columns-2 gap-3 md:columns-4 md:gap-4 xl:columns-5">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                id={item.id}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.45, delay: Math.min((index % 10) * 0.03, 0.25) }}
                                onClick={() => setSelected(item)}
                                className="group relative mb-3 block cursor-pointer break-inside-avoid overflow-hidden rounded-[10px] border border-white/10 bg-neutral-dark md:mb-4"
                            >
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    loading="lazy"
                                    width={item.w}
                                    height={item.h}
                                    className="w-full transition duration-700 group-hover:scale-[1.03]"
                                />

                                {/* Hover actions */}
                                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-soft-black/60 via-transparent to-soft-black/85 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="pointer-events-auto flex justify-end">
                                        <button
                                            type="button"
                                            onClick={(e) => toggleSave(item, e)}
                                            aria-label={saved[item.id] ? 'Remove from board' : 'Save idea'}
                                            className={`flex h-8 w-8 items-center justify-center rounded-[6px] text-[11px] transition ${
                                                saved[item.id]
                                                    ? 'bg-sunset text-black'
                                                    : 'bg-soft-black/70 text-warm-white hover:bg-sunset hover:text-black'
                                            }`}
                                        >
                                            <i className={saved[item.id] ? 'fas fa-bookmark' : 'far fa-bookmark'} />
                                        </button>
                                    </div>

                                    <div className="pointer-events-auto">
                                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-sunset">{item.client}</p>
                                        <p className="mt-0.5 line-clamp-2 text-left font-display text-xs leading-snug text-warm-white">
                                            {item.title}
                                        </p>
                                        <div className="mt-2 flex gap-1.5">
                                            <a
                                                href={whatsappFor({ title: item.title, client: item.client, docket: item.docket })}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex h-7 items-center gap-1.5 rounded-[5px] bg-sunset px-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-black transition hover:bg-clay"
                                            >
                                                <i className="fab fa-whatsapp" /> Get a quote
                                            </a>
                                            <button
                                                type="button"
                                                onClick={(e) => copyLink(item, e)}
                                                aria-label="Copy link"
                                                className="flex h-7 w-7 items-center justify-center rounded-[5px] border border-white/20 bg-soft-black/70 text-[9px] text-warm-white transition hover:border-sunset hover:text-sunset"
                                            >
                                                <i className="fas fa-link" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {saved[item.id] && (
                                    <span className="pointer-events-none absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-[5px] bg-sunset text-[10px] text-black group-hover:opacity-0">
                                        <i className="fas fa-bookmark" />
                                    </span>
                                )}

                                <span className="pointer-events-none absolute inset-0 rounded-[10px] ring-1 ring-inset ring-white/10 transition group-hover:ring-sunset/45" />
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            <MediaModal
                isOpen={Boolean(selected)}
                onClose={() => setSelected(null)}
                src={selected?.src || ''}
                title={selected?.title || ''}
                type="image"
            />

            <Footer />
        </div>
    );
};

export default Gallery;
