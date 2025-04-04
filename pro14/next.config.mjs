/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXTAUTH_URL: "http://localhost:3000", // Update for production
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
};

export default nextConfig;