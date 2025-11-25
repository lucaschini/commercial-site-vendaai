"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Loading />;
  }

  const stats = [
    { label: "Vendas do Mês", value: "R$ 48.5K", change: "↑ 12%", positive: true },
    { label: "Conversões", value: "68%", change: "↑ 8%", positive: true },
    { label: "Leads Ativos", value: "234", change: "↓ 3%", positive: false },
    { label: "Ticket Médio", value: "R$ 580", change: "↑ 15%", positive: true },
  ];

  const insights = [
    {
      icon: "🎯",
      title: "Alta conversão detectada",
      description: "Você apresentou o produto premium e suas funcionalidades",
    },
    {
      icon: "💰",
      title: "Atenção ao preço",
      description: "O possível cliente mostrou interesse, porém o preço pode ser uma objeção",
    },
    {
      icon: "⚠️",
      title: "Momento crítico",
      description: "O possível cliente explicou a situação atual da empresa dele",
    },
  ];

  const actions = [
    { icon: "🔍", text: "Pesquisar a empresa dele na internet" },
    { icon: "💬", text: "Sugerir perguntas para continuar" },
    { icon: "🎯", text: "Quebra de objeções" },
  ];

  const activities = [
    { icon: "✓", title: "Venda concluída - Cliente João Silva", time: "Há 2 horas" },
    { icon: "📞", title: "Ligação agendada com Maria Santos", time: "Há 4 horas" },
    { icon: "📧", title: "Email enviado para 15 leads", time: "Há 6 horas" },
    { icon: "💡", title: "Novo insight gerado sobre produto X", time: "Há 8 horas" },
    { icon: "🎯", title: "Meta mensal atingida em 87%", time: "Ontem" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#7e22ce] relative overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(138,43,226,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_20%,rgba(59,130,246,0.3)_0%,transparent_50%)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-[20px] border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            VendaAI
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="bg-white/15 backdrop-blur-lg border border-white/20 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              ⚙️ Configurações
            </button>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-lg border-2 border-white/30 rounded-full flex items-center justify-center text-white font-bold">
              {user.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
          Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-white/80 text-sm mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                {stat.value}
              </div>
              <div className={`text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change} vs mês anterior
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Card */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-white mb-6">
              📊 Performance de Vendas
            </h2>
            <div className="h-80 bg-gradient-to-t from-white/5 to-transparent rounded-xl flex items-end justify-around p-4 gap-2">
              {[60, 85, 45, 95, 70, 88, 92].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[rgba(139,92,246,0.8)] to-[rgba(167,139,250,0.6)] rounded-t-lg shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:from-[rgba(139,92,246,1)] hover:to-[rgba(167,139,250,0.8)] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          {/* Insights Card */}
          <div className="bg-[rgba(139,92,246,0.3)] backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(139,92,246,0.2)]">
            <h2 className="text-2xl font-semibold text-white mb-6">
              💡 Insights
            </h2>

            {insights.map((insight, i) => (
              <div
                key={i}
                className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-xl p-4 mb-4 hover:bg-white/20 hover:translate-x-1 transition-all duration-300"
              >
                <strong className="block text-white text-lg mb-2">
                  {insight.icon} {insight.title}
                </strong>
                <p className="text-white/90 text-sm leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}

            <div className="mt-6 pt-6 border-t border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                Ações Recomendadas
              </h3>
              {actions.map((action, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-3 mb-3 cursor-pointer hover:bg-white/20 hover:translate-x-1 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                    {action.icon}
                  </div>
                  <span className="text-white text-sm">{action.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          <h2 className="text-2xl font-semibold text-white mb-6">
            📋 Atividades Recentes
          </h2>
          <ul className="space-y-2">
            {activities.map((activity, i) => (
              <li
                key={i}
                className="flex items-center gap-4 p-4 border-b border-white/10 last:border-0 hover:bg-white/5 rounded-xl transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[rgba(139,92,246,0.3)] backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold mb-1">
                    {activity.title}
                  </div>
                  <div className="text-white/60 text-sm">{activity.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* User Info Card */}
        <div className="mt-8 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Informações da Conta</h3>
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
              <span className="text-white font-semibold">{user.username}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/70">Email</span>
              <span className="text-white font-semibold">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/70">Status</span>
              <span className="text-green-400 font-semibold">
                {user.is_active ? "Ativo" : "Inativo"}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-white/70">ID do Usuário</span>
              <span className="text-white font-semibold">#{user.id}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSettings(false)}>
          <div className="bg-[rgba(30,60,114,0.5)] backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-white mb-6">Configurações</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">Linguagem</label>
                <select className="w-full bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50">
                  <option>Português</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-white/80">Transparência do fundo</span>
                  <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full appearance-none bg-white/20 checked:bg-blue-500 relative cursor-pointer transition-colors" />
                </label>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Estilo de layout</label>
                <select className="w-full bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50">
                  <option>Fixo</option>
                  <option>Fluido</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-3">Tamanho do texto</label>
                <input type="range" min="12" max="20" defaultValue="16" className="w-full" />
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-white/80">Notificações</span>
                  <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full appearance-none bg-white/20 checked:bg-blue-500 relative cursor-pointer transition-colors" />
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