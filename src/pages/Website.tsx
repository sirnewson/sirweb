import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { ScrollReveal, Float, Magnetic } from '../components/Animated';

const packages = [
  {
    name: 'Website Fix-Up',
    price: 'KSh 22K – 52K',
    note: 'For brands with a site that already exists but feels tired, confusing, or not trusted enough.',
    items: ['Homepage cleanup', 'Visual hierarchy polish', 'CTA and WhatsApp flow', 'Mobile layout review']
  },
  {
    name: 'Premium One-Page Website',
    price: 'KSh 52K – 120K',
    note: 'For founders, creators, consultants, and small businesses that need to look serious fast.',
    items: ['Conversion-focused landing page', 'Copy direction', 'Premium visual layout', 'Contact and inquiry flow']
  },
  {
    name: 'Full Brand Website',
    price: 'KSh 120K – 270K',
    note: 'For businesses that need a complete online presence with structure, trust, and room to grow.',
    items: ['Home, about, services and contact', 'Portfolio or product sections', 'Basic SEO setup', 'Responsive design']
  },
  {
    name: 'Website + Content System',
    price: 'KSh 225K+',
    note: 'For brands that want more than a website: landing pages, content flow, offer structure, and automation thinking.',
    items: ['Website strategy', 'Content sections', 'Sales flow design', 'WhatsApp/client journey system']
  }
];

const proofPoints = [
  'Make the brand look trusted before the first call',
  'Turn scattered services into a clear offer journey',
  'Create pages that explain, sell, and reduce back-and-forth',
  'Design with mobile-first Kenyan buyer behavior in mind'
];

const websiteSamples = [
  {
    name: 'Nyukia Sali',
    url: 'https://nyukiasali.com/',
    note: 'A clean brand-first website presence shaped for clarity and trust.'
  },
  {
    name: 'OrdaFasta',
    url: 'https://ordafasta.com/',
    note: 'A conversion-focused web experience for fast product and order discovery.'
  },
  {
    name: 'TAK Network',
    url: 'https://taknetwork.co.ke/',
    note: 'A structured platform-style site for media, ideas, and network growth.'
  },
  {
    name: 'Big Voice Fest',
    url: 'https://bigvoicefest.com/',
    note: 'A festival site built to carry lineup, tickets and campaign in one place.'
  },
  {
    name: 'YXM Digital',
    url: 'https://yxm.digital/',
    note: 'A digital studio and product ecosystem presence for tools and services.'
  },
  {
    name: 'Mapenzi Vibandaski',
    url: 'https://mapenzivibandaski.co.ke/',
    note: 'A campaign and event website with personality, story, and direct conversion.'
  }
];

