import { UsersClient } from "./components/client";
import db from "@/lib/db";

const CouriersPage = async () => {
  const users = await db.user.findMany({
    where: { role: "COURIER" },
  });

  const formattedUsers = users.map((item) => ({
    id: item.id,
    name: item.name || "",
    email: item.email || "",
    number: item.number || "",
    image: item.image || "",
    role: item.role,
    input1: item.input1 || "",
    input2: item.input2 || "",
    input3: item.input3 || "",
    input4: item.input4 || "",
    input5: item.input5 || "",
    input6: item.input6 || "",
    input7: item.input7 || "",
    input8: item.input8 || "",
    userType: item.userType || "",
  }));

  return (
    <div style={{ marginTop: "70px" }}>
      <UsersClient data={formattedUsers} />
    </div>
  );
};

export default CouriersPage;
