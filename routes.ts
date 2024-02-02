/**
 * An array of routes that are public
 * These routes are accessible without authentication
 * @type {string[]}
 */


export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/info/privacy-policy",
    "/blogposts",
    "/sitemap.xml",
    "/robots.txt"
]

export const privateRoutes =
    ["/billboards",
        "/billboards/new",
        "/shipments",
        'shipments/new',
        'shipments/:id'];
/**
 * An array of routes that require authentication
 * These routes redirect logged users to /settings page
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
* The prefix for all API routes
* Routes that start with this prefix are treated as API routes 
 * @type {string[]}
 */

export const apiAuthPrefix = "/api/auth"


/**
 * The default redirect URL after login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings"
export const DEFAULT_LOGOUT_REDIRECT = "/auth/login"

export const COOKIES_POLICY_ROUTE = "/info/privacy-policy";
