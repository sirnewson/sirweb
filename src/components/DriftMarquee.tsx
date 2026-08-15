import { motion } from 'framer-motion';

const DriftMarquee = () => {
    const notes = [
        "1. The mind speaks loudest when life becomes quiet. Listen to the whispers, not the noise.",
        "2. Some doors don’t open for you because you’re meant to build your own. Wood and patience required.",
        "3. Growth feels like losing versions of yourself you once celebrated. Still… you grow.",
        "4. Most people don’t fear change. They fear becoming someone their old circle won’t recognize.",
        "5. Rest is not empty time. It’s the body negotiating peace with your ambitions.",
        "6. You don’t outgrow people. You outgrow conversations.",
        "7. Healing is the art of remembering what didn’t break you.",
        "8. Creativity is the ultimate rebellion against a world that wants you predictable.",
        "9. Discipline is silent. Chaos is loud. Guess which one wins long term.",
        "10. Not every season is for shining. Some are for sharpening.",
        "11. When your mind feels heavy, check what you’ve been carrying that isn’t yours.",
        "12. Doubt visits everyone. It only moves in when you entertain it.",
        "13. Motivation fades. Identity stays. Become the person who does the work even when the feeling leaves.",
        "14. Peace is expensive. The price is usually ego.",
        "15. You don’t find clarity. You create it by removing what distracts it.",
        "16. Your future self is already thanking you for the decisions you’re scared to make right now.",
        "17. Awareness feels lonely because few people walk that high up the mountain.",
        "18. The mind doesn’t get lighter. You just get stronger at holding it.",
        "19. When everything feels urgent, that’s usually the moment to slow down.",
        "20. Consistency is the closest thing humans have to alchemy.",
        "21. The world rewards confidence, but it respects evidence. Build both.",
        "22. A life without curiosity ages too fast.",
        "23. You don’t need more answers. You need better questions.",
        "24. Make decisions based on who you want to be, not who you’ve been defending.",
        "25. Sometimes the universe delays things because you’re not yet the person who can hold them.",
        "26. Anxiety is a mind that sees too far. Peace is a mind that sees enough.",
        "27. You’re not stuck. You’re incubating. Different process, same silence.",
        "28. You don’t need permission to start. You only need courage to continue.",
        "29. Your habits are voting every day for who you become.",
        "30. When life gets loud, wisdom comes disguised as stillness."
    ];

    return (
        <a
            href="https://www.threads.com/@sirnewson"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-primary py-3 overflow-hidden border-t border-black/10 hover:bg-clay transition-colors duration-300 cursor-pointer relative z-40"
        >
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -2000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 60
                }}
            >
                {[...notes, ...notes].map((note, index) => (
                    <span key={index} className="text-black font-bold text-sm uppercase tracking-widest mx-8">
                        {note} <span className="ml-8 opacity-30">•</span>
                    </span>
                ))}
            </motion.div>
        </a>
    );
};

export default DriftMarquee;
