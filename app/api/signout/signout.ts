// pages/api/signout.ts
import { signOut } from 'next-auth/react';

export default async function customSignOut(req: any, res: any) {
    await signOut({ callbackUrl: '/' });
    res.end();
}
