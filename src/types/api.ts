// types/api.ts - Interfaces baseadas nos schemas do backend

export interface User {
  id_usuario: string;
  nome: string;
  e_mail: string;
  tipo_usuario?: string;
  data_criacao: string;
  ultimo_login?: string;
}

export interface ClienteLead {
  id_cliente: string;
  nome: string;
  telefone?: string;
  e_mail?: string;
  empresa?: string;
  observacao?: string;
  id_usuario: string; // NOVO: ID do usuário que criou o cliente
}

export interface ClienteLeadCreate {
  nome: string;
  telefone?: string;
  e_mail?: string;
  empresa?: string;
  observacao?: string;
}

export interface ClienteLeadUpdate {
  nome?: string;
  telefone?: string;
  e_mail?: string;
  empresa?: string;
  observacao?: string;
}

export interface Chamada {
  id_chamada: string;
  data_hora: string;
  duracao?: number;
  resultado?: "sucesso" | "falha" | "em_andamento";
  transcricao?: string;
  id_usuario: string;
  id_cliente: string;
  id_venda?: string;
}

export interface ChamadaCreate {
  data_hora?: string;
  duracao?: number;
  resultado?: "sucesso" | "falha" | "em_andamento";
  transcricao?: string;
  id_usuario: string;
  id_cliente: string;
  id_venda?: string;
}

export interface ChamadaUpdate {
  duracao?: number;
  resultado?: "sucesso" | "falha" | "em_andamento";
  transcricao?: string;
  id_venda?: string;
}

export interface Venda {
  id_venda: string;
  titulo: string;
  valor: number;
  status: "em_negociacao" | "fechada" | "perdida" | "cancelada";
  data_fechamento?: string;
  observacoes?: string;
  id_cliente: string;
  id_usuario?: string;
  data_criacao: string;
  data_atualizacao: string;
}

export interface VendaCreate {
  titulo: string;
  valor: number;
  status?: "em_negociacao" | "fechada" | "perdida" | "cancelada";
  data_fechamento?: string;
  observacoes?: string;
  id_cliente: string;
  id_usuario?: string;
}

export interface VendaUpdate {
  titulo?: string;
  valor?: number;
  status?: "em_negociacao" | "fechada" | "perdida" | "cancelada";
  data_fechamento?: string;
  observacoes?: string;
}

export interface HistoricoChat {
  id_mensagem: string;
  interacao: string;
  data_envio: string;
  id_usuario: string;
}

export interface HistoricoChatCreate {
  interacao: string;
  id_usuario: string;
}

export interface SugestaoIA {
  id_sugestao: string;
  conteudo: string;
  momento?: number;
  aceita: boolean;
  id_chamada: string;
}

export interface SugestaoIACreate {
  conteudo: string;
  momento?: number;
  aceita?: boolean;
  id_chamada: string;
}

export interface SugestaoIAUpdate {
  aceita?: boolean;
}
