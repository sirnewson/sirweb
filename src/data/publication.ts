/* ---------------------------------------------------------------
   Sir Newson — the publication layer.

   Everything published under /stories, /drift, /sport, /originals, /visuals,
   /desk and /watch is described here. Three taxonomy layers travel with every
   piece — section, topic, tags — which is what lets one story connect into
   many others without a second navigation system.
   --------------------------------------------------------------- */

export type SectionId = 'stories' | 'drift' | 'sport' | 'originals';

export interface Section {
    id: SectionId;
    /** Nav label. */
    label: string;
    /** The masthead line above a headline: "BRAND STORY", "DRIFT". */
    kicker: string;
    path: string;
    blurb: string;
    /** The one sentence that opens the section index. */
    statement: string;
}

export const sections: Section[] = [
    {
        id: 'stories',
        label: 'Stories',
        kicker: 'BRAND STORY',
        path: '/stories',
        blurb: 'The companies and products that shaped culture — and how they actually did it.',
        statement:
            'Every brand here won something. The interesting part is never the logo. It is the decision made years earlier that made the logo matter.',
    },
    {
        id: 'drift',
        label: 'Drift',
        kicker: 'DRIFT',
        path: '/drift',
        blurb: 'Ideas worth wandering into — AI, capitalism, cities, attention, human behaviour.',
        statement:
            'Drift is where the site thinks out loud. Longer, stranger, less resolved — questions that are more useful than the answers currently available.',
    },
    {
        id: 'sport',
        label: 'Sport',
        kicker: 'SN SPORTS',
        path: '/sport',
        blurb: 'Football as a business, a technology and a culture. Not scores, not transfer rumours.',
        statement:
            'Football stopped being ninety minutes a long time ago. It is a media industry, a data industry and an identity industry wearing a kit.',
    },
    {
        id: 'originals',
        label: 'Originals',
        kicker: 'ORIGINAL',
        path: '/originals',
        blurb: 'Speculative work. Architecture, simulations, futures and ideas built rather than argued.',
        statement:
            'Originals answers one question: what happens when Sir Newson is just allowed to imagine?',
    },
];

export const sectionById = (id: SectionId) => sections.find((s) => s.id === id)!;

/* ---------------------------------------------------------------
   Article bodies are built from blocks so the article page can control
   rhythm — text, pull quote, visual, data, text — instead of rendering a
   single slab of markup.
   --------------------------------------------------------------- */

export type Block =
    | { type: 'p'; text: string }
    | { type: 'h'; text: string }
    | { type: 'quote'; text: string; by?: string }
    | { type: 'image'; src: string; caption?: string }
    | { type: 'list'; items: string[] }
    | { type: 'data'; title: string; note?: string; rows: { label: string; value: string }[] };

export interface Article {
    slug: string;
    section: SectionId;
    /** Sequence inside a franchise — "BRAND STORY / 07". */
    number?: string;
    /** The package line the front page runs above a lead headline — "THE AI WORLD". */
    package?: string;
    title: string;
    /** The line under the headline on cards and at the top of the piece. */
    standfirst: string;
    topic: string;
    tags: string[];
    /** ISO date. */
    date: string;
    readMinutes: number;
    /** Optional lead image. Without one the piece gets a typographic cover. */
    image?: string;
    imageAlt?: string;
    /** Pulled to the top of the homepage. Only one should carry it. */
    lead?: boolean;
    /** Promoted inside its own section index. */
    featured?: boolean;
    /** Slug of the matching /watch page, when the story also exists as video. */
    watch?: string;
    body: Block[];
    sources?: { label: string; href: string }[];
}

/* ---------------------------------------------------------------
   Tags that behave like franchises. They surface across the site as tags
   rather than as their own nav items, which keeps the nav at five.
   --------------------------------------------------------------- */

export interface Franchise {
    slug: string;
    label: string;
    blurb: string;
}

export const franchises: Franchise[] = [
    {
        slug: 'kenya-builds',
        label: 'Kenya Builds',
        blurb: 'Infrastructure and systems: what Kenya built, why, and what it cost to keep.',
    },
    {
        slug: 'did-you-know',
        label: 'Did You Know',
        blurb: 'Short, highly visual knowledge pieces — given more room than a carousel allows.',
    },
];

export const franchiseBySlug = (slug: string) => franchises.find((f) => f.slug === slug);

/* --------------------------------------------------------------- */

