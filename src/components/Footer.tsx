import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full font-sans select-none">
            {/* Top Lime Section */}
            <div className="bg-primary text-black py-16 px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    Let's work together
                </h2>
                <div className="flex items-center gap-8 text-sm md:text-base font-bold tracking-wide">
                    <Link 
                        to="/contact" 
                        className="border-b-2 border-black pb-1 hover:opacity-75 transition-opacity"
                    >
                        Get in Touch
                    </Link>
                    <Link 
                        to="/work" 
                        className="border-b-2 border-black pb-1 hover:opacity-75 transition-opacity"
                    >
                        Selected Work
                    </Link>
                </div>
            </div>

            {/* Bottom White/Light-Gray Section */}
            <div className="bg-[#FAF9F6] text-black pt-20 pb-8 px-8 md:px-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                    
                    {/* Socials & Policies */}
                    <div className="space-y-12">
                        {/* Social Icons */}
                        <div className="flex gap-6 text-xl">
                            <a 
                                href="https://linkedin.com/in/sirnewson" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:opacity-70 transition-opacity"
                                aria-label="LinkedIn"
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a 
                                href="https://instagram.com/sirnewson" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:opacity-70 transition-opacity"
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a 
                                href="https://twitter.com/sirnewson" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:opacity-70 transition-opacity"
                                aria-label="Twitter"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>

                        {/* Copyright & Terms */}
                        <div className="text-xs text-black/50 space-y-2 font-medium">
                            <p>©2026 SIR NEWSON</p>
                            <div className="flex gap-4">
                                <Link to="/" className="hover:underline">Terms of Use</Link>
                                <Link to="/" className="hover:underline">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>

                    {/* Locations Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-24 text-left">
                        {/* Nairobi, Kenya */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm tracking-wider uppercase text-black/80">Location</h4>
                            <p className="text-xs text-black/60 leading-relaxed font-medium">
                                Nairobi, Kenya<br />
                                Creative HQ & Studio<br />
                            </p>
                        </div>

                        {/* Direct Inquiries */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm tracking-wider uppercase text-black/80">Inquiries</h4>
                            <p className="text-xs text-black/60 leading-relaxed font-medium">
                                Email: <a href="mailto:sirnewson@gmail.com" className="hover:underline font-bold text-black/80">sirnewson@gmail.com</a><br />
                                Phone: <a href="tel:0702480771" className="hover:underline font-bold text-black/80">0702480771</a><br />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Massive Branding Wordmark at Bottom */}
                <div className="w-full flex justify-center translate-y-8 select-none pointer-events-none">
                    <span className="text-[12vw] font-black leading-none tracking-tighter text-black/[0.04] font-display whitespace-nowrap">
                        SIR NEWSON
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
