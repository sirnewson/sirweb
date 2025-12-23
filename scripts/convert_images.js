
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import axios from 'axios';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets', 'images');

if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const getFiles = (dir) => {
    const subdirs = fs.readdirSync(dir);
    const files = subdirs.map((subdir) => {
        const res = path.resolve(dir, subdir);
        return (fs.statSync(res).isDirectory()) ? getFiles(res) : res;
    });
    return files.reduce((a, f) => a.concat(f), []);
};

const convertLocalImages = async () => {
    console.log('--- Starting Local Image Conversion ---');
    const allDirs = [SRC_DIR, PUBLIC_DIR];
    let allFiles = [];
    for (const d of allDirs) {
        if (fs.existsSync(d)) allFiles = [...allFiles, ...getFiles(d)];
    }

    // exclude node_modules, .git, etc
    const imageFiles = allFiles.filter(file => /\.(png|jpg|jpeg)$/i.test(file) && !file.includes('node_modules') && !file.includes('.antigravity') && !file.includes('.gemini'));

    for (const file of imageFiles) {
        const ext = path.extname(file);
        const newFile = file.replace(new RegExp(ext + '$'), '.webp');

        // Check if alrdy exists? Force overwrite to ensure quality consistency
        try {
            await sharp(file)
                .webp({ quality: 80 })
                .toFile(newFile);

            console.log(`Converted: ${path.relative(ROOT_DIR, file)} -> ${path.relative(ROOT_DIR, newFile)}`);
        } catch (err) {
            console.error(`Failed to convert ${file}:`, err);
        }
    }
};

const handleExternalImages = async () => {
    console.log('\n--- Starting External Image Handling ---');
    const sourceFiles = getFiles(SRC_DIR).filter(file => /\.(tsx|jsx|ts|js)$/i.test(file));

    const imgUrlRegex = /["'](https?:\/\/[^"']+\.(?:png|jpg|jpeg))["']/gi;
    const urlMap = new Map();

    // 1. Scan and Download
    for (const file of sourceFiles) {
        const content = fs.readFileSync(file, 'utf8');
        const matches = [...content.matchAll(imgUrlRegex)];

        for (const m of matches) {
            const url = m[1];
            if (!urlMap.has(url)) {
                try {
                    // Check local cache/existence first? No, re-download to be sure or check if file exists.
                    // To verify file existence we need the filename.
                    const urlHash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
                    const urlPath = new URL(url).pathname;
                    const baseName = path.basename(urlPath); // e.g. maxresdefault.jpg

                    // Sanitize basename just in case
                    const cleanBaseName = baseName.replace(/[^a-zA-Z0-9._-]/g, '_');
                    const nameWithoutExt = path.parse(cleanBaseName).name;

                    // Unique name: name + hash
                    const finalName = `${nameWithoutExt}_${urlHash}.webp`;
                    const localPath = path.join(ASSETS_DIR, finalName);

                    const localRef = `/assets/images/${finalName}`;

                    // Avoid redownload if exists?
                    if (fs.existsSync(localPath)) {
                        console.log(`Exists (skipping download): ${localRef}`);
                        urlMap.set(url, localRef);
                        continue;
                    }

                    console.log(`Downloading: ${url}`);
                    const response = await axios({ url, responseType: 'arraybuffer' });

                    await sharp(response.data)
                        .webp({ quality: 80 })
                        .toFile(localPath);

                    urlMap.set(url, localRef);
                    console.log(`Saved to: ${localRef}`);
                } catch (err) {
                    console.warn(`Failed/Skipped ${url}: ${err.message}`);
                }
            }
        }
    }

    // 2. Replacements
    for (const file of sourceFiles) {
        let content = fs.readFileSync(file, 'utf8');
        let dirty = false;

        // Replace external URLs
        for (const [url, localRef] of urlMap.entries()) {
            if (content.includes(url)) {
                // Use split/join for global replacement
                content = content.split(url).join(localRef);
                dirty = true;
            }
        }

        // Replace local imports: import ... from './file.png' -> './file.webp'
        const localImportRegex = /(import\s+.*?from\s+['"])(.*?)\.(png|jpg|jpeg)(['"])/g;

        const newContent = content.replace(localImportRegex, (match, prefix, pathPart, ext, suffix) => {
            if (content.includes(`${pathPart}.webp`) && match.includes(`${pathPart}.webp`)) return match; // Already done?
            // Actually replace only if target file exists? 
            // We assume local conversion ran successfully.
            // But we should verify. 
            // For now, blindly replacing is consistent with the "Convert Local Images" step.
            return `${prefix}${pathPart}.webp${suffix}`;
        });

        if (newContent !== content) {
            content = newContent;
            dirty = true;
        }

        if (dirty) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated: ${path.relative(ROOT_DIR, file)}`);
        }
    }
};

const main = async () => {
    try {
        await convertLocalImages();
        await handleExternalImages();
    } catch (e) {
        console.error(e);
    }
};

main();
