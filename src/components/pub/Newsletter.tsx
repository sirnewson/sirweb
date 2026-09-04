import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

type Status = 'idle' | 'sending' | 'done' | 'error';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/**
 * The Drift — one email a week. Sits at the foot of every publication page and,
 * larger, on the front page.
 *
 * Addresses are written to `drift_subscribers`, which is create-only in the
 * Firestore rules: the form can add a signup, nothing on the client can read
 * the list back.
 */
const Newsletter = ({ variant = 'band' }: { variant?: 'band' | 'inline' }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<Status>('idle');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEmail(email)) {
            setStatus('error');
            return;
        }
        setStatus('sending');
        try {
            await addDoc(collection(db, 'drift_subscribers'), {
                email: email.trim().toLowerCase(),
                source: window.location.pathname,
                timestamp: serverTimestamp(),
            });
            setStatus('done');
            setEmail('');
        } catch (err) {
            console.error('Newsletter signup failed', err);
            setStatus('error');
        }
    };

    const large = variant === 'band';

    return (
        <div className={large ? 'pub-panel px-6 py-20 md:px-12 md:py-28' : ''}>
            <div className={large ? 'mx-auto max-w-6xl' : ''}>
                <p className="pub-kicker pub-accent">The Drift — newsletter</p>
                <h2
                    className={`pub-display mt-5 ${large ? 'text-5xl md:text-8xl' : 'text-3xl md:text-5xl'}`}
                >
                    Keep drifting.
                </h2>
                <p className="pub-soft mt-4 max-w-[46ch] text-base md:text-lg">
                    One interesting email every week. A major idea, a few observations, new stories and
                    things worth watching.
                </p>

                <form onSubmit={submit} className="mt-8 max-w-xl">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                        <label className="sr-only" htmlFor={`drift-email-${variant}`}>
                            Email address
                        </label>
                        <input
                            id={`drift-email-${variant}`}
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (status === 'error') setStatus('idle');
                            }}
                            placeholder="email address"
                            className="pub-ink w-full border-b border-[color:var(--rule)] bg-transparent px-0 py-3 text-lg outline-none placeholder:opacity-40 focus:border-[color:var(--ink)]"
                        />
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="pub-kicker shrink-0 border border-current px-7 py-4 transition hover:bg-[color:var(--ink)] hover:text-[color:var(--ground)] disabled:opacity-50"
                        >
                            {status === 'sending' ? 'Joining…' : 'Join →'}
                        </button>
                    </div>

                    <div className="pub-kicker pub-faint mt-4 h-4">
                        {status === 'done' && <span className="pub-accent">You’re in. See you on the next one.</span>}
                        {status === 'error' && <span>That address didn’t look right — try again.</span>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
