import { format } from "date-fns";

import { FormattedLandingPageInfoClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import db from "@/lib/db";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole } from "@/lib/auth";
import Error404Page from "@/providers/error-page";

const BillboardsPage = async () => {
  const landingPageInfo = await db.landingPageInfo.findMany();
  const userRole = await currentRole();

  const formattedLandingPageInfo: BillboardColumn[] = landingPageInfo.map(
    (item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      panjara1Title: item.panjara1Title,
      panjara1Description: item.panjara1Description,
      panjara2Title: item.panjara2Title,
      panjara2Description: item.panjara2Description,
      panjara3Title: item.panjara3Title,
      panjara3Description: item.panjara3Description,
      InformationText: item.InformationText,

      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  if (userRole !== "ADMIN") {
    return <Error404Page />;
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FormattedLandingPageInfoClient data={formattedLandingPageInfo} />
      </div>
    </div>
  );
};

export default BillboardsPage;
