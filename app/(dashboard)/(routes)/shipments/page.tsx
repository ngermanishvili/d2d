import {db} from "@/lib/db";
import {format} from "date-fns";

import {ShipmentClientlient} from "./components/client";
import {ShipmentColumn} from "./components/columns";
import {currentRole, currentUserId} from "@/lib/auth";

const ShipmentPage = async () => {
  const shipments = await db.shipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const userRole = await currentRole();
  const userId = await currentUserId();
  const filteredShipments =
    userRole !== "ADMIN"
      ? shipments.filter((item) => item.userId === userId)
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
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ShipmentClientlient data={formattedShipments} />
      </div>
    </div>
  );
};

export default ShipmentPage;
