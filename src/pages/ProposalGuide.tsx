import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { ScrollReveal } from '../components/Animated';
import { WHATSAPP } from '../data/quickRates';

/* ---------------------------------------------------------------
   The public face of /proposal.

   A client proposal lives at /proposal/<their-name> and is written for
   one reader who already knows why they are there. Someone arriving at
   /proposal cold needs the other thing: what the process is, what they
   have to bring, and what the document they are about to be sent
   actually contains.

   Nothing here states a commercial term that is not already published
   elsewhere on the site. Revision rounds come from the rate card;
   payment terms are named in the individual proposal, not invented here.
   --------------------------------------------------------------- */

const wa = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const START = wa(
    "Hi Sir Newson, I'd like a proposal. Here's what I'm working on:"
);

/** The six stages, from first message to handover. */
const flow = [
    {
        n: '01',
        title: 'First message',
        when: 'Same day',
        body: 'You send what you are making, roughly when it happens, and what you already have. A WhatsApp message is enough — no forms.',
        you: ['What the project is', 'The date it has to be live', 'Anything you already hold'],
        get: 'A straight answer on whether it is a fit, and a rough range.',
    },
    {
        n: '02',
        title: 'The brief',
        when: '1 call or 1 message thread',
        body: 'We get specific. Who it is for, what has to exist, what it has to do. This is where most of the thinking gets done, and it is the part that decides whether the rest goes smoothly.',
        you: ['Audience', 'The deliverable list', 'References you like and ones you do not', 'Logos, photos, copy you already own'],
        get: 'A scope we both recognise, written down.',
    },
    {
        n: '03',
        title: 'The proposal',
        when: '2–3 days after the brief',
        body: 'You get a link — sirnewson.com/proposal/your-name — with the read on your brand, the creative direction, the deliverable list, the investment and the timeline. It is a page, not a PDF, so it stays current.',
        you: ['Time to read it properly', 'Whoever else has to approve it'],
        get: 'A proposal page you can share with your team.',
    },
    {
        n: '04',
        title: 'Sign-off',
        when: 'Whenever you are ready',
        body: 'You pick a package, confirm the scope and the dates, and the slot goes in the calendar. Terms and payment are named on your proposal page — read them before you confirm, not after.',
        you: ['A package choice', 'Confirmed dates', 'The go-ahead'],
        get: 'A booked production slot.',
    },
    {
        n: '05',
        title: 'Production',
        when: 'Per the timeline on your page',
        body: 'First drafts land, you respond, we tighten. Revision rounds are set by the package you picked — they are listed against every tier on the rate card, so there is no argument about what is included.',
        you: ['Feedback in one pass, not a trickle', 'Any missing assets'],
        get: 'Drafts, then revisions, then finals.',
    },
    {
        n: '06',
        title: 'Handover',
        when: 'On delivery',
        body: 'Print-ready and web-ready exports, organised. For events, that includes the recap assets — the ones that sell the next edition before it exists.',
        you: ['Where to send the files'],
        get: 'Every final file, in the formats you actually need.',
    },
];

/** What the proposal document itself contains, in the order it appears. */
const anatomy = [
    ['What I see', 'The read on your brand as it stands — the strength, the gap, and the thing nobody is using yet.'],
    ['The opportunity', 'Where the actual room to move is, named plainly.'],
    ['Creative direction', 'Tone, visual direction and campaign approach, with the keywords the work will be judged against.'],
    ['Visual preview', 'Reference frames, so you are not approving a direction you have only read about.'],
    ['Deliverables', 'The complete list. If it is not on it, it is not in the price.'],
    ['Investment', 'Packages and what each one covers. One is usually marked as the recommendation, with the reason.'],
    ['How we will work', 'Discovery, direction, production, review — the four stages inside production.'],
    ['Timeline', 'Dated, so you know when to expect work and when to expect to be asked for things.'],
];

/** Three things that decide how fast this moves. */
const bring = [
    ['Your assets', 'Logos in vector if they exist, product photos, existing copy. Send what you already have — it is usually more than you think, and it is almost always enough to begin.'],
    ['Your date', 'The one that cannot move. Everything else in the timeline is built backwards from it.'],
    ['Your decider', 'Whoever has final say, in the conversation early. Most delays are approval delays, not design delays.'],
];

