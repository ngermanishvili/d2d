import { db } from "@/lib/db";
import { UserForm } from "../components/user-form";
import { InvoiceTable } from "@/components/ui/invoice-table";
import { InvoiceClient } from "./components/client";

const UserEditPage = async ({ params }: { params: { id: string } }) => {
  const user = await db.user.findUnique({
    where: { id: params.id },
  });
  const invoices = await db.urlsOfXlsx.findMany({
    where: {
      userId: user?.id

    }
  })

  if (!user) return { error: "User ar moidzebna" };

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {user && (
          <UserForm
            initialData={{
              ...user,
              name: user.name || undefined,
              number: user.number || undefined,
              image: user.image || undefined,
              role: user.role || undefined,
              email: user.email || undefined,
              input1: user.input1 || "",
              input2: user.input2 || "",
              input3: user.input3 || "",
              input4: user.input4 || "",
              input5: user.input5 || "",
              input6: user.input6 || "",
              input7: user.input7 || "",
              input8: user.input8 || "",


            }}
          />
        )}
        <InvoiceClient data={invoices} />
      </div>
    </div>
  );
};

export default UserEditPage;
