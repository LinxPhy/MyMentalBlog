/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_URL : 'http://localhost:3000'
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: '**'
        }]
    }
};

export default nextConfig;
