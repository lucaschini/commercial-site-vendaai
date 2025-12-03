"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { chamadasAPI, clientesAPI } from "@/lib/api-dual";
import { Chamada, ChamadaCreate, ClienteLead } from "@/types/api";
import Link from "next/link";

export default function ChamadasPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [chamadas, setChamadas] = useState<Chamada[]>([]);
  const [clientes, setClientes] = useState<ClienteLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedChamada, setSelectedChamada] = useState<Chamada | null>(null);
  const [filtroResultado, setFiltroResultado] = useState<string>("todos");

  useEffect(() => {
    if (user) {
      carregarDados();
    }
  }, [user]);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [chamadasData, clientesData] = await Promise.all([
        chamadasAPI.listar(),
        clientesAPI.listar(),
      ]);
      setChamadas(chamadasData);
      setClientes(clientesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta chamada?")) return;

    try {
      await chamadasAPI.deletar(id);
      carregarDados();
    } catch (error) {
      console.error("Erro ao deletar chamada:", error);
      alert("Erro ao deletar chamada");
    }
  };

  const handleViewDetails = (chamada: Chamada) => {
    setSelectedChamada(chamada);
    setShowModal(true);
  };

  const chamadasFiltradas =
    filtroResultado === "todos"
      ? chamadas
      : chamadas.filter((c) => c.resultado === filtroResultado);

  const getResultadoColor = (resultado?: string) => {
    const colors = {
      sucesso: "bg-green-500/20 text-green-300 border-green-500/30",
      falha: "bg-red-500/20 text-red-300 border-red-500/30",
      em_andamento: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    };
    return colors[resultado as keyof typeof colors] || colors.em_andamento;
  };

  const getResultadoLabel = (resultado?: string) => {
    const labels = {
      sucesso: "Sucesso",
      falha: "Falha",
      em_andamento: "Em Andamento",
    };
    return labels[resultado as keyof typeof labels] || "Desconhecido";
  };

  const formatDuracao = (segundos?: number) => {
    if (!segundos) return "N/A";
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}min ${segs}s`;
  };

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
            📞 Chamadas
          </h1>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-6">
            <div className="text-white/80 text-sm mb-2">Total de Chamadas</div>
            <div className="text-3xl font-bold text-white">
              {chamadas.length}
            </div>
          </div>
          <div className="bg-green-500/20 backdrop-blur-[20px] border border-green-500/30 rounded-2xl p-6">
            <div className="text-white/80 text-sm mb-2">Sucesso</div>
            <div className="text-3xl font-bold text-white">
              {chamadas.filter((c) => c.resultado === "sucesso").length}
            </div>
          </div>
          <div className="bg-red-500/20 backdrop-blur-[20px] border border-red-500/30 rounded-2xl p-6">
            <div className="text-white/80 text-sm mb-2">Falhas</div>
            <div className="text-3xl font-bold text-white">
              {chamadas.filter((c) => c.resultado === "falha").length}
            </div>
          </div>
          <div className="bg-yellow-500/20 backdrop-blur-[20px] border border-yellow-500/30 rounded-2xl p-6">
            <div className="text-white/80 text-sm mb-2">Em Andamento</div>
            <div className="text-3xl font-bold text-white">
              {chamadas.filter((c) => c.resultado === "em_andamento").length}
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { value: "todos", label: "Todas" },
            { value: "sucesso", label: "Sucesso" },
            { value: "falha", label: "Falhas" },
            { value: "em_andamento", label: "Em Andamento" },
          ].map((filtro) => (
            <button
              key={filtro.value}
              onClick={() => setFiltroResultado(filtro.value)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filtroResultado === filtro.value
                  ? "bg-white/20 text-white border-2 border-white/40"
                  : "bg-white/10 text-white/70 border border-white/20 hover:bg-white/15"
              }`}
            >
              {filtro.label}
            </button>
          ))}
        </div>

        {/* Lista de Chamadas */}
        {chamadasFiltradas.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-12 text-center">
            <div className="text-6xl mb-4">📞</div>
            <p className="text-white/70 text-lg">Nenhuma chamada encontrada</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chamadasFiltradas.map((chamada) => {
              const cliente = clientes.find(
                (c) => c.id_cliente === chamada.id_cliente,
              );
              return (
                <div
                  key={chamada.id_chamada}
                  className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getResultadoColor(chamada.resultado)}`}
                        >
                          {getResultadoLabel(chamada.resultado)}
                        </span>
                        <span className="text-white/70 text-sm">
                          {new Date(chamada.data_hora).toLocaleString("pt-BR")}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-white/70">
                        {cliente && <span>👤 {cliente.nome}</span>}
                        <span>⏱️ {formatDuracao(chamada.duracao)}</span>
                      </div>

                      {chamada.transcricao && (
                        <p className="text-white/60 text-sm mt-3 line-clamp-2">
                          {chamada.transcricao}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(chamada)}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                      >
                        👁️ Ver Detalhes
                      </button>
                      <button
                        onClick={() => handleDelete(chamada.id_chamada)}
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

      {/* Modal de Detalhes */}
      {showModal && selectedChamada && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[rgba(30,60,114,0.5)] backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 max-w-3xl w-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                Detalhes da Chamada
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/70 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-white/60 text-sm mb-1">Data/Hora</div>
                  <div className="text-white font-semibold">
                    {new Date(selectedChamada.data_hora).toLocaleString(
                      "pt-BR",
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Duração</div>
                  <div className="text-white font-semibold">
                    {formatDuracao(selectedChamada.duracao)}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-white/60 text-sm mb-1">Resultado</div>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getResultadoColor(selectedChamada.resultado)}`}
                >
                  {getResultadoLabel(selectedChamada.resultado)}
                </span>
              </div>

              <div>
                <div className="text-white/60 text-sm mb-1">Cliente</div>
                <div className="text-white font-semibold">
                  {clientes.find(
                    (c) => c.id_cliente === selectedChamada.id_cliente,
                  )?.nome || "N/A"}
                </div>
              </div>

              {selectedChamada.transcricao && (
                <div>
                  <div className="text-white/60 text-sm mb-2">Transcrição</div>
                  <div className="bg-white/5 rounded-xl p-4 text-white/90 max-h-96 overflow-y-auto">
                    {selectedChamada.transcricao}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 bg-[rgba(139,92,246,0.8)] hover:bg-[rgba(139,92,246,1)] text-white px-4 py-3 rounded-xl font-semibold border border-white/20 transition-all duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
