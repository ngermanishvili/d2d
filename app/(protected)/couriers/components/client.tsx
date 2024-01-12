"use client";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Heading} from "@/components/ui/heading";
import {Separator} from "@/components/ui/separator";

import {UsersColumn, columns} from "./columns";
import {DataTable} from "@/components/ui/data-table";
import {ApiList} from "@/components/ui/api-list";

interface UserClientProps {
  data: UsersColumn[];
}

export const UsersClient: React.FC<UserClientProps> = ({data}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Momxmareblebi(${data.length})`}
          description="am gverdze shedzlebt momxmareblebis washlas an mattvis kurieris rolis minichebas"
        />
        <Button onClick={() => router.push(`/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4 " />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};
