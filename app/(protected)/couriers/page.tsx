import {format} from "date-fns";

import {UsersClient} from "./components/client";
import {UsersColumn} from "./components/columns";
import {db} from "@/lib/db";
import {fetchUserForAdmin} from "@/hooks/fetch-user-data";

const CouriersPage = async () => {
  const billboards = await fetchUserForAdmin();

  const formattedBillboards: UsersColumn[] = billboards.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
  }));
  return (
    <div style={{marginTop: "70px"}}>
      <UsersClient data={formattedBillboards} />
    </div>
  );
};

export default CouriersPage;
