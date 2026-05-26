import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface Thread {
    id: string;
    content: string;
    category: string;
    timestamp: any;
    likes: number;
}

const CATEGORY_STYLES: Record<string, { label: string; color: string; border: string; bg: string; glow: string }> = {
    design: {
        label: 'DESIGN NOTE',
        color: 'text-primary',
        border: 'border-primary/20',
        bg: 'bg-primary/5',
        glow: 'hover:shadow-[0_0_30px_rgba(191,255,0,0.12)] hover:border-primary/30 border-t-primary border-t-4'
    },
    hack: {
        label: 'SYSTEM HACK',
        color: 'text-secondary',
        border: 'border-secondary/20',
        bg: 'bg-secondary/5',
        glow: 'hover:shadow-[0_0_30px_rgba(147,51,234,0.12)] hover:border-secondary/30 border-t-secondary border-t-4'
    },
    ai: {
        label: 'AI WORKFLOW',
        color: 'text-purple-400',
        border: 'border-purple-400/20',
        bg: 'bg-purple-400/5',
        glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.12)] hover:border-purple-400/30 border-t-purple-400 border-t-4'
    },
    general: {
        label: 'QUICK THOUGHT',
        color: 'text-zinc-400',
        border: 'border-zinc-400/20',
        bg: 'bg-zinc-400/5',
        glow: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.06)] hover:border-zinc-500/30 border-t-zinc-500 border-t-4'
    }
};

