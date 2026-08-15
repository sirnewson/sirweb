import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { getProposal, defaultPackages, defaultTimeline, defaultVisualPreviews, defaultOpportunities } from '../data/proposals';
import type { ProposalData } from '../data/proposals';
import { uploadedAssets } from '../data/uploadAssets';
import type { UploadAsset } from '../data/uploadAssets';
import MediaModal from '../components/MediaModal';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const buildWhatsAppUrl = (phone: string, message: string) => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────

const Section = ({
  id,
  children,
  className = '',
  style,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`px-5 md:px-10 lg:px-16 max-w-7xl mx-auto ${className}`}
      style={style}
    >
      {children}
    </motion.section>
  );
};

// ─── Section Label ─────────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={fadeUp} custom={0} className="mb-4">
    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F28B2C] border border-[#F28B2C]/30 px-3 py-1.5 rounded-[8px]">
      <span className="w-1 h-1 rounded-full bg-[#F28B2C] inline-block" />
      {children}
    </span>
  </motion.div>
);

// ─── Section Title ─────────────────────────────────────────────────────────────

const SectionTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.h2
    variants={fadeUp}
    custom={0.1}
    className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F7F3ED] leading-tight ${className}`}
  >
    {children}
  </motion.h2>
);

// ─── Keyword Tag ───────────────────────────────────────────────────────────────

const KeywordTag = ({ children, delay = 0 }: { children: string; delay?: number }) => (
  <motion.span
    variants={fadeUp}
    custom={delay}
    className="inline-block text-sm font-bold text-[#F28B2C] border border-[#F28B2C]/40 bg-[#F28B2C]/5 px-4 py-2 rounded-[8px] hover:bg-[#F28B2C]/10 hover:border-[#F28B2C]/70 transition-all duration-300 cursor-default"
  >
    {children}
  </motion.span>
);

// ─── Insight Card ─────────────────────────────────────────────────────────────

const InsightCard = ({
  icon,
  label,
  text,
  delay = 0,
}: {
  icon: string;
  label: string;
  text: string;
  delay?: number;
}) => (
  <motion.div
    variants={fadeUp}
    custom={delay}
    className="group relative p-8 rounded-[12px] border border-[#F28B2C]/10 bg-[#071A1A] hover:border-[#F28B2C]/30 transition-all duration-500 hover:shadow-[0_0_40px_#F28B2C10]"
  >
    <div className="text-3xl mb-4">{icon}</div>
    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F28B2C] mb-3">{label}</div>
    <p className="text-[#AFC9C3] text-sm leading-relaxed">{text}</p>
    <div className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-[#F28B2C]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </motion.div>
);

// ─── Opportunity Card ─────────────────────────────────────────────────────────

const OpportunityCard = ({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    variants={fadeUp}
    custom={delay}
    className="group p-7 rounded-[12px] border border-white/5 bg-[#071A1A]/60 hover:border-[#F28B2C]/25 transition-all duration-400 hover:-translate-y-1"
  >
    <div className="text-2xl mb-4">{icon}</div>
    <h3 className="font-display text-lg font-bold text-[#F7F3ED] mb-2">{title}</h3>
    <p className="text-[#AFC9C3] text-sm leading-relaxed">{description}</p>
  </motion.div>
);

// ─── Deliverable Item ─────────────────────────────────────────────────────────

const DeliverableItem = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <motion.div
    variants={fadeUp}
    custom={delay}
    className="flex items-center gap-3 p-4 rounded-[10px] border border-white/5 bg-[#071A1A]/40 hover:border-[#F28B2C]/20 transition-all duration-300 group"
  >
    <span className="w-5 h-5 rounded-full bg-[#F28B2C]/10 border border-[#F28B2C]/30 flex items-center justify-center flex-shrink-0">
      <span className="w-2 h-2 rounded-full bg-[#F28B2C]" />
    </span>
    <span className="text-[#F7F3ED]/80 text-sm group-hover:text-[#F7F3ED] transition-colors">{text}</span>
  </motion.div>
);

// ─── Pricing Card ─────────────────────────────────────────────────────────────

const PricingCard = ({
  pkg,
  clientName,
  whatsappNumber,
  delay = 0,
}: {
  pkg: { name: string; price: string; description: string; features: string[]; recommended?: boolean };
  clientName: string;
  whatsappNumber: string;
  delay?: number;
}) => {
  const waMsg = `Hello Sir Newson, I have reviewed the proposal for ${clientName} and I'm interested in the ${pkg.name} package. Let's discuss.`;
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className={`relative flex flex-col rounded-[12px] p-8 border transition-all duration-500 hover:-translate-y-2 ${
        pkg.recommended
          ? 'border-[#F28B2C]/50 bg-[#071A1A] shadow-[0_0_60px_#F28B2C15]'
          : 'border-white/8 bg-[#071A1A]/60 hover:border-[#F28B2C]/20'
      }`}
    >
      {pkg.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F28B2C] text-black text-[11px] font-bold px-4 py-1.5 rounded-[8px] uppercase tracking-widest whitespace-nowrap">
          Recommended
        </div>
      )}
      <div className="mb-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#AFC9C3]">{pkg.name} Package</span>
        <div className="mt-3 text-3xl font-bold text-[#F28B2C] font-display">{pkg.price}</div>
        <p className="mt-3 text-[#AFC9C3] text-sm leading-relaxed">{pkg.description}</p>
      </div>
      <ul className="space-y-3 flex-1 mb-8 border-t border-white/5 pt-6">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[#F7F3ED]/70">
            <span className="text-[#F28B2C] mt-0.5 flex-shrink-0">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={buildWhatsAppUrl(whatsappNumber, waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-4 rounded-[12px] font-bold text-sm text-center transition-all duration-300 ${
          pkg.recommended
            ? 'bg-[#F28B2C] text-black hover:bg-clay hover:shadow-[0_0_30px_#F28B2C60]'
            : 'bg-white/5 text-[#F7F3ED] border border-white/10 hover:bg-[#F28B2C]/10 hover:border-[#F28B2C]/40'
        }`}
      >
        Select {pkg.name} Package
      </a>
    </motion.div>
  );
};

