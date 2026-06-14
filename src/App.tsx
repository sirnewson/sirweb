import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import Website from './pages/Website';
import Services from './pages/Services';
import Contact from './pages/Contact';
import DriftNotes from './pages/DriftNotes';
import Dashboard from './pages/Dashboard';
import AiTools from './pages/AiTools';
import Shop from './pages/Shop';
import ClientDetails from './pages/ClientDetails';
import RateCard from './pages/RateCard';
import Proposal from './pages/Proposal';

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

  // Proposal pages are standalone — skip loading screen for fast client access
  const isProposalRoute = location.pathname.startsWith('/proposal');

  useEffect(() => {
    if (isProposalRoute) {
      setIsLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isProposalRoute]);

  return (
    <div className="bg-neutral-black min-h-screen text-white font-sans selection:bg-primary selection:text-black">
      <AnimatePresence>
        {isLoading && !isProposalRoute && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Site chrome — hidden on proposal pages */}
          {!isProposalRoute && <CustomCursor />}
          {!isProposalRoute && <ParticleBackground />}
          <ScrollToTop />
          {!isProposalRoute && <ScrollToTopButton />}
          {!isProposalRoute && <SideScrollLines />}
          {!isProposalRoute && <Navbar />}

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/website" element={<Website />} />
              <Route path="/services" element={<Services />} />
              <Route path="/rate-card" element={<RateCard />} />
              <Route path="/rates" element={<RateCard />} />
              <Route path="/clients/:id" element={<ClientDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/threads" element={<DriftNotes />} />
              <Route path="/tools" element={<AiTools />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shop" element={<Shop />} />
              {/* Proposal routes — standalone, no site chrome */}
              <Route path="/proposal" element={<Proposal />} />
              <Route path="/proposal/:slug" element={<Proposal />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </>
      )}
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
    </div>
  );
}

export default App;
