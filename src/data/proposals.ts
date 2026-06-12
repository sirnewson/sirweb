// ─── Proposal Data Types ────────────────────────────────────────────────────

export interface ProposalInsights {
  currentStrength: string;
  hiddenOpportunity: string;
  creativeGap: string;
}

export interface ProposalPrices {
  starter: string;
  growth: string;
  premium: string;
}

export interface ProposalPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface VisualPreviewItem {
  title: string;
  subtitle: string;
  image?: string;
}

export interface TimelineItem {
  period: string;
  task: string;
}

export interface OpportunityCard {
  icon: string;
  title: string;
  description: string;
}

export interface ProposalData {
  // Meta
  slug: string;
  clientName: string;
  industry: string;
  proposalLabel: string;

  // Hero
  heroTitle: string;
  heroSubtitle: string;
  preparedBy: string;

  // Contact
  whatsappNumber: string;
  email?: string;

  // Insights
  insights: ProposalInsights;

  // Opportunity cards
  opportunities?: OpportunityCard[];

  // Creative Direction
  directionSummary: string;
  directionKeywords: string[];
  toneOfVoice?: string;
  campaignDirection?: string;
  contentDirection?: string;
  designDirection?: string;

  // Visual Previews
  visualPreviews?: VisualPreviewItem[];

  // Deliverables
  deliverables: string[];

  // Packages
  packages?: ProposalPackage[];
  prices?: ProposalPrices;
  packageRecommended?: 'Starter' | 'Growth' | 'Premium';

  // Timeline
  timeline?: TimelineItem[];

  // Notes
  projectNotes?: string;

  // Custom CTA
  ctaMessage?: string;
}

// ─── Default Opportunity Cards ───────────────────────────────────────────────

export const defaultOpportunities: OpportunityCard[] = [
  {
    icon: '⚡',
    title: 'Build Trust Faster',
    description:
      'Strong visuals communicate reliability before a single word is read. Customers trust brands that look intentional.',
  },
  {
    icon: '🧠',
    title: 'Improve Brand Memory',
    description:
      'Consistent creative systems make your brand recognisable across every touchpoint — social, WhatsApp, and print.',
  },
  {
    icon: '🎯',
    title: 'Make Offers Clearer',
    description:
      'Well-designed marketing materials help customers understand value instantly, reducing hesitation and boosting conversions.',
  },
  {
    icon: '📈',
    title: 'Support Sales',
    description:
      'Creative assets that are built around the customer journey directly support the sales process and accelerate decisions.',
  },
];

// ─── Default Packages ────────────────────────────────────────────────────────

export const defaultPackages: ProposalPackage[] = [
  {
    name: 'Starter',
    price: 'KES 25,000 / month',
    description: 'For brands that need consistent visibility and a strong foundation.',
    features: [
      'Basic social media creative support',
      '8–12 static designs per month',
      'Caption support & messaging',
      'WhatsApp-ready posters',
      'Monthly visual direction',
    ],
  },
  {
    name: 'Growth',
    price: 'KES 50,000 / month',
    description: 'For brands that need stronger campaigns and better design consistency.',
    features: [
      'Campaign visuals & themed content',
      '12–20 social media designs',
      'Product & service ads',
      'Reel cover designs',
      'Content structure & planning',
      'Creative direction & strategy',
      'Monthly performance review',
    ],
    recommended: true,
  },
  {
    name: 'Premium',
    price: 'KES 80,000+ / month',
    description: 'For brands that want full creative support and maximum impact.',
    features: [
      'Advanced campaign visuals',
      'Motion graphic concepts',
      'Landing page creative direction',
      'AI-enhanced visual production',
      'Brand messaging refinement',
      'Sales-focused creative assets',
      'Priority creative support',
    ],
  },
];

// ─── Default Timeline ────────────────────────────────────────────────────────

