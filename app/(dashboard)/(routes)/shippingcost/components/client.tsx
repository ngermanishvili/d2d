"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ShippingPriceColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import Container from "@/components/ui/container";

interface ShippingPriceClientProps {
  data: ShippingPriceColumn[] | [];
}

export const ShippingCostClient: React.FC<ShippingPriceClientProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between p-[30px]">
        <Heading
          title={`ქალაქები / სოფლები / ფასები`}
          description="აქ შეგიძლიათ ნახოთ ყველა ქალაქი, სოფელი და ფასი  - დაამატოთ ახალი ინფორმაცია ან წაშალოთ არსებული"
        />
        <Button
          className="bg-red-500"
          onClick={() => router.push(`/shippingcost/new`)}
        >
          <Plus className="mr-2 h-4 w-4 " />
          დამატება
        </Button>
      </div>
      <Separator />
      <Container>
        <DataTable searchKey="city" columns={columns} data={data} />
      </Container>
    </>
  );
};
