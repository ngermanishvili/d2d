import { format } from "date-fns";

import { FormattedLandingPageInfoClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import { db } from "@/lib/db";
import { RoleGate } from "@/components/auth/role-gate";

const BillboardsPage = async () => {
  const landingPageInfo = await db.landingPageInfo.findMany();

  const formattedLandingPageInfo: BillboardColumn[] = landingPageInfo.map((item) => ({
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
  }));
  return (
    <RoleGate allowedRole="ADMIN">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <FormattedLandingPageInfoClient data={formattedLandingPageInfo} />
        </div>
      </div>
    </RoleGate>
  );
};

export default BillboardsPage;
