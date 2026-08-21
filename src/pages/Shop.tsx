import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

interface ShopItem {
    id: string;
    name: string;
    category: string;
    price: string;
    description: string;
    format: string;
    image?: string;
}

const playbooks: ShopItem[] = [
    {
        id: 'creative-director-2026',
        name: 'How to Be a Creative Director in 2026',
        category: 'Career Playbook',
        price: 'KES 25,000',
        description: 'A practical guide for thinking like a creative director: taste, references, client language, portfolio structure, and decision-making.',
        format: 'PDF + Notion checklist',
    },
    {
        id: 'brand-systems-starter',
        name: 'Brand Systems Starter Kit',
        category: 'Design Playbook',
        price: 'KES 25,000',
        description: 'A starter framework for turning logos, colors, typography, mockups, and content rules into a usable brand system.',
        format: 'PDF + templates',
    },
    {
        id: 'client-proposal-playbook',
        name: 'Creative Proposal Playbook',
        category: 'Business Playbook',
        price: 'KES 25,000',
        description: 'Proposal sections, pricing language, scope boundaries, and follow-up scripts for creative services.',
        format: 'PDF + copy blocks',
    },
    {
        id: 'content-direction-board',
        name: '30-Day Content Direction Board',
        category: 'Content Playbook',
        price: 'KES 25,000',
        description: 'A month of content prompts for brands that need better posts, clearer campaigns, and sharper visual direction.',
        format: 'Notion board',
    },
    {
        id: 'portfolio-upgrade-system',
        name: 'Portfolio Upgrade System',
        category: 'Portfolio Playbook',
        price: 'KES 25,000',
        description: 'A simple system for choosing projects, writing case-study captions, and arranging work so clients understand your value quickly.',
        format: 'PDF workbook',
    },
];

const Shop = () => {
    const handleOrder = (item: ShopItem) => {
        const message = `Hi Sir Newson, I'm interested in ${item.name} (${item.price}).`;
        window.open(`https://wa.me/254702480771?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-neutral-black text-white">
            <SEO
                title="Shop | Creative Playbooks, Design Assets & Drops | Sir Newson"
                description="Practical playbooks and creative tools from Sir Newson: creative direction guides, brand system kits, proposal templates and content boards. Playbooks KES 25,000 each."
                keywords="creative playbook Kenya, brand system template, creative director guide, design assets Kenya, proposal template creative, content calendar Kenya"
                path="/shop"
            />
            <Hero
                title={<span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">The Shop</span>}
                subtitle="Playbooks • Digital Assets • Apparel • Creative Drops"
                shortParagraph="The systems I use to get work ready, packaged so you can use them too. Playbooks, templates and drops for people who want their own work to arrive properly."
                primaryCtaLabel="Browse Playbooks"
                primaryCtaPath="/shop#playbooks"
                secondaryCtaLabel="View Work"
                secondaryCtaPath="/work"
            />

            <div className="mb-12 overflow-hidden bg-primary py-4 text-black">
                <div className="flex min-w-max animate-pulse items-center justify-center gap-8 text-sm font-semibold uppercase tracking-widest md:text-base">
                    <span>Creative Playbooks</span>
                    <span>Digital Assets</span>
                    <span>Wall Art & Apparel</span>
                    <span>Better Ideas, Cleaner Execution</span>
                </div>
            </div>

            <section id="playbooks" className="aurora-section relative overflow-hidden px-6 py-20 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sunset">Limited Playbooks</p>
                            <h2 className="mt-4 font-display text-4xl leading-[1.02] md:text-6xl">The thinking, <span className="italic text-white/55">not just the output.</span></h2>
                            <p className="mt-4 max-w-2xl text-white/70">
                                Written for people already doing the work — directors, founders and studios who want sharper judgement, better client conversations and systems that hold under pressure.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {playbooks.map((playbook, index) => (
                            <motion.article
                                key={playbook.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -4 }}
                                className="glow-stroke glow-stroke--hover group relative flex flex-col overflow-hidden rounded-[14px] border border-white/[0.08] bg-neutral-dark/60 p-7 backdrop-blur-sm"
                            >
                                {/* Edition marker */}
                                <span className="absolute right-6 top-6 font-mono text-[10px] text-white/15 transition-colors duration-500 group-hover:text-sunset/60">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-sunset">{playbook.category}</p>

                                <h3 className="mt-5 font-editorial text-[1.75rem] leading-[1.1] text-warm-white transition-transform duration-500 group-hover:-translate-y-0.5">
                                    {playbook.name}
                                </h3>

                                <p className="mt-4 flex-1 text-sm leading-7 text-white/55">{playbook.description}</p>

                                <div className="mt-7 flex items-end justify-between gap-4 border-t border-white/[0.08] pt-5">
                                    <div>
                                        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">{playbook.format}</p>
                                        <p className="mt-1.5 font-display text-xl text-warm-white">{playbook.price}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleOrder(playbook)}
                                        aria-label={`Order ${playbook.name} on WhatsApp`}
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] border border-white/12 text-warm-white transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-soft-black"
                                    >
                                        <i className="fab fa-whatsapp text-base" />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className=" px-6 py-20 md:py-28">
                <div className="mx-auto max-w-5xl">
                    <div className="glow-stroke glow-stroke--hover group relative overflow-hidden rounded-[14px] border border-white/[0.08] bg-neutral-black/60 p-8 md:p-12">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sunset">Apparel</p>
                        <h2 className="mt-4 font-display text-4xl leading-[1.02] md:text-5xl">
                            Jinwear is its <span className="italic text-white/55">own house.</span>
                        </h2>
                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 md:text-base">
                            Wearable design — apparel, drops and wall art — lives on its own site,
                            with its own range and its own checkout.
                        </p>
                        <a
                            href="https://www.jinwear.co.ke/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center gap-2.5 rounded-[8px] bg-lime px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-soft-black transition hover:bg-golden-hour"
                        >
                            Visit Jinwear
                            <i className="fas fa-arrow-up-right-from-square text-[10px]" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Shop;
