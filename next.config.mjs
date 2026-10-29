/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next Image only permits remote image hosts listed here.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
