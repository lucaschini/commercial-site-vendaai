// middleware.ts (na raiz do projeto)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Obter token do cookie (server-side, seguro!)
  const token = request.cookies.get("token")?.value;

  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  // Redirecionar para login se tentar acessar dashboard sem token
  if (isDashboard && !token) {
    const loginUrl = new URL("/login", request.url);
    // Salvar URL de destino para redirecionar depois do login
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirecionar para dashboard se já estiver autenticado
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
