import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTarefas = async (req: Request, res: Response) => {
  const { username } = req.user;

  try {
    const tarefas = await prisma.tarefa.findMany({
      where: { username: username },
      orderBy: { dataCriacao: "desc" },
    });
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas." });
  }
};

export const createTarefa = async (req: Request, res: Response) => {
  const { username } = req.user;
  const { titulo, descricao, dataEntrega, prioridade } = req.body;

  console.log("Dados recebidos:", {
    username,
    titulo,
    descricao,
    dataEntrega,
    prioridade,
  });
  if (!titulo) {
    return res
      .status(400)
      .json({ message: "O título da tarefa é obrigatório." });
  }

  try {
    const novaTarefa = await prisma.tarefa.create({
      data: {
        titulo: titulo,
        descricao: descricao,
        dataConclusao: dataEntrega ? new Date(dataEntrega) : null,
        prioridade: prioridade || "N",
        usuario: {
          connect: { username: username },
        },
      },
    });
    res.status(201).json(novaTarefa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar tarefa." });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { username } = req.user;
  const { id } = req.params;
  const { titulo, descricao, dataEntrega, prioridade } = req.body;

  try {
    const taskId = parseInt(id);

    const task = await prisma.tarefa.findFirst({
      where: {
        id: taskId,
        username: username,
      },
    });

    if (!task) {
      return res.status(404).json({
        message:
          "Tarefa não encontrada ou você não tem permissão para editá-la.",
      });
    }

    const updatedTask = await prisma.tarefa.update({
      where: { id: taskId },
      data: {
        titulo,
        descricao,
        dataConclusao: dataEntrega ? new Date(dataEntrega) : null,
        prioridade,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ message: "Erro ao atualizar tarefa." });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { username } = req.user;
  const { id } = req.params;

  try {
    const taskId = parseInt(id);

    const task = await prisma.tarefa.findFirst({
      where: {
        id: taskId,
        username: username,
      },
    });

    if (!task) {
      return res.status(404).json({
        message:
          "Tarefa não encontrada ou você não tem permissão para excluí-la.",
      });
    }

    await prisma.tarefa.delete({
      where: { id: taskId },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).json({ message: "Erro ao excluir tarefa." });
  }
};
