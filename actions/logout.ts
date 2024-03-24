"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  await signOut();
  window.location.reload();

  return {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };
};
