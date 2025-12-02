"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { vendasAPI, clientesAPI } from "@/lib/api-client";
import { Venda, VendaCreate, ClienteLead } from "@/types/api";
import Link from "next/link";

export default function VendasPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [clientes, setClientes] = useState<ClienteLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVenda, setEditingVenda] = useState<Venda | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [formData, setFormData] = useState<VendaCreate>({
    titulo: "",
    valor: 0,
    status: "em_negociacao",
    data_fechamento: "",
    observacoes: "",
    id_cliente: "",
  });

  useEffect(() => {
    if (user) {
      carregarDados();
    }
  }, [user]);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [vendasData, clientesData] = await Promise.all([
        vendasAPI.listar(),
        clientesAPI.listar(),
      ]);
      setVendas(vendasData);
      setClientes(clientesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVenda) {
        await vendasAPI.atualizar(editingVenda.id_venda, formData);
      } else {
        await vendasAPI.criar(formData);
      }
      setShowModal(false);
      resetForm();
      carregarDados();
    } catch (error) {
      console.error("Erro ao salvar venda:", error);
      alert("Erro ao salvar venda");
    }
  };

  const handleEdit = (venda: Venda) => {
    setEditingVenda(venda);
    setFormData({
      titulo: venda.titulo,
      valor: venda.valor,
      status: venda.status,
      data_fechamento: venda.data_fechamento || "",
      observacoes: venda.observacoes || "",
      id_cliente: venda.id_cliente,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta venda?")) return;

    try {
      await vendasAPI.deletar(id);
      carregarDados();
    } catch (error) {
      console.error("Erro ao deletar venda:", error);
      alert("Erro ao deletar venda");
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: "",
      valor: 0,
      status: "em_negociacao",
      data_fechamento: "",
      observacoes: "",
      id_cliente: "",
    });
    setEditingVenda(null);
  };

  const vendasFiltradas =
    filtroStatus === "todos"
      ? vendas
      : vendas.filter((v) => v.status === filtroStatus);

  const getStatusColor = (status: string) => {
    const colors = {
      em_negociacao: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      fechada: "bg-green-500/20 text-green-300 border-green-500/30",
      perdida: "bg-red-500/20 text-red-300 border-red-500/30",
      cancelada: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    };
    return colors[status as keyof typeof colors] || colors.em_negociacao;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      em_negociacao: "Em Negociação",
      fechada: "Fechada",
      perdida: "Perdida",
      cancelada: "Cancelada",
    };
    return labels[status as keyof typeof labels] || status;
  };

  const calcularEstatisticas = () => {
    const total = vendas.reduce((sum, v) => sum + Number(v.valor), 0);
    const fechadas = vendas.filter((v) => v.status === "fechada");
    const totalFechadas = fechadas.reduce((sum, v) => sum + Number(v.valor), 0);
    const emNegociacao = vendas.filter((v) => v.status === "em_negociacao");
    const totalEmNegociacao = emNegociacao.reduce(
      (sum, v) => sum + Number(v.valor),
      0,
    );

    return {
      total,
      totalFechadas,
      totalEmNegociacao,
      quantidadeFechadas: fechadas.length,
      quantidadeEmNegociacao: emNegociacao.length,
    };
  };

  const stats = calcularEstatisticas();

  if (authLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#7e22ce] relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(138,43,226,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_20%,rgba(59,130,246,0.3)_0%,transparent_50%)] pointer-events-none" />

      <header className="relative z-10 bg-white/10 backdrop-blur-[20px] border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
          >
            VendaAI
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-white/80 hover:text-white transition-colors"
            >
              ← Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
            💰 Vendas
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-[rgba(139,92,246,0.8)] hover:bg-[rgba(139,92,246,1)] text-white px-6 py-3 rounded-xl font-semibold border border-white/20 shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            + Nova Venda
          </button>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-6">
            <div className="text-white/80 text-sm mb-2">Total em Vendas</div>
            <div className="text-3xl font-bold text-white">
              R$ {stats.total.toFixed(2)}
            </div>
          </div>
          <div className="bg-green-500/20 backdrop-blur-[20px] border border-green-500/30 rounded-2xl p-6">
            <div className="text-white/80 text-sm mb-2">Vendas Fechadas</div>
            <div className="text-3xl font-bold text-white">
              R$ {stats.totalFechadas.toFixed(2)}
            </div>
            <div className="text-green-300 text-xs mt-1">
              {stats.quantidadeFechadas} vendas
            </div>
          </div>
          <div className="bg-yellow-500/20 backdrop-blur-[20px] border border-yellow-500/30 rounded-2xl p-6">
            <div className="text-white/80 text-sm mb-2">Em Negociação</div>
            <div className="text-3xl font-bold text-white">
              R$ {stats.totalEmNegociacao.toFixed(2)}
            </div>
            <div className="text-yellow-300 text-xs mt-1">
              {stats.quantidadeEmNegociacao} vendas
            </div>
          </div>
          <div className="bg-purple-500/20 backdrop-blur-[20px] border border-purple-500/30 rounded-2xl p-6">
            <div className="text-white/80 text-sm mb-2">Total de Vendas</div>
            <div className="text-3xl font-bold text-white">{vendas.length}</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { value: "todos", label: "Todas" },
            { value: "em_negociacao", label: "Em Negociação" },
            { value: "fechada", label: "Fechadas" },
            { value: "perdida", label: "Perdidas" },
            { value: "cancelada", label: "Canceladas" },
          ].map((filtro) => (
            <button
              key={filtro.value}
              onClick={() => setFiltroStatus(filtro.value)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filtroStatus === filtro.value
                  ? "bg-white/20 text-white border-2 border-white/40"
                  : "bg-white/10 text-white/70 border border-white/20 hover:bg-white/15"
              }`}
            >
              {filtro.label}
            </button>
          ))}
        </div>

        {/* Lista de Vendas */}
        {vendasFiltradas.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-12 text-center">
            <div className="text-6xl mb-4">💰</div>
            <p className="text-white/70 text-lg">Nenhuma venda encontrada</p>
          </div>
        ) : (
          <div className="space-y-4">
            {vendasFiltradas.map((venda) => {
              const cliente = clientes.find(
                (c) => c.id_cliente === venda.id_cliente,
              );
              return (
                <div
                  key={venda.id_venda}
                  className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {venda.titulo}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(venda.status)}`}
                        >
                          {getStatusLabel(venda.status)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-white/70">
                        {cliente && <span>👤 {cliente.nome}</span>}
                        <span>💵 R$ {Number(venda.valor).toFixed(2)}</span>
                        {venda.data_fechamento && (
                          <span>
                            📅{" "}
                            {new Date(venda.data_fechamento).toLocaleDateString(
                              "pt-BR",
                            )}
                          </span>
                        )}
                      </div>

                      {venda.observacoes && (
                        <p className="text-white/60 text-sm mt-2 italic">
                          {venda.observacoes}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(venda)}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(venda.id_venda)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal de Criar/Editar */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[rgba(30,60,114,0.5)] backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 max-w-2xl w-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingVenda ? "Editar Venda" : "Nova Venda"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50"
                  placeholder="Título da venda"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Valor *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.valor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        valor: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Status *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white focus:outline-none focus:bg-white/15 focus:border-white/50"
                  >
                    <option value="em_negociacao">Em Negociação</option>
                    <option value="fechada">Fechada</option>
                    <option value="perdida">Perdida</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Cliente *
                </label>
                <select
                  required
                  value={formData.id_cliente}
                  onChange={(e) =>
                    setFormData({ ...formData, id_cliente: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white focus:outline-none focus:bg-white/15 focus:border-white/50"
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                      {cliente.nome}
                      {cliente.empresa && ` - ${cliente.empresa}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Data de Fechamento
                </label>
                <input
                  type="date"
                  value={formData.data_fechamento}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      data_fechamento: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white focus:outline-none focus:bg-white/15 focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Observações
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) =>
                    setFormData({ ...formData, observacoes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50 resize-none"
                  placeholder="Observações sobre a venda..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-semibold border border-white/20 transition-all duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[rgba(139,92,246,0.8)] hover:bg-[rgba(139,92,246,1)] text-white px-4 py-3 rounded-xl font-semibold border border-white/20 transition-all duration-300"
                >
                  {editingVenda ? "Salvar Alterações" : "Criar Venda"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
