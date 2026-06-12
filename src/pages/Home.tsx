import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { collection, limit as limitQuery, onSnapshot, orderBy, query } from 'firebase/firestore';
import Hero from '../components/Hero';
import MediaModal from '../components/MediaModal';
import Footer from '../components/Footer';
import { recentUploadAssets, type UploadAsset } from '../data/uploadAssets';
import { db } from '../firebase';

interface ThreadPreview {
    id: string;
    content: string;
    category: string;
    timestamp?: { seconds: number };
}

const startHerePaths = [
    {
        title: 'I want to hire you',
        description: 'Start with services, pricing direction, and the kind of work I can build with you.',
        path: '/services',
        icon: 'fas fa-handshake',
    },
    {
        title: 'I want to see your work',
        description: 'Browse recent branding, graphics, motion, and website work from the live archive.',
        path: '/work',
        icon: 'fas fa-images',
    },
    {
        title: 'I want to read your thoughts',
        description: 'Explore Drift Notes: quick reflections on design, systems, awareness, and creativity.',
        path: '/threads',
        icon: 'fas fa-feather-alt',
    },
    {
        title: 'I want to explore your tools',
        description: 'Visit YXM Labs and see experimental tools, AI systems, and product concepts.',
        path: '/tools',
        icon: 'fas fa-flask',
    },
    {
        title: 'I want to understand the bigger vision',
        description: 'Jump into the future ecosystem behind the brand: media, education, living, and creative tech.',
        path: '/#future-ecosystem',
        icon: 'fas fa-project-diagram',
    },
];

const hireLanes = [
    {
        title: 'For Brands',
        description: 'Identity systems, campaign visuals, social media design, product marketing, and brand storytelling.',
        icon: 'fas fa-bullseye',
    },
    {
        title: 'For Events',
        description: 'Event identity, motion visuals, recap direction, content systems, posters, and promotional assets.',
        icon: 'fas fa-ticket-alt',
    },
    {
        title: 'For Startups & Founders',
        description: 'Website concepts, pitch visuals, brand narrative, product mockups, and AI prototype direction.',
        icon: 'fas fa-rocket',
    },
    {
        title: 'For Creators',
        description: 'Thumbnails, visual worlds, content direction, music visuals, campaign looks, and audience-facing systems.',
        icon: 'fas fa-magic',
    },
];

const futurePillars = [
    {
        title: 'Media',
        description: 'TAK Network, business insights, AI stories, culture, interviews, and future-facing commentary.',
    },
    {
        title: 'Education',
        description: "Ebusoma, learning tools, children's content, and education built for the AI era.",
    },
    {
        title: 'Living',
        description: 'Furniture ideas, spaces, home concepts, visual lifestyle systems, and TAK Living.',
    },
    {
        title: 'Creative Tech',
        description: 'YXM Labs, AI tools, digital systems, prototypes, experiments, and product experiences.',
    },
];

const worldCards = [
    {
        title: 'Sir Newson Visuals',
        description: 'Surreal edits, creative posters, visual storytelling, cinematic concepts, and campaign art direction.',
        path: '/work',
    },
    {
        title: 'Drift Notes',
        description: 'Reflections, ideas, philosophy, awareness, creative thinking, and lessons from the studio.',
        path: '/threads',
    },
    {
        title: 'YXM Labs',
        description: 'Experimental digital tools, AI systems, app concepts, and future-facing product ideas.',
        path: '/tools',
    },
    {
        title: 'TAK Network',
        description: 'Media, business thoughts, AI insights, technology, living, culture, and education.',
        path: '/#future-ecosystem',
    },
    {
        title: 'Music & Wallframes',
        description: 'Ambient visuals, music fusions, YouTube experiences, and mood-based screen art.',
        path: '/shop',
    },
];

