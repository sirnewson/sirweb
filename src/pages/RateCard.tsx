import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';

const getPriceDisplay = (value: string | number) => {
    let numericValue = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value;
    const usdValue = Math.round(numericValue / 100);
    return {
        kes: new Intl.NumberFormat('en-KE').format(numericValue),
        usd: new Intl.NumberFormat('en-US').format(usdValue)
    };
};

const PricingCard = ({ pkg, onSelect }: { pkg: any, onSelect: () => void }) => {
    const display = getPriceDisplay(pkg.price);

    return (
        <div className={`relative bg-neutral-medium rounded-3xl p-8 border transition-all duration-300 group hover:-translate-y-2 ${pkg.highlight ? 'border-primary shadow-[0_0_30px_rgba(191,255,0,0.1)]' : 'border-white/5 hover:border-white/20'}`}>
            {pkg.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">{pkg.badge || 'Recommended'}</div>}

            <div className="mb-6">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{pkg.slot}</span>
                <h3 className="text-2xl font-bold text-white mt-2">{pkg.title}</h3>
            </div>

            <div className="mb-8 pb-8 border-b border-white/5">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-primary">{display.kes}</span>
                    <span className="text-sm text-white/40">KES {pkg.period}</span>
                </div>
                <div className="text-white/40 font-medium mt-1">${display.usd} USD {pkg.period}</div>
                <p className="text-white/60 text-sm mt-4 leading-relaxed">{pkg.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
                {pkg.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                        <i className={`fas fa-check mt-1 ${pkg.highlight ? 'text-primary' : 'text-white/40'}`}></i>
                        <span className="leading-snug">{feature}</span>
                    </li>
                ))}
            </ul>

            <button
                onClick={onSelect}
                className={`w-full py-4 rounded-xl font-bold transition-all ${pkg.highlight ? 'bg-primary text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-white hover:text-black'}`}
            >
                Select Package
            </button>
        </div>
    );
};

