import { db } from "@/lib/db";
import { ShipmentColumn } from "./components/columns";
import { currentRole, currentUserId, currentUserByEmail } from "@/lib/auth";
import { ShipmentClient } from "./components/client";


const ShipmentPage = async () => {
  const userRole = await currentRole();

  let formattedShipments: ShipmentColumn[] = [];

  const userEmail = await currentUserByEmail();
  const shipments = await db.shipment.findMany({
    where: {
      assignedCourier: userEmail,
    },
    include: {
      ShipmentStatusHistory: true, // Include shipment status history
    },
  });
  const amountInTotal = shipments
    .filter((shipmentsTofilter) => {
      return shipmentsTofilter.status === "ჩაბარებული";
    })
    .map((shipmentToMap) => shipmentToMap.price);
  const sumOfNumbersInArray = (numberStrings: string[]): number => {
    let total = 0;

    for (const numStr of numberStrings) {
      try {
        const num = parseFloat(numStr); // Convert the string to a floating-point number
        if (!isNaN(num)) {
          total += num;
        }
      } catch (error) {
        console.error(`Skipping non-numeric value: ${numStr}`);
      }
    }

    return total;
  };

  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8,
    0,
    0
  );
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    20,
    0,
    0
  );

  const amount = shipments
    .filter((shipmentToFilter) => {
      const updatedWithinToday =
        shipmentToFilter.updatedAt &&
        new Date(shipmentToFilter.updatedAt) >= startOfDay &&
        new Date(shipmentToFilter.updatedAt) <= endOfDay;

      return shipmentToFilter.status === "ჩაბარებული" && updatedWithinToday;
    })
    .map((shipmentToMap) => shipmentToMap.price);
  const sumOfTotals = sumOfNumbersInArray(amountInTotal);
  const sumOfToday = sumOfNumbersInArray(amount);
  console.log(
    "🚀 ~ ShipmentPage ~ sumofTotal:",
    sumOfTotals,
    "sum of this day",
    sumOfToday
  );
  formattedShipments = shipments.map((item) => ({
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
    createdAt: item.createdAt.toISOString(),
    trackingId: item.trackingId,
    status: item.status,
    courierComment: item.courierComment,
    assignedCourier: item.assignedCourier
      ? item.assignedCourier
      : "არ არის კურიერი მიბმული",
    shipmentStatusHistory: item.ShipmentStatusHistory,
    updatedAt: item.updatedAt.toISOString(),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {userRole === "ADMIN" || userRole === "COURIER" ? (
          <ShipmentClient data={formattedShipments} />
        ) : (
          <p>არ არის კურიერი მიბმული</p>
        )}
      </div>
    </div>
  );
};

export default ShipmentPage;
