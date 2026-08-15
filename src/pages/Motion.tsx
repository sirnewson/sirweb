import { useState } from 'react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import MediaModal from '../components/MediaModal';
import { ScrollReveal } from '../components/Animated';

// Local video files from /public/uploads/motion and video/
const V = (name: string) => `/uploads/motion%20and%20video/${encodeURIComponent(name)}`;

const Motion = () => {
    const videos = [
        { url: V('1.mp4'),                                     isLandscape: false },
        { url: V('ABE MUTUA END SCREEN 1.mp4'),                isLandscape: true  },
        { url: V('abel mutuaaaa.mp4'),                          isLandscape: false },
        { url: V('ARSENAL CLIP.mp4'),                          isLandscape: false },
        { url: V('arsenal-castle-countdown-reel.mp4'),         isLandscape: false },
        { url: V('artists loop - wyre.mp4'),                   isLandscape: true  },
        { url: V('big-screen-countdown.mp4'),                  isLandscape: true  },
        { url: V('big-voices-fest-gold-loop.mp4'),             isLandscape: true  },
        { url: V('big-voices-fest-good-old-days-reel.mp4'),    isLandscape: false },
        { url: V('big-voices-fest-millennial-edition-reel.mp4'), isLandscape: false },
        { url: V('big-voices-fest-red-loop.mp4'),              isLandscape: true  },
        { url: V('big-voices-fest-season-six-loop.mp4'),       isLandscape: false },
        { url: V('black-warrior-facing-castle-scene.mp4'),     isLandscape: true  },
        { url: V('byd-car-motion.mp4'),                        isLandscape: false },
        { url: V('erling haaland Norway.mp4'),                 isLandscape: false },
        { url: V('erling-haaland-viking-motion.mp4'),          isLandscape: false },
        { url: V('HITTERS.mp4'),                               isLandscape: true  },
        { url: V('kenya-builds-lifestyle-heights-reel.mp4'),   isLandscape: false },
        { url: V('kifaru-campfire-promo-reel.mp4'),            isLandscape: false },
        { url: V('kifaru-event-promo-reel.mp4'),               isLandscape: false },
        { url: V('lopha-airways-breaking-news-reel.mp4'),      isLandscape: false },
        { url: V('mapenzi-jibandaski-day-ones-reel.mp4'),      isLandscape: false },
        { url: V('mkurugenzi-logo-animation.mp4'),             isLandscape: true  },
        { url: V('phil-it-logo-motion.mp4'),                   isLandscape: true  },
        { url: V('phoneplace-kenya-logo-motion.mp4'),          isLandscape: false },
        { url: V('phoneplace-kenya-long-motion.mp4'),          isLandscape: true  },
        { url: V('phoneplace-kenya-product-clips.mp4'),        isLandscape: true  },
        { url: V('Retro TV Intro.mp4'),                        isLandscape: true  },
        { url: V('Screen - Netflix.mp4'),                      isLandscape: false },
        { url: V('Screen_7.mp4'),                              isLandscape: false },
        { url: V('Screen_9.mp4'),                              isLandscape: false },
        { url: V('sirnews-matchday-countdown-reel.mp4'),       isLandscape: false },
        { url: V('tenacity-big-f6-locks-reel.mp4'),            isLandscape: false },
        { url: V('trinity-logo-motion.mp4'),                   isLandscape: true  },
        { url: V('ttnt logo motion.mp4'),                      isLandscape: false },
        { url: V('water-background.mp4'),                      isLandscape: true  },
    ];

    const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string } | null>(null);

    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<>Motion & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Visuals</span></>}
                subtitle="A Collection of Cinematic Moments"
            />

            <section className="py-24 px-6">
                <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6 max-w-[1920px] mx-auto">
                    {videos.map((item, index) => (
                        <ScrollReveal
                            key={index}
                            direction="up"
                            delay={(index % 4) * 0.08}
                            duration={0.6}
                        >
                            <div
                                className="break-inside-avoid overflow-hidden transition-all duration-300 group relative cursor-pointer"
                                onClick={() => setSelectedMedia({ src: item.url, title: `Motion Sequence ${String(index + 1).padStart(2, '0')}` })}
                            >
                                <div className={`relative w-full overflow-hidden rounded-[12px] border border-white/10 bg-black hover:border-primary ${item.isLandscape ? 'aspect-video' : 'aspect-[9/16]'}`}>
                                    <video
                                        src={item.url}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                    />
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none rounded-[12px]">
                                    <div>
                                        <p className="text-primary text-xs uppercase tracking-widest mb-1">Motion Reel</p>
                                        <h3 className="text-white font-bold text-lg">Sequence {String(index + 1).padStart(2, '0')}</h3>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            <MediaModal
                isOpen={!!selectedMedia}
                onClose={() => setSelectedMedia(null)}
                src={selectedMedia?.src || ''}
                title={selectedMedia?.title || ''}
                type="video"
            />

            <Footer />
        </div>
    );
};

export default Motion;
