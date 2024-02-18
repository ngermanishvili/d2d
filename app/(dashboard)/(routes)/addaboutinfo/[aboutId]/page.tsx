import { db } from "@/lib/db";

import { BlogPostForm } from "./components/landing-form";

const BillboardPage = async ({ params }: { params: { aboutId: string } }) => {
  const aboutPageInfo = await db.aboutPageInfo.findUnique({
    where: {
      id: params.aboutId,
    },
  });
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogPostForm initialData={aboutPageInfo} />
      </div>
    </div>
  );
};

export default BillboardPage;
