import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import MediaModal from '../components/MediaModal';
import Footer from '../components/Footer';

interface WorkPin {
    title: string;
    image: string;
    type: 'image' | 'video';
    category: 'branding' | 'campaign' | 'motion' | 'product' | 'web' | 'ai' | 'marketing' | 'logo';
    url?: string;
}

const Work = () => {
    useEffect(() => {
        document.title = "Selected Work | SIR NEWSON Portfolio";
    }, []);

    const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string; type: 'image' | 'video' } | null>(null);
    const [activeFilter, setActiveFilter] = useState<'all' | 'branding' | 'campaign' | 'motion' | 'product' | 'web' | 'ai' | 'marketing' | 'logo'>('all');
    const [savedPins, setSavedPins] = useState<Record<string, boolean>>(() => {
        const saved = localStorage.getItem('sirnewson_saved_pins');
        return saved ? JSON.parse(saved) : {};
    });
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('sirnewson_saved_pins', JSON.stringify(savedPins));
    }, [savedPins]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 2500);
    };

    const getPinId = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    };

    const handleSave = (title: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const pinId = getPinId(title);
        const isSaved = savedPins[pinId];
        setSavedPins(prev => ({ ...prev, [pinId]: !isSaved }));
        showToast(isSaved ? "Removed from your board" : "Saved to your Work board!");
    };

    const handleShare = (title: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const pinId = getPinId(title);
        navigator.clipboard.writeText(`${window.location.origin}/work#pin-${pinId}`);
        showToast("Link to project copied!");
    };

    // Dynamically query files inside `/public/uploads/` via Vite's import.meta.glob recursively
    const globBranding = import.meta.glob('/public/uploads/branding/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
    const globGraphics = import.meta.glob('/public/uploads/graphics/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
    const globMotionVideos = import.meta.glob('/public/uploads/motion and video/**/*.{mp4,webm,mov,MP4,WEBM,MOV}', { eager: true });
    
    // Map globbed branding files to WorkPin format
    const uploadedBranding = Object.entries(globBranding).map(([filePath, module]: [string, any]) => {
        const url = typeof module === 'string' ? module : (module?.default || filePath.replace(/^\/public/, ''));
        const filename = filePath.split('/').pop() || 'Untitled';
        const cleanName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
        const isLogo = filename.toLowerCase().includes('logo');
        return {
            title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
            image: url,
            type: 'image' as const,
            category: (isLogo ? 'logo' : 'branding') as 'logo' | 'branding'
        };
    });

    // Map globbed graphics files to WorkPin format
    const uploadedGraphics = Object.entries(globGraphics).map(([filePath, module]: [string, any]) => {
        const url = typeof module === 'string' ? module : (module?.default || filePath.replace(/^\/public/, ''));
        const filename = filePath.split('/').pop() || 'Untitled';
        const cleanName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
        return {
            title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
            image: url,
            type: 'image' as const,
            category: 'campaign' as const
        };
    });

    // Map globbed videos files to WorkPin format for motions board
    const uploadedMotions = Object.entries(globMotionVideos).map(([filePath, module]: [string, any]) => {
        const url = typeof module === 'string' ? module : (module?.default || filePath.replace(/^\/public/, ''));
        const filename = filePath.split('/').pop() || 'Untitled';
        const cleanName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
        return {
            title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
            image: url,
            type: 'video' as const,
            category: 'motion' as const
        };
    });

    // Map globbed video files to Reels format
    const folderReels = Object.entries(globMotionVideos).map(([filePath, module]: [string, any]) => {
        const url = typeof module === 'string' ? module : (module?.default || filePath.replace(/^\/public/, ''));
        const filename = filePath.split('/').pop() || 'Untitled';
        const cleanName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
        return {
            title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
            videoUrl: url,
            isUploaded: true
        };
    });

    const defaultReels = [
        {
            title: "Liquid Neon Visual Experiment",
            videoUrl: "https://cdn.midjourney.com/video/d1863d34-2080-4e5f-ab90-f86d66131995/0.mp4",
            isUploaded: false
        },
        {
            title: "Cyberpunk Digital Grid",
            videoUrl: "https://cdn.pixabay.com/video/2024/06/06/215484_large.mp4",
            isUploaded: false
        },
        {
            title: "Aesthetic Glitch Art Poster",
            videoUrl: "https://cdn.pixabay.com/video/2021/04/12/70889-537446522_large.mp4",
            isUploaded: false
        },
        {
            title: "Motion Typography Canvas",
            videoUrl: "https://cdn.pixabay.com/video/2023/10/19/185671-876251213_large.mp4",
            isUploaded: false
        }
    ];

    const allReels = [...folderReels, ...defaultReels];

    const workItems: WorkPin[] = [
        // Dynamic branding uploads
        ...uploadedBranding,
        // AI Systems
        { title: 'Autonomous Agent Orchestrator', image: '/assets/images/recent_images/ai_agent_orchestrator.png', type: 'image', category: 'ai', url: 'https://captionsmaster.yxm.digital/' },
        { title: 'AI Prompt Pipeline & Analytics', image: '/assets/images/recent_images/ai_prompt_pipeline.png', type: 'image', category: 'ai', url: 'https://finder.yxm.digital/' },
        { title: 'Generative Branding Engine UI', image: '/assets/images/recent_images/generative_branding_engine.png', type: 'image', category: 'ai' },

        // Product Design
        { title: 'Visuals Eta Design System', image: '/assets/images/screenshots/visuals_eta.webp', type: 'image', category: 'product' },
        { title: 'Sphere Audio Space', image: '/assets/images/screenshots/sphere_audio.webp', type: 'image', category: 'product' },
        { title: 'FlowClock Minimal Timer', image: '/assets/images/screenshots/flowclock.webp', type: 'image', category: 'product' },
        { title: 'CaptionsMaster Editor Interface', image: '/assets/images/screenshots/captionsmaster.webp', type: 'image', category: 'product' },
        { title: 'Midnight Poetry Layout', image: '/assets/images/recent_work_midnight_poetry.webp', type: 'image', category: 'product' },
        { title: 'Silver Design Layout', image: '/assets/images/recent_images/silver.webp', type: 'image', category: 'product' },
        { title: 'Fun Grid Experiment', image: '/assets/images/recent_images/fun-concept.webp', type: 'image', category: 'product' },
        { title: 'Visual Style Framework', image: '/assets/images/recent_images/post-file.webp', type: 'image', category: 'product' },

        // Web Systems
        { title: 'Driftpad Notes App', image: '/assets/images/screenshots/driftpad.webp', type: 'image', category: 'web' },
        { title: 'YXM Digital Client Hub', image: '/assets/images/screenshots/yxm_digital.webp', type: 'image', category: 'web' },
        { title: 'OrdaFasta Merchant Dashboard', image: '/assets/images/screenshots/ordafasta.webp', type: 'image', category: 'web' },
        { title: 'PataKazi Job Platform', image: '/assets/images/screenshots/patakazi.webp', type: 'image', category: 'web' },
        { title: 'YouTube Frame Composition', image: '/assets/images/recent_images/youytubeee.webp', type: 'image', category: 'web' },

        // Marketing Direction
        { title: 'Saturday Dosage Season 4', image: '/assets/images/recent_work_saturday_dosage_wide.webp', type: 'image', category: 'marketing' },
        { title: 'Njugush Celebration Post', image: '/assets/images/recent_images/njugush-3m-post.webp', type: 'image', category: 'marketing' },
        { title: 'Cleanshelf Campaign Strategy', image: '/assets/images/cleanshelf-concept-3_3b0dacbc.webp', type: 'image', category: 'marketing' },
        { title: 'Amber Ray Brand Campaign', image: '/assets/images/AMBER-RAY_dd19587e.webp', type: 'image', category: 'marketing' },
        { title: 'Creative Collaboration System', image: '/assets/images/5_7349e0ec.webp', type: 'image', category: 'marketing' },

        // Branding Systems & Logo Designs
        { title: 'Funcity Brand Identity', image: '/assets/images/FUNCITY-JAMHURI_290cbccf.webp', type: 'image', category: 'branding', url: 'https://funcity.sirnewson.com/' },
        { title: 'Tenacity Locks Brand System', image: '/assets/images/tenacity-post_5bf44744.webp', type: 'image', category: 'branding', url: 'https://tenacity.sirnewson.com/' },
        { title: 'Zunguka Safaris Brand Identity', image: '/assets/images/zunguka-africa-safaris-1693228445-3179353094683146095-8643391881_0f1a67c7.webp', type: 'image', category: 'branding', url: 'https://zunguka.sirnewson.com/' },
        { title: 'The Gikonyore Experience', image: '/assets/images/recent_work_gikonyore.webp', type: 'image', category: 'branding' },
        { title: 'Wild Idea Board', image: '/assets/images/recent_images/wild-idea.webp', type: 'image', category: 'branding' },
        { title: 'Identity Editorial Profile', image: '/assets/images/recent_images/profilee.webp', type: 'image', category: 'branding' },
        { title: 'Countrywide Asset Sheet', image: '/assets/images/recent_images/countrywide-1.webp', type: 'image', category: 'branding' },
        { title: 'DJ Dibul Brand Identity', image: '/assets/images/recent_work_dj_dibul_wide.webp', type: 'image', category: 'branding' },
        { title: 'DJ Dibul Portrait', image: '/assets/images/recent_work_dj_dibul_portrait.webp', type: 'image', category: 'branding' },
        { title: 'Mkurugenzi Hoodies Design', image: '/assets/images/recent_work_mkurugenzi_hoodies_men.webp', type: 'image', category: 'branding' },
        { title: 'Mkurugenzi Hoodies Apparel (Women)', image: '/assets/images/recent_work_mkurugenzi_hoodies_women.webp', type: 'image', category: 'branding' },
        { title: 'KAB Project Visuals', image: '/assets/images/kab-1_61b51219.webp', type: 'image', category: 'branding' },
        { title: 'New Home of Fashion', image: '/assets/images/branding/NEW HOME OF FAHION.webp', type: 'image', category: 'branding' },
        { title: 'Tech Branding System', image: '/assets/images/branding/TECH 2.webp', type: 'image', category: 'branding' },
        { title: 'Asset Layout Board', image: '/assets/images/branding/branding board.webp', type: 'image', category: 'branding' },
        { title: 'Primary Brand Logo', image: '/assets/images/branding/logo.webp', type: 'image', category: 'logo' },
        { title: 'Brand Signature Board', image: '/assets/images/branding/main logo oon yellow.webp', type: 'image', category: 'logo' },
        { title: 'White Minimal Concept', image: '/assets/images/branding/white.webp', type: 'image', category: 'branding' },
        { title: 'Visual Logo System', image: '/assets/images/LOGOOS_3f0a96b1.webp', type: 'image', category: 'logo' },
        { title: 'Hoodie Apparel Design', image: '/assets/images/HOODIE_afe3871b.webp', type: 'image', category: 'branding' },
        { title: 'Polo Shirts Merchandise', image: '/assets/images/POLO-TSHIRTS_5b4c9162.webp', type: 'image', category: 'branding' },
        { title: 'Mombasa Art Direction', image: '/assets/images/MOMBASAAA_e7fd8350.webp', type: 'image', category: 'branding' },
        { title: 'Kili International Identity', image: '/assets/images/KILI-INTERNATIONA_b19a2e00.webp', type: 'image', category: 'branding' },
        { title: 'Art Direction Composition I', image: '/assets/images/1-ART_8c18a820.webp', type: 'image', category: 'branding' },
        { title: 'Graphic Layout Composition II', image: '/assets/images/2-ART_26d9ab8b.webp', type: 'image', category: 'branding' },
        { title: 'Concept Editorial Composition III', image: '/assets/images/3-ART_ef531b6f.webp', type: 'image', category: 'branding' },
        { title: 'Creative Brand Identity V', image: '/assets/images/6-ART_801759e8.webp', type: 'image', category: 'branding' },

        // Dynamic graphics uploads
        ...uploadedGraphics,
        // Campaign Graphics
        { title: 'Saturday Dosage Character', image: '/assets/images/recent_work_saturday_dosage_portrait.webp', type: 'image', category: 'campaign' },
        { title: 'Big Voices Fest Billboard', image: '/assets/images/recent_work_big_voices_fest.webp', type: 'image', category: 'campaign' },
        { title: 'Tenacity Locks Xmas Promo', image: '/assets/images/recent_work_tenacity_locks_xmas.webp', type: 'image', category: 'campaign' },
        { title: 'Dabo Dabo Lifestyle Promo', image: '/assets/images/DABO-DABO_ebc97ca5.webp', type: 'image', category: 'campaign' },
        { title: 'Funcity Jamhuri Poster', image: '/assets/images/FUNCITY-JAMHURI_290cbccf.webp', type: 'image', category: 'campaign' },
        { title: 'Games & Memories Cover', image: '/assets/images/GAMES-MEMORIES_d94b3847.webp', type: 'image', category: 'campaign' },
        { title: 'Watendawili Promotional Poster', image: '/assets/images/WATENDAWILII_7724315b.webp', type: 'image', category: 'campaign' },
        { title: 'Wololo TV Creative', image: '/assets/images/Wololo-TV_203fda44.webp', type: 'image', category: 'campaign' },
        { title: 'Visual Framework Composition IV', image: '/assets/images/5-ART_88e2646e.webp', type: 'image', category: 'campaign' },
        { title: 'Geometric Poster Composition VI', image: '/assets/images/7-ART_948c036b.webp', type: 'image', category: 'campaign' },

        // Dynamic motion video uploads
        ...uploadedMotions,
        // Motions & Videos
        { title: 'Short Film Storyboard', image: '/assets/images/SHORT-FILM_a2d1a747.webp', type: 'image', category: 'motion' },
        { title: 'Fluid Chromatic Sculptures', image: 'https://cdn.midjourney.com/video/d1863d34-2080-4e5f-ab90-f86d66131995/0.mp4', type: 'video', category: 'motion' },
        { title: 'Cyberpunk Vector Grid', image: 'https://cdn.pixabay.com/video/2024/06/06/215484_large.mp4', type: 'video', category: 'motion' },
        { title: 'Aesthetic Glitch Canvas', image: 'https://cdn.pixabay.com/video/2021/04/12/70889-537446522_large.mp4', type: 'video', category: 'motion' },
        { title: 'Motion Graphic Studio Loop', image: 'https://cdn.pixabay.com/video/2023/10/19/185671-876251213_large.mp4', type: 'video', category: 'motion' }
    ];

    const filteredItems = activeFilter === 'all'
        ? workItems
        : workItems.filter(item => item.category === activeFilter);

    return (
        <div className="bg-neutral-black min-h-screen text-white font-sans bg-hexagon-grid">
            
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

            <Hero />

            {/* Pinterest Filtering System */}
            <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap items-center justify-center gap-3">
                {[
                    { id: 'all', label: 'All Boards' },
                    { id: 'product', label: 'Product Design' },
                    { id: 'web', label: 'Web Systems' },
                    { id: 'ai', label: 'AI Systems' },
                    { id: 'marketing', label: 'Marketing Direction' },
                    { id: 'branding', label: 'Branding Systems' },
                    { id: 'logo', label: 'Logo Design' },
                    { id: 'campaign', label: 'Campaign Graphics' },
                    { id: 'motion', label: 'Motions & Video' }
                ].map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id as any)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                            activeFilter === filter.id
                                ? 'bg-primary text-black shadow-lg shadow-primary/20'
                                : 'bg-neutral-dark hover:bg-neutral-medium text-white/70 border border-white/5'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Work Pinterest Board Masonry Grid */}
            <section className="px-6 pb-24">
                <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((work) => (
                            <motion.div
                                layout
                                key={work.title}
                                id={work.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="break-inside-avoid relative rounded-[24px] overflow-hidden group bg-neutral-dark border border-white/5 hover:border-white/15 transition-all duration-300 cursor-zoom-in"
                                onClick={() => setSelectedMedia({ src: work.image, title: work.title, type: work.type })}
                            >
                                {work.type === 'video' ? (
                                    <video
                                        src={work.image}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="none"
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                ) : (
                                    <img
                                        src={work.image}
                                        alt={work.title}
                                        loading="lazy"
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/600x800/101010/FFF?text=${work.category.toUpperCase()}`;
                                        }}
                                    />
                                )}

                                {/* Hover controls */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 z-10">
                                    <div className="flex justify-between items-start w-full">
                                        <span className="px-2.5 py-1 rounded-full bg-black/60 text-[9px] font-bold text-white/80 tracking-widest uppercase border border-white/5">
                                            {work.category}
                                        </span>
                                        <button
                                            onClick={(e) => handleSave(work.title, e)}
                                            className={`px-4 py-2 rounded-full font-bold text-xs shadow-md transition-all ${
                                                savedPins[getPinId(work.title)] ? 'bg-white text-black' : 'bg-primary text-black hover:bg-white'
                                            }`}
                                        >
                                            {savedPins[getPinId(work.title)] ? 'Saved' : 'Save'}
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center w-full">
                                        <span className="font-display font-extrabold text-sm text-white truncate pr-4">
                                            {work.title}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {work.url && (
                                                <a 
                                                    href={work.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    onClick={(e) => e.stopPropagation()} 
                                                    className="px-3 py-1.5 rounded-full bg-primary text-black hover:bg-white font-bold text-xs flex items-center gap-1 transition-all"
                                                >
                                                    <span>Visit</span>
                                                    <i className="fas fa-external-link-alt text-[10px]"></i>
                                                </a>
                                            )}
                                            <button
                                                onClick={(e) => handleShare(work.title, e)}
                                                className="w-8 h-8 rounded-full bg-black/60 hover:bg-white hover:text-black flex items-center justify-center text-xs transition-colors border border-white/5"
                                                title="Share Link"
                                            >
                                                <i className="fas fa-paper-plane"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* Reels Section */}
            <section className="py-20 border-t border-white/5 bg-neutral-black">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <span className="text-primary tracking-[0.3em] uppercase text-xs font-bold block mb-3">
                                Dynamic Feed
                            </span>
                            <h2 className="font-display text-3xl md:text-5xl font-black text-white">
                                REELS & MOTION BARS
                            </h2>
                        </div>
                        <p className="text-white/50 text-sm max-w-sm">
                            Selected motion projects, creative reels, and digital narratives.
                        </p>
                    </div>

                    {/* Reels Grid (Mobile-friendly vertical cards) */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {allReels.map((reel, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative aspect-[9/16] rounded-3xl overflow-hidden group bg-neutral-dark border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer shadow-lg"
                                onClick={() => setSelectedMedia({ src: reel.videoUrl, title: reel.title, type: 'video' })}
                            >
                                {/* Video Loop background */}
                                <div className="absolute inset-0">
                                    <video
                                        src={reel.videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                                </div>

                                {/* Play icon overlay */}
                                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white text-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                                        <i className="fas fa-play ml-1"></i>
                                    </div>
                                </div>

                                {/* Text & Tags */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                                    <span className="px-2 py-0.5 rounded bg-primary/20 border border-primary/30 text-primary text-[9px] font-bold tracking-widest uppercase mb-2 inline-block">
                                        {reel.isUploaded ? 'MOTION' : 'REEL'}
                                    </span>
                                    <h3 className="font-display font-extrabold text-sm text-white line-clamp-2">
                                        {reel.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Web Projects Section */}
            <section className="py-24 border-t border-white/5 bg-neutral-medium/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary tracking-[0.3em] uppercase text-xs font-bold block mb-3">
                            Deployed Systems
                        </span>
                        <h2 className="font-display text-3xl md:text-5xl font-black text-white">
                            WEB PROJECTS & EXPERIENCES
                        </h2>
                        <p className="text-white/50 text-sm max-w-2xl mx-auto mt-4">
                            Interactive platforms, utility tools, and functional designs engineered for fast, clean performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Visuals Eta', url: 'https://visuals-eta.vercel.app/', image: '/assets/images/screenshots/visuals_eta.webp' },
                            { title: 'Web Gallery Game', url: 'https://webgallerygame.vercel.app/', image: '/assets/images/screenshots/web_gallery.webp' },
                            { title: 'UTube Player', url: 'https://utubeplayer-mu.vercel.app/', image: '/assets/images/screenshots/utube_player.webp' },
                            { title: 'Solitaire Dark', url: 'https://solitaire-six-black.vercel.app/', image: '/assets/images/screenshots/solitaire_dark.webp' },
                            { title: 'Sphere Audio', url: 'https://sphereaudio.vercel.app/', image: '/assets/images/screenshots/sphere_audio.webp' },
                            { title: 'Particle Ad', url: 'https://particlead.vercel.app/', image: '/assets/images/screenshots/particle_ad.webp' },
                            { title: 'Dimensional Two', url: 'https://dimensional-two.vercel.app/', image: '/assets/images/screenshots/dimensional_two.webp' },
                            { title: 'Wak Two', url: 'https://wak-two.vercel.app/', image: '/assets/images/screenshots/wak_two.webp' },
                            { title: 'Driftpad', url: 'https://driftpad.yxm.digital/', image: '/assets/images/screenshots/driftpad.webp' },
                            { title: 'TAK Network', url: 'https://taknetwork.online/', image: '/assets/images/screenshots/tak_network.webp' },
                            { title: 'YXM Digital', url: 'https://yxm.digital/', image: '/assets/images/screenshots/yxm_digital.webp' },
                            { title: 'PataKazi', url: 'https://www.patakazi.co.ke/', image: '/assets/images/screenshots/patakazi.webp' },
                            { title: 'WallTV', url: 'https://walltv.vercel.app/', image: '/assets/images/screenshots/walltv.webp' },
                            { title: 'OrdaFasta', url: 'https://www.ordafasta.co.ke/', image: '/assets/images/screenshots/ordafasta.webp' },
                            { title: 'FlowClock', url: 'https://flowclock-rose.vercel.app/', image: '/assets/images/screenshots/flowclock.webp' },
                            { title: 'Finder YXM', url: 'https://finder.yxm.digital/', image: '/assets/images/screenshots/finder_yxm.webp' },
                            { title: 'CaptionsMaster', url: 'https://captionsmaster.yxm.digital/', image: '/assets/images/screenshots/captionsmaster.webp' }
                        ].map((site, index) => (
                            <motion.a
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                className="group relative rounded-3xl overflow-hidden border border-white/5 hover:border-primary/40 bg-neutral-dark/80 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(191,255,0,0.05)]"
                            >
                                <div className="aspect-[16/10] overflow-hidden bg-neutral-black relative">
                                    <img
                                        src={site.image}
                                        alt={site.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'https://placehold.co/600x400/1a1a1a/FFF?text=' + encodeURIComponent(site.title);
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-black via-transparent to-transparent opacity-85" />
                                </div>

                                <div className="p-6 relative">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                                        {site.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-widest group-hover:text-primary transition-colors duration-300">
                                        <span>Explore Project</span>
                                        <i className="fas fa-external-link-alt text-[10px]"></i>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <MediaModal
                isOpen={!!selectedMedia}
                onClose={() => setSelectedMedia(null)}
                src={selectedMedia?.src || ''}
                title={selectedMedia?.title || ''}
                type={selectedMedia?.type || 'image'}
            />
        </div>
    );
};

export default Work;
