"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api-dual";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { login: setAuthUser } = useAuth();
  const [formData, setFormData] = useState({
    e_mail: "",
    nome: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(true);
    console.log(formData);
    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await register(registerData);
      setAuthUser(response.user);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#7e22ce] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(138,43,226,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_20%,rgba(59,130,246,0.3)_0%,transparent_50%)] pointer-events-none" />

      {/* Close button */}
      <Link
        href="/"
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
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
      </Link>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[rgba(30,60,114,0.5)] backdrop-blur-[20px] rounded-[25px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Criar conta</h2>
            <p className="text-white/80 text-sm">
              Preencha os dados para começar
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-xl">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-white font-medium text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.e_mail}
                onChange={(e) =>
                  setFormData({ ...formData, e_mail: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)] transition-all"
                placeholder="seu@email.com"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-white font-medium text-sm mb-2">
                Nome de usuário
              </label>
              <input
                type="text"
                required
                minLength={3}
                maxLength={50}
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)] transition-all"
                placeholder="seu_usuario"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-medium text-sm mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)] transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white font-medium text-sm mb-2">
                Confirmar senha
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)] transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[rgba(139,92,246,0.8)] backdrop-blur-lg hover:bg-[rgba(139,92,246,1)] text-white px-4 py-3 rounded-xl font-semibold border border-white/20 shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-2"
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-white/80 text-sm mt-6">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-white font-semibold hover:underline transition-all"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