// ─── Process Step ─────────────────────────────────────────────────────────────

const ProcessStep = ({
  number,
  title,
  description,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div variants={fadeUp} custom={delay} className="relative">
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full border border-[#F28B2C]/40 bg-[#F28B2C]/5 flex items-center justify-center flex-shrink-0">
          <span className="text-[#F28B2C] font-bold text-sm font-display">{number}</span>
        </div>
        <div className="w-px flex-1 mt-4 bg-gradient-to-b from-[#F28B2C]/20 to-transparent" />
      </div>
      <div className="pb-10">
        <h3 className="font-display text-xl font-bold text-[#F7F3ED] mb-2">{title}</h3>
        <p className="text-[#AFC9C3] text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

// ─── Visual Preview Placeholder ───────────────────────────────────────────────

const VisualPreviewCard = ({
  title,
  subtitle,
  image,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  image?: string;
  delay?: number;
}) => (
  <motion.div
    variants={fadeUp}
    custom={delay}
    className="group relative rounded-[12px] overflow-hidden border border-white/8 bg-[#071A1A] hover:border-[#F28B2C]/30 transition-all duration-500 hover:-translate-y-1"
  >
    <div className="aspect-[4/3] relative overflow-hidden">
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#071A1A] via-[#0a2222] to-[#071A1A] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-[12px] border border-[#F28B2C]/20 bg-[#F28B2C]/5 flex items-center justify-center mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F28B2C" strokeWidth="1.5" strokeOpacity="0.6">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
            <span className="text-[#AFC9C3]/50 text-xs font-medium">Visual Preview</span>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D06]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
    <div className="p-5">
      <h4 className="font-display font-bold text-[#F7F3ED] text-sm mb-1">{title}</h4>
      <p className="text-[#AFC9C3] text-xs">{subtitle}</p>
    </div>
  </motion.div>
);

// ─── Timeline Item ────────────────────────────────────────────────────────────

const TimelineItem = ({
  period,
  task,
  delay = 0,
}: {
  period: string;
  task: string;
  delay?: number;
}) => (
  <motion.div
    variants={fadeUp}
    custom={delay}
    className="flex gap-5 group"
  >
    <div className="flex-shrink-0 pt-1">
      <span className="inline-block font-bold text-xs text-[#F28B2C] font-display w-20">{period}</span>
    </div>
    <div className="flex-1 pb-6 border-b border-white/5 group-last:border-0">
      <p className="text-[#F7F3ED]/80 text-sm leading-relaxed group-hover:text-[#F7F3ED] transition-colors">{task}</p>
    </div>
  </motion.div>
);

// ─── Navbar (Proposal-specific, no site nav) ──────────────────────────────────

const ProposalNav = ({ proposal }: { proposal: ProposalData }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Direction', href: '#direction' },
    { label: 'Deliverables', href: '#deliverables' },
    { label: 'Investment', href: '#investment' },
    { label: 'Process', href: '#process' },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const waMsg = proposal.ctaMessage ?? `Hello Sir Newson, I have reviewed the proposal for ${proposal.clientName} and would like to discuss the next step.`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#1A0D06]/90 backdrop-blur-2xl border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-display font-bold text-[#F7F3ED] text-sm tracking-wider hover:text-[#F28B2C] transition-colors">
            SIR NEWSON
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[#AFC9C3] text-xs font-medium hover:text-[#F7F3ED] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <a
            href={buildWhatsAppUrl(proposal.whatsappNumber, waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-[#F28B2C] text-black text-xs font-bold px-5 py-2.5 rounded-[8px] hover:bg-clay transition-all duration-300 hover:shadow-[0_0_25px_#F28B2C60]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Discuss Proposal
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#F7F3ED] p-2"
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 inset-x-0 z-40 bg-[#1A0D06]/95 backdrop-blur-2xl border-b border-white/5 py-6 px-5"
          >
            <nav className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-[#F7F3ED] text-sm font-medium py-2 border-b border-white/5 hover:text-[#F28B2C] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <a
              href={buildWhatsAppUrl(proposal.whatsappNumber, waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#F28B2C] text-black text-sm font-bold px-5 py-3.5 rounded-[12px] w-full"
            >
              Discuss Proposal on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Floating Mobile CTA ──────────────────────────────────────────────────────

const FloatingCTA = ({ proposal }: { proposal: ProposalData }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const waMsg = proposal.ctaMessage ?? `Hello Sir Newson, I have reviewed the proposal for ${proposal.clientName} and would like to discuss the next step.`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
        >
          <a
            href={buildWhatsAppUrl(proposal.whatsappNumber, waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#F28B2C] text-black text-sm font-bold px-5 py-4 rounded-[12px] w-full shadow-[0_8px_40px_#F28B2C50]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Discuss Proposal
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Main Proposal Page ───────────────────────────────────────────────────────

const Proposal = () => {
  const { slug } = useParams<{ slug?: string }>();
  const proposal = getProposal(slug);
  const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string; type: 'image' | 'video' } | null>(null);

  const packages = proposal.packages ?? defaultPackages;
  const timeline = proposal.timeline ?? defaultTimeline;
  const visualPreviews = proposal.visualPreviews ?? defaultVisualPreviews;
  const opportunities = proposal.opportunities ?? defaultOpportunities;

  // A curated list of works for the proposal page showcase
  const showcaseIds = [
    'motion-tenacity-big-f6-locks-reel',
    'motion-big-screen-countdown',
    'motion-erling-haaland-viking-motion',
    'branding-wibo-branding-board',
    'graphics-matatu-musical-event-poster',
    'branding-farmplus-product-mockups',
    'motion-black-warrior-facing-castle-scene',
    'graphics-ttnt-season-6-event-poster',
    'branding-taikom-phones-branding-board'
  ];
  const showcaseAssets = showcaseIds
    .map(id => uploadedAssets.find(a => a.id === id))
    .filter((a): a is UploadAsset => !!a);

  const waMsg =
    proposal.ctaMessage ??
    `Hello Sir Newson, I have reviewed the proposal for ${proposal.clientName} and would like to discuss the next step.`;

  // Inject noindex for client-specific pages
  useEffect(() => {
    document.title = `Visual Growth Proposal for ${proposal.clientName} | Sir Newson`;

    // Update/add description
    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute(
      'content',
      `A private creative proposal by Sir Newson, designed to help ${proposal.clientName} build stronger visual communication, brand trust, and digital presence.`
    );

    // Noindex for client-specific pages
    if (slug) {
      let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex, nofollow');
    }

    window.scrollTo({ top: 0 });
  }, [slug, proposal.clientName]);

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: '#1A0D06',
        color: '#F7F3ED',
        backgroundImage: `
          radial-gradient(ellipse at 20% 0%, rgba(242,139,44,0.04) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 100%, rgba(242,139,44,0.03) 0%, transparent 50%)
        `,
      }}
    >
      {/* SEO noindex is handled via useEffect above */}
      <ProposalNav proposal={proposal} />
      <FloatingCTA proposal={proposal} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center px-5 md:px-10 lg:px-16 pt-28 pb-24 overflow-hidden">
        {/* Background video (water loop) */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0D06]/80 via-transparent to-[#1A0D06] z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-15 scale-105"
          >
            <source src="/uploads/motion%20and%20video/water-background.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(242,139,44,0.05) 0%, transparent 70%)' }}
          />
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(242,139,44,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(242,139,44,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Label */}
            <motion.div variants={fadeUp} custom={0} className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F28B2C] border border-[#F28B2C]/30 px-3 py-1.5 rounded-[8px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F28B2C] animate-pulse inline-block" />
                {proposal.proposalLabel}
              </span>
              {proposal.industry && (
                <span className="text-[11px] font-medium text-[#AFC9C3] uppercase tracking-widest">
                  · {proposal.industry}
                </span>
              )}
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] text-[#F7F3ED] mb-6"
            >
              Visual Growth
              <br />
              <span className="text-[#F28B2C]">Proposal</span>
              {proposal.clientName !== 'Your Brand' && (
                <>
                  <br />
                  <span className="text-[#F7F3ED]/60">for {proposal.clientName}</span>
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-[#AFC9C3] text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
            >
              {proposal.heroSubtitle}
            </motion.p>

            {/* Prepared by */}
            <motion.div variants={fadeUp} custom={0.25} className="mb-10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F28B2C]/10 border border-[#F28B2C]/30 flex items-center justify-center">
                <span className="text-[#F28B2C] text-xs font-bold">SN</span>
              </div>
              <div>
                <p className="text-[11px] text-[#AFC9C3] uppercase tracking-widest">Prepared by</p>
                <p className="text-sm font-bold text-[#F7F3ED]">{proposal.preparedBy} · sirnewson.com</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={0.3} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('overview');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#F28B2C] text-black font-bold px-8 py-4 rounded-[12px] hover:bg-clay transition-all duration-300 hover:shadow-[0_0_40px_#F28B2C60] text-sm"
              >
                View Proposal
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </button>
              <a
                href={buildWhatsAppUrl(proposal.whatsappNumber, waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#F7F3ED] font-bold px-8 py-4 rounded-[12px] border border-white/15 hover:border-[#F28B2C]/50 hover:text-[#F28B2C] transition-all duration-300 text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Discuss on WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-0 right-0 flex justify-center"
          >
            <div className="flex flex-col items-center gap-2 text-[#AFC9C3]/40">
              <span className="text-[10px] uppercase tracking-widest">Scroll</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#F28B2C]/15 to-transparent mx-5 md:mx-16" />

      {/* ── Client Snapshot (What I See) ──────────────────────────────────── */}
      <Section id="overview" className="py-24">
        <SectionLabel>What I See</SectionLabel>
        <SectionTitle className="mb-4">
          I've studied your brand.
          <br />
          <span className="text-[#F7F3ED]/50">Here's what I found.</span>
        </SectionTitle>
        <motion.p variants={fadeUp} custom={0.2} className="text-[#AFC9C3] text-lg max-w-2xl mb-14 leading-relaxed">
          Before proposing any creative direction, I take time to understand where a brand is, what it has, and where it can go.
        </motion.p>

        <motion.div variants={fadeUp} custom={0} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InsightCard
            icon="💪"
            label="Current Strength"
            text={proposal.insights.currentStrength}
            delay={0.1}
          />
          <InsightCard
            icon="🔍"
            label="Hidden Opportunity"
            text={proposal.insights.hiddenOpportunity}
            delay={0.2}
          />
          <InsightCard
            icon="⚠️"
            label="Creative Gap"
            text={proposal.insights.creativeGap}
            delay={0.3}
          />
        </motion.div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-5 md:mx-16 my-4" />

      {/* ── Opportunity Section ───────────────────────────────────────────── */}
      <Section className="py-24">
        <SectionLabel>The Opportunity</SectionLabel>
        <SectionTitle className="mb-4">
          Better creative work
          <br />
          <span className="text-[#F7F3ED]/50">changes how business flows.</span>
        </SectionTitle>
        <motion.p variants={fadeUp} custom={0.2} className="text-[#AFC9C3] text-lg max-w-2xl mb-14 leading-relaxed">
          Here's what becomes possible when visual communication is done with strategy, intentionality, and creative excellence.
        </motion.p>

        <motion.div variants={fadeUp} custom={0} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {opportunities.map((opp, i) => (
            <OpportunityCard
              key={i}
              icon={opp.icon}
              title={opp.title}
              description={opp.description}
              delay={i * 0.08}
            />
          ))}
        </motion.div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-5 md:mx-16 my-4" />

      {/* ── Creative Direction ─────────────────────────────────────────────── */}
      <Section id="direction" className="py-24">
        <SectionLabel>Proposed Creative Direction</SectionLabel>
        <SectionTitle className="mb-4">
          This is how your brand
          <br />
          <span className="text-[#F28B2C]">should look and feel.</span>
        </SectionTitle>
        <motion.p variants={fadeUp} custom={0.2} className="text-[#AFC9C3] text-lg max-w-2xl mb-14 leading-relaxed">
          {proposal.directionSummary}
        </motion.p>

        {/* Direction Details */}
        {(proposal.toneOfVoice || proposal.campaignDirection || proposal.contentDirection || proposal.designDirection) && (
          <motion.div variants={fadeUp} custom={0.3} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {proposal.toneOfVoice && (
              <div className="p-6 rounded-[12px] border border-white/8 bg-[#071A1A]/50">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#F28B2C] mb-2">Tone of Voice</p>
                <p className="text-[#F7F3ED]/80 text-sm">{proposal.toneOfVoice}</p>
              </div>
            )}
            {proposal.campaignDirection && (
              <div className="p-6 rounded-[12px] border border-white/8 bg-[#071A1A]/50">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#F28B2C] mb-2">Campaign Direction</p>
                <p className="text-[#F7F3ED]/80 text-sm">{proposal.campaignDirection}</p>
              </div>
            )}
            {proposal.contentDirection && (
              <div className="p-6 rounded-[12px] border border-white/8 bg-[#071A1A]/50">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#F28B2C] mb-2">Content Direction</p>
                <p className="text-[#F7F3ED]/80 text-sm">{proposal.contentDirection}</p>
              </div>
            )}
            {proposal.designDirection && (
              <div className="p-6 rounded-[12px] border border-white/8 bg-[#071A1A]/50">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#F28B2C] mb-2">Design Direction</p>
                <p className="text-[#F7F3ED]/80 text-sm">{proposal.designDirection}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Keywords */}
        <motion.div variants={fadeUp} custom={0.4} className="flex flex-wrap gap-3">
          {proposal.directionKeywords.map((keyword, i) => (
            <KeywordTag key={i} delay={i * 0.05}>{keyword}</KeywordTag>
          ))}
        </motion.div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-5 md:mx-16 my-4" />

      {/* ── Visual Preview ─────────────────────────────────────────────────── */}
      <Section className="py-24">
        <SectionLabel>Visual Preview</SectionLabel>
        <SectionTitle className="mb-4">
          What the creative work
          <br />
          <span className="text-[#F7F3ED]/50">will look like.</span>
        </SectionTitle>
        <motion.p variants={fadeUp} custom={0.2} className="text-[#AFC9C3] text-lg max-w-2xl mb-14 leading-relaxed">
          Below is a preview of the creative directions and content formats planned for {proposal.clientName}. Mockup visuals will be produced after confirmation.
        </motion.p>

        <motion.div variants={fadeUp} custom={0} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visualPreviews.map((item, i) => (
            <VisualPreviewCard
              key={i}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              delay={i * 0.07}
            />
          ))}
        </motion.div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-5 md:mx-16 my-4" />

      {/* ── Deliverables ───────────────────────────────────────────────────── */}
      <Section id="deliverables" className="py-24">
        <SectionLabel>Recommended Deliverables</SectionLabel>
        <SectionTitle className="mb-4">
          What you'll receive
          <br />
          <span className="text-[#F7F3ED]/50">every month.</span>
        </SectionTitle>
        <motion.p variants={fadeUp} custom={0.2} className="text-[#AFC9C3] text-lg max-w-2xl mb-14 leading-relaxed">
          Each deliverable is designed with a purpose — to move {proposal.clientName} closer to stronger brand presence, better trust, and more consistent growth.
        </motion.p>

        <motion.div variants={fadeUp} custom={0} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {proposal.deliverables.map((item, i) => (
            <DeliverableItem key={i} text={item} delay={i * 0.05} />
          ))}
        </motion.div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-5 md:mx-16 my-4" />

      {/* ── Packages / Investment ──────────────────────────────────────────── */}
      <Section id="investment" className="py-24">
        <SectionLabel>Investment Options</SectionLabel>
        <SectionTitle className="mb-4">
          Choose the level of
          <br />
          <span className="text-[#F28B2C]">creative partnership.</span>
        </SectionTitle>
        <motion.p variants={fadeUp} custom={0.2} className="text-[#AFC9C3] text-lg max-w-2xl mb-14 leading-relaxed">
          Every package is built for results, not just deliverables. The right fit depends on the pace of growth you're ready for.
        </motion.p>

        <motion.div variants={fadeUp} custom={0} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <PricingCard
              key={i}
              pkg={pkg}
              clientName={proposal.clientName}
              whatsappNumber={proposal.whatsappNumber}
              delay={i * 0.1}
            />
          ))}
        </motion.div>

        {/* Custom option */}
        <motion.div
          variants={fadeUp}
          custom={0.4}
          className="mt-8 p-8 rounded-[12px] border border-dashed border-white/15 bg-[#071A1A]/30 text-center"
        >
          <p className="text-[#AFC9C3] text-sm mb-4">
            Need something tailored? I offer <span className="text-[#F7F3ED] font-semibold">custom packages</span> for brands with specific requirements or larger scopes.
          </p>
          <a
            href={buildWhatsAppUrl(proposal.whatsappNumber, `Hello Sir Newson, I'd like to discuss a custom creative package for ${proposal.clientName}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#F28B2C] text-sm font-bold hover:underline"
          >
            Request Custom Package
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-5 md:mx-16 my-4" />

      {/* ── Why Sir Newson ─────────────────────────────────────────────────── */}
      <Section className="py-24">
        <SectionLabel>Why Sir Newson</SectionLabel>
        <SectionTitle className="mb-4">
          More than a designer.
          <br />
          <span className="text-[#F7F3ED]/50">A creative partner.</span>
        </SectionTitle>
        <motion.p variants={fadeUp} custom={0.2} className="text-[#AFC9C3] text-lg max-w-2xl mb-14 leading-relaxed">
          Sir Newson combines design, storytelling, AI-assisted creative production, strategy, and social-first thinking to help brands communicate better, faster, and with more emotional impact.
        </motion.p>

        <motion.div variants={fadeUp} custom={0} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {[
            { icon: '🎨', label: '6+ Years Experience', desc: 'Professional creative work across brand identity, campaigns, and digital media.' },
            { icon: '🤖', label: 'AI-Enhanced Workflows', desc: 'Faster creative production without sacrificing quality — using the latest AI tools.' },
            { icon: '📲', label: 'Social-First Thinking', desc: 'Every asset is designed for real platforms — Instagram, WhatsApp, TikTok, Facebook.' },
            { icon: '🧩', label: 'Strategy + Visuals', desc: 'Not just making things look good — building creative systems that serve business goals.' },
            { icon: '⚡', label: 'Fast Creative Execution', desc: 'Quick turnarounds without compromising on craft or strategic depth.' },
            { icon: '🌍', label: 'Kenyan Brand Experience', desc: 'Deep understanding of local markets, consumer behaviour, and cultural context.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.07}
              className="flex gap-4 p-6 rounded-[12px] border border-white/5 bg-[#071A1A]/40 hover:border-[#F28B2C]/20 transition-all duration-300"
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-bold text-[#F7F3ED] text-sm mb-1">{item.label}</p>
                <p className="text-[#AFC9C3] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-5 md:mx-16 my-4" />

      {/* ── Process ────────────────────────────────────────────────────────── */}
      <Section id="process" className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>How We'll Work</SectionLabel>
            <SectionTitle className="mb-4">
              A clear process.
              <br />
              <span className="text-[#F7F3ED]/50">No guesswork.</span>
            </SectionTitle>
            <motion.p variants={fadeUp} custom={0.2} className="text-[#AFC9C3] text-lg leading-relaxed">
              Every project follows a structured creative process designed to move efficiently from understanding to execution to growth.
            </motion.p>
          </div>

          <div className="pt-4">
            <ProcessStep
              number="01"
              title="Discovery"
              description="Understand the brand, offer, audience, goals, and current creative gaps. This forms the foundation of everything."
              delay={0.1}
            />
            <ProcessStep
              number="02"
              title="Direction"
              description="Define the visual direction, tone of voice, messaging structure, content plan, and campaign strategy."
              delay={0.15}
            />
            <ProcessStep
              number="03"
              title="Production"
              description="Design and deliver the agreed creative assets — posters, social media content, campaign visuals, and marketing materials."
              delay={0.2}
            />
            <ProcessStep
              number="04"
              title="Review & Growth"
              description="Refine the creative direction based on feedback, performance insights, and evolving business needs. Improve every cycle."
              delay={0.25}
            />
          </div>
        </div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-5 md:mx-16 my-4" />

      {/* ── Timeline ───────────────────────────────────────────────────────── */}
      <Section className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Timeline</SectionLabel>
            <SectionTitle className="mb-4">
              From brief to
              <br />
              <span className="text-[#F28B2C]">live creative.</span>
            </SectionTitle>
            <motion.p variants={fadeUp} custom={0.2} className="text-[#AFC9C3] text-lg leading-relaxed">
              A clear timeline so you know exactly when to expect work, reviews, and ongoing production.
            </motion.p>
          </div>

          <div className="pt-2">
            {timeline.map((item, i) => (
              <TimelineItem key={i} period={item.period} task={item.task} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#F28B2C]/15 to-transparent mx-5 md:mx-16 my-4" />

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section className="relative py-32 px-5 md:px-10 lg:px-16 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(242,139,44,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F28B2C] border border-[#F28B2C]/30 px-3 py-1.5 rounded-[8px] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28B2C] animate-pulse inline-block" />
              Ready to Begin
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F7F3ED] mb-6 leading-tight"
            >
              Ready to Build a Stronger
              <br />
              <span className="text-[#F28B2C]">Visual Presence?</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-[#AFC9C3] text-lg mb-12 max-w-xl mx-auto leading-relaxed"
            >
              If this direction feels aligned, the next step is to confirm the package, agree on the first creative direction, and begin building the visual system for {proposal.clientName}.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
            >
              <a
                href={buildWhatsAppUrl(
                  proposal.whatsappNumber,
                  `Hello Sir Newson, I'd like to accept the proposal for ${proposal.clientName}. What are the next steps?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F28B2C] text-black font-bold px-8 py-4 rounded-[12px] hover:bg-clay transition-all duration-300 hover:shadow-[0_0_50px_#F28B2C70] text-sm min-w-[200px] justify-center"
              >
                ✓ Accept Proposal
              </a>

              <a
                href={buildWhatsAppUrl(proposal.whatsappNumber, waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#071A1A] text-[#F7F3ED] font-bold px-8 py-4 rounded-[12px] border border-white/15 hover:border-[#F28B2C]/40 hover:text-[#F28B2C] transition-all duration-300 text-sm min-w-[200px] justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Discuss on WhatsApp
              </a>

              <a
                href={buildWhatsAppUrl(
                  proposal.whatsappNumber,
                  `Hello Sir Newson, I've reviewed the proposal for ${proposal.clientName} and I'd like to request a few adjustments before proceeding.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-[#AFC9C3] font-bold px-8 py-4 rounded-[12px] border border-white/10 hover:border-white/25 hover:text-[#F7F3ED] transition-all duration-300 text-sm min-w-[200px] justify-center"
              >
                Request Adjustments
              </a>
            </motion.div>

            {proposal.projectNotes && (
              <motion.div
                variants={fadeUp}
                custom={0.4}
                className="mt-12 p-6 rounded-[12px] border border-white/8 bg-[#071A1A]/50 text-left max-w-2xl mx-auto"
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#F28B2C] mb-2">Project Notes</p>
                <p className="text-[#AFC9C3] text-sm leading-relaxed">{proposal.projectNotes}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Portfolio Showcase ─────────────────────────────────────────────────── */}
      <Section className="py-24 border-t" style={{ borderColor: 'rgba(242,139,44,0.08)' }}>
        <SectionLabel>Proven Results</SectionLabel>
        <SectionTitle className="mb-4">
          Selected Creative Work
          <br />
          <span className="text-[#F7F3ED]/50">built for impact.</span>
        </SectionTitle>
        <motion.p variants={fadeUp} custom={0.2} className="text-[#AFC9C3] text-lg max-w-2xl mb-14 leading-relaxed">
          A selection of brand systems, campaign designs, and cinematic motion reels from the active studio archives.
        </motion.p>

        {/* Portfolio Grid */}
        <motion.div
          variants={fadeUp}
          custom={0.3}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {showcaseAssets.map((asset) => (
            <motion.div
              key={asset.id}
              onClick={() => setSelectedMedia({ src: asset.src, title: asset.title, type: asset.type })}
              className="break-inside-avoid overflow-hidden rounded-[12px] border border-white/8 bg-[#071A1A]/60 hover:border-[#F28B2C]/40 transition-all duration-300 group cursor-pointer relative"
              whileHover={{ y: -4 }}
            >
              {asset.type === 'video' ? (
                <div className="relative aspect-video w-full overflow-hidden">
                  <video
                    src={asset.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center group-hover:bg-[#F28B2C] group-hover:text-black group-hover:border-[#F28B2C] transition-all duration-300">
                      <i className="fas fa-play text-sm ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden w-full">
                  <img
                    src={asset.src}
                    alt={asset.title}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              )}

              {/* Asset Info */}
              <div className="p-5 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F28B2C]/80">
                  {asset.category}
                </span>
                <h3 className="text-[#F7F3ED] font-bold text-base mt-1 group-hover:text-white transition-colors">
                  {asset.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Link to Full Portfolio */}
        <motion.div
          variants={fadeUp}
          custom={0.4}
          className="mt-12 text-center"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-3 rounded-[8px] border border-[#F28B2C]/40 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#F28B2C] transition hover:bg-[#F28B2C] hover:text-black"
          >
            Explore Full Archive
            <i className="fas fa-arrow-right" />
          </Link>
        </motion.div>
      </Section>

      <MediaModal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        src={selectedMedia?.src || ''}
        title={selectedMedia?.title || ''}
        type={selectedMedia?.type || 'image'}
      />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        className="border-t px-5 md:px-10 lg:px-16 py-16"
        style={{ borderColor: 'rgba(242,139,44,0.08)', backgroundColor: '#071A1A' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div>
              <Link to="/" className="font-display text-2xl font-bold text-[#F7F3ED] hover:text-[#F28B2C] transition-colors">
                SIR NEWSON
              </Link>
              <p className="text-[#AFC9C3] text-sm mt-2">Creative Direction · Design · AI Visual Systems</p>
              <p className="text-[#AFC9C3]/50 text-xs mt-4 italic">
                "Proposal prepared with clarity, strategy, and visual intent."
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              <a href="https://sirnewson.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#AFC9C3] hover:text-[#F28B2C] transition-colors flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                sirnewson.com
              </a>
              <a href={buildWhatsAppUrl(proposal.whatsappNumber, waMsg)} target="_blank" rel="noopener noreferrer" className="text-sm text-[#AFC9C3] hover:text-[#F28B2C] transition-colors flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-[#AFC9C3]/40 text-xs">© 2026 Sir Newson. All rights reserved.</p>
            <p className="text-[#AFC9C3]/40 text-xs">
              This is a private proposal. Please do not share without permission.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Proposal;
