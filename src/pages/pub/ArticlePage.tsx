import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import PubShell from '../../components/pub/PubShell';
import Cover from '../../components/pub/Cover';
import StoryCard from '../../components/pub/StoryCard';
import SEO from '../../components/SEO';
import type { Block, SectionId } from '../../data/publication';
import {
    articlePath,
    formatDate,
    getArticle,
    relatedArticles,
    sectionById,
    tagSlug,
    videoBySlug,
} from '../../data/publication';

/* ---------------------------------------------------------------
   The reading experience the rest of the site is built to lead into.
   Typography and imagery dominate; everything else gets out of the way.
   --------------------------------------------------------------- */

const COLUMN = 'mx-auto w-full max-w-[42rem]';

const BlockView = ({ block }: { block: Block }) => {
    switch (block.type) {
        case 'p':
            return <p className={`${COLUMN} px-6 md:px-0`}>{block.text}</p>;

        case 'h':
            return (
                <h2 className={`${COLUMN} pub-headline mt-16 mb-2 px-6 text-2xl md:mt-20 md:px-0 md:text-[2rem]`}>
                    {block.text}
                </h2>
            );

        case 'quote':
            return (
                <figure className="mx-auto my-14 w-full max-w-4xl px-6 md:my-20 md:px-0">
                    <blockquote className="pub-display text-3xl leading-[1.06] md:text-[3.25rem]">
                        “{block.text}”
                    </blockquote>
                    {block.by && <figcaption className="pub-kicker pub-faint mt-6">{block.by}</figcaption>}
                </figure>
            );

        case 'image':
            return (
                <figure className="my-14 md:my-20">
                    <motion.div
                        className="pub-frame mx-auto aspect-[16/9] w-full max-w-6xl"
                        initial={{ clipPath: 'inset(6% 0 6% 0)', opacity: 0.6 }}
                        whileInView={{ clipPath: 'inset(0% 0 0% 0)', opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <img src={block.src} alt={block.caption ?? ''} loading="lazy" />
                    </motion.div>
                    {block.caption && (
                        <figcaption className={`${COLUMN} pub-kicker pub-faint mt-4 px-6 md:px-0`}>
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );

        case 'list':
            return (
                <ul className={`${COLUMN} my-10 px-6 md:px-0`}>
                    {block.items.map((item, i) => (
                        <li key={i} className="pub-rule-soft flex gap-5 border-t py-4">
                            <span className="pub-kicker pub-faint pt-1">{String(i + 1).padStart(2, '0')}</span>
                            <span className="text-[1.0625rem] leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            );

        case 'data':
            return (
                <div className={`${COLUMN} my-14 px-6 md:px-0`}>
                    <div className="pub-panel p-7 md:p-9">
                        <p className="pub-kicker pub-accent">{block.title}</p>
                        {block.note && <p className="pub-soft mt-2 text-sm">{block.note}</p>}
                        <dl className="mt-6">
                            {block.rows.map((row, i) => (
                                <div
                                    key={i}
                                    className="pub-rule-soft flex items-baseline justify-between gap-6 border-t py-3"
                                >
                                    <dt className="pub-soft text-sm">{row.label}</dt>
                                    <dd className="pub-headline shrink-0 text-right text-base md:text-lg">
                                        {row.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            );

        default:
            return null;
    }
};

/** A hairline that fills as the piece is read. The only chrome on the page. */
const ReadingRule = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
    return (
        <motion.div
            aria-hidden
            style={{ scaleX }}
            className="pub-accent-bg fixed left-0 top-0 z-50 h-[2px] w-full origin-left"
        />
    );
};

const ArticlePage = ({ section }: { section: SectionId }) => {
    const { slug = '' } = useParams();
    const article = getArticle(section, slug);

    if (!article) return <Navigate to={sectionById(section).path} replace />;

    const meta = sectionById(article.section);
    const related = relatedArticles(article, 3);
    const video = article.watch ? videoBySlug(article.watch) : undefined;

    return (
        <PubShell>
            <SEO
                title={`${article.title} — Drift`}
                description={article.standfirst}
                keywords={article.tags.join(', ')}
                image={article.image}
                path={articlePath(article)}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: article.title,
                    description: article.standfirst,
                    datePublished: article.date,
                    articleSection: meta.label,
                    keywords: article.tags.join(', '),
                    author: { '@type': 'Person', name: 'Sir Newson' },
                    publisher: { '@type': 'Organization', name: 'Drift — Sir Newson' },
                }}
            />
            <ReadingRule />

            {/* Opening */}
            <header className="px-6 pb-12 pt-16 md:px-12 md:pt-24">
                <div className="mx-auto max-w-6xl">
                    <Link to={meta.path} className="pub-kicker pub-accent">
                        {meta.kicker}
                        {article.number ? ` / ${article.number}` : ''}
                    </Link>

                    <h1 className="pub-display mt-7 max-w-[16ch] text-[2.75rem] leading-[0.94] sm:text-6xl lg:text-[6.5rem]">
                        {article.title}
                    </h1>

                    <p className="pub-soft mt-8 max-w-[52ch] text-lg leading-relaxed md:text-xl">
                        {article.standfirst}
                    </p>

                    <div className="pub-rule pub-kicker pub-faint mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-5">
                        <span className="pub-ink">By Sir Newson</span>
                        <span aria-hidden>·</span>
                        <span>{formatDate(article.date)}</span>
                        <span aria-hidden>·</span>
                        <span>{article.readMinutes} min read</span>
                        <span aria-hidden>·</span>
                        <span>{article.topic}</span>
                    </div>
                </div>
            </header>

            {/* Lead visual */}
            <div className="px-6 md:px-12">
                <div className="mx-auto max-w-6xl">
                    <Cover article={article} ratio="wide" plateSize="lg" />
                </div>
            </div>

            {/* Body */}
            <article className="pub-body flex flex-col gap-7 py-16 md:py-24">
                {article.body.map((block, i) => (
                    <BlockView key={i} block={block} />
                ))}
            </article>

            {/* Watch */}
            {video && (
                <section className="pub-glow px-6 py-16 md:px-12 md:py-20">
                    <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="pub-kicker pub-accent">Also a film</p>
                            <p className="pub-headline mt-3 max-w-[24ch] text-2xl md:text-4xl">{video.title}</p>
                            <p className="pub-kicker pub-faint mt-3">{video.runtime}</p>
                        </div>
                        <Link
                            to={`/watch/${video.slug}`}
                            className="pub-kicker self-start border border-current px-7 py-4 transition hover:bg-[color:var(--ink)] hover:text-[color:var(--ground)]"
                        >
                            Watch →
                        </Link>
                    </div>
                </section>
            )}

            {/* Taxonomy */}
            <section className="px-6 pb-16 md:px-12">
                <div className="pub-rule mx-auto max-w-6xl border-t pt-8">
                    <p className="pub-kicker pub-faint">Filed under</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <Link
                                key={tag}
                                to={`/tag/${tagSlug(tag)}`}
                                className="pub-kicker pub-rule border px-4 py-2 transition hover:bg-[color:var(--ink)] hover:text-[color:var(--ground)]"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>

                    {article.sources && article.sources.length > 0 && (
                        <div className="mt-10">
                            <p className="pub-kicker pub-faint">Sources</p>
                            <ul className="mt-3 space-y-1">
                                {article.sources.map((s) => (
                                    <li key={s.href}>
                                        <a
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pub-soft text-sm underline underline-offset-4"
                                        >
                                            {s.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* KEEP DRIFTING */}
            <section className="pub-panel px-6 py-20 md:px-12 md:py-28">
                <div className="mx-auto max-w-[1600px]">
                    <h2 className="pub-display text-4xl md:text-7xl">Keep drifting</h2>
                    <div className="mt-12 grid gap-x-10 md:grid-cols-3">
                        {related.map((a) => (
                            <div key={a.slug} className="pub-rule-soft border-t">
                                <StoryCard article={a} size="text" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PubShell>
    );
};

export default ArticlePage;
