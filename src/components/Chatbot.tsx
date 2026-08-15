import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { botScript, whatsappLink, type BotNode } from '../data/botScript';

interface Turn {
    id: number;
    from: 'bot' | 'you';
    text: string;
    node?: BotNode;
}

const AVATAR = '/uploads/loops/bot-avatar.mp4';

let seq = 0;
const nextId = () => ++seq;

/**
 * Scripted assistant. Every reply is authored in botScript, so it can answer
 * about the work and quote the published rates without inventing anything —
 * and it hands off to WhatsApp once the conversation is real.
 */
const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [nudged, setNudged] = useState(false);
    const [turns, setTurns] = useState<Turn[]>([]);
    const [thinking, setThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const current = turns.filter((t) => t.from === 'bot').at(-1)?.node;

    // Open on the first node.
    useEffect(() => {
        if (open && turns.length === 0) push('start');
    }, [open]);

    // A single, late nudge — never repeated.
    useEffect(() => {
        const t = window.setTimeout(() => setNudged(true), 9000);
        return () => window.clearTimeout(t);
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [turns, thinking]);

    const push = (key: string) => {
        const node = botScript[key];
        if (!node) return;
        setThinking(true);
        window.setTimeout(() => {
            setThinking(false);
            setTurns((prev) => [
                ...prev,
                ...node.say.map((text, i) => ({
                    id: nextId(),
                    from: 'bot' as const,
                    text,
                    node: i === node.say.length - 1 ? node : undefined,
                })),
            ]);
        }, 420);
    };

    const choose = (label: string, to: string) => {
        setTurns((prev) => [...prev, { id: nextId(), from: 'you', text: label }]);
        push(to);
    };

    const restart = () => {
        setTurns([]);
        window.setTimeout(() => push('start'), 60);
    };

    return (
        <>
            {/* Launcher */}
            <motion.button
                type="button"
                onClick={() => { setOpen((v) => !v); setNudged(false); }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.4, delay: 1 }}
                aria-label={open ? 'Close assistant' : 'Open assistant'}
                className="glow-stroke group fixed bottom-6 right-6 z-[96] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-neutral-dark shadow-[0_10px_40px_rgba(0,0,0,0.6)] md:h-16 md:w-16"
            >
                <video
                    src={AVATAR}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full rounded-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                />
                {open && (
                    <span className="relative z-10 flex h-full w-full items-center justify-center bg-soft-black/65 text-sm text-warm-white">
                        <i className="fas fa-times" />
                    </span>
                )}
            </motion.button>

            {/* One-time nudge */}
            <AnimatePresence>
                {nudged && !open && (
                    <motion.button
                        type="button"
                        onClick={() => { setOpen(true); setNudged(false); }}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        className="fixed bottom-[5.6rem] right-6 z-[96] max-w-[210px] rounded-[10px] border border-white/12 bg-neutral-dark/95 px-3.5 py-2.5 text-left font-mono text-[10px] leading-relaxed text-white/70 shadow-xl backdrop-blur-xl md:bottom-[6.4rem]"
                    >
                        Need pricing or a starting point? Ask me.
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 18, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 14, scale: 0.98 }}
                        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                        className="glow-stroke fixed bottom-24 right-4 z-[97] flex h-[min(30rem,72vh)] w-[calc(100vw-2rem)] max-w-[366px] origin-bottom-right flex-col overflow-hidden rounded-[14px] border border-white/12 bg-neutral-dark/96 shadow-[0_30px_90px_rgba(0,0,0,0.75)] backdrop-blur-2xl md:right-6 md:bottom-28"
                    >
                        {/* Header */}
                        <div className="relative flex items-center gap-3 border-b border-white/10 px-4 py-3">
                            <span className="relative h-9 w-9 overflow-hidden rounded-full">
                                <video src={AVATAR} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                            </span>
                            <div className="min-w-0">
                                <p className="font-editorial text-base leading-none text-warm-white">Studio Assistant</p>
                                <p className="mt-1 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/40">
                                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                                    Not AI · scripted answers
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={restart}
                                aria-label="Restart conversation"
                                className="ml-auto rounded-[5px] border border-white/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/45 transition hover:border-sunset/50 hover:text-sunset"
                            >
                                Restart
                            </button>
                        </div>

                        {/* Transcript */}
                        <div ref={scrollRef} className="relative flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
                            {turns.map((t) => (
                                <motion.div
                                    key={t.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={t.from === 'you' ? 'flex justify-end' : 'flex justify-start'}
                                >
                                    <p
                                        className={`max-w-[85%] rounded-[10px] px-3 py-2 text-[13px] leading-relaxed ${
                                            t.from === 'you'
                                                ? 'bg-sunset/90 text-soft-black'
                                                : 'border border-white/10 bg-white/[0.04] text-white/85'
                                        }`}
                                    >
                                        {t.text}
                                    </p>
                                </motion.div>
                            ))}

                            {thinking && (
                                <div className="flex gap-1 px-2 py-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.span
                                            key={i}
                                            animate={{ opacity: [0.25, 1, 0.25] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                                            className="h-1.5 w-1.5 rounded-full bg-sunset"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Choices / handoff */}
                        <div className="relative border-t border-white/10 bg-white/[0.02] p-3">
                            {current?.link && (
                                <Link
                                    to={current.link.to}
                                    onClick={() => setOpen(false)}
                                    className="mb-2 flex items-center justify-between rounded-[7px] border border-white/12 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/65 transition hover:border-sunset/50 hover:text-sunset"
                                >
                                    {current.link.label}
                                    <i className="fas fa-arrow-right text-[9px]" />
                                </Link>
                            )}

                            {current?.handoff ? (
                                <a
                                    href={whatsappLink(current.handoff)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-[8px] bg-lime px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-soft-black transition hover:bg-golden-hour"
                                >
                                    <i className="fab fa-whatsapp text-base" /> Continue on WhatsApp
                                </a>
                            ) : (
                                <div className="flex flex-wrap gap-1.5">
                                    {current?.options?.map((opt) => (
                                        <button
                                            key={opt.label}
                                            type="button"
                                            onClick={() => choose(opt.label, opt.to)}
                                            className="rounded-[7px] border border-white/12 px-3 py-2 text-left text-[11px] text-white/75 transition hover:border-sunset/50 hover:bg-sunset/10 hover:text-sunset"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
