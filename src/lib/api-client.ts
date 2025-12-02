// lib/api-client.ts - Cliente API para todas as rotas

import {
  Chamada,
  ChamadaCreate,
  ChamadaUpdate,
  ClienteLead,
  ClienteLeadCreate,
  ClienteLeadUpdate,
  HistoricoChat,
  HistoricoChatCreate,
  SugestaoIA,
  SugestaoIACreate,
  SugestaoIAUpdate,
  Venda,
  VendaCreate,
  VendaUpdate,
} from "@/types/api";

// Detectar se está rodando em extensão
const isExtension =
  typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id;

const API_URL = isExtension ? "http://localhost:8000" : "";

// ============================================
// FUNÇÕES DE STORAGE (do api-dual.ts)
// ============================================

async function getToken(): Promise<string | null> {
  if (isExtension) {
    return new Promise((resolve) => {
      chrome.storage.local.get(["token"], (result) => {
        resolve(result.token || null);
      });
    });
  }
  return null;
}

// ============================================
// HELPER PARA REQUISIÇÕES
// ============================================

async function fetchAPI(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = await getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (isExtension && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = isExtension ? `${API_URL}${endpoint}` : `/api${endpoint}`;

  return fetch(url, {
    ...options,
    headers,
    credentials: isExtension ? undefined : "include",
  });
}

// ============================================
// CLIENTES
// ============================================

export const clientesAPI = {
  async listar(skip = 0, limit = 100): Promise<ClienteLead[]> {
    const response = await fetchAPI(`/clientes?skip=${skip}&limit=${limit}`);
    if (!response.ok) throw new Error("Erro ao listar clientes");
    return response.json();
  },

  async obter(id: string): Promise<ClienteLead> {
    const response = await fetchAPI(`/clientes/${id}`);
    if (!response.ok) throw new Error("Erro ao obter cliente");
    return response.json();
  },

  async criar(data: ClienteLeadCreate): Promise<ClienteLead> {
    const response = await fetchAPI("/clientes", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erro ao criar cliente");
    }
    return response.json();
  },

  async atualizar(id: string, data: ClienteLeadUpdate): Promise<ClienteLead> {
    const response = await fetchAPI(`/clientes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao atualizar cliente");
    return response.json();
  },

  async deletar(id: string): Promise<void> {
    const response = await fetchAPI(`/clientes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar cliente");
  },

  async buscarPorNome(nome: string): Promise<ClienteLead[]> {
    const response = await fetchAPI(`/clientes/buscar/nome/${nome}`);
    if (!response.ok) throw new Error("Erro ao buscar clientes");
    return response.json();
  },

  async buscarPorEmpresa(empresa: string): Promise<ClienteLead[]> {
    const response = await fetchAPI(`/clientes/buscar/empresa/${empresa}`);
    if (!response.ok) throw new Error("Erro ao buscar clientes");
    return response.json();
  },
};

// ============================================
// CHAMADAS
// ============================================

export const chamadasAPI = {
  async listar(
    skip = 0,
    limit = 100,
    resultado?: string,
    id_cliente?: string,
  ): Promise<Chamada[]> {
    let url = `/chamadas?skip=${skip}&limit=${limit}`;
    if (resultado) url += `&resultado=${resultado}`;
    if (id_cliente) url += `&id_cliente=${id_cliente}`;

    const response = await fetchAPI(url);
    if (!response.ok) throw new Error("Erro ao listar chamadas");
    return response.json();
  },

  async obter(id: string): Promise<Chamada> {
    const response = await fetchAPI(`/chamadas/${id}`);
    if (!response.ok) throw new Error("Erro ao obter chamada");
    return response.json();
  },

  async criar(data: ChamadaCreate): Promise<Chamada> {
    const response = await fetchAPI("/chamadas", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao criar chamada");
    return response.json();
  },

  async atualizar(id: string, data: ChamadaUpdate): Promise<Chamada> {
    const response = await fetchAPI(`/chamadas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao atualizar chamada");
    return response.json();
  },

  async deletar(id: string): Promise<void> {
    const response = await fetchAPI(`/chamadas/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar chamada");
  },
};

// ============================================
// VENDAS
// ============================================

export const vendasAPI = {
  async listar(skip = 0, limit = 100, status?: string): Promise<Venda[]> {
    let url = `/vendas?skip=${skip}&limit=${limit}`;
    if (status) url += `&status_filter=${status}`;

    const response = await fetchAPI(url);
    if (!response.ok) throw new Error("Erro ao listar vendas");
    return response.json();
  },

  async obter(id: string): Promise<Venda> {
    const response = await fetchAPI(`/vendas/${id}`);
    if (!response.ok) throw new Error("Erro ao obter venda");
    return response.json();
  },

  async criar(data: VendaCreate): Promise<Venda> {
    const response = await fetchAPI("/vendas", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao criar venda");
    return response.json();
  },

  async atualizar(id: string, data: VendaUpdate): Promise<Venda> {
    const response = await fetchAPI(`/vendas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao atualizar venda");
    return response.json();
  },

  async deletar(id: string): Promise<void> {
    const response = await fetchAPI(`/vendas/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar venda");
  },
};

// ============================================
// HISTÓRICO CHAT
// ============================================

export const historicoChatAPI = {
  async listar(skip = 0, limit = 100): Promise<HistoricoChat[]> {
    const response = await fetchAPI(
      `/historico-chat?skip=${skip}&limit=${limit}`,
    );
    if (!response.ok) throw new Error("Erro ao listar histórico");
    return response.json();
  },

  async obter(id: string): Promise<HistoricoChat> {
    const response = await fetchAPI(`/historico-chat/${id}`);
    if (!response.ok) throw new Error("Erro ao obter mensagem");
    return response.json();
  },

  async criar(data: HistoricoChatCreate): Promise<HistoricoChat> {
    const response = await fetchAPI("/historico-chat", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao criar mensagem");
    return response.json();
  },

  async deletar(id: string): Promise<void> {
    const response = await fetchAPI(`/historico-chat/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar mensagem");
  },

  async limparTudo(): Promise<void> {
    const response = await fetchAPI("/historico-chat", {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao limpar histórico");
  },
};

// ============================================
// SUGESTÕES IA
// ============================================

export const sugestoesAPI = {
  async listar(
    skip = 0,
    limit = 100,
    aceita?: boolean,
    id_chamada?: string,
  ): Promise<SugestaoIA[]> {
    let url = `/sugestoes?skip=${skip}&limit=${limit}`;
    if (aceita !== undefined) url += `&aceita=${aceita}`;
    if (id_chamada) url += `&id_chamada=${id_chamada}`;

    const response = await fetchAPI(url);
    if (!response.ok) throw new Error("Erro ao listar sugestões");
    return response.json();
  },

  async obter(id: string): Promise<SugestaoIA> {
    const response = await fetchAPI(`/sugestoes/${id}`);
    if (!response.ok) throw new Error("Erro ao obter sugestão");
    return response.json();
  },

  async criar(data: SugestaoIACreate): Promise<SugestaoIA> {
    const response = await fetchAPI("/sugestoes", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao criar sugestão");
    return response.json();
  },

  async atualizar(id: string, data: SugestaoIAUpdate): Promise<SugestaoIA> {
    const response = await fetchAPI(`/sugestoes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao atualizar sugestão");
    return response.json();
  },

  async aceitar(id: string): Promise<SugestaoIA> {
    const response = await fetchAPI(`/sugestoes/${id}/aceitar`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Erro ao aceitar sugestão");
    return response.json();
  },

  async deletar(id: string): Promise<void> {
    const response = await fetchAPI(`/sugestoes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar sugestão");
  },
};
