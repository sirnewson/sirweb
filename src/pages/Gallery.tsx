import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';
import { clientsData } from '../data/clients';

const Gallery = () => {
    useEffect(() => {
        document.title = "Visual Experiments, Concepts & Cinematic Design Studies | Sir Newson";
    }, []);

    // Non-client specific media (e.g. concept videos)
    const conceptMedia = [
        { src: 'https://cdn.midjourney.com/video/d1863d34-2080-4e5f-ab90-f86d66131995/0.mp4', type: 'video' },
        { src: 'https://cdn.midjourney.com/video/d0d9357e-3c4f-4c97-9092-3808023a06ff/0.mp4', type: 'video' },
        { src: 'https://cdn.midjourney.com/video/45b2b40c-7aa5-4195-b93f-2d87a66a6157/0.mp4', type: 'video' },
    ];

    const miscMedia = [
        { src: '/assets/images/matatu_964f2996.webp', type: 'image' },
        { src: '/assets/images/advance_f5b5eb1e.webp', type: 'image' },
        { src: '/assets/images/bill-two_807ef42b.webp', type: 'image' },
        { src: '/assets/images/design-one_d42e0b83.webp', type: 'image' },
        { src: '/assets/images/AMBER-RAY_dd19587e.webp', type: 'image' },
        { src: '/assets/images/guess-who_fdf5aff6.webp', type: 'image' },
        { src: '/assets/images/Main-Audio-Cover_39e05667.webp', type: 'image' },
        { src: '/assets/images/PIKACHUUU_b5b95cb6.webp', type: 'image' },
        { src: '/assets/images/1000bob_3d3ebff8.webp', type: 'image' },
        { src: '/assets/images/vibes-profile-cover_7ccfe994.webp', type: 'image' },
        { src: '/assets/images/savee_b3931833.webp', type: 'image' },
        { src: '/assets/images/Maritee-Solar_d16b16cb.webp', type: 'image' },
        { src: '/assets/images/ndumooo_c7466626.webp', type: 'image' },
        { src: '/assets/images/FLASH_138f8fa0.webp', type: 'image' },
        { src: '/assets/images/groupp_be28be7a.webp', type: 'image' },
        { src: '/assets/images/50_b8a0208d.webp', type: 'image' },
        { src: '/assets/images/SEE-YOU-TONIGHT_8e1dcf75.webp', type: 'image' },
        { src: '/assets/images/coveer_c05ef28c.webp', type: 'image' },
        { src: '/assets/images/outlook1_7183423e.webp', type: 'image' },
        { src: '/assets/images/flaqo-draft-progress_79469446.webp', type: 'image' },
        { src: '/assets/images/post-2_7e7d8fa1.webp', type: 'image' },
        { src: '/assets/images/slaps_c6e846c4.webp', type: 'image' },
        { src: '/assets/images/welcome_63390453.webp', type: 'image' },
        { src: '/assets/images/josae-1m_026dd95f.webp', type: 'image' },
        { src: '/assets/images/time_95b26164.webp', type: 'image' },
        { src: '/assets/images/cleanshelf-concept-3_2f0bf9e3.webp', type: 'image' },
        { src: '/assets/images/1580-x-1080_cf412c7f.webp', type: 'image' },
        { src: '/assets/images/mockup_997028e3.webp', type: 'image' },
        { src: '/assets/images/gallery_new_01.webp', type: 'image' },
        { src: '/assets/images/gallery_new_02.webp', type: 'image' },
        { src: '/assets/images/gallery_new_03.webp', type: 'image' },
        { src: '/assets/images/gallery_new_04.webp', type: 'image' },
        { src: '/assets/images/gallery_new_05.webp', type: 'image' },
        { src: '/assets/images/recent_work_gikonyore.webp', type: 'image' },
        { src: '/assets/images/recent_work_saturday_dosage_wide.webp', type: 'image' },
        { src: '/assets/images/recent_work_dj_dibul_wide.webp', type: 'image' },
        { src: '/assets/images/recent_work_midnight_poetry.webp', type: 'image' },
        { src: '/assets/images/recent_work_mkurugenzi_hoodies_men.webp', type: 'image' },
        { src: '/assets/images/recent_work_big_voices_fest.webp', type: 'image' },
        { src: '/assets/images/recent_work_tenacity_locks_xmas.webp', type: 'image' },
        { src: '/assets/images/recent_work_saturday_dosage_portrait.webp', type: 'image' },
        { src: '/assets/images/recent_work_mkurugenzi_hoodies_women.webp', type: 'image' },
        { src: '/assets/images/recent_work_dj_dibul_portrait.webp', type: 'image' },
    ];

    // Get 3 images from each client
    const clientMedia = clientsData.flatMap(client =>
        client.gallery.slice(0, 3).map(img => ({
            src: img,
            type: 'image'
        }))
    );

    // Combine media (Concepts + Client Work + Misc)
    // Combine media (Concepts + Client Work + Misc)
    const initialMediaItems = [...conceptMedia, ...clientMedia, ...miscMedia];

    const [mediaItems, setMediaItems] = useState(initialMediaItems);

    // Shuffle function
    const shuffleArray = (array: any[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Shuffle on mount and every 1 minute
    useEffect(() => {
        // Initial shuffle on mount
        setMediaItems(shuffleArray(initialMediaItems));

        const interval = setInterval(() => {
            setMediaItems(prevItems => shuffleArray(prevItems));
        }, 60000); // 1 minute

        return () => clearInterval(interval);
    }, []);

    const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string; type: 'image' | 'video' } | null>(null);

    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<>Visual Experiments <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">& Atmospheres</span></>}
                subtitle="Visual Studies"
                shortParagraph="A collection of images, concepts, moods, and visual studies exploring identity, culture, emotion, and the future of creative expression."
            />

            <section className="py-24 px-6">
                <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4 max-w-[1920px] mx-auto">
                    {mediaItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: (index % 4) * 0.05 }}
                        >
                            <TiltCard onClick={() => setSelectedMedia({ src: item.src, title: `Gallery Item ${index + 1}`, type: item.type as 'image' | 'video' })}>
                                {item.type === 'video' ? (
                                    <div className="relative">
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-auto object-contain"
                                        >
                                            <source src={item.src} type="video/mp4" />
                                        </video>
                                        <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full">
                                            <i className="fas fa-video text-white text-xs"></i>
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={`Gallery item ${index}`}
                                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}

                                {/* Overlay for hover effect */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </section >

            <MediaModal
                isOpen={!!selectedMedia}
                onClose={() => setSelectedMedia(null)}
                src={selectedMedia?.src || ''}
                title={selectedMedia?.title || ''}
                type={selectedMedia?.type || 'image'}
            />

            <Footer />
        </div >
    );
};

const TiltCard = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="break-inside-avoid rounded-xl overflow-hidden border border-white/10 hover:border-primary hover:shadow-[0_0_30px_#BFFF004D] transition-all duration-300 group mb-4 cursor-pointer relative"
        >
            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

export default Gallery;
