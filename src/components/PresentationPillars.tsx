import { Link } from 'react-router-dom';
import { ScrollReveal, Float, Tilt } from './Animated';

const pillars = [
    {
        num: '01',
        title: 'Products',
        promise: 'From a product in your hands to a product customers want.',
        desc: 'I prepare products to be seen, understood and bought.',
        items: ['Product posters', 'Photo enhancement', 'Catalogues', 'Launch visuals', 'Packaging presentation'],
        icon: 'fas fa-box-open',
        path: '/work'
    },
    {
        num: '02',
        title: 'Stories',
        promise: 'From recorded moments to finished stories.',
        desc: 'I turn footage, ideas and moments into videos ready for people to watch and remember.',
        items: ['Video editing', 'Motion graphics', 'Social reels', 'Event recaps', 'YouTube visuals'],
        icon: 'fas fa-film',
        path: '/work'
    },
    {
        num: '03',
        title: 'Brands',
        promise: 'From having a business to looking ready for business.',
        desc: 'I help brands look as serious, valuable and distinctive as they truly are.',
        items: ['Creative direction', 'Brand identity', 'Campaign direction', 'Visual consistency', 'Brand refreshes'],
        icon: 'fas fa-gem',
        path: '/services'
    },
    {
        num: '04',
        title: 'Businesses',
        promise: 'From business operations to a clear digital presence.',
        desc: 'I prepare businesses for the internet and for the people they want to reach.',
        items: ['Websites', 'Landing pages', 'Company profiles', 'Digital catalogues', 'Customer-facing tools'],
        icon: 'fas fa-globe',
        path: '/website'
    },
    {
        num: '05',
        title: 'Ideas',
        promise: 'From something in your head to something others can experience.',
        desc: 'I build tools and experiences that help thoughts become visible and shareable.',
        items: ['Creative web apps', 'Thought tools', 'Text-motion apps', 'Digital prototypes', 'Concept visualisation'],
        icon: 'fas fa-lightbulb',
        path: '/tools'
    }
];

const PresentationPillars = () => {
    return (
        <section className="border-t border-white/5 px-6 py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-14 max-w-3xl">
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">What I Help You Present</p>
                    <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">Five Things People Bring Me.</h2>
                    <p className="mt-4 text-lg leading-8 text-white/60">
                        Different formats. One purpose — making the thing ready to meet its audience.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {pillars.map((pillar, index) => (
                        <ScrollReveal
                            key={pillar.title}
                            direction="up"
                            delay={index * 0.06}
                            duration={0.6}
                            className="h-full"
                        >
                            <Tilt className="h-full rounded-3xl">
                                <Link
                                    to={pillar.path}
                                    className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-primary/50 hover:bg-white/[0.06]"
                                >
                                <div className="mb-8 flex items-center justify-between">
                                    <Float y={2.5} duration={4 + index} className="w-fit">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-black">
                                            <i className={pillar.icon} />
                                        </span>
                                    </Float>
                                    <span className="font-display text-3xl font-black text-white/10">{pillar.num}</span>
                                </div>

                                <h3 className="font-display text-3xl font-black">{pillar.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-white/55">{pillar.desc}</p>

                                <ul className="mt-6 flex flex-wrap gap-2">
                                    {pillar.items.map((item) => (
                                        <li
                                            key={item}
                                            className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/45"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <p className="mt-auto pt-8 font-display text-base font-black leading-snug text-primary">
                                    {pillar.promise}
                                </p>
                                </Link>
                            </Tilt>
                        </ScrollReveal>
                    ))}

                    <ScrollReveal direction="up" delay={0.3} duration={0.6} className="h-full">
                        <div className="flex h-full flex-col justify-center rounded-3xl border border-primary/30 bg-primary p-8 text-black">
                            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/50">Not sure which one?</p>
                            <h3 className="mt-4 font-display text-3xl font-black leading-tight">Just send what you already have.</h3>
                            <p className="mt-4 text-sm leading-6 text-black/70">
                                Photos, footage, a product list, or a rough idea. I will tell you what it needs to become ready.
                            </p>
                            <a
                                href="https://wa.me/254702480771?text=Hi%20Sir%20Newson%2C%20I%20have%20something%20I%20want%20to%20make%20ready."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-black text-white transition hover:bg-white hover:text-black"
                            >
                                <i className="fab fa-whatsapp text-lg" />
                                Send It on WhatsApp
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default PresentationPillars;
