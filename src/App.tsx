import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CornerMenu from './components/CornerMenu';
import Home from './pages/Home';
import Work from './pages/Work';
import Website from './pages/Website';
import Services from './pages/Services';
import Contact from './pages/Contact';
import DriftNotes from './pages/DriftNotes';
import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import ClientDetails from './pages/ClientDetails';
import RateCard from './pages/RateCard';
import Proposal from './pages/Proposal';
import ProposalGuide from './pages/ProposalGuide';

// The publication — its own surface, its own chrome, its own palette.
import Front from './pages/pub/Front';
import SectionIndex from './pages/pub/SectionIndex';
import ArticlePage from './pages/pub/ArticlePage';
import Visuals from './pages/pub/Visuals';
import Desk from './pages/pub/Desk';
import About from './pages/pub/About';
import SearchPage from './pages/pub/SearchPage';
import TagPage from './pages/pub/TagPage';
import WatchPage from './pages/pub/WatchPage';

import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';
import SideScrollLines from './components/SideScrollLines';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Chatbot from './components/Chatbot';
import Seasons, { useSeason, useSeasonRotation } from './components/Seasons';
import { isPublicationHost, isPublicationPath } from './lib/site';
import ScrollProgress from './components/ScrollProgress';
import { useState, useEffect } from 'react';

function App() {
  const location = useLocation();
  const { season, auto, rotateTo } = useSeason();
  useSeasonRotation(season, auto, rotateTo);
  const [isLoading, setIsLoading] = useState(true);

  // A client's own proposal is standalone — no site chrome, no loading screen,
  // so a link opens straight onto the document. The bare /proposal is a public
  // guide to the process and keeps the studio chrome.
  const isProposalRoute = location.pathname.startsWith('/proposal/');

  // The publication is a sub-brand on drift.sirnewson.com. It runs on its own
  // surface: no particles, no cursor, no seasons, no corner index. Most of its
  // traffic arrives from a feed, so it also skips the three-second entrance —
  // a reader who tapped a headline should land on the headline.
  const onPublicationHost = isPublicationHost();
  const isPublicationRoute = isPublicationPath(location.pathname);

  /** Routes that render their own full-page chrome instead of the studio's. */
  const isStandalone = isProposalRoute || isPublicationRoute;

  useEffect(() => {
    if (isStandalone) {
      setIsLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isStandalone]);

  return (
    <div className="bg-neutral-black min-h-screen text-white font-sans selection:bg-primary selection:text-black">
      <AnimatePresence>
        {isLoading && !isStandalone && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Studio chrome — hidden on proposal and publication pages */}
          {!isStandalone && <ScrollProgress />}
          {!isStandalone && <CustomCursor />}
          {!isStandalone && <ParticleBackground />}
          <ScrollToTop />
          {!isStandalone && <ScrollToTopButton />}
          {!isStandalone && <Chatbot />}
          {!isStandalone && <Seasons season={season} />}
          {!isStandalone && <SideScrollLines />}
          {!isStandalone && <CornerMenu />}

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={onPublicationHost ? <Front /> : <Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/website" element={<Website />} />
              <Route path="/services" element={<Services />} />
              <Route path="/rate-card" element={<RateCard />} />
              <Route path="/rates" element={<RateCard />} />
              <Route path="/clients/:id" element={<ClientDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/threads" element={<DriftNotes />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              {/* The publication. On drift.sirnewson.com it owns `/`; on the
                  studio host it stays reachable at /read, whose canonical
                  points at the subdomain. */}
              <Route
                path="/read"
                element={onPublicationHost ? <Navigate to="/" replace /> : <Front />}
              />
              <Route path="/stories" element={<SectionIndex id="stories" />} />
              <Route path="/stories/:slug" element={<ArticlePage section="stories" />} />
              <Route path="/drift" element={<SectionIndex id="drift" />} />
              <Route path="/drift/:slug" element={<ArticlePage section="drift" />} />
              <Route path="/sport" element={<SectionIndex id="sport" />} />
              <Route path="/sport/:slug" element={<ArticlePage section="sport" />} />
              <Route path="/originals" element={<SectionIndex id="originals" />} />
              <Route path="/originals/:slug" element={<ArticlePage section="originals" />} />
              <Route path="/visuals" element={<Visuals />} />
              <Route path="/desk" element={<Desk />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/tag/:slug" element={<TagPage />} />
              <Route path="/watch/:slug" element={<WatchPage />} />

              {/* How a proposal works — public, with site chrome */}
              <Route path="/proposal" element={<ProposalGuide />} />
              {/* A client's proposal — standalone, no site chrome */}
              <Route path="/proposal/:slug" element={<Proposal />} />
              <Route
                path="*"
                element={onPublicationHost ? <Navigate to="/" replace /> : <Home />}
              />
            </Routes>
          </AnimatePresence>
        </>
      )}
      {/* Global grain. The publication is a paper surface with its own texture,
          and an overlay-blended layer on top of it only muddies the ink. */}
      {!isPublicationRoute && (
        <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>
      )}
    </div>
  );
}

export default App;
