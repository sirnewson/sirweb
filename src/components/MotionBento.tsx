import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clientMotionAssets, type UploadAsset } from '../data/uploadAssets';
import { quickRates, whatsappFor } from '../data/quickRates';

interface MotionBentoProps {
    onOpen: (asset: UploadAsset) => void;
}

/** Bento spans — deliberately irregular so the grid never reads as a table. */
const SPANS = [
    'md:col-span-2 md:row-span-2',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-2',
    'md:col-span-2 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-2 md:row-span-1',
];

const featured = clientMotionAssets.slice(0, 8);

/**
 * Video plays only on hover or tap. The source files are large, so nothing
 * autoplays here — a poster frame stands in until the visitor asks for motion.
 */
const Tile = ({ asset, span, index, onOpen }: { asset: UploadAsset; span: string; index: number; onOpen: (a: UploadAsset) => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [active, setActive] = useState(false);

    const play = () => {
        setActive(true);
        const v = videoRef.current;
        if (v) { v.currentTime = 0; v.play().catch(() => { }); }
    };
    const stop = () => {
        setActive(false);
        videoRef.current?.pause();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={play}
            onMouseLeave={stop}
            onClick={() => onOpen(asset)}
            className={`glow-stroke glow-stroke--hover group relative min-h-[190px] cursor-pointer overflow-hidden rounded-[12px] bg-neutral-dark ${span}`}
        >
            <video
                ref={videoRef}
                src={asset.src}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                style={{ filter: active ? 'none' : 'grayscale(0.5) brightness(0.75)' }}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-soft-black via-soft-black/25 to-transparent" />

            {/* Play affordance */}
            <span className="pointer-events-none absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-warm-white/25 bg-soft-black/50 backdrop-blur-sm transition group-hover:border-sunset group-hover:bg-sunset">
                <i className={`fas ${active ? 'fa-pause' : 'fa-play'} text-[10px] text-warm-white transition group-hover:text-soft-black`} />
            </span>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-sunset">{asset.category}</p>
                <p className="mt-1 line-clamp-2 font-display text-sm leading-snug text-warm-white">{asset.title}</p>
            </div>

            <span className="pointer-events-none absolute inset-0 rounded-[12px] ring-1 ring-inset ring-warm-white/10 transition group-hover:ring-sunset/45" />
        </motion.div>
    );
};

const MotionBento = ({ onOpen }: MotionBentoProps) => {
    const rate = quickRates.graphics;

    return (
        <section className="border-t border-white/5 px-4 py-16 md:px-6 md:py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">Motion & Video</p>
                        <h2 className="mt-3 font-display text-4xl leading-[1.04] md:text-6xl">
                            Things that <span className="italic">move.</span>
                        </h2>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-white/62">
                            Client reels, event recaps and motion identity. Hover any tile to play it.
                        </p>
                    </div>

                    {/* Quick rate, straight off the rate card */}
                    <div className="rounded-[12px] border border-white/10 bg-white/[0.03] p-5">
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/50">{rate.label}</p>
                        <p className="mt-1 font-display text-2xl text-sunset">Let's scope it.</p>
                        <p className="mt-1 text-[11px] text-white/50">{rate.turnaround}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <a
                                href={whatsappFor({ docket: 'graphics' })}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-[6px] bg-sunset px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-black transition hover:bg-clay"
                            >
                                <i className="fab fa-whatsapp" /> Get a quote
                            </a>
                            <Link
                                to="/services"
                                className="rounded-[6px] border border-white/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 transition hover:border-sunset/50 hover:text-sunset"
                            >
                                See services
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid auto-rows-[190px] grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
                    {featured.map((asset, i) => (
                        <Tile key={asset.id} asset={asset} span={SPANS[i % SPANS.length]} index={i} onOpen={onOpen} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MotionBento;
