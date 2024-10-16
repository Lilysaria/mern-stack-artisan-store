/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
