"use server"
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// Function to fetch all user data
export const fetchAllUserData = async (): Promise<User[]> => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        throw new Error('Error fetching all user data: )');
    } finally {
        await prisma.$disconnect();
    }
};

