"use client";
import {useParams, useRouter} from "next/navigation";

import {Heading} from "@/components/ui/heading";
import {Separator} from "@/components/ui/separator";

import {UsersColumn, columns} from "./columns";
import {DataTable} from "@/components/ui/data-table";

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
      </div>
      <Separator />
      <DataTable searchKey="email" columns={columns} data={data} />
    </>
  );
};
