// lib/api.ts - Cliente API Seguro
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

interface UserResponse {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
  custom_text?: string;
}

// Login - Agora usa API Route do Next.js
export const login = async (
  data: LoginData,
): Promise<{ user: UserResponse }> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Importante para cookies
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao fazer login");
  }

  return response.json();
};

// Registro
export const register = async (
  data: RegisterData,
): Promise<{ user: UserResponse }> => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao fazer registro");
  }

  return response.json();
};

// Obter dados do usuário
export const getMe = async (): Promise<UserResponse> => {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Sessão expirada");
    }
    throw new Error("Erro ao buscar dados do usuário");
  }

  return response.json();
};

// Obter dados do dashboard
export const getDashboard = async (): Promise<UserResponse> => {
  const response = await fetch("/api/user/dashboard", {
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Sessão expirada");
    }
    throw new Error("Erro ao buscar dashboard");
  }

  return response.json();
};

// Logout
export const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};
