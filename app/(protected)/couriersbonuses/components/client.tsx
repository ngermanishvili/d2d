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
      <div className="flex w-full justify-between p-8">
        <Heading
          title={`კურიერები და მათი ბონუსები`}
          description="ამ გვერდზე შეძლებთ მომხმარებლების და კურიერების წაშლას, ასევე მათი ინფორმაციის და სტატუსების შეცვლას
          (ბუღალტერის ან კურიერის სტატუსის მინიჭება შეგიძლიათ ამ გვერდიდან)."
        />
      </div>
      <Separator />
      <div className="p-8">
        <DataTable searchKey="email" columns={columns} data={data} />
      </div>
    </>
  );
};
