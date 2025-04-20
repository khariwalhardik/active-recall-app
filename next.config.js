/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig = withPWA({
  // your existing Next.js config here
  reactStrictMode: true,
})

module.exports = {
  images: {
    domains: ['localhost', '192.168.31.14'],
  },
};
