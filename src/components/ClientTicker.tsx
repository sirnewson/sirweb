import { motion } from 'framer-motion';

const clients = [
  'Asset 10.png',
  'Asset 4.png',
  'Asset 5.png',
  'LOGO PNG0.png',
  'Main Logo White.png',
  'PHONEPLACEKENYALOGO (2).webp',
  'TTNT 6 SEASONS.png',
  'Zunguka.png',
  'ewhite.png',
  'funcity logo.png',
  'gold white logo.png',
  'icon on dark.png',
  'logo icon@2x.png',
  'logo-tp-small.png',
  'logo0.png',
  'logoooo.png',
  'my logo.png',
  'print on red.png',
  'white logo.png',
  'white.png',
  'white@3x.png'
];

const half = Math.ceil(clients.length / 2);
const rowOne = clients.slice(0, half);
const rowTwo = clients.slice(half);

interface MarqueeRowProps {
  logos: string[];
  duration: number;
  reverse?: boolean;
}

const MarqueeRow = ({ logos, duration, reverse = false }: MarqueeRowProps) => (
  <div className="flex w-fit">
    <motion.div
      className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10"
      animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {/* Doubled so the loop is seamless */}
      {[...logos, ...logos].map((img, i) => (
        <div
          key={`${img}-${i}`}
          className="group flex h-24 w-40 shrink-0 items-center justify-center rounded-[12px] border border-warm-white/[0.08] bg-warm-white/[0.05] px-6 transition-all duration-300 hover:border-golden-hour/45 hover:bg-warm-white/[0.09] md:h-28 md:w-52"
        >
          <img
            src={`/clients/${img}`}
            alt="Client logo"
            className="max-h-full max-w-full object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </motion.div>
  </div>
);

export default function ClientTicker() {
  return (
    <section className="relative overflow-hidden border-y border-warm-white/[0.08] bg-soft-black py-14">
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-soft-black to-transparent md:w-32" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-soft-black to-transparent md:w-32" />

      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-golden-hour">Trusted With the Important Stuff</p>
        <p className="mt-3 text-sm text-warm-white/60 md:text-base">
          Product launches, event campaigns, announcements, catalogues and websites — for brands that could not afford to look unfinished.
        </p>
      </div>

      <div className="space-y-6">
        <MarqueeRow logos={rowOne} duration={38} />
        <MarqueeRow logos={rowTwo} duration={44} reverse />
      </div>
    </section>
  );
}
