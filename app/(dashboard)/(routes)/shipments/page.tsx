import { db } from "@/lib/db";
import { format } from "date-fns";

import { ShipmentClient } from "./components/client";
import { ShipmentColumn } from "./components/columns";
import { currentRole, currentUser, currentUserId } from "@/lib/auth";
import { getUserByEmail } from "@/data/user";

const ShipmentPage = async () => {
  const shipments = await db.shipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const user = await getUserByEmail("samxara77@yahoo.com");
  const userRole = await currentRole();
  const userId = await currentUserId();

  const filteredShipments =
    userRole !== "ADMIN"
      ? shipments.filter((item) => {
        return item.userId === userId;
      })
      : shipments;

  const formattedShipments: ShipmentColumn[] = filteredShipments.map(
    (item) => ({
      id: item.id,
      name: item.name,
      lastName: item.lastName,
      city: item.city,
      markedByCourier: item.markedByCourier ? "კი" : "არა",
      brittle: item.brittle ? "კი" : "არა",
      price: item.price,
      phoneNumber: item.phoneNumber,
      address: item.address,
      mimgebisName: item.mimgebisName,
      mimgebisLastname: item.mimgebisLastname,
      mimgebisNumber: item.mimgebisNumber,
      mimgebisAddress: item.mimgebisAddress,
      mimgebiQalaqi: item.mimgebiQalaqi,
      createdAt: item.createdAt.toISOString(), // Convert Date to string
      trackingId: item.trackingId,
      status: item.status,
      courierComment: item.courierComment,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ShipmentClient data={formattedShipments} />
      </div>
    </div>
  );
};

export default ShipmentPage;
