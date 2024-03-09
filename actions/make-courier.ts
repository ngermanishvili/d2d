"use server";

import db from "@/lib/db";

export const MakeUserIntoCourier = async (email: string) => {
  try {
    await db.user.updateMany({
      where: { email },
      data: { role: "COURIER" },
    });
  } catch (error) {
    console.error("Failed to update user role:", error);
    throw error; // Re-throw the error if necessary
  }
};
