import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { collection, limit as limitQuery, onSnapshot, orderBy, query } from 'firebase/firestore';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import MediaModal from '../components/MediaModal';
import Footer from '../components/Footer';
import { recentUploadAssets, type UploadAsset } from '../data/uploadAssets';
import { db } from '../firebase';
import { ScrollReveal, Magnetic } from '../components/Animated';
import ClientTicker from '../components/ClientTicker';
import ReadyRotator from '../components/ReadyRotator';
import PresentationPillars from '../components/PresentationPillars';
import ReadinessFramework from '../components/ReadinessFramework';
import Manifesto from '../components/Manifesto';
import FinalCta from '../components/FinalCta';

interface ThreadPreview {
    id: string;
    content: string;
    category: string;
    timestamp?: { seconds: number };
}

const transformationRows: [string, string][] = [
    ['Raw product photos', 'Sales-ready product visuals'],
    ['Unedited footage', 'Publish-ready videos'],
    ['A product list', 'A professional catalogue'],
    ['A business idea', 'A credible digital presence'],
    ['An event concept', 'A complete visual campaign'],
    ['A rough idea', 'A way for the world to see it'],
];

const whyPoints = [
    {
        title: 'I understand the assignment',
        desc: 'Clients arrive with scattered photos, voice notes, rough ideas, product lists, or urgent announcements. I find the finished communication hiding inside the raw material.',
        icon: 'fas fa-crosshairs',
    },
    {
        title: 'I think beyond the asset',
        desc: 'A poster is not just a poster. Each piece has a job: create interest, build trust, clarify value, or move someone to act.',
        icon: 'fas fa-brain',
    },
    {
        title: 'I bring multiple skills together',
        desc: 'Design, motion, writing, storytelling, branding, websites and AI work under one goal — presenting the idea properly.',
        icon: 'fas fa-layer-group',
    },
    {
        title: 'I build for the real world',
        desc: 'The work is designed to be used. To be posted, shared, watched, clicked, sold, and remembered.',
        icon: 'fas fa-bolt',
    },
];

