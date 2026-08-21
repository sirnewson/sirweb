import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { UploadAsset } from '../data/uploadAssets';
import { WordRise } from './Animated';

interface WorkWallProps {
    assets: UploadAsset[];
    onOpen: (asset: UploadAsset) => void;
}

/**
 * Full-bleed masonry. The homepage leads with the work, so this runs edge to
 * edge rather than sitting inside the page container.
 */
const WorkWall = ({ assets, onOpen }: WorkWallProps) => {
    return (
        <section className="relative py-20 md:py-28">
            <div className="mb-10 flex flex-col gap-5 px-6 md:mb-14 md:flex-row md:items-end md:justify-between md:px-10">
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">Selected Work</p>
                    <h2 className="mt-4 font-display text-5xl leading-[1.02] md:text-7xl">
                        <WordRise text="The work," />
                        <br />
                        <span className="italic text-white/55"><WordRise text="not the pitch." delay={0.12} /></span>
                    </h2>
                </div>
                <Link
                    to="/work"
                    className="group inline-flex w-fit items-center gap-3 border-b border-white/20 pb-2 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-sunset hover:text-sunset"
                >
                    See everything
                    <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="columns-2 gap-3 px-3 md:columns-3 md:gap-4 md:px-4 xl:columns-4">
                {assets.map((asset, index) => (
                    <motion.button
                        key={asset.id}
                        type="button"
                        onClick={() => onOpen(asset)}
                        onMouseEnter={(e) => { const v = e.currentTarget.querySelector('video'); if (v) v.play().catch(() => {}); }}
                        onMouseLeave={(e) => { const v = e.currentTarget.querySelector('video'); if (v) v.pause(); }}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.55, delay: Math.min((index % 8) * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
                        className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[10px] bg-neutral-dark md:mb-4"
                    >
                        {asset.type === 'video' ? (
                            <video
                                src={asset.src}
                                muted
                                loop
                                playsInline
                                preload="none"
                                className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />
                        ) : (
                            <img
                                src={asset.src}
                                alt={asset.title}
                                loading="lazy"
                                className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />
                        )}

                        {/* Caption rises on hover */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-soft-black via-soft-black/70 to-transparent p-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sunset">{asset.category}</p>
                            <p className="mt-1 text-left font-display text-sm leading-snug text-white">{asset.title}</p>
                        </div>

                        <span className="pointer-events-none absolute inset-0 rounded-[10px] ring-1 ring-inset ring-white/10 transition group-hover:ring-sunset/50" />
                    </motion.button>
                ))}
            </div>
        </section>
    );
};

export default WorkWall;
