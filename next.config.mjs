import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Prevent a parent directory's lockfile from being selected as the app root.
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
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
