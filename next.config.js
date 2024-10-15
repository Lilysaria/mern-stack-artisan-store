/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  output: 'standalone',
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Set-Cookie',
            value: '__vercel_live_token=; Path=/; SameSite=None; Secure',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
