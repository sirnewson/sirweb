import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import PubShell from '../../components/pub/PubShell';
import StoryCard from '../../components/pub/StoryCard';
import SEO from '../../components/SEO';
import { PUBLICATION_ORIGIN } from '../../lib/site';
import {
    allArticles,
    articlePath,
    articlesIn,
    deskNotes,
    formatDate,
    franchises,
    leadArticle,
    sections,
    visuals,
} from '../../data/publication';

/* ---------------------------------------------------------------
   The front page of the publication. It is meant to change shape with
   whatever has just been published rather than hold a fixed layout, so
   every band below pulls from the same content index and none of them
   assume a specific piece.
   --------------------------------------------------------------- */

const issueLine = formatDate(leadArticle.date).slice(3);

const Hero = () => {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    // The headline travels slower than the page. Subtle — it should register as
    // depth, not as an effect. No fade: the hero is a full screen tall, and
    // fading it out leaves a reader staring at an empty black field.
    const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

    return (
        <section ref={ref} className="pub-glow relative overflow-hidden">
            <div className="mx-auto flex min-h-[min(86vh,900px)] max-w-[1600px] flex-col justify-between px-6 py-16 md:px-12 md:py-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-end gap-5"
                >
                    <img
                        src="/brand/drift/drift-wordmark-lime.png"
                        alt="Drift"
                        width={1200}
                        height={328}
                        className="h-[clamp(2.4rem,7vw,5.5rem)] w-auto"
                    />
                    <span className="pub-rule mb-3 hidden h-px flex-1 border-t sm:block" aria-hidden />
                    <span className="pub-kicker pub-faint mb-3 shrink-0">
                        {issueLine}
                    </span>
                </motion.div>

                <motion.div style={{ y }} className="max-w-5xl py-14 md:py-20">
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="pub-franchise text-2xl md:text-4xl"
                    >
                        {leadArticle.package ?? leadArticle.topic}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className="pub-display mt-6 text-[clamp(2.5rem,6vw,6.75rem)] leading-[0.92]"
                    >
                        {leadArticle.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.36 }}
                        className="pub-soft mt-8 max-w-[46ch] text-lg leading-relaxed md:text-xl"
                    >
                        {leadArticle.standfirst}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.46 }}
                        className="mt-10"
                    >
                        <Link
                            to={articlePath(leadArticle)}
                            className="pub-kicker inline-block border border-current px-8 py-4 transition hover:bg-[color:var(--ink)] hover:text-[color:var(--ground)]"
                        >
                            Read story →
                        </Link>
                    </motion.div>
                </motion.div>

                <div className="pub-kicker pub-faint flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="pub-accent">Stories. Ideas. Places. Culture.</span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(leadArticle.date)}</span>
                    <span aria-hidden>·</span>
                    <span>{leadArticle.readMinutes} min read</span>
                    <span aria-hidden>·</span>
                    <span>{leadArticle.topic}</span>
                </div>
            </div>
        </section>
    );
};

/** Section headers repeat across the page — one rule, one label, one link out. */
const Band = ({
    label,
    to,
    linkLabel,
    children,
    tone = 'paper',
}: {
    label: string;
    to?: string;
    linkLabel?: string;
    children: React.ReactNode;
    tone?: 'paper' | 'cream' | 'dark';
}) => (
    <section
        className={`px-6 py-20 md:px-12 md:py-28 ${
            tone === 'cream' ? 'pub-panel' : tone === 'dark' ? 'pub-glow' : ''
        }`}
    >
        <div className="mx-auto max-w-[1600px]">
            <div className="pub-rule mb-10 flex items-end justify-between gap-6 border-b pb-4">
                <h2 className="pub-kicker">{label}</h2>
                {to && (
                    <Link to={to} className="pub-kicker pub-faint transition hover:opacity-100">
                        {linkLabel ?? 'All'} →
                    </Link>
                )}
            </div>
            {children}
        </div>
    </section>
);

