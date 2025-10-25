// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Fazer request para o backend FastAPI
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || "Erro ao fazer login" },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Criar resposta com o usuário
    const responseData = {
      user: data.user,
      success: true,
    };

    const nextResponse = NextResponse.json(responseData, { status: 200 });

    // Salvar token em HttpOnly Cookie (SEGURO)
    nextResponse.cookies.set({
      name: "token",
      value: data.access_token,
      httpOnly: true, // Não acessível via JavaScript (protege contra XSS)
      secure: process.env.NODE_ENV === "production", // HTTPS apenas em produção
      sameSite: "lax", // Proteção CSRF
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
