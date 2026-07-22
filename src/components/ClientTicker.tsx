import React from 'react';
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

export default function ClientTicker() {
  return (
    <section className="py-12 bg-black border-y border-white/[0.04] overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
      
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">Trusted by ambitious brands</p>
      </div>

      <div className="flex w-fit">
        <motion.div
          className="flex items-center gap-16 pr-16"
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {/* Double the array for seamless looping */}
          {[...clients, ...clients].map((img, i) => (
            <div key={i} className="flex-shrink-0 w-32 h-16 relative flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img 
                src={`/clients/${img}`} 
                alt="Client Logo" 
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
