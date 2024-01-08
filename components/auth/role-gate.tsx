"use client";

import { UserRole } from "@prisma/client";
import { useRouter } from 'next/navigation'

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/form-error";
interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {

  const router = useRouter();
  const role = useCurrentRole();

  if (role !== allowedRole) {
    router.push("/settings");
    return <FormError />;
  }

  return <>{children}</>;
};