const ProposalGuide = () => (
    <div className="min-h-screen bg-neutral-black text-white">
        <SEO
            title="How a Proposal Works | Sir Newson"
            description="The process from first message to final files: the brief, the proposal page, sign-off, production and handover — plus what to bring and what your proposal contains."
            keywords="design proposal Kenya, creative proposal process, how to brief a designer Nairobi, design project process Kenya, Sir Newson proposal"
            path="/proposal"
        />

        {/* Header */}
        <section className="aurora-section relative overflow-hidden px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
            <div className="relative mx-auto max-w-7xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">Proposals</p>
                <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.98] md:text-8xl">
                    From a message to <span className="italic text-sunset">final files.</span>
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                    Six stages, no mystery. This is exactly how a project runs here — what happens at each
                    point, what I need from you, and what you walk away with.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                    <a
                        href={START}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-[8px] bg-sunset px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-black transition hover:bg-clay"
                    >
                        <i className="fab fa-whatsapp text-base" /> Start a proposal
                    </a>
                    <Link
                        to="/rate-card"
                        className="inline-flex items-center gap-2 rounded-[8px] border border-white/15 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 transition hover:border-sunset/50 hover:text-sunset"
                    >
                        See the numbers first
                    </Link>
                </div>
            </div>
        </section>

        {/* The flow */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-7xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">The flow</p>
                <h2 className="mt-4 max-w-3xl font-display text-3xl leading-[1.05] md:text-6xl">
                    Every project runs the same six stages.
                </h2>

                <div className="mt-14 space-y-px">
                    {flow.map((step, i) => (
                        <ScrollReveal key={step.n} direction="up" delay={Math.min(i, 3) * 0.06} duration={0.6}>
                            <div className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,18rem)] md:gap-10">
                                <div>
                                    <p className="font-mono text-sm text-sunset">{step.n}</p>
                                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
                                        {step.when}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-display text-2xl md:text-4xl">{step.title}</h3>
                                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 md:text-base md:leading-8">
                                        {step.body}
                                    </p>
                                    <p className="mt-5 text-sm leading-7 text-sunset/90">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                                            You get ·{' '}
                                        </span>
                                        {step.get}
                                    </p>
                                </div>

                                <div className="rounded-[12px] border border-white/10 bg-white/[0.03] p-5">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                                        What I need
                                    </p>
                                    <ul className="mt-3 space-y-2">
                                        {step.you.map((y) => (
                                            <li key={y} className="flex gap-3 text-sm leading-6 text-white/70">
                                                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-sunset" />
                                                {y}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>

        {/* What to bring */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-7xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">Before you write</p>
                <h2 className="mt-4 max-w-3xl font-display text-3xl leading-[1.05] md:text-6xl">
                    Three things decide how fast this moves.
                </h2>
                <div className="mt-12 grid gap-3 md:grid-cols-3 md:gap-4">
                    {bring.map(([title, body], i) => (
                        <ScrollReveal key={title} direction="up" delay={i * 0.07} duration={0.6} className="h-full">
                            <div className="h-full rounded-[12px] border border-white/10 bg-white/[0.03] p-6">
                                <p className="font-mono text-[10px] text-sunset">{String(i + 1).padStart(2, '0')}</p>
                                <h3 className="mt-4 font-display text-2xl">{title}</h3>
                                <p className="mt-3 text-sm leading-6 text-white/62">{body}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>

        {/* Anatomy of the proposal */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">
                            Reading your proposal
                        </p>
                        <h2 className="mt-4 font-display text-3xl leading-[1.05] md:text-5xl">
                            Eight sections, in this order.
                        </h2>
                        <p className="mt-6 max-w-md text-sm leading-7 text-white/65 md:text-base md:leading-8">
                            Your proposal arrives as a link rather than an attachment, so it stays current if
                            anything changes. If you only read two sections, read Deliverables and Investment —
                            together they are the contract.
                        </p>
                        <Link
                            to="/proposal/default"
                            className="mt-8 inline-flex items-center gap-2 rounded-[8px] border border-white/15 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 transition hover:border-sunset/50 hover:text-sunset"
                        >
                            Look at a sample proposal
                        </Link>
                    </div>

                    <ol className="space-y-px">
                        {anatomy.map(([title, body], i) => (
                            <li
                                key={title}
                                className="flex gap-5 border-t border-white/10 py-5 md:gap-8"
                            >
                                <span className="font-mono text-[11px] text-sunset">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h3 className="font-display text-lg text-warm-white md:text-xl">{title}</h3>
                                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-white/60">{body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-3xl rounded-[16px] border border-sunset/25 bg-sunset/[0.06] p-8 md:p-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sunset">Start here</p>
                <h2 className="mt-4 font-display text-3xl md:text-5xl">
                    Send what you already have.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/65">
                    That is usually enough to begin. If it is not a fit, you will know the same day rather than
                    after a week of silence.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <a
                        href={START}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-[8px] bg-sunset px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-black transition hover:bg-clay"
                    >
                        <i className="fab fa-whatsapp text-base" /> Start a proposal
                    </a>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-[8px] border border-white/15 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 transition hover:border-sunset/50 hover:text-sunset"
                    >
                        Email instead
                    </Link>
                </div>
            </div>
        </section>

        <Footer />
    </div>
);

export default ProposalGuide;
