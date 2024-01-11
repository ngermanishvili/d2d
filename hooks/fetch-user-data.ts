// In use-global-user.ts
import {PrismaClient, UserRole} from "@prisma/client";
import {User} from "lucide-react";

const prisma = new PrismaClient();

export const fetchUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user data by ID: ");
  } finally {
    await prisma.$disconnect();
  }
};
export const fetchUserForAdmin = async () => {
  try {
    const user = await prisma.user.findMany({
      where: {
        role: UserRole.USER || UserRole.COURIER,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching users data For admin: ");
  } finally {
    await prisma.$disconnect();
  }
};
