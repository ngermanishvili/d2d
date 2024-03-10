import { NextResponse } from "next/server";
import db from "@/lib/db";

function generateTrackingNumber(): string {
  const randomNumber = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0");
  return `INV-${randomNumber}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      url,
      userId,
      createdAt,
      updatedAt,
      angarishsworeba,
      sruliPasebisjami,
      sruliPasebisMinusJami,
      wonisPasebisJami,
      servisisPasebisJami,
    } = body;
    console.log("🚀 ~ POST ~ body:", body);

    const invoiceNumber = generateTrackingNumber();

    const urlsOfXlsx = await db.urlsOfXlsx.create({
      data: {
        invoiceNumber,
        name,
        url,
        userId,
        createdAt,
        angarishsworeba,
        updatedAt,
        sruliPasebisjami,
        sruliPasebisMinusJami,
        wonisPasebisJami,
        servisisPasebisJami,
      },
    });

    return NextResponse.json(urlsOfXlsx);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const invoices = await db.urlsOfXlsx.findMany({
      where: {},
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      url,
      userId,
      createdAt,
      updatedAt,
      sruliPasebisjami,
      angarishsworeba,

      sruliPasebisMinusJami,
      wonisPasebisJami,
      servisisPasebisJami,
    } = body;
    console.log("🚀 ~ PATCH ~ body:", body);

    const urlsOfXlsx = await db.urlsOfXlsx.updateMany({
      where: {
        id: body.id,
      },

      data: {
        name,
        url,
        userId,
        createdAt,
        angarishsworeba,

        updatedAt,
        sruliPasebisjami,
        sruliPasebisMinusJami,
        wonisPasebisJami,
        servisisPasebisJami,
      },
    });

    return NextResponse.json(urlsOfXlsx);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}
