import db from "@/lib/db";

import { BlogPostForm } from "./components/blogpost-form";

const BillboardPage = async ({
  params,
}: {
  params: { blogpostsId: string };
}) => {
  const blogposts = await db.blogPosts.findUnique({
    where: {
      id: params.blogpostsId,
    },
  });
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogPostForm initialData={blogposts} />
      </div>
    </div>
  );
};

export default BillboardPage;
