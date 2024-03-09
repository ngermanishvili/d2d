import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
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
      whatWeOfferToCourierDescription,
    } = body;

    const aboutPageInfo = await db.aboutPageInfo.create({
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
        whatWeOfferToCourierDescription,
      },
    });

    return NextResponse.json(aboutPageInfo);
  } catch (error) {
    console.log("[ABOUT_POST]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function GET() {
  try {
    const landingPageInfo = await db.aboutPageInfo.findMany();

    return NextResponse.json(landingPageInfo);
  } catch (error) {
    console.log("[ABOUT_GET]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
