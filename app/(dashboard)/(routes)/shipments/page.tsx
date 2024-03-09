import db from "@/lib/db";
import { ShipmentClient } from "./components/client";
import { ShipmentColumn } from "./components/columns";
import { currentRole, currentUserId } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import ShipmentFormXLSX from "./[shipmentId]/components/shipment-xlsx";
import { useShipmentStoreXLSX } from "@/hooks/xlsx-shipment-store";
import Link from "next/link";
import Error404Page from "@/providers/error-page";

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
      mimgebiFullName: item?.mimgebiFullName,
      gamgzavniFullName: item?.gamgzavniFullName,
      city: item.city,
      markedByCourier: item.markedByCourier ? "მოინიშნა" : "არმონიშნულა",
      brittle: item.brittle ? "კი" : "არა",
      packaging: item.packaging ? "შეფუთვით" : "შეფუთვის გარეშე",
      price: item.price,
      label: item.label,
      itemPrice: item.itemPrice,
      priceDif: item.priceDif,
      weightPrice: item.weightPrice,
      packagePrice: item.packagePrice,
      companyPays: item.companyPays,
      phoneNumber: item.phoneNumber,
      address: item.address,
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
      whopays: item?.whopays,
      gamgzavnisqalaqi: item?.gamgzavnisqalaqi,
      courierComment2: item?.courierComment2,
    })
  );

  if (userRole !== "ADMIN" && userRole !== "USER") {
    return <Error404Page />;
  }
  const shipmentCosts = await db.shippingPrice.findMany({});
  const formattedCosts = shipmentCosts.map((e) => e);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RoleGate allowedRole="ADMIN">
          <ShipmentClient data={formattedShipments} />
        </RoleGate>
        <RoleGate allowedRole="USER">
          <ShipmentClient data={formattedShipments} />
        </RoleGate>
        {userRole !== "ADMIN" && userRole !== "USER" && (
          <div className="flex items-center justify-center h-[50vh]"></div>
        )}
      </div>
    </div>
  );
};

export default ShipmentPage;
