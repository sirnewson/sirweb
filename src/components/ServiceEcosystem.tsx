import { Link } from 'react-router-dom';
import { ScrollReveal, Float } from './Animated';

const services = [
  {
    label: '01',
    title: 'Website Design & Digital Presence',
    desc: 'I prepare your business for the internet: premium websites, landing pages, and digital homes that make your brand look trusted, clear, and ready to sell.',
    keywords: 'Websites • Landing Pages • Portfolios • Business Sites',
    path: '/website',
    cta: 'Explore Website Services'
  },
  {
    label: '02',
    title: 'Brand Identity & Visual Systems',
    desc: 'I prepare your brand to be recognized and trusted: logo direction, visual identity, design systems, campaign look, and brand assets that make your business feel more valuable.',
    keywords: 'Branding • Logo Systems • Campaign Identity • Creative Direction',
    path: '/work',
    cta: 'View Brand Work'
  },
  {
    label: '03',
    title: 'AI Visuals, Content & Creative Systems',
    desc: 'I prepare your products, moments, and ideas for publishing: AI-assisted visuals, content concepts, reels direction, product visuals, and creative workflows for brands that need attention with taste.',
    keywords: 'AI Visuals • Content Systems • Product Ads • Motion Concepts',
    path: '/contact',
    cta: 'Start a Creative System'
  }
];

const ServiceEcosystem = () => {
  return (
    <section className="relative px-6 py-20 md:py-28 bg-neutral-black border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-hexagon-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <ScrollReveal direction="up" duration={0.6}>
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.25em] mb-4 font-mono">The Offer Architecture</p>
            <h2 className="font-display text-4xl md:text-6xl font-semibold text-white leading-tight">
              One creative partner to prepare everything the world judges first.
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              Before people call, buy, book, or trust you, they judge your digital presence. This is where I help: the website, the identity, the visuals, and the system behind how your brand is prepared to be seen.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              direction="up"
              delay={index * 0.08}
              duration={0.6}
            >
              <article className="group rounded-[16px] border border-white/10 bg-white/[0.03] p-8 hover:border-primary/50 hover:bg-clay/[0.06] transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-10">
                    <Float y={2.5} duration={4 + index} className="w-fit">
                      <span className="text-primary font-semibold tracking-widest block">{service.label}</span>
                    </Float>
                    <span className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/55 group-hover:bg-primary group-hover:text-black transition-colors">
                      <i className="fas fa-arrow-up-right-from-square text-xs" />
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-4 leading-tight">{service.title}</h3>
                  <p className="text-white/70 text-sm leading-7 mb-6">{service.desc}</p>
                </div>
                <div>
                  <p className="text-primary/80 text-[11px] font-bold uppercase tracking-[0.18em] mb-8 font-mono">{service.keywords}</p>
                  <Link to={service.path} className="inline-flex items-center gap-3 text-white font-semibold text-sm group-hover:text-primary transition-colors">
                    {service.cta}
                    <i className="fas fa-arrow-right text-xs" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceEcosystem;
