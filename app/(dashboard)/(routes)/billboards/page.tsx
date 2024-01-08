import { format } from "date-fns";

import { BillBoardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import { db } from "@/lib/db";

const BillboardsPage = async () => {
  const billboards = await db.billboard.findMany();

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
