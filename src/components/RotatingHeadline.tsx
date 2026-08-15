import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface Thought {
    /** The claim. Kept short enough to land in one breath. */
    title: string;
    /** The proof underneath it. */
    line: string;
    /** Small tracked label above the claim. */
    tag: string;
}

/**
 * Each thought sells a different reason to hire: the outcome, the judgement,
 * the range, the building, the partnership.
 */
export const thoughts: Thought[] = [
    {
        tag: 'Creative Direction • Presentation Systems',
        title: 'I make ideas ready for the world.',
        line: 'You bring the raw material — photographs, footage, a product, a half-formed idea. I give it the shape, clarity and finish it needs to stand in front of an audience.',
    },
    {
        tag: 'Problem Solving • Creative Judgement',
        title: 'I find the finished work inside the mess.',
        line: 'Scattered photos, voice notes, a folder with no order. The answer is usually already in there. My job is to see it, name it, and build it out.',
    },
    {
        tag: 'Strategy • Visual Thinking',
        title: 'Clear thinking, made visible.',
        line: 'Most brands are not unclear because they lack design. They are unclear because the thinking underneath was never resolved. I start there.',
    },
    {
        tag: 'Design • Motion • Web • AI',
        title: "I don't stop at the drawing. I build it.",
        line: 'Identity, campaign, catalogue, film, website, tool. One person carrying it from idea to the thing your customer actually touches.',
    },
    {
        tag: 'Long-Term Creative Partnership',
        title: 'A creative partner your business can grow into.',
        line: 'Not a vendor you brief and chase. Someone who learns the business, holds the standard, and makes the next launch easier than the last.',
    },
];

const HOLD_MS = 6500;

interface RotatingHeadlineProps {
    titleClassName?: string;
    tagClassName?: string;
    lineClassName?: string;
}

/**
 * Words rise out of a clipped line on entry and sink on exit. The trigger sits
 * on the container, never on the moving word — a word that starts translated
 * outside its own clip would never intersect, and so would never animate.
 */
const RotatingHeadline = ({
    titleClassName = '',
    tagClassName = '',
    lineClassName = '',
}: RotatingHeadlineProps) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    useEffect(() => {
        if (paused) return;
        const id = window.setTimeout(() => setIndex((i) => (i + 1) % thoughts.length), HOLD_MS);
        return () => window.clearTimeout(id);
    }, [index, paused]);

    const current = thoughts[index];
    const words = current.title.split(' ');

    return (
        <div
            className="w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Tag */}
            <div className="h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={`tag-${index}`}
                        initial={reduced ? { opacity: 0 } : { y: '110%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={reduced ? { opacity: 0 } : { y: '-110%', opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={tagClassName}
                    >
                        {current.tag}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Claim */}
            <AnimatePresence mode="wait">
                <motion.h1
                    key={`title-${index}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: reduced ? 0 : 0.045 } },
                        exit: { transition: { staggerChildren: reduced ? 0 : 0.018, staggerDirection: -1 } },
                    }}
                    className={`flex flex-wrap ${titleClassName}`}
                >
                    {words.map((word, i) => (
                        <span key={`${word}-${i}`} className="mr-[0.24em] inline-block overflow-hidden pb-[0.06em]">
                            <motion.span
                                className="inline-block"
                                variants={{
                                    hidden: reduced ? { opacity: 0 } : { y: '112%', opacity: 0, rotate: 3 },
                                    visible: {
                                        y: '0%', opacity: 1, rotate: 0,
                                        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                                    },
                                    exit: reduced
                                        ? { opacity: 0 }
                                        : { y: '-112%', opacity: 0, transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] } },
                                }}
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </motion.h1>
            </AnimatePresence>

            {/* Proof */}
            <AnimatePresence mode="wait">
                <motion.p
                    key={`line-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className={lineClassName}
                >
                    {current.line}
                </motion.p>
            </AnimatePresence>

            {/* Which thought, and how far through it */}
            <div className="mt-8 flex items-center gap-2">
                {thoughts.map((t, i) => (
                    <button
                        key={t.tag}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={t.title}
                        aria-current={i === index}
                        className="group relative h-[3px] overflow-hidden rounded-full bg-warm-white/15 transition-all duration-500"
                        style={{ width: i === index ? 44 : 16 }}
                    >
                        {i === index && (
                            <motion.span
                                key={`bar-${index}-${paused}`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: paused ? 0.25 : 1 }}
                                transition={{ duration: paused ? 0.3 : HOLD_MS / 1000, ease: 'linear' }}
                                className="absolute inset-0 origin-left rounded-full bg-lime"
                            />
                        )}
                        <span className="absolute inset-0 rounded-full bg-warm-white/0 transition group-hover:bg-warm-white/30" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RotatingHeadline;
