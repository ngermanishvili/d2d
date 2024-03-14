import { MetadataRoute } from 'next';
import { useParams } from 'next/navigation';
// Function to generate objects for blog posts sitemap
const GenerateBlogPostsSitemapObjects = async () => {
    return [
        { slug: "", priority: 1, updatedAt: new Date() },
        { slug: "blogposts", priority: 0.8, updatedAt: new Date() },
        { slug: "about", priority: 0.8, updatedAt: new Date() },
        { slug: "info/contact", priority: 0.8, updatedAt: new Date() },
        { slug: "info/privacy-policy", priority: 0.8, updatedAt: new Date() },
        { slug: "blogposts/cde70d96-1aa2-45b0-a8df-090ce8eef7f6", priority: 0.5, updatedAt: new Date() },
        { slug: "blogposts/297f3418-4d49-4ce0-9a10-2f966e39c31d", priority: 0.5, updatedAt: new Date() },
        { slug: "blogposts/7691621a-f44c-4b49-8e23-d1641563713c", priority: 0.5, updatedAt: new Date() },
        { slug: "blogposts/b9811b30-f470-48b7-9e9b-f1e1033937ef", priority: 0.5, updatedAt: new Date() },

    ];
};

// Function to generate main sitemap
export default async function GenerateSitemap(): Promise<MetadataRoute.Sitemap> {
    const params = useParams();
    try {
        const baseSitemap = [
            { url: "https://d2d.ge", priority: 1 },
            { url: "https://d2d.ge/blogposts", changeFrequency: "weekly" as const, priority: 0.8 },
            { url: "https://d2d.ge/about", changeFrequency: "weekly" as const, priority: 0.8 }
        ];

        const blogPostsSitemap = (await GenerateBlogPostsSitemapObjects()).map((o) => ({
            url: `https://d2d.ge/blogposts/${params.blogpostId}`,
            lastModified: o.updatedAt,
            priority: o.priority
        }));

        return [...baseSitemap, ...blogPostsSitemap];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [];
    }
}