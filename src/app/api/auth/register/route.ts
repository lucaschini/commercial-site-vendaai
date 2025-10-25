// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.BACKEND_API_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Fazer request para o backend FastAPI
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || "Erro ao fazer registro" },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Criar resposta com o usuário
    const responseData = {
      user: data.user,
      success: true,
    };

    const nextResponse = NextResponse.json(responseData, { status: 201 });

    // Salvar token em HttpOnly Cookie (SEGURO)
    nextResponse.cookies.set({
      name: "token",
      value: data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
