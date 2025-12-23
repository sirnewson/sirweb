
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT_DIR, 'public', 'assets', 'images', 'screenshots');

const main = async () => {
    const pngPath = path.join(SCREENSHOT_DIR, 'visuals_eta.png');
    const webpPath = path.join(SCREENSHOT_DIR, 'visuals_eta.webp');

    if (fs.existsSync(pngPath)) {
        console.log('Converting visuals_eta.png to WebP...');
        try {
            await sharp(pngPath)
                .webp({ quality: 80 })
                .toFile(webpPath);
            fs.unlinkSync(pngPath);
            console.log('Fixed visuals_eta');
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log('visuals_eta.png not found');
    }
};

main();
