import { defineConfig } from 'astro/config';
import { normalizeBasePath } from './scripts/asset-paths.mjs';

// Default: root (e.g. standalone static host). Optional: /opalubka/ project subpath.
// This is a build-time fixture, NOT a decision to publish on any particular host.
const base = normalizeBasePath(process.env.DEMO_BASE_PATH || '/');
export default defineConfig({ output: 'static', base });
