import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/work' },
        { name: 'Websites', path: '/website' },
        { name: 'Shop', path: '/shop' },
        { name: 'Threads', path: '/threads' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${scrolled ? 'w-[95%] max-w-7xl' : 'w-[98%] max-w-[1920px]'
                    }`}
            >
                <motion.div
                    className={`
            relative flex items-center justify-between px-6 py-3 rounded-full overflow-hidden
            transition-all duration-300 shadow-lg shadow-black/10 group
            bg-primary hover-dark-lime-waves backdrop-blur-xl
          `}
                    whileHover={{
                        rotateX: [0, 360],
                        transition: {
                            delay: 5,
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 5
                        }
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="absolute inset-0 rounded-full border border-black/10 group-hover:border-white/10 group-hover:shadow-[0_0_20px_rgba(191,255,0,0.1)] transition-all duration-300 pointer-events-none" />

                    <Link to="/" className="relative z-20 flex items-center">
                        <div className="relative h-10 w-48 md:h-12 md:w-60">
                            <img
                                src="/uploads/logo/logo%20on%20bright.png"
                                alt="Sir Newson Logo"
                                className="absolute inset-0 h-full w-auto object-contain transition-opacity duration-300 group-hover:opacity-0"
                            />
                            <img
                                src="/uploads/logo/logo%20on%20dark%20background.png"
                                alt="Sir Newson Logo"
                                className="absolute inset-0 h-full w-auto object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            />
                        </div>
                    </Link>

                    <div className="relative z-20 hidden md:flex items-center gap-5 xl:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium tracking-wide transition-all duration-300 relative
                                    ${location.pathname === link.path
                                        ? 'text-black group-hover:text-primary font-bold'
                                        : 'text-black/70 group-hover:text-white/70 hover:text-black group-hover:hover:text-white'
                                    }
                                `}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black group-hover:bg-primary"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <Link
                        to="/contact"
                        className="relative z-20 hidden md:block px-6 py-2 rounded-full text-sm font-bold transition-all duration-300
                        bg-[#011111] text-[#eefff4] group-hover:bg-primary group-hover:text-black shadow-lg"
                    >
                        Start a Project
                    </Link>

                    <button
                        className="relative z-20 md:hidden text-xl p-2 text-black group-hover:text-white transition-colors duration-300"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </motion.div>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-neutral-black/95 backdrop-blur-xl pt-32 px-6 md:hidden"
                    >
                        <div className="flex flex-col items-center gap-4 sm:gap-6">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`block py-2 px-8 text-2xl font-display font-bold tracking-wide ${location.pathname === link.path ? 'text-primary' : 'text-white'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                            >
                                <Link
                                    to="/contact"
                                    className="mt-8 px-8 py-3 rounded-full bg-primary text-black font-bold text-lg inline-block"
                                >
                                    Start a Project
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