export const articles: Article[] = [
    /* ---------------------------- DRIFT ---------------------------- */
    {
        slug: 'when-intelligence-becomes-cheap',
        section: 'drift',
        title: 'What Happens to Capitalism When Intelligence Becomes Cheap?',
        standfirst:
            'For two hundred years the economy paid a premium for thinking. That premium is collapsing, and almost nothing downstream of it is designed for the fall.',
        package: 'THE AI WORLD',
        topic: 'Technology',
        tags: ['AI', 'Capitalism', 'Labour', 'Future Systems'],
        date: '2026-08-28',
        readMinutes: 11,
        lead: true,
        featured: true,
        body: [
            {
                type: 'p',
                text: 'Every economic system is built on a scarcity. Feudalism was organised around land. Industrial capitalism was organised around capital and machines. The last fifty years were organised around something softer and harder to price — the ability to analyse, decide, write, design, plan and judge. We called it knowledge work, gave it the corner offices, and built an entire education pipeline to supply it.',
            },
            {
                type: 'p',
                text: 'That scarcity is being removed. Not perfectly, not everywhere at once, but directionally and fast. The cost of a competent first draft — of a legal summary, a marketing plan, a financial model, a piece of code, a research brief — is falling toward the cost of electricity. This is the part most commentary gets wrong. The question is not whether machines can think. The question is what an economy does when the thing it priced most highly becomes abundant.',
            },
            {
                type: 'quote',
                text: 'When a scarcity disappears, the power does not disappear with it. It relocates.',
            },
            { type: 'h', text: 'Scarcity relocates, it never vanishes' },
            {
                type: 'p',
                text: 'Cheap intelligence does not produce an economy with no scarcity. It produces an economy with different scarcities. Look at what becomes hard to get once analysis is free: distribution, trust, taste, permission, energy, proprietary data, and the physical world. A brilliant strategy is worth very little if ten thousand equally brilliant strategies are generated the same morning. What is worth something is being the one that people actually see, believe, and act on.',
            },
            {
                type: 'data',
                title: 'What gets abundant, what gets scarce',
                note: 'The reallocation, in the simplest form it can be written.',
                rows: [
                    { label: 'Analysis, drafting, synthesis', value: 'Abundant' },
                    { label: 'Distribution and attention', value: 'Scarce' },
                    { label: 'Trust and accountability', value: 'Scarce' },
                    { label: 'Proprietary and physical data', value: 'Scarce' },
                    { label: 'Energy and compute', value: 'Scarce' },
                    { label: 'Taste — knowing which output is the right one', value: 'Scarce' },
                ],
            },
            {
                type: 'p',
                text: 'This reframes the anxiety. The threat to a designer is not that a model can generate a layout. It is that a layout was never the scarce thing — judgement was, and judgement is now being asked to justify itself in public, quickly, against a machine that produces confident work at zero marginal cost.',
            },
            { type: 'h', text: 'The middle is where it lands first' },
            {
                type: 'p',
                text: 'Automation has historically hollowed out the middle of a labour market rather than the bottom. Physical, unpredictable, low-status work resists it because robots are expensive and reality is messy. Elite work resists it because it carries accountability — someone has to sign, and a signature is a legal act, not a cognitive one. What sits between those two poles is exactly the layer that was built to process information: analysts, coordinators, junior associates, first-line support, production designers.',
            },
            {
                type: 'p',
                text: 'The uncomfortable version of this is that a lot of white-collar work was never really thinking. It was formatting. The last two decades of office employment absorbed enormous numbers of people into the task of moving information from one shape into another, and that task is the single thing machines do best.',
            },
            {
                type: 'quote',
                text: 'GDP can rise while employment falls. Those two numbers were never welded together — we simply lived through a century where they moved in the same direction and mistook it for a law.',
            },
            { type: 'h', text: 'A view from Nairobi' },
            {
                type: 'p',
                text: 'Most of this conversation is written from economies that already industrialised. Kenya is having a different one. The path that lifted South Korea and China ran through manufacturing — absorb millions of workers into factories, climb the value chain, build a middle class on the way up. That ladder is being pulled up as it is being reached for. Automation makes low-cost labour a weaker advantage every year, and services-led growth was supposed to be the alternative. Business process outsourcing, back-office work, remote knowledge jobs. That is precisely the layer under pressure.',
            },
            {
                type: 'p',
                text: 'But cheap intelligence cuts the other way too, and this is the part worth sitting with. A small Nairobi studio now has the analytical capacity of a mid-sized agency. A single founder can produce what a team of twelve produced in 2019. If the constraint on African business was never talent but access — to capital, to research, to expensive expertise — then a technology that collapses the price of expertise is not straightforwardly bad news. It is the first time the tooling gap has narrowed rather than widened.',
            },
            {
                type: 'p',
                text: 'The catch is ownership. Abundant intelligence is being produced by a very small number of firms, on infrastructure concentrated in a very small number of countries, trained on data harvested globally and monetised centrally. Cheap does not mean free of power. The rent moves from the labour to the layer underneath it.',
            },
            { type: 'h', text: 'What this actually asks of anyone building something' },
            {
                type: 'list',
                items: [
                    'Own a relationship, not a task. Tasks get automated. Relationships get renewed.',
                    'Own data that does not exist anywhere else. Your customers, your archive, your process.',
                    'Be accountable in public. The value of a signature rises as the cost of an opinion falls.',
                    'Get faster at deciding, not at producing. Production is solved; selection is not.',
                    'Build distribution before you need it. It is the scarcity nobody can generate.',
                ],
            },
            {
                type: 'p',
                text: 'Capitalism has survived every previous collapse in the price of something essential — light, calculation, communication, storage. It survived by finding a new scarcity to organise itself around, and it has never asked permission before doing so. The reasonable expectation is not collapse. It is reorganisation, at a speed that outruns the institutions built for the previous arrangement.',
            },
            {
                type: 'p',
                text: 'Which leaves the honest version of the question. Not whether AI destroys capitalism. It probably does not. The question is what capitalism decides to make scarce next — and whether anyone gets a vote.',
            },
        ],
    },
    {
        slug: 'why-everything-wants-your-attention',
        section: 'drift',
        title: 'Why Everything Wants Your Attention',
        standfirst:
            'Attention became the only input that could not be manufactured. Everything that has happened to media since is downstream of that one fact.',
        topic: 'Media',
        tags: ['Attention', 'Media', 'Internet Culture', 'Consumerism'],
        date: '2026-08-21',
        readMinutes: 7,
        body: [
            {
                type: 'p',
                text: 'There is a finite number of waking hours in a human life and an infinite amount of content competing for them. That asymmetry is not a cultural complaint, it is an economic condition, and once you see it as an economic condition the behaviour of every platform stops being mysterious.',
            },
            {
                type: 'p',
                text: 'Production costs went to zero. Anyone can publish. Distribution costs went to zero. Anyone can reach anyone. The one input that did not deflate was the audience — there are not more hours in the day than there were in 2004, and there will not be more in 2040. So the scarce asset is not the video. It is the eight seconds before someone scrolls.',
            },
            {
                type: 'quote',
                text: 'Every feed you use is a market where your attention is the currency and you are not the one setting the price.',
            },
            {
                type: 'p',
                text: 'This is why interfaces converged. Vertical video, infinite scroll, autoplay, algorithmic sorting — these are not design trends, they are the observed optimum of a competition for the same scarce resource. When ten platforms optimise against the same constraint, they arrive at the same shape. That is not copying. That is physics.',
            },
            { type: 'h', text: 'The cost is not time, it is depth' },
            {
                type: 'p',
                text: 'The usual critique is that people spend too many hours online. The more interesting cost is structural. A system optimised for capture rewards the opening, not the argument. It rewards the claim, not the qualification. Over a long enough period, the format selects for a kind of thinking — fast, confident, resolved — and quietly deselects the other kind.',
            },
            {
                type: 'p',
                text: 'Which is the whole reason this site exists as a site. A feed rents attention. An archive accumulates it. The difference between them is not aesthetic, it is about what survives after the week ends.',
            },
        ],
    },
    {
        slug: 'the-business-of-loneliness',
        section: 'drift',
        title: 'The Business of Loneliness',
        standfirst:
            'A generation is more connected and less accompanied than any before it. Several very large industries depend on that staying true.',
        topic: 'Society',
        tags: ['Psychology', 'Consumerism', 'Human Behaviour', 'Society'],
        date: '2026-08-14',
        readMinutes: 8,
        body: [
            {
                type: 'p',
                text: 'Loneliness is usually discussed as a health story. It is also a market. Delivery apps sell out of a meal that used to be eaten with other people. Streaming sells out of an evening that used to be shared. Gyms, gaming, dating apps, parasocial creators, companionship chatbots — a substantial share of consumer technology is priced against the absence of company.',
            },
            {
                type: 'p',
                text: 'This is not a conspiracy. Nobody engineered isolation on purpose. It is something subtler: a long series of individually rational conveniences, each of which removed a small friction that also happened to be a small encounter. The trip to the shop. The wait at the counter. The phone call to ask. Convenience is the systematic removal of contact, and contact was doing work nobody had priced.',
            },
            {
                type: 'quote',
                text: 'Every friction that gets removed was also doing something. The bill arrives later, and it does not say what it is for.',
            },
            {
                type: 'p',
                text: 'The market response is to sell the missing thing back. Community as a subscription. Belonging as a membership tier. A club, a cohort, a Discord, a run group with a brand attached. Some of it is genuinely good — the demand is real and someone should meet it. But it is worth naming the loop: convenience removes the encounter, the absence creates a need, and the need becomes a product with monthly billing.',
            },
            {
                type: 'p',
                text: 'Nairobi runs a variant of this that is worth watching. Traffic, distance and cost have done to the city what apps did elsewhere — made seeing people expensive. The response has been an explosion of paid gathering: run clubs, listening sessions, rooftop events, members-only spaces. Sociality is being rebuilt commercially because it can no longer be assumed geographically.',
            },
        ],
    },
    {
        slug: 'kicc-the-building-that-tried-to-define-a-new-kenya',
        section: 'drift',
        title: 'KICC — The Building That Tried to Define a New Kenya',
        standfirst:
            'It was never only a conference centre. It was an argument about what an independent country should look like, cast in concrete and put at the centre of the capital.',
        topic: 'Architecture',
        tags: ['Kenya Builds', 'Nairobi', 'Architecture', 'Kenya'],
        date: '2026-08-07',
        readMinutes: 9,
        image: '/uploads/graphics/kenya-builds-brand-identity.webp',
        imageAlt: 'Kenya Builds identity artwork by Sir Newson',
        featured: true,
        body: [
            {
                type: 'p',
                text: 'A young country has to answer a question that older ones have forgotten they ever asked: what does it look like to be us? Flags and anthems handle the ceremonial part. Buildings handle the daily part — they are the argument you cannot scroll past, standing in the middle of the city, being seen by everyone every day for sixty years.',
            },
            {
                type: 'p',
                text: 'The Kenyatta International Convention Centre opened in 1973, a decade after independence, and it was built to be read. A tower and a plenary hall on a podium, sitting at the centre of Nairobi, deliberately unlike the colonial architecture around it. The design leaned on a vocabulary that was meant to feel local rather than imported — the cylindrical tower, the amphitheatre form, the textured concrete standing in for mud and thatch at civic scale.',
            },
            {
                type: 'quote',
                text: 'Independence is a legal event. Identity is a construction project, and it takes considerably longer.',
            },
            { type: 'h', text: 'What the building was actually for' },
            {
                type: 'p',
                text: 'Officially: a conference venue, a party headquarters, a place for the country to host the world. Practically: a statement that Kenya intended to be a hub rather than a stop. The bet was on convening — that a nation which hosts the meetings ends up with more say in what the meetings decide. It is the same bet Nairobi is still making today with its UN offices, its tech conferences, and its position as the regional headquarters of nearly everything.',
            },
            {
                type: 'p',
                text: 'For a long stretch, that bet looked ambivalent. The building aged, the city grew around it, and for years the tower was better known as a viewing deck and a backdrop than as working infrastructure. Then the calculation changed again — conference tourism became a genuine industry, the skyline filled in around it, and the building found itself once more doing the job it was designed for.',
            },
            {
                type: 'p',
                text: 'What makes KICC worth returning to is not nostalgia. It is that it was designed with an argument in mind, at a moment when the country could not yet prove the argument was true. Most infrastructure gets built to meet demand. Occasionally something gets built to declare an intention, and then the country spends fifty years catching up to it.',
            },
            {
                type: 'p',
                text: 'That is the thread this franchise follows. Not what Kenya built, but what each thing was trying to say — and whether the country ever agreed with it.',
            },
        ],
    },
    {
        slug: 'kicc-rotating-restaurant',
        section: 'drift',
        title: 'The KICC Once Had a Rotating Restaurant at the Top',
        standfirst:
            'A revolving dining room, 28 floors above Nairobi, from an era when the future was something you were supposed to be able to stand inside.',
        topic: 'Architecture',
        tags: ['Did You Know', 'Kenya Builds', 'Nairobi', 'Kenya'],
        date: '2026-07-31',
        readMinutes: 3,
        body: [
            {
                type: 'p',
                text: 'The tower was topped by a revolving restaurant — a whole floor engineered to turn slowly so that a meal delivered a complete circuit of the city. Nairobi from every angle, on a timer, while you ate.',
            },
            {
                type: 'p',
                text: 'This was not a Kenyan eccentricity. Revolving restaurants were a global signature of a specific decade, part of a family of gestures that also produced monorails, space-age airport terminals and furniture shaped like the idea of speed. The world was building the future as an experience you could buy a ticket to.',
            },
            {
                type: 'quote',
                text: 'There was a period when optimism had a floor plan.',
            },
            {
                type: 'p',
                text: 'The mechanism eventually stopped turning. The helipad-deck view stayed, and it remains one of the best in the city — but the rotation, the part that made it a piece of theatre rather than a room, went quiet.',
            },
            {
                type: 'p',
                text: 'It is a small detail. It is also a precise measure of an ambition: a country that had been independent for ten years built a restaurant that revolved, because standing still was not the message.',
            },
        ],
    },
    {
        slug: 'gdp-grows-employment-doesnt',
        section: 'drift',
        title: 'What Happens When GDP Grows But Employment Doesn’t?',
        standfirst:
            'The headline number and the lived experience have been separating for years. Most economies still only report one of them loudly.',
        topic: 'Economics',
        tags: ['Economics', 'Labour', 'Capitalism', 'Kenya'],
        date: '2026-07-24',
        readMinutes: 6,
        body: [
            {
                type: 'p',
                text: 'Growth was supposed to be a proxy. If the economy expands, more is produced, more people are needed to produce it, and more households have income. That chain held well enough for long enough that we started quoting the first number as if it guaranteed the last one.',
            },
            {
                type: 'p',
                text: 'It does not, and it has not for a while. Growth can be capital-intensive rather than labour-intensive. It can concentrate in sectors that employ few people per shilling of output — extraction, real estate, finance, platform technology. An economy can post a healthy figure while the job market underneath it is thinning, and both facts can be true at once without anyone lying.',
            },
            {
                type: 'data',
                title: 'The gap, in plain terms',
                rows: [
                    { label: 'What GDP measures', value: 'Output produced' },
                    { label: 'What it does not measure', value: 'Who produced it' },
                    { label: 'Or', value: 'Who was paid for it' },
                    { label: 'Or', value: 'Whether the work was secure' },
                ],
            },
            {
                type: 'p',
                text: 'This is not an argument for abandoning the metric. It is an argument for refusing to let one number carry the entire political conversation, particularly in economies where the majority of employment is informal and therefore only partially visible to the statistic in the first place.',
            },
            {
                type: 'p',
                text: 'The practical version: when a country celebrates growth and its graduates cannot find work, both the celebration and the frustration are accurate. They are describing different variables that stopped moving together.',
            },
        ],
    },

    /* --------------------------- STORIES --------------------------- */
    {
        slug: 'xiaomi',
        section: 'stories',
        number: '07',
        title: 'How Xiaomi Built an Empire Without Looking Like One',
        standfirst:
            'It sold phones at almost no margin, called itself an internet company, and quietly turned a hardware business into a distribution system for everything else.',
        topic: 'Technology',
        tags: ['Xiaomi', 'China', 'Smartphones', 'Brand Strategy'],
        date: '2026-08-25',
        readMinutes: 8,
        featured: true,
        watch: 'xiaomi',
        body: [
            {
                type: 'p',
                text: 'In 2013 Xiaomi announced that it would keep hardware margins under five percent. Competitors read it as a stunt. It was a business model, and it took most of the industry a decade to understand what it was actually for.',
            },
            {
                type: 'p',
                text: 'The conventional smartphone business makes money on the device. You design a phone, you sell it at a markup, you do it again next year and hope the upgrade cycle holds. Xiaomi decided the device was not the product. The device was the cost of acquiring a user — and a user, once acquired, could be sold services, software, and then an entire household of other objects.',
            },
            {
                type: 'quote',
                text: 'Sell the phone at cost, and the phone stops being the business. It becomes the front door.',
            },
            { type: 'h', text: 'The three moves' },
            {
                type: 'p',
                text: 'First, it removed the retailer. Early Xiaomi sold online, in flash drops, direct to buyer. That deleted a distribution layer that typically consumes twenty to thirty percent of a device’s price, which is where the low margin was actually funded from. The scarcity theatre of the flash sale was a bonus — it produced queues, urgency and free press.',
            },
            {
                type: 'p',
                text: 'Second, it made the software the relationship. MIUI shipped weekly updates built partly from user forum requests, at a time when Android updates arrived rarely and from nobody in particular. That turned buyers into participants. A community that argues about your product roadmap is a community that does not leave.',
            },
            {
                type: 'p',
                text: 'Third — and this is the move most brands cannot copy — it used the phone as a channel for an ecosystem it did not build alone. Rather than manufacturing everything, Xiaomi invested in and incubated hundreds of hardware companies, then let them sell through its brand and its retail. Scooters, rice cookers, air purifiers, lamps, luggage, televisions. The result looked like a conglomerate and behaved like a marketplace.',
            },
            {
                type: 'data',
                title: 'The model, stripped down',
                rows: [
                    { label: 'Hardware margin', value: 'Deliberately minimal' },
                    { label: 'Real product', value: 'The user relationship' },
                    { label: 'Distribution', value: 'Direct, then own retail' },
                    { label: 'Ecosystem', value: 'Invested, not owned outright' },
                    { label: 'Brand position', value: 'Value, never luxury — until it was' },
                ],
            },
            { type: 'h', text: 'The cost of being cheap' },
            {
                type: 'p',
                text: 'Building a brand on price is a trap, and Xiaomi walked into it knowingly. Once a market decides you are the affordable option, moving upmarket is close to impossible — the customers you have will not follow you, and the customers you want do not believe you. This is the same wall that has held back a long line of value brands in every category.',
            },
            {
                type: 'p',
                text: 'Its answer was to escape sideways rather than upward. Sub-brands to hold the low end. Premium lines that had to earn their positioning on specifications rather than heritage. Retail spaces that made the ecosystem physical. And eventually a move into electric vehicles — a category where nobody had a fixed idea of what Xiaomi was allowed to be.',
            },
            {
                type: 'quote',
                text: 'You cannot argue your way out of a price position. You can only build a new context where the old one does not apply.',
            },
            { type: 'h', text: 'Why it matters outside China' },
            {
                type: 'p',
                text: 'For markets like Kenya, Xiaomi’s arc is more instructive than Apple’s. Apple is a story about a company that could charge a premium from the beginning. Xiaomi is a story about a company that started with no permission to charge anything, and built the permission afterwards — through software, community, retail and patience.',
            },
            {
                type: 'p',
                text: 'That is the transferable part. Not the flash sales, not the margin cap. The insight that the first product does not have to make the money, as long as you are clear about what it is actually buying you.',
            },
        ],
        sources: [
            { label: 'Xiaomi annual reports', href: 'https://www.mi.com/global/about/' },
        ],
    },
    {
        slug: 'm-pesa',
        section: 'stories',
        number: '06',
        title: 'M-Pesa and the Country That Skipped a Step',
        standfirst:
            'Kenya did not modernise its banking system. It routed around it — and in doing so exported a financial architecture the rest of the world is still studying.',
        topic: 'Finance',
        tags: ['M-Pesa', 'Safaricom', 'Kenya', 'Fintech', 'Kenya Builds'],
        date: '2026-08-11',
        readMinutes: 9,
        featured: true,
        body: [
            {
                type: 'p',
                text: 'The story usually gets told as a triumph of innovation. It is more accurately a triumph of constraint. In 2007 most Kenyans had no bank account, no realistic path to one, and a genuine daily problem: moving money from a city job to a rural household without handing cash to a bus driver and hoping.',
            },
            {
                type: 'p',
                text: 'What existed instead was a mobile network with deep rural coverage and a dense retail layer of small shops already selling airtime. M-Pesa’s real invention was not the software. It was recognising that the agent network — thousands of dukas already trusted with cash — was a banking branch system that had been sitting there unnoticed.',
            },
            {
                type: 'quote',
                text: 'The infrastructure was already built. It was just being used for something else.',
            },
            { type: 'h', text: 'Why it worked here and stalled elsewhere' },
            {
                type: 'p',
                text: 'Three conditions had to hold at once. A dominant operator with the scale to make the network dense enough to be useful on day one. A regulator willing to allow a telco to hold customer funds before the rulebook existed. And a population with a sharp, unmet, everyday need — not a convenience, a genuine problem with a cost attached.',
            },
            {
                type: 'p',
                text: 'Markets that had two of the three did not get the same result. Where banking already worked adequately, the pull was weaker. Where regulators insisted a bank must be involved from the start, the economics broke. Where no single operator had dominance, the network never reached the density where anyone could pay anyone.',
            },
            {
                type: 'data',
                title: 'The preconditions',
                rows: [
                    { label: 'Network density', value: 'One operator, national reach' },
                    { label: 'Regulatory posture', value: 'Permission before rules' },
                    { label: 'Existing retail layer', value: 'Airtime agents, already trusted' },
                    { label: 'Underlying need', value: 'Remittance, not convenience' },
                ],
            },
            { type: 'h', text: 'What it became' },
            {
                type: 'p',
                text: 'Transfer was only the opening. Once money moved digitally, everything that sits on top of money followed — merchant payments, savings, credit, insurance, payroll, government disbursement. A country that had skipped the branch network ended up with a payments layer more universal than the card systems it never adopted.',
            },
            {
                type: 'p',
                text: 'And with it, the harder questions. A single private rail carrying a national economy is a concentration of power that no regulator planned for. Digital credit built on transaction history has produced borrowing at scale, and a debt problem alongside it. Leapfrogging is not free. It just moves the bill.',
            },
        ],
    },
    {
        slug: 'nike',
        section: 'stories',
        number: '05',
        title: 'Nike Sells the Athlete You Have Not Become Yet',
        standfirst:
            'A shoe company won by refusing to talk about shoes — and by understanding earlier than anyone that identity is a more durable product than footwear.',
        topic: 'Brand',
        tags: ['Nike', 'Brand Strategy', 'Sport', 'Marketing'],
        date: '2026-07-28',
        readMinutes: 7,
        body: [
            {
                type: 'p',
                text: 'Read a Nike campaign from any decade and notice what is missing. Almost no product specification. Very little about cushioning, materials or performance data. What is present instead is a sentence about the person watching, usually phrased as a challenge.',
            },
            {
                type: 'p',
                text: 'This was a positional choice made early and held with unusual discipline. Competitors sold technology — air units, gel, boost, plates. Nike sold the decision to go outside. The product had to be excellent, and generally was, but excellence was the entry fee rather than the argument.',
            },
            {
                type: 'quote',
                text: 'Sell the shoe and you compete on the shoe. Sell the version of themselves someone is trying to reach, and there is no competitor in the category.',
            },
            {
                type: 'p',
                text: 'The athlete endorsement machinery works the same way. A signed athlete is not a spokesperson, they are a narrative host — a person whose public arc the brand attaches to, so that the brand inherits their meaning. It is why Nike has historically been willing to stand behind athletes at their most contested moments. The risk is the point; a brand that only appears in the safe years is decoration.',
            },
            {
                type: 'p',
                text: 'What is worth stealing from this, at any scale, is the discipline of subject. Most brands talk about themselves. The rarer move is to talk exclusively about the person you are for, and let the product be the evidence rather than the message.',
            },
        ],
    },
    {
        slug: 'safaricom',
        section: 'stories',
        number: '04',
        title: 'Safaricom Became Infrastructure, Then Had to Behave Like It',
        standfirst:
            'What happens to a company when it stops being a business people choose and becomes a system they cannot avoid.',
        topic: 'Business',
        tags: ['Safaricom', 'Kenya', 'M-Pesa', 'Monopoly'],
        date: '2026-07-17',
        readMinutes: 7,
        body: [
            {
                type: 'p',
                text: 'There is a threshold a company can cross where the ordinary rules of competition stop describing it. Below the line you are a provider — customers compare you, switch away, punish you with churn. Above it you are a utility, and the relationship changes character entirely: people complain about you the way they complain about weather, and stay.',
            },
            {
                type: 'p',
                text: 'Safaricom crossed that line by owning the payment rail. Once salaries, rent, school fees, matatu fares, savings and small business receipts all move through one system, switching is not a consumer decision, it is a life reorganisation. Network quality stopped being the moat. The moat became everyone else’s dependency.',
            },
            {
                type: 'quote',
                text: 'A company becomes infrastructure the moment leaving it costs more than tolerating it.',
            },
            {
                type: 'p',
                text: 'The obligations that follow are real, whether or not the company wants them. Pricing becomes political. Downtime becomes a national event. Data practices become a civil liberties question. And the state develops a permanent interest — as regulator, as shareholder, and as a party that would like access to what the system knows.',
            },
            {
                type: 'p',
                text: 'The interesting management problem is that the skills that got the company here — aggressive commercial expansion, speed, market capture — are not the skills the new position requires. Infrastructure is judged on reliability, fairness and restraint. Very few companies successfully change temperament at the exact moment they succeed.',
            },
        ],
    },
    {
        slug: 'toyota',
        section: 'stories',
        number: '03',
        title: 'Toyota Won by Being Boring on Purpose',
        standfirst:
            'The most copied manufacturing system in history was built on an idea most companies still find intolerable: stop the line when something is wrong.',
        topic: 'Manufacturing',
        tags: ['Toyota', 'Systems', 'Manufacturing', 'Japan'],
        date: '2026-07-10',
        readMinutes: 6,
        body: [
            {
                type: 'p',
                text: 'Give any worker on the assembly line the authority to halt production. On paper this is insane — the line is the most expensive thing in the building, and stopping it costs money by the second. Toyota did it anyway, and it turned out to be the cheapest quality system ever devised.',
            },
            {
                type: 'p',
                text: 'The logic is that defects compound. A fault caught at the station where it happens costs minutes. The same fault caught at final inspection costs hours. Caught by a customer, it costs the brand. Stopping the line looks expensive because the cost is immediate and visible, while the alternative cost is deferred and diffuse — which is exactly why most organisations choose the alternative.',
            },
            {
                type: 'quote',
                text: 'Most companies are not optimising for quality. They are optimising for costs that are easy to see.',
            },
            {
                type: 'p',
                text: 'Everything else in the system follows from the same instinct. Keep almost no inventory, so problems surface immediately instead of being hidden by a buffer. Improve continuously in small increments rather than in expensive transformations. Treat the person doing the work as the person most likely to know what is wrong with it.',
            },
            {
                type: 'p',
                text: 'The reason so few competitors successfully copied it is that the visible parts are tools and the invisible part is a permission structure. You can install the kanban boards. You cannot install a culture where stopping the line is rewarded rather than survived.',
            },
        ],
    },
    {
        slug: 'ikea',
        section: 'stories',
        number: '02',
        title: 'IKEA Sells You the Labour and Charges You Less for It',
        standfirst:
            'Flat-pack was a logistics decision that accidentally became a psychology one — and it made the customer part of the factory.',
        topic: 'Retail',
        tags: ['IKEA', 'Retail', 'Design', 'Logistics'],
        date: '2026-06-30',
        readMinutes: 6,
        body: [
            {
                type: 'p',
                text: 'A table is mostly air. Shipping an assembled table means paying to move that air across a continent, storing it in a warehouse, and handling it twice. Take the legs off and the same lorry carries several times the furniture. Flat-pack began as freight arithmetic, nothing more romantic than that.',
            },
            {
                type: 'p',
                text: 'What it produced was a full-system rearrangement. If the customer assembles, the design must be assemblable — which constrains materials, joints and part counts, which in turn produces a recognisable visual language. The aesthetic people associate with the brand is downstream of a shipping constraint.',
            },
            {
                type: 'quote',
                text: 'Constraints do not limit a design language. Frequently they are the design language.',
            },
            {
                type: 'p',
                text: 'Then the psychology. Effort invested in an object raises the value placed on it — build something yourself, however badly, and you are measurably more attached to it. A company that outsources labour to its customers should logically be resented for it. Instead the assembly became part of the ownership.',
            },
            {
                type: 'p',
                text: 'The store follows the same logic: a one-way path through a full simulation of domestic life, ending in a warehouse where you retrieve your own goods. Every stage moves work from the company to the customer and returns the saving as price. It is one of the few honest trades in retail — you really are being paid, in discount, for your afternoon.',
            },
        ],
    },
    {
        slug: 'coca-cola',
        section: 'stories',
        number: '01',
        title: 'Coca-Cola Is a Distribution Company That Happens to Sell Drinks',
        standfirst:
            'The formula is famous, protected and largely irrelevant. The actual asset is that the product is within arm’s reach of almost everyone alive.',
        topic: 'Business',
        tags: ['Coca-Cola', 'Distribution', 'Brand Strategy', 'Africa'],
        date: '2026-06-19',
        readMinutes: 6,
        body: [
            {
                type: 'p',
                text: 'The mythology is built around a secret recipe in a vault. It makes for excellent brand storytelling and explains almost nothing about why the company wins, given that credible imitations of the taste have existed for a century and have not displaced it.',
            },
            {
                type: 'p',
                text: 'The real machine is the bottling and distribution system: a franchised network that produces locally, delivers locally, and reaches shops that no ordinary logistics operation would consider worth serving. In much of Africa that means a cold bottle available in villages that lack reliable electricity, refrigerated by kerosene, restocked by motorbike.',
            },
            {
                type: 'quote',
                text: 'You cannot copy a supply chain by tasting it.',
            },
            {
                type: 'p',
                text: 'The marketing exists to keep demand high enough to justify the density of that network, and the network exists to make sure the demand can always be satisfied instantly. Each one funds the other. Break either and the whole thing becomes an ordinary beverage business.',
            },
            {
                type: 'p',
                text: 'It is the clearest case in commerce of a lesson that applies at any size. The thing customers can name is rarely the thing that makes the company hard to beat.',
            },
        ],
    },

    /* ---------------------------- SPORT ---------------------------- */
    {
        slug: 'football-is-becoming-interactive',
        section: 'sport',
        title: 'Why Football Is Becoming Interactive',
        standfirst:
            'A generation raised on games does not want to watch a match. It wants to be inside one — and the sport is quietly rebuilding itself around that.',
        topic: 'Sport',
        tags: ['Football', 'Media', 'Fan Behaviour', 'Technology'],
        date: '2026-08-18',
        readMinutes: 7,
        image: '/uploads/graphics/erling-haaland-viking-poster.webp',
        imageAlt: 'Sir Newson football poster artwork',
        featured: true,
        body: [
            {
                type: 'p',
                text: 'Ask someone under twenty-five how they followed a match and the answer is rarely ninety uninterrupted minutes. It is a clip, a group chat, a fantasy score, a prediction placed at half time, a highlight edited to music, an argument that outlives the result. The match is the raw material. The consumption happens around it.',
            },
            {
                type: 'p',
                text: 'This is a structural change, not a decline in attention span. Games taught an entire generation that a screen is something you act on. Passive viewing now feels like a missing feature. So every layer of the sport that can accept input is being fitted with one — fantasy, predictions, live statistics, club tokens, second-screen commentary, co-streams where a creator reacts in parallel to the broadcast.',
            },
            {
                type: 'quote',
                text: 'The broadcast used to be the product. Increasingly it is the server the real product runs on.',
            },
            { type: 'h', text: 'What clubs are actually selling' },
            {
                type: 'p',
                text: 'Match-day revenue is capped by the size of a stadium. Broadcast revenue is capped by what a small number of buyers will pay. Neither scales the way a media business scales, which is why every serious club now runs a content operation, a documentary strategy and a direct channel to supporters who will never attend a fixture.',
            },
            {
                type: 'p',
                text: 'The consequence is a shift in what a club is. It begins as a team, becomes a brand, and ends up as a media company with a sporting department attached — one that must produce something for its audience on the six days a week when there is no football to watch.',
            },
            {
                type: 'p',
                text: 'The risk is obvious and already visible. Every interactive layer added is another surface for gambling to occupy, and prediction is an easy word for betting. A sport that turns its audience into participants has to decide what it is inviting them to participate in.',
            },
        ],
    },
    {
        slug: 'the-business-of-lamine-yamal',
        section: 'sport',
        title: 'The Business of Lamine Yamal',
        standfirst:
            'A teenager arrives with a fully formed commercial architecture around him. That is new, and it changes what a career is allowed to be.',
        topic: 'Sport',
        tags: ['Football', 'Economics', 'Brand Strategy', 'Youth'],
        date: '2026-08-04',
        readMinutes: 6,
        body: [
            {
                type: 'p',
                text: 'Previous generations of prodigies became commercial assets after they became famous. The sequence has inverted. A player with genuine talent and an audience now arrives at a first team already carrying a following, a management structure and a set of brand relationships that predate their professional peak.',
            },
            {
                type: 'p',
                text: 'That alters the balance of power inside a club. A player whose personal reach rivals the institution’s is not straightforwardly an employee. Image rights, content obligations, appearance clauses and social output become negotiating surfaces alongside wages, and increasingly the more valuable ones.',
            },
            {
                type: 'quote',
                text: 'Talent used to be sold to a club. Now the club is buying access to an audience that came with the player.',
            },
            {
                type: 'p',
                text: 'The economics are straightforward. A youth-developed player carries no purchase cost on the books, so every commercial return is close to pure upside, and any eventual transfer registers as almost entirely profit. This is the strongest financial argument academies have ever had, and it explains the sudden institutional patience with very young footballers.',
            },
            {
                type: 'p',
                text: 'What it costs is harder to quantify. Development is not linear and does not perform well under permanent observation. The system is now capable of monetising a career before it has been had — and nobody has demonstrated yet what that does over ten years.',
            },
        ],
    },
    {
        slug: 'clubs-are-becoming-media-companies',
        section: 'sport',
        title: 'Why Clubs Are Becoming Media Companies',
        standfirst:
            'There are only so many match days. There are infinite content days, and that is where the growth has moved.',
        topic: 'Sport',
        tags: ['Football', 'Media', 'Business', 'Fan Behaviour'],
        date: '2026-07-21',
        readMinutes: 5,
        body: [
            {
                type: 'p',
                text: 'A football club has an unusual problem for a business with a global audience: it can only deliver its core product about fifty times a year, for two hours, at a fixed location, at a price capped by the number of seats.',
            },
            {
                type: 'p',
                text: 'Everything a modern club builds is an attempt to escape that constraint. In-house production teams. Behind-the-scenes series. Podcast networks. Player-led channels. Documentary deals. Owned apps with subscription tiers. All of it exists to convert an audience that watches occasionally into an audience that is present continuously.',
            },
            {
                type: 'quote',
                text: 'The competition is no longer other clubs. It is anything else on the same screen at nine in the evening.',
            },
            {
                type: 'p',
                text: 'For clubs outside the largest leagues this is genuinely the opening. Global attention no longer requires a broadcast deal to arrive through — a well-run channel can build a following in markets the club will never play in. African clubs in particular are chronically underserved by broadcast and heavily served by mobile, which is a mismatch with an obvious answer.',
            },
        ],
    },

    /* -------------------------- ORIGINALS -------------------------- */
    {
        slug: 'kicc-on-the-moon',
        section: 'originals',
        title: 'KICC on the Moon',
        standfirst:
            'If a country builds a monument to announce its future, what does it build when the future is off-planet? A speculative study in lunar civic architecture.',
        topic: 'Speculative',
        tags: ['Speculative', 'Architecture', 'Nairobi', 'Kenya Builds'],
        date: '2026-08-30',
        readMinutes: 5,
        featured: true,
        body: [
            {
                type: 'p',
                text: 'This one starts as a joke and refuses to stay one. Put the KICC on the moon. Same silhouette, same amphitheatre podium, same tower — relocated to a place with no atmosphere, no rain to shed, no crowd to convene, and one-sixth of the gravity that shaped every proportion in the original.',
            },
            {
                type: 'p',
                text: 'What makes it worth building as an image is that almost every design decision in the original was an answer to a local condition. The concrete texture was a climate and material response. The tower height was an argument with a specific skyline. The plaza assumed people walking to it. Remove all of that and you find out how much of the building was function and how much was declaration.',
            },
            {
                type: 'quote',
                text: 'A monument is architecture that keeps working after its function has been taken away.',
            },
            {
                type: 'p',
                text: 'The answer, mostly, is declaration — and that is the interesting result. The form survives the move because it was never primarily solving a problem. It was making a claim, and a claim travels.',
            },
            {
                type: 'p',
                text: 'Every space programme so far has planted a flag. Flags are a cheap way to claim presence. The next question, which nobody has had to answer yet, is what a permanent human settlement builds first once the claiming is done — and whose architectural language it borrows to do it.',
            },
        ],
    },
    {
        slug: 'future-nairobi',
        section: 'originals',
        title: 'Future Nairobi',
        standfirst:
            'Not the rendered version with glass towers and empty streets. The plausible one, extrapolated from what the city is already doing.',
        topic: 'Speculative',
        tags: ['Nairobi', 'Cities', 'Speculative', 'Kenya'],
        date: '2026-08-01',
        readMinutes: 6,
        body: [
            {
                type: 'p',
                text: 'City futures usually get drawn by people selling something. The renders share a vocabulary — mirrored towers, wide clean boulevards, a monorail, and a suspicious absence of anyone informally employed. It is a picture of a different city built on the same coordinates.',
            },
            {
                type: 'p',
                text: 'The more useful exercise is extrapolation. Take what Nairobi is measurably already doing and run it forward twenty years without wishing any of it away.',
            },
            {
                type: 'list',
                items: [
                    'Vertical growth continues, but unevenly — density arrives before the services that density requires.',
                    'The matatu system does not disappear. It digitises, formalises partially, and keeps its culture.',
                    'Payments stay ahead of governance. The rails work better than the institutions using them.',
                    'The satellite towns become the actual city and the commute becomes the defining daily cost.',
                    'Climate pressure moves from an environmental topic to a water and power scheduling problem.',
                ],
            },
            {
                type: 'p',
                text: 'None of that is dystopian and none of it is a brochure. It is a city doing what growing cities do: solving the urgent thing and deferring the structural one, repeatedly, until the deferral becomes the structure.',
            },
            {
                type: 'quote',
                text: 'Cities are not planned into existence. They are negotiated into existence, daily, by everyone who lives in them.',
            },
        ],
    },
    {
        slug: 'capitalism-simulator',
        section: 'originals',
        title: 'Capitalism Simulator',
        standfirst:
            'A thought experiment shaped like a game: you are handed the economy, four levers, and no way to pull one without moving the others.',
        topic: 'Speculative',
        tags: ['Capitalism', 'Systems', 'Economics', 'Speculative'],
        date: '2026-07-14',
        readMinutes: 5,
        body: [
            {
                type: 'p',
                text: 'Most arguments about economics are arguments about a single variable held in isolation. Raise wages. Cut taxes. Print money. Open borders. Each is discussed as though the rest of the system will politely stay where it is.',
            },
            {
                type: 'p',
                text: 'The simulator premise is simple: you get four levers — wages, prices, employment, and the money supply — and every movement propagates. Nothing is free, nothing is isolated, and no configuration satisfies everyone. Play it for ten minutes and the conclusion arrives on its own.',
            },
            {
                type: 'data',
                title: 'The levers',
                rows: [
                    { label: 'Raise wages', value: 'Prices follow, employment tightens' },
                    { label: 'Cut prices', value: 'Margins fall, investment slows' },
                    { label: 'Expand employment', value: 'Productivity per worker drops' },
                    { label: 'Print money', value: 'Everything above, delayed' },
                ],
            },
            {
                type: 'quote',
                text: 'The point of the game is not to win it. It is to stop believing that anyone else is playing a version where winning is available.',
            },
            {
                type: 'p',
                text: 'That is the honest lesson underneath. Economic policy is not a matter of finding the correct setting. It is a matter of choosing which group absorbs the cost, and then explaining the choice in language that makes it sound like arithmetic.',
            },
        ],
    },
];

