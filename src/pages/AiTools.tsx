import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const AiTools = () => {
    const [filter, setFilter] = useState<'all' | 'Free' | 'Premium'>('all');
    const [search, setSearch] = useState('');

    const tools = [
        { title: "BookSummary", description: "AI-powered book summaries.", url: "https://booksummary.yxm.digital/", type: "Premium", isNew: true },
        { title: "Finder", description: "Digital finding tool.", url: "https://finder.yxm.digital/", type: "Free", isNew: true },
        { title: "Compositor", description: "Web element compositor.", url: "https://compositor.yxm.digital/", type: "Premium", isNew: true },
        { title: "EbookSeller", description: "Platform for selling ebooks.", url: "https://ebookseller.yxm.digital/", type: "Premium", isNew: true },
        { title: "Web Gallery", description: "3D Art Game", url: "https://webgallerygame.vercel.app/", type: "Free" },
        { title: "Tenacity Locks", description: "Security and locks.", url: "https://tenacitylocks.vercel.app/", type: "Free" },
        { title: "The Rated", description: "Rating platform.", url: "https://the-rated.vercel.app/", type: "Premium" },
        { title: "uTube Player", description: "Custom player.", url: "https://utubeplayer-mu.vercel.app/", type: "Free" },
        { title: "Mascots", description: "Mascot generator.", url: "https://mascots.yxm.digital/", type: "Premium" },
        { title: "DriftPad", description: "Focus Writing.", url: "https://driftpad.yxm.digital", type: "Premium" },
        { title: "Tasks", description: "Task management.", url: "https://tasks.yxm.digital", type: "Premium" },
        { title: "Radio", description: "Online radio.", url: "https://radio-sooty.vercel.app/", type: "Free" },
        { title: "Solitaire", description: "Classic card game.", url: "https://solitaire-six-black.vercel.app/", type: "Free" },
        { title: "AI Data", description: "Analysis tool.", url: "https://aidata-eta.vercel.app/", type: "Premium" },
        { title: "Finmbeca", description: "Finance tool.", url: "https://finmbeca.vercel.app/", type: "Premium" },
        { title: "Visuals", description: "Image Gen.", url: "https://visuals-eta.vercel.app/", type: "Premium" },
        { title: "Captions", description: "Video tools.", url: "https://captionsmaster.yxm.digital/", type: "Premium" },
        { title: "Momentum", description: "Productivity.", url: "https://momentum-five-gamma.vercel.app/", type: "Free" },
        { title: "QR Code", description: "Code generator.", url: "https://qrcode.yxm.digital/", type: "Free" },
        { title: "Pixels", description: "Pixel art.", url: "https://pixels-five-ivory.vercel.app/", type: "Free" },
        { title: "Bet Predict", description: "Sports AI.", url: "https://betpredict.yxm.digital/", type: "Premium" },
        { title: "Clock", description: "Web clock.", url: "https://clock.yxm.digital/", type: "Free" },
        { title: "Kalar", description: "Colors.", url: "https://kalar-one.vercel.app/", type: "Free" },
        { title: "Focusflow", description: "Flow State.", url: "https://focusflow-jet.vercel.app/", type: "Premium" }
    ];

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(search.toLowerCase()) || tool.description.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || tool.type === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="bg-neutral-black min-h-screen">
            <SEO
                title="YXM Labs | AI Tools & Creative Web Apps | Sir Newson"
                description="Experimental AI tools, creative web apps and digital systems from YXM Labs — the infrastructure behind Sir Newson's presentation work."
                keywords="AI tools Kenya, creative web apps, YXM Labs, AI creative tools Nairobi, digital tools Kenya, creative technology Kenya"
                path="/tools"
            />
            <Navbar />

            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Sir Newson Tools
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-xl"
                    >
                        A dimensional collection of projects.
                    </motion.p>
                </div>

                {/* Controls */}
                <div className="max-w-xl mx-auto mb-16 space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search the void..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-neutral-medium border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                            <i className="fas fa-search"></i>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        {['all', 'Free', 'Premium'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${filter === f
                                        ? 'bg-primary text-black'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTools.map((tool, index) => (
                        <motion.a
                            key={index}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-neutral-medium p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{tool.title}</h3>
                                {tool.isNew && <span className="bg-cyan-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider">NEW</span>}
                                {!tool.isNew && tool.type === 'Premium' && <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider">PRO</span>}
                                {!tool.isNew && tool.type === 'Free' && <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider">FREE</span>}
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">{tool.description}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className="text-[10px] text-white/30 font-mono">v1.0.0</span>
                                <span className="text-primary text-xs font-bold uppercase group-hover:underline">Visit &rarr;</span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AiTools;
