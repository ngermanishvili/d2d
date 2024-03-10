"use server";

import db from "@/lib/db";

export const DeleteUser = async (id: string) => {
  try {
    await db.user.deleteMany({
      where: { id: id },
    });
  } catch (error) {
    console.error("Failed to Delete user role:", error);
    throw error; // Re-throw the error if necessary
  }
};
export const DeleteUserByEmail = async (email: string) => {
  try {
    await db.user.delete({
      where: { email },
    });
  } catch (error) {
    console.error("Failed to Delete user role:", error);
    throw error; // Re-throw the error if necessary
  }
};
