import { CONFIG } from '../config';

const CACHE_PREFIX = 'anshucore_github_cache_';

/**
 * Format bytes into human-readable size string (e.g. 24.3 MB)
 */
export function formatFileSize(bytes) {
  if (!bytes || isNaN(bytes)) return 'N/A';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) {
    return `${mb.toFixed(1)} MB`;
  }
  const kb = bytes / 1024;
  return `${kb.toFixed(0)} KB`;
}

/**
 * Format ISO date string into human-readable format (e.g. Aug 7, 2026)
 */
export function formatReleaseDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch (e) {
    return dateString;
  }
}

/**
 * Filter assets specifically for Android APK files (.apk extension)
 * Excludes source code .zip and .tar.gz archives.
 */
export function findApkAssets(release) {
  if (!release || !Array.isArray(release.assets)) return [];
  return release.assets.filter(
    (asset) => asset.name && asset.name.toLowerCase().endsWith('.apk')
  );
}

/**
 * Get primary APK asset from a release
 */
export function getLatestApk(release) {
  const apkAssets = findApkAssets(release);
  return apkAssets.length > 0 ? apkAssets[0] : null;
}

/**
 * Calculate total downloads across all releases for APK assets
 */
export function calculateTotalDownloads(releases) {
  if (!Array.isArray(releases)) return 0;
  return releases.reduce((total, release) => {
    const apkDownloads = findApkAssets(release).reduce(
      (sum, asset) => sum + (asset.download_count || 0),
      0
    );
    return total + apkDownloads;
  }, 0);
}

/**
 * Get cache key for app
 */
function getCacheKey(appId) {
  return `${CACHE_PREFIX}${appId}`;
}

/**
 * Load cached data from localStorage if valid
 */
function getCachedData(appId) {
  try {
    const raw = localStorage.getItem(getCacheKey(appId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const age = Date.now() - parsed.timestamp;
    if (age < CONFIG.github.cacheDuration) {
      return { ...parsed.data, isCached: true };
    }
  } catch (err) {
    console.warn('Failed to read GitHub cache:', err);
  }
  return null;
}

/**
 * Save data to localStorage
 */
function setCachedData(appId, data) {
  try {
    localStorage.setItem(
      getCacheKey(appId),
      JSON.stringify({
        timestamp: Date.now(),
        data
      })
    );
  } catch (err) {
    console.warn('Failed to save GitHub cache:', err);
  }
}

/**
 * Fetch all GitHub releases for a specified application
 */
export async function fetchAppReleases(appConfig) {
  const appId = appConfig.id;
  const owner = appConfig.github?.owner || 'indbite-web';
  const repo = appConfig.github?.repo || 'Anshu-Mock-';
  const cached = getCachedData(appId);

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const rawReleases = await response.json();

    // Filter out draft releases
    const validReleases = rawReleases.filter((r) => !r.draft);

    // Find latest non-prerelease, or fallback to first non-draft
    const stableReleases = validReleases.filter((r) => !r.prerelease);
    const latestRelease =
      stableReleases.length > 0 ? stableReleases[0] : validReleases[0] || null;

    const latestApkAsset = getLatestApk(latestRelease);
    const totalDownloads = calculateTotalDownloads(validReleases);
    const latestDownloadCount = latestApkAsset ? latestApkAsset.download_count : 0;

    const processedData = {
      rawReleases: validReleases,
      latestRelease,
      latestApkAsset,
      latestVersion: latestRelease ? latestRelease.tag_name || latestRelease.name : 'v1.0.0',
      releaseName: latestRelease ? latestRelease.name : 'Latest Release',
      latestDownloadCount,
      totalDownloads,
      latestSizeFormatted: latestApkAsset ? formatFileSize(latestApkAsset.size) : 'N/A',
      latestDateFormatted: latestRelease ? formatReleaseDate(latestRelease.published_at) : 'N/A',
      downloadUrl: latestApkAsset ? latestApkAsset.browser_download_url : null,
      hasApk: Boolean(latestApkAsset),
      isCached: false,
      error: null
    };

    // Cache successful response
    setCachedData(appId, processedData);
    return processedData;
  } catch (error) {
    console.error(`Error fetching releases for ${appId}:`, error);

    // Return cached version if available
    if (cached) {
      return {
        ...cached,
        isCached: true,
        error: `Using cached data (${error.message})`
      };
    }

    // Graceful fallback when network/API fails and no cache exists
    return {
      rawReleases: [],
      latestRelease: null,
      latestApkAsset: null,
      latestVersion: 'v1.0.0',
      releaseName: 'Anshu Mock Release',
      latestDownloadCount: 0,
      totalDownloads: 0,
      latestSizeFormatted: 'N/A',
      latestDateFormatted: 'N/A',
      downloadUrl: null,
      hasApk: false,
      isCached: false,
      error: error.message || 'Unable to fetch GitHub releases'
    };
  }
}
