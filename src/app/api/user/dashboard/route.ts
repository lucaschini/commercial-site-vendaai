// app/api/user/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL || "http://localhost:8000";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Fazer request para o backend FastAPI
    const response = await fetch(`${API_URL}/user/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = NextResponse.json(
        { error: "Erro ao buscar dashboard" },
        { status: response.status },
      );

      if (response.status === 401) {
        errorResponse.cookies.delete("token");
      }

      return errorResponse;
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar dashboard:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
