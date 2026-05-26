import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const packages = [
  {
    name: 'Website Fix-Up',
    price: 'KSh 15K – 35K',
    note: 'For brands with a site that already exists but feels tired, confusing, or not trusted enough.',
    items: ['Homepage cleanup', 'Visual hierarchy polish', 'CTA and WhatsApp flow', 'Mobile layout review']
  },
  {
    name: 'Premium One-Page Website',
    price: 'KSh 35K – 80K',
    note: 'For founders, creators, consultants, and small businesses that need to look serious fast.',
    items: ['Conversion-focused landing page', 'Copy direction', 'Premium visual layout', 'Contact and inquiry flow']
  },
  {
    name: 'Full Brand Website',
    price: 'KSh 80K – 180K',
    note: 'For businesses that need a complete online presence with structure, trust, and room to grow.',
    items: ['Home, about, services and contact', 'Portfolio or product sections', 'Basic SEO setup', 'Responsive design']
  },
  {
    name: 'Website + Content System',
    price: 'KSh 150K+',
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

const Website = () => {
  useEffect(() => {
    document.title = 'Website Design | Sir Newson';
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#011111] text-[#eefff4] pt-32">
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 sm:px-8 lg:px-12">
        <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-10 right-[-8%] h-96 w-96 rounded-full bg-[#eefff4]/10 blur-3xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-5 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Sir Newson Websites
            </p>
            <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Websites that make your brand feel ready before you even speak.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#eefff4]/70">
              Premium websites, landing pages, and digital presence systems for founders, creators, and businesses that need to look trusted, sharp, and ready to sell. Not just pages. A credibility machine.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/254702480771?text=Hi%20Sir%20Newson%2C%20I%20want%20a%20website%20for%20my%20brand."
                className="rounded-full bg-primary px-7 py-4 text-center font-bold text-black transition hover:scale-[1.02] hover:bg-[#eefff4]"
              >
                Start on WhatsApp
              </a>
              <Link
                to="/work"
                className="rounded-full border border-[#eefff4]/20 px-7 py-4 text-center font-bold text-[#eefff4] transition hover:border-primary hover:text-primary"
              >
                View Work
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-[2rem] border border-[#eefff4]/10 bg-[#eefff4]/5 p-5 shadow-2xl shadow-black/30 backdrop-blur"
          >
            <div className="rounded-[1.5rem] border border-primary/20 bg-black/30 p-6">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-primary" />
                <span className="h-3 w-3 rounded-full bg-[#eefff4]/30" />
                <span className="h-3 w-3 rounded-full bg-[#eefff4]/15" />
              </div>
              <div className="space-y-4">
                <div className="h-8 w-3/4 rounded-full bg-[#eefff4]/80" />
                <div className="h-4 w-full rounded-full bg-[#eefff4]/20" />
                <div className="h-4 w-4/5 rounded-full bg-[#eefff4]/20" />
                <div className="grid gap-4 pt-6 sm:grid-cols-2">
                  <div className="rounded-3xl border border-[#eefff4]/10 bg-[#011111] p-5">
                    <p className="text-sm text-primary">Before</p>
                    <p className="mt-3 text-2xl font-black">Confusing</p>
                    <p className="mt-2 text-sm text-[#eefff4]/50">Too much noise, weak trust, no clear next step.</p>
                  </div>
                  <div className="rounded-3xl border border-primary/40 bg-primary p-5 text-black">
                    <p className="text-sm font-bold">After</p>
                    <p className="mt-3 text-2xl font-black">Premium</p>
                    <p className="mt-2 text-sm text-black/70">Clear offer, stronger trust, clean conversion path.</p>
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
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-[#eefff4]/10 bg-[#eefff4]/5 p-6"
            >
              <p className="mb-4 text-sm font-bold text-primary">0{index + 1}</p>
              <p className="text-lg font-semibold leading-7">{point}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">Packages</p>
          <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl">Pick the level of seriousness your brand needs.</h2>
          <p className="mt-5 text-[#eefff4]/65">This keeps low-budget chaos outside the gate and lets serious clients choose fast. The website should not arrive wearing bathroom slippers to a boardroom.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {packages.map((pkg) => (
            <motion.article
              key={pkg.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-[#eefff4]/10 bg-[#eefff4]/5 p-7 transition hover:border-primary/50 hover:bg-[#eefff4]/10"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-black">{pkg.name}</h3>
                  <p className="mt-3 text-[#eefff4]/60">{pkg.note}</p>
                </div>
                <p className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-black text-black">{pkg.price}</p>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {pkg.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-[#eefff4]/75">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="rounded-[2rem] border border-primary/20 bg-primary p-8 text-black sm:p-12 lg:p-16">
          <p className="font-bold uppercase tracking-[0.25em]">Best for</p>
          <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl">People who already have something valuable, but the internet cannot tell yet.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {['Founders launching offers', 'Service businesses needing trust', 'Creators turning attention into sales'].map((item) => (
              <div key={item} className="rounded-3xl bg-black/10 p-5 font-bold">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8 lg:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">Process</p>
        <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl">Strategy first. Design second. Confusion last.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ['01', 'Clarity Call', 'We define the offer, buyer, proof, and the main action the page must drive.'],
            ['02', 'Design Direction', 'I shape the layout, copy flow, visual hierarchy, and premium feel.'],
            ['03', 'Build & Launch', 'The page goes live with responsive design, contact flow, and a clean handover.']
          ].map(([num, title, desc]) => (
            <div key={title} className="rounded-3xl border border-[#eefff4]/10 bg-[#eefff4]/5 p-6 text-left">
              <p className="text-primary font-black">{num}</p>
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#eefff4]/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:px-8 lg:px-12">
        <h2 className="font-display text-4xl font-black sm:text-6xl">Your website should quietly do the selling before you enter the room.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-[#eefff4]/65">Send your current site, idea, or business name. I’ll help you shape the right level of website for where your brand is going.</p>
        <a
          href="https://wa.me/254702480771?text=Hi%20Sir%20Newson%2C%20I%20want%20to%20talk%20about%20a%20website%20project."
          className="mt-9 inline-flex rounded-full bg-[#eefff4] px-8 py-4 font-black text-[#011111] transition hover:scale-[1.02] hover:bg-primary"
        >
          Talk Website Project
        </a>
      </section>

      <Footer />
    </main>
  );
};

export default Website;
