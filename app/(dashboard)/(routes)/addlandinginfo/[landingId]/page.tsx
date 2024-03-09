import db from "@/lib/db";

import { BlogPostForm } from "./components/landing-form";

const BillboardPage = async ({ params }: { params: { landingId: string } }) => {
  const landingPageInfo = await db.landingPageInfo.findUnique({
    where: {
      id: params.landingId,
    },
  });
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogPostForm initialData={landingPageInfo} />
      </div>
    </div>
  );
};

export default BillboardPage;
