import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Static HTML export -> `out/`, which GitHub Pages serves directly.
   * No Node server runs in production, so anything requiring one
   * (image optimization, redirects, rewrites, middleware) is unavailable.
   */
  output: 'export',

  /**
   * Emits `out/projects/<slug>/index.html` instead of `out/projects/<slug>.html`,
   * so static hosts resolve nested routes without extension-guessing.
   */
  trailingSlash: true,

  /**
   * Required with `output: 'export'` — there is no server to optimize images.
   * Source images are therefore committed at their final display size.
   */
  images: {
    unoptimized: true,
  },

  /**
   * This is a GitHub *user* site (Tanawat-Chanhom.github.io), served from the
   * domain root — so no `basePath`/`assetPrefix`. A project site would need both.
   */

  reactStrictMode: true,
};

export default nextConfig;
