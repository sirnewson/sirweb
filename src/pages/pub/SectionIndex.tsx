import { Link } from 'react-router-dom';
import PubShell from '../../components/pub/PubShell';
import StoryCard from '../../components/pub/StoryCard';
import SEO from '../../components/SEO';
import type { SectionId } from '../../data/publication';
import { articlesIn, franchises, sectionById } from '../../data/publication';

/**
 * One index for all four sections. They differ in content and in the franchises
 * they surface, not in structure — a publication where every section invents its
 * own layout stops reading as one publication.
 */
const SectionIndex = ({ id }: { id: SectionId }) => {
    const section = sectionById(id);
    const items = articlesIn(id);
    const [lead, ...rest] = items;

    return (
        <PubShell>
            <SEO
                title={`${section.label} — Drift`}
                description={section.blurb}
                path={section.path}
            />

            <header className="pub-glow px-6 py-20 md:px-12 md:py-28">
                <div className="mx-auto max-w-[1600px]">
                    <p className="pub-kicker pub-accent">{section.kicker}</p>
                    <h1 className="pub-display mt-6 text-6xl md:text-[9rem]">{section.label}</h1>
                    <p className="pub-soft mt-8 max-w-[54ch] text-lg leading-relaxed md:text-xl">
                        {section.statement}
                    </p>

                    {id === 'drift' && (
                        <div className="mt-10 flex flex-wrap gap-3">
                            {franchises.map((f) => (
                                <Link
                                    key={f.slug}
                                    to={`/tag/${f.slug}`}
                                    className="pub-rule border px-5 py-3 transition hover:border-[color:var(--lime)]"
                                >
                                    <span className="pub-franchise text-lg">{f.label}</span>
                                    <span className="pub-kicker pub-faint ml-3">→</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <section className="px-6 py-16 md:px-12 md:py-24">
                <div className="mx-auto max-w-[1600px]">
                    {lead && <StoryCard article={lead} size="feature" showSection={id === 'drift'} />}

                    <div className="pub-rule mt-20 grid gap-x-10 gap-y-14 border-t pt-14 sm:grid-cols-2 lg:grid-cols-3">
                        {rest.map((a) => (
                            <StoryCard key={a.slug} article={a} size="standard" showSection={id === 'drift'} />
                        ))}
                    </div>

                    {items.length === 0 && (
                        <p className="pub-soft py-24 text-center text-lg">
                            Nothing published here yet. It is being written.
                        </p>
                    )}
                </div>
            </section>
        </PubShell>
    );
};

export default SectionIndex;
