// lib/api-dual.ts - Cliente que funciona em Web e Extensão

// Detectar se está rodando em extensão
const isExtension =
  typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id;

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

// ============================================
// FUNÇÕES DE STORAGE
// ============================================

async function saveToken(token: string) {
  if (isExtension) {
    // Extensão: usar chrome.storage
    return new Promise((resolve) => {
      chrome.storage.local.set({ token }, resolve);
    });
  } else {
    // Web: O cookie é salvo automaticamente pela API route
    // Não precisa fazer nada aqui
  }
}

async function getToken(): Promise<string | null> {
  if (isExtension) {
    // Extensão: buscar do chrome.storage
    return new Promise((resolve) => {
      chrome.storage.local.get(["token"], (result) => {
        resolve(result.token || null);
      });
    });
  } else {
    // Web: Cookie é enviado automaticamente
    return null; // Não precisa retornar, o cookie vai automaticamente
  }
}

async function removeToken() {
  if (isExtension) {
    // Extensão: remover do chrome.storage
    return new Promise((resolve) => {
      chrome.storage.local.remove(["token"], resolve);
    });
  } else {
    // Web: O cookie é removido pela API route
  }
}

// ============================================
// FUNÇÕES DE API
// ============================================

export const login = async (
  data: LoginData,
): Promise<{ user: UserResponse }> => {
  if (isExtension) {
    // EXTENSÃO: Request direto para o backend
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erro ao fazer login");
    }

    const result = await response.json();

    // Salvar token no chrome.storage
    await saveToken(result.access_token);

    return { user: result.user };
  } else {
    // WEB APP: Request para API Route do Next.js (com cookie)
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao fazer login");
    }

    return response.json();
  }
};

export const register = async (
  data: RegisterData,
): Promise<{ user: UserResponse }> => {
  if (isExtension) {
    // EXTENSÃO
    const response = await fetch("http://localhost:8000/auth/register", {
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
    await saveToken(result.access_token);

    return { user: result.user };
  } else {
    // WEB APP
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
  }
};

export const getMe = async (): Promise<UserResponse> => {
  if (isExtension) {
    // EXTENSÃO
    const token = await getToken();

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch("http://localhost:8000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        await removeToken();
        throw new Error("Sessão expirada");
      }
      throw new Error("Erro ao buscar dados do usuário");
    }

    return response.json();
  } else {
    // WEB APP
    const response = await fetch("/api/auth/me", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar dados do usuário");
    }

    return response.json();
  }
};

export const getDashboard = async (): Promise<UserResponse> => {
  if (isExtension) {
    // EXTENSÃO
    const token = await getToken();

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch("http://localhost:8000/user/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        await removeToken();
        throw new Error("Sessão expirada");
      }
      throw new Error("Erro ao buscar dashboard");
    }

    return response.json();
  } else {
    // WEB APP
    const response = await fetch("/api/user/dashboard", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar dashboard");
    }

    return response.json();
  }
};

export const logout = async () => {
  if (isExtension) {
    // EXTENSÃO
    await removeToken();
  } else {
    // WEB APP
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  }
};

// Exportar helper para saber se está na extensão
export { isExtension };
