import SettingsPage from "./_components/settings-body";
import SettingsPage2 from "./_components/settings-body2";
import db from "@/lib/db";
import { currentRole, currentUserId } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
const Settings = async () => {
  const shipments = await db.shipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const userRole = await currentRole();
  const userId = await currentUserId();

  const filteredShipments =
    userRole !== "ADMIN"
      ? shipments.filter((item) => {
          return item.userId === userId;
        })
      : shipments;
  const amount = filteredShipments.length;
  return (
    <>
      {/* <SettingsPage amountOfShipments={amount} />; */}
      <SettingsPage2 amountOfShipments={amount} />
    </>
  );
};

export default Settings;
