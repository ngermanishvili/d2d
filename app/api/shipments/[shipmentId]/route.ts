import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { shipmentId: string } }
) {
  try {
    if (!params.shipmentId) {
      return new NextResponse("billboardId ID is required", { status: 400 });
    }
    const shipment = await db.shipment.findUnique({
      where: {
        id: params.shipmentId,
      },
    });
    return NextResponse.json(shipment);
  } catch (error) {
    console.log("[SHIPMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { shipmentId: string } }) {
  try {
    const body = await req.json();

    // Extract variables from the request body
    const {
      name,
      lastName,
      phoneNumber,
      address,
      city,
      brittle,
      packaging,
      price,
      markedByCourier,
      mimgebisName,
      mimgebisLastname,
      mimgebisNumber,
      mimgebisAddress,
      mimgebiQalaqi,
      status,
      courierComment,
      label,

    } = body;

    // Validate if shipmentId is provided
    if (!params.shipmentId) {
      return new NextResponse("shipment ID is required", { status: 400 });
    }

    // Find the existing shipment
    const existingShipment = await db.shipment.findUnique({
      where: {
        id: params.shipmentId,
      },
    });

    // Validate if the shipment exists
    if (!existingShipment) {
      return new NextResponse("Shipment not found", { status: 404 });
    }

    // Update the shipment
    const updatedShipment = await db.shipment.updateMany({
      where: {
        id: params.shipmentId,
      },
      data: {
        phoneNumber,
        address,
        city,
        brittle,
        packaging,
        price,
        name,
        lastName,
        markedByCourier,
        mimgebisName,
        mimgebisLastname,
        mimgebisNumber,
        mimgebisAddress,
        mimgebiQalaqi,
        status,
        courierComment,
        label,
      },
    });

    // Create a new entry in ShipmentStatusHistory for the updated status
    await db.shipmentStatusHistory.create({
      data: {
        shipmentId: params.shipmentId,
        status: status,
      },
    });

    return NextResponse.json(updatedShipment);
  } catch (error) {
    console.log("[SHIPMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { shipmentId: string } }
) {
  try {
    if (!params.shipmentId) {
      return new NextResponse("billboardId ID is required", { status: 400 });
    }

    const shipment = await db.shipment.deleteMany({
      where: {
        id: params.shipmentId,
      },
    });

    return NextResponse.json(shipment);
  } catch (error) {
    console.log("[SHIPMENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}