import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: {} }) {
  try {
    const userId = await currentUserId();

    const adresses = await db.savedAddress.findMany({
      where: { userId: userId },
    });

    return NextResponse.json(adresses);
  } catch (error) {
    console.error("[SHIPMENT_GET]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}
