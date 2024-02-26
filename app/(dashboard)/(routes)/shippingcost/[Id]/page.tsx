import { db } from "@/lib/db";

import { ShippingCostForm } from "./components/shipping-cost-form";

const ShippingCostPage = async ({ params }: { params: { Id: string } }) => {
  const shipment = await db.shippingPrice.findUnique({
    where: {
      id: params.Id,
    },
  });
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ShippingCostForm initialData={shipment} />
      </div>
    </div>
  );
};

export default ShippingCostPage;