/* ---------------------------------------------------------------
   The Desk — the public notebook. Short observations, no obligation
   to become full pieces. This is the part that changes daily.
   --------------------------------------------------------------- */

export interface DeskNote {
    id: string;
    date: string;
    text: string;
    /** Optional pointer to a piece the note eventually became. */
    becamePath?: string;
    becameLabel?: string;
}

export const deskNotes: DeskNote[] = [
    {
        id: 'd-2026-09-01',
        date: '2026-09-01',
        text: 'Football is slowly becoming less about watching and more about participating. Nobody announced it. The features just kept arriving until the default changed.',
        becamePath: '/sport/football-is-becoming-interactive',
        becameLabel: 'Why Football Is Becoming Interactive',
    },
    {
        id: 'd-2026-08-31',
        date: '2026-08-31',
        text: 'AI might not destroy capitalism. It may simply change what becomes scarce — and every previous time that happened, the people holding the old scarcity were the last to notice.',
        becamePath: '/drift/when-intelligence-becomes-cheap',
        becameLabel: 'What Happens to Capitalism When Intelligence Becomes Cheap?',
    },
    {
        id: 'd-2026-08-29',
        date: '2026-08-29',
        text: 'Every brand asking for a rebrand is asking for one of two things: to look current, or to be understood. Only one of those is a design problem.',
    },
    {
        id: 'd-2026-08-27',
        date: '2026-08-27',
        text: 'Nairobi has more good ideas per square kilometre than almost anywhere, and fewer finished ones. The gap is not talent. It is that nothing here is cheap to attempt twice.',
    },
    {
        id: 'd-2026-08-24',
        date: '2026-08-24',
        text: 'A logo is the smallest part of an identity and the only part clients can argue about with confidence. That is not a coincidence — it is the only part that requires no context to have an opinion on.',
    },
    {
        id: 'd-2026-08-20',
        date: '2026-08-20',
        text: 'Convenience is the systematic removal of contact. Almost every app of the last fifteen years sold the same thing: fewer encounters per transaction.',
        becamePath: '/drift/the-business-of-loneliness',
        becameLabel: 'The Business of Loneliness',
    },
    {
        id: 'd-2026-08-16',
        date: '2026-08-16',
        text: 'The strongest African brands are not the ones that look international. They are the ones that made a local constraint look deliberate.',
    },
    {
        id: 'd-2026-08-12',
        date: '2026-08-12',
        text: 'Speed is the most overrated creative virtue and the most underrated commercial one. Those are two different arguments and they get mixed up constantly.',
    },
    {
        id: 'd-2026-08-09',
        date: '2026-08-09',
        text: 'Attention compounds in an archive and evaporates in a feed. Everything else about publishing strategy is downstream of that one sentence.',
    },
    {
        id: 'd-2026-08-05',
        date: '2026-08-05',
        text: 'The most expensive thing in any project is the decision nobody made in week one.',
    },
];

