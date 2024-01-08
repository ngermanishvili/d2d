import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT,
    adminRoutes,
} from "@/routes";
import { UserRole } from "@prisma/client";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const role = UserRole.ADMIN;
    const isAdmin = role === "ADMIN";
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
    console.log(isAdmin);
    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    // if (isAdminRoute) {
    //     if (isLoggedIn && !isPublicRoute) {
    //         return Response.redirect(new URL("/settings", nextUrl));
    //     }
    // }

    return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
