import db from "@/lib/db";
import { CourierShipmentsClient } from "./components/client";

const UserEditPage = async ({ params }: { params: { id: string } }) => {
  const user = await db.user.findUnique({
    where: { id: params.id },
  });

  const shipments = await db.shipment.findMany({
    where: {
      assignedCourier: user?.email,
    },
  });
  const formattedShipments = shipments.map((item) => {
    return {
      id: item.id,
      mimgebiFullName: item?.mimgebiFullName,
      gamgzavniFullName: item?.gamgzavniFullName,
      city: item.city,
      markedByCourier: item.markedByCourier ? "აღებულია" : "ასაღებია",
      brittle: item.brittle ? "კი" : "არა",
      packaging: item.packaging ? "შეფუთვით" : "შეფუთვის გარეშე",
      price: item.price,
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
      gamgzavnisqalaqi: item?.gamgzavnisqalaqi,
    };
  });
  // .filter((i) => i.status === "ჩაბარებული" || i.status === "დასრულებული");
  if (!user) return { error: "User ar moidzebna" };
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CourierShipmentsClient data={formattedShipments} />
      </div>
    </div>
  );
};

export default UserEditPage;
