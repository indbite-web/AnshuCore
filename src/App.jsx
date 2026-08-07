import React, { useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
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
      const offset = 72;
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
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Initial Hero Light Loader */}
      {siteLoading && <Loader onFinish={() => setSiteLoading(false)} />}

      {/* Main Website Container */}
      <div className={`transition-opacity duration-500 ${siteLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Navbar Header */}
        <Navbar
          activeSection={activeSection}
          onDownloadClick={() => scrollToSection('download')}
        />

        {/* Main Content Sections */}
        <main>
          <Hero
            onDownloadClick={() => scrollToSection('download')}
            onExploreClick={() => scrollToSection('features')}
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

export default App;
