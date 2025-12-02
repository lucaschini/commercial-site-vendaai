import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL || "http://localhost:8000";

export async function PATCH_ACEITAR_SUGESTAO(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const response = await fetch(`${API_URL}/sugestoes/${params.id}/aceitar`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao aceitar sugestão" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao aceitar sugestão:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
