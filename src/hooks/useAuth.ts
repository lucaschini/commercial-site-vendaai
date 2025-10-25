// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, logout as logoutApi, getToken } from "@/lib/api";

interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
}

export function useAuth(requireAuth = false) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        if (requireAuth) {
          router.push("/login");
        }
        return;
      }

      try {
        const userData = await getMe();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setIsAuthenticated(false);
        if (requireAuth) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requireAuth, router]);

  const logout = () => {
    logoutApi();
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  return {
    user,
    loading,
    isAuthenticated,
    logout,
  };
}
