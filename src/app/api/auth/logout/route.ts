// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Logout realizado com sucesso" },
    { status: 200 },
  );

  // Remove o cookie
  response.cookies.delete("token");

  return response;
}
