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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <>
      <header className="flex justify-between items-center p-4">
        <div className="font-semibold text-3xl">Venda.AI</div>

        <nav className="flex gap-6 items-center">
          <Link href="#how">Como Funciona</Link>
          <Link href="#aplicacoes">Aplicações</Link>
          <Link href="#func">Funcionalidades</Link>
          <Link href="#faq">FAQ</Link>
          <Link href="#download">Download</Link>
        </nav>

        <Link href="/login">Login</Link>
      </header>

      <main className="px-4 md:px-8 lg:px-16 xl:px-24">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mt-12 md:mt-20 mb-20 md:mb-32 gap-12 lg:gap-16">
          <div className="flex flex-col gap-10 max-w-full lg:max-w-xl text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-center px-4">
              Como nós te ajudamos a <br /> vender melhor <br /> com nossa IA?
            </h1>

            <p className="[font-family:'Inter',Helvetica] font-normal text-white text-center text-lg md:text-xl tracking-[0] leading-[normal] mb-12 md:mb-16 max-w-lg mx-auto lg:mx-0 px-4">
              O assistente invisível que analisa suas reuniões e ajuda a fechar
              mais
            </p>
          </div>

          <div className="w-full max-w-md lg:max-w-lg h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-2xl flex-shrink-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <p className="text-sm opacity-80">Demo Interativa</p>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section id="how" className="mb-20 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Três passos simples para revolucionar suas vendas com inteligência
              artificial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Conecte
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Integre o Venda.AI às suas plataformas de reunião favoritas.
                Zoom, Meet, Teams - funciona com todas.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Analise
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Nossa IA escuta, processa e identifica oportunidades de venda em
                tempo real durante suas reuniões.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Venda Mais
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Receba insights instantâneos, sugestões de fechamento e
                follow-ups personalizados para cada cliente.
              </p>
            </div>
          </div>
        </section>

        {/* Aplicações Section */}
        <section id="aplicacoes" className="mb-20 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Aplicações
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Versatilidade que se adapta ao seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Vendas B2B
              </h3>
              <p className="text-gray-300 text-sm">
                Analise reuniões comerciais complexas e identifique pontos de
                dor dos prospects
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Consultoria
              </h3>
              <p className="text-gray-300 text-sm">
                Capture necessidades dos clientes e gere propostas mais
                assertivas
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">SaaS</h3>
              <p className="text-gray-300 text-sm">
                Otimize demos de produto e identifique features mais valorizadas
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Imobiliária
              </h3>
              <p className="text-gray-300 text-sm">
                Entenda preferências de clientes e acelere o processo de vendas
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zM4 4h16v2H4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Financeiro
              </h3>
              <p className="text-gray-300 text-sm">
                Analise perfil de risco e personalize ofertas de produtos
                financeiros
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                E-commerce
              </h3>
              <p className="text-gray-300 text-sm">
                Melhore atendimento ao cliente e aumente conversão em vendas
                online
              </p>
            </div>
          </div>
        </section>

        {/* Funcionalidades Section */}
        <section id="func" className="mb-20 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Funcionalidades
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Recursos poderosos para turbinar suas vendas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Transcrição em Tempo Real
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Converta automaticamente suas conversas em texto com 99% de
                    precisão, em português e outros idiomas.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Análise de Sentimentos
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Entenda o humor e a receptividade do cliente durante a
                    conversa para ajustar sua abordagem.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Insights Instantâneos
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Receba sugestões em tempo real sobre como conduzir a
                    conversa e quais perguntas fazer.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Relatórios Detalhados
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Gere resumos completos de cada reunião com pontos-chave,
                    próximos passos e oportunidades identificadas.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Integração CRM
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Sincronize automaticamente com Salesforce, HubSpot,
                    Pipedrive e outros CRMs populares.
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Segurança Total
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Criptografia end-to-end e conformidade com LGPD e GDPR para
                    proteger dados sensíveis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-20 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tire suas dúvidas sobre o Venda.AI
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <details className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex justify-between items-center">
                Como o Venda.AI protege a privacidade dos dados?
                <span className="text-2xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Utilizamos criptografia de ponta a ponta e seguimos
                rigorosamente as normas da LGPD e GDPR. Todos os dados são
                processados em servidores seguros e você tem controle total
                sobre suas informações, podendo deletá-las a qualquer momento.
              </p>
            </details>

            <details className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex justify-between items-center">
                Qual é a precisão da transcrição?
                <span className="text-2xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Nossa IA tem 99% de precisão na transcrição em português e
                suporta mais de 30 idiomas. A tecnologia se adapta a diferentes
                sotaques e contextos de negócio, melhorando continuamente com o
                uso.
              </p>
            </details>

            <details className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex justify-between items-center">
                Funciona com quais plataformas de reunião?
                <span className="text-2xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Integramos com Zoom, Google Meet, Microsoft Teams, Webex,
                GoToMeeting e outras principais plataformas. Também funciona em
                chamadas telefônicas tradicionais e reuniões presenciais através
                do app móvel.
              </p>
            </details>

            <details className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex justify-between items-center">
                Existe um período de teste gratuito?
                <span className="text-2xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Sim! Oferecemos 14 dias grátis com acesso completo a todas as
                funcionalidades. Não é necessário cartão de crédito para
                começar. Você pode cancelar a qualquer momento.
              </p>
            </details>

            <details className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex justify-between items-center">
                Como funciona a integração com CRM?
                <span className="text-2xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-gray-300 mt-4 leading-relaxed">
                A integração é automática e em tempo real. Após cada reunião, os
                insights e resumos são enviados diretamente para o seu CRM,
                criando tarefas de follow-up e atualizando o status dos leads
                automaticamente.
              </p>
            </details>

            <details className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex justify-between items-center">
                Preciso de treinamento para usar a plataforma?
                <span className="text-2xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Não! O Venda.AI foi desenvolvido para ser intuitivo e fácil de
                usar. Oferecemos onboarding personalizado, tutoriais interativos
                e suporte 24/7 em português para garantir que você aproveite ao
                máximo a plataforma desde o primeiro dia.
              </p>
            </details>
          </div>
        </section>

        {/* Download/CTA Section */}
        <section id="download" className="mb-20 text-center">
          <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para vender mais?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de vendedores que já aumentaram suas
              conversões com o Venda.AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg">
                Começar Teste Gratuito
              </button>
              <button className="px-8 py-4 backdrop-blur-lg bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300">
                Agendar Demo
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
