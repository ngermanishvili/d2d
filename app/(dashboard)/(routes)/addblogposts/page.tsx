import { format } from "date-fns";

import { BillBoardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import db from "@/lib/db";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import Error404Page from "@/providers/error-page";

const BillboardsPage = async () => {
  const userRole = await currentRole();
  const blogposts = await db.blogPosts.findMany();

  const formattedBillboards: BillboardColumn[] = blogposts.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    slug: item.slug,
    qvesatauri: item.qvesatauri,
    qvesatauri2: item.qvesatauri2,

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  if (userRole !== "ADMIN") {
    return <Error404Page />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
