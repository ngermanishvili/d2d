
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";


export async function PATCH(req: Request) {
    try {
        const { ids, variable } = await req.json();

        const updatedShipments = await db.shipment.updateMany({
            where: {
                id: {
                    in: ids,
                },
            },
            data: {
                assignedCourier: variable, // Use shemotana directly
            },
        });

        return NextResponse.json(updatedShipments);
    } catch (error) {
        console.log("[SHIPMENT_UPDATE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
