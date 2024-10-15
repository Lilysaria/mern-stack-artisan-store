/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  output: 'standalone',
  reactStrictMode: true,
};

export default nextConfig;
