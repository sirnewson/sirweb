import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type Season = 'clear' | 'rain' | 'snow' | 'wind' | 'water';

const STORAGE_KEY = 'sirnewson_season';

export const SEASONS: { key: Season; label: string; icon: string }[] = [
    { key: 'clear', label: 'Clear', icon: 'fas fa-circle-half-stroke' },
    { key: 'rain', label: 'Rain', icon: 'fas fa-cloud-rain' },
    { key: 'snow', label: 'Snow', icon: 'fas fa-snowflake' },
    { key: 'wind', label: 'Wind', icon: 'fas fa-wind' },
    { key: 'water', label: 'Water', icon: 'fas fa-water' },
];

const SEASON_EVENT = 'sirnewson:season';
const AUTO_KEY = 'sirnewson_season_auto';
const ROTATE_MS = 30_000;

/** The states the auto-rotation moves through. 'clear' is excluded so the page
 *  always has some weather in it. */
const ROTATION: Season[] = ['rain', 'snow', 'wind', 'water'];

/**
 * The picker and the canvas live in different trees, so the hook broadcasts
 * changes instead of relying on shared React state.
 */
export const useSeason = () => {
    const [season, setSeasonState] = useState<Season>('rain');
    const [auto, setAutoState] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as Season | null;
        if (stored && SEASONS.some((s) => s.key === stored)) setSeasonState(stored);
        setAutoState(localStorage.getItem(AUTO_KEY) !== 'off');

        const onChange = (e: Event) => {
            const d = (e as CustomEvent<{ season: Season; auto: boolean }>).detail;
            setSeasonState(d.season);
            setAutoState(d.auto);
        };
        window.addEventListener(SEASON_EVENT, onChange);
        return () => window.removeEventListener(SEASON_EVENT, onChange);
    }, []);

    const broadcast = (next: Season, nextAuto: boolean) => {
        localStorage.setItem(STORAGE_KEY, next);
        localStorage.setItem(AUTO_KEY, nextAuto ? 'on' : 'off');
        setSeasonState(next);
        setAutoState(nextAuto);
        window.dispatchEvent(
            new CustomEvent(SEASON_EVENT, { detail: { season: next, auto: nextAuto } })
        );
    };

    /** Picking a season by hand pins it and stops the rotation. */
    const setSeason = (next: Season) => broadcast(next, false);

    /** Hands control back to the rotation. */
    const resumeAuto = () => broadcast(pickNext(season), true);

    /** Used by the rotation itself — advances without pinning. */
    const rotateTo = (next: Season) => broadcast(next, true);

    return { season, setSeason, auto, resumeAuto, rotateTo };
};

const pickNext = (current: Season): Season => {
    const options = ROTATION.filter((s) => s !== current);
    return options[Math.floor(Math.random() * options.length)];
};

/**
 * Drives the rotation. Called once, from App — a timer per hook instance would
 * mean several clocks fighting over the same state.
 */
export const useSeasonRotation = (season: Season, auto: boolean, setTo: (s: Season) => void) => {
    useEffect(() => {
        if (!auto) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const id = window.setInterval(() => setTo(pickNext(season)), ROTATE_MS);
        return () => window.clearInterval(id);
    }, [season, auto, setTo]);
};

interface Particle {
    x: number;
    y: number;
    z: number;      // depth 0..1, drives size and speed
    vx: number;
    vy: number;
    life: number;
    seed: number;
    r?: number;     // droplet radius
    hold?: number;  // frames a droplet clings before it runs
    trail?: number; // length of the streak it leaves behind
}

/**
 * Weather layer. One canvas, one rAF loop, particles recycled rather than
 * reallocated. Sits above the page but never takes pointer events.
 */
