/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      crypto: false,
      fs: false,
      os: false,
      path: false,
      http: false,
      https: false,
      stream: false,
      os: false,
      constants: false,
      path: false,
      tty: false,
      zlib: false,
    };

    return config;
  },

};