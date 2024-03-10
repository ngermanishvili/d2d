import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuid } from "uuid";

export async function PATCH(req: Request) {
  try {
    const { ids, variable } = await req.json();
    console.log(ids, "patch courierupdate");
    const updatedShipments = await db.shipment.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        assignedCourier: variable, // Assign courier id to shipments
      },
    });

    // Check if the courier already exists
    ids.forEach(async (element: string) => {
      console.log(element, "foreacheidnnasnda");
      await db.courier.create({
        data: {
          email: variable,
          shipmentId: element,
        },
      });
    });

    // Update shipments with the assigned courier

    return NextResponse.json(updatedShipments);
  } catch (error) {
    console.log("[SHIPMENT_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