const Home = () => {
    useEffect(() => {
        document.title = 'Sir Newson | Creative Director & Thinker';
    }, []);

    const [selectedMedia, setSelectedMedia] = useState<UploadAsset | null>(null);
    const [latestThreads, setLatestThreads] = useState<ThreadPreview[]>([]);
    const [savedPins, setSavedPins] = useState<Record<string, boolean>>(() => {
        const saved = localStorage.getItem('sirnewson_saved_pins');
        return saved ? JSON.parse(saved) : {};
    });
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('sirnewson_saved_pins', JSON.stringify(savedPins));
    }, [savedPins]);

    useEffect(() => {
        const threadsQuery = query(collection(db, 'threads'), orderBy('timestamp', 'desc'), limitQuery(3));
        const unsubscribe = onSnapshot(
            threadsQuery,
            (snapshot) => {
                setLatestThreads(snapshot.docs.map((threadDoc) => ({ id: threadDoc.id, ...threadDoc.data() })) as ThreadPreview[]);
            },
            () => setLatestThreads([])
        );

        return () => unsubscribe();
    }, []);

    const showToast = (message: string) => {
        setToastMessage(message);
        window.setTimeout(() => setToastMessage(null), 2200);
    };

    const toggleSave = (asset: UploadAsset, event: React.MouseEvent) => {
        event.stopPropagation();
        const isSaved = savedPins[asset.id];
        setSavedPins((prev) => ({ ...prev, [asset.id]: !isSaved }));
        showToast(isSaved ? 'Removed from saved work' : 'Saved to your board');
    };

    const copyAssetLink = (asset: UploadAsset, event: React.MouseEvent) => {
        event.stopPropagation();
        navigator.clipboard.writeText(`${window.location.origin}/work#${asset.id}`);
        showToast('Work link copied');
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-neutral-black text-white font-sans bg-hexagon-grid">
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-6 py-3 text-xs font-black uppercase tracking-wide text-black shadow-2xl"
                    >
                        {toastMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            <Hero
                primaryCtaLabel="Selected Work"
                primaryCtaPath="/work"
                secondaryCtaLabel="Get in Touch"
                secondaryCtaPath="/contact"
            />

            <section className="border-y border-white/5 bg-neutral-dark/80 px-6 py-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <p className="font-display text-2xl font-black text-white md:text-3xl">Creative Director Since 2020</p>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/45">Brand systems, visual campaigns, websites, motion</p>
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 max-w-3xl">
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">Start Here</p>
                        <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">Where Do You Want To Begin?</h2>
                        <p className="mt-4 text-lg leading-8 text-white/60">
                            Choose the path that fits what you need today. The brand is wide, but the entry points should be simple.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                        {startHerePaths.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={item.path}
                                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-primary/60 hover:bg-white/[0.06]"
                                >
                                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-black">
                                        <i className={item.icon} />
                                    </div>
                                    <h3 className="font-display text-xl font-black leading-tight">{item.title}</h3>
                                    <p className="mt-4 grow text-sm leading-6 text-white/55">{item.description}</p>
                                    <span className="mt-6 text-xs font-black uppercase tracking-wider text-primary">Begin <i className="fas fa-arrow-right ml-2" /></span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <h2 className="font-display text-3xl font-black md:text-5xl">Recent Work</h2>
                            <p className="mt-3 max-w-2xl text-white/60">
                                A small visible cut from the real upload folders. The full archive lives on the Work page.
                            </p>
                        </div>
                        <Link
                            to="/work"
                            className="inline-flex w-fit items-center gap-3 rounded-full bg-primary px-6 py-3 text-xs font-black uppercase tracking-wider text-black transition hover:bg-white"
                        >
                            View Full Work
                            <i className="fas fa-arrow-right" />
                        </Link>
                    </div>

                    <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-4">
                        {recentUploadAssets.slice(0, 12).map((asset, index) => (
                            <AssetCard
                                key={asset.id}
                                asset={asset}
                                index={index}
                                isSaved={Boolean(savedPins[asset.id])}
                                onOpen={setSelectedMedia}
                                onSave={toggleSave}
                                onShare={copyAssetLink}
                                featured
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 bg-neutral-dark px-6 py-24">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">Hire Sir Newson For</p>
                        <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">Creative Direction That Turns Ideas Into Usable Brand Systems</h2>
                        <p className="mt-5 text-lg leading-8 text-white/60">
                            Bring the idea, brand, event, product, or campaign. I help shape the identity, visual language, digital presence, and content direction so the work feels clear, current, and ready to move.
                        </p>
                        <Link
                            to="/contact"
                            className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-xs font-black uppercase tracking-wider text-black transition hover:bg-white"
                        >
                            Start a Project
                            <i className="fas fa-arrow-right" />
                        </Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {hireLanes.map((item, index) => (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-primary/50 hover:bg-white/[0.06]"
                            >
                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <i className={item.icon} />
                                </div>
                                <h3 className="font-display text-xl font-black">{item.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-white/55">{item.description}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="future-ecosystem" className="border-t border-white/5 px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">The Future I'm Building</p>
                            <h2 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">The Future Is Not Just Content. It Is Systems.</h2>
                            <p className="mt-6 text-lg leading-8 text-white/62">
                                Sir Newson is evolving from design services into a creative technology ecosystem: tools, media spaces, learning platforms, visual experiences, and brand systems for the next generation of creators, businesses, and communities.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {futurePillars.map((pillar, index) => (
                                <motion.article
                                    key={pillar.title}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06 }}
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06]"
                                >
                                    <span className="font-display text-4xl font-black text-primary/30">0{index + 1}</span>
                                    <h3 className="mt-5 font-display text-2xl font-black">{pillar.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-white/55">{pillar.description}</p>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 bg-neutral-dark px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 max-w-3xl">
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">The Sir Newson World</p>
                        <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">One Brand, Multiple Doors</h2>
                        <p className="mt-4 text-lg leading-8 text-white/60">
                            The work connects through visual storytelling, systems thinking, tools, media, learning, and experiences.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                        {worldCards.map((card, index) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={card.path}
                                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/30 p-6 transition hover:-translate-y-1 hover:border-primary/60 hover:bg-black/60"
                                >
                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/70">World 0{index + 1}</p>
                                    <h3 className="mt-5 font-display text-2xl font-black leading-tight">{card.title}</h3>
                                    <p className="mt-4 grow text-sm leading-6 text-white/55">{card.description}</p>
                                    <span className="mt-7 text-xs font-black uppercase tracking-wider text-primary">Explore <i className="fas fa-arrow-right ml-2" /></span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 bg-neutral-dark px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">Latest Threads</p>
                            <h2 className="mt-3 font-display text-3xl font-black md:text-5xl">Thoughts From the Studio</h2>
                            <p className="mt-3 max-w-2xl text-white/60">
                                Quick notes on design, systems, AI, creative direction, and the work behind the work.
                            </p>
                        </div>
                        <Link
                            to="/threads"
                            className="inline-flex w-fit items-center gap-3 rounded-full border border-primary/40 px-6 py-3 text-xs font-black uppercase tracking-wider text-primary transition hover:bg-primary hover:text-black"
                        >
                            Read Threads
                            <i className="fas fa-arrow-right" />
                        </Link>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {latestThreads.length > 0 ? latestThreads.map((thread, index) => (
                            <motion.article
                                key={thread.id}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06]"
                            >
                                <div className="mb-5 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                                        {thread.category || 'Thought'}
                                    </span>
                                    <span className="text-[10px] font-mono uppercase text-white/35">
                                        {thread.timestamp ? new Date(thread.timestamp.seconds * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Now'}
                                    </span>
                                </div>
                                <p className="line-clamp-5 text-base font-medium leading-7 text-white/80">{thread.content}</p>
                            </motion.article>
                        )) : (
                            ['Design gets stronger when the thinking gets clearer.', 'A good system makes the next good decision easier.', 'Creative direction is taste plus responsibility.'].map((thread, index) => (
                                <motion.article
                                    key={thread}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06 }}
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Studio Note</span>
                                    <p className="mt-5 text-base font-medium leading-7 text-white/80">{thread}</p>
                                </motion.article>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <MediaModal
                isOpen={Boolean(selectedMedia)}
                onClose={() => setSelectedMedia(null)}
                src={selectedMedia?.src || ''}
                title={selectedMedia?.title || ''}
                type={selectedMedia?.type || 'image'}
            />

            <Footer />
        </div>
    );
};

interface AssetCardProps {
    asset: UploadAsset;
    index: number;
    isSaved: boolean;
    featured?: boolean;
    onOpen: (asset: UploadAsset) => void;
    onSave: (asset: UploadAsset, event: React.MouseEvent) => void;
    onShare: (asset: UploadAsset, event: React.MouseEvent) => void;
}

const AssetCard = ({ asset, index, isSaved, featured = false, onOpen, onSave, onShare }: AssetCardProps) => (
    <motion.article
        id={asset.id}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.24) }}
        onClick={() => onOpen(asset)}
        className={`group relative mb-5 break-inside-avoid overflow-hidden cursor-pointer transition duration-300 hover:-translate-y-1 ${
            asset.type === 'video'
                ? 'rounded-none border-0 bg-transparent'
                : `rounded-2xl border border-white/10 bg-black/40 hover:border-primary/60 ${featured ? 'aspect-[4/5]' : ''}`
        }`}
    >
        {asset.type === 'video' ? (
            <video src={asset.src} autoPlay muted loop playsInline preload="metadata" className="h-auto w-full rounded-2xl border border-white/10 object-contain opacity-95 transition duration-500 group-hover:scale-[1.01] group-hover:border-primary/60" />
        ) : (
            <img src={asset.src} alt={asset.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        )}

        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/60 via-black/5 to-black/80 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-start justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/75">
                    {asset.category}
                </span>
                <button
                    type="button"
                    onClick={(event) => onSave(asset, event)}
                    className={`rounded-full px-4 py-2 text-xs font-black transition ${isSaved ? 'bg-white text-black' : 'bg-primary text-black hover:bg-white'}`}
                >
                    {isSaved ? 'Saved' : 'Save'}
                </button>
            </div>
            <div className="flex items-end justify-between gap-3">
                <h3 className="line-clamp-2 font-display text-lg font-black leading-tight">{asset.title}</h3>
                <div className="flex shrink-0 gap-2">
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            onOpen(asset);
                        }}
                        className="rounded-full bg-white px-4 py-2 text-xs font-black text-black transition hover:bg-primary"
                    >
                        Open
                    </button>
                    <button
                        type="button"
                        onClick={(event) => onShare(asset, event)}
                        aria-label={`Copy ${asset.title} link`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/70 text-xs text-white transition hover:bg-primary hover:text-black"
                    >
                        <i className="fas fa-paper-plane" />
                    </button>
                </div>
            </div>
        </div>
    </motion.article>
);

export default Home;
