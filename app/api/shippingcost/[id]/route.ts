import { NextResponse } from "next/server";

import db from "@/lib/db";

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
    console.log(body);

    const { id, city, village, price, weightRange, villagePrice } = body;
    console.log("🚀 ~ id:", id);

    const shippingPrice = await db.shippingPrice.update({
      where: {
        id: id,
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
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const shipPrice = await db.shippingPrice.deleteMany({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(shipPrice);
  } catch (error) {
    console.log("[landingPageInfo_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
