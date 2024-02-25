import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const shippingCosts = await db.shippingPrice.findMany();

    return NextResponse.json(shippingCosts);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const { city, village, price, weightRange, villagePrice } = body;

    const shippingCost = await db.shippingPrice.create({
      data: {
        city,
        village,
        price,
        weightRange,
        villagePrice,
      },
    });

    return NextResponse.json(shippingCost);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}
