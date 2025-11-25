"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login: setAuthUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData);
      setAuthUser(response.user);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Implementar login com Google
    console.log("Google login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#7e22ce] flex items-center justify-center px-4 relative overflow-hidden">
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[rgba(30,60,114,0.5)] backdrop-blur-[20px] rounded-[25px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Seja bem vindo
            </h2>
            <p className="text-white/80 text-sm">
              Entre com a sua conta do Google
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-xl">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white font-medium text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)] transition-all"
                placeholder="seu@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-white font-medium text-sm">
                  Senha
                </label>
                <a
                  href="#"
                  className="text-white/90 hover:text-white text-xs transition-colors"
                >
                  Esqueceu sua senha?
                </a>
              </div>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)] transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[rgba(139,92,246,0.8)] backdrop-blur-lg hover:bg-[rgba(139,92,246,1)] text-white px-4 py-3 rounded-xl font-semibold border border-white/20 shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-white/80 text-sm mt-6">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="text-white font-semibold hover:underline transition-all"
            >
              Criar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
