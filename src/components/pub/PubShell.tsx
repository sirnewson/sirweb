import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { sections } from '../../data/publication';
import { studioUrl } from '../../lib/site';

const WORDMARK = '/brand/drift/drift-wordmark-lime.png';
import Newsletter from './Newsletter';

const nav = [
    ...sections.map((s) => ({ label: s.label, to: s.path })),
    { label: 'Visuals', to: '/visuals' },
    { label: 'Desk', to: '/desk' },
    { label: 'About', to: '/about' },
];

const distribution = [
    { label: 'YouTube', href: 'https://www.youtube.com/@sirnewson' },
    { label: 'Instagram', href: 'https://instagram.com/sirnewson' },
    { label: 'Sir Newson Studio', href: studioUrl('/') },
    { label: 'YXM Digital', href: 'https://yxmdigital.com/' },
];

/* ---------------------------------------------------------------
   Masthead. Minimal by instruction — the nav is not the thing anyone
   came for, so it stays at seven items and one search affordance, and
   only grows a ground and a rule once the page has moved off the top.
   The ground is solid paper rather than a translucent blur: this is a
   print surface, and glass chrome belongs to a different kind of site.
   --------------------------------------------------------------- */

const Masthead = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => setOpen(false), [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `pub-kicker transition-opacity hover:opacity-100 ${isActive ? 'pub-accent opacity-100' : 'opacity-60'}`;

    return (
        <header
            className={`pub-nav sticky top-0 z-40 border-b ${
                scrolled
                    ? 'pub-rule bg-[color:var(--ground)]'
                    : 'border-transparent bg-transparent'
            }`}
        >
            <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-4 md:px-10">
                {/* The wordmark is artwork, not type — the DRIFT letterforms are
                    drawn, so they ship as an image rather than being approximated
                    with a web font. */}
                <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Drift — home">
                    <img
                        src={WORDMARK}
                        alt="Drift"
                        className="pub-wordmark"
                        width={1200}
                        height={328}
                    />
                    <span className="pub-rule hidden h-3 w-px border-l sm:block" aria-hidden />
                    <span className="pub-kicker pub-faint hidden text-[0.625rem] sm:block">
                        Sir Newson
                    </span>
                </Link>

                <nav className="hidden items-center gap-7 lg:flex">
                    {nav.map((item) => (
                        <NavLink key={item.to} to={item.to} className={linkClass}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-5">
                    <Link to="/search" className="pub-kicker opacity-60 transition hover:opacity-100">
                        <i className="fas fa-search mr-2 text-[0.7rem]" aria-hidden />
                        Search
                    </Link>
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="pub-kicker lg:hidden"
                        aria-expanded={open}
                        aria-label="Toggle sections"
                    >
                        {open ? 'Close' : 'Index'}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden bg-[color:var(--ground)] lg:hidden"
                    >
                        <div className="px-6 pb-8 pt-2">
                            {nav.map((item, i) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className="pub-rule-soft flex items-baseline gap-4 border-t py-4"
                                >
                                    <span className="pub-kicker pub-faint w-8">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="pub-headline text-3xl">{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

/* --------------------------------------------------------------- */

const PubFooter = () => (
    <footer className="pub-glow">
        <Newsletter />

        {/* The single, clean pointer at the business. The publication does not
            sell services — it points once. */}
        <div className="pub-rule border-t px-6 py-16 md:px-12">
            <div className="mx-auto flex max-w-[1600px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="pub-kicker pub-faint">Need to build something?</p>
                    <p className="pub-display mt-3 text-4xl md:text-6xl">YXM Digital</p>
                </div>
                <a
                    href="https://yxmdigital.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pub-kicker self-start border border-current px-7 py-4 transition hover:bg-[color:var(--ink)] hover:text-[color:var(--ground)] md:self-auto"
                >
                    Go to YXM →
                </a>
            </div>
        </div>

        <div className="pub-rule border-t px-6 py-14 md:px-12">
            <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-4">
                <div className="md:col-span-2">
                    <img
                        src={WORDMARK}
                        alt="Drift"
                        className="h-8 w-auto md:h-10"
                        width={1200}
                        height={328}
                    />
                    <p className="pub-kicker pub-faint mt-4">A Sir Newson publication</p>
                    <p className="pub-soft mt-3 max-w-[36ch] text-sm">
                        Stories. Ideas. Places. Culture. Published from Nairobi, Kenya.
                    </p>
                </div>

                <div>
                    <p className="pub-kicker pub-faint">Sections</p>
                    <ul className="mt-4 space-y-2">
                        {nav.map((item) => (
                            <li key={item.to}>
                                <Link to={item.to} className="text-sm opacity-70 transition hover:opacity-100">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="pub-kicker pub-faint">Elsewhere</p>
                    <ul className="mt-4 space-y-2">
                        {distribution.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className="text-sm opacity-70 transition hover:opacity-100"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="pub-rule-soft mx-auto mt-12 flex max-w-[1600px] flex-col gap-2 border-t pt-6 md:flex-row md:justify-between">
                <p className="pub-kicker pub-faint">© {new Date().getFullYear()} Sir Newson</p>
                <p className="pub-kicker pub-faint">Nairobi, Kenya</p>
            </div>
        </div>
    </footer>
);

/* --------------------------------------------------------------- */

interface PubShellProps {
    children: ReactNode;
}

/**
 * Wraps every publication route. Soft page transitions, no hard reloads — the
 * fade is short enough that a reader arriving from a feed never waits on it.
 */
const PubShell = ({ children }: PubShellProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    // "/" opens search from anywhere in the publication, the way an archive
    // this size should behave.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const typing = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
            if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                navigate('/search');
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [navigate]);

    return (
        <div className="pub">
            <Masthead />
            <motion.main
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
            >
                {children}
            </motion.main>
            <PubFooter />
        </div>
    );
};

export default PubShell;
