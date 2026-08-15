import { useEffect, useMemo, useRef, useState } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useVelocity,
    type MotionValue,
} from 'framer-motion';
import type { UploadAsset } from '../data/uploadAssets';

interface HangingGalleryProps {
    assets: UploadAsset[];
    onOpen: (asset: UploadAsset) => void;
}

const CARD_W = 220;
const GAP = 64;

/* ---------------------------------------------------------------
   Dust
   --------------------------------------------------------------- */

const DustMote = ({ seed }: { seed: number }) => (
    <motion.span
        className="absolute h-[3px] w-[3px] rounded-full bg-soft-amber/30"
        initial={{ left: `${(seed * 37) % 100}%`, top: `${(seed * 61) % 100}%`, opacity: 0 }}
        animate={{
            x: [0, ((seed % 7) - 3) * 40],
            y: [0, ((seed % 5) - 2) * 40],
            opacity: [0, 0.5, 0],
        }}
        transition={{ duration: 16 + (seed % 12), repeat: Infinity, ease: 'linear', delay: seed * 0.4 }}
    />
);

/* ---------------------------------------------------------------
   One hanging print
   --------------------------------------------------------------- */

interface PrintProps {
    asset: UploadAsset;
    index: number;
    railVelocity: MotionValue<number>;
    pointer: { x: number; y: number };
    reduced: boolean;
    onOpen: (asset: UploadAsset) => void;
}

