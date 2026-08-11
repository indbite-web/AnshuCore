import { CONFIG } from '../config.js';

const CACHE_PREFIX = 'anshucore_github_cache_v3_';

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
 * Parse semantic version string (e.g., "v1.2.0" -> [1, 2, 0])
 */
export function parseSemVer(v) {
  if (!v) return [0, 0, 0];
  const clean = String(v).replace(/^v/i, '').trim();
  const parts = clean.split('.').map((p) => parseInt(p, 10) || 0);
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
}

/**
 * Compare two semantic version strings
 * Returns > 0 if v1 > v2, < 0 if v1 < v2, 0 if equal
 */
export function compareSemVer(v1, v2) {
  const p1 = parseSemVer(v1);
  const p2 = parseSemVer(v2);
  for (let i = 0; i < 3; i++) {
    if (p1[i] !== p2[i]) return p1[i] - p2[i];
  }
  return 0;
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
 * Includes supplementary tag fetching to ensure no published release tag (e.g. 1.2.0) is missed.
 */
export async function fetchAllReleases(owner, repo) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    }
  );
  if (!response.ok) {
    throw new Error(`GitHub API /releases error: ${response.status} ${response.statusText}`);
  }
  const releases = await response.json();

  // Supplementary fetch: Query repository tags to ensure no published release tag (e.g. 1.2.0) is missed
  try {
    const tagsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/tags?per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );
    if (tagsResponse.ok) {
      const tags = await tagsResponse.json();
      const existingTagNames = new Set(
        releases.map((r) => (r.tag_name || '').toLowerCase())
      );

      const missingTags = tags.filter((t) => {
        if (!t || !t.name) return false;
        const nameLower = t.name.toLowerCase();
        const unvName = nameLower.replace(/^v/i, '');
        return (
          !existingTagNames.has(nameLower) &&
          !existingTagNames.has(`v${unvName}`) &&
          !existingTagNames.has(unvName)
        );
      });

      if (missingTags.length > 0) {
        const fetchedMissing = await Promise.all(
          missingTags.map(async (tag) => {
            try {
              const relRes = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag.name}`,
                {
                  headers: {
                    Accept: 'application/vnd.github.v3+json'
                  }
                }
              );
              if (relRes.ok) {
                return await relRes.json();
              }
            } catch (err) {
              console.warn(`Could not fetch release for tag ${tag.name}:`, err);
            }
            return null;
          })
        );

        fetchedMissing.forEach((rel) => {
          if (
            rel &&
            rel.id &&
            !releases.some((r) => r.id === rel.id || r.tag_name === rel.tag_name)
          ) {
            releases.push(rel);
          }
        });
      }
    }
  } catch (err) {
    console.warn('Could not fetch tags for release verification:', err);
  }

  return releases;
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

    // Sort descending by Semantic Version, falling back to release date if semvers are equal
    validReleases.sort((a, b) => {
      const semverDiff = compareSemVer(b.tag_name || b.name, a.tag_name || a.name);
      if (semverDiff !== 0) return semverDiff;
      return new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at);
    });

    // Fallback: If /releases/latest failed or returned null, use first valid release from sorted list
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

    const rawVersion = latestRelease ? (latestRelease.tag_name || latestRelease.name) : '';
    const latestVersion = rawVersion
      ? (rawVersion.startsWith('v') || rawVersion.startsWith('V') ? rawVersion : `v${rawVersion}`)
      : '';

    const processedData = {
      rawReleases: validReleases,
      latestRelease,
      latestApkAsset,
      latestVersion,
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

