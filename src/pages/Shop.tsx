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

const products: ShopItem[] = [
    {
        id: 'mood-happy-tee',
        name: 'Mood: Happy T-Shirt',
        category: 'Mood Collection',
        price: 'KES 3,750',
        image: 'https://i.ibb.co/yFY2nZPk/MOOD-Happy.png',
        description: 'Premium heavy-weight cotton T-shirt from the Mood Collection.',
        format: 'Apparel',
    },
];

const playbooks: ShopItem[] = [
    {
        id: 'creative-director-2026',
        name: 'How to Be a Creative Director in 2026',
        category: 'Career Playbook',
        price: 'KES 5,000',
        description: 'A practical guide for thinking like a creative director: taste, references, client language, portfolio structure, and decision-making.',
        format: 'PDF + Notion checklist',
    },
    {
        id: 'brand-systems-starter',
        name: 'Brand Systems Starter Kit',
        category: 'Design Playbook',
        price: 'KES 5,000',
        description: 'A starter framework for turning logos, colors, typography, mockups, and content rules into a usable brand system.',
        format: 'PDF + templates',
    },
    {
        id: 'client-proposal-playbook',
        name: 'Creative Proposal Playbook',
        category: 'Business Playbook',
        price: 'KES 5,000',
        description: 'Proposal sections, pricing language, scope boundaries, and follow-up scripts for creative services.',
        format: 'PDF + copy blocks',
    },
    {
        id: 'content-direction-board',
        name: '30-Day Content Direction Board',
        category: 'Content Playbook',
        price: 'KES 5,000',
        description: 'A month of content prompts for brands that need better posts, clearer campaigns, and sharper visual direction.',
        format: 'Notion board',
    },
    {
        id: 'portfolio-upgrade-system',
        name: 'Portfolio Upgrade System',
        category: 'Portfolio Playbook',
        price: 'KES 5,000',
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
                description="Practical playbooks and creative tools from Sir Newson: creative direction guides, brand system kits, proposal templates and content boards. Playbooks KES 5,000 each."
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
                <div className="flex min-w-max animate-pulse items-center justify-center gap-8 text-sm font-black uppercase tracking-widest md:text-base">
                    <span>Creative Playbooks</span>
                    <span>Digital Assets</span>
                    <span>Wall Art & Apparel</span>
                    <span>Better Ideas, Cleaner Execution</span>
                </div>
            </div>

            <section id="playbooks" className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">Playbook Section</p>
                            <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">Learn the Thinking Behind the Work</h2>
                            <p className="mt-4 max-w-2xl text-white/60">
                                Practical guides for creatives, founders, and designers who want sharper direction, better client conversations, and cleaner systems.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {playbooks.map((playbook, index) => (
                            <motion.article
                                key={playbook.id}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-primary/60 hover:bg-white/[0.06]"
                            >
                                <div className="mb-8 flex items-start justify-between gap-5">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">{playbook.category}</p>
                                        <p className="mt-2 text-sm text-white/45">{playbook.format}</p>
                                    </div>
                                    <span className="rounded-full bg-primary px-4 py-2 text-sm font-black text-black">{playbook.price}</span>
                                </div>
                                <h3 className="font-display text-2xl font-black leading-tight">{playbook.name}</h3>
                                <p className="mt-4 min-h-24 text-sm leading-6 text-white/60">{playbook.description}</p>
                                <button
                                    type="button"
                                    onClick={() => handleOrder(playbook)}
                                    className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-5 py-3 text-xs font-black uppercase tracking-wider text-black transition hover:bg-white"
                                >
                                    Order on WhatsApp
                                    <i className="fab fa-whatsapp" />
                                </button>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 bg-neutral-dark px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10">
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">Creative Drops</p>
                        <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Physical & Digital Goods</h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product, index) => (
                            <motion.article
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-medium transition duration-300 hover:-translate-y-2 hover:border-primary/60"
                            >
                                <div className="aspect-[4/5] overflow-hidden bg-black/40">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                </div>

                                <div className="p-6">
                                    <div className="mb-2 flex items-start justify-between gap-4">
                                        <h3 className="text-xl font-black text-white transition group-hover:text-primary">{product.name}</h3>
                                        <span className="font-black text-primary">{product.price}</span>
                                    </div>
                                    <p className="mb-6 text-sm text-white/60">{product.description}</p>

                                    <button
                                        type="button"
                                        onClick={() => handleOrder(product)}
                                        className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 py-3 text-xs font-black uppercase tracking-wider text-primary transition hover:bg-primary hover:text-black"
                                    >
                                        <i className="fab fa-whatsapp" /> Order Now
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Shop;
