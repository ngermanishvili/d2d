import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const {
      name,
      number,
      email,
      image,
      role,
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      input7,
      input8,
    } = body;

    if (!role) {
      return new NextResponse("price is required", { status: 400 });
    }

    if (!params.id) {
      return new NextResponse("shipment ID is required", { status: 400 });
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
        input1,
        input2,
        input3,
        input4,
        input5,
        input6,
        input7,
        input8,
      },
    });

    return NextResponse.json(shipment);
  } catch (error) {
    console.log("[SHIPMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("billboardId ID is required", { status: 400 });
    }
    const shipment = await db.user.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(shipment);
  } catch (error) {
    console.log("[SHIPMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
