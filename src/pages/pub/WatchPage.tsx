import { Link, Navigate, useParams } from 'react-router-dom';
import PubShell from '../../components/pub/PubShell';
import StoryCard from '../../components/pub/StoryCard';
import SEO from '../../components/SEO';
import {
    articleBySlug,
    formatDate,
    relatedArticles,
    tagSlug,
    videoBySlug,
} from '../../data/publication';

const CHANNEL = 'https://www.youtube.com/@sirnewson';

/**
 * No video lives only on YouTube. Each film gets a page carrying the editorial
 * intro, the key observations and the links out — which is what turns an upload
 * into something searchable instead of a one-time view.
 */
const WatchPage = () => {
    const { slug = '' } = useParams();
    const video = videoBySlug(slug);

    if (!video) return <Navigate to="/read" replace />;

    // The written companion, when there is one, plus what sits near it.
    const companionSlug = video.relatedArticle?.split('/').pop();
    const companion = companionSlug ? articleBySlug(companionSlug) : undefined;
    const related = companion ? relatedArticles(companion, 3) : [];

    return (
        <PubShell>
            <SEO
                title={`${video.title} — Drift`}
                description={video.standfirst}
                keywords={video.tags.join(', ')}
                path={`/watch/${video.slug}`}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'VideoObject',
                    name: video.title,
                    description: video.standfirst,
                    uploadDate: video.date,
                }}
            />

            <header className="px-6 pb-10 pt-16 md:px-12 md:pt-24">
                <div className="mx-auto max-w-6xl">
                    <p className="pub-kicker pub-accent">Watch · {video.kicker}</p>
                    <h1 className="pub-display mt-6 max-w-[16ch] text-[2.5rem] leading-[0.95] md:text-[5.5rem]">
                        {video.title}
                    </h1>
                    <p className="pub-soft mt-7 max-w-[52ch] text-lg leading-relaxed">{video.standfirst}</p>
                    <div className="pub-kicker pub-faint mt-8 flex flex-wrap gap-x-4 gap-y-2">
                        <span>{formatDate(video.date)}</span>
                        <span aria-hidden>·</span>
                        <span>{video.runtime}</span>
                    </div>
                </div>
            </header>

            {/* The film */}
            <div className="px-6 md:px-12">
                <div className="mx-auto max-w-6xl">
                    {video.youtubeId ? (
                        <div className="pub-frame aspect-video">
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                            />
                        </div>
                    ) : (
                        <a
                            href={CHANNEL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pub-plate group flex aspect-video flex-col justify-between p-7 md:p-12"
                        >
                            <p className="pub-kicker opacity-60">{video.kicker}</p>
                            <div>
                                <p className="pub-display max-w-[16ch] text-3xl md:text-6xl">{video.title}</p>
                                <p className="pub-kicker mt-6 opacity-70">
                                    Watch on YouTube → <span className="opacity-50">{video.runtime}</span>
                                </p>
                            </div>
                        </a>
                    )}
                </div>
            </div>

            {/* Editorial intro */}
            <section className="px-6 py-16 md:px-12 md:py-24">
                <div className="pub-body mx-auto flex max-w-[42rem] flex-col gap-6">
                    {video.intro.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </section>

            {/* Key observations */}
            <section className="pub-panel px-6 py-16 md:px-12 md:py-24">
                <div className="mx-auto max-w-6xl">
                    <p className="pub-kicker pub-accent">Key observations</p>
                    <ul className="mt-10">
                        {video.observations.map((o, i) => (
                            <li
                                key={i}
                                className="pub-rule-soft flex gap-6 border-t py-6 md:gap-10"
                            >
                                <span className="pub-kicker pub-faint pt-2">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="pub-headline max-w-[40ch] text-xl md:text-[1.75rem]">{o}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Read the piece */}
            {companion && (
                <section className="px-6 py-16 md:px-12 md:py-20">
                    <div className="pub-rule mx-auto flex max-w-6xl flex-col gap-6 border-t pt-10 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="pub-kicker pub-faint">The written version</p>
                            <p className="pub-headline mt-3 max-w-[24ch] text-2xl md:text-4xl">
                                {companion.title}
                            </p>
                        </div>
                        <Link
                            to={video.relatedArticle!}
                            className="pub-kicker pub-rule self-start border px-7 py-4 transition hover:bg-[color:var(--ink)] hover:text-[color:var(--ground)]"
                        >
                            Read story →
                        </Link>
                    </div>
                </section>
            )}

            {/* Tags */}
            <section className="px-6 pb-16 md:px-12">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-wrap gap-2">
                        {video.tags.map((tag) => (
                            <Link
                                key={tag}
                                to={`/tag/${tagSlug(tag)}`}
                                className="pub-kicker pub-rule border px-4 py-2 transition hover:bg-[color:var(--ink)] hover:text-[color:var(--ground)]"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {related.length > 0 && (
                <section className="pub-glow px-6 py-20 md:px-12 md:py-28">
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
            )}
        </PubShell>
    );
};

export default WatchPage;