export const defaultTimeline: TimelineItem[] = [
  { period: 'Day 1–2', task: 'Brand understanding, audience research & creative direction' },
  { period: 'Day 3–5', task: 'First batch of visuals delivered for review' },
  { period: 'Day 6–7', task: 'Revisions, refinement & final approval' },
  { period: 'Week 2+', task: 'Consistent content production, performance improvement & growth' },
];

// ─── Default Visual Previews ─────────────────────────────────────────────────

export const defaultVisualPreviews: VisualPreviewItem[] = [
  { title: 'Poster Direction', subtitle: 'Bold campaign poster concept' },
  { title: 'Social Media Layout', subtitle: 'Feed-ready post composition' },
  { title: 'Product Visual', subtitle: 'Clean product-first photography direction' },
  { title: 'Reel Cover', subtitle: 'Cinematic video thumbnail design' },
  { title: 'Campaign Concept', subtitle: 'Full campaign creative theme' },
  { title: 'WhatsApp Creative', subtitle: 'Marketing-ready broadcast visual' },
];

// ─── Default Direction Summary ────────────────────────────────────────────────

export const defaultDirectionSummary =
  'The proposed direction is a bold, clean, product-first visual system that makes the brand feel reliable, premium, and easy to trust. The style uses strong contrast, simple messaging, clear product focus, and emotionally intelligent storytelling.';

// ─── Generic / Default Proposal ──────────────────────────────────────────────

const genericProposal: ProposalData = {
  slug: 'default',
  clientName: 'Your Brand',
  industry: 'Creative Services',
  proposalLabel: 'Private Proposal',
  heroTitle: 'Visual Growth Proposal',
  heroSubtitle:
    'A strategic creative proposal designed to help your brand communicate with more clarity, trust, and visual impact.',
  preparedBy: 'Sir Newson',
  whatsappNumber: '254702480771',
  insights: {
    currentStrength: 'Your brand already has a clear value proposition and a growing market presence.',
    hiddenOpportunity:
      'The opportunity is to package that value visually so customers understand, trust, and remember the brand faster.',
    creativeGap:
      'Consistent visual storytelling across social media, WhatsApp, and product marketing can unlock the next level of growth.',
  },
  directionSummary: defaultDirectionSummary,
  directionKeywords: ['Premium', 'Trust-first', 'Clean', 'Bold', 'Social-ready', 'Clear', 'Memorable', 'Conversion-aware'],
  toneOfVoice: 'Confident, clear, and professional — with a human touch.',
  campaignDirection: 'Product-first campaigns with strong emotional hooks.',
  contentDirection: 'Consistent weekly content themes tied to business objectives.',
  designDirection: 'Minimal, bold, high-contrast. Clean layouts that let the product speak.',
  deliverables: [
    'Campaign posters',
    'Social media content',
    'Product & service visuals',
    'WhatsApp marketing creatives',
    'Reel cover designs',
    'Caption direction & messaging',
    'Brand message refinement',
  ],
  packages: defaultPackages,
  packageRecommended: 'Growth',
  timeline: defaultTimeline,
  visualPreviews: defaultVisualPreviews,
  opportunities: defaultOpportunities,
};

// ─── Tenacity Locks ───────────────────────────────────────────────────────────

