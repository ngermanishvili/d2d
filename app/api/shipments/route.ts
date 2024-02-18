import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";
import { generateCustomId } from "@/hooks/uuid";
import { v4 as uuid } from "uuid";
async function generateTrackingNumber() {
  // Retrieve current count
  let shipmentCounter = await db.shipmentCounter.findFirst();

  // If no record exists, create a new one with an initial count
  if (!shipmentCounter) {
    shipmentCounter = await db.shipmentCounter.create({
      data: {
        count: 4000, // Initial count value
      },
    });
  }

  // Increment count
  const newCount = shipmentCounter.count + 1;

  // Generate 4-digit random number

  // Update count in database
  await db.shipmentCounter.update({
    where: { id: shipmentCounter.id },
    data: { count: newCount },
  });

  // Return tracking number
  return `${newCount}`;
}

export async function POST(req: Request, { params }: { params: {} }) {
  try {
    const body = await req.json();
    const {
      mimgebiFullName,
      gamgzavniFullName,
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
      orderComment,
      label,
      whopays,
      agebisDro,
      chabarebisDro,
      itemPrice, // Add itemPrice to the destructuring
      gamgzavnisqalaqi,
    } = body;
    const userId = await currentUserId();

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    if (!phoneNumber) {
      return new NextResponse("Phone number is required", { status: 400 });
    }
    // if (!address) {
    //   return new NextResponse("Address is required", { status: 400 });
    // }

    if (!city) {
      return new NextResponse("City is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    // if (!mimgebiQalaqi) {
    //   return new NextResponse("mimgebiQalaqi is required", { status: 400 });
    // }

    if (!mimgebiFullName) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!gamgzavniFullName) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!mimgebisNumber) {
      return new NextResponse("mimgebisNumber is required", { status: 400 });
    }

    if (!mimgebisAddress) {
      return new NextResponse("mimgebisAddress is required", { status: 400 });
    }
    console.log("aloooooo");
    if (!whopays) {
      return new NextResponse("Who pays is required", { status: 400 });
    }

    const trackingId = await generateTrackingNumber();
    if (!trackingId) {
      return new NextResponse("Tracking could not be generated", {
        status: 400,
      });
    }

    const customId = generateCustomId(trackingId, uuid());

    const shipmentId = await db.shipment
      .create({
        data: {
          id: customId,
          phoneNumber,
          address,
          city,
          brittle,
          packaging,
          price,
          markedByCourier,
          userId,
          mimgebisNumber,
          mimgebisAddress,
          mimgebiQalaqi,
          trackingId,
          status,
          courierComment,
          orderComment,
          label,
          agebisDro,
          chabarebisDro,
          whopays, // Add whopays to the data
          itemPrice, // Add itemPrice to the data
          gamgzavnisqalaqi,
          mimgebiFullName,
          gamgzavniFullName,
        },
      })
      .then((createdShipment) => {
        const id = createdShipment.id; // Accessing the id of the created shipment
        return id;
      });
    let savedAdress; // Declare the variable here
    const isSaved = await db.savedAddress.findMany({
      where: {},
    });
    const arr = isSaved.map((item) => item.address);
    if (!arr.includes(address)) {
      console.log(isSaved, arr);
      console.log("shemovida");
      savedAdress = await db.savedAddress.create({
        data: { userId: userId, address: address, mimgebisadress: address },
      });
    }
    if (!shipmentId) {
      return new NextResponse("Failed to create shipment", { status: 500 });
    }

    return NextResponse.json({ shipmentId, savedAdress });
  } catch (error) {
    console.log("[SHIPMENT_POST]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: {} }) {
  try {
    const userId = await currentUserId();

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const shipments = await db.shipment.findMany({
      where: { userId },
      include: {
        ShipmentStatusHistory: true,
      },
    });

    console.log(JSON.stringify(shipments, null, 2));

    console.log(JSON.stringify(shipments, null, 2));

    return NextResponse.json(shipments);
  } catch (error) {
    console.error("[SHIPMENT_GET]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { ids } = await req.json();

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
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { ids, variable } = await req.json();

    console.log("Received PATCH request with IDs:", ids);

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

    console.log("Updated shipments:", updatedShipments);

    // Log the updated shipment data
    console.log("Updated shipment data:", updatedShipments);

    return NextResponse.json(updatedShipments);
  } catch (error) {
    console.error("[SHIPMENT_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