const Print = ({ asset, index, railVelocity, pointer, reduced, onOpen }: PrintProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Each print hangs a little differently so the row never looks stamped.
    const cfg = useMemo(() => {
        const n = index * 977 % 100;
        return {
            drop: 34 + (n % 26),
            stiffness: 34 + (n % 16),
            damping: 17 + (n % 5),
            mass: 1.1 + (n % 3) * 0.22,
        };
    }, [index]);

    const rotate = useSpring(0, { stiffness: cfg.stiffness, damping: cfg.damping, mass: cfg.mass });
    const skewX = useSpring(0, { stiffness: 45, damping: 22 });
    const scale = useSpring(1, { stiffness: 200, damping: 25 });
    const lift = useSpring(0, { stiffness: 120, damping: 20 });

    // Drag velocity swings the print on its pegs.
    useEffect(() => {
        if (reduced) return;
        return railVelocity.on('change', (v) => {
            rotate.set(Math.max(Math.min(v / 55, 16), -16));
            skewX.set(Math.max(Math.min(v / 200, 5), -5));
        });
    }, [railVelocity, rotate, skewX, reduced]);

    // Prints lean away from the cursor as it passes.
    useEffect(() => {
        if (reduced || !ref.current) return;
        const frame = requestAnimationFrame(() => {
            const el = ref.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const dx = pointer.x - (r.left + r.width / 2);
            const dy = pointer.y - (r.top + r.height / 2);
            const dist = Math.hypot(dx, dy);
            if (dist < 380) {
                const power = 1 - dist / 380;
                rotate.set(power * 11 * (dx < 0 ? 1 : -1));
                skewX.set(power * 3.5 * (dx / 140));
                lift.set(power * 14);
            } else {
                rotate.set(0);
                skewX.set(0);
                lift.set(0);
            }
        });
        return () => cancelAnimationFrame(frame);
    }, [pointer, rotate, skewX, lift, reduced]);

    // Light sits top-left, so the cast shadow tracks the swing.
    const boxShadow = useTransform(rotate, (r: number) => {
        const x = 18 + r / 4;
        return `${x}px 34px 60px rgba(0,0,0,0.62), ${x / 2}px 16px 26px rgba(0,0,0,0.4), 4px 4px 34px rgba(242,139,44,0.10)`;
    });

    return (
        <motion.div
            ref={ref}
            className="relative mx-8 flex-shrink-0 cursor-pointer select-none"
            style={{ width: CARD_W, rotate, skewX, scale, y: lift, originY: '-110%' }}
            initial={reduced ? { opacity: 0 } : { y: -620, rotate: 12, opacity: 0 }}
            whileInView={reduced ? { opacity: 1 } : { y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={
                reduced
                    ? { duration: 0.4 }
                    : { type: 'spring', stiffness: 42, damping: 15, mass: 1.2, delay: 0.1 + (index % 8) * 0.07 }
            }
            onMouseEnter={(e) => {
                scale.set(1.04);
                const v = e.currentTarget.querySelector('video');
                if (v) v.play().catch(() => { });
            }}
            onMouseLeave={(e) => {
                scale.set(1);
                e.currentTarget.querySelector('video')?.pause();
            }}
            onClick={() => onOpen(asset)}
        >
            {/* Threads up to the wire */}
            <span className="absolute -top-[260px] left-[46%] h-[268px] w-px bg-gradient-to-b from-transparent via-white/15 to-white/25" />
            <span className="absolute -top-[260px] left-[54%] h-[268px] w-px bg-gradient-to-b from-transparent via-white/15 to-white/25" />

            {/* Peg */}
            <span className="absolute -top-3 left-1/2 z-30 h-6 w-3.5 -translate-x-1/2 -rotate-6 rounded-[2px] bg-gradient-to-b from-soft-amber to-sienna shadow-[2px_4px_8px_rgba(0,0,0,0.6)]">
                <span className="absolute inset-x-0 top-1/2 h-px bg-soft-black/30" />
            </span>

            <motion.div
                style={{ boxShadow }}
                className="group relative bg-warm-white p-3 pb-7"
            >
                <div className="relative aspect-square overflow-hidden bg-neutral-medium">
                    {asset.type === 'video' ? (
                        <video
                            src={asset.src}
                            muted
                            loop
                            playsInline
                            preload="none"
                            className="h-full w-full object-cover contrast-[1.05] grayscale-[35%] transition-all duration-[900ms] group-hover:grayscale-0"
                        />
                    ) : (
                        <img
                            src={asset.src}
                            alt={asset.title}
                            loading="lazy"
                            className="h-full w-full object-cover contrast-[1.05] grayscale-[35%] transition-all duration-[900ms] group-hover:grayscale-0"
                        />
                    )}
                </div>

                <div className="mt-3 px-0.5">
                    <h3 className="truncate font-editorial text-[15px] italic leading-tight text-soft-black">
                        {asset.title}
                    </h3>
                    <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.2em] text-soft-black/50">
                        {asset.category}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ---------------------------------------------------------------
   The rail
   --------------------------------------------------------------- */

const HangingGallery = ({ assets, onOpen }: HangingGalleryProps) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const scrubRef = useRef<HTMLDivElement>(null);
    const [maxDrag, setMaxDrag] = useState(0);
    const [pointer, setPointer] = useState({ x: -9999, y: -9999 });
    const [reduced, setReduced] = useState(false);

    const x = useMotionValue(0);
    const velocity = useVelocity(x);
    const springX = useSpring(x, { stiffness: 30, damping: 20 });

    const scrubW = 260;
    const scrubX = useTransform(x, [0, maxDrag || -1], [0, scrubW]);
    const springScrub = useSpring(scrubX, { stiffness: 35, damping: 22 });
    const wireX = useTransform(springX, (v) => v * 0.12);
    const dustX = useTransform(springX, (v) => v * 0.06);

    useEffect(() => {
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    useEffect(() => {
        const measure = () => {
            const total = assets.length * (CARD_W + GAP);
            setMaxDrag(Math.min(0, -(total - window.innerWidth + 120)));
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [assets.length]);

    useEffect(() => {
        if (reduced) return;
        const onMove = (e: MouseEvent) => setPointer({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [reduced]);

    const seekTo = (clientX: number) => {
        const el = scrubRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const pos = Math.max(0, Math.min(clientX - rect.left, scrubW));
        x.set((pos / scrubW) * maxDrag);
    };

    return (
        <section className="relative overflow-hidden border-y border-white/5 bg-neutral-black py-16 md:py-20">
            {/* Light from the top left */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(242,139,44,0.13)_0%,rgba(0,0,0,0)_62%)]" />
            <motion.div style={{ x: dustX }} className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: 18 }).map((_, i) => (
                    <DustMote key={i} seed={i + 1} />
                ))}
            </motion.div>

            <div className="relative mb-4 flex flex-col gap-4 px-6 md:mb-6 md:flex-row md:items-end md:justify-between md:px-10">
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">Selected Work</p>
                    <h2 className="mt-3 font-display text-4xl leading-[1.02] md:text-6xl">
                        The work, <span className="italic text-white/55">not the pitch.</span>
                    </h2>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
                    Drag to explore · Click to open
                </p>
            </div>

            {/* The wire */}
            <div className="relative">
                <motion.div
                    style={{ x: wireX }}
                    className="pointer-events-none absolute -left-[20%] -right-[20%] top-[86px] z-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <motion.div
                    ref={trackRef}
                    className="flex cursor-grab items-start px-[8vw] pt-[110px] pb-10 active:cursor-grabbing"
                    style={{ x: springX }}
                    drag="x"
                    dragConstraints={{ left: maxDrag, right: 0 }}
                    dragElastic={0.06}
                    onUpdate={(latest) => {
                        if (typeof latest.x === 'number') x.set(latest.x);
                    }}
                >
                    {assets.map((asset, i) => (
                        <Print
                            key={asset.id}
                            asset={asset}
                            index={i}
                            railVelocity={velocity}
                            pointer={pointer}
                            reduced={reduced}
                            onOpen={onOpen}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Scrubber */}
            <div className="relative mt-2 flex justify-center px-6">
                <div
                    ref={scrubRef}
                    onClick={(e) => seekTo(e.clientX)}
                    style={{ width: scrubW }}
                    className="relative h-[2px] cursor-pointer rounded-full bg-white/10"
                >
                    <motion.div style={{ width: springScrub }} className="absolute left-0 top-0 h-full bg-sunset/40" />
                    <motion.div
                        drag="x"
                        dragMomentum={false}
                        dragConstraints={{ left: 0, right: scrubW }}
                        onDrag={(_, info) => seekTo(info.point.x)}
                        style={{ x: springScrub }}
                        className="absolute -left-[6px] -top-[5px] z-10 h-3 w-3 cursor-grab rounded-full bg-sunset shadow-[0_0_14px_rgba(242,139,44,0.9)] active:cursor-grabbing"
                    />
                </div>
            </div>
        </section>
    );
};

export default HangingGallery;
