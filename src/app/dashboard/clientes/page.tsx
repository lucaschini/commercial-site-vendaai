"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { clientesAPI } from "@/lib/api-client";
import { ClienteLead, ClienteLeadCreate } from "@/types/api";
import Link from "next/link";

export default function ClientesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [clientes, setClientes] = useState<ClienteLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState<ClienteLead | null>(
    null,
  );
  const [busca, setBusca] = useState("");
  const [formData, setFormData] = useState<ClienteLeadCreate>({
    nome: "",
    telefone: "",
    e_mail: "",
    empresa: "",
    observacao: "",
  });

  useEffect(() => {
    if (user) {
      carregarClientes();
    }
  }, [user]);

  const carregarClientes = async () => {
    setLoading(true);
    try {
      const data = await clientesAPI.listar();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCliente) {
        await clientesAPI.atualizar(editingCliente.id_cliente, formData);
      } else {
        await clientesAPI.criar(formData);
      }
      setShowModal(false);
      resetForm();
      carregarClientes();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      alert("Erro ao salvar cliente");
    }
  };

  const handleEdit = (cliente: ClienteLead) => {
    setEditingCliente(cliente);
    setFormData({
      nome: cliente.nome,
      telefone: cliente.telefone || "",
      e_mail: cliente.e_mail || "",
      empresa: cliente.empresa || "",
      observacao: cliente.observacao || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este cliente?")) return;

    try {
      await clientesAPI.deletar(id);
      carregarClientes();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      alert("Erro ao deletar cliente");
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      telefone: "",
      e_mail: "",
      empresa: "",
      observacao: "",
    });
    setEditingCliente(null);
  };

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.empresa?.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.e_mail?.toLowerCase().includes(busca.toLowerCase()),
  );

  if (authLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#7e22ce] relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(138,43,226,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_20%,rgba(59,130,246,0.3)_0%,transparent_50%)] pointer-events-none" />

      {/* Header */}
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

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
            👥 Clientes & Leads
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-[rgba(139,92,246,0.8)] hover:bg-[rgba(139,92,246,1)] text-white px-6 py-3 rounded-xl font-semibold border border-white/20 shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            + Novo Cliente
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar por nome, empresa ou email..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full px-6 py-4 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 transition-all"
          />
        </div>

        {/* Clientes Grid */}
        {clientesFiltrados.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-white/70 text-lg">
              {busca
                ? "Nenhum cliente encontrado"
                : "Nenhum cliente cadastrado ainda"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientesFiltrados.map((cliente) => (
              <div
                key={cliente.id_cliente}
                className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {cliente.nome.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cliente)}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(cliente.id_cliente)}
                      className="text-white/70 hover:text-red-400 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {cliente.nome}
                </h3>

                {cliente.empresa && (
                  <p className="text-white/80 text-sm mb-2">
                    🏢 {cliente.empresa}
                  </p>
                )}

                {cliente.e_mail && (
                  <p className="text-white/70 text-sm mb-1">
                    📧 {cliente.e_mail}
                  </p>
                )}

                {cliente.telefone && (
                  <p className="text-white/70 text-sm mb-3">
                    📞 {cliente.telefone}
                  </p>
                )}

                {cliente.observacao && (
                  <p className="text-white/60 text-xs italic mt-3 pt-3 border-t border-white/10">
                    {cliente.observacao}
                  </p>
                )}
              </div>
            ))}
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
              {editingCliente ? "Editar Cliente" : "Novo Cliente"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50"
                  placeholder="Nome do cliente"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.e_mail}
                  onChange={(e) =>
                    setFormData({ ...formData, e_mail: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50"
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({ ...formData, telefone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) =>
                    setFormData({ ...formData, empresa: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Observações
                </label>
                <textarea
                  value={formData.observacao}
                  onChange={(e) =>
                    setFormData({ ...formData, observacao: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50 resize-none"
                  placeholder="Observações sobre o cliente..."
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
                  {editingCliente ? "Salvar Alterações" : "Criar Cliente"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
