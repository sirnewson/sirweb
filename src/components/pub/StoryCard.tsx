import { Link } from 'react-router-dom';
import type { Article } from '../../data/publication';
import { articlePath, formatDate, sectionById } from '../../data/publication';
import Cover from './Cover';

/**
 * One card, four sizes. The homepage mixes them deliberately — a page where
 * every item is the same size reads as a component library, not a front page.
 */
export type CardSize = 'feature' | 'standard' | 'compact' | 'text';

interface StoryCardProps {
    article: Article;
    size?: CardSize;
    /** Shows the section label above the headline. On a section index it is noise. */
    showSection?: boolean;
    className?: string;
}

const Meta = ({ article, showSection }: { article: Article; showSection: boolean }) => {
    const section = sectionById(article.section);
    return (
        <div className="pub-kicker pub-faint flex flex-wrap items-center gap-x-3 gap-y-1">
            {showSection && (
                <span className="pub-brown">
                    {section.kicker}
                    {article.number ? ` / ${article.number}` : ''}
                </span>
            )}
            <span>{formatDate(article.date)}</span>
            <span aria-hidden>·</span>
            <span>{article.readMinutes} min read</span>
        </div>
    );
};

const StoryCard = ({ article, size = 'standard', showSection = true, className = '' }: StoryCardProps) => {
    const to = articlePath(article);

    if (size === 'text') {
        return (
            <Link to={to} className={`group block py-6 ${className}`}>
                <Meta article={article} showSection={showSection} />
                <h3 className="pub-headline mt-3 text-2xl md:text-[1.75rem]">
                    <span className="pub-underline">{article.title}</span>
                </h3>
                <p className="pub-soft mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed">{article.standfirst}</p>
            </Link>
        );
    }

    if (size === 'compact') {
        return (
            <Link to={to} className={`group block ${className}`}>
                <Cover article={article} ratio="square" plateSize="sm" />
                <div className="mt-4">
                    <Meta article={article} showSection={showSection} />
                    <h3 className="pub-headline mt-2 text-xl md:text-[1.375rem]">
                        <span className="pub-underline">{article.title}</span>
                    </h3>
                </div>
            </Link>
        );
    }

    if (size === 'feature') {
        return (
            <Link to={to} className={`group block ${className}`}>
                <Cover article={article} ratio="wide" plateSize="lg" />
                <div className="mt-6 max-w-3xl">
                    <Meta article={article} showSection={showSection} />
                    <h3 className="pub-headline mt-3 text-[2.25rem] leading-[1.02] md:text-6xl">
                        <span className="pub-underline">{article.title}</span>
                    </h3>
                    <p className="pub-soft mt-4 max-w-[58ch] text-base leading-relaxed md:text-lg">
                        {article.standfirst}
                    </p>
                </div>
            </Link>
        );
    }

    return (
        <Link to={to} className={`group block ${className}`}>
            <Cover article={article} ratio="portrait" plateSize="md" />
            <div className="mt-5">
                <Meta article={article} showSection={showSection} />
                <h3 className="pub-headline mt-2 text-[1.6rem] md:text-[2rem]">
                    <span className="pub-underline">{article.title}</span>
                </h3>
                <p className="pub-soft mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed">{article.standfirst}</p>
            </div>
        </Link>
    );
};

export default StoryCard;
