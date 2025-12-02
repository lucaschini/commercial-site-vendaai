// app/api/clientes/route.ts
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

    const { searchParams } = new URL(request.url);
    const skip = searchParams.get("skip") || "0";
    const limit = searchParams.get("limit") || "100";

    const response = await fetch(
      `${API_URL}/clientes?skip=${skip}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorResponse = NextResponse.json(
        { error: "Erro ao buscar clientes" },
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
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();

    const response = await fetch(`${API_URL}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || "Erro ao criar cliente" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
