import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { aboutId: string } }
) {
  try {
    if (!params.aboutId) {
      return new NextResponse("ABOUTPAGE ID is required", { status: 400 });
    }
    const AboutPageInfo = await db.aboutPageInfo.findUnique({
      where: {
        id: params.aboutId,
      },
    });
    return NextResponse.json(AboutPageInfo);
  } catch (error) {
    console.log("[ABOUTPAGE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { aboutId: string } }
) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      coverImageUrl,
      boxImageUrl,
      boxTitle,
      boxDescription,
      panjara1Description,
      freqAskedQuestionsTitle,
      freqAskedQuestionsDescription,
      freqAskedQuestions2Title,
      freqAskedQuestions2Description,
      freqAskedQuestions3Title,
      freqAskedQuestions3Description,
      freqAskedQuestions4Title,
      freqAskedQuestions4Description,
      whatWeOfferTitle,
      whatWeOfferDescription,
      whatWeOffer2Title,
      whatWeOffer2Description,
      whatWeOffer3Title,
      whatWeOffer3Description,
      whatWeOfferToCourierTitle,
      whatWeOfferToCourierDescription
    } = body;

    const aboutUs = await db.aboutPageInfo.updateMany({
      where: {
        id: params.aboutId,
      },
      data: {
        title,
        description,
        coverImageUrl,
        boxImageUrl,
        boxTitle,
        boxDescription,
        panjara1Description,
        freqAskedQuestionsTitle,
        freqAskedQuestionsDescription,
        freqAskedQuestions2Title,
        freqAskedQuestions2Description,
        freqAskedQuestions3Title,
        freqAskedQuestions3Description,
        freqAskedQuestions4Title,
        freqAskedQuestions4Description,
        whatWeOfferTitle,
        whatWeOfferDescription,
        whatWeOffer2Title,
        whatWeOffer2Description,
        whatWeOffer3Title,
        whatWeOffer3Description,
        whatWeOfferToCourierTitle,
        whatWeOfferToCourierDescription
      },
    });

    return NextResponse.json(aboutUs);
  } catch (error) {
    console.log("[ABOUTPAGE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { aboutId: string } }
) {
  try {

    const AboutPageInfo = await db.aboutPageInfo.deleteMany({
      where: {
        id: params.aboutId,
      },
    });

    return NextResponse.json(AboutPageInfo);
  } catch (error) {
    console.log("[ABOUTPAGE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
