// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {}, // Use an empty object or specific turbo options
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    });
    return config;
  },
};
 
export default nextConfig;
 