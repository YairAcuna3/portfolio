import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Excluir explícitamente las rutas de API
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Incluir todas las rutas excepto:
    // - API routes (/api/*)
    // - Static files (_next/static/*)
    // - Image optimization (_next/image/*)
    // - Favicon, robots, etc.
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*\\..*).*)",
  ],
};
