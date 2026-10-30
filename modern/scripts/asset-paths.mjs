import path from 'node:path';

/** One base path for local root builds and optional static subpath hosting. */
export function normalizeBasePath(raw = '/') {
  if (typeof raw !== 'string' || !/^\/(?:[A-Za-z0-9._~-]+\/)*$/.test(raw) ||
      raw.split('/').some(segment => segment === '.' || segment === '..')) {
    throw new Error('DEMO_BASE_PATH must be / or a safe absolute path ending in /, e.g. /opalubka/');
  }
  return raw;
}

/** Works for both POSIX and Windows (including drive letters and UNC roots). */
export function isWithinDirectory(root, candidate, pathApi = path) {
  const relative = pathApi.relative(root, candidate);
  return relative !== '' && relative !== '..' &&
    !relative.startsWith('..' + pathApi.sep) && !pathApi.isAbsolute(relative);
}

/**
 * Resolve a same-origin root-absolute URL in a built HTML file to a file beneath
 * dist, respecting the base prefix. Reject mismatched root paths and traversal.
 */
export function resolveBuiltAsset(root, source, base = '/', pathApi = path) {
  const prefix = normalizeBasePath(base);
  if (typeof source !== 'string' || !source.startsWith(prefix) || source.startsWith('//')) {
    throw new Error('asset must use the selected base ' + prefix + ': ' + source);
  }
  const pathname = source.split(/[?#]/)[0];
  const remainder = pathname.slice(prefix.length);
  if (!remainder || remainder.startsWith('/') || remainder.includes('\\')) {
    throw new Error('invalid built asset path: ' + source);
  }
  let decoded;
  try {
    decoded = decodeURIComponent(remainder);
  } catch {
    throw new Error('invalid percent encoding in asset URL: ' + source);
  }
  if (decoded.includes('\\') || decoded.includes('\0') || decoded.startsWith('/')) {
    throw new Error('invalid decoded built asset path: ' + source);
  }
  const candidate = pathApi.resolve(root, decoded);
  if (!isWithinDirectory(root, candidate, pathApi)) {
    throw new Error('asset escapes dist: ' + source);
  }
  return candidate;
}
