import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';
import { brandingAssets, graphicsAssets, motionAssets, recentUploadAssets, type UploadAsset } from '../data/uploadAssets';

const websiteSamples = [
    {
        title: 'Nyukia Sali',
        url: 'https://nyukiasali.com/',
        description: 'A polished public web presence with a clean brand-first structure.',
    },
    {
        title: 'OrdaFasta',
        url: 'https://ordafasta.com/',
        description: 'A practical product and ordering experience shaped for quick buyer action.',
    },
    {
        title: 'TAK Network',
        url: 'https://taknetwork.co.ke/',
        description: 'A structured organizational site with clear navigation and trust signals.',
    },
    {
        title: 'PataKazi',
        url: 'https://patakazi.co.ke/',
        description: 'A platform-style web experience for discovery, listings, and useful action.',
    },
    {
        title: 'YXM Digital',
        url: 'https://yxm.digital/',
        description: 'A digital studio presence with service clarity and a premium interface feel.',
    },
    {
        title: 'Mapenzi Vibandaski',
        url: 'https://mapenzivibandaski.co.ke/',
        description: 'An event and campaign site with personality, story, and direct conversion flow.',
    },
];

const Work = () => {
    useEffect(() => {
        document.title = 'Selected Work | Branding, Graphics, Motion & Websites by Sir Newson';
    }, []);

    const [selectedMedia, setSelectedMedia] = useState<UploadAsset | null>(null);

    return (
        <div className="min-h-screen bg-neutral-black text-white">
            <Hero
                title={<span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">Selected Work</span>}
                subtitle="Branding • Graphics • Motion • Websites"
                shortParagraph="A cleaned-up, folder-backed archive of the real creative assets currently in the upload folders, plus sample websites already shipped."
                primaryCtaLabel="Start a Project"
                primaryCtaPath="/contact"
                secondaryCtaLabel="Website Services"
                secondaryCtaPath="/website"
            />

            <section className="px-6 py-14">
                <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
                    {[
                        ['Brand Identity', 'Logos, systems, boards, and mockups'],
                        ['Graphic Design', 'Posters, campaigns, social visuals'],
                        ['Motion & Video', 'Reels, loops, logo animations'],
                        ['Websites', 'Live websites and digital product pages'],
                    ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-primary/50 hover:bg-white/[0.06]">
                            <p className="font-display text-xl font-black text-primary">{label}</p>
                            <p className="mt-3 text-sm leading-6 text-white/55">{value}</p>
                        </div>
                    ))}
                </div>
            </section>

            <PortfolioSection
                eyebrow="Recent Work"
                title="Recent Creative Work"
                description="A current selection of brand systems, campaign visuals, posters, and motion pieces."
                assets={recentUploadAssets}
                onOpen={setSelectedMedia}
                layout="feature-grid"
            />

            <PortfolioSection
                eyebrow="Visual Identity"
                title="Branding"
                description="Logos, brand boards, mockups, and identity systems from the branding folder."
                assets={brandingAssets}
                onOpen={setSelectedMedia}
                layout="masonry"
                dark
            />

            <PortfolioSection
                eyebrow="Campaign Visuals"
                title="Graphics"
                description="Poster systems, event visuals, promotional designs, wallpapers, and social graphics."
                assets={graphicsAssets}
                onOpen={setSelectedMedia}
                layout="masonry"
            />

            <PortfolioSection
                eyebrow="Motion & Video"
                title="Motion"
                description="Logo animations, reels, loops, social motion, and video concepts from the motion folder."
                assets={motionAssets}
                onOpen={setSelectedMedia}
                layout="video-grid"
                dark
            />

            <section className="border-t border-white/5 px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">Website Page</p>
                            <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">Sample Websites Done</h2>
                            <p className="mt-3 max-w-2xl text-white/60">
                                A small live-site shelf for the web work, kept separate from the upload-folder media archive.
                            </p>
                        </div>
                        <Link
                            to="/website"
                            className="inline-flex w-fit items-center gap-3 rounded-full border border-primary/40 px-6 py-3 text-xs font-black uppercase tracking-wider text-primary transition hover:bg-primary hover:text-black"
                        >
                            Website Services
                            <i className="fas fa-arrow-right" />
                        </Link>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {websiteSamples.map((site, index) => (
                            <motion.a
                                key={site.url}
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-primary/60 hover:bg-white/[0.06]"
                            >
                                <div className="mb-8 flex items-center justify-between">
                                    <span className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Live Site</span>
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-black transition group-hover:bg-white">
                                        <i className="fas fa-external-link-alt text-xs" />
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl font-black">{site.title}</h3>
                                <p className="mt-4 text-sm leading-6 text-white/60">{site.description}</p>
                            </motion.a>
                        ))}
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

interface PortfolioSectionProps {
    eyebrow: string;
    title: string;
    description: string;
    assets: UploadAsset[];
    layout: 'feature-grid' | 'masonry' | 'video-grid';
    dark?: boolean;
    onOpen: (asset: UploadAsset) => void;
}

const PortfolioSection = ({ eyebrow, title, description, assets, layout, dark = false, onOpen }: PortfolioSectionProps) => (
    <section className={`border-t border-white/5 px-6 py-20 ${dark ? 'bg-neutral-dark' : 'bg-neutral-black'}`}>
        <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
                <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">{title}</h2>
                <p className="mt-3 text-white/60">{description}</p>
            </div>

            <div
                className={
                    layout === 'masonry'
                        ? 'columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4'
                        : layout === 'video-grid'
                            ? 'columns-1 gap-5 space-y-5 sm:columns-2 xl:columns-3'
                            : 'columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4'
                }
            >
                {assets.map((asset, index) => (
                    <motion.article
                        key={asset.id}
                        id={asset.id}
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.28) }}
                        onClick={() => onOpen(asset)}
                        className={`group relative mb-5 break-inside-avoid cursor-pointer overflow-hidden transition hover:-translate-y-1 ${
                            layout === 'video-grid'
                                ? 'rounded-none border-0 bg-transparent'
                                : `rounded-2xl border border-white/10 bg-black hover:border-primary/60 ${layout === 'feature-grid' && asset.type !== 'video' ? 'aspect-[4/5]' : ''}`
                        }`}
                    >
                        {asset.type === 'video' ? (
                            <video
                                src={asset.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="h-auto w-full rounded-2xl border border-white/10 object-contain opacity-95 transition duration-500 group-hover:scale-[1.01] group-hover:border-primary/60"
                            />
                        ) : (
                            <img
                                src={asset.src}
                                alt={asset.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/65 via-black/5 to-black/85 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="w-fit rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/70">
                                {asset.category}
                            </span>
                            <div className="flex items-end justify-between gap-4">
                                <h3 className="line-clamp-2 font-display text-xl font-black leading-tight">{asset.title}</h3>
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onOpen(asset);
                                    }}
                                    className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-black text-black transition hover:bg-white"
                                >
                                    Open
                                </button>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    </section>
);

export default Work;
