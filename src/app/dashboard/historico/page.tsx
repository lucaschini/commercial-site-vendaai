"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { historicoChatAPI } from "@/lib/api-dual";
import { HistoricoChat, HistoricoChatCreate } from "@/types/api";
import Link from "next/link";

export default function HistoricoPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [mensagens, setMensagens] = useState<HistoricoChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (user) {
      carregarMensagens();
    }
  }, [user]);

  const carregarMensagens = async () => {
    setLoading(true);
    try {
      const data = await historicoChatAPI.listar();
      setMensagens(data);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnviarMensagem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaMensagem.trim() || !user) return;

    setEnviando(true);
    try {
      const novaMsg: HistoricoChatCreate = {
        interacao: novaMensagem,
        id_usuario: user.id_usuario,
      };
      await historicoChatAPI.criar(novaMsg);
      setNovaMensagem("");
      carregarMensagens();
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem");
    } finally {
      setEnviando(false);
    }
  };

  const handleDeletarMensagem = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta mensagem?")) return;

    try {
      await historicoChatAPI.deletar(id);
      carregarMensagens();
    } catch (error) {
      console.error("Erro ao deletar mensagem:", error);
      alert("Erro ao deletar mensagem");
    }
  };

  const handleLimparHistorico = async () => {
    if (
      !confirm(
        "Tem certeza que deseja limpar TODO o histórico? Esta ação não pode ser desfeita!",
      )
    )
      return;

    try {
      await historicoChatAPI.limparTudo();
      setMensagens([]);
    } catch (error) {
      console.error("Erro ao limpar histórico:", error);
      alert("Erro ao limpar histórico");
    }
  };

  const formatarData = (data: string) => {
    const date = new Date(data);
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);

    const isHoje = date.toDateString() === hoje.toDateString();
    const isOntem = date.toDateString() === ontem.toDateString();

    if (isHoje) {
      return `Hoje às ${date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (isOntem) {
      return `Ontem às ${date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
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

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)] mb-2">
              💬 Histórico de Chat
            </h1>
            <p className="text-white/70 text-sm">
              {mensagens.length} mensagens no histórico
            </p>
          </div>
          {mensagens.length > 0 && (
            <button
              onClick={handleLimparHistorico}
              className="bg-red-500/80 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-semibold border border-red-500/30 shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              🗑️ Limpar Histórico
            </button>
          )}
        </div>

        {/* Chat Container */}
        <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* Messages Area */}
          <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
            {mensagens.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-white/70 text-lg text-center">
                  Nenhuma mensagem no histórico ainda
                </p>
                <p className="text-white/50 text-sm text-center mt-2">
                  Envie sua primeira mensagem abaixo
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {mensagens.map((mensagem) => (
                  <div
                    key={mensagem.id_mensagem}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white/60 text-xs">
                        {formatarData(mensagem.data_envio)}
                      </span>
                      <button
                        onClick={() =>
                          handleDeletarMensagem(mensagem.id_mensagem)
                        }
                        className="text-white/40 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        🗑️
                      </button>
                    </div>
                    <p className="text-white leading-relaxed whitespace-pre-wrap">
                      {mensagem.interacao}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleEnviarMensagem}
            className="border-t border-white/20 p-6"
          >
            <div className="flex gap-3">
              <textarea
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                placeholder="Digite sua mensagem..."
                rows={3}
                disabled={enviando}
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50 resize-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={enviando || !novaMensagem.trim()}
                className="bg-[rgba(139,92,246,0.8)] hover:bg-[rgba(139,92,246,1)] text-white px-6 py-3 rounded-xl font-semibold border border-white/20 shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none h-fit"
              >
                {enviando ? "Enviando..." : "Enviar"}
              </button>
            </div>
            <p className="text-white/50 text-xs mt-2">
              💡 Dica: Suas mensagens são salvas e podem ser consultadas a
              qualquer momento
            </p>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-500/20 backdrop-blur-[20px] border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            ℹ️ Sobre o Histórico de Chat
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Todas as suas interações com a IA são salvas aqui automaticamente.
            Use este espaço para registrar insights, anotações importantes sobre
            vendas, ou qualquer informação relevante que você queira consultar
            depois.
          </p>
        </div>
      </main>
    </div>
  );
}
