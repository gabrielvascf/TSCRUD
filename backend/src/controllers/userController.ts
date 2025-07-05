import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const listUsers = async (req: Request, res: Response) => {
  const users = await prisma.usuario.findMany({
    select: { username: true, nome: true, tipo: true, status: true },
  });
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, nome, tipo } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.usuario.create({
    data: { username, password: hashedPassword, nome, tipo, status: "A" },
  });
  res.status(201).json({ username: newUser.username, nome: newUser.nome });
};

export const updateUserStatus = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { status } = req.body;

  if (!["A", "I", "B"].includes(status)) {
    return res.status(400).json({ message: "Status inválido." });
  }

  const updatedUser = await prisma.usuario.update({
    where: { username },
    data: { status },
  });
  res.json({ username: updatedUser.username, status: updatedUser.status });
};
