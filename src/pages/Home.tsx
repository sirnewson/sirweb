import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { collection, limit as limitQuery, onSnapshot, orderBy, query } from 'firebase/firestore';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import MediaModal from '../components/MediaModal';
import Footer from '../components/Footer';
import HangingGallery from '../components/HangingGallery';
import WorkWall from '../components/WorkWall';
import { uploadedAssets, recentUploadAssets, type UploadAsset } from '../data/uploadAssets';
import { db } from '../firebase';
import { ScrollReveal, WordRise, RuleDraw } from '../components/Animated';
import ClientTicker from '../components/ClientTicker';
import FinalCta from '../components/FinalCta';
import MotionBento from '../components/MotionBento';
import FeaturedProject from '../components/FeaturedProject';

interface ThreadPreview {
    id: string;
    content: string;
    category: string;
    timestamp?: { seconds: number };
}

/** Featured items first, then the wider archive, so the wall opens strong. */
const featured = recentUploadAssets.slice(0, 16);
const wallAssets = uploadedAssets
    .filter((a) => !featured.some((f) => f.id === a.id))
    .slice(0, 20);

/** The four brands operating under Sir Newson. */
const worlds = [
    {
        num: '01',
        label: 'Apparel',
        title: 'Jinwear',
        note: 'Wearable design — apparel, drops and wall art.',
        path: 'https://www.jinwear.co.ke/',
        external: true,
    },
    {
        num: '02',
        label: 'Writing',
        title: 'Wynmind',
        note: 'Thinking out loud about design, systems and culture.',
        path: 'https://wynmind.com',
        external: true,
    },
    {
        num: '03',
        label: 'Creative tech',
        title: 'YXM Digital',
        note: 'Tools, AI systems and product experiments.',
        path: 'https://yxm.digital/',
        external: true,
    },
    {
        num: '04',
        label: 'Media',
        title: 'TAK Network',
        note: 'Business insight, culture and technology commentary.',
        path: 'https://taknetwork.co.ke',
        external: true,
    },
];

const fallbackNotes = [
    { id: 'a', text: 'Design gets stronger when the thinking gets clearer.', tag: 'Note' },
    { id: 'b', text: 'A good system makes the next good decision easier.', tag: 'Note' },
    { id: 'c', text: 'Creative direction is taste plus responsibility.', tag: 'Note' },
];

