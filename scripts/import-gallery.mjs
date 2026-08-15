/**
 * Second import pass: the poster gallery and the TTNT 6 feature set.
 * Same optimisation contract as import-assets.mjs — resize to web scale, WebP.
 *
 *   node scripts/import-gallery.mjs
 */
import { readdir, mkdir, stat, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT_ROOT = 'public/uploads';
const MAX_W = 1100;
const QUALITY = 74;

const SOURCES = [
    {
        key: 'poster', label: 'Poster Archive', src: 'E:/CLIENTS/POSTERS',
        dest: 'gallery', limit: 48, docket: 'gallery',
    },
    {
        key: 'ttnt6', label: 'TTNT 6', src: 'E:/CLIENTS/NJUGUSH',
        dest: 'ttnt6', limit: 12, docket: 'events',
        match: /ttnt/i,
    },
];

const IMG = /\.(png|jpe?g|webp)$/i;
const SKIP_DIR = /^(pdf|psd|ai|eps|2x|3x|4x|5x|300ppi|print|raw|source|links|fonts|archive)$/i;

const slug = (s) =>
    s.replace(/\.[^.]+$/, '').toLowerCase().normalize('NFKD')
        .replace(/[^\w\s-]/g, '').trim()
        .replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 60) || 'asset';

const title = (s) =>
    slug(s).split('-').filter(Boolean)
        .map((w) => (w.length <= 2 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
        .join(' ');

async function walk(dir, match, depth = 0, acc = []) {
    if (depth > 2) return acc;
    let entries;
    try { entries = await readdir(dir, { withFileTypes: true }); } catch { return acc; }
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (SKIP_DIR.test(e.name)) continue;
            await walk(full, match, depth + 1, acc);
        } else if (IMG.test(e.name)) {
            if (match && !match.test(e.name)) continue;
            try {
                const s = await stat(full);
                if (s.size > 150_000 && s.size < 14_000_000) acc.push({ full, name: e.name, size: s.size });
            } catch { /* skip */ }
        }
    }
    return acc;
}

const existing = existsSync('scripts/imported-manifest.json')
    ? JSON.parse(await readFile('scripts/imported-manifest.json', 'utf8'))
    : [];
const manifest = [...existing];

for (const source of SOURCES) {
    if (!existsSync(source.src)) { console.log(`skip (missing): ${source.src}`); continue; }
    const found = await walk(source.src, source.match);
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
        try {
            const info = await sharp(p.full).rotate()
                .resize({ width: MAX_W, height: 1600, fit: 'inside', withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(path.join(outDir, outName));
            manifest.push({
                id: p.id, title: title(p.name), client: source.label, clientKey: source.key,
                docket: source.docket, group: source.dest,
                src: `/uploads/${source.dest}/${outName}`, w: info.width, h: info.height,
            });
            ok++;
        } catch (err) {
            console.log(`  ! ${p.name}: ${err.message.slice(0, 60)}`);
        }
    }
    console.log(`${source.label.padEnd(16)} ${ok}/${picked.length} -> ${source.dest}`);
}

await writeFile('scripts/imported-manifest.json', JSON.stringify(manifest, null, 2));
console.log(`\nmanifest total: ${manifest.length}`);
