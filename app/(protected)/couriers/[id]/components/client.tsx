"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { InvoiceColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface UserClientProps {
  data: InvoiceColumn[];
}

export const InvoiceClient: React.FC<UserClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex  w-full justify-between">
        <Heading
          title={`ინვოისები (${data.length})`}
          description="ამ გვერდზე შეძლებთ მომხმარებლების და კურიერების წაშლას."
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
