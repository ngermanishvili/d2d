"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { UsersColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface UserClientProps {
  data: UsersColumn[];
}

export const UsersClient: React.FC<UserClientProps> = ({ data }) => {


  return (
    <>
      <div className="flex  w-full justify-between">
        <Heading
          title={`კურიერები / მომხმარებლები (${data.length})`}
          description="ამ გვერდზე შეძლებთ მომხმარებლების და კურიერების წაშლას."
        />
      </div>
      <Separator />
      <DataTable searchKey="email" columns={columns} data={data} />
    </>
  );
};
