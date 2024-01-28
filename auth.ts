import NextAuth, { NextAuthConfig, Session, Profile } from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "./data/account";

// Extend the original NextAuthConfig type to include the signOut property

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.number = token.number as string;
        session.user.input1 = token.input1 as string;
        session.user.input2 = token.input2 as string;
        session.user.input3 = token.input3 as string;
        session.user.input4 = token.input4 as string;
        session.user.input5 = token.input5 as string;
        session.user.input6 = token.input6 as string;
        session.user.input7 = token.input7 as string;
        session.user.input8 = token.input8 as string;
        
        session.user.image = token.image as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.number = existingUser.number;
      token.input1 = existingUser.input1;
      token.input2 = existingUser.input2;
      token.input3 = existingUser.input3;
      token.input4 = existingUser.input4;
      token.input5 = existingUser.input5;
      token.input6 = existingUser.input6;
      token.input7 = existingUser.input7;
      token.input8 = existingUser.input8;
      token.image = existingUser.image;
      
      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
