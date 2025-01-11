/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'assets.aceternity.com', 
            'aceternity.com', 
            'images.unsplash.com', 
            'unsplash.com', 
            'drive.google.com',
            'pbs.twimg.com'
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
