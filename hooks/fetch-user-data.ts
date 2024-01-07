// In use-global-user.ts
import { PrismaClient } from '@prisma/client';

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
        throw new Error('Error fetching user data by ID: ');
    } finally {
        await prisma.$disconnect();
    }
};
