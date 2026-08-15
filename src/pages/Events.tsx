import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';
import { clientsInDocket, byClient, type PortfolioItem } from '../data/portfolio';
import { quickRates, whatsappFor } from '../data/quickRates';
import { ScrollReveal } from '../components/Animated';

const beats = [
    ['01', 'Announce', 'Key art and the first reveal that makes people stop scrolling.'],
    ['02', 'Build', 'Countdown series, lineup drops, ticket pushes — the drumbeat.'],
    ['03', 'Doors', 'Gate assets, tags, signage, backdrops, screens.'],
    ['04', 'After', 'Recap edits and stills that sell the next one before it exists.'],
];

const EventCard = ({ item, onOpen }: { item: PortfolioItem; onOpen: (i: PortfolioItem) => void }) => (
    <motion.button
        type="button"
        onClick={() => onOpen(item)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="group relative block w-full overflow-hidden rounded-[10px] border border-white/10 bg-neutral-dark"
    >
        <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-soft-black via-soft-black/70 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-left font-display text-xs leading-snug text-warm-white">{item.title}</p>
        </div>
        <span className="pointer-events-none absolute inset-0 rounded-[10px] ring-1 ring-inset ring-white/10 transition group-hover:ring-sunset/45" />
    </motion.button>
);

const Events = () => {
    const [selected, setSelected] = useState<PortfolioItem | null>(null);
    const clients = clientsInDocket('events');
    const rate = quickRates.events;

    return (
        <div className="min-h-screen bg-neutral-black text-white">
            <SEO
                title="Event Marketing & Campaign Design in Kenya | Sir Newson"
                description="Event campaign design for festivals, tours and nightlife in Kenya: key art, countdown series, lineup drops, ticket assets, gate signage and recap edits. Lastcall, Big Voice Fest, TTNT 6, Matatu."
                keywords="event marketing Kenya, event poster design Nairobi, festival branding Kenya, event campaign design, concert poster Kenya, event flyer designer Nairobi, event recap video Kenya"
                path="/events"
            />

            {/* Docket header */}
            <section className="aurora-section relative overflow-hidden border-b border-white/5 px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
                <div className="pointer-events-none absolute left-1/3 top-0 h-[460px] w-[460px] rounded-full bg-sunset/[0.09] blur-[150px]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">Docket · Events</p>
                    <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.98] md:text-8xl">
                        Events don't sell out <span className="italic text-sunset">quietly.</span>
                    </h1>
                    <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                        Festivals, tours and nights out live or die on how they look three weeks before the door opens.
                        I build the whole campaign — announce, countdown, lineup, tickets, gate, recap.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                        <a
                            href={whatsappFor({ docket: 'events' })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-[8px] bg-sunset px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-black transition hover:bg-clay"
                        >
                            <i className="fab fa-whatsapp text-base" /> Brief me on your event
                        </a>
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 rounded-[8px] border border-white/15 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 transition hover:border-sunset/50 hover:text-sunset"
                        >
                            What I do
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                        {clients.map((c) => (
                            <span key={c.clientKey} className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                                {c.client}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* The campaign beats */}
            <section className="border-b border-white/5 px-6 py-16 md:px-10 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">How a campaign runs</p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
                        {beats.map(([n, title, desc], i) => (
                            <ScrollReveal key={title} direction="up" delay={i * 0.07} duration={0.6} className="h-full">
                                <div className="h-full rounded-[12px] border border-white/10 bg-white/[0.03] p-6">
                                    <p className="font-mono text-[10px] text-sunset">{n}</p>
                                    <h3 className="mt-4 font-display text-2xl">{title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-white/62">{desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Work, grouped by event */}
            {clients.map((c) => {
                const items = byClient(c.clientKey);
                return (
                    <section key={c.clientKey} className="border-b border-white/5 px-6 py-14 md:px-10 md:py-20">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sunset">{c.sector}</p>
                                    <h2 className="mt-2 font-display text-3xl md:text-5xl">{c.client}</h2>
                                </div>
                                <a
                                    href={whatsappFor({ client: c.client, docket: 'events' })}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-[6px] border border-white/15 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 transition hover:border-sunset hover:text-sunset"
                                >
                                    <i className="fab fa-whatsapp" /> Something like this
                                </a>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
                                {items.slice(0, 12).map((item) => (
                                    <EventCard key={item.id} item={item} onOpen={setSelected} />
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* Quick rate */}
            <section className="px-6 py-16 md:px-10 md:py-24">
                <div className="mx-auto max-w-3xl rounded-[16px] border border-sunset/25 bg-sunset/[0.06] p-8 md:p-12">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sunset">Quick rate · {rate.label}</p>
                    <h2 className="mt-4 font-display text-3xl md:text-5xl">
                        Every event is scoped on its own.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/65">
                        {`Scope drives the number — a one-night event and a six-city tour are not the same job. ${rate.turnaround}.`}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                        {rate.includes.map((inc) => (
                            <li key={inc} className="rounded-[6px] border border-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                                {inc}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href={whatsappFor({ docket: 'events' })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-[8px] bg-sunset px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-black transition hover:bg-clay"
                        >
                            <i className="fab fa-whatsapp text-base" /> Get a number today
                        </a>
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 rounded-[8px] border border-white/15 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 transition hover:border-sunset/50 hover:text-sunset"
                        >
                            What I do
                        </Link>
                    </div>
                </div>
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

export default Events;
