import { Link } from 'react-router-dom';
import PubShell from '../../components/pub/PubShell';
import SEO from '../../components/SEO';
import { sections } from '../../data/publication';
import { PUBLICATION_ORIGIN, studioUrl } from '../../lib/site';

const projects = [
    {
        name: 'Sir Newson Visuals',
        note: 'The studio. Brand identity, campaign design, product visuals, motion.',
        href: studioUrl('/work'),
    },
    { name: 'YXM Digital', note: 'Websites, tools and AI systems.', href: 'https://yxmdigital.com/' },
    { name: 'Jinwear', note: 'Apparel, drops and wall art.', href: 'https://www.jinwear.co.ke/' },
    { name: 'Wynmind', note: 'Writing on design, systems and culture.', href: 'https://wynmind.com' },
    { name: 'TAK Network', note: 'Business, culture and technology commentary.', href: 'https://taknetwork.co.ke' },
];

const principles = [
    {
        title: 'The subject is never the thread',
        body: 'Brands, football, AI, cities, capitalism, Kenya — none of those are the through line. The through line is a way of looking at them: work out what the system is actually optimising for, then say it plainly.',
    },
    {
        title: 'Archive over feed',
        body: 'Social platforms distribute attention. They do not accumulate anything. Everything published here is meant to still be findable, and still be useful, long after the week it was made in.',
    },
    {
        title: 'Written from here',
        body: 'Most writing about global systems is done from economies that already won. A view from Nairobi is not a limitation on the analysis. Frequently it is the part the analysis was missing.',
    },
    {
        title: 'Design is an argument',
        body: 'Type, image and pacing carry meaning before a single sentence is read. A page that looks assembled from a component library has already said something about how much its writer cared.',
    },
];

const About = () => (
    <PubShell>
        <SEO
            title="About — Drift"
            description="Sir Newson is the creative identity of Newson Kamau Kariuki, a Kenyan visual storyteller and creative director exploring brands, culture, technology, sport and the systems shaping modern life."
            path="/about"
            jsonLd={{
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Newson Kamau Kariuki',
                alternateName: 'Sir Newson',
                jobTitle: 'Creative Director',
                address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
                email: 'sirnewson@gmail.com',
                url: `${PUBLICATION_ORIGIN}/about`,
            }}
        />

        <header className="px-6 pb-16 pt-20 md:px-12 md:pt-28">
            <div className="mx-auto max-w-[1600px]">
                <p className="pub-kicker pub-accent">About</p>
                <h1 className="pub-display mt-7 max-w-[16ch] text-[2.6rem] leading-[0.96] md:text-[6rem]">
                    Sir Newson is the creative identity of Newson Kamau Kariuki.
                </h1>
                <p className="pub-soft mt-8 max-w-[54ch] text-lg leading-relaxed md:text-xl">
                    A Kenyan visual storyteller and creative director exploring brands, culture,
                    technology, sport and the systems shaping modern life.
                </p>
            </div>
        </header>

        {/* Story */}
        <section className="px-6 pb-20 md:px-12">
            <div className="pub-rule mx-auto grid max-w-[1600px] gap-10 border-t pt-14 md:grid-cols-[14rem_1fr] md:gap-16">
                <p className="pub-kicker pub-faint">The story</p>
                <div className="pub-body flex max-w-[42rem] flex-col gap-6">
                    <p>
                        It started as design work — identities, posters, campaigns, product visuals for
                        businesses across Nairobi and beyond. That work is still the studio, and it still
                        pays for the lights.
                    </p>
                    <p>
                        But the research kept outgrowing the brief. Understanding why one brand worked and
                        another did not meant reading the business underneath it, then the technology
                        underneath that, then the culture the whole thing was sitting in. The interesting
                        part was never the logo.
                    </p>
                    <p>
                        This site is where that reading goes. Brand stories, ideas, football, speculative
                        work and a notebook — one point of view applied to whatever is worth the attention,
                        published from Nairobi.
                    </p>
                </div>
            </div>
        </section>

        {/* Philosophy */}
        <section className="pub-panel px-6 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-[1600px]">
                <p className="pub-kicker pub-accent">Philosophy</p>
                <div className="mt-12 grid gap-x-12 gap-y-4 md:grid-cols-2">
                    {principles.map((p) => (
                        <div key={p.title} className="pub-rule-soft border-t py-8">
                            <h2 className="pub-headline max-w-[20ch] text-2xl md:text-[2rem]">{p.title}</h2>
                            <p className="pub-soft mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed">{p.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* What is published here */}
        <section className="px-6 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-[1600px]">
                <p className="pub-kicker pub-accent">What gets published</p>
                <div className="mt-10 grid gap-x-12 md:grid-cols-2">
                    {sections.map((s) => (
                        <Link key={s.id} to={s.path} className="group pub-rule-soft block border-t py-8">
                            <p className="pub-kicker pub-faint">{s.kicker}</p>
                            <h3 className="pub-headline mt-2 text-3xl md:text-4xl">
                                <span className="pub-underline">{s.label}</span>
                            </h3>
                            <p className="pub-soft mt-3 max-w-[42ch] text-[0.9375rem]">{s.blurb}</p>
                        </Link>
                    ))}
                    <Link to="/visuals" className="group pub-rule-soft block border-t py-8">
                        <p className="pub-kicker pub-faint">VISUALS</p>
                        <h3 className="pub-headline mt-2 text-3xl md:text-4xl">
                            <span className="pub-underline">Visuals</span>
                        </h3>
                        <p className="pub-soft mt-3 max-w-[42ch] text-[0.9375rem]">
                            A curated lab — identity work, posters, typography and image experiments.
                        </p>
                    </Link>
                    <Link to="/desk" className="group pub-rule-soft block border-t py-8">
                        <p className="pub-kicker pub-faint">THE DESK</p>
                        <h3 className="pub-headline mt-2 text-3xl md:text-4xl">
                            <span className="pub-underline">The Desk</span>
                        </h3>
                        <p className="pub-soft mt-3 max-w-[42ch] text-[0.9375rem]">
                            The public notebook. Short observations, updated far more often than anything else.
                        </p>
                    </Link>
                </div>
            </div>
        </section>

        {/* Projects */}
        <section className="pub-glow px-6 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-[1600px]">
                <p className="pub-kicker pub-accent">Projects</p>
                <div className="mt-10">
                    {projects.map((p, i) => (
                        <a
                            key={p.name}
                            href={p.href}
                            className="group pub-rule flex flex-col gap-2 border-t py-7 md:flex-row md:items-baseline md:gap-10"
                        >
                            <span className="pub-kicker pub-faint w-10">{String(i + 1).padStart(2, '0')}</span>
                            <span className="pub-headline flex-1 text-3xl md:text-5xl">
                                <span className="pub-underline">{p.name}</span>
                            </span>
                            <span className="pub-soft max-w-[34ch] text-sm">{p.note}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>

        {/* Contact */}
        <section className="px-6 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-[1600px]">
                <p className="pub-kicker pub-accent">Contact</p>
                <h2 className="pub-display mt-6 text-4xl md:text-7xl">
                    <a href="mailto:sirnewson@gmail.com" className="pub-underline">
                        sirnewson@gmail.com
                    </a>
                </h2>
                <p className="pub-soft mt-6 max-w-[44ch]">
                    For work, commissions and websites, the studio side handles it —{' '}
                    <a href={studioUrl('/contact')} className="pub-underline pub-ink">
                        start there
                    </a>
                    .
                </p>
            </div>
        </section>
    </PubShell>
);

export default About;
