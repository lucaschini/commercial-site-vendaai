"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return <Loading />;
  }

  // Se não tem usuário, o middleware já vai redirecionar
  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Card de Boas-vindas */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user?.username}! 👋
          </h2>
          <p className="text-gray-600">Bem-vindo ao seu painel de controle</p>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Email */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Card ID */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">ID do Usuário</p>
                <p className="text-lg font-semibold text-gray-900">
                  #{user?.id}
                </p>
              </div>
            </div>
          </div>

          {/* Card Status */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center mb-3">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-semibold text-green-600">
                  {user?.is_active ? "Ativo" : "Inativo"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Configurações */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Configurações da Conta
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">Nome de usuário</span>
              <span className="font-semibold text-gray-900">
                {user?.username}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-gray-700">Data de criação</span>
              <span className="font-semibold text-gray-900">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("pt-BR")
                  : "-"}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700">Texto personalizado</span>
              <span className="font-semibold text-gray-900">
                {user?.custom_text || "Não configurado"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
