import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';
import { quickRates, whatsappFor } from '../data/quickRates';
import { ScrollReveal } from '../components/Animated';
import {
    editionArtwork,
    eventSeries,
    partnerProjects,
    seriesArtwork,
    seriesCover,
    totalEditions,
    type EventEdition,
    type EventSeries,
} from '../data/events';

/** Anything the lightbox can open — both archives reduce to this. */
interface Plate {
    id: string;
    title: string;
    src: string;
}

const beats = [
    ['01', 'Announce', 'Key art and the first reveal that makes people stop scrolling.'],
    ['02', 'Build', 'Countdown series, lineup drops, ticket pushes — the drumbeat.'],
    ['03', 'Doors', 'Gate assets, tags, signage, backdrops, screens.'],
    ['04', 'After', 'Recap edits and stills that sell the next one before it exists.'],
];

const PlateCard = ({ item, onOpen }: { item: Plate; onOpen: (i: Plate) => void }) => (
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

const editionTitle = (ed: EventEdition) => ed.name ?? ed.label;

/**
 * One series, one section: the run of editions on the left, the cover on the
 * right, and the archive underneath.
 *
 * Where an edition has its own imported artwork the run list becomes a switch —
 * pick a season, the grid below swaps. Four seasons of a campaign is fifty-odd
 * assets, and stacking them all would bury the run itself.
 */
const SeriesSection = ({
    series,
    index,
    onOpen,
}: {
    series: EventSeries;
    index: number;
    onOpen: (i: Plate) => void;
}) => {
    // Editions that actually have something to show.
    const withArt = useMemo(
        () => series.editions.filter((e) => editionArtwork(series, e).length > 0),
        [series]
    );
    const [activeKey, setActiveKey] = useState<string | undefined>(
        () => withArt[withArt.length - 1]?.assetKey
    );

    const active = withArt.find((e) => e.assetKey === activeKey);
    const editionPlates: Plate[] = active
        ? editionArtwork(series, active).map((a) => ({ id: a.id, title: a.title, src: a.src }))
        : [];

    // Series imported before editions were tracked still show their flat archive.
    const flatPlates: Plate[] =
        withArt.length === 0
            ? seriesArtwork(series)
                  .slice(0, 12)
                  .map((a) => ({ id: a.id, title: a.title, src: a.src }))
            : [];

    const cover = seriesCover(series);
    const latest = series.editions[series.editions.length - 1];

    return (
        <section id={series.key} className="scroll-mt-24 border-t border-white/10 px-6 py-16 md:px-10 md:py-24">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sunset">
                            {String(index + 1).padStart(2, '0')} · {series.kind}
                        </p>
                        <h2 className="mt-3 font-display text-4xl leading-[1.02] md:text-6xl">{series.name}</h2>
                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-base md:leading-8">
                            {series.blurb}
                        </p>

                        <div className="mt-8">
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                                {series.editions.length} {series.editions.length === 1 ? 'edition' : 'editions'}
                                {withArt.length > 0 && ' · pick one'}
                            </p>

                            <ol className="mt-4 space-y-px">
                                {series.editions.map((ed, i) => {
                                    const count = editionArtwork(series, ed).length;
                                    const isActive = count > 0 && ed.assetKey === activeKey;
                                    const isLatest = i === series.editions.length - 1;
                                    const Tag = count > 0 ? 'button' : 'div';

                                    return (
                                        <li key={ed.label}>
                                            <Tag
                                                {...(count > 0
                                                    ? {
                                                          type: 'button' as const,
                                                          onClick: () => setActiveKey(ed.assetKey),
                                                      }
                                                    : {})}
                                                className={`flex w-full flex-wrap items-baseline gap-x-4 gap-y-1 border-l-2 py-3 pl-4 text-left transition ${
                                                    isActive
                                                        ? 'border-sunset bg-sunset/[0.07]'
                                                        : count > 0
                                                          ? 'border-white/12 hover:border-sunset/60 hover:bg-white/[0.02]'
                                                          : 'border-white/12'
                                                }`}
                                            >
                                                <span
                                                    className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
                                                        isActive ? 'text-sunset' : 'text-white/45'
                                                    }`}
                                                >
                                                    {ed.label}
                                                </span>
                                                {ed.name && (
                                                    <span
                                                        className={`font-display text-lg md:text-xl ${
                                                            isActive ? 'text-warm-white' : 'text-white/80'
                                                        }`}
                                                    >
                                                        {ed.name}
                                                    </span>
                                                )}
                                                {ed.note && (
                                                    <span className="text-xs leading-6 text-white/50">{ed.note}</span>
                                                )}
                                                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                                                    {count > 0
                                                        ? `${count} pieces`
                                                        : isLatest && series.editions.length > 1
                                                          ? 'Latest'
                                                          : ''}
                                                </span>
                                            </Tag>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>

                        <a
                            href={whatsappFor({
                                client: `${series.name} — ${editionTitle(latest)}`,
                                docket: 'events',
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center gap-2 rounded-[6px] border border-white/15 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 transition hover:border-sunset hover:text-sunset"
                        >
                            <i className="fab fa-whatsapp" /> Something like this
                        </a>
                    </div>

                    <div>
                        {cover ? (
                            <div className="overflow-hidden rounded-[12px] border border-white/10 bg-neutral-dark">
                                <img
                                    src={cover}
                                    alt={`${series.name} key art`}
                                    loading="lazy"
                                    className="aspect-[4/5] w-full object-cover"
                                />
                            </div>
                        ) : (
                            /* No artwork on file yet — a typographic plate rather than a
                               borrowed poster that would misrepresent the night. */
                            <div className="flex aspect-[4/5] flex-col justify-between rounded-[12px] border border-white/10 bg-white/[0.03] p-6">
                                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sunset">
                                    {series.kind}
                                </p>
                                <p className="font-display text-3xl leading-[1.04] text-warm-white md:text-4xl">
                                    {series.name}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* The archive for the selected edition */}
                {active && editionPlates.length > 0 && (
                    <div className="mt-12">
                        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {series.name} · {editionTitle(active)}
                        </p>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
                            {editionPlates.map((item) => (
                                <PlateCard key={item.id} item={item} onOpen={onOpen} />
                            ))}
                        </div>
                    </div>
                )}

                {flatPlates.length > 0 && (
                    <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
                        {flatPlates.map((item) => (
                            <PlateCard key={item.id} item={item} onOpen={onOpen} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const Events = () => {
    const [selected, setSelected] = useState<Plate | null>(null);
    const rate = quickRates.events;

    return (
        <div className="min-h-screen bg-neutral-black text-white">
            <SEO
                title="Event Marketing & Campaign Design in Kenya | Sir Newson"
                description="Event campaign design for festivals, tours and nightlife in Kenya: key art, countdown series, lineup drops, ticket assets, gate signage and recap edits — plus Invait digital invitations, built with YXM Digital. Mapenzi Vibandaski, TTNT, Big Voice Fest, Kwa Ndego, The Juice Party, Last Call."
                keywords="event marketing Kenya, event poster design Nairobi, festival branding Kenya, event campaign design, concert poster Kenya, event flyer designer Nairobi, event recap video Kenya, Mapenzi Vibandaski, TTNT, Big Voice Fest, Kwa Ndego, digital invitations Kenya, Invait"
                path="/events"
            />

            {/* Docket header */}
            <section className="aurora-section relative overflow-hidden px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
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
                            to="/proposal"
                            className="inline-flex items-center gap-2 rounded-[8px] border border-white/15 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 transition hover:border-sunset/50 hover:text-sunset"
                        >
                            How a proposal works
                        </Link>
                    </div>

                    {/* The run, as an index. Most of this work is repeat work, and
                        the season count is the strongest thing on the page. */}
                    <div className="mt-14 border-t border-white/10 pt-8">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                            {eventSeries.length} series · {totalEditions} editions
                        </p>
                        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                            {eventSeries.map((s) => (
                                <a key={s.key} href={`#${s.key}`} className="group flex items-baseline gap-3">
                                    <span className="font-display text-xl text-warm-white transition group-hover:text-sunset md:text-2xl">
                                        {s.name}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                                        {s.editions.length}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* The campaign beats */}
            <section className="px-6 py-20 md:px-10 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">
                        How a campaign runs
                    </p>
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

            {/* The series */}
            {eventSeries.map((series, i) => (
                <SeriesSection key={series.key} series={series} index={i} onOpen={setSelected} />
            ))}

            {/* Built alongside the campaigns — the invite platform, made with YXM. */}
            {partnerProjects.map((p) => (
                <section
                    key={p.domain}
                    className="border-t border-white/10 px-6 py-16 md:px-10 md:py-24"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sunset">
                                    Partner project · with{' '}
                                    <a
                                        href={p.partner.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline underline-offset-4 hover:text-clay"
                                    >
                                        {p.partner.name}
                                    </a>
                                </p>
                                <h2 className="mt-3 font-display text-4xl leading-[1.02] md:text-6xl">{p.name}</h2>
                                <p className="mt-4 font-display text-xl italic text-sunset md:text-2xl">
                                    {p.tagline}
                                </p>
                                <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-base md:leading-8">
                                    {p.blurb}
                                </p>

                                {p.seenOn && p.seenOn.length > 0 && (
                                    <div className="mt-8">
                                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                                            Running on it
                                        </p>
                                        <ul className="mt-3 flex flex-wrap gap-2">
                                            {p.seenOn.map((e) =>
                                                e.seriesKey ? (
                                                    <li key={e.label}>
                                                        <a
                                                            href={`#${e.seriesKey}`}
                                                            className="inline-block rounded-[6px] border border-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 transition hover:border-sunset hover:text-sunset"
                                                        >
                                                            {e.label}
                                                        </a>
                                                    </li>
                                                ) : (
                                                    <li
                                                        key={e.label}
                                                        className="rounded-[6px] border border-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60"
                                                    >
                                                        {e.label}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}

                                <a
                                    href={p.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 inline-flex items-center gap-2 rounded-[8px] bg-sunset px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-black transition hover:bg-clay"
                                >
                                    Visit {p.domain} →
                                </a>
                            </div>

                            <div className="rounded-[12px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                                    What every invite ships with
                                </p>
                                <ul className="mt-5 space-y-3">
                                    {p.includes.map((inc) => (
                                        <li key={inc} className="flex gap-3 text-sm leading-6 text-white/70">
                                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-sunset" />
                                            {inc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Quick rate */}
            <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
                <div className="mx-auto max-w-3xl rounded-[16px] border border-sunset/25 bg-sunset/[0.06] p-8 md:p-12">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sunset">
                        Quick rate · {rate.label}
                    </p>
                    <h2 className="mt-4 font-display text-3xl md:text-5xl">Event campaigns start at {rate.from}.</h2>
                    <p className="mt-4 text-sm leading-7 text-white/65">
                        {`The starter slot covers ${rate.turnaround}. Bigger events scale into heavier rollout packages when the campaign needs more volume.`}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                        {rate.includes.map((inc) => (
                            <li
                                key={inc}
                                className="rounded-[6px] border border-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60"
                            >
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
                            to="/rate-card"
                            className="inline-flex items-center gap-2 rounded-[8px] border border-white/15 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 transition hover:border-sunset/50 hover:text-sunset"
                        >
                            See the rate card
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
