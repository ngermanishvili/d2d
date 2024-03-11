"use client"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchCourierUserNames = async () => {
    const users = await prisma.user.findMany();
    return users;
}

