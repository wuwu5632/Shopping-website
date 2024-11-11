/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com", // Add this line
      },
    ],
    domains: ["people.pic1.co"],
    domains: ['people.pic1.co', 'app-uploads-cdn.fera.ai'],
  },
};

export default nextConfig;