const Home = () => {
    const [selectedMedia, setSelectedMedia] = useState<UploadAsset | null>(null);
    const [latestThreads, setLatestThreads] = useState<ThreadPreview[]>([]);
    const [toastMessage] = useState<string | null>(null);

    useEffect(() => {
        const threadsQuery = query(collection(db, 'threads'), orderBy('timestamp', 'desc'), limitQuery(3));
        const unsubscribe = onSnapshot(
            threadsQuery,
            (snapshot) => {
                setLatestThreads(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as ThreadPreview[]);
            },
            () => setLatestThreads([])
        );
        return () => unsubscribe();
    }, []);

    const notes = latestThreads.length > 0
        ? latestThreads.map((t) => ({ id: t.id, text: t.content, tag: t.category || 'Note' }))
        : fallbackNotes;

    return (
        <div className="relative min-h-screen overflow-hidden bg-neutral-black font-sans text-white">
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
                        className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-[8px] bg-sunset px-6 py-3 font-mono text-[11px] uppercase tracking-wide text-black shadow-2xl"
                    >
                        {toastMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            <Hero
                trustLine="Creative direction since 2020 · Nairobi, Kenya"
                primaryCtaLabel="See the Work"
                primaryCtaPath="/work"
                secondaryCtaLabel="Start a Project"
                secondaryCtaPath="/contact"
            />

            <ClientTicker />

            <FinalCta />

            <MotionBento onOpen={setSelectedMedia} />

            <FeaturedProject />

            {/* The work leads. Everything else earns its place after it. */}
            <HangingGallery assets={featured} onOpen={setSelectedMedia} />

            <WorkWall assets={wallAssets} onOpen={setSelectedMedia} />

            {/* The whole positioning, in one line instead of five sections. */}
            <section className="aurora-solid relative overflow-hidden border-y border-white/5 px-6 py-28 md:py-40">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/25 blur-[150px]" />
                <ScrollReveal direction="up" duration={0.8}>
                    <p className="relative mx-auto max-w-5xl text-center font-editorial text-4xl leading-[1.08] md:text-7xl">
                        <WordRise text="Clients rarely arrive with a brief." className="justify-center" />
                        <span className="mt-2 block" />
                        <WordRise text="They arrive with raw material" className="justify-center" delay={0.12} />
                        <span className="mt-2 block" />
                        <WordRise text="and a date it has to be ready." className="justify-center" delay={0.24} />
                    </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2} duration={0.7}>
                    <p className="relative mx-auto mt-10 max-w-xl text-center text-sm leading-7 text-white/55 md:text-base">
                        Photographs, footage, a product, a half-formed idea. My work is to give it the shape, clarity and finish it needs to stand in front of an audience.
                    </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3} duration={0.7}>
                    <div className="relative mt-10 flex justify-center">
                        <Link
                            to="/services"
                            className="group inline-flex items-center gap-3 border-b border-espresso/30 pb-2 font-mono text-xs uppercase tracking-[0.2em] transition hover:border-espresso"
                        >
                            How it works
                            <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </ScrollReveal>
            </section>

            {/* What else I'm building */}
            <section className="px-3 py-16 md:px-4 md:py-24">
                <div className="mb-10 px-3 md:px-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">The Brands</p>
                    <RuleDraw className="mt-4 max-w-xs" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
                    {worlds.map((world, index) => {
                        const inner = (
                            <>
                                {/* Sunset floods up from the base on hover */}
                                <span className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-sunset/18 to-transparent transition-all duration-500 ease-out group-hover:h-full" />
                                <span className="absolute right-6 top-6 font-mono text-[11px] text-white/20 transition-colors duration-500 group-hover:text-sunset">
                                    {world.num}
                                </span>
                                <div className="relative">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-sunset">{world.label}</p>
                                    <h3 className="mt-3 font-display text-4xl transition-transform duration-500 ease-out group-hover:-translate-y-1 md:text-5xl">
                                        {world.title}
                                    </h3>
                                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">{world.note}</p>
                                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition group-hover:text-sunset">
                                        {world.external ? 'Visit' : 'Enter'}
                                        <i className={`fas ${world.external ? 'fa-arrow-up-right-from-square text-[9px]' : 'fa-arrow-right'} transition-transform group-hover:translate-x-1`} />
                                    </span>
                                </div>
                                <span className="pointer-events-none absolute inset-0 rounded-[10px] ring-1 ring-inset ring-white/10 transition group-hover:ring-sunset/45" />
                            </>
                        );
                        const cls = 'glow-stroke glow-stroke--hover group relative flex h-[280px] flex-col justify-end overflow-hidden rounded-[10px] border border-white/[0.06] bg-neutral-dark p-7 transition-colors duration-500 hover:bg-neutral-medium md:h-[360px]';

                        return (
                            <ScrollReveal key={world.title} direction="up" delay={index * 0.08} duration={0.7} className="h-full">
                                {world.external ? (
                                    <a href={world.path} target="_blank" rel="noopener noreferrer" className={cls}>
                                        {inner}
                                    </a>
                                ) : (
                                    <Link to={world.path} className={cls}>{inner}</Link>
                                )}
                            </ScrollReveal>
                        );
                    })}
                </div>
            </section>

            {/* The mind — three short notes, no essay */}
            <section className="border-t border-white/5 px-6 py-16 md:px-10 md:py-24">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">From the Studio</p>
                    <Link
                        to="/threads"
                        className="group inline-flex w-fit items-center gap-3 border-b border-white/20 pb-2 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-sunset hover:text-sunset"
                    >
                        All notes
                        <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid gap-3 md:grid-cols-3 md:gap-4">
                    {notes.map((note, index) => (
                        <ScrollReveal key={note.id} direction="up" delay={index * 0.06} duration={0.65} className="h-full">
                            <article className="h-full rounded-[10px] border border-white/10 bg-white/[0.02] p-7 transition hover:border-sunset/30 hover:bg-white/[0.04]">
                                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sunset">{note.tag}</p>
                                <p className="mt-5 line-clamp-5 font-display text-xl leading-[1.4] text-white/85">{note.text}</p>
                            </article>
                        </ScrollReveal>
                    ))}
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

export default Home;
