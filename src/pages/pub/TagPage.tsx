import { Link, useParams } from 'react-router-dom';
import PubShell from '../../components/pub/PubShell';
import StoryCard from '../../components/pub/StoryCard';
import SEO from '../../components/SEO';
import { articles, articlesByTag, franchiseBySlug, tagSlug } from '../../data/publication';

/**
 * Franchises like Kenya Builds and Did You Know live here rather than in the
 * nav. They surface across the site as tags, which keeps the nav at five items
 * and keeps Drift as the one place those ideas actually live.
 */
const TagPage = () => {
    const { slug = '' } = useParams();
    const franchise = franchiseBySlug(slug);
    const items = articlesByTag(slug);

    // Recover the tag's display casing from the first piece carrying it.
    const label =
        franchise?.label ??
        articles.flatMap((a) => a.tags).find((t) => tagSlug(t) === slug) ??
        slug.replace(/-/g, ' ');

    return (
        <PubShell>
            <SEO
                title={`${label} — Drift`}
                description={franchise?.blurb ?? `Everything filed under ${label} across Drift.`}
                path={`/tag/${slug}`}
            />

            <header className="pub-glow px-6 py-20 md:px-12 md:py-28">
                <div className="mx-auto max-w-[1600px]">
                    <p className="pub-kicker pub-accent">{franchise ? 'Franchise' : 'Tag'}</p>
                    <h1
                        className={
                            franchise
                                ? 'pub-franchise mt-6 text-5xl md:text-[7rem]'
                                : 'pub-display mt-6 text-5xl md:text-[8rem]'
                        }
                    >
                        {label}
                    </h1>
                    {franchise && (
                        <p className="pub-soft mt-8 max-w-[52ch] text-lg leading-relaxed md:text-xl">
                            {franchise.blurb}
                        </p>
                    )}
                    <p className="pub-kicker pub-faint mt-8">
                        {items.length} piece{items.length === 1 ? '' : 's'}
                    </p>
                </div>
            </header>

            <section className="px-6 py-16 md:px-12 md:py-24">
                <div className="mx-auto max-w-[1600px]">
                    {items.length > 0 ? (
                        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((a) => (
                                <StoryCard key={a.slug} article={a} size="standard" />
                            ))}
                        </div>
                    ) : (
                        <div className="py-16">
                            <p className="pub-soft text-lg">Nothing filed under this tag yet.</p>
                            <Link to="/search" className="pub-kicker pub-accent mt-4 inline-block">
                                Search the archive →
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </PubShell>
    );
};

export default TagPage;
