"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#7e22ce]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#7e22ce] relative overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(138,43,226,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_20%,rgba(59,130,246,0.3)_0%,transparent_50%)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-[20px] border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-3xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            Venda.AI
          </div>

          <nav className="hidden md:flex gap-8 text-white">
            <a href="#how" className="hover:drop-shadow-[0_4px_10px_rgba(255,255,255,0.5)] transition-all">
              Como Funciona
            </a>
            <a href="#aplicacoes" className="hover:drop-shadow-[0_4px_10px_rgba(255,255,255,0.5)] transition-all">
              Aplicações
            </a>
            <a href="#func" className="hover:drop-shadow-[0_4px_10px_rgba(255,255,255,0.5)] transition-all">
              Funcionalidades
            </a>
            <a href="#faq" className="hover:drop-shadow-[0_4px_10px_rgba(255,255,255,0.5)] transition-all">
              FAQ
            </a>
          </nav>

          <Link
            href="/login"
            className="bg-white/20 backdrop-blur-lg border border-white/30 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="relative z-10 px-6 md:px-12 lg:px-24">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-20 mb-32">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] max-w-5xl">
            Como nós te ajudamos a <br className="hidden md:block" /> vender melhor <br className="hidden md:block" /> com nossa IA?
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
            O assistente invisível que analisa suas reuniões e ajuda a fechar mais
          </p>

          <div className="flex gap-4 mb-16">
            <Link
              href="/register"
              className="bg-white/95 hover:bg-white text-[#1e3c72] px-10 py-4 rounded-full font-bold text-lg shadow-[0_8px_25px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300"
            >
              Começar Grátis
            </Link>
            <a
              href="#how"
              className="bg-white/15 backdrop-blur-lg border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/25 hover:-translate-y-1 transition-all duration-300"
            >
              Saiba Mais
            </a>
          </div>

          {/* Demo Placeholder */}
          <div className="w-full max-w-4xl h-96 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <p className="text-white/80 text-lg">Demo Interativa</p>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section id="how" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
              Como Funciona
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Três passos simples para revolucionar suas vendas com inteligência artificial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Conecte", desc: "Integre o Venda.AI às suas plataformas de reunião favoritas. Zoom, Meet, Teams - funciona com todas.", gradient: "from-blue-400 to-purple-500" },
              { num: "2", title: "Analise", desc: "Nossa IA escuta, processa e identifica oportunidades de venda em tempo real durante suas reuniões.", gradient: "from-purple-500 to-pink-500" },
              { num: "3", title: "Venda Mais", desc: "Receba insights instantâneos, sugestões de fechamento e follow-ups personalizados para cada cliente.", gradient: "from-pink-500 to-orange-500" },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 text-center hover:bg-white/15 hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl font-bold text-white">{step.num}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-white/80 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Aplicações */}
        <section id="aplicacoes" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
              Aplicações
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Versatilidade que se adapta ao seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📧", title: "Vendas B2B", desc: "Analise reuniões comerciais complexas e identifique pontos de dor dos prospects", bg: "bg-blue-500/20" },
              { icon: "✓", title: "Consultoria", desc: "Capture necessidades dos clientes e gere propostas mais assertivas", bg: "bg-green-500/20" },
              { icon: "⭐", title: "SaaS", desc: "Otimize demos de produto e identifique features mais valorizadas", bg: "bg-purple-500/20" },
              { icon: "📊", title: "Imobiliária", desc: "Entenda preferências de clientes e acelere o processo de vendas", bg: "bg-orange-500/20" },
              { icon: "💰", title: "Financeiro", desc: "Analise perfil de risco e personalize ofertas de produtos financeiros", bg: "bg-red-500/20" },
              { icon: "🛒", title: "E-commerce", desc: "Melhore atendimento ao cliente e aumente conversão em vendas online", bg: "bg-cyan-500/20" },
            ].map((app, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${app.bg} backdrop-blur-lg rounded-lg mb-4 flex items-center justify-center text-2xl`}>
                  {app.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{app.title}</h3>
                <p className="text-white/70 text-sm">{app.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Funcionalidades */}
        <section id="func" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
              Funcionalidades
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Recursos poderosos para turbinar suas vendas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: "🎤", title: "Transcrição em Tempo Real", desc: "Converta automaticamente suas conversas em texto com 99% de precisão, em português e outros idiomas.", gradient: "from-blue-500 to-purple-500" },
              { icon: "😊", title: "Análise de Sentimentos", desc: "Entenda o humor e a receptividade do cliente durante a conversa para ajustar sua abordagem.", gradient: "from-purple-500 to-pink-500" },
              { icon: "💡", title: "Insights Instantâneos", desc: "Receba sugestões em tempo real sobre como conduzir a conversa e quais perguntas fazer.", gradient: "from-pink-500 to-orange-500" },
              { icon: "📄", title: "Relatórios Detalhados", desc: "Gere resumos completos de cada reunião com pontos-chave, próximos passos e oportunidades identificadas.", gradient: "from-orange-500 to-red-500" },
              { icon: "🔗", title: "Integração CRM", desc: "Sincronize automaticamente com Salesforce, HubSpot, Pipedrive e outros CRMs populares.", gradient: "from-green-500 to-teal-500" },
              { icon: "🔒", title: "Segurança Total", desc: "Criptografia end-to-end e conformidade com LGPD e GDPR para proteger dados sensíveis.", gradient: "from-teal-500 to-blue-500" },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center flex-shrink-0 text-2xl shadow-lg`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/80 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Tire suas dúvidas sobre o Venda.AI
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "Como o Venda.AI protege a privacidade dos dados?", a: "Utilizamos criptografia de ponta a ponta e seguimos rigorosamente as normas da LGPD e GDPR." },
              { q: "Qual é a precisão da transcrição?", a: "Nossa IA tem 99% de precisão na transcrição em português e suporta mais de 30 idiomas." },
              { q: "Funciona com quais plataformas de reunião?", a: "Integramos com Zoom, Google Meet, Microsoft Teams, Webex, GoToMeeting e outras principais plataformas." },
              { q: "Existe um período de teste gratuito?", a: "Sim! Oferecemos 14 dias grátis com acesso completo a todas as funcionalidades." },
            ].map((faq, i) => (
              <details key={i} className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group">
                <summary className="text-xl font-semibold text-white cursor-pointer flex justify-between items-center">
                  {faq.q}
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-white/80 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="mb-20 text-center">
          <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-3xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <h2 className="text-5xl font-bold text-white mb-6">
              Pronto para vender mais?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de vendedores que já aumentaram suas conversões com o Venda.AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600 hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Começar Teste Gratuito
              </Link>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                Agendar Demo
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}