import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Shop = () => {
    useEffect(() => {
        document.title = 'Sir Newson Shop | Wall Art, Design Assets & Creative Drops';
    }, []);

    const products = [
        {
            id: 29,
            name: "Mood: Happy T-Shirt",
            category: "Mood Collection",
            price: "KES 2,500",
            image: "https://i.ibb.co/yFY2nZPk/MOOD-Happy.png",
            description: "Capturing pure euphoria and positive frequencies. Premium heavy-weight cotton T-Shirt from the exclusive Mood Collection."
        }
    ];

    const handleOrder = (product: any) => {
        let message = `Hi Sir Newson, I'm interested in ordering the [ID: ${product.id}] ${product.name} (${product.price}).`;
        const url = `https://wa.me/254702480771?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">The Shop</span>}
                subtitle="Wall Art • Design Assets • Creative Drops"
                shortParagraph="A curated collection of visual artifacts, digital assets, premium wall art, and wearable creative pieces designed by Sir Newson."
                primaryCtaLabel="Explore Website Services"
                primaryCtaPath="/website"
                secondaryCtaLabel="View Work"
                secondaryCtaPath="/work"
            />

            <div className="bg-primary py-4 overflow-hidden transform -rotate-1 mb-12">
                <div className="flex justify-center items-center gap-8 text-black font-bold uppercase tracking-widest text-sm md:text-base animate-pulse">
                    <span>Premium Creative Drops</span> • <span>Digital Assets</span> • <span>Wall Art & Apparel</span>
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
                            className="group bg-neutral-medium rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="aspect-[4/5] overflow-hidden relative bg-black/40">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{product.name}</h3>
                                    <span className="text-purple-400 font-bold">{product.price}</span>
                                </div>
                                <p className="text-white/60 text-sm mb-6">{product.description}</p>

                                <button
                                    onClick={() => handleOrder(product)}
                                    className="w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600 hover:text-white hover:border-purple-600"
                                >
                                    <i className="fab fa-whatsapp"></i> Order Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Shop;