import { format } from "date-fns";

import { db } from "@/lib/db";
import { RoleGate } from "@/components/auth/role-gate";
import { ShippingCostClient } from "./components/client";

const shippingCostGraph = async () => {
  const shippingcosts = await db.shippingPrice.findMany();
  const formattedShippingCosts =
    shippingcosts.map((cost) => ({
      id: cost.id,
      city: cost.city,
      village: cost.village,
      weightRange: cost.weightRange,
      price: cost.price,
      villagePrice: cost.villagePrice,
    })) || [];
  return (
    <RoleGate allowedRole="ADMIN">
      <ShippingCostClient data={formattedShippingCosts} />
    </RoleGate>
  );
};

export default shippingCostGraph;
