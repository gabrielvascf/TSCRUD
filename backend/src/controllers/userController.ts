import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { username, password, nome, tipo } = req.body;

  if (req.user && req.user.tipo !== "0") {
    return res
      .status(403)
      .json({
        message: "Acesso negado. Apenas administradores podem criar usuários.",
      });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.usuario.create({
      data: {
        username: username,
        password: hashedPassword,
        nome: nome,
        tipo: tipo,
        status: "A",
      },
    });
    res
      .status(201)
      .json({
        message: "Usuário criado com sucesso.",
        user: { username: newUser.username, nome: newUser.nome },
      });
  } catch (error) {
    // @ts-ignore
    if (error.code === "P2002") {
      return res.status(409).json({ message: "nome de usuário já existe." });
    }
    res.status(500).json({ message: "Erro ao criar usuário." });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 10;

  try {
    const users = await prisma.usuario.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        username: true,
        nome: true,
        tipo: true,
        status: true,
      },
      orderBy: {
        nome: "asc",
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar usuários." });
  }
};
