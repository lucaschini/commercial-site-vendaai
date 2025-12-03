"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import {
  sugestoesAPI,
  getDashboardStats,
  DashboardStats,
} from "@/lib/api-dual";
import { SugestaoIA } from "@/types/api";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [showSugestoes, setShowSugestoes] = useState(false);
  const [sugestoes, setSugestoes] = useState<SugestaoIA[]>([]);
  const [loadingSugestoes, setLoadingSugestoes] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (user) {
      carregarEstatisticas();
    }
  }, [user]);

  useEffect(() => {
    if (showSugestoes) {
      carregarSugestoes();
    }
  }, [showSugestoes]);

  const carregarEstatisticas = async () => {
    setLoadingStats(true);
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const carregarSugestoes = async () => {
    setLoadingSugestoes(true);
    try {
      const data = await sugestoesAPI.listar(0, 10, false);
      setSugestoes(data);
    } catch (error) {
      console.error("Erro ao carregar sugestões:", error);
    } finally {
      setLoadingSugestoes(false);
    }
  };

  const aceitarSugestao = async (id: string) => {
    try {
      await sugestoesAPI.aceitar(id);
      carregarSugestoes();
    } catch (error) {
      console.error("Erro ao aceitar sugestão:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  if (loading || loadingStats) {
    return <Loading />;
  }

  if (!user || !stats) {
    return <Loading />;
  }

  // Calcular variações
  const variacaoVendas = stats.variacao_vendas;
  const variacaoClientes =
    stats.total_clientes_mes_anterior > 0
      ? ((stats.total_clientes - stats.total_clientes_mes_anterior) /
          stats.total_clientes_mes_anterior) *
        100
      : 0;

  const statsCards = [
    {
      label: "Vendas do Mês",
      value: `R$ ${(stats.vendas_mes_atual / 1000).toFixed(1)}K`,
      change: `${variacaoVendas >= 0 ? "↑" : "↓"} ${Math.abs(variacaoVendas).toFixed(0)}%`,
      positive: variacaoVendas >= 0,
    },
    {
      label: "Conversões",
      value: `${stats.conversao_rate.toFixed(0)}%`,
      change: `${stats.total_vendas_fechadas}/${stats.total_vendas} vendas`,
      positive: stats.conversao_rate > 50,
    },
    {
      label: "Leads Ativos",
      value: stats.total_clientes.toString(),
      change: `${variacaoClientes >= 0 ? "↑" : "↓"} ${Math.abs(variacaoClientes).toFixed(0)}%`,
      positive: variacaoClientes >= 0,
    },
    {
      label: "Ticket Médio",
      value: `R$ ${stats.ticket_medio.toFixed(0)}`,
      change: `${stats.total_vendas} vendas`,
      positive: true,
    },
  ];

  const menuItems = [
    { icon: "📞", label: "Chamadas", href: "/dashboard/chamadas" },
    { icon: "👥", label: "Clientes", href: "/dashboard/clientes" },
    { icon: "💰", label: "Vendas", href: "/dashboard/vendas" },
    { icon: "💬", label: "Histórico", href: "/dashboard/historico" },
  ];

  const activities = [
    {
      icon: "✓",
      title: "Venda concluída - Cliente João Silva",
      time: "Há 2 horas",
    },
    {
      icon: "📞",
      title: "Ligação agendada com Maria Santos",
      time: "Há 4 horas",
    },
    { icon: "📧", title: "Email enviado para 15 leads", time: "Há 6 horas" },
    {
      icon: "💡",
      title: "Novo insight gerado sobre produto X",
      time: "Há 8 horas",
    },
    { icon: "🎯", title: "Meta mensal atingida em 87%", time: "Ontem" },
  ];

  // Calcular altura máxima para normalizar o gráfico
  const maxQuantidade = Math.max(
    ...stats.vendas_por_mes.map((v) => v.quantidade),
    1,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#7e22ce] relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(138,43,226,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_20%,rgba(59,130,246,0.3)_0%,transparent_50%)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-[20px] border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            VendaAI
          </div>

          {/* Menu de Navegação */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-center gap-2 text-white/90 hover:text-white hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)] transition-all"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSugestoes(!showSugestoes)}
              className="relative bg-white/15 backdrop-blur-lg border border-white/20 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              💡 Sugestões
              {sugestoes.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {sugestoes.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="bg-white/15 backdrop-blur-lg border border-white/20 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              ⚙️ Configurações
            </button>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-lg border-2 border-white/30 rounded-full flex items-center justify-center text-white font-bold">
              {user.nome?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
            Dashboard
          </h1>
          <button
            onClick={carregarEstatisticas}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm border border-white/20 transition-all"
          >
            🔄 Atualizar
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="text-white font-semibold">{item.label}</div>
            </Link>
          ))}
        </div>

        {/* Stats Grid - DADOS REAIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-white/80 text-sm mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                {stat.value}
              </div>
              <div
                className={`text-sm font-medium ${stat.positive ? "text-green-400" : "text-red-400"}`}
              >
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Card - DADOS REAIS */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-white mb-6">
              📊 Performance de Vendas (últimos 7 meses)
            </h2>
            <div className="h-80 bg-gradient-to-t from-white/5 to-transparent rounded-xl flex items-end justify-around p-4 gap-2">
              {stats.vendas_por_mes.map((venda, i) => {
                const altura =
                  maxQuantidade > 0
                    ? (venda.quantidade / maxQuantidade) * 100
                    : 0;
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="relative group w-full flex flex-col items-center">
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/80 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10">
                        <div className="font-semibold">{venda.mes}</div>
                        <div>Vendas: {venda.quantidade}</div>
                        <div>Total: R$ {venda.total.toFixed(2)}</div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black/80"></div>
                      </div>

                      {/* Barra */}
                      <div
                        className="w-full bg-gradient-to-t from-[rgba(139,92,246,0.8)] to-[rgba(167,139,250,0.6)] rounded-t-lg shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:from-[rgba(139,92,246,1)] hover:to-[rgba(167,139,250,0.8)] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                        style={{ height: `${Math.max(altura, 5)}%` }}
                      />
                    </div>
                    <div className="text-white/70 text-xs font-medium">
                      {venda.mes}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <h2 className="text-2xl font-semibold text-white mb-6">
              📋 Atividades Recentes
            </h2>
            <ul className="space-y-2">
              {activities.slice(0, 5).map((activity, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 p-3 border-b border-white/10 last:border-0 hover:bg-white/5 rounded-xl transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-[rgba(139,92,246,0.3)] backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white flex-shrink-0 text-sm">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">
                      {activity.title}
                    </div>
                    <div className="text-white/60 text-xs">{activity.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">
              Informações da Conta
            </h3>
            <button
              onClick={handleLogout}
              className="bg-red-500/80 backdrop-blur-lg hover:bg-red-500 text-white px-6 py-2 rounded-xl font-medium border border-red-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Sair
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/70">Nome de usuário</span>
              <span className="text-white font-semibold">{user.nome}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/70">Email</span>
              <span className="text-white font-semibold">{user.e_mail}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/70">Status</span>
              <span className="text-green-400 font-semibold">Ativo</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-white/70">ID do Usuário</span>
              <span className="text-white font-semibold">
                #{user.id_usuario}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Sugestões */}
      {showSugestoes && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSugestoes(false)}
        >
          <div
            className="bg-[rgba(30,60,114,0.5)] backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                💡 Sugestões da IA
              </h3>
              <button
                onClick={() => setShowSugestoes(false)}
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

            {loadingSugestoes ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white mx-auto"></div>
                <p className="text-white/70 mt-4">Carregando sugestões...</p>
              </div>
            ) : sugestoes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white/70">
                  Nenhuma sugestão pendente no momento
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sugestoes.map((sugestao) => (
                  <div
                    key={sugestao.id_sugestao}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4"
                  >
                    <p className="text-white mb-3">{sugestao.conteudo}</p>
                    {sugestao.momento && (
                      <p className="text-white/60 text-sm mb-3">
                        Momento: {sugestao.momento}s
                      </p>
                    )}
                    <button
                      onClick={() => aceitarSugestao(sugestao.id_sugestao)}
                      className="bg-green-500/80 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm transition-all"
                    >
                      ✓ Aceitar Sugestão
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-[rgba(30,60,114,0.5)] backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Configurações
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Linguagem
                </label>
                <select className="w-full bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50">
                  <option>Português</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-white/80">Notificações</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-12 h-6 rounded-full appearance-none bg-white/20 checked:bg-blue-500 relative cursor-pointer transition-colors"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="w-full mt-8 bg-[rgba(139,92,246,0.8)] hover:bg-[rgba(139,92,246,1)] text-white px-4 py-3 rounded-xl font-semibold border border-white/20 transition-all duration-300"
            >
              Salvar Configurações
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
