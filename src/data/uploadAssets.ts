export type UploadAssetType = 'image' | 'video';
export type UploadAssetGroup = 'branding' | 'graphics' | 'motion';

export interface UploadAsset {
    id: string;
    title: string;
    category: string;
    group: UploadAssetGroup;
    type: UploadAssetType;
    src: string;
    fileName: string;
}

const brandingFiles = [
    'BZ ONE - BACK.webp',
    'DRAFT BANNER.webp',
    'IDEA TWO.webp',
    'aceera-logo-2x.webp',
    'anticipatory-logo.webp',
    'becoming-eco-branding-mockup.webp',
    'budget-gadget-branding-board.webp',
    'cdmkuet-branding-board.webp',
    'farmplus-branding-board.webp',
    'farmplus-product-mockups.webp',
    'hawz-branding-board.webp',
    'history-in-theatre-branding-board.webp',
    'history-in-theatre-logo-2x.webp',
    'kenya-builds-logo.webp',
    'kwa-ndego-creative-hub-logo-2x.webp',
    'mimbacheck-branding-board.webp',
    'partnership-for-food-traceability-logo.webp',
    'pedradio-microphone-mockup.webp',
    'steve-rogers-rebrand-board.webp',
    'taikom-phones-branding-board.webp',
    'terraplan-branding-board.webp',
    'tumana-tech-phone-mockup.webp',
    'vai-logo.webp',
    'wattle-residence-logo.webp',
    'whisper-wire-logo.webp',
    'wibo-branding-board.webp',
];

const graphicsFiles = [
    '1.webp',
    '1500 by 1600.webp',
    '179cm by 104cm.webp',
    '3 PART CLEAN.webp',
    '5 days.webp',
    'A good lock doesn\'t shout. It holds.webp',
    'Ywaya Tajiri.webp',
    'adidas-pink-sneaker-poster.webp',
    'baba talishaaa.webp',
    'big-voices-fest-madaraka-poster.webp',
    'birthday-pirate-ship-poster.webp',
    'bitter-rivals-event-poster.webp',
    'coookinggg.webp',
    'countrywide-delivery-music-upgrade-poster.webp',
    'countrywide-delivery-promo.webp',
    'cristiano-ronaldo-king-is-here-poster.webp',
    'dj-bibu-business-card.webp',
    'eid.webp',
    'erling-haaland-viking-poster.webp',
    'golbet-brand-identity.webp',
    'gucci-luxury-concept-poster.webp',
    'happy-madaraka-day-poster.webp',
    'hh.jpg',
    'kenya-builds-brand-identity.webp',
    'mapenzi-jibandaski-day-ones-poster.webp',
    'mapenzi-jibandaski-karun-poster.webp',
    'matatu-musical-event-poster.webp',
    'michael-bohemian-rhapsody-poster.webp',
    'michael-moonwalker-poster.webp',
    'mkurugenzi-join-movement-merch.webp',
    'ndunyu-njeru-brand-identity.webp',
    'phoneplace-vivo-y21d-poster.webp',
    'pushing products.webp',
    'rerun poster.webp',
    'sayuni-kenyan-chapter-premiere-poster.webp',
    'sayuni-premiere-gates-poster.webp',
    'ships-changed-form-poster.webp',
    'shop-save-win-madfun-poster.webp',
    'storytime-sunflower-lamp-poster.webp',
    'tenacity-big-f6-wall-print-poster.webp',
    'tenacity-medium-locks-order-poster.webp',
    'to uganda on foot.jpg',
    'ttnt-season-6-event-poster.webp',
    'ttnt-season-6-wallpaper.webp',
];

