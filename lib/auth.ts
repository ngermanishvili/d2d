"use server";
import { auth } from "@/auth";
import { db } from "./db";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
export const currentUserByEmail = async () => {
  const session = await auth();
  return session?.user.email;
};

export const currentUserShipments = async () => {
  const session = await auth();
  const shipments = await db.shipment.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return shipments.length;
};

export const currentUserId = async () => {
  const session = await auth();
  return session?.user?.id; // Assuming the user's ID is stored under the 'id' field
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

export const currentUserByImage = async () => {
  const session = await auth();
  return session?.user.image;
};
