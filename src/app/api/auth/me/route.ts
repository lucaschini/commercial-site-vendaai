// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Fazer request para o backend FastAPI com o token
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Se token inválido, remove o cookie
      const errorResponse = NextResponse.json(
        { error: "Sessão expirada" },
        { status: 401 },
      );
      errorResponse.cookies.delete("token");
      return errorResponse;
    }

    const userData = await response.json();
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
