import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    privateRoutes,
    DEFAULT_LOGIN_REDIRECT,
    COOKIES_POLICY_ROUTE,
} from "@/routes";
import { setCookie, getCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

    const hasAcceptedCookies = getCookie('acceptedCookies', { req });

    if (!hasAcceptedCookies && !isPublicRoute) {
        // Redirect to cookies policy route if cookies are not accepted
        return NextResponse.redirect(new URL(COOKIES_POLICY_ROUTE, nextUrl));
    }

    const hasExplicitlyAcceptedCookies = nextUrl.searchParams.get('acceptedCookie');
    if (!hasAcceptedCookies && hasExplicitlyAcceptedCookies) {
        setCookie('acceptedCookies', 'true', { req });
    }

    if (isApiAuthRoute) {
        return null;
    }

    if (isPrivateRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/auth/login", nextUrl));
        }
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
