import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Thread {
    id: string;
    content: string;
    category: string;
    timestamp: any;
    likes: number;
}

const CATEGORIES = [
    { value: 'design', label: 'Design Idea', color: 'text-primary border-primary/20 bg-primary/5' },
    { value: 'hack', label: 'System Hack', color: 'text-secondary border-secondary/20 bg-secondary/5' },
    { value: 'ai', label: 'AI Systems', color: 'text-purple-400 border-purple-400/20 bg-purple-400/5' },
    { value: 'general', label: 'Random Nugget', color: 'text-zinc-400 border-zinc-400/20 bg-zinc-400/5' }
];

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [authError, setAuthError] = useState('');
    
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('design');
    const [threads, setThreads] = useState<Thread[]>([]);
    const [isPosting, setIsPosting] = useState(false);
    const [postSuccess, setPostSuccess] = useState(false);

    // Default passcode check
    const CORRECT_PASSCODE = '74100';

    // Verify cached passcode on mount
    useEffect(() => {
        const cached = localStorage.getItem('sirnewson_auth');
        if (cached === CORRECT_PASSCODE) {
            setIsAuthenticated(true);
        }
    }, []);

    // Listen to threads from Firestore
    useEffect(() => {
        if (!isAuthenticated) return;

        const q = query(collection(db, 'threads'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedThreads = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Thread[];
            setThreads(fetchedThreads);
        }, (error) => {
            console.error("Error loading threads:", error);
        });

        return () => unsubscribe();
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passcode === CORRECT_PASSCODE) {
            localStorage.setItem('sirnewson_auth', passcode);
            setIsAuthenticated(true);
            setAuthError('');
        } else {
            setAuthError('Access denied. Incorrect passcode.');
            setPasscode('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('sirnewson_auth');
        setIsAuthenticated(false);
    };

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsPosting(true);
        try {
            await addDoc(collection(db, 'threads'), {
                content: content.trim(),
                category,
                timestamp: serverTimestamp(),
                likes: 0
            });
            
            setContent('');
            setCategory('design');
            setPostSuccess(true);
            setTimeout(() => setPostSuccess(false), 3000);
        } catch (error) {
            console.error("Error creating thread document:", error);
            alert("Failed to publish thread.");
        } finally {
            setIsPosting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this thread?")) return;
        try {
            await deleteDoc(doc(db, 'threads', id));
        } catch (error) {
            console.error("Error deleting thread document:", error);
            alert("Failed to delete thread.");
        }
    };

    return (
        <div className="bg-neutral-black min-h-screen text-white relative">
            <Navbar />
            <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay z-0 pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-24">
                <AnimatePresence mode="wait">
                    {!isAuthenticated ? (
                        /* Login Shield screen */
                        <motion.div
                            key="login-shield"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center justify-center min-h-[50vh] text-center"
                        >
                            <div className="max-w-md w-full p-8 rounded-3xl bg-neutral-dark border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-md">
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary" />
                                
                                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-[0_0_15px_rgba(191,255,0,0.1)]">
                                    <i className="fas fa-lock" />
                                </div>
                                
                                <h1 className="font-display text-2xl font-bold mb-2">Access Thread Control</h1>
                                <p className="text-white/50 text-sm mb-6">Enter your credentials to publish design hacks and ideas.</p>
                                
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <input
                                            type="password"
                                            value={passcode}
                                            onChange={(e) => setPasscode(e.target.value)}
                                            placeholder="Enter Access Key..."
                                            className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 focus:border-primary/50 text-center text-white tracking-widest text-lg font-bold outline-none transition-colors"
                                        />
                                    </div>
                                    
                                    {authError && (
                                        <p className="text-red-500 text-xs font-semibold">{authError}</p>
                                    )}
                                    
                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-xl bg-primary text-black font-bold text-sm tracking-wider uppercase hover:bg-white hover:scale-[1.02] transition-all duration-300"
                                    >
                                        Verify Access
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    ) : (
                        /* Authenticated Control Panel */
                        <motion.div
                            key="control-panel"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                        >
                            {/* Left Column: Creator Profile & Compose */}
                            <div className="lg:col-span-5 space-y-8">
                                <div className="p-8 rounded-3xl bg-neutral-dark border border-white/5 shadow-xl relative overflow-hidden backdrop-blur-md">
                                    <div className="absolute top-0 right-0 p-4">
                                        <button
                                            onClick={handleLogout}
                                            className="text-xs text-white/40 hover:text-red-500 font-bold transition-colors uppercase tracking-wider"
                                        >
                                            Logout <i className="fas fa-sign-out-alt ml-1" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20">
                                            <img src="/assets/images/facee_63957c48.webp" alt="Sir Newson" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h2 className="font-display font-bold text-lg leading-none mb-1">Sir Newson</h2>
                                            <span className="text-xs text-primary font-semibold tracking-wider uppercase">Thread Commander</span>
                                        </div>
                                    </div>

                                    <h3 className="font-display font-bold text-xl mb-4 border-l-2 border-primary pl-3">Drop a Nugget</h3>
                                    
                                    <form onSubmit={handlePost} className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Category</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {CATEGORIES.map((cat) => (
                                                    <button
                                                        key={cat.value}
                                                        type="button"
                                                        onClick={() => setCategory(cat.value)}
                                                        className={`px-3 py-3 rounded-xl border text-xs font-bold text-center transition-all ${
                                                            category === cat.value
                                                                ? 'border-primary bg-primary/10 text-primary shadow-[0_0_10px_rgba(191,255,0,0.1)]'
                                                                : 'border-white/5 bg-white/5 text-white/60 hover:border-white/10 hover:text-white'
                                                        }`}
                                                    >
                                                        {cat.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
                                                Content ({content.length}/500)
                                            </label>
                                            <textarea
                                                rows={5}
                                                maxLength={500}
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                placeholder="Write your thought, hack, or design nugget..."
                                                className="w-full p-4 rounded-2xl bg-black border border-white/10 focus:border-primary/50 text-white text-base outline-none resize-none transition-colors"
                                            />
                                        </div>

                                        <AnimatePresence>
                                            {postSuccess && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold text-center"
                                                >
                                                    ✓ Thread successfully cast onto the network.
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <button
                                            type="submit"
                                            disabled={isPosting || !content.trim()}
                                            className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                                                isPosting || !content.trim()
                                                    ? 'bg-neutral-medium text-white/30 border border-white/5 cursor-not-allowed'
                                                    : 'bg-primary text-black hover:scale-[1.02] hover:bg-white shadow-[0_0_20px_rgba(191,255,0,0.2)]'
                                            }`}
                                        >
                                            {isPosting ? 'Publishing...' : 'Cast Thread'} <i className="fas fa-paper-plane" />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Right Column: Manage Streams */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-display font-bold text-xl uppercase tracking-wider">Live Broadcasts ({threads.length})</h3>
                                    <div className="h-[1px] flex-grow bg-white/10 mx-6" />
                                </div>

                                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {threads.length === 0 ? (
                                        <div className="p-8 text-center border border-white/5 rounded-2xl bg-white/2 text-white/40">
                                            No threads found in database. Broadcast stream is silent.
                                        </div>
                                    ) : (
                                        threads.map((thread) => {
                                            const catObj = CATEGORIES.find(c => c.value === thread.category);
                                            const displayDate = thread.timestamp 
                                                ? new Date(thread.timestamp.seconds * 1000).toLocaleString() 
                                                : 'Just now';

                                            return (
                                                <motion.div
                                                    key={thread.id}
                                                    layout
                                                    className="p-6 rounded-2xl bg-neutral-dark border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between gap-4 relative group"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                                                                <img src="/assets/images/facee_63957c48.webp" alt="Sir Newson" className="w-full h-full object-cover" />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="text-xs font-bold">@sirnewson</span>
                                                                    <i className="fas fa-check-circle text-primary text-[10px]" />
                                                                </div>
                                                                <span className="text-[10px] text-white/30">{displayDate}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            {catObj && (
                                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${catObj.color}`}>
                                                                    {catObj.label}
                                                                </span>
                                                            )}
                                                            <button
                                                                onClick={() => handleDelete(thread.id)}
                                                                className="text-white/30 hover:text-red-500 transition-colors p-1"
                                                                title="Delete Thread"
                                                            >
                                                                <i className="fas fa-trash-alt text-xs" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <p className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed">
                                                        {thread.content}
                                                    </p>
                                                </motion.div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
