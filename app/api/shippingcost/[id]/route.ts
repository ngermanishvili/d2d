import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("billboardId ID is required", { status: 400 });
    }
    const price = await db.shippingPrice.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(price);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const { city, village, price, weightRange, villagePrice } = body;

    const shippingPrice = await db.shippingPrice.updateMany({
      where: {
        id: params.id,
      },
      data: {
        city,
        village,
        price,
        weightRange,
        villagePrice,
      },
    });

    return NextResponse.json(shippingPrice);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