const tenacityLocksProposal: ProposalData = {
  slug: 'tenacity-locks',
  clientName: 'Tenacity Locks',
  industry: 'Security Hardware',
  proposalLabel: 'Private Proposal',
  heroTitle: 'Visual Growth Proposal for Tenacity Locks',
  heroSubtitle:
    'A strategic creative proposal designed to help Tenacity Locks communicate trust, durability, and security with more visual impact.',
  preparedBy: 'Sir Newson',
  whatsappNumber: '254702480771',
  insights: {
    currentStrength:
      'Tenacity Locks already has a practical, high-quality product with strong security value that customers trust.',
    hiddenOpportunity:
      'The opportunity is to make customers feel the quality and trust before they even make a purchase decision.',
    creativeGap:
      'The brand needs more consistent visual storytelling across social media, WhatsApp, and product marketing to match the quality of the product itself.',
  },
  opportunities: [
    {
      icon: '🔒',
      title: 'Build Trust Faster',
      description:
        'Security products sell on trust. Premium visuals signal reliability before a customer touches the product.',
    },
    {
      icon: '🧠',
      title: 'Improve Brand Memory',
      description:
        'Consistent creative systems make Tenacity Locks the first name customers recall when thinking security.',
    },
    {
      icon: '🎯',
      title: 'Make Offers Clearer',
      description:
        'Clean product visuals and clear messaging help customers understand the value of each lock category instantly.',
    },
    {
      icon: '📲',
      title: 'Upgrade Digital Presence',
      description:
        'Social media and WhatsApp marketing creatives that position Tenacity as the premium security choice in Kenya.',
    },
  ],
  directionSummary:
    'The proposed direction is a bold, trust-first visual system built around strength, clarity, and product confidence. The design language communicates security through clean compositions, strong contrast, and product-hero photography that makes every lock look like the safest choice on the shelf.',
  directionKeywords: ['Premium', 'Trust-first', 'Clean', 'Bold', 'Product-focused', 'Social-ready', 'Security', 'Reliable'],
  toneOfVoice: 'Strong, trustworthy, and direct — with confidence, not aggression.',
  campaignDirection: 'Product-hero campaigns: "Built to protect. Made to last."',
  contentDirection: 'Weekly security tips, product comparisons, installation guides, testimonials.',
  designDirection: 'Dark steel tones + accent highlights. Clean grid layouts. Product-first photography direction.',
  deliverables: [
    'Campaign posters',
    'Social media content',
    'Product visuals & security category ads',
    'WhatsApp marketing creatives',
    'Reel cover designs',
    'Caption direction',
    'Brand message refinement',
    'Product comparison graphics',
  ],
  packages: defaultPackages,
  packageRecommended: 'Growth',
  timeline: defaultTimeline,
  visualPreviews: defaultVisualPreviews,
  projectNotes:
    'Initial focus will be on building a recognisable visual system and establishing consistent content rhythm before scaling campaigns.',
  ctaMessage:
    'Hello Sir Newson, I have reviewed the proposal for Tenacity Locks and would like to discuss the next step.',
};

// ─── Funcity Gardens ──────────────────────────────────────────────────────────

const funcityGardensProposal: ProposalData = {
  slug: 'funcity-gardens',
  clientName: 'Funcity Gardens',
  industry: 'Events & Entertainment',
  proposalLabel: 'Private Proposal',
  heroTitle: 'Visual Growth Proposal for Funcity Gardens',
  heroSubtitle:
    'A strategic creative proposal designed to help Funcity Gardens attract more families, drive bookings, and create unforgettable visual moments.',
  preparedBy: 'Sir Newson',
  whatsappNumber: '254702480771',
  insights: {
    currentStrength:
      'Funcity Gardens already offers an exciting experience with strong word-of-mouth and a loyal local following.',
    hiddenOpportunity:
      'The opportunity is to translate that energy visually so parents see it online and immediately want to bring their children.',
    creativeGap:
      'The brand needs vibrant, joyful, and professional-looking content that captures the magic of the venue and drives direct bookings through social and WhatsApp.',
  },
  opportunities: [
    {
      icon: '🎉',
      title: 'Drive Bookings Directly',
      description:
        'Eye-catching social media content and WhatsApp creatives that make parents say "we need to go here this weekend."',
    },
    {
      icon: '📸',
      title: 'Create Content People Share',
      description:
        'Shareable, fun, and colourful content that spreads organically and turns visitors into brand ambassadors.',
    },
    {
      icon: '🎯',
      title: 'Make Offers Clearer',
      description:
        'Event packages, birthday packages, and group deals presented with clean, exciting visual templates.',
    },
    {
      icon: '📲',
      title: 'Build Online Community',
      description:
        'Consistent posting creates a community of followers who keep Funcity Gardens top of mind for every celebration.',
    },
  ],
  directionSummary:
    'The proposed direction is a vibrant, joyful, family-first visual system that captures the energy and fun of Funcity Gardens. Think bold colours, playful typography, and candid + styled photography that makes every post feel like an invitation.',
  directionKeywords: ['Fun', 'Vibrant', 'Family-first', 'Bold', 'Inviting', 'Social-ready', 'Joyful', 'Memorable'],
  toneOfVoice: 'Warm, exciting, and inclusive — like a friend recommending the best day out.',
  campaignDirection: '"Make every weekend count." Family experience campaigns & seasonal events.',
  contentDirection: 'Event highlights, birthday celebrations, "what to do this weekend" series, offers.',
  designDirection: 'Bright, bold palettes. Rounded shapes. Energetic layouts with clear CTAs.',
  deliverables: [
    'Campaign posters for events & weekends',
    'Social media content calendar',
    'Birthday package promotional visuals',
    'WhatsApp broadcast creatives',
    'Reel cover designs',
    'Caption direction & event copy',
    'Seasonal campaign assets',
  ],
  packages: defaultPackages,
  packageRecommended: 'Growth',
  timeline: defaultTimeline,
  visualPreviews: defaultVisualPreviews,
  ctaMessage:
    'Hello Sir Newson, I have reviewed the proposal for Funcity Gardens and would like to discuss the next step.',
};

