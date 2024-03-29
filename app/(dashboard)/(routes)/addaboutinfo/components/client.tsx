"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { AboutPageColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface AboutPageProps {
  data: AboutPageColumn[];
}

export const FormattedAboutPageInfoClient: React.FC<AboutPageProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between  ">
        <Heading

          title={`მთავარ გვერდზე კონტენტის შეცვლა`}
          description="მთავარ გვერდზე ემატება სათაური აღწერა და ფოტო რაც გვერდზე გამოჩნდება აქედან გამომდინარე თუ გსურს რაიმეს შეცვლა ან წაშლით და დაამატებთ ახლიდან ან უკვე არსებულს ჩაასწორებთ რადგანაც 2 რამის დამატების შემთხვევაში ალგორითმი უყურებს მხოლოდ პირველ დამატებულ ელემენტს რადგანაც მთავარ გვერდზე გვაქვს მხოლოდ 1 ფანჯარა (სათაური, აღწერა, ფოტო). "
        />
        <Button
          className="bg-red-500"
          onClick={() => router.push(`/addaboutinfo/new`)}
        >
          <Plus className="mr-2 h-4 w-4 " />
          დამატება
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
