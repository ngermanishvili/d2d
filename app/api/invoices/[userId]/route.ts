import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const invoices = await db.urlsOfXlsx.findMany({
      where: {
        userId: params.userId,
      },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const invoices = await db.urlsOfXlsx.deleteMany({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}