// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   // Remove any custom CSS configuration if you're not using it
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        // Your Turbopack configuration here if needed
      }
    }
  }
};

module.exports = nextConfig;