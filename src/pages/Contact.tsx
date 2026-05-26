import { useEffect } from 'react';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Contact = () => {
    useEffect(() => {
        document.title = "Contact Sir Newson | Website Design, Branding & Creative Direction";
    }, []);

    return (
        <div className="bg-neutral-black min-h-screen bg-hexagon-grid">
            <Hero
                title="Start a Project"
                subtitle="Website Design • Branding • Creative Systems"
                shortParagraph="Need a premium website, brand identity, visual campaign, or creative system? Let’s shape something that looks trusted, feels intentional, and moves people to act."
                primaryCtaLabel="View Website Services"
                primaryCtaPath="/website"
                secondaryCtaLabel="View Work"
                secondaryCtaPath="/work"
            />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default Contact;