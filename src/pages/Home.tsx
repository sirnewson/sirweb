import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import MediaModal from '../components/MediaModal';
import Footer from '../components/Footer';

interface PinItem {
    id: string;
    type: 'image';
    category: string;
    title: string;
    image: string;
    link?: string;
    url?: string;
}

interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
}

const Home = () => {
    useEffect(() => {
        document.title = "Sir Newson | Pinterest Feed & Broadcasts";
    }, []);

    const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string; type: 'image' | 'video' } | null>(null);
    const [savedPins, setSavedPins] = useState<Record<string, boolean>>(() => {
        const saved = localStorage.getItem('sirnewson_saved_pins');
        return saved ? JSON.parse(saved) : {};
    });
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    
    // YouTube player state
    const [activeVideoId, setActiveVideoId] = useState<string>('BI2zz9eCN24');

    // AI Consultation state & configuration
    const aiIndustries = [
        {
            id: 'ecommerce',
            label: 'E-Commerce & Retail',
            icon: 'fas fa-shopping-bag',
            application: 'Hyper-personalized recommendation engines, generative product descriptions, AI-driven stock forecasting, and automated customer success agents.',
            benefit: 'Up to 35% increase in conversion rates, 24/7 automated support, and optimized inventory reducing storage costs.',
            whatsappText: "Yo Sir Newson! ⚡ I want to consult on implementing custom AI agents in E-Commerce to boost conversions and automate support. Let's design this! 🚀"
        },
        {
            id: 'fintech',
            label: 'FinTech & Banking',
            icon: 'fas fa-chart-line',
            application: 'Automated fraud detection models, AI risk assessment scoring, natural language interfaces for financial portfolios, and automated document verification.',
            benefit: '99% reduction in processing time, enhanced security, and real-time customized insights for investors.',
            whatsappText: "Yo Sir Newson! ⚡ I want to talk AI Consultation for FinTech. Let's look at automating data processing and building smart verification pipelines! 🚀"
        },
        {
            id: 'creative',
            label: 'Creative Agencies',
            icon: 'fas fa-palette',
            application: 'Automated asset generation pipelines, generative brand style-guide validation, AI-guided copy and layout drafting, and hyper-personalized campaign ideation.',
            benefit: '10x faster brainstorming-to-delivery loops, zero asset bottlenecks, and hyper-targeted marketing assets.',
            whatsappText: "Hey Sir! ⚡ I'm running a Creative Agency and want to implement custom generative pipelines and asset validators. Let's get this set up! 🚀🎨"
        },
        {
            id: 'saas',
            label: 'SaaS & Software',
            icon: 'fas fa-laptop-code',
            application: 'Predictive user-churn modeling, AI-powered feature recommendation, automated code documentation generation, and intelligent onboarding assistants.',
            benefit: 'Lower churn, accelerated onboarding cycles, and developers freed from manual documentation tasks.',
            whatsappText: "Yo Sir Newson! ⚡ I want to consult on integrating AI systems and user-churn models into my SaaS. Let's sync up! 🚀💻"
        },
        {
            id: 'marketing',
            label: 'Marketing & Ads',
            icon: 'fas fa-bullhorn',
            application: 'Automated ad variant generation, generative copywriting, dynamic campaign performance forecasting, and audience sentiment analysis.',
            benefit: '5x higher CTR through personalization, real-time ad budget optimization, and instant creative iteration.',
            whatsappText: "Hey Sir! ⚡ Let's brainstorm custom AI ad generators and sentiment analysis systems for our marketing campaigns! 🚀🔥"
        },
        {
            id: 'custom',
            label: 'Custom Field...',
            icon: 'fas fa-magic',
            application: "Let's brainstorm a custom AI system for your specific field! I'll build custom prompt pipelines, autonomous agent groups, or automated workflows.",
            benefit: 'Tailored solutions built specifically to automate your unique bottlenecks and scale your specific operations.',
            whatsappText: "Yo Sir Newson! ⚡ I want to consult on custom AI integration for my business. Let's design a personalized solution! 🚀"
        }
    ];

    const [selectedIndustry, setSelectedIndustry] = useState(aiIndustries[0].id);
    const [customField, setCustomField] = useState('');

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
        showToast(isSaved ? "Pin removed from your board" : "Saved to your Pinterest board!");
    };

    const handleShare = (title: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const pinId = getPinId(title);
        navigator.clipboard.writeText(`${window.location.origin}/#pin-${pinId}`);
        showToast("Link to this pin copied!");
    };

    // Dynamically query files inside `/public/uploads/` via Vite's import.meta.glob recursively
    const globBranding = import.meta.glob('/public/uploads/branding/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
    const globGraphics = import.meta.glob('/public/uploads/graphics/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });

    // Map globbed branding files to PinItem format
    const uploadedBranding = Object.entries(globBranding).map(([filePath, module]: [string, any]) => {
        const url = typeof module === 'string' ? module : (module?.default || filePath.replace(/^\/public/, ''));
        const filename = filePath.split('/').pop() || 'Untitled';
        const cleanName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
        const id = 'brand-' + filename.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[^a-z0-9]/g, '-');
        const isLogo = filename.toLowerCase().includes('logo');
        return {
            id,
            type: 'image' as const,
            category: isLogo ? 'LOGO DESIGN' : 'BRANDING',
            title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
            image: url,
            link: '/work'
        };
    });

    // Map globbed graphics files to PinItem format
    const uploadedGraphics = Object.entries(globGraphics).map(([filePath, module]: [string, any]) => {
        const url = typeof module === 'string' ? module : (module?.default || filePath.replace(/^\/public/, ''));
        const filename = filePath.split('/').pop() || 'Untitled';
        const cleanName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
        const id = 'graphic-' + filename.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[^a-z0-9]/g, '-');
        return {
            id,
            type: 'image' as const,
            category: 'CAMPAIGN',
            title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
            image: url,
            link: '/work'
        };
    });

    // Keep only image gallery assets in the main Pinterest feed
    const pins: PinItem[] = [
        ...uploadedBranding,
        ...uploadedGraphics,
        // AI Systems (using generated tech assets)
        {
            id: 'ai-agent-orchestrator',
            type: 'image',
            category: 'AI SYSTEMS',
            title: 'Autonomous Agent Orchestrator',
            image: '/assets/images/recent_images/ai_agent_orchestrator.png',
            link: '/work',
            url: 'https://captionsmaster.yxm.digital/'
        },
        {
            id: 'ai-prompt-pipeline',
            type: 'image',
            category: 'AI SYSTEMS',
            title: 'AI Prompt Pipeline & Analytics',
            image: '/assets/images/recent_images/ai_prompt_pipeline.png',
            link: '/work',
            url: 'https://finder.yxm.digital/'
        },
        {
            id: 'generative-branding-engine',
            type: 'image',
            category: 'AI SYSTEMS',
            title: 'Generative Branding Engine UI',
            image: '/assets/images/recent_images/generative_branding_engine.png',
            link: '/work'
        },
        // Branding Systems (with Live URLs)
        {
            id: 'funcity-branding',
            type: 'image',
            category: 'BRANDING',
            title: 'Funcity Brand Identity',
            image: '/assets/images/FUNCITY-JAMHURI_290cbccf.webp',
            link: '/work',
            url: 'https://funcity.sirnewson.com/'
        },
        {
            id: 'tenacity-branding',
            type: 'image',
            category: 'BRANDING',
            title: 'Tenacity Locks Brand System',
            image: '/assets/images/tenacity-post_5bf44744.webp',
            link: '/work',
            url: 'https://tenacity.sirnewson.com/'
        },
        {
            id: 'zunguka-branding',
            type: 'image',
            category: 'BRANDING',
            title: 'Zunguka Safaris Brand Identity',
            image: '/assets/images/zunguka-africa-safaris-1693228445-3179353094683146095-8643391881_0f1a67c7.webp',
            link: '/work',
            url: 'https://zunguka.sirnewson.com/'
        },
        // Logo Design Board
        {
            id: 'primary-brand-logo',
            type: 'image',
            category: 'LOGO DESIGN',
            title: 'Primary Brand Logo',
            image: '/assets/images/branding/logo.webp',
            link: '/work'
        },
        {
            id: 'brand-signature-board',
            type: 'image',
            category: 'LOGO DESIGN',
            title: 'Brand Signature Board',
            image: '/assets/images/branding/main logo oon yellow.webp',
            link: '/work'
        },
        {
            id: 'visual-logo-system',
            type: 'image',
            category: 'LOGO DESIGN',
            title: 'Visual Logo System',
            image: '/assets/images/LOGOOS_3f0a96b1.webp',
            link: '/work'
        },

        // Product Design (using custom layout/system assets)
        {
            id: 'visuals-eta',
            type: 'image',
            category: 'PRODUCT DESIGN',
            title: 'Visuals Eta Design System',
            image: '/assets/images/screenshots/visuals_eta.webp',
            link: '/work'
        },
        {
            id: 'sphere-audio',
            type: 'image',
            category: 'PRODUCT DESIGN',
            title: 'Sphere Audio Space',
            image: '/assets/images/screenshots/sphere_audio.webp',
            link: '/work'
        },
        {
            id: 'flowclock',
            type: 'image',
            category: 'PRODUCT DESIGN',
            title: 'FlowClock Minimal Timer',
            image: '/assets/images/screenshots/flowclock.webp',
            link: '/work'
        },
        {
            id: 'captionsmaster',
            type: 'image',
            category: 'PRODUCT DESIGN',
            title: 'CaptionsMaster Editor Interface',
            image: '/assets/images/screenshots/captionsmaster.webp',
            link: '/work'
        },

        // Web Systems (using high performance screen captures)
        {
            id: 'driftpad',
            type: 'image',
            category: 'WEB SYSTEMS',
            title: 'Driftpad Notes App',
            image: '/assets/images/screenshots/driftpad.webp',
            link: '/work'
        },
        {
            id: 'yxm-digital',
            type: 'image',
            category: 'WEB SYSTEMS',
            title: 'YXM Digital Client Hub',
            image: '/assets/images/screenshots/yxm_digital.webp',
            link: '/work'
        },
        {
            id: 'ordafasta',
            type: 'image',
            category: 'WEB SYSTEMS',
            title: 'OrdaFasta Merchant Dashboard',
            image: '/assets/images/screenshots/ordafasta.webp',
            link: '/work'
        },
        {
            id: 'patakazi',
            type: 'image',
            category: 'WEB SYSTEMS',
            title: 'PataKazi Job Platform',
            image: '/assets/images/screenshots/patakazi.webp',
            link: '/work'
        },

        // Marketing Direction
        {
            id: 'dosage',
            type: 'image',
            category: 'MARKETING DIRECTION',
            title: 'Saturday Dosage Season 4',
            image: '/assets/images/recent_work_saturday_dosage_wide.webp',
            link: '/work'
        },
        {
            id: 'njugush-post',
            type: 'image',
            category: 'MARKETING DIRECTION',
            title: 'Njugush Celebration Post',
            image: '/assets/images/recent_images/njugush-3m-post.webp',
            link: '/work'
        },
        {
            id: 'cleanshelf',
            type: 'image',
            category: 'MARKETING DIRECTION',
            title: 'Cleanshelf Campaign Strategy',
            image: '/assets/images/cleanshelf-concept-3_3b0dacbc.webp',
            link: '/work'
        },
        {
            id: 'amber-ray',
            type: 'image',
            category: 'MARKETING DIRECTION',
            title: 'Amber Ray Brand Campaign',
            image: '/assets/images/AMBER-RAY_dd19587e.webp',
            link: '/work'
        },

        // Standard disciplines / branding & campaign
        {
            id: 'cinemax',
            type: 'image',
            category: 'BRANDING',
            title: 'Cinemax Brand System',
            image: '/assets/images/recent_work_gikonyore.webp',
            link: '/work'
        },
        {
            id: 'wild-idea',
            type: 'image',
            category: 'IDEAS',
            title: 'Wild Idea Board',
            image: '/assets/images/recent_images/wild-idea.webp',
            link: '/work'
        },
        {
            id: 'silver',
            type: 'image',
            category: 'PRODUCT DESIGN',
            title: 'Silver Design Layout',
            image: '/assets/images/recent_images/silver.webp',
            link: '/work'
        },
        {
            id: 'countrywide',
            type: 'image',
            category: 'BRANDING',
            title: 'Countrywide Asset Board',
            image: '/assets/images/recent_images/countrywide-1.webp',
            link: '/work'
        },
        {
            id: 'profilee',
            type: 'image',
            category: 'PORTRAIT',
            title: 'Editorial Identity Portrait',
            image: '/assets/images/recent_images/profilee.webp',
            link: '/work'
        },
        {
            id: 'fun-concept',
            type: 'image',
            category: 'PRODUCT DESIGN',
            title: 'Fun Grid Experiment',
            image: '/assets/images/recent_images/fun-concept.webp',
            link: '/work'
        },
        {
            id: 'dibul',
            type: 'image',
            category: 'BRANDING',
            title: 'DJ Dibul Brand Identity',
            image: '/assets/images/recent_work_dj_dibul_wide.webp',
            link: '/work'
        },
        {
            id: 'youtube-comp',
            type: 'image',
            category: 'WEB SYSTEMS',
            title: 'YouTube Frame Composition',
            image: '/assets/images/recent_images/youytubeee.webp',
            link: '/work'
        },
        {
            id: 'vault',
            type: 'image',
            category: 'PRODUCT DESIGN',
            title: 'Midnight Poetry Layout',
            image: '/assets/images/recent_work_midnight_poetry.webp',
            link: '/work'
        },
        {
            id: 'cartoon-char',
            type: 'image',
            category: 'ART',
            title: 'Character Graphic Module',
            image: '/assets/images/recent_images/cartoon.webp',
            link: '/work'
        },
        {
            id: 'post-file',
            type: 'image',
            category: 'PRODUCT DESIGN',
            title: 'Visual Style Framework',
            image: '/assets/images/recent_images/post-file.webp',
            link: '/work'
        },
        {
            id: 'mkurugenzi-women',
            type: 'image',
            category: 'BRANDING',
            title: 'Mkurugenzi Hoodies Apparel (Women)',
            image: '/assets/images/recent_work_mkurugenzi_hoodies_women.webp',
            link: '/work'
        },
        {
            id: 'partners',
            type: 'image',
            category: 'MARKETING DIRECTION',
            title: 'Creative Collaboration System',
            image: '/assets/images/5_7349e0ec.webp',
            link: '/contact'
        }
    ];

    // YouTube playlist details
    const youtubeVideos: YouTubeVideo[] = [
        {
            id: 'BI2zz9eCN24',
            title: 'Drift Into the Worlds | Amazing Beautiful 4K',
            description: 'A deep ambient journey exploring visual landscapes, digital worlds, and cinematic soundscapes.',
            duration: '10:04',
            thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'zItfazfkJgw',
            title: 'Identity & Creative Direction Showcase',
            description: 'Selected clips of visual systems, brand strategy breakdowns, and digital art processes.',
            duration: '04:15',
            thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'Pvg8a_YpldA',
            title: 'Drift Ambient Soundscapes & Systems',
            description: 'Extended coding session soundscapes designed for creative productivity and workflow rhythm.',
            duration: '55:20',
            thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'rFZ8qKCX2FY',
            title: 'Branding Systems Workflow Masterclass',
            description: 'Step-by-step walkthrough of turning concepts into production-ready digital assets.',
            duration: '12:30',
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
        }
    ];

    const currentActiveVideo = youtubeVideos.find(v => v.id === activeVideoId) || youtubeVideos[0];

    return (
        <div className="bg-neutral-black min-h-screen text-white relative overflow-hidden font-sans bg-hexagon-grid">
            
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

            {/* Reusable Header Hero */}
            <Hero />

            {/* Board Filters / Stats */}
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 border-t border-white/5 pt-8 mb-12 text-xs font-bold text-white/50 tracking-wider uppercase px-4">
                <span className="text-white border-b-2 border-primary pb-1">All Pins</span>
                <span>•</span>
                <span>{pins.length} Projects</span>
            </div>

            {/* Pinterest Masonry Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-24">
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                    {pins.map((pin) => (
                        <motion.div
                            key={pin.id}
                            id={`pin-${getPinId(pin.title)}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="break-inside-avoid relative rounded-[24px] overflow-hidden group bg-neutral-dark border border-white/5 hover:border-white/15 transition-all duration-300 cursor-zoom-in"
                            onClick={() => setSelectedMedia({ src: pin.image, title: pin.title, type: 'image' })}
                        >
                            <img
                                src={pin.image}
                                alt={pin.title}
                                loading="lazy"
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/600x800/101010/FFF?text=${pin.category}`;
                                }}
                            />
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 z-10">
                                <div className="flex justify-between items-start w-full">
                                    <span className="px-2.5 py-1 rounded-full bg-black/60 text-[9px] font-bold text-white/80 tracking-widest uppercase border border-white/5">
                                        {pin.category}
                                    </span>
                                    <button
                                        onClick={(e) => handleSave(pin.title, e)}
                                        className={`px-4 py-2 rounded-full font-bold text-xs shadow-md transition-all ${
                                            savedPins[getPinId(pin.title)] ? 'bg-white text-black' : 'bg-primary text-black hover:bg-white'
                                        }`}
                                    >
                                        {savedPins[getPinId(pin.title)] ? 'Saved' : 'Save'}
                                    </button>
                                </div>

                                <div className="flex justify-between items-center w-full">
                                    <span className="font-display font-extrabold text-sm text-white truncate pr-4">
                                        {pin.title}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {pin.url && (
                                            <a 
                                                href={pin.url} 
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
                                            onClick={(e) => handleShare(pin.title, e)}
                                            className="w-8 h-8 rounded-full bg-black/60 hover:bg-white hover:text-black flex items-center justify-center text-xs transition-colors border border-white/5"
                                            title="Share Pin"
                                        >
                                            <i className="fas fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* AI Consultation Section */}
            <section className="py-24 px-4 sm:px-6 md:px-8 border-t border-white/5 relative bg-neutral-black overflow-hidden">
                {/* Visual grid line accents */}
                <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold tracking-widest uppercase border border-primary/20 inline-block mb-4">
                            AI Consulting & System Design
                        </span>
                        <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Leverage Custom AI Systems.
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
                            I architect autonomous AI agents, prompt pipelines, and custom intelligence layers that integrate into your specific business workflow to automate operations and drive scale.
                        </p>
                    </div>

                    {/* Interactive Widget Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Selector Tabs (Left Col) */}
                        <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
                            <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1 px-2">
                                Select Your Domain
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                                {aiIndustries.map((ind) => {
                                    const isActive = selectedIndustry === ind.id;
                                    return (
                                        <button
                                            key={ind.id}
                                            onClick={() => setSelectedIndustry(ind.id)}
                                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(191,255,0,0.2)]'
                                                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-white/10 text-white/70 hover:text-white'
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${
                                                isActive ? 'bg-black text-primary' : 'bg-white/5 text-white/60'
                                            }`}>
                                                <i className={ind.icon} />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                {ind.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Interactive Screen Display (Right Col) */}
                        <div className="lg:col-span-7 flex flex-col">
                            <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500 shadow-2xl">
                                {/* Glass shine overlay */}
                                <div className="absolute -inset-y-12 -inset-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />

                                <div>
                                    {/* Display Header */}
                                    <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                                                Active Blueprint
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-bold text-white/30 tracking-wider">
                                            SIR // CONSULT
                                        </span>
                                    </div>

                                    {/* Tab Content Display */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={selectedIndustry}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-8"
                                        >
                                            {selectedIndustry === 'custom' ? (
                                                <div className="space-y-4">
                                                    <h3 className="font-display font-black text-2xl md:text-3xl text-white">
                                                        Tailored AI Blueprint
                                                    </h3>
                                                    <p className="text-white/60 text-sm leading-relaxed">
                                                        No pre-built solution matches your workflow? Let's design a custom AI system from the ground up to solve your exact bottlenecks.
                                                    </p>
                                                    <div className="relative mt-4">
                                                        <input
                                                            type="text"
                                                            value={customField}
                                                            onChange={(e) => setCustomField(e.target.value)}
                                                            placeholder="Type your industry or field (e.g. EdTech, Law, Fitness)..."
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    <h3 className="font-display font-black text-2xl md:text-3xl text-white">
                                                        {aiIndustries.find(ind => ind.id === selectedIndustry)?.label}
                                                    </h3>
                                                    
                                                    {/* Applications Details */}
                                                    <div className="space-y-2">
                                                        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400">
                                                            Core Applications
                                                        </span>
                                                        <p className="text-white/80 text-sm md:text-base leading-relaxed">
                                                            {aiIndustries.find(ind => ind.id === selectedIndustry)?.application}
                                                        </p>
                                                    </div>

                                                    {/* Benefits Details */}
                                                    <div className="space-y-2">
                                                        <span className="text-[10px] font-bold tracking-widest uppercase text-primary">
                                                            Business Value & ROI
                                                        </span>
                                                        <p className="text-white/80 text-sm md:text-base leading-relaxed">
                                                            {aiIndustries.find(ind => ind.id === selectedIndustry)?.benefit}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Booking CTA action */}
                                <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-left">
                                        <h5 className="text-[10px] text-white/40 uppercase font-bold tracking-wider">
                                            Ready to automate?
                                        </h5>
                                        <p className="text-xs text-white/70">
                                            Direct channel to Sir Newson
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const currentInd = aiIndustries.find(ind => ind.id === selectedIndustry);
                                            let textMessage = currentInd?.whatsappText || '';
                                            if (selectedIndustry === 'custom' && customField.trim()) {
                                                textMessage = `Yo Sir Newson! ⚡ I want to consult on custom AI integration for my field: ${customField.trim()}. Let's design a personalized solution! 🚀`;
                                            }
                                            const url = `https://wa.me/254702480771?text=${encodeURIComponent(textMessage)}`;
                                            window.open(url, '_blank');
                                        }}
                                        className="px-6 py-4 rounded-2xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-3 hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(191,255,0,0.15)]"
                                    >
                                        <i className="fab fa-whatsapp text-sm" />
                                        Consult on {selectedIndustry === 'custom' && customField.trim() ? customField.trim() : (aiIndustries.find(ind => ind.id === selectedIndustry)?.label.split(' & ')[0].split('...')[0])} 🚀
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* YouTube Broadcast Room Section */}
            <section className="bg-neutral-dark border-t border-white/5 py-24 px-4 sm:px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* YouTube Banner Header Card */}
                    <div className="relative rounded-[24px] overflow-hidden border border-white/5 mb-16 shadow-2xl">
                        {/* Channel Banner Background */}
                        <div className="h-48 md:h-64 w-full relative">
                            <div className="absolute inset-0 bg-black/40 z-10" />
                            <img 
                                src="https://yt3.googleusercontent.com/ItOyqSjhIi2XwGqiiv53uYuJi8BFEbJINDGj-gaJRSHQ261dwjtxdyVlHklXdwTY-HjMgo6G=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" 
                                alt="Sir Newson YouTube Channel Art"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>

                        {/* Channel Header Meta */}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full border-2 border-primary overflow-hidden bg-black flex-shrink-0">
                                    <img 
                                        src="/assets/images/new-logo_e9f3d068.webp" 
                                        alt="Sir Newson Logo" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-display font-extrabold text-xl md:text-2xl text-white">Sir Newson</h3>
                                        <i className="fas fa-check-circle text-primary text-sm" title="Verified Creator" />
                                    </div>
                                    <p className="text-white/60 text-xs mt-1">@sirnewson • 12K+ subscribers • Broadcast & Creative Logs</p>
                                </div>
                            </div>

                            <a 
                                href="https://www.youtube.com/@sirnewson" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                            >
                                <i className="fab fa-youtube text-sm" />
                                Subscribe
                            </a>
                        </div>
                    </div>

                    {/* Interactive Video Player Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left/Middle: Live Broadcast Player Frame */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="relative aspect-video rounded-[24px] overflow-hidden bg-black border border-white/10 shadow-2xl">
                                <iframe 
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0`}
                                    title={currentActiveVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>

                            <div>
                                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-extrabold tracking-widest uppercase border border-red-500/20 inline-block mb-3">
                                    Now Playing
                                </span>
                                <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-tight text-white mb-2">
                                    {currentActiveVideo.title}
                                </h2>
                                <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                                    {currentActiveVideo.description}
                                </p>
                            </div>
                        </div>

                        {/* Right: Broadcast Playlist Column */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <h4 className="font-bold text-sm tracking-wider uppercase text-white/80">Drift Playlist</h4>
                                <span className="text-[10px] font-bold bg-white/5 text-white/50 px-2.5 py-1 rounded-full">
                                    {youtubeVideos.length} Videos
                                </span>
                            </div>

                            <div className="space-y-4">
                                {youtubeVideos.map((video) => (
                                    <div 
                                        key={video.id}
                                        onClick={() => setActiveVideoId(video.id)}
                                        className={`flex gap-4 p-3 rounded-2xl border cursor-pointer transition-all duration-300 ${
                                            activeVideoId === video.id 
                                                ? 'bg-primary/5 border-primary/30' 
                                                : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                                        }`}
                                    >
                                        <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-black">
                                            <img 
                                                src={video.thumbnail} 
                                                alt={video.title}
                                                className="w-full h-full object-cover opacity-80"
                                            />
                                            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-bold text-white/90">
                                                {video.duration}
                                            </div>
                                            {activeVideoId === video.id && (
                                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-black text-[9px]">
                                                        <i className="fas fa-play" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-1 min-w-0">
                                            <h5 className={`text-xs font-bold leading-snug truncate ${
                                                activeVideoId === video.id ? 'text-primary' : 'text-white'
                                            }`}>
                                                {video.title}
                                            </h5>
                                            <p className="text-[10px] text-white/50 line-clamp-2 leading-relaxed">
                                                {video.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Media Expansion Lightbox */}
            <MediaModal
                isOpen={!!selectedMedia}
                onClose={() => setSelectedMedia(null)}
                src={selectedMedia?.src || ''}
                title={selectedMedia?.title || ''}
                type={selectedMedia?.type || 'image'}
            />

            {/* Styled Minimal Footer */}
            <Footer />
        </div>
    );
};

export default Home;
