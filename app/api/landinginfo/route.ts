import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title,
      description,
      imageUrl, panjara1Title, panjara1Description, panjara2Title, panjara2Description, panjara3Title, panjara3Description, InformationText } = body;


    const landingPageInfo = await db.landingPageInfo.create({
      data: {
        title,
        description,
        imageUrl,
        panjara1Title,
        panjara1Description,
        panjara2Title,
        panjara2Description,
        panjara3Title,
        panjara3Description,
        InformationText
      },
    });

    return NextResponse.json(landingPageInfo);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}



export async function GET() {
  try {
    const landingPageInfo = await db.landingPageInfo.findMany();

    return NextResponse.json(landingPageInfo);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}
