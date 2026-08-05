import { ScrollReveal, Float } from './Animated';

const stages = [
    ['01', 'Clarify', 'We identify what needs to be communicated, sold, launched, or understood.'],
    ['02', 'Shape', 'The raw material is organised into a strong visual, narrative, or digital direction.'],
    ['03', 'Present', 'The idea becomes professional content, design, video, a website, or a complete system.'],
    ['04', 'Release', 'The final work is prepared for publishing, launching, selling, or sharing.']
];

const ReadinessFramework = () => {
    return (
        <section className="border-t border-white/5 bg-neutral-dark px-6 py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-14 max-w-3xl">
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">The Readiness Framework</p>
                    <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">Every Project Moves Through Four Stages.</h2>
                    <p className="mt-4 text-lg leading-8 text-white/60">
                        Simple enough to move fast. Deep enough to matter. You always know where your work is.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stages.map(([num, title, desc], index) => (
                        <ScrollReveal
                            key={title}
                            direction="up"
                            delay={index * 0.08}
                            duration={0.65}
                            className="h-full"
                        >
                            <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                                <Float y={2.5} duration={4 + index} className="mb-5 w-fit">
                                    <p className="font-black text-primary">{num}</p>
                                </Float>
                                <h3 className="mb-4 font-display text-2xl font-black">{title}</h3>
                                <p className="text-sm leading-7 text-white/55">{desc}</p>
                                {index < stages.length - 1 && (
                                    <i className="fas fa-arrow-right absolute -right-3 top-1/2 hidden -translate-y-1/2 text-primary/30 lg:block" />
                                )}
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal direction="up" delay={0.2} duration={0.6}>
                    <p className="mt-12 text-center font-display text-xl font-black text-white md:text-3xl">
                        Clarify it. <span className="text-primary">Shape it.</span> Present it. <span className="text-primary">Release it.</span>
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ReadinessFramework;
