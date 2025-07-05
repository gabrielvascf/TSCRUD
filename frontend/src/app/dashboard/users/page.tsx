"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

interface User {
  username: string;
  nome: string;
  tipo: string;
  status: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const [newUsername, setNewUsername] = useState("");
  const [newNome, setNewNome] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newTipo, setNewTipo] = useState("1");

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error: any) {
      console.error("Acesso negado ou erro ao buscar usuários:", error);

      if (error.response?.status === 403) {
        alert("Acesso negado. Esta página é apenas para administradores.");
        router.push("/dashboard");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (username: string, newStatus: string) => {
    try {
      await api.put(`/users/${username}/status`, { status: newStatus });
      fetchUsers();
    } catch (error) {
      alert("Erro ao atualizar status do usuário.");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword || !newNome) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    try {
      await api.post("/users", {
        username: newUsername,
        password: newPassword,
        nome: newNome,
        tipo: newTipo,
      });
      alert("Usuário criado com sucesso!");

      setNewUsername("");
      setNewPassword("");
      setNewNome("");
      setNewTipo("1");
      fetchUsers();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao criar usuário.";
      alert(`Falha: ${message}`);
    }
  };

  const inputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonClasses =
    "bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="space-y-8">
      {/* Formulário de Criação */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Criar Novo Usuário</h2>
        <form
          onSubmit={handleCreateUser}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className={labelClasses}>Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Nome Completo</label>
            <input
              type="text"
              value={newNome}
              onChange={(e) => setNewNome(e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Tipo de Usuário</label>
            <select
              value={newTipo}
              onChange={(e) => setNewTipo(e.target.value)}
              className={inputClasses}
            >
              <option value="1">Usuário Comum</option>
              <option value="0">Administrador</option>
            </select>
          </div>
          <div className="lg:col-span-4 text-right">
            <button type="submit" className={buttonClasses}>
              Criar Usuário
            </button>
          </div>
        </form>
      </div>

      {/* Tabela de Usuários */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Lista de Usuários</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-600 border-b">
                  Username
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 border-b">
                  Nome
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 border-b">
                  Tipo
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 border-b">
                  Status
                </th>
                <th className="py-3 px-4 font-semibold text-gray-600 border-b">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.username} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{user.username}</td>
                  <td className="py-3 px-4 border-b">{user.nome}</td>
                  <td className="py-3 px-4 border-b">
                    {user.tipo === "0" ? "Admin" : "Comum"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "A"
                          ? "bg-green-100 text-green-800"
                          : user.status === "B"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status === "A"
                        ? "Ativo"
                        : user.status === "B"
                          ? "Bloqueado"
                          : "Inativo"}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b space-x-2">
                    {user.status === "B" && (
                      <button
                        onClick={() => handleUpdateStatus(user.username, "A")}
                        className="font-medium text-green-600 hover:text-green-800"
                      >
                        Desbloquear
                      </button>
                    )}
                    {user.status === "I" && (
                      <button
                        onClick={() => handleUpdateStatus(user.username, "A")}
                        className="font-medium text-green-600 hover:text-green-800"
                      >
                        Reativar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
