import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { publicationUrl } from '../lib/site';

const WHATSAPP = 'https://wa.me/254702480771?text=Hi%20Sir%20Newson%2C%20I%20have%20something%20I%20want%20to%20make%20ready.';

const columns = [
    {
        heading: 'Make It Ready',
        links: [
            { label: 'Product visuals', to: '/work' },
            { label: 'Video & motion', to: '/work' },
            { label: 'Brand identity', to: '/services' },
            { label: 'Websites', to: '/website' },
            { label: 'Catalogues', to: '/contact' },
        ],
    },
    {
        heading: 'Explore',
        links: [
            { label: 'Selected work', to: '/work' },
            { label: 'Services', to: '/services' },
            { label: 'Events', to: '/events' },
            { label: 'How a proposal works', to: '/proposal' },
            { label: 'Shop', to: '/shop' },
        ],
    },
    {
        heading: 'Read & Follow',
        links: [
            { label: 'Drift — the publication', to: publicationUrl('/'), external: true },
            { label: 'Brand stories', to: publicationUrl('/stories'), external: true },
            { label: 'Gallery', to: '/gallery' },
            { label: 'Start a project', to: '/contact' },
        ],
    },
];

const socials = [
    { href: 'https://linkedin.com/in/sirnewson', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://instagram.com/sirnewson', icon: 'fab fa-instagram', label: 'Instagram' },
    { href: 'https://twitter.com/sirnewson', icon: 'fab fa-twitter', label: 'Twitter' },
    { href: 'https://www.youtube.com/@sirnewson', icon: 'fab fa-youtube', label: 'YouTube' },
];

const Footer = () => {
    return (
        <footer className="w-full font-sans select-none">
            {/* Conversion band */}
            <div className="aurora-solid py-16 px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <h2 className="font-editorial text-5xl md:text-7xl leading-[0.98]">Let's make it ready.</h2>
                    <p className="mt-3 text-sm md:text-base font-medium text-black/80">
                        Send what you already have. That is usually enough to begin.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 rounded-[8px] bg-espresso px-7 py-4 text-sm md:text-base font-semibold text-warm-white transition hover:bg-clay hover:text-espresso"
                    >
                        <i className="fab fa-whatsapp text-xl"></i>
                        WhatsApp
                    </a>
                    <Link
                        to="/contact"
                        className="rounded-[8px] border-2 border-espresso/25 px-7 py-4 text-center text-sm md:text-base font-semibold text-espresso transition hover:bg-espresso hover:text-warm-white"
                    >
                        Send a Brief
                    </Link>
                </div>
            </div>

            {/* Directory */}
            <div className="bg-neutral-dark text-white pt-20 pb-8 px-8 md:px-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_2fr] mb-16">
                    {/* Brand + contact */}
                    <div className="space-y-8">
                        <div>
                            <p className="font-display text-2xl font-semibold tracking-tight">Sir Newson</p>
                            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                                Presentation Architect
                            </p>
                            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                                Helping ideas, products, stories and businesses move from unfinished to ready.
                            </p>
                        </div>

                        <div className="space-y-2 text-sm">
                            <p className="text-xs font-bold uppercase tracking-wider text-white/50">Direct</p>
                            <p>
                                <a href="mailto:sirnewson@gmail.com" className="font-bold hover:underline">
                                    sirnewson@gmail.com
                                </a>
                            </p>
                            <p>
                                <a href="tel:+254702480771" className="font-bold hover:underline">
                                    +254 702 480 771
                                </a>
                            </p>
                            <p className="text-white/55">Nairobi, Kenya — remote worldwide</p>
                        </div>

                        <div className="flex gap-5 text-lg">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-sunset hover:text-black"
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
                        {columns.map((column) => (
                            <div key={column.heading} className="space-y-4">
                                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45 font-mono">
                                    {column.heading}
                                </h4>
                                <ul className="space-y-3">
                                    {column.links.map((link) => (
                                        <li key={link.label}>
                                            {'external' in link && link.external ? (
                                                <a
                                                    href={link.to}
                                                    className="text-sm font-medium text-white/70 transition hover:text-sunset hover:underline"
                                                >
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    to={link.to}
                                                    className="text-sm font-medium text-white/70 transition hover:text-sunset hover:underline"
                                                >
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs font-medium text-white/45">©{new Date().getFullYear()} Sir Newson. All rights reserved.</p>
                    <p className="text-xs font-medium text-white/45">Presentation is how an idea meets the world.</p>
                </div>

                {/* Scrolling wordmark — sans, tracked, each character breathing
                    on its own offset so the line ripples as it travels. */}
                <div className="mt-12 w-full translate-y-6 overflow-hidden pointer-events-none">
                    <motion.div
                        className="flex w-max items-end"
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                        {Array.from({ length: 6 }).map((_, block) => (
                            <span key={block} className="flex items-end whitespace-nowrap">
                                {'SIR NEWSON'.split('').map((ch, i) => (
                                    <motion.span
                                        key={`${block}-${i}`}
                                        animate={{ y: [0, -10, 0, 6, 0] }}
                                        transition={{
                                            duration: 5.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: (i % 10) * 0.12,
                                        }}
                                        className="inline-block bg-gradient-to-b from-lime via-sunset to-deep-amber bg-clip-text font-sans text-[13vw] font-semibold leading-[0.85] tracking-[0.06em] text-transparent"
                                    >
                                        {ch === ' ' ? ' ' : ch}
                                    </motion.span>
                                ))}
                                <span className="mx-10 inline-block h-[2vw] w-[2vw] shrink-0 self-center rounded-full bg-gradient-to-br from-lime to-deep-amber" />
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