const DriftNotes = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [likedThreads, setLikedThreads] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 2500);
    };

    // Load liked threads from localStorage to persist user likes
    useEffect(() => {
        const storedLikes = localStorage.getItem('sirnewson_liked_threads');
        if (storedLikes) {
            try {
                setLikedThreads(JSON.parse(storedLikes));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    // Listen to live threads from Firestore
    useEffect(() => {
        const q = query(collection(db, 'threads'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedThreads = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Thread[];
            setThreads(fetchedThreads);
            setLoading(false);
        }, (error) => {
            console.error("Error loading threads:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLike = async (id: string) => {
        if (likedThreads.includes(id)) {
            // Unlike (decrement)
            const updated = likedThreads.filter(tid => tid !== id);
            setLikedThreads(updated);
            localStorage.setItem('sirnewson_liked_threads', JSON.stringify(updated));
            try {
                await updateDoc(doc(db, 'threads', id), {
                    likes: increment(-1)
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            // Like (increment)
            const updated = [...likedThreads, id];
            setLikedThreads(updated);
            localStorage.setItem('sirnewson_liked_threads', JSON.stringify(updated));
            try {
                await updateDoc(doc(db, 'threads', id), {
                    likes: increment(1)
                });
            } catch (e) {
                console.error(e);
            }
        }
    };

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

    const staticQuotes = [
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
        "Your default settings run more of your life than your intentions."
    ];

    return (
        <div className="bg-neutral-black min-h-screen text-white relative font-sans">
            <Navbar />
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay z-0 pointer-events-none" />

            {/* Toast feedback */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-primary text-black font-semibold text-xs shadow-2xl flex items-center gap-2"
                    >
                        <i className="fas fa-check-circle"></i>
                        {toastMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Header */}
            <section className="relative pt-40 pb-16 md:pt-52 md:pb-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center max-w-3xl">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-primary/80">A place for my raw thoughts & nuggets</span>
                    </motion.div>
                    
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none">
                        Thoughts & Nuggets
                    </h1>
                    
                    <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        A quiet space where I drop my quick thoughts, design ideas, system hacks, and lessons learned along the way. Think of it as a public scratchpad straight from my desk.
                    </p>
                </div>
            </section>

            {/* Live Feed Section */}
            <section className="px-6 py-12 max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">Latest Threads</h2>
                    <div className="h-[1px] flex-grow bg-white/10" />
                    <span className="text-xs font-mono text-white/40">SYNCED IN REAL-TIME</span>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-white/40 font-mono text-sm tracking-wider flex flex-col items-center justify-center gap-4">
                        <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                        Awaiting connection to neural feed...
                    </div>
                ) : threads.length === 0 ? (
                    <div className="py-20 text-center border border-white/5 rounded-3xl bg-neutral-dark/40 text-white/40 max-w-2xl mx-auto px-6">
                        <i className="fas fa-satellite-dish text-2xl mb-4 text-white/20" />
                        <p className="font-medium mb-1">Stream is currently quiet.</p>
                        <p className="text-xs text-white/30">Nuggets and thoughts will appear here soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence initial={false}>
                            {threads.map((thread, idx) => {
                                const cat = CATEGORY_STYLES[thread.category] || CATEGORY_STYLES.general;
                                const isLiked = likedThreads.includes(thread.id);
                                const displayTime = thread.timestamp
                                    ? new Date(thread.timestamp.seconds * 1000).toLocaleDateString(undefined, {
                                          month: 'short',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                      })
                                    : 'Just now';

                                return (
                                    <motion.article
                                        key={thread.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                        className={`p-8 rounded-[28px] bg-neutral-dark/80 backdrop-blur-md border border-white/5 ${cat.glow} transition-all duration-500 relative flex flex-col justify-between overflow-hidden min-h-[280px] group`}
                                    >
                                        {/* Corner technical grid overlay */}
                                        <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-white/5 opacity-50 group-hover:border-primary/20 transition-colors pointer-events-none" />
                                        <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-white/5 opacity-50 group-hover:border-primary/20 transition-colors pointer-events-none" />

                                        <div>
                                            {/* Poster card header details */}
                                            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/30 mb-6">
                                                <span>№ {String(threads.length - idx).padStart(2, '0')} // THREAD</span>
                                                <span className={`font-bold tracking-widest px-2 py-0.5 rounded ${cat.bg} ${cat.border} ${cat.color}`}>
                                                    {cat.label}
                                                </span>
                                            </div>

                                            {/* Typographic Poster Content */}
                                            <div className={`relative z-10 text-white font-sans ${thread.content.length < 140 ? 'text-lg md:text-xl font-bold tracking-tight text-glow leading-snug' : 'text-sm md:text-base font-light leading-relaxed'} mb-8 whitespace-pre-wrap`}>
                                                {thread.content}
                                            </div>
                                        </div>

                                        {/* Actions Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] text-white/40 mt-auto relative z-10">
                                            <span className="font-mono uppercase tracking-wider">{displayTime}</span>
                                            
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleLike(thread.id)}
                                                    className={`flex items-center gap-1.5 transition-colors duration-300 group/btn ${
                                                        isLiked ? 'text-primary' : 'hover:text-white'
                                                    }`}
                                                >
                                                    <i className={`fa-heart ${isLiked ? 'fas scale-110' : 'far'} transition-all duration-300`} />
                                                    <span className="font-mono text-xs">{thread.likes || 0}</span>
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(thread.content);
                                                        showToast("Copied thread content!");
                                                    }}
                                                    className="hover:text-white transition-colors"
                                                    title="Copy Content"
                                                >
                                                    <i className="far fa-copy" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </section>

            {/* Static Insights / Quotes */}
            <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">Thoughts & Patterns</h2>
                    <div className="h-[1px] flex-grow bg-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {staticQuotes.map((thought, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group p-8 rounded-3xl bg-neutral-dark/40 border border-white/5 hover:border-primary/30 hover:bg-neutral-dark transition-all duration-300 hover:-translate-y-1"
                        >
                            <span className="text-primary/20 text-4xl font-serif leading-none mb-4 block">"</span>
                            <p className="text-white/80 text-base font-light leading-relaxed group-hover:text-white transition-colors">
                                {thought}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="px-6 py-12 max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">Visual Drift</h2>
                    <div className="h-[1px] flex-grow bg-white/10" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {notesImages.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300"
                        >
                            <img
                                src={src}
                                alt={`Drift Note ${index + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Wynmind Gateway Section */}
            <section className="py-20 md:py-28 px-6 bg-neutral-dark/80 border-y border-white/5 relative overflow-hidden z-10">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
                    <img src="https://i.ibb.co/BHzH7zP8/normal-logo.png" alt="Wynmind" className="h-12 mb-8 opacity-40" />
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Read More. Go Deeper.</h2>
                    <p className="text-white/60 text-base md:text-lg mb-10 max-w-2xl leading-relaxed font-light">
                        Don't just scroll past good thoughts. Internalize them. Wynmind is a dedicated space to explore the architecture of the mind, the digital soul, and the quiet spaces in between.
                    </p>
                    <a 
                        href="https://wynmind.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-10 py-4 bg-primary text-black rounded-full font-bold text-base hover:scale-105 transition-transform shadow-[0_0_20px_rgba(191,255,0,0.3)] flex items-center gap-3"
                    >
                        Visit Wynmind <i className="fas fa-external-link-alt text-xs"></i>
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DriftNotes;
