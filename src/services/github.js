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
  return release.assets.filter((asset) => {
    if (!asset || !asset.name) return false;
    const lowerName = asset.name.toLowerCase();
    // Explicitly ignore source code archives
    if (lowerName.endsWith('.zip') || lowerName.endsWith('.tar.gz') || lowerName.endsWith('.tgz')) {
      return false;
    }
    return lowerName.endsWith('.apk');
  });
}

/**
 * Get primary APK asset from a specific release
 */
export function getApkAsset(release) {
  const apkAssets = findApkAssets(release);
  return apkAssets.length > 0 ? apkAssets[0] : null;
}

// Alias for getApkAsset for backward compatibility
export const getLatestApk = getApkAsset;

/**
 * Calculate total downloads across all releases for APK assets
 */
export function calculateTotalDownloads(releases) {
  if (!Array.isArray(releases)) return 0;
  return releases.reduce((total, release) => {
    const apkAssets = findApkAssets(release);
    const apkDownloads = apkAssets.reduce(
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
 * Fetch latest release from /releases/latest endpoint specifically for latest APK info.
 */
export async function fetchLatestRelease(owner, repo) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    }
  );
  if (!response.ok) {
    throw new Error(`GitHub API /releases/latest error: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Fetch all releases from /releases endpoint for Updates/Changelog and historical versions.
 */
export async function fetchAllReleases(owner, repo) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    }
  );
  if (!response.ok) {
    throw new Error(`GitHub API /releases error: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Fetch GitHub release data according to strict architectural guidelines:
 * 1. GET /repos/:owner/:repo/releases/latest -> ONLY for main/latest APK download info
 * 2. GET /repos/:owner/:repo/releases -> for Updates/Changelog page and historical releases
 */
export async function fetchAppReleases(appConfig) {
  const appId = appConfig.id;
  const owner = appConfig.github?.owner || 'indbite-web';
  const repo = appConfig.github?.repo || 'Anshu-Mock-';
  const cached = getCachedData(appId);

  try {
    const [latestReleaseData, allReleasesData] = await Promise.all([
      fetchLatestRelease(owner, repo).catch((err) => {
        console.warn('Could not fetch /releases/latest:', err);
        return null;
      }),
      fetchAllReleases(owner, repo).catch((err) => {
        console.warn('Could not fetch /releases:', err);
        return [];
      })
    ]);

    // Filter out draft releases from all releases array
    const validReleases = Array.isArray(allReleasesData)
      ? allReleasesData.filter((r) => !r.draft)
      : [];

    // Fallback: If /releases/latest failed or returned null, use first non-draft non-prerelease from /releases
    let latestRelease = latestReleaseData;
    if (!latestRelease || latestRelease.draft) {
      const stable = validReleases.filter((r) => !r.prerelease);
      latestRelease = stable.length > 0 ? stable[0] : validReleases[0] || null;
    }

    // Extract latest APK asset specifically from latest release endpoint result
    const latestApkAsset = getApkAsset(latestRelease);

    // Calculate total downloads across all historical releases
    const totalDownloads = calculateTotalDownloads(validReleases);
    const latestDownloadCount = latestApkAsset ? (latestApkAsset.download_count || 0) : 0;

    const processedData = {
      rawReleases: validReleases,
      latestRelease,
      latestApkAsset,
      latestVersion: latestRelease ? (latestRelease.tag_name || latestRelease.name) : '',
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
      latestVersion: '',
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
