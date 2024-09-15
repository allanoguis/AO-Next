/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Exclude the backup folder from webpack processing
    config.watchOptions = {
      ignored: /backup/,
    };
    return config;
  },
};

export default nextConfig;
