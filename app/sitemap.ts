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
        }
    ];
};

// Function to generate sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: "https://d2d.ge",
            priority: 1,
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
        // Include generated blog posts URLs
        ...(await generateBlogPostsSitemapObjects()).map((o) => ({
            url: `https://d2d.ge/${o.slug}`,
            lastModified: o.updatedAt,
            priority: o.priority,
        })),
    ];
}
