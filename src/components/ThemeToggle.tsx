import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'sirnewson_theme';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        setTheme(stored ?? (prefersLight ? 'light' : 'dark'));
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'light' ? '#F7F3ED' : '#000000');
    }, [theme]);

    return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) };
};

interface ThemeToggleProps {
    theme: Theme;
    onToggle: () => void;
}

/** Sun/moon rocker. Sits inside the corner menu rather than in a nav bar. */
const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
    <button
        type="button"
        onClick={onToggle}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="relative flex h-8 w-[62px] items-center rounded-full border border-white/15 bg-white/[0.06] px-1 transition hover:border-sunset/50"
    >
        <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-sunset text-[10px] text-black"
            style={{ marginLeft: theme === 'dark' ? 0 : 30 }}
        >
            <i className={theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'} />
        </motion.span>
    </button>
);

export default ThemeToggle;
