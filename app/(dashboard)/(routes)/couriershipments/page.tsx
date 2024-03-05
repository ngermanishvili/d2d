import { db } from "@/lib/db";
import { ShipmentColumn } from "./components/columns";
import { currentRole, currentUserId, currentUserByEmail } from "@/lib/auth";
import { ShipmentClient } from "./components/client";
import Error404Page from "@/providers/error-page";

const CouriersShipmentsPage = async () => {
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
    orderBy: {
      createdAt: "desc",
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

  formattedShipments = shipments.map((item) => {
    if (!item.packagePrice || !item.itemPrice) {
      return {
        id: item.id,
        mimgebiFullName: item?.mimgebiFullName,
        gamgzavniFullName: item?.gamgzavniFullName,
        city: item.city,
        markedByCourier: item.markedByCourier ? "კი" : "არა",
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
    } else {
      return {
        id: item.id,
        mimgebiFullName: item?.mimgebiFullName,
        gamgzavniFullName: item?.gamgzavniFullName,
        city: item.city,
        markedByCourier: item.markedByCourier ? "კი" : "არა",
        brittle: item.brittle ? "კი" : "არა",
        packaging: item.packaging ? "შეფუთვით" : "შეფუთვის გარეშე",
        price:
          item.whopays === "Sender" &&
          item.status === "მიმდინარე" &&
          item.weightPrice
            ? (
                parseFloat(item.weightPrice) + parseFloat(item.packagePrice)
              ).toString()
            : item.whopays === "Receiver" &&
              item.status !== "აღებული" &&
              item.weightPrice &&
              item.status === "გატანილი ჩასაბარებლად" &&
              item.itemPrice
            ? (
                parseFloat(item.weightPrice) +
                parseFloat(item.packagePrice) +
                parseFloat(item.itemPrice)
              ).toString()
            : "ინვოისით გადახდა",
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
    }
  });

  if (userRole !== "ADMIN" && userRole !== "COURIER") {
    return <Error404Page />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ShipmentClient data={formattedShipments} />
      </div>
    </div>
  );
};

export default CouriersShipmentsPage;