const Home = () => {
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
            <SEO
                title="Sir Newson | Creative Director & Presentation Architect in Kenya"
                description="Sir Newson helps ideas, products, stories and businesses move from unfinished to ready. Product visuals, video editing, catalogues, brand identity, websites and creative direction in Nairobi, Kenya."
                keywords="Sir Newson, presentation architect Kenya, creative director Kenya, brand identity Kenya, website design Kenya, product visuals Kenya, catalogue design Kenya, video editing Kenya, motion graphics Nairobi, creative agency Nairobi"
                path="/"
            />

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
                trustLine="Creative direction since 2020 · Nairobi, Kenya · Usually replies the same day"
                primaryCtaLabel="Start a Project"
                primaryCtaPath="/contact"
                secondaryCtaLabel="View Selected Work"
                secondaryCtaPath="/work"
            />

            <ClientTicker />

            {/* The core positioning: what you bring vs what I build */}
            <section className="border-t border-white/5 px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 max-w-3xl">
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">Presentation Is More Than Design</p>
                        <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">What You Bring. What I Build.</h2>
                        <p className="mt-4 text-lg leading-8 text-white/60">
                            Most people do not come to me because they need "a graphic." They come with something unfinished — a product that needs to look ready for sale, footage that needs editing for the internet, a business that needs to look credible. My job is to take the raw form and shape it into something people understand, trust, and act on.
                        </p>
                    </div>

                    <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {transformationRows.map(([before, after], index) => (
                            <ScrollReveal
                                key={before}
                                direction="up"
                                delay={index * 0.05}
                                duration={0.6}
                                className="h-full"
                            >
                                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">You bring</p>
                                    <p className="mt-2 font-display text-lg font-black text-white/70">{before}</p>
                                    <div className="my-4 flex items-center gap-2 text-primary">
                                        <span className="h-px flex-1 bg-primary/30" />
                                        <i className="fas fa-arrow-down text-xs" />
                                        <span className="h-px flex-1 bg-primary/30" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/70">I build</p>
                                    <p className="mt-2 font-display text-lg font-black text-white">{after}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal direction="up" duration={0.6}>
                        <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center sm:flex-row sm:justify-center sm:gap-10">
                            <div className="flex flex-wrap justify-center gap-2">
                                {['Raw', 'Incomplete', 'Internal', 'Confusing', 'Unpolished'].map((tag) => (
                                    <span key={tag} className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/40">{tag}</span>
                                ))}
                            </div>
                            <i className="fas fa-arrow-right hidden text-xl text-primary sm:block" />
                            <i className="fas fa-arrow-down text-xl text-primary sm:hidden" />
                            <div className="flex flex-wrap justify-center gap-2">
                                {['Professional', 'Clear', 'Attractive', 'Trusted', 'Ready'].map((tag) => (
                                    <span key={tag} className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-primary">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    <p className="mx-auto mt-10 max-w-3xl text-center font-display text-2xl font-black text-white md:text-3xl">
                        The work is not finished when it looks good. <span className="text-primary">It is finished when it is ready to meet its audience.</span>
                    </p>
                </div>
            </section>

            <ReadyRotator />

            <PresentationPillars />

            {/* Proof: real work */}
            <section className="border-t border-white/5 px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">Proof, Not Claims</p>
                            <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Work That Went Out Into the World.</h2>
                            <p className="mt-3 max-w-2xl text-white/60">
                                Real campaigns, products and posts that shipped. The full archive lives on the Work page.
                            </p>
                        </div>
                        <Magnetic>
                            <Link
                                to="/work"
                                className="inline-flex w-fit items-center gap-3 rounded-full bg-primary px-6 py-3 text-xs font-black uppercase tracking-wider text-black transition hover:bg-white"
                            >
                                View Full Work
                                <i className="fas fa-arrow-right" />
                            </Link>
                        </Magnetic>
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

            <ReadinessFramework />

            {/* Why people call */}
            <section className="border-t border-white/5 px-6 py-24">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">Why People Call</p>
                        <h2 className="mt-3 font-display text-4xl font-black leading-tight md:text-5xl">
                            Not because the gradients are nice.
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-white/60">
                            Because nobody wants to embarrass themselves when they launch. People pay for the confidence of knowing the work is ready.
                        </p>
                        <Magnetic>
                            <Link
                                to="/services"
                                className="mt-8 inline-flex items-center gap-3 rounded-full border border-primary/40 px-6 py-3 text-xs font-black uppercase tracking-wider text-primary transition hover:bg-primary hover:text-black"
                            >
                                See How I Work
                                <i className="fas fa-arrow-right" />
                            </Link>
                        </Magnetic>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {whyPoints.map((point, index) => (
                            <ScrollReveal key={point.title} direction="up" delay={index * 0.06} duration={0.6} className="h-full">
                                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-primary/50 hover:bg-white/[0.06]">
                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <i className={point.icon} />
                                    </div>
                                    <h3 className="font-display text-xl font-black">{point.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-white/55">{point.desc}</p>
                                </article>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <Manifesto />

            {/* Studio notes — kept light */}
            <section className="border-t border-white/5 bg-neutral-dark px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">Drift Notes</p>
                            <h2 className="mt-3 font-display text-3xl font-black md:text-5xl">Thoughts From the Studio</h2>
                        </div>
                        <Magnetic>
                            <Link
                                to="/threads"
                                className="inline-flex w-fit items-center gap-3 rounded-full border border-primary/40 px-6 py-3 text-xs font-black uppercase tracking-wider text-primary transition hover:bg-primary hover:text-black"
                            >
                                Read Threads
                                <i className="fas fa-arrow-right" />
                            </Link>
                        </Magnetic>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {latestThreads.length > 0 ? latestThreads.map((thread, index) => (
                            <ScrollReveal key={thread.id} direction="up" delay={index * 0.06} duration={0.65} className="h-full">
                                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.06]">
                                    <div className="mb-5 flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                                            {thread.category || 'Thought'}
                                        </span>
                                        <span className="text-[10px] font-mono uppercase text-white/35">
                                            {thread.timestamp ? new Date(thread.timestamp.seconds * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Now'}
                                        </span>
                                    </div>
                                    <p className="line-clamp-5 text-base font-medium leading-7 text-white/80">{thread.content}</p>
                                </article>
                            </ScrollReveal>
                        )) : (
                            [
                                'Design gets stronger when the thinking gets clearer.',
                                'A good system makes the next good decision easier.',
                                'Creative direction is taste plus responsibility.'
                            ].map((thread, index) => (
                                <ScrollReveal key={thread} direction="up" delay={index * 0.06} duration={0.65} className="h-full">
                                    <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Studio Note</span>
                                        <p className="mt-5 text-base font-medium leading-7 text-white/80">{thread}</p>
                                    </article>
                                </ScrollReveal>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <FinalCta />

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
