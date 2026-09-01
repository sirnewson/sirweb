import { useEffect, useRef, useState } from 'react';

/**
 * Brand Matrix — a cycling identity study on canvas.
 *
 * Three guards make it safe to sit on a real page rather than a demo:
 *  - it draws to its own container, never the viewport
 *  - the rAF loop only runs while the section is on screen
 *  - reduced-motion viewers get a single static frame, never the loop
 */

type Shape = 'network' | 'dots' | 'flower';

interface Theme {
    bg: number[];
    fg: number[];
    shape: Shape;
    lines: number;
    vig: number[];
}

const NUM_NODES = 6;
const BASE_RADIUS = 195;
const BLOB_RADIUS = 50;
const NUM_PARTICLES = 180;
const CYCLE_DURATION = 6.0;
const TRANSITION_DURATION = 3.0;

/** Retuned to the studio palette: soft black, warm white, sunset, lime, espresso. */
const themes: Theme[] = [
    { bg: [0, 0, 0], fg: [191, 255, 0], shape: 'network', lines: 1, vig: [0, 0, 0, 0.95] },
    { bg: [247, 243, 237], fg: [22, 18, 15], shape: 'dots', lines: 0, vig: [220, 214, 204, 0.4] },
    { bg: [242, 139, 44], fg: [247, 243, 237], shape: 'flower', lines: 0, vig: [122, 46, 11, 0.6] },
    { bg: [191, 255, 0], fg: [22, 18, 15], shape: 'dots', lines: 0, vig: [140, 200, 20, 0.5] },
    { bg: [242, 139, 44], fg: [22, 18, 15], shape: 'network', lines: 1, vig: [122, 46, 11, 0.6] },
    { bg: [191, 255, 0], fg: [22, 18, 15], shape: 'flower', lines: 0, vig: [140, 200, 20, 0.5] },
    { bg: [26, 13, 6], fg: [255, 180, 92], shape: 'dots', lines: 0, vig: [0, 0, 0, 0.9] },
    { bg: [247, 243, 237], fg: [195, 90, 26], shape: 'flower', lines: 0, vig: [220, 214, 204, 0.4] },
    { bg: [0, 0, 0], fg: [242, 139, 44], shape: 'dots', lines: 0, vig: [0, 0, 0, 0.95] },
    { bg: [0, 0, 0], fg: [191, 255, 0], shape: 'flower', lines: 0, vig: [0, 0, 0, 0.95] },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpRGB = (c1: number[], c2: number[], t: number) => [
    lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t),
];
const lerpRGBA = (c1: number[], c2: number[], t: number) => [
    lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t), lerp(c1[3], c2[3], t),
];
const toRGBA = (c: number[], a = 1) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface P {
    x: number; y: number; prevX: number; prevY: number;
    vx: number; vy: number; size: number;
    life: number; maxLife: number; speed: number;
}

interface Spark {
    x: number; y: number; prevX: number; prevY: number;
    vx: number; vy: number; color: number[]; alpha: number; size: number;
}

interface Node {
    x: number; y: number; angle: number; seed: number; r: number;
}

interface CanvasProps {
    /** Skips the intersection gate for surfaces that are visible by definition,
     *  such as the splash screen. */
    alwaysOn?: boolean;
    className?: string;
}

