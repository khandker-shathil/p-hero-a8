/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