const Website = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1A0D06] text-[#F7F3ED] pt-32">
      <SEO
        title="Website Design in Kenya | Get Your Business Ready for the Internet | Sir Newson"
        description="Premium website design in Nairobi, Kenya. Landing pages, business websites and digital presence systems from KSh 22,000 — built to make your brand look trusted and ready to sell."
        keywords="website design Kenya, web designer Nairobi, landing page design Kenya, business website Kenya, website pricing Kenya, affordable website design Nairobi, ecommerce website Kenya"
        path="/website"
      />
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 sm:px-8 lg:px-12">
        <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-10 right-[-8%] h-96 w-96 rounded-full bg-[#F7F3ED]/10 blur-3xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-5 inline-flex rounded-[8px] border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary font-mono">
              Sir Newson Websites
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Websites that make your brand feel ready before you even speak.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#F7F3ED]/70">
              I prepare businesses for the internet. Websites, landing pages and digital presence systems for founders, creators and businesses that need to look trusted before the first call — not just pages, but a credibility machine.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Magnetic>
                <a
                  href="https://wa.me/254702480771?text=Hi%20Sir%20Newson%2C%20I%20want%20a%20website%20for%20my%20brand."
                  className="rounded-[8px] bg-primary px-7 py-4 text-center font-bold text-black transition hover:scale-[1.02] hover:bg-[#F7F3ED] block"
                >
                  Start on WhatsApp
                </a>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/work"
                  className="rounded-[8px] border border-[#F7F3ED]/20 px-7 py-4 text-center font-bold text-[#F7F3ED] transition hover:border-primary hover:text-primary block"
                >
                  View Work
                </Link>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-[16px] border border-[#F7F3ED]/10 bg-[#F7F3ED]/5 p-5 shadow-2xl shadow-black/30 backdrop-blur"
          >
            <div className="rounded-[12px] border border-primary/20 bg-black/30 p-6">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-primary" />
                <span className="h-3 w-3 rounded-full bg-[#F7F3ED]/30" />
                <span className="h-3 w-3 rounded-full bg-[#F7F3ED]/15" />
              </div>
              <div className="space-y-4">
                <div className="h-8 w-3/4 rounded-full bg-[#F7F3ED]/80" />
                <div className="h-4 w-full rounded-full bg-[#F7F3ED]/20" />
                <div className="h-4 w-4/5 rounded-full bg-[#F7F3ED]/20" />
                <div className="grid gap-4 pt-6 sm:grid-cols-2">
                  <div className="rounded-[12px] border border-[#F7F3ED]/10 bg-[#1A0D06] p-5">
                    <p className="text-sm text-primary">Before</p>
                    <p className="mt-3 text-2xl font-semibold">Confusing</p>
                    <p className="mt-2 text-sm text-[#F7F3ED]/50">Too much noise, weak trust, no clear next step.</p>
                  </div>
                  <div className="rounded-[12px] border border-primary/40 bg-primary p-5 text-black">
                    <p className="text-sm font-bold">After</p>
                    <p className="mt-3 text-2xl font-semibold">Premium</p>
                    <p className="mt-2 text-sm text-black/85">Clear offer, stronger trust, clean conversion path.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-4">
          {proofPoints.map((point, index) => (
            <ScrollReveal
              key={point}
              direction="up"
              delay={index * 0.08}
              duration={0.6}
            >
              <div className="rounded-[12px] border border-[#F7F3ED]/10 bg-[#F7F3ED]/5 p-6 h-full">
                <Float y={2} duration={3 + index} className="w-fit mb-4">
                  <p className="text-sm font-bold text-primary">0{index + 1}</p>
                </Float>
                <p className="text-lg font-semibold leading-7">{point}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary font-mono">Websites Done</p>
            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Live websites and digital platforms.</h2>
            <p className="mt-5 max-w-2xl text-[#F7F3ED]/65">
              Selected websites and product pages built around trust, clear navigation, mobile behavior, and strong brand presence.
            </p>
          </div>
          <Magnetic>
            <a
              href="https://wa.me/254702480771?text=Hi%20Sir%20Newson%2C%20I%20want%20a%20website%20like%20the%20samples%20on%20your%20site."
              className="inline-flex w-fit rounded-[8px] bg-primary px-7 py-4 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-[#F7F3ED] text-center"
            >
              Discuss a Website
            </a>
          </Magnetic>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {websiteSamples.map((site, index) => (
            <ScrollReveal
              key={site.url}
              direction="up"
              delay={index * 0.06}
              duration={0.6}
            >
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[16px] border border-[#F7F3ED]/10 bg-[#F7F3ED]/5 p-7 transition hover:-translate-y-1 hover:border-primary/50 hover:bg-[#F7F3ED]/10 h-full flex flex-col justify-between block"
              >
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#F7F3ED]/45 font-mono">Live Website</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-black transition group-hover:bg-[#F7F3ED]">
                      <i className="fas fa-external-link-alt text-xs" />
                    </span>
                  </div>
                  <h3 className="font-display text-3xl font-semibold">{site.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#F7F3ED]/60">{site.note}</p>
                </div>
                <div>
                  <p className="mt-6 text-sm font-bold text-primary">{site.url.replace('https://', '').replace('/', '')}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary font-mono">Packages</p>
          <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Pick the level of seriousness your brand needs.</h2>
          <p className="mt-5 text-[#F7F3ED]/65">This keeps low-budget chaos outside the gate and lets serious clients choose fast. The website should not arrive wearing bathroom slippers to a boardroom.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {packages.map((pkg, index) => (
            <ScrollReveal
              key={pkg.name}
              direction="up"
              delay={index * 0.08}
              duration={0.65}
            >
              <article className="rounded-[16px] border border-[#F7F3ED]/10 bg-[#F7F3ED]/5 p-7 transition hover:border-primary/50 hover:bg-[#F7F3ED]/10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{pkg.name}</h3>
                      <p className="mt-3 text-[#F7F3ED]/60">{pkg.note}</p>
                    </div>
                    <Float y={1.5} duration={3.5 + index} className="shrink-0">
                      <a
                        href={`https://wa.me/254702480771?text=${encodeURIComponent(`Hi Sir Newson, I'd like a quote for the ${pkg.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-[8px] bg-primary px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black transition hover:bg-clay"
                      >
                        Get a quote
                      </a>
                    </Float>
                  </div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-[#F7F3ED]/75">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <ScrollReveal direction="up" duration={0.75}>
          <div className="rounded-[16px] border border-primary/20 bg-primary p-8 text-black sm:p-12 lg:p-16">
            <p className="font-bold uppercase tracking-[0.25em] font-mono">Best for</p>
            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">People who already have something valuable, but the internet cannot tell yet.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {['Founders launching offers', 'Service businesses needing trust', 'Creators turning attention into sales'].map((item) => (
                <div key={item} className="rounded-[12px] bg-black/10 p-5 font-bold">{item}</div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8 lg:px-12">
        <ScrollReveal direction="up" duration={0.6}>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary font-mono">Process</p>
          <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Strategy first. Design second. Confusion last.</h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ['01', 'Clarity Call', 'We define the offer, buyer, proof, and the main action the page must drive.'],
            ['02', 'Design Direction', 'I shape the layout, copy flow, visual hierarchy, and premium feel.'],
            ['03', 'Build & Launch', 'The page goes live with responsive design, contact flow, and a clean handover.']
          ].map(([num, title, desc], index) => (
            <ScrollReveal
              key={title}
              direction="up"
              delay={index * 0.08}
              duration={0.65}
            >
              <div className="rounded-[12px] border border-[#F7F3ED]/10 bg-[#F7F3ED]/5 p-6 text-left h-full">
                <Float y={2} duration={4 + index} className="w-fit">
                  <p className="text-primary font-semibold">{num}</p>
                </Float>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#F7F3ED]/60">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:px-8 lg:px-12">
        <ScrollReveal direction="up" duration={0.75}>
          <h2 className="font-display text-4xl font-semibold sm:text-6xl">Your website should quietly do the selling before you enter the room.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[#F7F3ED]/65">Send your current site, idea, or business name. I’ll help you shape the right level of website for where your brand is going.</p>
          <div className="mt-9 flex justify-center">
            <Magnetic>
              <a
                href="https://wa.me/254702480771?text=Hi%20Sir%20Newson%2C%20I%20want%20to%20talk%20about%20a%20website%20project."
                className="inline-flex rounded-[8px] bg-[#F7F3ED] px-8 py-4 font-semibold text-[#1A0D06] transition hover:scale-[1.02] hover:bg-primary block text-center"
              >
                Talk Website Project
              </a>
            </Magnetic>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
};

export default Website;
