import { update } from '@/auth';
import { MetadataRoute } from 'next'

const generateBlogPostsSitemapObjects = async () => {
    return [
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
            slug: "/",
            updatedAt: new Date(),
            priority: 1,

        }
    ];
};


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

        ...(await generateBlogPostsSitemapObjects()).map((o) => ({
            url: `https://d2d.ge/blogposts/${o.slug}`,
            lastModified: o.updatedAt,
        })),
    ];
}