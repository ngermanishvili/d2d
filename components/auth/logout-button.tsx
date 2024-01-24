"use client";

import {logout} from "@/actions/logout";
import {useRouter} from "next/navigation";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({children}: LogoutButtonProps) => {
  const router = useRouter();

  const onClick = async () => {
    console.log("CLICKED");
    await logout().then(() => router.refresh());
  };

  return (
    <button onClick={onClick} className="cursor-pointer">
      {children}
    </button>
  );
};