/** The engine. Fills whatever box it is given. */
export const BrandMatrixCanvas = ({ alwaysOn = false, className = '' }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef(0);
    const [visible, setVisible] = useState(alwaysOn);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    // The loop is expensive, so it is only alive while the section is on screen.
    useEffect(() => {
        if (alwaysOn) return;
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { rootMargin: '150px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [alwaysOn]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;
        if (!visible) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Backing-store resolution. Capped tighter than the page default: this
        // loop is fill-rate bound and every extra device pixel costs a whole
        // halftone pass.
        const res = Math.min(window.devicePixelRatio || 1, 1.5);

        // Every radius below is expressed in units of `dpr`, so folding a fit
        // factor into it scales the whole composition to the frame. Without
        // this the orb ring is a fixed pixel size and overflows a wide 16:9
        // band, whose height is the constraint.
        const REF_HEIGHT = 620;
        let dpr = res;
        let width = 0, height = 0, baseCX = 0, baseCY = 0, centerX = 0, centerY = 0;

        const resize = () => {
            const r = wrap.getBoundingClientRect();
            const fit = Math.min(1.6, Math.max(0.5, r.height / REF_HEIGHT));
            dpr = res * fit;
            width = canvas.width = Math.max(1, Math.floor(r.width * res));
            height = canvas.height = Math.max(1, Math.floor(r.height * res));
            canvas.style.width = r.width + 'px';
            canvas.style.height = r.height + 'px';
            baseCX = width / 2;
            baseCY = height / 2;
            centerX = baseCX;
            centerY = baseCY;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(wrap);

        let time = 0;
        let lastShockwave = 0;
        let lastThemeIndex = -1;

        const particles: P[] = [];
        const sparks: Spark[] = [];
        const shockwaves: { r: number; maxR: number; alpha: number; speed: number; width: number }[] = [];

        const resetParticle = (p: P, init = false) => {
            const ang = Math.random() * Math.PI * 2;
            const rad = (init ? Math.random() : 0.8 + Math.random() * 0.4) * (BASE_RADIUS * 2.5 * dpr);
            p.x = baseCX + Math.cos(ang) * rad;
            p.y = baseCY + Math.sin(ang) * rad;
            p.prevX = p.x;
            p.prevY = p.y;
            p.vx = (Math.random() - 0.5) * 1.5 * dpr;
            p.vy = (Math.random() - 0.5) * 1.5 * dpr;
            p.size = (Math.random() * 2.5 + 0.5) * dpr;
            p.life = init ? Math.random() : 0;
            p.maxLife = 0.5 + Math.random() * 0.5;
            p.speed = 0.2 + Math.random() * 0.8;
        };

        for (let i = 0; i < NUM_PARTICLES; i++) {
            const p = {} as P;
            resetParticle(p, true);
            particles.push(p);
        }

        const energyPulses = Array.from({ length: 9 }, () => ({
            segment: Math.floor(Math.random() * NUM_NODES),
            progress: Math.random(),
            speed: 0.008 + Math.random() * 0.015,
            size: (Math.random() * 3 + 2) * dpr,
        }));

        const triggerShockwave = (power = 1) => {
            shockwaves.push({
                r: 10 * dpr,
                maxR: Math.max(width, height) * 0.9,
                alpha: 0.5 * power,
                speed: 3 * power * dpr,
                width: 100 * power * dpr,
            });
        };

        const drawOrb = (
            node: Node, blobRadius: number,
            wBlob: number, wDot: number, wPetal: number,
            fg: number[], bg: number[], tPhase: number
        ) => {
            const points = 52;
            const coords: { x: number; y: number }[] = [];
            const petalA = BASE_RADIUS * dpr * 0.58;
            const petalB = blobRadius * 0.85;
            const twist = Math.sin(tPhase * Math.PI) * Math.PI;
            const effAngle = node.angle + twist * (node.seed % 2 === 0 ? 1 : -1);
            const petalCx = centerX + Math.cos(effAngle) * petalA;
            const petalCy = centerY + Math.sin(effAngle) * petalA;
            const effX = centerX + Math.cos(effAngle) * node.r;
            const effY = centerY + Math.sin(effAngle) * node.r;

            for (let i = 0; i <= points; i++) {
                const t = (i / points) * Math.PI * 2;

                const w1 = Math.sin(t * 3 + time * 3.4 + node.seed) * (blobRadius * 0.12);
                const w2 = Math.cos(t * 2 - time * 2.2 + node.seed * 1.5) * (blobRadius * 0.08);
                const rBlob = blobRadius + w1 + w2;
                const bx = effX + Math.cos(t) * rBlob;
                const by = effY + Math.sin(t) * rBlob;

                const dx = effX + Math.cos(t) * (blobRadius * 0.7);
                const dy = effY + Math.sin(t) * (blobRadius * 0.7);

                const pinch = 1 - 0.4 * Math.abs(Math.cos(t));
                const lx = Math.cos(t) * petalA;
                const ly = Math.sin(t) * petalB * pinch;
                const px = petalCx + lx * Math.cos(effAngle) - ly * Math.sin(effAngle);
                const py = petalCy + lx * Math.sin(effAngle) + ly * Math.cos(effAngle);

                coords.push({
                    x: bx * wBlob + dx * wDot + px * wPetal,
                    y: by * wBlob + dy * wDot + py * wPetal,
                });
            }

            ctx.beginPath();
            ctx.moveTo(coords[0].x, coords[0].y);
            for (let i = 1; i < coords.length; i++) ctx.lineTo(coords[i].x, coords[i].y);
            ctx.closePath();

            const energy = Math.sin(tPhase * Math.PI);
            const gradCx = effX * (wBlob + wDot) + petalCx * wPetal;
            const gradCy = effY * (wBlob + wDot) + petalCy * wPetal;
            const gradR = blobRadius * 1.15 * wBlob + blobRadius * 0.7 * wDot + petalA * wPetal;

            const grad = ctx.createRadialGradient(
                gradCx - gradR * 0.2, gradCy - gradR * 0.2, gradR * 0.05,
                gradCx, gradCy, gradR * (1.1 + energy * 0.5)
            );
            const core = lerpRGB(fg, [255, 255, 255], 0.3 + 0.7 * energy);
            grad.addColorStop(0, toRGBA(core));
            grad.addColorStop(Math.min(0.95, 0.35 + energy * 0.2), toRGBA(fg));
            grad.addColorStop(1, toRGBA(lerpRGB(fg, bg, 0.2 * wBlob), 1 - energy));

            ctx.fillStyle = grad;
            ctx.shadowColor = toRGBA(core, 0.8 + energy * 0.2);
            ctx.shadowBlur = (25 * wBlob + 8 * (wDot + wPetal) + energy * 30) * dpr;
            ctx.fill();
            ctx.shadowBlur = 0;

            if (wBlob > 0.05) {
                ctx.strokeStyle = toRGBA([255, 255, 255], 0.7 * wBlob);
                ctx.lineWidth = 1.5 * dpr;
                ctx.stroke();
            }
        };

        const drawHalftone = (nodes: Node[], wBlob: number, fg: number[], tPhase: number) => {
            // 22px rather than the original 15: this double loop is the single
            // biggest cost in the frame and scales with area.
            const spacing = Math.max(16 * res, 22 * dpr);
            const maxDist = Math.hypot(baseCX, baseCY);
            const gravity = Math.sin(tPhase * Math.PI);

            for (let x = 0; x < width; x += spacing) {
                for (let y = 0; y < height; y += spacing) {
                    let px = x, py = y;
                    let dx = px - centerX, dy = py - centerY;
                    let dist = Math.hypot(dx, dy);
                    let angle = Math.atan2(dy, dx);

                    if (gravity > 0.01 && dist > 10) {
                        const pull = Math.pow(1 - Math.min(1, dist / (maxDist * 0.8)), 2) * (20 * dpr) * gravity;
                        px -= Math.cos(angle) * pull;
                        py -= Math.sin(angle) * pull;
                        dx = px - centerX;
                        dy = py - centerY;
                        dist = Math.hypot(dx, dy);
                        angle = Math.atan2(dy, dx);
                    }

                    const spiralWave = Math.sin(dist * 0.015 - angle * 4 - time * 1.5);
                    const radialWave = Math.cos(dist * 0.05 - time * 0.6);

                    let shock = 0;
                    for (const sw of shockwaves) {
                        const diff = Math.abs(dist - sw.r);
                        if (diff < sw.width) {
                            const f = 1 - diff / sw.width;
                            shock += Math.sin(f * Math.PI) * sw.alpha * 2.2;
                            px += Math.cos(angle) * (f * 10 * dpr * sw.alpha);
                        }
                    }

                    let nodeInfluence = 0;
                    if (wBlob > 0.1) {
                        for (const n of nodes) {
                            const nd = Math.hypot(px - n.x, py - n.y);
                            if (nd < BLOB_RADIUS * 3.2 * dpr) {
                                nodeInfluence += Math.pow(1 - nd / (BLOB_RADIUS * 3.2 * dpr), 2) * 1.6 * wBlob;
                            }
                        }
                    }

                    const baseV3 = (Math.sin(px * 0.012) * Math.cos(py * 0.012) + 1.2) * (1.3 * dpr);
                    const radialV3 = Math.pow(dist / maxDist, 1.15) * (2.2 * dpr);
                    const rV3 = (baseV3 + spiralWave * (0.9 * dpr)) * (0.55 + radialV3 * 0.55);

                    const falloff = Math.max(0, 1 - Math.pow(dist / maxDist, 1.4));
                    const rBrand = (1.6 * dpr) * (1 + radialWave * 0.5) * falloff * 2.4;

                    let radius = rV3 * wBlob + rBrand * (1 - wBlob) + shock * (2.5 * dpr) - nodeInfluence * dpr;
                    radius = Math.max(0.15 * dpr, radius);

                    const aV3 = (dist / (maxDist * 0.6)) * 0.6 + spiralWave * 0.15 + shock * 0.5;
                    const aBrand = falloff * 0.8 + 0.1 + shock * 0.3;
                    const alpha = Math.min(0.98, Math.max(0.02, aV3 * wBlob + aBrand * (1 - wBlob) + gravity * 0.2));

                    ctx.fillStyle = toRGBA(fg, alpha);
                    ctx.beginPath();
                    ctx.arc(px, py, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const frame = () => {
            time += 0.022;
            centerX = baseCX + Math.sin(time * 0.3) * (40 * dpr);
            centerY = baseCY + Math.cos(time * 0.25) * (25 * dpr);

            const cycleTime = (time * 0.6) % (themes.length * CYCLE_DURATION);
            const currentIndex = Math.floor(cycleTime / CYCLE_DURATION);
            const nextIndex = (currentIndex + 1) % themes.length;
            const localTime = cycleTime % CYCLE_DURATION;

            if (currentIndex !== lastThemeIndex) {
                if (lastThemeIndex !== -1) {
                    triggerShockwave(0.8);
                    const nt = themes[nextIndex];
                    for (let i = 0; i < 40; i++) {
                        const ang = Math.random() * Math.PI * 2;
                        const sp = (Math.random() * 8 + 2) * dpr;
                        sparks.push({
                            x: centerX, y: centerY, prevX: centerX, prevY: centerY,
                            vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
                            color: nt.fg, alpha: 0.8, size: (Math.random() * 2 + 0.5) * dpr,
                        });
                    }
                }
                lastThemeIndex = currentIndex;
            }

            const rawT = Math.max(0, localTime - (CYCLE_DURATION - TRANSITION_DURATION)) / TRANSITION_DURATION;
            const tCol = easeInOutCubic(rawT);
            const tShape = easeInOutSine(rawT);
            const transitioning = rawT > 0 && rawT < 1;

            const cur = themes[currentIndex];
            const nxt = themes[nextIndex];
            const bg = lerpRGB(cur.bg, nxt.bg, tCol);
            const fg = lerpRGB(cur.fg, nxt.fg, tCol);
            const networkAlpha = lerp(cur.lines, nxt.lines, tCol);

            let wBlob = 0, wDot = 0, wPetal = 0;
            const add = (shape: Shape, w: number) => {
                if (shape === 'network') wBlob += w;
                else if (shape === 'dots') wDot += w;
                else wPetal += w;
            };
            add(cur.shape, 1 - tShape);
            add(nxt.shape, tShape);

            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = toRGBA(bg, 1);
            ctx.fillRect(0, 0, width, height);

            if (wBlob > 0.5 && !transitioning && time - lastShockwave > 3.2) {
                triggerShockwave(0.6);
                lastShockwave = time;
            }
            for (let i = shockwaves.length - 1; i >= 0; i--) {
                const sw = shockwaves[i];
                sw.r += sw.speed;
                sw.alpha *= 0.975;
                if (sw.r > sw.maxR || sw.alpha < 0.01) shockwaves.splice(i, 1);
            }

            const breath = Math.sin(time * 0.5) * (0.03 * wBlob) - Math.sin(rawT * Math.PI) * 0.15;
            const radius = BASE_RADIUS * (1 + breath) * dpr;
            const blobR = BLOB_RADIUS * (1 + breath * 0.5) * dpr;
            const rot = Math.sin(time * 0.25) * 0.12 + time * 0.06;

            const nodes: Node[] = [];
            for (let i = 0; i < NUM_NODES; i++) {
                const angle = rot + i * ((Math.PI * 2) / NUM_NODES) - Math.PI / 6;
                const r = radius + Math.sin(time * 2.1 + i * 1.5) * (10 * dpr) * wBlob;
                nodes.push({
                    x: centerX + Math.cos(angle) * r,
                    y: centerY + Math.sin(angle) * r,
                    angle, seed: i * 3.14, r,
                });
            }

            drawHalftone(nodes, wBlob, fg, rawT);

            if (networkAlpha > 0.05) {
                for (let layer = 1; layer <= 3; layer++) {
                    const s = 0.3 * layer + Math.sin(time * 1.8 + layer) * 0.04;
                    ctx.beginPath();
                    ctx.strokeStyle = toRGBA(fg, 0.06 * layer * networkAlpha);
                    ctx.lineWidth = 1.2 * dpr;
                    for (let i = 0; i < NUM_NODES; i++) {
                        const hx = centerX + (nodes[i].x - centerX) * s;
                        const hy = centerY + (nodes[i].y - centerY) * s;
                        if (i === 0) ctx.moveTo(hx, hy);
                        else ctx.lineTo(hx, hy);
                    }
                    ctx.closePath();
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.strokeStyle = toRGBA(fg, 0.8 * networkAlpha);
                ctx.lineWidth = 2.8 * dpr;
                ctx.shadowColor = toRGBA(fg, 0.9 * networkAlpha);
                ctx.shadowBlur = 15 * dpr;
                for (let i = 0; i < NUM_NODES; i++) {
                    const n = (i + 1) % NUM_NODES;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[n].x, nodes[n].y);
                }
                ctx.stroke();
                ctx.shadowBlur = 0;

                ctx.globalCompositeOperation = 'lighter';
                for (const pulse of energyPulses) {
                    pulse.progress += pulse.speed;
                    if (pulse.progress >= 1) {
                        pulse.progress = 0;
                        pulse.segment = (pulse.segment + 1) % NUM_NODES;
                    }
                    const p1 = nodes[pulse.segment];
                    const p2 = nodes[(pulse.segment + 1) % NUM_NODES];
                    const px = p1.x + (p2.x - p1.x) * pulse.progress;
                    const py = p1.y + (p2.y - p1.y) * pulse.progress;
                    const pg = ctx.createRadialGradient(px, py, 0, px, py, pulse.size * 4);
                    pg.addColorStop(0, toRGBA([255, 255, 255], networkAlpha));
                    pg.addColorStop(0.2, toRGBA(fg, 0.9 * networkAlpha));
                    pg.addColorStop(1, toRGBA(fg, 0));
                    ctx.fillStyle = pg;
                    ctx.beginPath();
                    ctx.arc(px, py, pulse.size * 4, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalCompositeOperation = 'source-over';
            }

            ctx.globalCompositeOperation = 'lighter';
            for (const p of particles) {
                p.life += 0.005 * p.speed;
                p.prevX = p.x;
                p.prevY = p.y;
                const dx = p.x - centerX, dy = p.y - centerY;
                const dist = Math.hypot(dx, dy) + 0.001;
                let swirl = Math.atan2(dy, dx) + Math.PI / 2;
                let fx = 0, fy = 0;
                if (transitioning) {
                    const e = Math.sin(rawT * Math.PI);
                    const pull = (0.5 - rawT) * 0.04;
                    fx -= dx * pull;
                    fy -= dy * pull;
                    swirl += e * 0.05;
                }
                p.vx += Math.cos(swirl) * 0.05 * dpr + fx + (Math.random() - 0.5) * 0.05;
                p.vy += Math.sin(swirl) * 0.05 * dpr + fy + (Math.random() - 0.5) * 0.05;
                p.vx *= 0.95;
                p.vy *= 0.95;
                p.x += p.vx;
                p.y += p.vy;
                if (p.life >= p.maxLife || dist > Math.max(width, height) * 0.8) resetParticle(p);

                const energy = Math.sin(rawT * Math.PI) * 2;
                const base = Math.sin((p.life / p.maxLife) * Math.PI);
                ctx.strokeStyle = toRGBA(fg, Math.min(1, base * (0.2 + 0.8 * networkAlpha) + energy * 0.5));
                ctx.lineWidth = p.size;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(p.prevX, p.prevY);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }

            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.prevX = s.x;
                s.prevY = s.y;
                s.x += s.vx;
                s.y += s.vy;
                s.vx *= 0.94;
                s.vy *= 0.94;
                s.alpha -= 0.015;
                if (s.alpha <= 0) {
                    sparks.splice(i, 1);
                    continue;
                }
                ctx.strokeStyle = toRGBA(s.color, s.alpha);
                ctx.lineWidth = s.size;
                ctx.beginPath();
                ctx.moveTo(s.prevX, s.prevY);
                ctx.lineTo(s.x, s.y);
                ctx.stroke();
            }
            ctx.globalCompositeOperation = 'source-over';

            for (let i = 0; i < NUM_NODES; i++) {
                drawOrb(nodes[i], blobR, wBlob, wDot, wPetal, fg, bg, rawT);
            }

            const vig = lerpRGBA(cur.vig, nxt.vig, tCol);
            const vg = ctx.createRadialGradient(
                centerX, centerY, radius * 0.85,
                centerX, centerY, Math.max(width, height) * 0.75
            );
            vg.addColorStop(0, toRGBA(vig, 0));
            vg.addColorStop(0.55, toRGBA(vig, vig[3] * 0.3));
            vg.addColorStop(1, toRGBA(vig, vig[3]));
            ctx.fillStyle = vg;
            ctx.fillRect(0, 0, width, height);

            if (transitioning) {
                const flash = Math.pow(Math.sin(rawT * Math.PI), 4) * 0.05;
                ctx.fillStyle = 'rgba(255,255,255,' + flash + ')';
                ctx.fillRect(0, 0, width, height);
            }

            if (!reduced) rafRef.current = requestAnimationFrame(frame);
        };

        // Reduced motion still gets the composition, just held still.
        frame();

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
        };
    }, [visible, reduced]);

    return (
        <div ref={wrapRef} className={`relative h-full w-full overflow-hidden ${className}`}>
            <canvas ref={canvasRef} className="block h-full w-full" />
        </div>
    );
};

/** The homepage section: heading plus the engine in a true 16:9 frame. */
const BrandMatrix = () => (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
        <div className="mx-auto mb-8 max-w-7xl px-6 md:mb-10 md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sunset">The Matrix</p>
            <h2 className="mt-4 font-editorial text-4xl leading-[1.02] md:text-6xl">
                One system, <span className="italic text-white/55">many faces.</span>
            </h2>
            <p className="mt-4 max-w-lg font-hand text-lg text-white/55">
                every brand I build is the same thinking wearing a different skin
            </p>
        </div>

        {/* Full-bleed 16:9 band — edge to edge, no frame */}
        <div className="aspect-video w-full overflow-hidden">
            <BrandMatrixCanvas />
        </div>
    </section>
);

export default BrandMatrix;
