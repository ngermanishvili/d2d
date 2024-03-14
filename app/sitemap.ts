import { MetadataRoute } from 'next';

// Function to generate objects for blog posts sitemap
const generateBlogPostsSitemapObjects = async () => {
    return [
        {
            slug: "",
            priority: 1,
            updatedAt: new Date(),
        },
        {
            slug: "blogposts",
            priority: 0.8,
            updatedAt: new Date(),
        },
        {
            slug: "about",
            priority: 0.8,
            updatedAt: new Date(),
        },
        {
            slug: "info/contact",
            priority: 0.8,
            updatedAt: new Date(),
        },
        {
            slug: "info/privacy-policy",
            priority: 0.8,
            updatedAt: new Date(),
        },

        {
            slug: "blogposts/cde70d96-1aa2-45b0-a8df-090ce8eef7f6",
            priority: 0.5,
            updatedAt: new Date()
        },
        {
            slug: "blogposts/297f3418-4d49-4ce0-9a10-2f966e39c31d",
            priority: 0.5,
            updatedAt: new Date()
        },
        {
            slug: "blogposts/7691621a-f44c-4b49-8e23-d1641563713c",
            priority: 0.5,
            updatedAt: new Date()
        },
        {
            slug: "blogposts/b9811b30-f470-48b7-9e9b-f1e1033937ef",
            priority: 0.5,
            updatedAt: new Date()
        },
    ];
};

// Function to generate sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: "https://d2d.ge",
            priority: 1,
            changeFrequency: "daily",
        },
        {
            url: "https://d2d.ge/blogposts",
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://d2d.ge/about",
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://d2d.ge/blogposts/cde70d96-1aa2-45b0-a8df-090ce8eef7f6",
            priority: 0.5,
            changeFrequency: "weekly",

        },
        {
            url: "https://d2d.ge/blogposts/297f3418-4d49-4ce0-9a10-2f966e39c31d",
            priority: 0.5,
            changeFrequency: "weekly",


        },
        {
            url: "https://d2d.ge/blogposts/7691621a-f44c-4b49-8e23-d1641563713c",
            priority: 0.5,
            changeFrequency: "weekly",

        },
        {
            url: "https://d2d.ge/blogposts/b9811b30-f470-48b7-9e9b-f1e1033937ef",
            priority: 0.5,
            changeFrequency: "weekly",
        },
        // Include generated blog posts URLs
        ...(await generateBlogPostsSitemapObjects()).map((o) => ({
            url: `https://d2d.ge/${o.slug}`,
            lastModified: o.updatedAt,
            priority: o.priority,
            changefreq: "daily",
        })),
    ];
}
