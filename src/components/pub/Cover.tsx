import { motion } from 'framer-motion';
import type { Article } from '../../data/publication';
import { sectionById } from '../../data/publication';

/**
 * A piece either has a photograph or it gets a typographic plate.
 *
 * The plate is not a placeholder. Borrowing an unrelated stock image to fill a
 * card is the fastest way to make a publication look assembled rather than
 * edited, so pieces without their own imagery get a black cover carrying the
 * section, the number and the headline — which is what a magazine would do.
 */

type Ratio = 'wide' | 'portrait' | 'square' | 'tall';

const ratioClass: Record<Ratio, string> = {
    wide: 'aspect-[16/9]',
    portrait: 'aspect-[4/5]',
    square: 'aspect-square',
    tall: 'aspect-[3/4]',
};

interface CoverProps {
    article: Article;
    ratio?: Ratio;
    /** Scales the plate lettering with the size of the card it sits in. */
    plateSize?: 'sm' | 'md' | 'lg';
    className?: string;
    /** Unlocks the image as it scrolls into view. */
    reveal?: boolean;
}

const plateType: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-4xl',
    lg: 'text-4xl md:text-6xl',
};

const Cover = ({ article, ratio = 'wide', plateSize = 'md', className = '', reveal = true }: CoverProps) => {
    const section = sectionById(article.section);
    const frame = `pub-frame ${ratioClass[ratio]} ${className}`;

    const inner = article.image ? (
        <img src={article.image} alt={article.imageAlt ?? article.title} loading="lazy" />
    ) : (
        <div className={`pub-plate flex h-full w-full flex-col justify-between p-5 md:p-7`}>
            <div className="pub-kicker flex items-center justify-between opacity-70">
                <span>{section.kicker}</span>
                {article.number && <span>/ {article.number}</span>}
            </div>
            <div className={`pub-display ${plateType[plateSize]} pr-4`}>{article.title}</div>
        </div>
    );

    if (!reveal) return <div className={frame}>{inner}</div>;

    return (
        <motion.div
            className={frame}
            initial={{ clipPath: 'inset(8% 0 8% 0)', opacity: 0.55 }}
            whileInView={{ clipPath: 'inset(0% 0 0% 0)', opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
            {inner}
        </motion.div>
    );
};

export default Cover;
