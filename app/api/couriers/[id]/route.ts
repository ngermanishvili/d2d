import {NextResponse} from "next/server";

import {db} from "@/lib/db";

export async function PATCH(req: Request, {params}: {params: {id: string}}) {
  try {
    const body = await req.json();

    const {name, number, email, image, role} = body;

    if (!number) {
      return new NextResponse("phoneNumber is required", {status: 400});
    }

    if (!email) {
      return new NextResponse("address is required", {status: 400});
    }

    if (!image) {
      return new NextResponse("city is required", {status: 400});
    }

    if (!role) {
      return new NextResponse("price is required", {status: 400});
    }

    if (!params.id) {
      return new NextResponse("shipment ID is required", {status: 400});
    }

    const shipment = await db.user.updateMany({
      where: {
        id: params.id,
      },
      data: {
        name,
        email,
        role,
        image,
        number,
      },
    });

    return NextResponse.json(shipment);
  } catch (error) {
    console.log("[SHIPMENT_PATCH]", error);
    return new NextResponse("Internal error", {status: 500});
  }
}