/* ---------------------------------------------------------------
   Visuals — a curated lab, not a client portfolio.
   --------------------------------------------------------------- */

export interface Visual {
    id: string;
    index: string;
    title: string;
    note: string;
    src: string;
    tall?: boolean;
}

export const visuals: Visual[] = [
    {
        id: 'v001',
        index: 'VISUAL 001',
        title: 'Kenya Builds',
        note: 'Identity for the infrastructure franchise — civic, structural, unfussy.',
        src: '/uploads/graphics/kenya-builds-brand-identity.webp',
        tall: true,
    },
    {
        id: 'v002',
        index: 'VISUAL 002',
        title: 'Sneaker Study',
        note: 'Product as monument. One object, one colour, no explanation.',
        src: '/uploads/graphics/adidas-pink-sneaker-poster.webp',
    },
    {
        id: 'v003',
        index: 'VISUAL 003',
        title: 'Luxury Concept',
        note: 'What restraint looks like when it is the entire message.',
        src: '/uploads/graphics/gucci-luxury-concept-poster.webp',
    },
    {
        id: 'v004',
        index: 'VISUAL 004',
        title: 'Viking',
        note: 'Sport portraiture pushed toward myth rather than reportage.',
        src: '/uploads/graphics/erling-haaland-viking-poster.webp',
        tall: true,
    },
    {
        id: 'v005',
        index: 'VISUAL 005',
        title: 'Ships Changed Form',
        note: 'Typography carrying the whole idea, image doing support work.',
        src: '/uploads/graphics/ships-changed-form-poster.webp',
    },
    {
        id: 'v006',
        index: 'VISUAL 006',
        title: 'Phone Systems',
        note: 'Hardware identity — a category where everything looks the same on purpose.',
        src: '/uploads/branding/taikom-phones-branding-board.webp',
    },
    {
        id: 'v007',
        index: 'VISUAL 007',
        title: 'Terraplan',
        note: 'Planning language for a city that is still deciding what it is.',
        src: '/uploads/branding/terraplan-branding-board.webp',
    },
    {
        id: 'v008',
        index: 'VISUAL 008',
        title: 'Luxury Fashion',
        note: 'A study in how little a fashion image can contain and still land.',
        src: '/uploads/graphics/luxury-fashion-concept.webp',
        tall: true,
    },
    {
        id: 'v009',
        index: 'VISUAL 009',
        title: 'Madaraka',
        note: 'National holiday work, made without the usual flag reflex.',
        src: '/uploads/graphics/happy-madaraka-day-poster.webp',
    },
];

