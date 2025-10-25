// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    username: string;
    is_active: boolean;
  };
}

// Salvar token no localStorage
export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

// Obter token do localStorage
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Remover token
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

// Login
export const login = async (data: LoginData): Promise<AuthResponse> => {
  console.log("🔵 Iniciando login...");

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("❌ Erro no login:", error);
    throw new Error(error.detail || "Erro ao fazer login");
  }

  const result = await response.json();
  console.log("✅ Login bem-sucedido, salvando token...");
  setToken(result.access_token);

  // Verificar se token foi salvo
  const savedToken = getToken();
  console.log("🔍 Token salvo?", savedToken ? "Sim" : "Não");
  console.log(result.access_token);
  console.log("👤 Usuário:", result.user);

  return result;
};

// Registro
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erro ao fazer registro");
  }

  const result = await response.json();
  setToken(result.access_token);
  return result;
};

// Obter dados do usuário
export const getMe = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Token não encontrado");
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      throw new Error("Sessão expirada");
    }
    throw new Error("Erro ao buscar dados do usuário");
  }

  return response.json();
};

// Obter dados do dashboard
export const getDashboard = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Token não encontrado");
  }

  const response = await fetch(`${API_URL}/user/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      throw new Error("Sessão expirada");
    }
    throw new Error("Erro ao buscar dashboard");
  }

  return response.json();
};

// Logout
export const logout = () => {
  removeToken();
};
