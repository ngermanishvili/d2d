import { format } from "date-fns";

import { BillBoardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import { db } from "@/lib/db";
import { RoleGate } from "@/components/auth/role-gate";

const BillboardsPage = async () => {
  const blogposts = await db.blogPosts.findMany();

  const formattedBillboards: BillboardColumn[] = blogposts.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    slug: item.slug,

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <RoleGate allowedRole="ADMIN">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillBoardClient data={formattedBillboards} />
        </div>
      </div>
    </RoleGate>
  );
};

export default BillboardsPage;
