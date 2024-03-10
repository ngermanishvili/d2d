import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { landingId: string } }
) {
  try {
    if (!params.landingId) {
      return new NextResponse("landingPageInfo ID is required", {
        status: 400,
      });
    }
    const landingPageInfo = await db.blogPosts.findUnique({
      where: {
        id: params.landingId,
      },
    });
    return NextResponse.json(landingPageInfo);
  } catch (error) {
    console.log("[landingPageInfo_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { landingId: string } }
) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      imageUrl,
      panjara1Title,
      panjara1Description,
      panjara2Title,
      panjara2Description,
      panjara3Title,
      panjara3Description,
      InformationText,
    } = body;

    const blogposts = await db.landingPageInfo.updateMany({
      where: {
        id: params.landingId,
      },
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
        InformationText,
      },
    });

    return NextResponse.json(blogposts);
  } catch (error) {
    console.log("[landingPageInfo_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { landingId: string } }
) {
  try {
    const landingPageInfo = await db.landingPageInfo.deleteMany({
      where: {
        id: params.landingId,
      },
    });

    return NextResponse.json(landingPageInfo);
  } catch (error) {
    console.log("[landingPageInfo_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