const RateCard = () => {
    const [activeTab, setActiveTab] = useState<'branding' | 'website' | 'social'>('social');
    const [isEcommerce, setIsEcommerce] = useState(false);

    const handleWhatsAppClick = (message: string) => {
        const phoneNumber = "254702480771";
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    const brandingPackages = [
        {
            slot: "Slot 1",
            title: "Basic Identity",
            price: "22,500",
            description: "Perfect for a clean starting point.",
            highlight: false,
            features: ["Logo Only", "3 Logo Variations", "2 Revision Round", "High-resolution files", "Light/dark versions"]
        },
        {
            slot: "Slot 2",
            title: "Standard Identity",
            price: "52,500",
            description: "Consistency for daily posts and in-store marketing.",
            highlight: false,
            features: ["Logo + Core Brand Kit", "4 Logo Variations & Primary Logo", "1 Alternate Logo", "Color Palette & Typography", "Icon style guide", "2 Revision rounds"]
        },
        {
            slot: "Slot 3",
            title: "Full Brand Identity",
            price: "90,000",
            description: "Strong identity for scaling and multiple departments.",
            highlight: true,
            badge: "Recommended",
            features: ["Extended Identity System", "6 Logo Variations", "Primary + Alternate + Submark", "Extended Color Palette", "Pattern Library & Typography", "Storefront & poster mockups", "3 Revision rounds"]
        },
        {
            slot: "Slot 4",
            title: "Premium Suite",
            price: "150,000",
            description: "The ultimate full identity + a modern online profile.",
            highlight: false,
            features: ["Complete Identity + Online Presence", "8 Logo Variations", "Full Extended Palette & Patterns", "Flyers & Poster templates", "Packaging mockups", "Full Brand Guidelines", "3-Page Website Included"]
        }
    ];

    const websitePackages = [
        {
            slot: "Slot 1",
            title: "Starter Website",
            basePrice: 37500,
            description: "Simple, clean online presence.",
            pages: "3 Pages",
            layout: "1 Layout Variation",
            features: ["WhatsApp Direct Chat Button", "Mobile responsive", "Basic SEO"]
        },
        {
            slot: "Slot 2",
            title: "Business Website",
            basePrice: 67500,
            description: "Great for supermarkets showing deals + categories.",
            pages: "5 Pages",
            layout: "2 Layout Variations",
            features: ["WhatsApp Direct Chat Button", "Product Display (no checkout)", "Mobile responsive", "Basic SEO"]
        },
        {
            slot: "Slot 3",
            title: "Advanced Website",
            basePrice: 112500,
            description: "For bigger stores that need structure and clarity.",
            highlight: true,
            badge: "Best Value",
            pages: "6 to 8 Pages",
            layout: "3 Layout Variations",
            features: ["WhatsApp Enquiry System", "Product listing sections", "Category highlights", "Mobile responsive", "Basic SEO"]
        },
        {
            slot: "Slot 4",
            title: "Corporate Website",
            basePrice: 150000,
            description: "Perfect for supermarkets with many departments.",
            pages: "8 to 10 Pages",
            layout: "4 Layout Variations",
            features: ["WhatsApp Direct CTA", "Offers pages & Category structure", "Search & filters (display only)", "SEO + Metadata setup", "Mobile responsive"]
        }
    ];

    const socialMediaPackages = [
        {
            slot: "Slot 1",
            title: "Steady Visibility",
            price: "75,000",
            period: "/mo",
            description: "Good for brands testing consistent creative flow.",
            highlight: false,
            features: ["15-20 Social Media Posts", "3 Reels", "Ideal for weekly promotions", "Price drops & timely updates", "Consistent visibility"]
        },
        {
            slot: "Slot 2",
            title: "Frequent Campaigns",
            price: "127,500",
            period: "/mo",
            description: "Balanced, reliable, and high-value for regular campaigns.",
            highlight: false,
            features: ["25 to 35 Social Media Posts", "4 Reels", "Category highlights", "Special offers & seasonal pushes", "Ongoing promotion coverage"]
        },
        {
            slot: "Slot 3",
            title: "Heavy Activity",
            price: "180,000",
            period: "/mo",
            description: "This slot gives you a full creative department without hiring one.",
            highlight: true,
            badge: "Most Favourable",
            features: ["40 to 60 Social Media Posts", "6 Reels", "Full creative support", "Daily offers & Weekly deals", "Marketing campaigns & In-store highlights"]
        }
    ];

    return (
        <div className="bg-neutral-black min-h-screen">
            <SEO
                title="Pricing & Rate Card | Branding, Websites & Social Media | Sir Newson"
                description="Transparent pricing for brand identity, website design and social media creative packages in Kenya. Clear slots, clear deliverables, clear timelines."
                keywords="branding prices Kenya, website design cost Kenya, social media management pricing Nairobi, logo design price Kenya, creative rate card Kenya"
                path="/rate-card"
            />
            <PageTransition>
                <Navbar />

                {/* Header */}
                <div className="pt-40 pb-20 px-6 text-center bg-neutral-dark border-b border-white/10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Service Rate Card</h1>
                        <p className="text-white/60 text-xl max-w-2xl mx-auto">
                            Clear slots, clear deliverables, clear timelines. Pick what you need made ready and we start from there.
                        </p>
                    </motion.div>
                </div>

                {/* Services Grid */}
                <section className="py-24 px-6 bg-neutral-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Creative Direction", icon: "fas fa-bullseye", desc: "Leading creative vision from concept to execution with strategic storytelling.", tags: ["Strategy", "Art Direction", "Storytelling"] },
                                { title: "Design & Identity", icon: "fas fa-palette", desc: "Crafting distinct visual identities that resonate and endure.", tags: ["Branding", "UI/UX", "Motion"] },
                                { title: "AI & Tech Integration", icon: "fas fa-bolt", desc: "Leveraging advanced technology for automated and predictive workflows.", tags: ["AI Gen", "Automation", "Analytics"] }
                            ].map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-neutral-medium p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary text-xl mb-6 group-hover:scale-110 transition-transform">
                                        <i className={service.icon}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                    <p className="text-white/60 text-sm mb-6 leading-relaxed">{service.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {service.tags.map((tag, i) => (
                                            <span key={i} className="text-xs bg-black/20 text-white/40 px-3 py-1 rounded-full border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tabs */}
                <div className="sticky top-20 z-30 bg-neutral-black/80 backdrop-blur-xl py-6 border-y border-white/10">
                    <div className="max-w-7xl mx-auto px-6 flex justify-center gap-4 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'branding', label: 'Brand Identity', icon: 'fas fa-palette' },
                            { id: 'website', label: 'Web Packages', icon: 'fas fa-globe' },
                            { id: 'social', label: 'Social Media', icon: 'fas fa-share-alt' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-primary text-black shadow-[0_0_20px_rgba(191,255,0,0.4)] scale-105'
                                        : 'bg-neutral-medium text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <i className={tab.icon}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-6 py-16 min-h-[600px]">
                    {/* E-Commerce Toggle */}
                    {activeTab === 'website' && (
                        <div className="flex justify-center mb-12">
                            <div className="bg-neutral-medium border border-white/10 p-2 rounded-2xl flex items-center gap-4 relative">
                                <button
                                    onClick={() => setIsEcommerce(false)}
                                    className={`px-6 py-3 rounded-xl font-bold transition-all ${!isEcommerce ? 'bg-white/10 text-white' : 'text-white/40'}`}
                                >
                                    Standard
                                </button>
                                <button
                                    onClick={() => setIsEcommerce(true)}
                                    className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${isEcommerce ? 'bg-green-500 text-black shadow-lg' : 'text-white/40'}`}
                                >
                                    E-Commerce <i className="fas fa-shopping-cart"></i>
                                </button>
                            </div>
                        </div>
                    )}

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab + (isEcommerce ? '-ecom' : '')}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`grid grid-cols-1 ${activeTab === 'social' ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`}
                        >
                            {activeTab === 'branding' && brandingPackages.map((pkg, index) => (
                                <PricingCard key={index} pkg={pkg} onSelect={() => handleWhatsAppClick(`Hi, I'm interested in the ${pkg.title} package.`)} />
                            ))}

                            {activeTab === 'social' && socialMediaPackages.map((pkg, index) => (
                                <PricingCard key={index} pkg={pkg} onSelect={() => handleWhatsAppClick(`Hi, I'm interested in the ${pkg.title} Social Media plan.`)} />
                            ))}

                            {activeTab === 'website' && websitePackages.map((pkg, index) => {
                                const price = isEcommerce ? pkg.basePrice * 2 : pkg.basePrice;
                                const display = getPriceDisplay(price);
                                return (
                                    <div key={index} className={`relative bg-neutral-medium rounded-3xl p-8 border transition-all duration-300 group hover:-translate-y-2 ${pkg.highlight ? 'border-primary shadow-[0_0_30px_rgba(191,255,0,0.1)]' : 'border-white/5 hover:border-white/20'}`}>
                                        {pkg.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">Best Value</div>}

                                        <div className="mb-6">
                                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{pkg.slot}</span>
                                            <h3 className="text-2xl font-bold text-white mt-2 mb-1">{pkg.title}</h3>
                                            {isEcommerce && <span className="text-green-400 text-sm font-bold">with E-Commerce</span>}
                                        </div>

                                        <div className="mb-8 pb-8 border-b border-white/5">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-bold text-primary">{display.kes}</span>
                                                <span className="text-sm text-white/40">KES</span>
                                            </div>
                                            <div className="text-white/40 font-medium mt-1">${display.usd} USD</div>
                                            <p className="text-white/60 text-sm mt-4 leading-relaxed">{pkg.description}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <div className="bg-black/20 p-3 rounded-xl text-center border border-white/5">
                                                <i className="fas fa-layer-group text-primary mb-2"></i>
                                                <div className="text-xs text-white/60 font-bold">{pkg.pages}</div>
                                            </div>
                                            <div className="bg-black/20 p-3 rounded-xl text-center border border-white/5">
                                                <i className="fas fa-mobile-alt text-primary mb-2"></i>
                                                <div className="text-xs text-white/60 font-bold">{pkg.layout}</div>
                                            </div>
                                        </div>

                                        <ul className="space-y-4 mb-8">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                                                    <i className="fas fa-check text-primary mt-1"></i>
                                                    <span className="leading-snug">{feature}</span>
                                                </li>
                                            ))}
                                            {isEcommerce && (
                                                <>
                                                    <li className="border-t border-dashed border-white/10 my-2"></li>
                                                    {["WhatsApp Checkout", "Product Catalog", "Order Management", "Discount System"].map((f, i) => (
                                                        <li key={`e-${i}`} className="flex items-start gap-3 text-sm text-green-400 font-medium">
                                                            <i className="fas fa-check mt-1"></i>
                                                            <span className="leading-snug">{f}</span>
                                                        </li>
                                                    ))}
                                                </>
                                            )}
                                        </ul>

                                        <button
                                            onClick={() => handleWhatsAppClick(isEcommerce ? `Hi, I'm interested in the ${pkg.title} (E-Commerce) package.` : `Hi, I'm interested in the ${pkg.title} package.`)}
                                            className={`w-full py-4 rounded-xl font-bold transition-all ${pkg.highlight ? 'bg-primary text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-white hover:text-black'}`}
                                        >
                                            {isEcommerce ? 'Get E-Commerce' : 'Get Website'}
                                        </button>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <Footer />
            </PageTransition>
        </div>
    );
};

export default RateCard;
