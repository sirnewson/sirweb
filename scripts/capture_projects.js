
import { execSync } from 'child_process';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT_DIR, 'public', 'assets', 'images', 'screenshots');

const SITES = [
    { name: 'visuals_eta', url: 'https://visuals-eta.vercel.app/' },
    { name: 'web_gallery', url: 'https://webgallerygame.vercel.app/' },
    { name: 'utube_player', url: 'https://utubeplayer-mu.vercel.app/' },
    { name: 'solitaire_dark', url: 'https://solitaire-six-black.vercel.app/' },
    { name: 'sphere_audio', url: 'https://sphereaudio.vercel.app/' },
    { name: 'particle_ad', url: 'https://particlead.vercel.app/' },
    { name: 'dimensional_two', url: 'https://dimensional-two.vercel.app/' },
    { name: 'wak_two', url: 'https://wak-two.vercel.app/' },
    { name: 'driftpad', url: 'https://driftpad.yxm.digital/' },
    { name: 'tak_network', url: 'https://taknetwork.online/' },
    { name: 'yxm_digital', url: 'https://yxm.digital/' },
    { name: 'patakazi', url: 'https://www.patakazi.co.ke/' },
    { name: 'walltv', url: 'https://walltv.vercel.app/' },
    { name: 'ordafasta', url: 'https://www.ordafasta.co.ke/' },
    { name: 'flowclock', url: 'https://flowclock-rose.vercel.app/' },
    { name: 'finder_yxm', url: 'https://finder.yxm.digital/' },
    { name: 'captionsmaster', url: 'https://captionsmaster.yxm.digital/' }
];

const main = async () => {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
        fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }

    // Install capture-website-cli purely for npx usage if needed, or rely on npx caching.
    // We'll use npx directly.

    for (const site of SITES) {
        const pngPath = path.join(SCREENSHOT_DIR, `${site.name}.png`);
        const webpPath = path.join(SCREENSHOT_DIR, `${site.name}.webp`);

        if (fs.existsSync(webpPath)) {
            console.log(`Skipping ${site.name}, already exists.`);
            continue;
        }

        console.log(`Capturing ${site.name} from ${site.url}...`);
        try {
            // Using npx -y to auto accept prompts
            execSync(`npx -y capture-website-cli "${site.url}" --output "${pngPath}" --width 1280 --height 800 --timeout 60`, { stdio: 'inherit' });

            if (fs.existsSync(pngPath)) {
                console.log(`Converting ${site.name} to WebP...`);
                await sharp(pngPath)
                    .webp({ quality: 80 })
                    .toFile(webpPath);

                // Remove png to save space
                fs.unlinkSync(pngPath);
                console.log(`Finished ${site.name}`);
            } else {
                console.error(`Failed to capture ${site.name}: PNG not found`);
            }
        } catch (error) {
            console.error(`Error processing ${site.name}:`, error.message);
        }
    }
};

main();
