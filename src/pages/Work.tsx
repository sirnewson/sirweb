import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';
import { brandingAssets, graphicsAssets, motionAssets, recentUploadAssets, type UploadAsset } from '../data/uploadAssets';
import { ScrollReveal, Magnetic } from '../components/Animated';

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
        title: 'Big Voice Fest',
        url: 'https://bigvoicefest.com/',
        description: 'A festival site carrying lineup, tickets and campaign in one place.',
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
    const [selectedMedia, setSelectedMedia] = useState<UploadAsset | null>(null);

    return (
        <div className="min-h-screen bg-neutral-black text-white">
            <SEO
                title="Selected Work | Branding, Product Visuals, Motion & Websites | Sir Newson"
                description="Real work that shipped: brand identities, product posters, catalogues, campaign visuals, motion graphics and websites prepared for launch by Sir Newson in Nairobi, Kenya."
                keywords="creative portfolio Kenya, branding portfolio Nairobi, product poster design Kenya, catalogue design Kenya, motion graphics Kenya, website portfolio Kenya, campaign visuals Kenya"
                path="/work"
            />
            <Hero
                title={<span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">Work That Went Out Into the World</span>}
                subtitle="Products • Stories • Brands • Businesses"
                shortParagraph="Not a mood board. These are the campaigns, products, videos and websites that actually launched — prepared to be posted, sold, watched and trusted."
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
                        <div key={label} className="rounded-[12px] border border-white/10 bg-white/[0.03] p-6 transition hover:border-primary/50 hover:bg-clay/[0.06]">
                            <p className="font-display text-xl font-semibold text-primary">{label}</p>
                            <p className="mt-3 text-sm leading-6 text-white/70">{value}</p>
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
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary font-mono">Website Page</p>
                            <h2 className="mt-3 font-display text-4xl font-semibold md:text-6xl">Sample Websites Done</h2>
                            <p className="mt-3 max-w-2xl text-white/70">
                                A small live-site shelf for the web work, kept separate from the upload-folder media archive.
                            </p>
                        </div>
                        <Magnetic>
                            <Link
                                to="/website"
                                className="inline-flex w-fit items-center gap-3 rounded-[8px] border border-primary/40 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-black block text-center"
                            >
                                Website Services
                                <i className="fas fa-arrow-right" />
                            </Link>
                        </Magnetic>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {websiteSamples.map((site, index) => (
                            <ScrollReveal
                                key={site.url}
                                direction="up"
                                delay={index * 0.06}
                                duration={0.6}
                                className="h-full"
                            >
                                <a
                                    href={site.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-[12px] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-primary/60 hover:bg-clay/[0.06] h-full flex flex-col justify-between block"
                                >
                                    <div>
                                        <div className="mb-8 flex items-center justify-between">
                                            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60 font-mono">Live Site</span>
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-black transition group-hover:bg-clay">
                                                <i className="fas fa-external-link-alt text-xs" />
                                            </span>
                                        </div>
                                        <h3 className="font-display text-3xl font-semibold">{site.title}</h3>
                                        <p className="mt-4 text-sm leading-6 text-white/70">{site.description}</p>
                                    </div>
                                </a>
                            </ScrollReveal>
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
            <ScrollReveal direction="up" duration={0.6}>
                <div className="mb-10 max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary font-mono">{eyebrow}</p>
                    <h2 className="mt-3 font-display text-4xl font-semibold md:text-6xl">{title}</h2>
                    <p className="mt-3 text-white/70">{description}</p>
                </div>
            </ScrollReveal>

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
                    <ScrollReveal
                        key={asset.id}
                        direction="up"
                        delay={Math.min(index * 0.035, 0.25)}
                        duration={0.5}
                    >
                        <article
                            id={asset.id}
                            onClick={() => onOpen(asset)}
                            className={`group relative mb-5 break-inside-avoid cursor-pointer overflow-hidden transition hover:-translate-y-1 ${
                                layout === 'video-grid'
                                    ? 'rounded-none border-0 bg-transparent'
                                    : `rounded-[12px] border border-white/10 bg-black hover:border-primary/60 ${layout === 'feature-grid' && asset.type !== 'video' ? 'aspect-[4/5]' : ''}`
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
                                    className="h-auto w-full rounded-[12px] border border-white/10 object-contain opacity-95 transition duration-500 group-hover:scale-[1.01] group-hover:border-primary/60"
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
                                <span className="w-fit rounded-[8px] border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/78">
                                    {asset.category}
                                </span>
                                <div className="flex items-end justify-between gap-4">
                                    <h3 className="line-clamp-2 font-display text-xl font-semibold leading-tight">{asset.title}</h3>
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onOpen(asset);
                                        }}
                                        className="shrink-0 rounded-[8px] bg-primary px-4 py-2 text-xs font-semibold text-black transition hover:bg-clay"
                                    >
                                        Open
                                    </button>
                                </div>
                            </div>
                        </article>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

export default Work;
