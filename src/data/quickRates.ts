import type { Docket } from './portfolio';

export const WHATSAPP = '254702480771';

export interface QuickRate {
    /** What this docket sells. */
    label: string;
    /** Entry price, taken from the live rate card. Null where it is genuinely scoped per job. */
    from: string | null;
    /** Where the full numbers live. */
    rateCardTab: string;
    turnaround: string;
    includes: string[];
}

/**
 * Entry prices mirror the published rate card (see pages/RateCard.tsx).
 */
export const quickRates: Record<Docket, QuickRate> = {
    events: {
        label: 'Event marketing',
        from: 'KSh 75,000 / campaign',
        rateCardTab: 'events',
        turnaround: '15–20 posts + 3 marketing reels per starter campaign',
        includes: ['Social media posts', 'Marketing reels', 'Print work', 'Screen motions', 'Countdown & event updates'],
    },
    graphics: {
        label: 'Social & graphics',
        from: 'KSh 75,000 / mo',
        rateCardTab: 'social',
        turnaround: '15–20 posts + 3 reels monthly',
        includes: ['Social posts', 'Reels & motion', 'Thumbnails', 'Campaign visuals', 'Content direction'],
    },
    branding: {
        label: 'Brand identity',
        from: 'KSh 22,500',
        rateCardTab: 'branding',
        turnaround: '2–3 weeks per slot',
        includes: ['Logo system', 'Colour & type', 'Brand kit', 'Mockups', 'Guidelines'],
    },
    product: {
        label: 'Product visuals',
        from: 'KSh 22,500',
        rateCardTab: 'branding',
        turnaround: 'Sales-ready in about a week',
        includes: ['Product posters', 'Photo enhancement', 'Catalogue', 'Launch visuals', 'Packaging presentation'],
    },
    gallery: {
        label: 'Poster & key art',
        from: 'KSh 22,500',
        rateCardTab: 'branding',
        turnaround: 'Per poster or as a series',
        includes: ['Concept direction', 'Key art', 'Size variants', 'Print-ready export'],
    },
};

/** Prefilled WhatsApp link referencing the exact piece a visitor is looking at. */
export const whatsappFor = (opts: { title?: string; client?: string; docket: Docket }) => {
    const rate = quickRates[opts.docket];
    const subject = opts.client ? `your ${opts.client} work` : `your ${rate.label.toLowerCase()} work`;
    const piece = opts.title ? ` (the "${opts.title}" piece)` : '';
    const text = `Hi Sir Newson, I saw ${subject}${piece} on your site. I'd like something similar — can we talk?`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
};