/* ---------------------------------------------------------------
   Video — no piece lives only on YouTube. Each major video gets a
   page that turns a one-time view into something searchable.
   --------------------------------------------------------------- */

export interface VideoPage {
    slug: string;
    title: string;
    kicker: string;
    standfirst: string;
    date: string;
    /** YouTube id, when the film is published. */
    youtubeId?: string;
    runtime: string;
    intro: string[];
    observations: string[];
    relatedArticle?: string;
    tags: string[];
}

export const videos: VideoPage[] = [
    {
        slug: 'xiaomi',
        title: 'How Xiaomi Built an Empire Without Looking Like One',
        kicker: 'BRAND STORY',
        standfirst:
            'The film version of the Xiaomi story — the margin cap, the flash sales, and the ecosystem that made the phone a front door.',
        date: '2026-08-25',
        runtime: '14 min',
        intro: [
            'Xiaomi is the clearest modern case of a company treating its main product as an acquisition cost rather than a profit centre. The film follows the decision chain from the 2013 margin cap through to the ecosystem strategy that came out of it.',
            'It is a story about distribution more than about hardware, which is why it is worth watching alongside the written piece rather than instead of it.',
        ],
        observations: [
            'The margin cap only works if you first delete the retail layer that consumes the margin.',
            'Weekly software updates turned buyers into participants — a community that argues about your roadmap does not churn.',
            'Investing in hundreds of hardware companies produced the reach of a conglomerate without the balance sheet of one.',
            'Building on price is a trap. Xiaomi escaped sideways, into categories with no prior expectation of what it was allowed to charge.',
        ],
        relatedArticle: '/stories/xiaomi',
        tags: ['Xiaomi', 'China', 'Brand Strategy', 'Smartphones'],
    },
    {
        slug: 'm-pesa',
        title: 'The Country That Skipped a Step',
        kicker: 'BRAND STORY',
        standfirst:
            'How a telco built a national payment system out of an agent network that was already there, selling airtime.',
        date: '2026-08-11',
        runtime: '12 min',
        intro: [
            'M-Pesa is usually presented as an innovation story. The film argues it is a constraint story — the design followed from what Kenya did not have, and from a retail layer that was hiding in plain sight.',
        ],
        observations: [
            'The agent network was the real invention. The software was the easy part.',
            'Three conditions had to hold at once: operator dominance, regulatory permission, and a genuinely painful daily need.',
            'Leapfrogging moves the bill rather than removing it — concentration and digital credit are both part of the outcome.',
        ],
        relatedArticle: '/stories/m-pesa',
        tags: ['M-Pesa', 'Kenya', 'Fintech', 'Safaricom'],
    },
    {
        slug: 'kicc',
        title: 'KICC — The Building That Tried to Define a New Kenya',
        kicker: 'KENYA BUILDS',
        standfirst:
            'A tower, a plenary hall and an argument about what an independent country was supposed to look like.',
        date: '2026-08-07',
        runtime: '11 min',
        intro: [
            'The first film in Kenya Builds. It reads the KICC as a statement rather than a venue — what it was claiming, who it was claiming it to, and whether the country ever caught up to it.',
        ],
        observations: [
            'Most infrastructure meets demand. Occasionally something is built to declare an intention.',
            'The bet was on convening: a country that hosts the meetings gets more say in the decisions.',
            'The rotating restaurant is the detail that dates it most precisely — optimism with a floor plan.',
        ],
        relatedArticle: '/drift/kicc-the-building-that-tried-to-define-a-new-kenya',
        tags: ['Kenya Builds', 'Nairobi', 'Architecture'],
    },
];

