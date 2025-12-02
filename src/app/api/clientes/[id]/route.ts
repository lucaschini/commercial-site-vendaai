// app/api/clientes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL || "http://localhost:8000";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const response = await fetch(`${API_URL}/clientes/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = NextResponse.json(
        { error: "Erro ao buscar cliente" },
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
    console.error("Erro ao buscar cliente:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();

    const response = await fetch(`${API_URL}/clientes/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || "Erro ao atualizar cliente" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const response = await fetch(`${API_URL}/clientes/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao deletar cliente" },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true }, { status: 204 });
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
