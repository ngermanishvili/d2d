import "next-auth";

declare module "next-auth" {
    interface Session {
        user?: {
            // Add any other user fields you're expecting
            role?: UserRole;
        }
    }
}

// types/index.ts
export interface BillboardData {
    imageUrl: string;
}
