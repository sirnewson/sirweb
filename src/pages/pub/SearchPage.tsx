import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PubShell from '../../components/pub/PubShell';
import SEO from '../../components/SEO';
import {
    allTags,
    articlePath,
    formatDate,
    search,
    sectionById,
    tagSlug,
} from '../../data/publication';

/**
 * One index across every section. The archive is only worth accumulating if a
 * keyword — Nike, AI, Kenya, M-Pesa, football — returns everything on it,
 * regardless of which section it was filed under.
 */
const SearchPage = () => {
    const [params, setParams] = useSearchParams();
    const initial = params.get('q') ?? '';
    const [query, setQuery] = useState(initial);
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        input.current?.focus();
    }, []);

    // Keep the URL shareable without pushing a history entry per keystroke.
    useEffect(() => {
        const t = setTimeout(() => {
            setParams(query.trim() ? { q: query.trim() } : {}, { replace: true });
        }, 250);
        return () => clearTimeout(t);
    }, [query, setParams]);

    const results = useMemo(() => search(query), [query]);
    const articles = results.filter((r) => r.kind === 'article');
    const videos = results.filter((r) => r.kind === 'video');
    const notes = results.filter((r) => r.kind === 'note');
    const visualHits = results.filter((r) => r.kind === 'visual');

    return (
        <PubShell>
            <SEO
                title="Search — Drift"
                description="Search every section of Drift — brand stories, ideas, sport, originals, visuals and the desk."
                path="/search"
                index={false}
            />

            <section className="px-6 pb-10 pt-20 md:px-12 md:pt-28">
                <div className="mx-auto max-w-[1600px]">
                    <p className="pub-kicker pub-accent">Search</p>
                    <input
                        ref={input}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Nike, AI, Kenya, football, M-Pesa…"
                        className="pub-display pub-rule mt-6 w-full border-b bg-transparent pb-5 text-4xl outline-none placeholder:opacity-25 focus:border-[color:var(--ink)] md:text-7xl"
                        aria-label="Search the archive"
                    />

                    <div className="pub-kicker pub-faint mt-5">
                        {query.trim().length < 2
                            ? 'Type at least two characters'
                            : `${results.length} result${results.length === 1 ? '' : 's'}`}
                    </div>
                </div>
            </section>

            {query.trim().length < 2 && (
                <section className="px-6 pb-24 md:px-12">
                    <div className="mx-auto max-w-[1600px]">
                        <p className="pub-kicker pub-faint">Or start from a tag</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {allTags.map((tag) => (
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
            )}

            {query.trim().length >= 2 && (
                <section className="px-6 pb-24 md:px-12">
                    <div className="mx-auto max-w-[1600px]">
                        {results.length === 0 && (
                            <p className="pub-soft py-20 text-lg">
                                Nothing yet for “{query.trim()}”. The archive is still young — try a
                                broader word.
                            </p>
                        )}

                        {articles.map((r) => {
                            if (r.kind !== 'article') return null;
                            const a = r.article;
                            const meta = sectionById(a.section);
                            return (
                                <Link
                                    key={a.slug}
                                    to={articlePath(a)}
                                    className="group pub-rule block border-t py-8 md:grid md:grid-cols-[10rem_1fr_10rem] md:gap-10"
                                >
                                    <p className="pub-kicker pub-accent">{meta.kicker}</p>
                                    <div className="mt-2 md:mt-0">
                                        <h2 className="pub-headline text-2xl md:text-3xl">
                                            <span className="pub-underline">{a.title}</span>
                                        </h2>
                                        <p className="pub-soft mt-2 max-w-[60ch] text-sm">{a.standfirst}</p>
                                    </div>
                                    <p className="pub-kicker pub-faint mt-3 md:mt-0 md:text-right">
                                        {formatDate(a.date)}
                                    </p>
                                </Link>
                            );
                        })}

                        {videos.map((r) => {
                            if (r.kind !== 'video') return null;
                            const v = r.video;
                            return (
                                <Link
                                    key={v.slug}
                                    to={`/watch/${v.slug}`}
                                    className="group pub-rule block border-t py-8 md:grid md:grid-cols-[10rem_1fr_10rem] md:gap-10"
                                >
                                    <p className="pub-kicker pub-accent">WATCH</p>
                                    <div className="mt-2 md:mt-0">
                                        <h2 className="pub-headline text-2xl md:text-3xl">
                                            <span className="pub-underline">{v.title}</span>
                                        </h2>
                                        <p className="pub-soft mt-2 max-w-[60ch] text-sm">{v.standfirst}</p>
                                    </div>
                                    <p className="pub-kicker pub-faint mt-3 md:mt-0 md:text-right">{v.runtime}</p>
                                </Link>
                            );
                        })}

                        {notes.map((r) => {
                            if (r.kind !== 'note') return null;
                            const n = r.note;
                            return (
                                <Link
                                    key={n.id}
                                    to="/desk"
                                    className="group pub-rule block border-t py-8 md:grid md:grid-cols-[10rem_1fr_10rem] md:gap-10"
                                >
                                    <p className="pub-kicker pub-accent">DESK</p>
                                    <p className="pub-headline mt-2 max-w-[52ch] text-xl md:mt-0 md:text-2xl">
                                        {n.text}
                                    </p>
                                    <p className="pub-kicker pub-faint mt-3 md:mt-0 md:text-right">
                                        {formatDate(n.date)}
                                    </p>
                                </Link>
                            );
                        })}

                        {visualHits.map((r) => {
                            if (r.kind !== 'visual') return null;
                            const v = r.visual;
                            return (
                                <Link
                                    key={v.id}
                                    to="/visuals"
                                    className="group pub-rule block border-t py-8 md:grid md:grid-cols-[10rem_1fr_10rem] md:gap-10"
                                >
                                    <p className="pub-kicker pub-accent">{v.index}</p>
                                    <div className="mt-2 md:mt-0">
                                        <h2 className="pub-headline text-2xl md:text-3xl">
                                            <span className="pub-underline">{v.title}</span>
                                        </h2>
                                        <p className="pub-soft mt-2 max-w-[60ch] text-sm">{v.note}</p>
                                    </div>
                                    <p className="pub-kicker pub-faint mt-3 md:mt-0 md:text-right">Visual</p>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </PubShell>
    );
};

export default SearchPage;
