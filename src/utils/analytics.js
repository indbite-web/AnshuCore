/**
 * Lightweight frontend analytics event handler for AnshuCore
 */
export function trackEvent(eventName, payload = {}) {
  const timestamp = new Date().toISOString();
  const eventData = {
    event: eventName,
    timestamp,
    ...payload
  };

  // Log locally for debugging / developer insights
  if (process.env.NODE_ENV !== 'production') {
    console.log('[AnshuCore Analytics]', eventName, eventData);
  }

  // Dispatch custom window event for optional integrations
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('anshucore_analytics', { detail: eventData })
    );
  }
}

export function trackDownload(appName, version, downloadUrl) {
  trackEvent('app_download_clicked', {
    appName,
    version,
    downloadUrl
  });
}

export function trackChangelogOpen(appName, version) {
  trackEvent('changelog_opened', {
    appName,
    version
  });
}

export function trackNavClick(sectionId) {
  trackEvent('navigation_clicked', {
    sectionId
  });
}
