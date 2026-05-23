import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const Shop = () => {
    const products = [
        {
            id: 29,
            name: "Mood: Happy T-Shirt",
            category: "Mood Collection",
            price: "KES 2,500",
            image: "https://i.ibb.co/yFY2nZPk/MOOD-Happy.png",
            description: "Capturing pure euphoria and positive frequencies. Premium heavy-weight cotton T-Shirt from the exclusive Mood Collection."
        },
        {
            id: 30,
            name: "Mood: Mixed Emotion T-Shirt",
            category: "Mood Collection",
            price: "KES 2,500",
            image: "https://i.ibb.co/spJjXb20/MOOD-Mixed-Emotion.png",
            description: "A complex visual dialogue of overlapping feelings. Premium heavy-weight cotton T-Shirt from the exclusive Mood Collection."
        },
        {
            id: 31,
            name: "Positioning T-Shirt",
            category: "Mood Collection",
            price: "KES 2,500",
            image: "https://i.ibb.co/Wvmj4HKW/positioning.png",
            description: "Finding alignment amidst noise. Premium heavy-weight cotton T-Shirt from the exclusive Mood Collection."
        },
        {
            id: 2,
            name: "Adapt & Overcome",
            category: "Wall Art",
            price: "KES 7,500",
            image: "/assets/images/ADAPT-1_7994f69b.webp",
            description: "High-quality canvas print. Motivational series."
        },
        {
            id: 7,
            name: "Mood Regulation",
            category: "Wall Art",
            price: "KES 12,000",
            image: "/assets/images/MOOD-1_751ad7ea.webp",
            description: "Abstract expressionism on canvas."
        },
        {
            id: 8,
            name: "Vibes & Frequencies",
            category: "Wall Art",
            price: "KES 12,000",
            image: "/assets/images/VIBES-1_4ed18a31.webp",
            description: "Visualizing soundwaves and energy."
        },
        {
            id: 9,
            name: "What Is Reality?",
            category: "Wall Art",
            price: "KES 12,000",
            image: "/assets/images/WHAT_46ee196c.webp",
            description: "Philosophical digital art piece."
        },

        {
            id: 10,
            name: "Abstract Form #01",
            category: "Wall Art",
            price: "KES 12,000",
            image: "/assets/images/1_fdb906f0.webp",
            description: "Minimalist abstract composition."
        },
        {
            id: 11,
            name: "Drift Wallpaper Series",
            category: "Wall Art",
            price: "KES 12,000",
            image: "/assets/images/wallpaper-1_dcc7f5b4.webp",
            description: "Digital landscapes for your physical space."
        },
        {
            id: 12,
            name: "Is Reality Real? - Font",
            category: "Asset",
            price: "Free",
            image: "/assets/images/font_pack_cover.webp",
            description: "Exclusive font pack for designers.",
            link: "https://www.mediafire.com/file/0mlxujfzgvtacr7/SIR_FONTS_%25231.zip/file"
        },
        {
            id: 13,
            name: "High Voltage Action",
            category: "Asset",
            price: "Free",
            image: "/assets/images/action_pack_cover.webp",
            description: "Photoshop actions for high-impact editing.",
            link: "https://www.mediafire.com/file/qwox51omsb0n48m/ACTION.zip/file"
        },
        {
            id: 14,
            name: "Luminous Light Pack",
            category: "Asset",
            price: "Free",
            image: "/assets/images/light_pack_cover.webp",
            description: "Light leaks and overlays.",
            link: "https://www.mediafire.com/file/6rqehpa49180ux4/LIGHT.zip/file"
        },
        {
            id: 15,
            name: "Essential Font Pack #1",
            category: "Asset",
            price: "Free",
            image: "/assets/images/essential_font_pack_cover.webp",
            description: "Curated collection of essential fonts.",
            link: "https://www.mediafire.com/file/0s621gm8b1kwrwq/FONT_PACK_%25231.zip/file"
        },
        {
            id: 16,
            name: "Sir Newson Gradients",
            category: "Asset",
            price: "Free",
            image: "/assets/images/gradients_cover.webp",
            description: "Custom gradient maps for Photoshop.",
            link: "https://www.mediafire.com/file/vhy8n1kmkuu603z/Sir_Newson_Gradients.grd/file"
        },
        {
            id: 17,
            name: "Golden Leo",
            category: "Wall Art",
            price: "KES 15,000",
            image: "/assets/images/wallart_leo.webp",
            description: "Majestic lion portrait with golden accents. A symbol of strength.",
        },
        {
            id: 18,
            name: "Vivid Flows",
            category: "Wall Art",
            price: "KES 15,000",
            image: "/assets/images/wallart_waves.webp",
            description: "Abstract waves of color and texture. Dynamic and bold.",
        },
        {
            id: 19,
            name: "Monochrome Flight",
            category: "Wall Art",
            price: "KES 15,000",
            image: "/assets/images/wallart_butterfly.webp",
            description: "Minimalist black and white butterfly. Elegance in simplicity.",
        },
        {
            id: 20,
            name: "Serene Drive",
            category: "Wall Art",
            price: "KES 15,000",
            image: "/assets/images/wallart_car.webp",
            description: "Vintage aesthetics meeting nature's calm. A peaceful escape.",
        },
        {
            id: 21,
            name: "Zen Tiger",
            category: "Wall Art",
            price: "KES 15,000",
            image: "/assets/images/wallart_tiger.webp",
            description: "Surreal white tiger in meditation. Focusing energy and power.",
        },
        {
            id: 22,
            name: "Earth Unzipped: Sand",
            category: "Wall Art",
            price: "KES 15,000",
            image: "/assets/images/earth_zipper_sand.webp",
            description: "A surreal display of earth unraveling into a sandstorm.",
        },
        {
            id: 23,
            name: "Earth Unzipped: Nature",
            category: "Wall Art",
            price: "KES 15,000",
            image: "/assets/images/earth_zipper_nature.webp",
            description: "The planet unzipped to reveal lush greenery and life.",
        },
        {
            id: 24,
            name: "Earth Unzipped: Ice",
            category: "Wall Art",
            price: "KES 15,000",
            image: "/assets/images/earth_zipper_ice.webp",
            description: "A chilling vision of a frozen core exposed.",
        },
        {
            id: 25,
            name: "Earth Unzipped: Fire",
            category: "Wall Art",
            price: "KES 15,000",
            image: "/assets/images/earth_zipper_fire.webp",
            description: "Smoke and embers escaping from the planetary zipper.",
        },
        {
            id: 26,
            name: "Earth Unzipped: Magma",
            category: "Wall Art",
            price: "KES 7,500",
            image: "/assets/images/earth_zipper_volcano.webp",
            description: "Volcanic fury unleashed from within the earth.",
        },
        {
            id: 27,
            name: "Gravity",
            category: "Wall Art",
            price: "KES 7,500",
            image: "/assets/images/gravity_poster.webp",
            description: "True gravity isn't force. It's presence.",
        },
        {
            id: 28,
            name: "Oceanic Mind",
            category: "Wall Art",
            price: "KES 7,500",
            image: "/assets/images/whale_mind.webp",
            description: "A surreal blend of nature's giants and human thought.",
        }
    ];

    const handleOrder = (product: any) => {
        let message = `Hi Sir Newson, I'm interested in ordering the [ID: ${product.id}] ${product.name} (${product.price}).`;
        
        // Custom fun messages based on product details
        if (product.category === "Mood Collection") {
            if (product.name.includes("Happy")) {
                message = `Yo Sir Newson! ⚡ I am copping the 'Mood: Happy' T-Shirt from the Mood Collection right now! The vibes are absolutely immaculate. Let's get this sorted! 🚀🔥`;
            } else if (product.name.includes("Mixed Emotion")) {
                message = `Yo Sir! 🎨 I'm looking at the Mood Collection and 'Mood: Mixed Emotion' T-Shirt completely speaks to my current aesthetic. How do we get this bad boy shipped to me? Let's make it happen! 💎✨`;
            } else if (product.name.includes("Positioning")) {
                message = `Yo Sir Newson! 📐 'Positioning' T-Shirt is an absolute masterpiece. I've got to have this in my wardrobe right now! Tell me how we lock this in! 🚀🔥`;
            }
        } else if (product.category === "Wall Art") {
            message = `Hey Sir! ⚡ I just saw '${product.name}' (${product.price}) in your shop and it's a total must-have for my wall. How do I order this beauty? Let's get it done! 🎨🔥`;
        } else if (product.price === "Free") {
            message = `Hey Sir Newson! ⚡ I just downloaded the free asset '${product.name}' and wanted to say thank you for sharing such high-value hacks! You're a legend! 🙌✨`;
        }

        const url = `https://wa.me/254702480771?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-neutral-black min-h-screen">
            <Navbar />
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">The Shop</span>}
                subtitle="Curated Goods & Artifacts"
            />


            {/* Promo Banner 1 */}
            <div className="bg-primary py-4 overflow-hidden transform -rotate-1 mb-12">
                <div className="flex justify-center items-center gap-8 text-black font-bold uppercase tracking-widest text-sm md:text-base animate-pulse">
                    <span>Limited Stock Available</span> • <span>Worldwide Shipping</span> • <span>Exclusive Drops</span>
                </div>
            </div>

            <section className="px-6 pb-16 md:pb-24 mt-12 md:mt-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group bg-neutral-medium rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${
                                product.category === 'Mood Collection'
                                    ? 'border-purple-500/20 hover:border-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                                    : 'border-white/5 hover:border-primary/50'
                            }`}
                        >
                            <div className="aspect-[4/5] overflow-hidden relative bg-black/40">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute top-4 right-4 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${
                                    product.category === 'Mood Collection'
                                        ? 'bg-purple-950/80 text-purple-400 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse'
                                        : 'bg-black/80 text-white border-white/5'
                                }`}>
                                    {product.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`text-xl font-bold text-white transition-colors ${
                                        product.category === 'Mood Collection' ? 'group-hover:text-purple-400' : 'group-hover:text-primary'
                                    }`}>{product.name}</h3>
                                    <span className={product.category === 'Mood Collection' ? 'text-purple-400 font-bold' : 'text-primary font-bold'}>{product.price}</span>
                                </div>
                                <p className="text-white/60 text-sm mb-6">{product.description}</p>

                                {product.link ? (
                                    <a
                                        href={product.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 rounded-xl bg-primary text-black font-bold hover:bg-primary/80 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <i className="fas fa-download"></i> Download
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => handleOrder(product)}
                                        className={`w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                                            product.category === 'Mood Collection'
                                                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                                                : 'bg-white/10 text-white hover:bg-primary hover:text-black'
                                        }`}
                                    >
                                        <i className="fab fa-whatsapp"></i> Order Now
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mid Section Banner */}
            <section className="py-16 md:py-24 px-6">
                <div className="max-w-5xl mx-auto bg-neutral-medium border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                            Your Digital Arsenal.
                        </h2>
                        <p className="text-white/60 text-xl font-medium mb-8">
                            Equip yourself with premium creative assets. These assets belong to you.
                        </p>
                        <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_20px_#BFFF004D]">
                            Explore Collection
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Shop;
