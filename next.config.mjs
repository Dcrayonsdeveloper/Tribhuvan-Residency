/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.84", "localhost"],
  async redirects() {
    return [
      {
        source: "/rooms/super-deluxe-room",
        destination: "/rooms/deluxe-room",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
