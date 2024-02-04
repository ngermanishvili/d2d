import { db } from "@/lib/db";
import { ShipmentClient } from "./components/client";
import { ShipmentColumn } from "./components/columns";
import { currentRole, currentUserId } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import ShipmentFormXLSX from "./[shipmentId]/components/shipment-xlsx";
import { useShipmentStoreXLSX } from "@/hooks/xlsx-shipment-store";

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
      packaging: item.packaging ? "sheputulia" : "sheputvis ugareshod",
      price: item.price,
      phoneNumber: item.phoneNumber,
      address: item.address,
      mimgebisName: item.mimgebisName,
      mimgebisLastname: item.mimgebisLastname,
      mimgebisNumber: item.mimgebisNumber,
      mimgebisAddress: item.mimgebisAddress,
      mimgebiQalaqi: item.mimgebiQalaqi,
      createdAt: item.createdAt.toISOString(), // Convert Date to string
      updatedAt: item.updatedAt.toISOString(), // Convert Date to string
      trackingId: item.trackingId,
      status: item.status,
      courierComment: item.courierComment,
      agebisDro: item?.agebisDro,
      chabarebisDro: item?.chabarebisDro,
    })
  );
 

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RoleGate allowedRole="ADMIN">
          <ShipmentClient data={formattedShipments} />
          <ShipmentFormXLSX />
        </RoleGate>
        <RoleGate allowedRole="USER">
          <ShipmentClient data={formattedShipments} />
        </RoleGate>
        {userRole !== "ADMIN" && userRole !== "USER" && (
          <div className="flex items-center justify-center h-[50vh]">
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentPage;
