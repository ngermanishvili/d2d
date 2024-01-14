import {NextResponse} from "next/server";
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
      price,
      markedByCourier,
      mimgebisName,
      mimgebisLastname,
      mimgebisNumber,
      mimgebisAddress,
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

    const trackingId = generateTrackingNumber();

    const shipment = await db.shipment.create({
      data: {
        name,
        lastName,
        phoneNumber,
        address,
        city,
        brittle,
        price,
        markedByCourier,
        userId,
        mimgebisName,
        mimgebisLastname,
        mimgebisNumber,
        mimgebisAddress,
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
    });

    return NextResponse.json(shipments);
  } catch (error) {
    console.log("[SHIPMENT_GET]", error);
    return new NextResponse("Internal error BROJ", {status: 500});
  }
}