const motionFiles = [
    '1.mp4',
    'ABE MUTUA END SCREEN 1.mp4',
    'abel mutuaaaa.mp4',
    'ARSENAL CLIP.mp4',
    'arsenal-castle-countdown-reel.mp4',
    'artists loop - wyre.mp4',
    'big-screen-countdown.mp4',
    'big-voices-fest-gold-loop.mp4',
    'big-voices-fest-good-old-days-reel.mp4',
    'big-voices-fest-millennial-edition-reel.mp4',
    'big-voices-fest-red-loop.mp4',
    'big-voices-fest-season-six-loop.mp4',
    'black-warrior-facing-castle-scene.mp4',
    'byd-car-motion.mp4',
    'erling haaland Norway.mp4',
    'erling-haaland-viking-motion.mp4',
    'HITTERS.mp4',
    'kenya-builds-lifestyle-heights-reel.mp4',
    'kifaru-campfire-promo-reel.mp4',
    'kifaru-event-promo-reel.mp4',
    'lopha-airways-breaking-news-reel.mp4',
    'mapenzi-jibandaski-day-ones-reel.mp4',
    'mkurugenzi-logo-animation.mp4',
    'phil-it-logo-motion.mp4',
    'phoneplace-kenya-logo-motion.mp4',
    'phoneplace-kenya-long-motion.mp4',
    'phoneplace-kenya-product-clips.mp4',
    'Retro TV Intro.mp4',
    'Screen - Netflix.mp4',
    'Screen_7.mp4',
    'Screen_9.mp4',
    'sirnews-matchday-countdown-reel.mp4',
    'tenacity-big-f6-locks-reel.mp4',
    'trinity-logo-motion.mp4',
    'ttnt logo motion.mp4',
    'water-background.mp4',
];

const folderByGroup: Record<UploadAssetGroup, string> = {
    branding: 'branding',
    graphics: 'graphics',
    motion: 'motion and video',
};

const titleCase = (value: string) =>
    value
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .replace(/\b2X\b/g, '2x')
        .replace(/\bTtnt\b/g, 'TTNT')
        .replace(/\bByd\b/g, 'BYD')
        .replace(/\bDj\b/g, 'DJ')
        .replace(/\bAi\b/g, 'AI');

const fileToAsset = (fileName: string, group: UploadAssetGroup, type: UploadAssetType): UploadAsset => {
    const slug = fileName.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const isLogo = /logo/.test(slug);
    const isMockup = /mockup|mockups|poster|wallpaper|business-card|merch/.test(slug);

    return {
        id: `${group}-${slug}`,
        title: titleCase(fileName),
        category:
            group === 'motion'
                ? 'Motion & Video'
                : group === 'branding'
                    ? isLogo ? 'Logo Design' : 'Brand Identity'
                    : isMockup ? 'Graphic Design' : 'Campaign Visual',
        group,
        type,
        src: encodeURI(`/uploads/${folderByGroup[group]}/${fileName}`),
        fileName,
    };
};

const sortByName = (assets: UploadAsset[]) =>
    [...assets].sort((a, b) => a.title.localeCompare(b.title));

export const brandingAssets = sortByName(brandingFiles.map((fileName) => fileToAsset(fileName, 'branding', 'image')));
export const graphicsAssets = sortByName(graphicsFiles.map((fileName) => fileToAsset(fileName, 'graphics', 'image')));
export const motionAssets = sortByName(motionFiles.map((fileName) => fileToAsset(fileName, 'motion', 'video')));

const featuredIds = [
    'branding-wibo-branding-board',
    'graphics-mapenzi-jibandaski-day-ones-poster',
    'graphics-ttnt-season-6-event-poster',
    'motion-big-screen-countdown',
    'motion-erling-haaland-viking-motion',
    'graphics-tenacity-medium-locks-order-poster',
    'branding-kenya-builds-logo',
    'branding-farmplus-product-mockups',
    'motion-tenacity-big-f6-locks-reel',
    'motion-phoneplace-kenya-product-clips',
    'motion-black-warrior-facing-castle-scene',
    'motion-retro-tv-intro',
];

export const uploadedAssets = [...brandingAssets, ...graphicsAssets, ...motionAssets];

export const recentUploadAssets = [
    ...featuredIds
        .map((id) => uploadedAssets.find((asset) => asset.id === id))
        .filter((asset): asset is UploadAsset => Boolean(asset)),
    ...uploadedAssets.filter((asset) => !featuredIds.includes(asset.id)),
].slice(0, 16);
