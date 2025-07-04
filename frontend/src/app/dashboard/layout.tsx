"use client";

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  // A lógica de proteção de rota já está no AuthProvider, então podemos simplificar aqui.

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold text-gray-800">Meu App</h1>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-500"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/tasks"
              className="text-gray-600 hover:text-blue-500"
            >
              Tarefas
            </Link>
            <Link
              href="/dashboard/users"
              className="text-gray-600 hover:text-blue-500"
            >
              Usuários
            </Link>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
          >
            Sair
          </button>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
