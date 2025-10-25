// middleware.ts (na raiz do projeto)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Tentar obter token do cookie ou header
  const tokenFromCookie = request.cookies.get("token")?.value;
  const tokenFromHeader = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  const token = tokenFromCookie || tokenFromHeader;

  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  // Redirecionar para login se tentar acessar dashboard sem token
  if (isDashboard && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirecionar para dashboard se já estiver autenticado e tentar acessar login/register
  if (isAuthPage && token) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
