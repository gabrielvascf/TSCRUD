"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redireciona para o dashboard se o usuário já estiver autenticado.
    // O AuthProvider cuidará de redirecionar para /login se não estiver.
    if (isAuthenticated) {
      router.push("/dashboard");
    }
    // Se não estiver autenticado, o provider
    // manda pro /login automaticamente.
  }, [isAuthenticated, router]);

  return (
    <div>
      <h1>Carregando...</h1>
      <p>Redirecionando para a página principal.</p>
    </div>
  );
}
