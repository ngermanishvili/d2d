import db from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // const users = await db.user.findMany({
    //   where: {
    //     role: "COURIER" || "USER",
    //   },
    // });

    return NextResponse.json(await db.user.findMany());
  } catch (error) {
    console.log("[SHIPMENT_GET]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}
