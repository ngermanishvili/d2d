import { db } from "@/lib/db";
import { ShipmentForm } from "./components/shipment-form";
import { ShipmentForm2 } from "./components/shipment-form2";

const ShipmentPage = async ({ params }: { params: { shipmentId: string } }) => {
  const shipment = await db.shipment.findUnique({
    where: {
      id: params.shipmentId,
    },
  });
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ShipmentForm2 initialData={shipment} />
      </div>
    </div>
  );
};

export default ShipmentPage;
