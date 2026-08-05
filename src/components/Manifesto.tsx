import { ScrollReveal } from './Animated';

const lines = [
    'Every brand begins as an idea.',
    'Every product begins as a possibility.',
    'Every story begins before anyone hears it.',
    'Every business begins before the world trusts it.'
];

const Manifesto = () => {
    return (
        <section className="relative overflow-hidden border-t border-white/5 px-6 py-28">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />

            <div className="relative mx-auto max-w-4xl text-center">
                <ScrollReveal direction="up" duration={0.7}>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">The Belief</p>
                    <h2 className="mt-4 font-display text-4xl font-black leading-tight md:text-6xl">Everything Begins Unseen.</h2>
                </ScrollReveal>

                <div className="mt-12 space-y-4">
                    {lines.map((line, index) => (
                        <ScrollReveal key={line} direction="up" delay={index * 0.08} duration={0.6}>
                            <p className="text-lg text-white/50 md:text-2xl">{line}</p>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal direction="up" delay={0.4} duration={0.7}>
                    <p className="mx-auto mt-12 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
                        Before people can buy it, share it, remember it, or believe in it — someone must present it.
                    </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.5} duration={0.7}>
                    <div className="mt-12 space-y-3">
                        <p className="font-display text-2xl font-black text-white md:text-4xl">Presentation is not decoration.</p>
                        <p className="font-display text-2xl font-black text-primary md:text-4xl">It is how value becomes visible.</p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Manifesto;
