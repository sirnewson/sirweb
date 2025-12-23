import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import DriftCinemaxBanner from '../components/DriftCinemaxBanner';

const DriftNotes = () => {
    const notesImages = [
        '/assets/images/1_11b7e450.webp',
        '/assets/images/2_c4609e0b.webp',
        '/assets/images/3_cc6a0b5f.webp',
        '/assets/images/4_f35cc79f.webp',
        '/assets/images/5_7349e0ec.webp',
        '/assets/images/6_bdc784ea.webp',
        '/assets/images/7_b2b71237.webp',
        '/assets/images/8_e2e6d46a.webp',
        '/assets/images/9_beb9880f.webp'
    ];

    return (
        <div className="bg-neutral-black min-h-screen">
            <Navbar />
            <Hero
                title="Drift Notes"
                subtitle="Thoughts & Visuals"
            />

            {/* Gallery Grid */}
            <section className="px-6 py-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {notesImages.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300"
                        >
                            <img
                                src={src}
                                alt={`Drift Note ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Threads Promo Banner */}
            <section className="px-6 mb-24">
                <div className="max-w-7xl mx-auto">
                    <a
                        href="https://www.threads.net/@sirnewson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative overflow-hidden rounded-2xl bg-[#101010] border border-white/5 p-8 md:p-12 hover:border-primary/50 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                                    Get your daily dose of clarity.
                                </h3>
                                <p className="text-white/60 text-lg">
                                    Follow <span className="text-primary">@sirnewson</span> on Threads for daily thoughts & patterns.
                                </p>
                            </div>

                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                                <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            {/* Thoughts & Quotes Grid */}
            <section className="px-6 pb-24">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-display font-bold text-white mb-12 border-l-4 border-primary pl-6">Thoughts & Patterns</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            "Most problems get lighter the moment you describe them accurately.",
                            "The mind loves shortcuts even when they lead to the wrong place.",
                            "You don’t rise to your goals, you sink to your systems.",
                            "Your attention shapes your reality more than your environment does.",
                            "People change slower than you think and faster than they notice.",
                            "Simplicity is a skill, not an accident.",
                            "The future rewards people who can learn quickly, not those who know a lot.",
                            "Most emotional pain is mismanaged information.",
                            "You grow the moment you stop arguing with reality.",
                            "Scarcity makes anything feel valuable, even confusion.",
                            "If people saw your thoughts unfiltered, they’d understand you better.",
                            "Your default settings run more of your life than your intentions.",
                            "Overthinking is momentum with no direction.",
                            "You are always training your mind, even when you don’t mean to.",
                            "Curiosity extends your life without adding years.",
                            "Self awareness begins when blame ends.",
                            "The moment you name a fear, it loses half its power.",
                            "Most conflict comes from mismatched expectations, not malice.",
                            "Attention is addictive to both the giver and the receiver.",
                            "Energy flows where clarity goes.",
                            "You can’t grow in a place where everything you do is understood.",
                            "Silence isn’t empty. It’s full of data.",
                            "Your brain loves routine because it hates burning calories.",
                            "Small improvements compound faster than breakthroughs.",
                            "The version of you that got you here won't get you further.",
                            "Stress is often your mind rehearsing a problem it hasn’t solved yet.",
                            "Your environment whispers instructions you obey subconsciously.",
                            "Most people avoid the truth because it demands restructuring.",
                            "The cost of clarity is usually discomfort.",
                            "The more information you have, the less assumptions you need.",
                            "Insight without action becomes mental clutter.",
                            "Your personality is partly habits you stopped questioning.",
                            "Freedom grows when your needs shrink.",
                            "The brain hates uncertainty but creativity loves it.",
                            "The fastest way to feel lost is to chase too many paths.",
                            "Identity is a story you rewrite more often than you admit.",
                            "Growth feels like confusion right before it feels like progress.",
                            "People rarely judge you, they judge their idea of you.",
                            "Most arguments are two people defending different definitions.",
                            "There’s no such thing as a neutral habit.",
                            "What you consume eventually consumes you.",
                            "If something repeats, it's not random.",
                            "You don’t need more time, you need less friction.",
                            "Curiosity turns ordinary days into data points.",
                            "You can’t see your own progress while you're inside it.",
                            "Expectations are contracts people never signed.",
                            "Your emotions are feedback, not final truth.",
                            "The fastest way to learn is to explain something simply.",
                            "Change often looks like loss before it looks like upgrade.",
                            "You don’t burnout from work, you burnout from misalignment.",
                            "Most people are tired, not because life is hard, but because their mind is loud.",
                            "Confidence grows from evidence, not intention.",
                            "You can’t optimize what you haven’t measured.",
                            "Your brain edits memories to protect your identity.",
                            "Complexity impresses people. Simplicity changes them.",
                            "What you repeat becomes automatic, then becomes identity.",
                            "Most limitations are strategies your younger self created for safety.",
                            "A chaotic space creates a chaotic mind faster than you notice.",
                            "Choices become easier when your values are known.",
                            "Everything is easier when you remove the hidden friction.",
                            "If you can observe your thought, it means you aren’t the thought.",
                            "People who rush rarely know where they’re going.",
                            "Perception has more power than facts in daily life.",
                            "You always pay for clarity, the price is usually discomfort.",
                            "Your future quietly depends on habits you consider trivial.",
                            "The mind is a pattern machine. It sees what it expects.",
                            "You change the moment your identity updates, not when your plan does.",
                            "Momentum is more important than motivation.",
                            "Awareness is the first upgrade. Everything else follows."
                        ].map((thought, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-neutral-medium transition-all duration-300 hover:-translate-y-1"
                            >
                                <span className="text-primary/20 text-4xl font-serif leading-none mb-4 block">"</span>
                                <p className="text-white/80 text-lg font-medium leading-relaxed group-hover:text-white transition-colors">
                                    {thought}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Drift Library Section (Replicated from Home) */}
            <section className="py-40 px-6 bg-neutral-dark border-t border-white/10 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <i className="fas fa-quote-left text-5xl text-primary/50 mb-8 block" />
                    <blockquote className="font-display text-2xl md:text-4xl font-bold text-white leading-relaxed mb-12">
                        "A global archive of essays exploring the architecture of the mind, the digital soul, and the quiet spaces in between."
                    </blockquote>

                    <a href="https://thedriftlibrary.yxm.digital/" target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-4 bg-black text-white rounded-full font-semibold hover:bg-neutral-800 transition-colors shadow-lg shadow-black/20">
                        Start Reading
                    </a>
                </div>

                <div className="mt-24">
                    <DriftCinemaxBanner />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DriftNotes;
