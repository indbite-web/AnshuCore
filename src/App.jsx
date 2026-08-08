import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Apps from './components/Apps';
import Features from './components/Features';
import Screenshots from './components/Screenshots';
import DownloadSection from './components/DownloadSection';
import Changelog from './components/Changelog';
import Footer from './components/Footer';

// Mobile Pages
import Home from './pages/Home';
import AppsPage from './pages/AppsPage';
import FeaturesPage from './pages/FeaturesPage';
import UpdatesPage from './pages/UpdatesPage';
import AboutPage from './pages/AboutPage';
import DownloadPage from './pages/DownloadPage';
import SchoolLogin from './pages/SchoolLogin';

import { CONFIG } from './config';
import { fetchAppReleases } from './services/github';
import { trackChangelogOpen } from './utils/analytics';

// Scroll to top helper on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainAppShell() {
  const [siteLoading, setSiteLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [appReleases, setAppReleases] = useState({});
  const [releasesLoading, setReleasesLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [changelogModal, setChangelogModal] = useState({
    isOpen: false,
    app: null
  });

  const location = useLocation();

  // Responsive width listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch GitHub releases for all configured apps (cached in localStorage)
  const loadReleases = useCallback(async () => {
    setReleasesLoading(true);
    const releaseResults = {};

    for (const app of CONFIG.apps) {
      try {
        const data = await fetchAppReleases(app);
        releaseResults[app.id] = data;
      } catch (err) {
        console.error(`Failed to fetch release for ${app.name}:`, err);
      }
    }

    setAppReleases(releaseResults);
    setReleasesLoading(false);
  }, []);

  useEffect(() => {
    loadReleases();
  }, [loadReleases]);

  // Section observer for desktop navbar active indicator
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['hero', 'apps', 'features', 'changelog', 'about', 'download'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleOpenChangelog = (app = CONFIG.apps[0]) => {
    trackChangelogOpen(app.name, appReleases[app.id]?.latestVersion || 'v1.0.0');
    setChangelogModal({
      isOpen: true,
      app
    });
  };

  const handleCloseChangelog = () => {
    setChangelogModal({
      isOpen: false,
      app: null
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const mainApp = CONFIG.apps[0];
  const mainReleaseData = appReleases[mainApp.id] || null;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <ScrollToTop />

      {/* Initial Hero Light Loader */}
      {siteLoading && <Loader onFinish={() => setSiteLoading(false)} />}

      {/* Main Website Container */}
      <div className={`transition-opacity duration-500 flex-1 flex flex-col ${siteLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Navbar Header */}
        <Navbar activeSection={activeSection} />

        {/* Routes Assembly */}
        <main className="flex-1">
          <Routes>
            {/* Homepage Route: Full Single Page on Desktop, Compact on Mobile */}
            <Route
              path="/"
              element={
                isMobile ? (
                  <Home
                    appReleases={appReleases}
                    loading={releasesLoading}
                    onOpenChangelog={handleOpenChangelog}
                  />
                ) : (
                  <div className="space-y-0">
                    <Hero
                      onDownloadClick={() => scrollToSection('download')}
                      onExploreClick={() => scrollToSection('features')}
                      latestVersion={mainReleaseData?.latestVersion}
                    />
                    <Apps
                      appReleases={appReleases}
                      loading={releasesLoading}
                      onOpenChangelog={handleOpenChangelog}
                      onRetry={loadReleases}
                    />
                    <Features />
                    <Screenshots />
                    <About />
                    <DownloadSection
                      app={mainApp}
                      releaseData={mainReleaseData}
                      onOpenChangelog={() => handleOpenChangelog(mainApp)}
                    />
                  </div>
                )
              }
            />

            {/* Mobile & Dedicated Secondary Routes */}
            <Route
              path="/apps"
              element={
                <AppsPage
                  appReleases={appReleases}
                  loading={releasesLoading}
                  onOpenChangelog={handleOpenChangelog}
                />
              }
            />
            <Route path="/features" element={<FeaturesPage />} />
            <Route
              path="/updates"
              element={
                <UpdatesPage
                  app={mainApp}
                  releaseData={mainReleaseData}
                  loading={releasesLoading}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/download/anshu-mock"
              element={
                <DownloadPage
                  app={mainApp}
                  releaseData={mainReleaseData}
                  loading={releasesLoading}
                />
              }
            />
            <Route path="/school-login" element={<SchoolLogin />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer
          onNavigate={scrollToSection}
          onOpenChangelog={() => handleOpenChangelog(mainApp)}
        />

        {/* Changelog Modal */}
        <Changelog
          isOpen={changelogModal.isOpen}
          onClose={handleCloseChangelog}
          app={changelogModal.app || mainApp}
          releaseData={appReleases[changelogModal.app?.id || mainApp.id]}
        />

      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <MainAppShell />
    </BrowserRouter>
  );
}

export default App;
