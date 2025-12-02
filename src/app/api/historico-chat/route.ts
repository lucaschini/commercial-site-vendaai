import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL || "http://localhost:8000";

export async function GET_HISTORICO(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const response = await fetch(
      `${API_URL}/historico-chat${queryString ? `?${queryString}` : ""}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      const errorResponse = NextResponse.json(
        { error: "Erro ao buscar histórico" },
        { status: response.status },
      );
      if (response.status === 401) errorResponse.cookies.delete("token");
      return errorResponse;
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function POST_HISTORICO(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();

    const response = await fetch(`${API_URL}/historico-chat`, {
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
        { error: error.detail || "Erro ao criar mensagem" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar mensagem:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE_HISTORICO_ALL(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const response = await fetch(`${API_URL}/historico-chat`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao limpar histórico" },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true }, { status: 204 });
  } catch (error) {
    console.error("Erro ao limpar histórico:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
