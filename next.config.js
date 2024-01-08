/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com",
            "cdn.builder.io",
            "png.pngtree.com",
            "encrypted-tbn0.gstatic.com",
        ],
    },
};

module.exports = nextConfig;
