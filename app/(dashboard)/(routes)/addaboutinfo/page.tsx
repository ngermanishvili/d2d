import { format } from "date-fns";

import { FormattedAboutPageInfoClient } from "./components/client";
import { AboutPageColumn } from "./components/columns";
import { db } from "@/lib/db";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import Error404Page from "@/providers/error-page";


const BillboardsPage = async () => {
  const userRole = await currentRole();
  const aboutPageInfo = await db.aboutPageInfo.findMany();

  const formattedAboutPageInfo: AboutPageColumn[] = aboutPageInfo.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    coverImageUrl: item.coverImageUrl,
    boxImageUrl: item.boxImageUrl,
    boxTitle: item.boxTitle,
    boxDescription: item.boxDescription,
    panjara1Description: item.panjara1Description,
    freqAskedQuestionsTitle: item.freqAskedQuestionsTitle,
    freqAskedQuestionsDescription: item.freqAskedQuestionsDescription,
    freqAskedQuestions2Title: item.freqAskedQuestions2Title,
    freqAskedQuestions2Description: item.freqAskedQuestions2Description,
    freqAskedQuestions3Title: item.freqAskedQuestions3Title,
    freqAskedQuestions3Description: item.freqAskedQuestions3Description,
    freqAskedQuestions4Title: item.freqAskedQuestions4Title,
    freqAskedQuestions4Description: item.freqAskedQuestions4Description,
    whatWeOfferTitle: item.whatWeOfferTitle,
    whatWeOfferDescription: item.whatWeOfferDescription,
    whatWeOffer2Title: item.whatWeOffer2Title,
    whatWeOffer2Description: item.whatWeOffer2Description,
    whatWeOffer3Title: item.whatWeOffer3Title,
    whatWeOffer3Description: item.whatWeOffer3Description,
    whatWeOfferToCourierTitle: item.whatWeOfferToCourierTitle,
    whatWeOfferToCourierDescription: item.whatWeOfferToCourierDescription,


    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  if (userRole !== "ADMIN") {
    return <Error404Page />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FormattedAboutPageInfoClient data={formattedAboutPageInfo} />
      </div>
    </div>
  );
};

export default BillboardsPage;
