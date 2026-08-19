/**
 * Scripted assistant content. No model behind it — every reply is authored,
 * so the bot can never invent a price or promise a turnaround.
 * Figures mirror the published rate card.
 */

export interface BotOption {
    label: string;
    /** Node to advance to. */
    to: string;
}

export interface BotNode {
    /** What the assistant says. Each string renders as its own bubble. */
    say: string[];
    options?: BotOption[];
    /** Renders the WhatsApp handoff with this message prefilled. */
    handoff?: string;
    /** Optional route suggestion shown as a link. */
    link?: { label: string; to: string };
}

export const WHATSAPP_NUMBER = '254702480771';

export const botScript: Record<string, BotNode> = {
    start: {
        say: [
            "Hey — I'm Newson's assistant.",
            "I can explain what he does, walk you through pricing, or point you at the right work. What are you after?",
        ],
        options: [
            { label: 'What does he actually do?', to: 'what' },
            { label: 'I have a project', to: 'project' },
            { label: 'Pricing', to: 'pricing' },
            { label: 'Show me work', to: 'work' },
        ],
    },

    what: {
        say: [
            "Short version: he takes things that are unfinished and makes them ready to meet an audience.",
            "People arrive with raw product photos, unedited footage, a product list or a rough idea — and leave with something that can be posted, launched or sold.",
            "Five areas: products, stories (video), brands, businesses (websites) and ideas (tools).",
        ],
        options: [
            { label: 'Which one fits me?', to: 'project' },
            { label: "What's that cost?", to: 'pricing' },
            { label: 'Show me proof', to: 'work' },
        ],
    },

    project: {
        say: ["What are you trying to make ready?"],
        options: [
            { label: 'An event or festival', to: 'events' },
            { label: 'A brand identity', to: 'branding' },
            { label: 'A website', to: 'website' },
            { label: 'Social & video content', to: 'social' },
            { label: 'A product launch', to: 'product' },
        ],
    },

    events: {
        say: [
            "Events are a big part of the work — Lastcall, Big Voice Fest, Matatu, TTNT 6.",
            "A campaign usually runs in four beats: announce, build (countdowns and lineup drops), doors (gate assets, tags, signage), then the recap that sells the next one.",
            "Event marketing starts at KSh 75,000 per campaign for 15–20 social media posts, 3 marketing reels, print work and screen motions. Bigger rollouts go to KSh 127,500 or KSh 180,000 depending on volume.",
        ],
        link: { label: 'See the events docket', to: '/events' },
        options: [
            { label: 'Get a quote', to: 'handoff_events' },
            { label: 'Something else', to: 'project' },
        ],
    },

    branding: {
        say: [
            "Brand identity runs in slots, from a clean logo-only start up to a full system with guidelines and a site.",
            "Entry is KSh 22,500 for Basic Identity. Standard is 52,500, Full Brand Identity 90,000, and the Premium Suite is 150,000 with a 3-page website included.",
        ],
        options: [
            { label: 'Get a quote', to: 'handoff_branding' },
            { label: 'Something else', to: 'project' },
        ],
    },

    website: {
        say: [
            "Websites start at KSh 37,500 for a Starter (3 pages), 67,500 for a Business site, 112,500 Advanced and 150,000 Corporate.",
            "E-commerce roughly doubles the slot. Every build gets a WhatsApp chat button, mobile layout and basic SEO.",
        ],
        link: { label: 'See website work', to: '/website' },
        options: [
            { label: 'Get a quote', to: 'handoff_website' },
            { label: 'Something else', to: 'project' },
        ],
    },

    social: {
        say: [
            "Social runs monthly. KSh 75,000 gets 15–20 posts and 3 reels. 127,500 gets 25–35 posts and 4 reels. 180,000 is the heavy slot — 40–60 posts, 6 reels, full creative support.",
            "Think of it as a creative department without hiring one.",
        ],
        options: [
            { label: 'Get a quote', to: 'handoff_social' },
            { label: 'Something else', to: 'project' },
        ],
    },

    product: {
        say: [
            "Product work is about making something look ready to buy — posters, photo enhancement, catalogues, launch visuals, packaging presentation.",
            "It's scoped like brand work, so KSh 22,500 is the usual starting point depending on how much there is.",
        ],
        options: [
            { label: 'Get a quote', to: 'handoff_product' },
            { label: 'Something else', to: 'project' },
        ],
    },

    pricing: {
        say: [
            "Roughly: brand identity from KSh 22,500. Websites from 37,500. Social from 75,000 a month. Event marketing from KSh 75,000 per campaign.",
            "Those are entry points — the real number depends on scope. Newson will give you a firm one.",
        ],
        options: [
            { label: 'Get my number', to: 'handoff_general' },
            { label: 'Break it down', to: 'project' },
        ],
    },

    work: {
        say: [
            "There's a lot. The gallery holds the full archive — posters, events, branding, product. The events docket is the deepest section.",
            "Most recent big one is TTNT 6: full season identity for the live comedy tour.",
        ],
        link: { label: 'Open the gallery', to: '/gallery' },
        options: [
            { label: 'I have a project', to: 'project' },
            { label: 'Pricing', to: 'pricing' },
        ],
    },

    handoff_general: { say: ["Best thing now is to talk to Newson directly."], handoff: "Hi Sir Newson, I was on your site and I'd like a quote." },
    handoff_events: { say: ["Send him the date and the scale and he'll come back with a number."], handoff: "Hi Sir Newson, I have an event I'd like a campaign for." },
    handoff_branding: { say: ["Tell him what the business is and he'll point you at the right slot."], handoff: "Hi Sir Newson, I'm interested in a brand identity." },
    handoff_website: { say: ["Tell him roughly how many pages and whether you need e-commerce."], handoff: "Hi Sir Newson, I'd like a website built." },
    handoff_social: { say: ["Let him know your posting rhythm and he'll match a slot."], handoff: "Hi Sir Newson, I'd like monthly social and content support." },
    handoff_product: { say: ["Send whatever photos you already have — that's usually enough to scope it."], handoff: "Hi Sir Newson, I have a product I want made ready for sale." },
};

export const whatsappLink = (text: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
