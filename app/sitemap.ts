import { MetadataRoute } from 'next'

const generateBlogPostsSitemapObjects = async () => {
    return [
        {
            slug: "blog-post-1",
            updatedAt: new Date(),
        },
        {
            slug: "blog-post-2",
            updatedAt: new Date(),
        },
    ];
};


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: "https://d2d.ge",
            priority: 1,
        },
        {
            url: "https://acme.com/blogposts",
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://d2d.ge/about",
            priority: 0.7,
        },
        {
            url: "https://d2d.ge/services",
            priority: 0.6,
        },
        ...(await generateBlogPostsSitemapObjects()).map((o) => ({
            url: `https://d2d.ge/blogposts/${o.slug}`,
            lastModified: o.updatedAt,
        })),
    ];
}