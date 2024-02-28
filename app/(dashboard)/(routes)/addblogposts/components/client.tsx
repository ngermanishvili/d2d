"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillBoardClientProps {
  data: BillboardColumn[];
}

export const BillBoardClient: React.FC<BillBoardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`ბლოგპოსტების ოდენობა - ${data.length}`}
          description="აკონტროლეთ ბლოგპოსტები ამ გვერდიდან"
        />
        <Button onClick={() => router.push(`/addblogposts/new`)}>
          <Plus className="mr-2 h-4 w-4 " />
          ბლოგპოსტის დამატება
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
