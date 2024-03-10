import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { trackingId: string } }
) {
  try {
    const shipments = await db.shipment.findUnique({
      where: { trackingId: params.trackingId },
      include: {
        ShipmentStatusHistory: true,
      },
    });

    return NextResponse.json(shipments);
  } catch (error) {
    console.error("[SHIPMENT_GET]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}
