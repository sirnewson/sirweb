import Hero from '../components/Hero';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div className="bg-neutral-black min-h-screen bg-hexagon-grid">
            <SEO
                title="Contact Sir Newson | Make Your Brand Ready for the World"
                description="Send the photos, footage, product list, or rough idea. Sir Newson prepares products, videos, brands and businesses for launch — creative direction, design, video and websites in Nairobi, Kenya."
                keywords="contact Sir Newson, hire creative director Kenya, brand designer Nairobi, website designer Kenya, video editor Nairobi, product visuals Kenya"
                path="/contact"
            />
            <Hero
                title="What Are You Trying to Make Ready?"
                subtitle="From Unfinished to Ready"
                shortParagraph="Send the photos, footage, product list, idea, or rough concept — whatever you already have. I'll help you shape it into something ready to publish, launch, or sell."
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