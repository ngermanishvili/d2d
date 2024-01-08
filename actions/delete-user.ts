"use server";

import {db} from "@/lib/db";

export const DeleteUser = async (id: string) => {
  try {
    await db.user.delete({
      where: {id},
    });
  } catch (error) {
    console.error("Failed to Delete user role:", error);
    throw error; // Re-throw the error if necessary
  }
};