/* ---------------------------------------------------------------
   Selectors
   --------------------------------------------------------------- */

const byDateDesc = (a: { date: string }, b: { date: string }) => (a.date < b.date ? 1 : -1);

export const allArticles = [...articles].sort(byDateDesc);

export const leadArticle = allArticles.find((a) => a.lead) ?? allArticles[0];

export const articlesIn = (section: SectionId) =>
    allArticles.filter((a) => a.section === section);

export const latestArticles = (count: number, excludeSlug?: string) =>
    allArticles.filter((a) => a.slug !== excludeSlug).slice(0, count);

export const getArticle = (section: string, slug: string) =>
    articles.find((a) => a.section === section && a.slug === slug);

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

export const articlePath = (a: Article) => `/${a.section}/${a.slug}`;

export const tagSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const articlesByTag = (slug: string) =>
    allArticles.filter((a) => a.tags.some((t) => tagSlug(t) === slug));

/** Tag overlap first, then same section, then recency. */
export const relatedArticles = (article: Article, count = 3) => {
    const scored = allArticles
        .filter((a) => a.slug !== article.slug)
        .map((a) => {
            const shared = a.tags.filter((t) => article.tags.includes(t)).length;
            const sameSection = a.section === article.section ? 1 : 0;
            const sameTopic = a.topic === article.topic ? 1 : 0;
            return { article: a, score: shared * 3 + sameSection * 2 + sameTopic };
        })
        .sort((a, b) => b.score - a.score || (a.article.date < b.article.date ? 1 : -1));
    return scored.slice(0, count).map((s) => s.article);
};

