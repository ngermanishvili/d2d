import {format} from "date-fns";

import {BillBoardClient} from "./components/client";
import {BillboardColumn} from "./components/columns";
// import getCurrentUser from "@/app/actions/getCurrentUser";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";

const BillboardsPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const billboards = await db.billboard.findMany();

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  // const currentUser = await getCurrentUser();

  // const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // Load from environment variable

  // const userEmail = currentUser ? currentUser.email : null;

  // if (userEmail !== ADMIN_EMAIL) {
  //   redirect("/");
  // }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
