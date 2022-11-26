/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.']
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    domains: [],
    deviceSizes: [576, 768, 992, 1184, 1472, 1920, 2048, 3840]
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return { beforeFiles: [], afterFiles: [] };
  }
});
