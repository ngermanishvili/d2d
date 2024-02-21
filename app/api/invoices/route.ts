import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, url, userId } = body;
    console.log("🚀 ~ POST ~ body:", body);

    const urlsOfXlsx = await db.urlsOfXlsx.create({
      data: { name, url, userId },
    });

    return NextResponse.json(urlsOfXlsx);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}

