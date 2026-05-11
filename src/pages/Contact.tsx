import { useEffect } from 'react';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Contact = () => {
    useEffect(() => {
        document.title = "Contact | Let's Build Something With Presence | Sir Newson";
    }, []);
    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Let's Build Something With Presence</span>}
                subtitle="Start a Project"
                shortParagraph="Whether you are shaping a new brand, refining an existing identity, launching a website, or building a visual direction for your next chapter, I would love to hear what you are working on."
            />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default Contact;
