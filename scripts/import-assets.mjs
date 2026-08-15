/**
 * Curated asset import.
 *
 * Client folders hold print-resolution PNGs (often 10MB+). This pulls a capped
 * selection per client, resizes to web scale and writes WebP into public/uploads,
 * so the site gains proof-of-work without repeating the video payload mistake.
 *
 *   node scripts/import-assets.mjs
 */
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT_ROOT = 'public/uploads';
const MAX_W = 1200;
const QUALITY = 76;

/** group -> { src, dest, limit, depth } */
const SOURCES = [
    { key: 'lastcall', label: 'Lastcall Events', src: 'E:/CLIENTS/LASTCALL', dest: 'events', limit: 16, docket: 'events' },
    { key: 'big-voice', label: 'Big Voice Fest', src: 'E:/CLIENTS/BIG VOICE', dest: 'events', limit: 16, docket: 'events' },
    { key: 'matatu', label: 'Matatu', src: 'E:/CLIENTS/MATATU', dest: 'events', limit: 12, docket: 'events' },
    { key: 'abel-mutua', label: 'Abel Mutua', src: 'E:/CLIENTS/ABEL MUTUA', dest: 'projects', limit: 14, docket: 'graphics' },
    { key: 'njugush', label: 'Njugush', src: 'E:/CLIENTS/NJUGUSH', dest: 'projects', limit: 12, docket: 'graphics' },
    { key: 'jinwear', label: 'Jinwear', src: 'E:/CLIENTS/JIN', dest: 'projects', limit: 10, docket: 'graphics' },
    { key: 'best', label: 'BEST', src: 'E:/Personal_Projects/BEST', dest: 'projects', limit: 8, docket: 'product' },
    { key: 'ebusoma', label: 'Ebusoma', src: 'E:/Personal_Projects/EBUSOMA', dest: 'projects', limit: 8, docket: 'product' },
    { key: 'branding-2024', label: '2024 Branding', src: 'E:/Work_And_Clients/2024 BRANDING', dest: 'branding', limit: 16, docket: 'branding' },
];

const IMG = /\.(png|jpe?g|webp)$/i;
// Working files, print variants and scratch names that are not deliverables.
const SKIP_DIR = /^(pdf|psd|ai|eps|2x|3x|4x|5x|300ppi|print|raw|source|links|fonts|archive)$/i;
const SKIP_FILE = /^(bg|background|untitled|asset|final|copy|test|scratch|temp)\b/i;

const slug = (s) =>
    s.replace(/\.[^.]+$/, '')
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 60) || 'asset';

const title = (s) =>
    slug(s).split('-').filter(Boolean)
        .map((w) => (w.length <= 2 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
        .join(' ');

async function walk(dir, depth = 0, acc = []) {
    if (depth > 2) return acc;
    let entries;
    try { entries = await readdir(dir, { withFileTypes: true }); } catch { return acc; }
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (SKIP_DIR.test(e.name)) continue;
            await walk(full, depth + 1, acc);
        } else if (IMG.test(e.name) && !SKIP_FILE.test(e.name)) {
            try {
                const s = await stat(full);
                if (s.size > 180_000 && s.size < 14_000_000) acc.push({ full, name: e.name, size: s.size });
            } catch { /* unreadable, skip */ }
        }
    }
    return acc;
}

const manifest = [];

for (const source of SOURCES) {
    if (!existsSync(source.src)) {
        console.log(`skip (missing): ${source.src}`);
        continue;
    }
    const found = await walk(source.src);
    // Larger files are usually the finished deliverable rather than a fragment.
    found.sort((a, b) => b.size - a.size);

    const seen = new Set();
    const picked = [];
    for (const f of found) {
        const id = `${source.key}-${slug(f.name)}`;
        if (seen.has(id)) continue;
        seen.add(id);
        picked.push({ ...f, id });
        if (picked.length >= source.limit) break;
    }

    const outDir = path.join(OUT_ROOT, source.dest);
    await mkdir(outDir, { recursive: true });

    let ok = 0;
    for (const p of picked) {
        const outName = `${p.id}.webp`;
        const outPath = path.join(outDir, outName);
        try {
            const info = await sharp(p.full)
                .rotate()
                .resize({ width: MAX_W, height: MAX_W, fit: 'inside', withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(outPath);
            manifest.push({
                id: p.id,
                title: title(p.name),
                client: source.label,
                clientKey: source.key,
                docket: source.docket,
                group: source.dest,
                src: `/uploads/${source.dest}/${outName}`,
                w: info.width,
                h: info.height,
            });
            ok++;
        } catch (err) {
            console.log(`  ! ${p.name}: ${err.message.slice(0, 60)}`);
        }
    }
    console.log(`${source.label.padEnd(16)} ${ok}/${picked.length} imported -> ${source.dest}`);
}

await writeFile('scripts/imported-manifest.json', JSON.stringify(manifest, null, 2));
console.log(`\ntotal: ${manifest.length} images`);
