import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isOAuth: boolean;
  name: string;
  lastName: string;
  number: string;
  image: string;
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
  input7: string;
  input8: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
