import { Link } from 'react-router-dom';
import { ScrollReveal, Magnetic } from './Animated';

const WHATSAPP = '254702480771';

const quickPicks = [
    { label: 'A product', message: 'Hi Sir Newson, I have a product I want to make ready for sale.' },
    { label: 'A video', message: 'Hi Sir Newson, I have footage I want edited and ready to publish.' },
    { label: 'A campaign', message: 'Hi Sir Newson, I have an event or campaign I want to make ready.' },
    { label: 'A website', message: 'Hi Sir Newson, I want my business ready for the internet.' },
    { label: 'A brand', message: 'Hi Sir Newson, I want my brand ready to be taken seriously.' },
    { label: 'An idea', message: 'Hi Sir Newson, I have an idea I want to make visible.' }
];

const FinalCta = () => {
    return (
        <section className="border-t border-white/5 px-6 py-24">
            <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-primary/20 bg-primary p-8 text-black md:p-16">
                <ScrollReveal direction="up" duration={0.7}>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-black/50">Start Here</p>
                    <h2 className="mt-4 font-display text-4xl font-black leading-tight md:text-6xl">
                        What are you trying to make ready?
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
                        Tap what you have. It opens WhatsApp with the message already written — no forms, no waiting.
                    </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.15} duration={0.6}>
                    <div className="mt-8 flex flex-wrap gap-3">
                        {quickPicks.map((pick) => (
                            <a
                                key={pick.label}
                                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(pick.message)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border-2 border-black/15 bg-black/[0.04] px-6 py-3 text-sm font-black transition hover:border-black hover:bg-black hover:text-white"
                            >
                                {pick.label}
                            </a>
                        ))}
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.25} duration={0.6}>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Magnetic>
                            <a
                                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi Sir Newson, I have something I want to make ready.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 rounded-full bg-black px-8 py-4 font-black text-white transition hover:bg-white hover:text-black"
                            >
                                <i className="fab fa-whatsapp text-xl" />
                                Message on WhatsApp
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <Link
                                to="/contact"
                                className="block rounded-full border-2 border-black/20 px-8 py-4 text-center font-black text-black transition hover:bg-black hover:text-white"
                            >
                                Or send a brief
                            </Link>
                        </Magnetic>
                    </div>

                    <p className="mt-8 text-sm font-medium text-black/55">
                        Send the photos, footage, product list, or rough concept. We start from there.
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default FinalCta;
