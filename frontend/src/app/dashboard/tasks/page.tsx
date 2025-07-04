"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Task {
  id: number;
  titulo: string;
  descricao: string | null;
  dataCriacao: string;
  dataEntrega: string | null;
  prioridade: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [prioridade, setPrioridade] = useState("Normal");
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      alert("Não foi possível carregar as tarefas.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await handleUpdateTask();
    } else {
      await handleCreateTask();
    }
  };
  const handleCreateTask = async () => {
    try {
      await api.post("/tasks", { titulo, descricao, dataEntrega, prioridade });
      resetForm();
      await fetchTasks();
    } catch (error) {
      alert("Erro ao criar a tarefa.");
    }
  };
  const handleUpdateTask = async () => {
    if (!isEditing) return;
    try {
      await api.put(`/tasks/${isEditing}`, {
        titulo,
        descricao,
        dataEntrega,
        prioridade,
      });
      resetForm();
      await fetchTasks();
    } catch (error) {
      alert("Erro ao atualizar a tarefa.");
    }
  };
  const handleDeleteTask = async (taskId: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        await fetchTasks();
      } catch (error) {
        alert("Erro ao excluir a tarefa.");
      }
    }
  };

  const handleEditClick = (task: Task) => {
    setIsEditing(task.id);
    setTitulo(task.titulo);
    setDescricao(task.descricao || "");
    setDataEntrega(
      task.dataEntrega
        ? new Date(task.dataEntrega).toISOString().split("T")[0]
        : "",
    );
    setPrioridade(task.prioridade);
  };

  const resetForm = () => {
    setTitulo("");
    setDescricao("");
    setDataEntrega("");
    setPrioridade("Normal");
    setIsEditing(null);
  };
  const inputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonClasses =
    "bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Minhas Tarefas</h2>
      <form
        onSubmit={handleFormSubmit}
        className="mb-8 p-4 border rounded-lg bg-gray-50 grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            placeholder="Título da tarefa"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className={inputClasses}
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            placeholder="Descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={inputClasses}
            rows={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data de Entrega
          </label>
          <input
            type="date"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prioridade
          </label>
          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            className={inputClasses}
          >
            <option>Baixa</option> <option>Normal</option> <option>Alta</option>{" "}
            <option>Urgente</option>
          </select>
        </div>
        <div className="md:col-span-5 text-right">
          <button type="submit" className={buttonClasses}>
            Adicionar Tarefa
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {task.titulo}
                </h3>
                <p className="text-gray-600">{task.descricao}</p>
                <div className="text-sm text-gray-500 mt-2">
                  <span>
                    Criada em: {new Date(task.dataCriacao).toLocaleDateString()}
                  </span>
                  {task.dataEntrega && (
                    <span className="ml-4">
                      Entrega: {new Date(task.dataEntrega).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  task.prioridade === "Urgente"
                    ? "bg-red-200 text-red-800"
                    : task.prioridade === "Alta"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-blue-200 text-blue-800"
                }`}
              >
                {task.prioridade}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(task)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Você ainda não tem tarefas cadastradas.
          </p>
        )}
      </div>
    </div>
  );
}
