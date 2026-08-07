import React, { useState, useEffect, useCallback } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Apps from './components/Apps';
import Features from './components/Features';
import DownloadSection from './components/DownloadSection';
import Changelog from './components/Changelog';
import Footer from './components/Footer';
import { CONFIG } from './config';
import { fetchAppReleases } from './services/github';
import { trackChangelogOpen } from './utils/analytics';

export function App() {
  const [siteLoading, setSiteLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [appReleases, setAppReleases] = useState({});
  const [releasesLoading, setReleasesLoading] = useState(true);
  const [changelogModal, setChangelogModal] = useState({
    isOpen: false,
    app: null
  });

  // Fetch GitHub releases for all configured apps
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

  // Scroll section observer for Navbar active indicator
  useEffect(() => {
    const sections = ['hero', 'about', 'apps', 'features', 'download'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
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
  }, []);

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
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const mainApp = CONFIG.apps[0];
  const mainReleaseData = appReleases[mainApp.id] || null;

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Initial Hero Loading Screen */}
      {siteLoading && <Loader onFinish={() => setSiteLoading(false)} />}

      {/* Main Website Structure */}
      <div className={`transition-opacity duration-700 ${siteLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Sticky Header Navbar */}
        <Navbar
          activeSection={activeSection}
          onDownloadClick={() => scrollToSection('download')}
        />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section */}
          <Hero
            onDownloadClick={() => scrollToSection('download')}
            onExploreClick={() => scrollToSection('features')}
          />

          {/* AnshuCore Introduction */}
          <About />

          {/* AnshuCore Apps Showcase */}
          <Apps
            appReleases={appReleases}
            loading={releasesLoading}
            onOpenChangelog={handleOpenChangelog}
            onRetry={loadReleases}
          />

          {/* Anshu Mock Feature Showcase */}
          <Features />

          {/* Direct Download Section */}
          <DownloadSection
            app={mainApp}
            releaseData={mainReleaseData}
            onOpenChangelog={() => handleOpenChangelog(mainApp)}
          />
        </main>

        {/* Footer */}
        <Footer
          onNavigate={scrollToSection}
          onOpenChangelog={() => handleOpenChangelog(mainApp)}
        />

        {/* Changelog Release Timeline Modal */}
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

export default App;
