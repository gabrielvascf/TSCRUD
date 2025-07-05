import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardData = async (req: Request, res: Response) => {
  const { username } = req.user;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { username },
      select: {
        nome: true,
        quantAcesso: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const totalTasks = await prisma.tarefa.count({
      where: { username: username },
    });

    const highPriorityTasks = await prisma.tarefa.count({
      where: {
        username: username,
        prioridade: { in: ["Alta", "Urgente"] },
      },
    });

    const upcomingTasks = await prisma.tarefa.findMany({
      where: {
        username: username,
        dataConclusao: {
          gte: new Date(),
        },
      },
      orderBy: {
        dataConclusao: "asc",
      },
      take: 5,
    });

    res.json({
      nomeUsuario: usuario.nome,
      quantAcesso: usuario.quantAcesso,
      stats: {
        total: totalTasks,
        altaPrioridade: highPriorityTasks,
      },
      proximasTarefas: upcomingTasks,
    });
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};