// ─── PhonePlace ───────────────────────────────────────────────────────────────

const phonePlaceProposal: ProposalData = {
  slug: 'phoneplace',
  clientName: 'PhonePlace',
  industry: 'Mobile Phones & Accessories Retail',
  proposalLabel: 'Private Proposal',
  heroTitle: 'Visual Growth Proposal for PhonePlace',
  heroSubtitle:
    'A strategic creative proposal designed to help PhonePlace compete visually, move stock faster, and become the first choice for mobile buyers.',
  preparedBy: 'Sir Newson',
  whatsappNumber: '254702480771',
  insights: {
    currentStrength:
      'PhonePlace has a strong product range and competitive pricing that gives customers real value.',
    hiddenOpportunity:
      'The opportunity is to present those offers in a way that feels premium, trustworthy, and urgency-driven — making people act fast.',
    creativeGap:
      'The brand needs high-quality product visuals, offer graphics, and campaign content that compete with bigger retailers visually.',
  },
  opportunities: [
    {
      icon: '📱',
      title: 'Move Stock Faster',
      description:
        'Urgency-driven offer posters and WhatsApp campaigns that create buzz around deals and flash sales.',
    },
    {
      icon: '⚡',
      title: 'Build Digital Trust',
      description:
        'Premium product visuals that make buyers feel confident they are getting quality — even online.',
    },
    {
      icon: '🎯',
      title: 'Highlight Best Offers',
      description:
        'Clear pricing graphics, bundle deals, and trade-in promotions that are easy to share and understand.',
    },
    {
      icon: '📲',
      title: 'Dominate WhatsApp',
      description:
        'Broadcast-ready creatives and status graphics that keep PhonePlace visible to every customer every week.',
    },
  ],
  directionSummary:
    'The proposed direction is a sharp, tech-forward visual system that combines product photography direction, clean pricing layouts, and bold offer graphics. The aesthetic communicates quality, trust, and urgency — making PhonePlace look like the premium choice in a crowded market.',
  directionKeywords: ['Tech-forward', 'Sharp', 'Offer-driven', 'Clean', 'Bold', 'Premium', 'Urgent', 'Social-ready'],
  toneOfVoice: 'Confident, direct, and value-focused. "Great phones. Real deals. Right now."',
  campaignDirection: 'Flash sales, new arrivals, brand comparisons, trade-in campaigns.',
  contentDirection: 'Product of the week, pricing posts, feature highlights, customer testimonials.',
  designDirection: 'Dark backgrounds with bright product highlights. Clean price tags. Bold typography.',
  deliverables: [
    'Product visual templates',
    'Offer & flash sale posters',
    'Social media content calendar',
    'WhatsApp broadcast creatives',
    'New arrival announcement graphics',
    'Reel cover designs',
    'Caption direction & sales copy',
    'Campaign launch assets',
  ],
  packages: defaultPackages,
  packageRecommended: 'Growth',
  timeline: defaultTimeline,
  visualPreviews: defaultVisualPreviews,
  ctaMessage:
    'Hello Sir Newson, I have reviewed the proposal for PhonePlace and would like to discuss the next step.',
};

