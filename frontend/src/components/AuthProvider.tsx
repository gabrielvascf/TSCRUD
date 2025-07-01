"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "@/services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, nome: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else if (pathname !== "/login") {
      router.push("/login");
    }
    setLoading(false);
  }, [pathname, router]);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (error) {
      console.error("Falha no login:", error);
      alert("Usuário ou senha inválidos!");
    }
  };

  const register = async (username: string, password: string, nome: string) => {
    try {
      await api.post("/auth/register", {
        username: username,
        password: password,
        nome: nome,
      });
      alert("Cadastro realizado com sucesso! Por favor, faça o login.");
      // Opcional: redirecionar para o login ou fazer login automático
      router.push("/login");
    } catch (error) {
      console.error("Falha no cadastro:", error);
      // @ts-ignore
      const message = error.response?.data?.message || "Erro desconhecido ao cadastrar.";
      alert(`Falha no cadastro: ${message}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/login");
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  console.log("AuthContext:", context);
  return context;
};
