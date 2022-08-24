/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_API_URL: "https://api.sacredchankproductions.com/",
    BASE_URL: "https://admin.sacredchankproductions.com/",
  },
};

module.exports = nextConfig;
