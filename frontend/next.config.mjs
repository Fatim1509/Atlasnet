/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://atlasnet-production-cc35.up.railway.app/api',
  },
  output: 'standalone',
};

export default nextConfig;