const Seasons = ({ season }: { season: Season }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    const partsRef = useRef<Particle[]>([]);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    // Lets CSS respond to the season without threading props through the tree.
    useEffect(() => {
        document.documentElement.classList.toggle('season-water', season === 'water');
        return () => document.documentElement.classList.remove('season-water');
    }, [season]);

    useEffect(() => {
        if (season === 'clear' || reduced) {
            cancelAnimationFrame(rafRef.current);
            const c = canvasRef.current;
            c?.getContext('2d')?.clearRect(0, 0, c.width, c.height);
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let w = 0;
        let h = 0;

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        const counts: Record<Exclude<Season, 'clear'>, number> = {
            rain: 220,
            snow: 130,
            wind: 90,
            water: 90,
        };
        const count = counts[season as Exclude<Season, 'clear'>];

        const spawn = (first = false): Particle => {
            const z = Math.random();
            switch (season) {
                case 'rain':
                    return { x: Math.random() * (w + 200) - 100, y: first ? Math.random() * h : -20, z, vx: 1.1 + z, vy: 9 + z * 12, life: 1, seed: Math.random() * 6.28 };
                case 'snow':
                    return { x: Math.random() * w, y: first ? Math.random() * h : -12, z, vx: 0, vy: 0.5 + z * 1.2, life: 1, seed: Math.random() * 6.28 };
                case 'wind':
                    return { x: first ? Math.random() * w : -30, y: Math.random() * h, z, vx: 1.6 + z * 3.4, vy: 0, life: 1, seed: Math.random() * 6.28 };
                default: { // water — droplets clinging to the glass
                    const r = 2 + z * 9;
                    return {
                        x: Math.random() * w,
                        y: first ? Math.random() * h : -r * 2,
                        z, vx: 0, vy: 0,
                        life: 1,
                        seed: Math.random() * 6.28,
                        r,
                        hold: 40 + Math.random() * 320,
                        trail: 0,
                    };
                }
            }
        };

        partsRef.current = Array.from({ length: count }, () => spawn(true));

        let t = 0;
        const draw = () => {
            t += 0.016;
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < partsRef.current.length; i++) {
                const p = partsRef.current[i];

                if (season === 'rain') {
                    p.x += p.vx;
                    p.y += p.vy;
                    const len = 9 + p.z * 16;
                    ctx.strokeStyle = `rgba(210, 228, 255, ${0.10 + p.z * 0.28})`;
                    ctx.lineWidth = 0.6 + p.z * 0.9;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x - p.vx * 1.6, p.y - len);
                    ctx.stroke();
                    if (p.y > h + 20) partsRef.current[i] = spawn();
                } else if (season === 'snow') {
                    p.x += Math.sin(t * 0.6 + p.seed) * (0.4 + p.z * 0.6);
                    p.y += p.vy;
                    ctx.fillStyle = `rgba(255, 252, 244, ${0.22 + p.z * 0.5})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 0.8 + p.z * 2.1, 0, 6.28);
                    ctx.fill();
                    if (p.y > h + 12) partsRef.current[i] = spawn();
                } else if (season === 'wind') {
                    p.x += p.vx;
                    p.y += Math.sin(t * 0.9 + p.seed) * 0.9;
                    const len = 26 + p.z * 60;
                    const g = ctx.createLinearGradient(p.x - len, p.y, p.x, p.y);
                    g.addColorStop(0, 'rgba(255, 217, 163, 0)');
                    g.addColorStop(1, `rgba(255, 217, 163, ${0.10 + p.z * 0.24})`);
                    ctx.strokeStyle = g;
                    ctx.lineWidth = 0.7 + p.z * 1.1;
                    ctx.beginPath();
                    ctx.moveTo(p.x - len, p.y);
                    ctx.lineTo(p.x, p.y);
                    ctx.stroke();
                    if (p.x > w + 60) partsRef.current[i] = spawn();
                } else {
                    // water — condensation. A droplet clings, swells, then breaks
                    // loose and runs, leaving a thinning trail behind it.
                    const r = p.r ?? 4;
                    if ((p.hold ?? 0) > 0) {
                        p.hold = (p.hold ?? 0) - 1;
                        p.vy = 0;
                    } else {
                        p.vy = Math.min((p.vy || 0) + 0.06 * (0.4 + p.z), 3.4 + p.z * 3);
                        p.y += p.vy;
                        p.x += Math.sin(p.y * 0.05 + p.seed) * 0.25;
                        p.trail = Math.min((p.trail ?? 0) + p.vy, 90 + p.z * 130);
                    }

                    // Trail
                    if ((p.trail ?? 0) > 2) {
                        const g = ctx.createLinearGradient(p.x, p.y - (p.trail ?? 0), p.x, p.y);
                        g.addColorStop(0, 'rgba(190, 220, 245, 0)');
                        g.addColorStop(1, `rgba(190, 220, 245, ${0.05 + p.z * 0.10})`);
                        ctx.strokeStyle = g;
                        ctx.lineWidth = r * 0.5;
                        ctx.lineCap = 'round';
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y - (p.trail ?? 0));
                        ctx.lineTo(p.x, p.y);
                        ctx.stroke();
                    }

                    // Bead: dark rim, bright lens, specular highlight top-left
                    const bead = ctx.createRadialGradient(
                        p.x - r * 0.34, p.y - r * 0.34, r * 0.1,
                        p.x, p.y, r
                    );
                    bead.addColorStop(0, `rgba(255, 255, 255, ${0.42 + p.z * 0.3})`);
                    bead.addColorStop(0.45, `rgba(186, 214, 240, ${0.16 + p.z * 0.16})`);
                    bead.addColorStop(1, 'rgba(120, 160, 200, 0.02)');
                    ctx.fillStyle = bead;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, r, 0, 6.28);
                    ctx.fill();

                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.10 + p.z * 0.16})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();

                    ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + p.z * 0.4})`;
                    ctx.beginPath();
                    ctx.arc(p.x - r * 0.36, p.y - r * 0.4, r * 0.2, 0, 6.28);
                    ctx.fill();

                    if (p.y - (p.trail ?? 0) > h + 40) partsRef.current[i] = spawn();
                }
            }

            rafRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [season, reduced]);

    return (
        <AnimatePresence>
            {season !== 'clear' && !reduced && (
                <motion.canvas
                    ref={canvasRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    aria-hidden
                    className="pointer-events-none fixed inset-0 z-[88]"
                    style={{ mixBlendMode: 'normal' }}
                />
            )}
        </AnimatePresence>
    );
};

interface SeasonPickerProps {
    season: Season;
    auto: boolean;
    onChange: (s: Season) => void;
    onAuto: () => void;
}

/** Sits beside the theme toggle. Cycles on click, full list on long-press/hover. */
export const SeasonPicker = ({ season, auto, onChange, onAuto }: SeasonPickerProps) => {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    // Closing on mouseleave made this almost unusable: the popup sits above the
    // button with a gap, so travelling to it left the wrapper and dismissed it.
    // Dismiss on outside click / Escape instead.
    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);
    const active = SEASONS.find((s) => s.key === season) ?? SEASONS[0];

    return (
        <div ref={wrapRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={`Weather: ${active.label}${auto ? ' (auto)' : ''}`}
                className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[10px] text-white/70 transition hover:border-sunset/60 hover:text-sunset"
            >
                <i className={active.icon} />
                {auto && (
                    <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-lime" />
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                        transition={{ duration: 0.22 }}
                        className="absolute bottom-full left-1/2 z-[110] flex -translate-x-1/2 gap-1 rounded-[8px] border border-white/12 bg-neutral-dark/98 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl before:absolute before:left-0 before:right-0 before:top-full before:h-3 before:content-['']"
                    >
                        <button
                            type="button"
                            onClick={() => { onAuto(); setOpen(false); }}
                            aria-label="Auto weather"
                            title="Auto — changes every 30s"
                            className={`flex h-7 items-center rounded-[6px] px-2 font-mono text-[8px] uppercase tracking-[0.14em] transition ${
                                auto ? 'bg-lime text-soft-black' : 'text-white/55 hover:bg-white/[0.08] hover:text-sunset'
                            }`}
                        >
                            Auto
                        </button>
                        <span className="mx-0.5 my-1 w-px bg-white/10" />
                        {SEASONS.map((s) => (
                            <button
                                key={s.key}
                                type="button"
                                onClick={() => { onChange(s.key); setOpen(false); }}
                                aria-label={s.label}
                                title={s.label}
                                className={`flex h-7 w-7 items-center justify-center rounded-[6px] text-[10px] transition ${
                                    s.key === season
                                        ? 'bg-sunset text-soft-black'
                                        : 'text-white/55 hover:bg-white/[0.08] hover:text-sunset'
                                }`}
                            >
                                <i className={s.icon} />
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Seasons;
