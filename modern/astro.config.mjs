import { defineConfig } from 'astro/config';

// P1b experimental static preview; no integration/adapter, API or hosting target.
export default defineConfig({ output: 'static', site: undefined });
