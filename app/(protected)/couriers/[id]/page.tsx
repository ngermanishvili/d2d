import { db } from "@/lib/db";
import { UserForm } from "../components/user-form";

const UserEditPage = async ({ params }: { params: { id: string } }) => {
  const user = await db.user.findUnique({
    where: { id: params.id },
  });

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
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UserEditPage;