// ─── Basigo ───────────────────────────────────────────────────────────────────

const basigoProposal: ProposalData = {
  slug: 'basigo',
  clientName: 'Basigo',
  industry: 'Electric Mobility & Transport',
  proposalLabel: 'Private Proposal',
  heroTitle: 'Visual Growth Proposal for Basigo',
  heroSubtitle:
    'A strategic creative proposal designed to help Basigo communicate the future of electric mobility in Africa with clarity, purpose, and visual confidence.',
  preparedBy: 'Sir Newson',
  whatsappNumber: '254702480771',
  insights: {
    currentStrength:
      'Basigo is pioneering electric mobility in East Africa with a genuine mission to decarbonise transport — a powerful and timely story.',
    hiddenOpportunity:
      'The opportunity is to make the brand feel as forward-thinking visually as it is operationally, building trust with partners, investors, and commuters simultaneously.',
    creativeGap:
      'The brand needs a cohesive visual system and content strategy that translates its technical excellence into emotional and aspirational storytelling.',
  },
  opportunities: [
    {
      icon: '⚡',
      title: 'Tell the Mission Visually',
      description:
        'Every piece of content should communicate progress, sustainability, and African innovation — making the mission feel tangible.',
    },
    {
      icon: '🌍',
      title: 'Build Stakeholder Trust',
      description:
        'Premium brand visuals and thought-leadership content that inspire confidence in partners, investors, and operators.',
    },
    {
      icon: '🚌',
      title: 'Educate the Market',
      description:
        'Clear, simple content that helps everyday commuters and fleet operators understand the benefits of electric mobility.',
    },
    {
      icon: '📈',
      title: 'Drive Commercial Growth',
      description:
        'Sales-focused creative assets that support B2B fleet partnerships and route operator acquisition.',
    },
  ],
  directionSummary:
    'The proposed direction is a bold, mission-driven visual system that combines documentary-style storytelling with clean, modern design. The aesthetic communicates progress, trust, and African pride — positioning Basigo as the definitive leader in electric mobility across the continent.',
  directionKeywords: ['Future-forward', 'Mission-driven', 'Clean', 'Bold', 'African', 'Premium', 'Trustworthy', 'Aspirational'],
  toneOfVoice: 'Purposeful, optimistic, and authoritative. "Moving Africa forward — cleanly."',
  campaignDirection: 'Impact stories, route launches, fleet milestones, sustainability reports.',
  contentDirection: 'Behind the scenes, driver stories, city by city rollouts, data & impact.',
  designDirection: 'Clean whites and deep greens. Electric blue accents. Documentary photography style.',
  deliverables: [
    'Campaign poster series',
    'Social media content calendar',
    'Impact story visual templates',
    'Fleet partnership pitch visuals',
    'Reel cover designs & video thumbnails',
    'Caption direction & thought-leadership copy',
    'Annual report creative direction',
    'Stakeholder presentation design',
  ],
  packages: defaultPackages,
  packageRecommended: 'Premium',
  timeline: defaultTimeline,
  visualPreviews: defaultVisualPreviews,
  ctaMessage:
    'Hello Sir Newson, I have reviewed the proposal for Basigo and would like to discuss the next step.',
};

// ─── Proposal Registry ────────────────────────────────────────────────────────

const proposals: Record<string, ProposalData> = {
  default: genericProposal,
  'tenacity-locks': tenacityLocksProposal,
  'funcity-gardens': funcityGardensProposal,
  phoneplace: phonePlaceProposal,
  basigo: basigoProposal,
};

export const getProposal = (slug?: string): ProposalData => {
  if (!slug) return genericProposal;
  return proposals[slug] ?? genericProposal;
};

export default proposals;
