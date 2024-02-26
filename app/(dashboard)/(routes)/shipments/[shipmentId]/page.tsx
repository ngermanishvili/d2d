import { db } from "@/lib/db";
import { ShipmentForm } from "./components/shipment-form";
import { ShipmentForm2 } from "./components/shipment-form2";
import { RoleGate } from "@/components/auth/role-gate";
interface Cost {
  id: string;
  city: string;
  village: string;
  weightRange: string;
  price: string;
  villagePrice: string;
  createdAt: Date;
  updatedAt: Date;
}

interface GroupedCosts {
  [key: string]: {
    weightRanges: {
      weightRange: string;
      price: string;
      villagePrice: string;
    }[];
    villages?: {
      name: string;
      weightRanges: {
        weightRange: string;
        price: string;
        villagePrice: string;
      }[];
    }[];
  };
}
const ShipmentPage = async ({ params }: { params: { shipmentId: string } }) => {
  const shipment = await db.shipment.findUnique({
    where: {
      id: params.shipmentId,
    },
  });
  const shipmentCosts = await db.shippingPrice.findMany({});
  const formattedCosts = shipmentCosts.map((e) => e);
  console.log("🚀 ~ ShipmentPage ~ formattedCosts:", formattedCosts);
  const groupCostsByCity = (formattedCosts: Cost[]): GroupedCosts => {
    return formattedCosts.reduce<GroupedCosts>((acc, cost) => {
      const { city, village, weightRange, price, villagePrice } = cost;
      const key = city;

      if (!acc[key]) {
        acc[key] = { weightRanges: [], villages: [] };
      }

      if (village) {
        const existingVillage = acc[key].villages?.find(
          (v) => v.name === village
        );
        if (existingVillage) {
          existingVillage.weightRanges.push({
            weightRange,
            price,
            villagePrice,
          });
        } else {
          acc[key].villages?.push({
            name: village,
            weightRanges: [{ weightRange, price, villagePrice }],
          });
        }
      } else {
        acc[key].weightRanges.push({ weightRange, price, villagePrice });
      }

      return acc;
    }, {});
  };
  // Usage
  const groupedCosts: GroupedCosts = groupCostsByCity(formattedCosts);
  console.log(groupedCosts, "alo");
  return (
    <>
      <RoleGate allowedRole="ADMIN">
        <div className="flex-col ">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ShipmentForm2 shipmentCosts={groupedCosts}  initialData={shipment} />
          </div>
        </div>
      </RoleGate>
      <RoleGate allowedRole="USER">
        <div className="flex-col ">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ShipmentForm2 shipmentCosts={groupedCosts} initialData={shipment} />
          </div>
        </div>
      </RoleGate>

      <RoleGate allowedRole="ACCOUNTANT">
        <div className="flex-col ">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ShipmentForm2 shipmentCosts={groupedCosts}  initialData={shipment} />
          </div>
        </div>
      </RoleGate>
    </>
  );
};

export default ShipmentPage;
