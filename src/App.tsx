import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import AiTools from './pages/AiTools';
import Home from './pages/Home';
import Work from './pages/Work';
import ClientDetails from './pages/ClientDetails';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Gallery from './pages/Gallery';
import Motion from './pages/Motion';
import Media from './pages/Media';
import Contact from './pages/Contact';
import RateCard from './pages/RateCard';
import Shop from './pages/Shop';


import DriftNotes from './pages/DriftNotes';
import Services from './pages/Services';


import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';
import SideScrollLines from './components/SideScrollLines';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import { useState, useEffect } from 'react';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-neutral-black min-h-screen text-white font-sans selection:bg-primary selection:text-black">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CustomCursor />
          <ParticleBackground />
          <ScrollToTop /> {/* Keeps route scroll reset logic */}
          <ScrollToTopButton /> {/* New visual button */}
          <SideScrollLines />
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/clients/:id" element={<ClientDetails />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/motion" element={<Motion />} />
              <Route path="/media" element={<Media />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/rate-card" element={<RateCard />} />
              <Route path="/ai-tools" element={<AiTools />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/services" element={<Services />} />
              <Route path="/drift-notes" element={<DriftNotes />} />
              <Route path="/client-presentation" element={<div className="pt-40 text-center text-2xl font-display">Client Presentation - Coming Soon</div>} />
              <Route path="*" element={<div className="pt-40 text-center text-2xl font-display">Page Not Found</div>} />
            </Routes>
          </AnimatePresence>
        </>
      )}
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>
  );
}

export default App;
