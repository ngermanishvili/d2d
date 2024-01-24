import {NextResponse, NextRequest} from "next/server";
import {db} from "@/lib/db";
import {currentUserId} from "@/lib/auth";

function generateTrackingNumber(): string {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${timestamp.toString().slice(-8)}-${randomNumber}`;
}

export async function POST(req: Request, {params}: {params: {}}) {
  try {
    const body = await req.json();

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
      whopays,
      agebisDro,
      chabarebisDro,
      itemPrice, // Add itemPrice to the destructuring
    } = body;
    const userId = await currentUserId();

    if (!userId) {
      return new NextResponse("User ID is required", {status: 400});
    }

    if (!phoneNumber) {
      return new NextResponse("Phone number is required", {status: 400});
    }
    if (!address) {
      return new NextResponse("Address is required", {status: 400});
    }

    if (!city) {
      return new NextResponse("City is required", {status: 400});
    }

    if (!price) {
      return new NextResponse("Price is required", {status: 400});
    }

    if (!mimgebiQalaqi) {
      return new NextResponse("mimgebiQalaqi is required", {status: 400});
    }

    if (!name) {
      return new NextResponse("Label is required", {status: 400});
    }

    if (!lastName) {
      return new NextResponse("Image URL is required", {status: 400});
    }

    if (!mimgebisName) {
      return new NextResponse("mimgebisName is required", {status: 400});
    }

    if (!mimgebisLastname) {
      return new NextResponse("mimgebisLastname is required", {status: 400});
    }

    if (!mimgebisNumber) {
      return new NextResponse("mimgebisNumber is required", {status: 400});
    }

    if (!mimgebisAddress) {
      return new NextResponse("mimgebisAddress is required", {status: 400});
    }
    if (!whopays) {
      return new NextResponse("Who pays is required", {status: 400});
    }

    if (whopays === "receiver" && !itemPrice) {
      return new NextResponse("Item price is required", {status: 400});
    }

    const trackingId = generateTrackingNumber();

    const shipment = await db.shipment.create({
      data: {
        name,
        lastName,
        phoneNumber,
        address,
        city,
        brittle,
        packaging,
        price,
        markedByCourier,
        userId,
        mimgebisName,
        mimgebisLastname,
        mimgebisNumber,
        mimgebisAddress,
        mimgebiQalaqi,
        trackingId,
        status,
        courierComment,
        label,
        agebisDro,
        chabarebisDro,
        whopays, // Add whopays to the data
        itemPrice, // Add itemPrice to the data
      },
    });

    return NextResponse.json(shipment);
  } catch (error) {
    console.log("[SHIPMENT_POST]", error);
    return new NextResponse("Internal error BROJ", {status: 500});
  }
}

export async function GET(req: Request, {params}: {params: {}}) {
  try {
    const userId = await currentUserId();

    if (!userId) {
      return new NextResponse("User ID is required", {status: 400});
    }

    const shipments = await db.shipment.findMany({
      where: {userId},
      include: {
        ShipmentStatusHistory: true,
      },
    });

    console.log(JSON.stringify(shipments, null, 2));

    return NextResponse.json(shipments);
  } catch (error) {
    console.error("[SHIPMENT_GET]", error);
    return new NextResponse("Internal error BROJ", {status: 500});
  }
}

export async function DELETE(req: Request) {
  const {ids} = await req.json();

  try {
    const deletedShipments = await db.shipment.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json(deletedShipments);
  } catch (error) {
    console.log("[SHIPMENT_DELETE]", error);
    return new NextResponse("Internal error", {status: 500});
  }
}

export async function PATCH(req: Request) {
  try {
    const {ids, variable} = await req.json();

    const updatedShipments = await db.shipment.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        markedByCourier: variable,
      },
    });

    return NextResponse.json(updatedShipments);
  } catch (error) {
    console.log("[SHIPMENT_UPDATE]", error);
    return new NextResponse("Internal error", {status: 500});
  }
}
