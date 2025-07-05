"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

interface Task {
  id: number;
  titulo: string;
  dataConclusao: string | null;
}

interface DashboardData {
  nomeUsuario: string;
  quantAcesso: number;
  stats: {
    total: number;
    altaPrioridade: number;
  };
  proximasTarefas: Task[];
}

const StatCard = ({
  title,
  value,
  colorClass,
}: {
  title: string;
  value: string | number;
  colorClass: string;
}) => (
  <div className={`p-6 rounded-lg shadow-md ${colorClass}`}>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="text-3xl font-bold text-white mt-2">{value}</p>
  </div>
);

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/dashboard");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao carregar o dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-10">Carregando dados do dashboard...</div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-10 text-red-500">
        Não foi possível carregar os dados.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Olá, {data.nomeUsuario}!
        </h1>
        <p className="text-gray-600">
          Este é seu acesso de número {data.quantAcesso}. Aqui está um resumo da
          sua atividade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total de Tarefas"
          value={data.stats.total}
          colorClass="bg-blue-500"
        />
        <StatCard
          title="Prioridade Alta/Urgente"
          value={data.stats.altaPrioridade}
          colorClass="bg-yellow-500"
        />
        <Link
          href="/dashboard/tasks"
          className="flex items-center justify-center p-6 rounded-lg shadow-md bg-green-500 hover:bg-green-600 transition-colors"
        >
          <h3 className="text-lg font-semibold text-white text-center">
            + Adicionar Nova Tarefa
          </h3>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Próximas Tarefas</h2>
        {data.proximasTarefas.length > 0 ? (
          <ul className="space-y-3">
            {data.proximasTarefas.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-3 rounded-md bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-medium text-gray-700">{task.titulo}</span>
                <span className="text-sm text-gray-500">
                  {task.dataConclusao
                    ? `Entrega em: ${new Date(task.dataConclusao).toLocaleDateString()}`
                    : "Sem data"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            Você não tem tarefas com data de entrega futura.
          </p>
        )}
      </div>
    </div>
  );
}