export const videoBySlug = (slug: string) => videos.find((v) => v.slug === slug);

/* --------------------------- Search --------------------------- */

export type SearchResult =
    | { kind: 'article'; article: Article }
    | { kind: 'note'; note: DeskNote }
    | { kind: 'visual'; visual: Visual }
    | { kind: 'video'; video: VideoPage };

const blockText = (body: Block[]) =>
    body
        .map((b) => {
            switch (b.type) {
                case 'p':
                case 'h':
                    return b.text;
                case 'quote':
                    return b.text;
                case 'list':
                    return b.items.join(' ');
                case 'data':
                    return `${b.title} ${b.rows.map((r) => `${r.label} ${r.value}`).join(' ')}`;
                default:
                    return '';
            }
        })
        .join(' ');

/** One index across every section — the archive is only useful if it is searchable as a whole. */
export const search = (rawQuery: string): SearchResult[] => {
    const q = rawQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    const terms = q.split(/\s+/);

    const matches = (haystack: string) => terms.every((t) => haystack.includes(t));

    const results: SearchResult[] = [];

    for (const article of allArticles) {
        const hay = [
            article.title,
            article.standfirst,
            article.topic,
            article.section,
            article.tags.join(' '),
            blockText(article.body),
        ]
            .join(' ')
            .toLowerCase();
        if (matches(hay)) results.push({ kind: 'article', article });
    }

    for (const video of videos) {
        const hay = [video.title, video.standfirst, video.tags.join(' '), video.observations.join(' ')]
            .join(' ')
            .toLowerCase();
        if (matches(hay)) results.push({ kind: 'video', video });
    }

    for (const note of deskNotes) {
        if (matches(note.text.toLowerCase())) results.push({ kind: 'note', note });
    }

    for (const visual of visuals) {
        if (matches(`${visual.title} ${visual.note}`.toLowerCase())) results.push({ kind: 'visual', visual });
    }

    return results;
};

/** Every tag in use, most-used first — powers the search page's suggestions. */
export const allTags = (() => {
    const counts = new Map<string, number>();
    for (const a of articles) for (const t of a.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([tag]) => tag);
})();

/* --------------------------- Format --------------------------- */

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/** "01 SEP 2026" — the house date format, used everywhere. */
export const formatDate = (iso: string) => {
    const [y, m, d] = iso.split('-').map(Number);
    return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`;
};