const Front = () => {
    const latest = allArticles.filter((a) => a.slug !== leadArticle.slug).slice(0, 5);
    const brandStories = articlesIn('stories').slice(0, 4);
    const drift = articlesIn('drift').filter((a) => a.slug !== leadArticle.slug);
    const driftLead = drift[0];
    const driftRest = drift.slice(1, 4);
    const sport = articlesIn('sport').slice(0, 3);
    const original = articlesIn('originals')[0];
    const notes = deskNotes.slice(0, 4);
    const visualStrip = visuals.slice(0, 6);

    return (
        <PubShell>
            <SEO
                title="Drift — Stories. Ideas. Places. Culture."
                description="Drift is the Sir Newson publication: stories, ideas and systems shaping culture, business, sport and the future. Published from Nairobi."
                keywords="Drift, Sir Newson, brand stories, African culture, Kenya, Nairobi, AI, football business, design, publication"
                path="/"
                origin={PUBLICATION_ORIGIN}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Periodical',
                    name: 'Drift',
                    url: `${PUBLICATION_ORIGIN}/`,
                    publisher: { '@type': 'Person', name: 'Newson Kamau Kariuki' },
                }}
            />

            <Hero />

            {/* LATEST — mixed sizes on purpose. A grid where every item matches
                reads as a component library rather than a front page. */}
            <Band label="Latest" to="/search" linkLabel="Search the archive">
                <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
                    {latest[0] && <StoryCard article={latest[0]} size="feature" className="md:col-span-2" />}
                    {latest[1] && <StoryCard article={latest[1]} size="standard" />}
                    {latest.slice(2, 5).map((a) => (
                        <StoryCard key={a.slug} article={a} size="compact" />
                    ))}
                </div>
            </Band>

            {/* BRAND STORIES */}
            <Band label="Brand Stories" to="/stories" linkLabel="All brand stories" tone="cream">
                <p className="pub-headline mb-12 max-w-[26ch] text-3xl md:text-5xl">
                    {sections[0].statement.split('.')[0]}.
                </p>
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {brandStories.map((a) => (
                        <StoryCard key={a.slug} article={a} size="compact" showSection={false} />
                    ))}
                </div>
            </Band>

            {/* DRIFT — the section allowed to stretch furthest. */}
            <Band label="Drift" to="/drift" linkLabel="Enter Drift" tone="dark">
                {driftLead && (
                    <Link to={articlePath(driftLead)} className="group block">
                        <p className="pub-display max-w-[18ch] text-4xl leading-[0.95] md:text-8xl">
                            <span className="pub-underline">{driftLead.title}</span>
                        </p>
                        <p className="pub-soft mt-8 max-w-[52ch] text-lg">{driftLead.standfirst}</p>
                    </Link>
                )}

                <div className="pub-rule-soft mt-16 grid gap-x-10 border-t md:grid-cols-3">
                    {driftRest.map((a) => (
                        <div key={a.slug} className="pub-rule-soft border-b md:border-b-0">
                            <StoryCard article={a} size="text" showSection={false} />
                        </div>
                    ))}
                </div>

                <div className="mt-14 flex flex-wrap gap-3">
                    {franchises.map((f) => (
                        <Link
                            key={f.slug}
                            to={`/tag/${f.slug}`}
                            className="pub-rule border px-5 py-3 transition hover:border-[color:var(--lime)]"
                        >
                            <span className="pub-franchise text-lg">{f.label}</span>
                            <span className="pub-kicker pub-faint ml-3">→</span>
                        </Link>
                    ))}
                </div>
            </Band>

            {/* SPORT */}
            <Band label="SN Sports" to="/sport" linkLabel="All sport">
                <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
                    {sport.map((a) => (
                        <StoryCard key={a.slug} article={a} size="standard" showSection={false} />
                    ))}
                </div>
            </Band>

            {/* ORIGINALS — one statement, full width. */}
            {original && (
                <section className="pub-lime px-6 py-24 md:px-12 md:py-36">
                    <div className="mx-auto max-w-[1600px]">
                        <p className="pub-kicker">Originals</p>
                        <Link to={articlePath(original)} className="group mt-8 block">
                            <h2 className="pub-display text-[3.4rem] leading-[0.9] md:text-[10rem]">
                                <span className="pub-underline">{original.title}</span>
                            </h2>
                            <p className="pub-soft mt-8 max-w-[54ch] text-lg">{original.standfirst}</p>
                            <span className="pub-kicker mt-8 inline-block">Read original →</span>
                        </Link>
                    </div>
                </section>
            )}

            {/* THE DESK — the part that changes daily. */}
            <Band label="The Desk" to="/desk" linkLabel="Open the desk" tone="cream">
                <div className="grid gap-x-10 md:grid-cols-2">
                    {notes.map((note) => (
                        <div key={note.id} className="pub-rule-soft border-t py-8">
                            <p className="pub-kicker pub-faint">{formatDate(note.date)}</p>
                            <p className="pub-headline mt-3 max-w-[36ch] text-xl md:text-2xl">{note.text}</p>
                            {note.becamePath && (
                                <Link to={note.becamePath} className="pub-kicker pub-accent mt-4 inline-block">
                                    Became a story →
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </Band>

            {/* VISUALS */}
            <Band label="Visuals" to="/visuals" linkLabel="The lab">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
                    {visualStrip.map((v) => (
                        <Link key={v.id} to="/visuals" className="group block">
                            <div className="pub-frame aspect-[3/4]">
                                <img src={v.src} alt={v.title} loading="lazy" />
                            </div>
                            <p className="pub-kicker pub-faint mt-3">{v.index}</p>
                        </Link>
                    ))}
                </div>
            </Band>
        </PubShell>
    );
};

export default Front;
