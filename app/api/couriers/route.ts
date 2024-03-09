import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await db.user.findMany({
      where: {
        role: UserRole.USER 
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        input1: true,
        input2: true,
        input3: true,
        input4: true,
        input5: true,
        input6: true,
        input7: true,
        input8: true,
        userType: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("[SHIPMENT_GET]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}