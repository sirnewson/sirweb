import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle, { useTheme } from './ThemeToggle';
import { SeasonPicker, useSeason } from './Seasons';

const primary = [
    { num: '01', name: 'Work', path: '/work', note: 'Selected projects' },
    { num: '02', name: 'Events', path: '/events', note: 'Campaign docket' },
    { num: '03', name: 'Gallery', path: '/gallery', note: 'The full archive' },
    { num: '04', name: 'Services', path: '/services', note: 'What I make ready' },
    { num: '05', name: 'Websites', path: '/website', note: 'Business online' },
    { num: '06', name: 'Shop', path: '/shop', note: 'Playbooks & drops' },
];

/** The four brands, plus the studio's own writing. */
const secondary = [
    { name: 'Jinwear', path: 'https://www.jinwear.co.ke/', external: true },
    { name: 'Wynmind', path: 'https://wynmind.com', external: true },
    { name: 'YXM Digital', path: 'https://yxm.digital/', external: true },
    { name: 'TAK Network', path: 'https://taknetwork.co.ke', external: true },
    { name: 'Drift Notes', path: '/threads', external: false },
];

const NAV_LOOP = '/uploads/loops/nav.mp4';

/**
 * Mark on the left, index pinned top right. The index stands open by default and
 * folds away on click — it is never hidden behind a hamburger on desktop.
 */
const CornerMenu = () => {
    // Opens by default; the visitor can fold it away.
    const [open, setOpen] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const [loopOk, setLoopOk] = useState(true);
    const location = useLocation();
    const { theme, toggle } = useTheme();
    const { season, setSeason, auto, resumeAuto } = useSeason();

    useEffect(() => {
        if (!window.matchMedia('(min-width: 1024px)').matches) setOpen(false);
    }, [location]);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const sync = () => setIsDesktop(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open && !isDesktop ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open, isDesktop]);

    const backdrop = (
        <>
            {loopOk && (
                <video
                    src={NAV_LOOP}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={() => setLoopOk(false)}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
                />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-dark/88 via-neutral-dark/78 to-neutral-dark/92" />
        </>
    );

    const rows = (
        <div className="relative p-2.5" onMouseLeave={() => setHovered(null)}>
            {primary.map((item, i) => {
                const active = location.pathname === item.path;
                const dim = hovered !== null && hovered !== item.path;
                return (
                    <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link
                            to={item.path}
                            onMouseEnter={() => setHovered(item.path)}
                            className="group relative flex items-center gap-4 overflow-hidden rounded-[7px] px-4 py-2.5"
                        >
                            <span className="absolute inset-y-0 left-0 w-0 bg-sunset/12 transition-all duration-[400ms] ease-out group-hover:w-full" />
                            <span className={`relative font-mono text-[10px] transition-colors duration-300 ${active ? 'text-sunset' : 'text-white/25 group-hover:text-sunset'}`}>
                                {item.num}
                            </span>
                            <span
                                className={`relative font-editorial text-2xl leading-tight transition-all duration-300 ${
                                    active ? 'text-sunset' : dim ? 'text-white/35' : 'text-white'
                                } group-hover:translate-x-1`}
                            >
                                {item.name}
                            </span>
                            <span className="relative ml-auto hidden font-mono text-[9px] uppercase tracking-[0.16em] text-white/30 transition-colors duration-300 group-hover:text-sunset/80 sm:block">
                                {item.note}
                            </span>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );

    const tail = (
        <>
            <div className="relative border-t border-white/10 px-4 py-3.5">
                <div className="flex flex-wrap gap-1.5">
                    {secondary.map((item) => {
                        const cls = 'flex items-center gap-1.5 rounded-[6px] border border-white/10 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60 transition hover:border-sunset/50 hover:bg-sunset/10 hover:text-sunset';
                        return item.external ? (
                            <a key={item.name} href={item.path} target="_blank" rel="noopener noreferrer" className={cls}>
                                {item.name}
                                <i className="fas fa-arrow-up-right-from-square text-[6px]" />
                            </a>
                        ) : (
                            <Link key={item.name} to={item.path} className={cls}>{item.name}</Link>
                        );
                    })}
                </div>
            </div>

            <div className="relative flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-4 py-3.5">
                <div className="flex items-center gap-2">
                    <ThemeToggle theme={theme} onToggle={toggle} />
                    <SeasonPicker season={season} auto={auto} onChange={setSeason} onAuto={resumeAuto} />
                </div>
                <Link
                    to="/contact"
                    className="rounded-[6px] bg-lime px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-soft-black transition hover:bg-golden-hour"
                >
                    Start
                </Link>
            </div>
        </>
    );

    return (
        <>
            {/* Mark, top left */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed left-5 top-5 z-[80] md:left-8 md:top-7"
            >
                <Link to="/" aria-label="Sir Newson — home" className="group block w-fit">
                    <img
                        src={theme === 'light' ? '/uploads/logo/logo-ink.png' : '/uploads/logo/logo-cream.png'}
                        alt="Sir Newson"
                        className="h-7 w-auto transition-transform duration-500 group-hover:scale-[1.04] md:h-8"
                    />
                </Link>
            </motion.div>

            {/* Toggle, top right */}
            <motion.button
                type="button"
                onClick={() => setOpen((v) => !v)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                aria-label={open ? 'Hide index' : 'Show index'}
                aria-expanded={open}
                className="glow-stroke glow-stroke--hover group fixed right-5 top-5 z-[95] flex items-center gap-3 rounded-[9px] border border-white/12 bg-neutral-dark/85 px-4 py-3 backdrop-blur-xl transition-colors hover:border-lime/60 md:right-8 md:top-7"
            >
                <span className="flex flex-col gap-[4px]">
                    <motion.span animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-5 origin-center bg-white transition-colors group-hover:bg-lime" />
                    <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block h-[1.5px] w-5 bg-white transition-colors group-hover:bg-lime" />
                    <motion.span animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-5 origin-center bg-white transition-colors group-hover:bg-lime" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors group-hover:text-lime">
                    {open ? 'Hide' : 'Index'}
                </span>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <>
                        {!isDesktop && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setOpen(false)}
                                className="fixed inset-0 z-[85] bg-soft-black/80 backdrop-blur-md"
                            />
                        )}

                        <motion.nav
                            initial={{ opacity: 0, scale: 0.97, y: -12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -8 }}
                            whileHover={{ scale: 1.015 }}
                            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                            className="glow-stroke fixed right-5 top-[70px] z-[90] w-[calc(100vw-2.5rem)] max-w-[380px] origin-top-right overflow-hidden rounded-[12px] border border-white/12 shadow-[0_30px_90px_rgba(0,0,0,0.7)] backdrop-blur-2xl md:right-8 md:top-[76px]"
                        >
                            {backdrop}
                            {rows}
                            {tail}
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default CornerMenu;
