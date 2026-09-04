import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PubShell from '../../components/pub/PubShell';
import SEO from '../../components/SEO';
import { deskNotes, formatDate } from '../../data/publication';

/**
 * The public notebook. Short observations with no obligation to become full
 * articles — and, because it is fed from a habit that already exists, the part
 * of the site most likely to actually stay current.
 */
const Desk = () => (
    <PubShell>
        <SEO
            title="The Desk — Drift"
            description="The public notebook. Short observations on design, business, technology and culture — notes that may or may not become stories."
            path="/desk"
        />

        <header className="px-6 pb-10 pt-20 md:px-12 md:pt-28">
            <div className="mx-auto max-w-[1600px]">
                <p className="pub-kicker pub-accent">The Desk</p>
                <h1 className="pub-display mt-6 max-w-[14ch] text-6xl md:text-[9rem]">Notes, not articles</h1>
                <p className="pub-soft mt-8 max-w-[52ch] text-lg leading-relaxed">
                    Observations as they arrive. Some of them turn into stories. Most of them stay
                    exactly this size, which is the point.
                </p>
            </div>
        </header>

        <section className="px-6 pb-24 md:px-12">
            <div className="mx-auto max-w-[1600px]">
                {deskNotes.map((note, i) => (
                    <motion.article
                        key={note.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        className="pub-rule grid gap-4 border-t py-10 md:grid-cols-[10rem_1fr] md:gap-12 md:py-14"
                    >
                        <p className="pub-kicker pub-faint md:pt-3">{formatDate(note.date)}</p>
                        <div>
                            <p className="pub-headline max-w-[34ch] text-2xl leading-[1.14] md:text-[2.5rem]">
                                {note.text}
                            </p>
                            {note.becamePath && (
                                <Link to={note.becamePath} className="group mt-6 inline-block">
                                    <span className="pub-kicker pub-accent">This became a story →</span>
                                    <span className="pub-soft mt-2 block max-w-[40ch] text-sm">
                                        <span className="pub-underline">{note.becameLabel}</span>
                                    </span>
                                </Link>
                            )}
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    </PubShell>
);

export default Desk;
