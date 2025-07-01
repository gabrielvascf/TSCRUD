"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";

interface User {
  Username: string;
  Nome: string;
  Tipo: string;
  Status: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.Username}>
              <td>{user.Username}</td>
              <td>{user.Nome}</td>
              <td>{user.Tipo === "0" ? "Admin" : "Comum"}</td>
              <td>{user.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
