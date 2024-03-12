import { NextResponse } from "next/server";

import db from "@/lib/db";
import { NextURL } from "next/dist/server/web/next-url";

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
      include: {
        couriers: true,
      },
    });
    return NextResponse.json(shipment);
  } catch (error) {
    console.log("[SHIPMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { shipmentId: string } }
) {
  try {
    const body = await req.json();
    // Extract variables from the request body
    const {
      phoneNumber,
      address,
      city,
      brittle,
      packaging,
      price,
      markedByCourier,
      whopays,
      mimgebisNumber,
      mimgebisAddress,
      mimgebiQalaqi,
      status,
      courierComment,
      courierComment2,
      label,
      chabarebisDro,
      gamgzavnisqalaqi,
      mimgebiFullName,
      gamgzavniFullName,
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

    // Check if the status is changed
    const isStatusChanged =
      existingShipment.status !== status && status !== undefined;

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
        markedByCourier,
        mimgebisNumber,
        mimgebisAddress,
        mimgebiQalaqi,
        status,
        courierComment,
        courierComment2,
        label,
        whopays,
        chabarebisDro,
        gamgzavnisqalaqi,
        mimgebiFullName,
        gamgzavniFullName,
      },
    });
    if (!status) {
      return NextResponse.json(updatedShipment);
    }

    // Create a new entry in ShipmentStatusHistory only if the status is changed
    if (isStatusChanged) {
      if (status === "საწყობში") {
        await db.shipment.update({
          where: {
            id: params.shipmentId,
          },
          data: {
            assignedCourier: null,
          },
        });
      }
      await db.shipmentStatusHistory.create({
        data: {
          shipmentId: params.shipmentId,
          status: status,
        },
      });
    }

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
      return new NextResponse("Shipment ID is required", { status: 400 });
    }

    console.log(params.shipmentId);

    // Check if there are any related ShipmentStatusHistory records
    const relatedStatusHistory = await db.shipmentStatusHistory.findMany({
      where: {
        shipmentId: params.shipmentId,
      },
    });

    // If there are related ShipmentStatusHistory records, delete them first
    if (relatedStatusHistory.length > 0) {
      await db.shipmentStatusHistory.deleteMany({
        where: {
          shipmentId: params.shipmentId,
        },
      });
    }
    const relatedCouriers = await db.courier.findMany({
      where: {
        shipmentId: params.shipmentId,
      },
    });

    // If there are related ShipmentStatusHistory records, delete them first
    if (relatedCouriers.length > 0) {
      await db.courier.deleteMany({
        where: {
          shipmentId: params.shipmentId,
        },
      });
    }

    // Now, delete the shipment itself
    const deletedShipment = await db.shipment.deleteMany({
      where: {
        id: params.shipmentId,
      },
    });

    console.log(deletedShipment);

    return NextResponse.json(deletedShipment);
  } catch (error) {
    console.log("[SHIPMENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
