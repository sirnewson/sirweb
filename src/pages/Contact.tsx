import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div className="bg-neutral-black min-h-screen">
            <Hero
                title={<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Let's Talk</span>}
                subtitle="Start a Conversation"
            />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default Contact;
