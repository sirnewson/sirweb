import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const Shop = () => {
    const products = [
        {
            id: 1,
            name: "Neon Horizon Hoodie",
            category: "Merch",
            price: "KES 4,500",
            image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Neon+Hoodie",
            description: "Premium cotton blend with luminous print."
        },
        {
            id: 2,
            name: "Adapt & Overcome",
            category: "Wall Art",
            price: "KES 12,000",
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
            id: 3,
            name: "Cyber Chair V1",
            category: "Furniture",
            price: "KES 45,000",
            image: "https://via.placeholder.com/600x800/3a3a3a/ffffff?text=Cyber+Chair",
            description: "Ergonomic design with LED accents."
        },
        {
            id: 4,
            name: "Digital Relic #04",
            category: "Artifacts",
            price: "KES 8,000",
            image: "https://via.placeholder.com/600x800/4a4a4a/ffffff?text=Digital+Relic",
            description: "3D printed sculpture in resin."
        },
        {
            id: 5,
            name: "Sir Newson Cap",
            category: "Merch",
            price: "KES 2,000",
            image: "https://via.placeholder.com/600x800/5a5a5a/ffffff?text=Cap",
            description: "Embroidered logo. Adjustable fit."
        },
        {
            id: 6,
            name: "Luxury Desk Mat",
            category: "Accessories",
            price: "KES 3,500",
            image: "https://via.placeholder.com/600x800/6a6a6a/ffffff?text=Desk+Mat",
            description: "Micro-textured surface for precision."
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
            image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Font+Pack",
            description: "Exclusive font pack for designers.",
            link: "https://www.mediafire.com/file/0mlxujfzgvtacr7/SIR_FONTS_%25231.zip/file"
        },
        {
            id: 13,
            name: "High Voltage Action",
            category: "Asset",
            price: "Free",
            image: "https://via.placeholder.com/600x800/2a2a2a/ffffff?text=Action+Pack",
            description: "Photoshop actions for high-impact editing.",
            link: "https://www.mediafire.com/file/qwox51omsb0n48m/ACTION.zip/file"
        },
        {
            id: 14,
            name: "Luminous Light Pack",
            category: "Asset",
            price: "Free",
            image: "https://via.placeholder.com/600x800/3a3a3a/ffffff?text=Light+Effects",
            description: "Light leaks and overlays.",
            link: "https://www.mediafire.com/file/6rqehpa49180ux4/LIGHT.zip/file"
        },
        {
            id: 15,
            name: "Essential Font Pack #1",
            category: "Asset",
            price: "Free",
            image: "https://via.placeholder.com/600x800/4a4a4a/ffffff?text=Font+Pack+1",
            description: "Curated collection of essential fonts.",
            link: "https://www.mediafire.com/file/0s621gm8b1kwrwq/FONT_PACK_%25231.zip/file"
        },
        {
            id: 16,
            name: "Sir Newson Gradients",
            category: "Asset",
            price: "Free",
            image: "https://via.placeholder.com/600x800/5a5a5a/ffffff?text=Gradients",
            description: "Custom gradient maps for Photoshop.",
            link: "https://www.mediafire.com/file/vhy8n1kmkuu603z/Sir_Newson_Gradients.grd/file"
        }
    ];

    const handleOrder = (product: any) => {
        const message = `Hi Sir Newson, I'm interested in ordering the ${product.name} (${product.price}).`;
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

            <section className="px-6 pb-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-neutral-medium rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {product.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{product.name}</h3>
                                    <span className="text-primary font-bold">{product.price}</span>
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
                                        className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
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
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary to-lime-400 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="relative z-10">
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-black mb-6">
                            This isn't just a shop. <br /> It's your inventory.
                        </h2>
                        <p className="text-black/80 text-xl font-medium mb-8">
                            Equip yourself for the new world. These assets belong to you.
                        </p>
                        <button className="px-8 py-3 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform">
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
