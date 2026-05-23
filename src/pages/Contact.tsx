import { useEffect } from 'react';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Contact = () => {
    useEffect(() => {
        document.title = "Contact | Let's Build Something With Presence | Sir Newson";
    }, []);
    return (
        <div className="bg-neutral-black min-h-screen bg-hexagon-grid">
            <Hero />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default Contact;
