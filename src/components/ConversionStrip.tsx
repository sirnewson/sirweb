import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const offers = [
  {
    title: 'Premium Websites',
    copy: 'Landing pages, portfolios, and business websites that make your brand look trusted and ready to sell.',
    path: '/website',
    cta: 'Build a Website'
  },
  {
    title: 'Brand Identity Systems',
    copy: 'Logo direction, visual language, campaign look, and design systems for brands that need stronger presence.',
    path: '/work',
    cta: 'See Brand Work'
  },
  {
    title: 'AI Visuals & Creative Direction',
    copy: 'Cinematic content, visual concepts, AI-assisted campaigns, and scroll-stopping design direction.',
    path: '/contact',
    cta: 'Start a Project'
  }
];

const ConversionStrip = () => {
  return (
    <section className="relative z-10 px-6 py-16 md:py-20 border-y border-white/5 bg-neutral-dark/70 backdrop-blur">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end mb-12">
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.25em] mb-4 font-mono">Work with Sir Newson</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight">
              Pick the outcome you want the internet to believe faster.
            </h2>
          </div>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl lg:ml-auto">
            I help businesses, creators, and founders turn raw ideas into premium digital presence: websites, brand systems, visuals, and conversion-ready creative structures.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group rounded-[12px] border border-white/10 bg-white/[0.03] p-7 hover:border-primary/50 hover:bg-clay/[0.06] transition-all duration-300"
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-[12px] bg-primary/10 text-primary font-semibold group-hover:bg-primary group-hover:text-black transition-colors">
                0{index + 1}
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-4">{offer.title}</h3>
              <p className="text-white/70 text-sm leading-7 mb-7">{offer.copy}</p>
              <Link to={offer.path} className="inline-flex items-center gap-3 text-primary font-semibold text-sm uppercase tracking-wider group-hover:gap-5 transition-all">
                {offer.cta}
                <i className="fas fa-arrow-right text-xs" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversionStrip;
