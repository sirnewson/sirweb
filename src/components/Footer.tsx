import { Link } from 'react-router-dom';
import DriftMarquee from './DriftMarquee';
import GlobalShopBanner from './GlobalShopBanner';

const Footer = () => {
    return (
        <>
            <GlobalShopBanner />
            <DriftMarquee />
            <footer id="contact" className="relative bg-neutral-black py-24 px-8 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    {/* Top Section: Branding & Mini Banners */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24 border-b border-white/5 pb-24">

                        {/* Branding */}
                        <div className="space-y-8 max-w-md">
                            <div className="flex items-center gap-6">
                                {/* Circular Profile Image */}
                                <div className="relative w-24 h-24 group cursor-pointer">
                                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                                    <img
                                        src="/assets/images/new-logo_e9f3d068.webp"
                                        alt="Sir Newson Face"
                                        className="w-full h-full object-cover rounded-full relative z-10 drop-shadow-[0_0_15px_rgba(191,255,0,0.3)] border-2 border-primary/20 transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                {/* Main Logo */}
                                <img
                                    src="/assets/images/my-logo_2247a828.webp"
                                    alt="Sir Newson Logo"
                                    className="h-16 w-auto opacity-80 hover:opacity-100 transition-all duration-500 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                />
                            </div>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Crafting digital experiences that merge human creativity with artificial intelligence.
                                <br />
                                <span className="text-primary mt-4 block font-bold">Nairobi, Kenya 🇰🇪</span>
                            </p>
                        </div>

                        {/* Mini Banners Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto">
                            {/* Shop Banner */}
                            <Link to="/shop" className="group p-6 rounded-2xl bg-neutral-medium border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 w-full sm:w-64">
                                <div className="flex justify-between items-start mb-8">
                                    <i className="fas fa-shopping-bag text-2xl text-white/50 group-hover:text-primary transition-colors" />
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                                        <i className="fas fa-arrow-right text-xs" />
                                    </div>
                                </div>
                                <h4 className="text-white font-bold mb-1">The Shop</h4>
                                <p className="text-white/50 text-sm">Curated digital & physical goods.</p>
                            </Link>

                            {/* Drift Notes Banner */}
                            <Link to="/drift-notes" className="group p-6 rounded-2xl bg-neutral-medium border border-white/5 hover:border-white/50 transition-all duration-300 hover:-translate-y-1 w-full sm:w-64">
                                <div className="flex justify-between items-start mb-8">
                                    <i className="fas fa-book-open text-2xl text-white/50 group-hover:text-white transition-colors" />
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                        <i className="fas fa-arrow-right text-xs" />
                                    </div>
                                </div>
                                <h4 className="text-white font-bold mb-1">Drift Notes</h4>
                                <p className="text-white/50 text-sm">Thoughts, visuals & archives.</p>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
                        {/* Main */}
                        <div className="space-y-6">
                            <h4 className="text-white font-bold text-lg">Main</h4>
                            <ul className="space-y-4">
                                {['Home', 'Work', 'Projects', 'Services'].map((item) => (
                                    <li key={item}>
                                        <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Explore */}
                        <div className="space-y-6">
                            <h4 className="text-white font-bold text-lg">Explore</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Drift Notes', path: '/drift-notes' },
                                    { name: 'The Shop', path: '/shop' },
                                    { name: 'Media Channel', path: '/media' },
                                    { name: 'Gallery', path: '/gallery' },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link to={item.path} className="text-white/50 hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect */}
                        <div className="space-y-6">
                            <h4 className="text-white font-bold text-lg">Connect</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Contact Us', path: '/contact' },
                                    { name: 'Rate Card', path: '/rate-card' },
                                    { name: 'Book a Call', path: '/contact' },
                                    { name: 'AI Tools', path: '/ai-tools' },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link to={item.path} className="text-white/50 hover:text-white transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Socials */}
                        <div className="space-y-6">
                            <h4 className="text-white font-bold text-lg">Socials</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Twitter', url: 'https://twitter.com/sirnewson' },
                                    { name: 'Instagram', url: 'https://instagram.com/sirnewson' },
                                    { name: 'LinkedIn', url: 'https://linkedin.com/in/sirnewson' },
                                    { name: 'GitHub', url: 'https://github.com/sirnewson' }
                                ].map((social) => (
                                    <li key={social.name}>
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                                        >
                                            <i className={`fab fa-${social.name.toLowerCase()} group-hover:text-primary transition-colors`} />
                                            {social.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-sm">
                        <span>© 2025 Sir Newson. All rights reserved.</span>
                        <div className="flex gap-8">
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
