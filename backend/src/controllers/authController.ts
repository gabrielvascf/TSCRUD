import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
let failedLoginAttempts = new Map<string, number>();

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: { username: username },
    });

    if (!user || user.status === "I" || user.status === "B") {
      return res
        .status(401)
        .json({ message: "Usuário não autorizado, inativo ou bloqueado." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password.trim(),
    );
    if (!isPasswordValid) {
      const attempts = (failedLoginAttempts.get(username) || 0) + 1;
      failedLoginAttempts.set(username, attempts);

      if (attempts >= 3) {
        await prisma.usuario.update({
          where: { username: username },
          data: { status: "B" },
        });
        failedLoginAttempts.delete(username);
        return res
          .status(403)
          .json({ message: "Usuário bloqueado por excesso de tentativas." });
      }
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    failedLoginAttempts.delete(username);

    const updatedUser = await prisma.usuario.update({
      where: { username: username },
      data: { quantAcesso: { increment: 1 } },
    });

    const token = jwt.sign(
      { username: updatedUser.username, tipo: updatedUser.tipo },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, nome } = req.body;

    if (!username || !password || !nome) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios: Username, Password, Nome.",
      });
    }

    const existingUser = await prisma.usuario.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Este nome de usuário já está em uso." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.usuario.create({
      data: {
        username,
        password: hashedPassword,
        nome,
        tipo: "1",
        status: "A",
      },
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: { Username: newUser.username, Nome: newUser.nome },
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: { username: username },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(401).json({ message: "Senha antiga inválida." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.usuario.update({
      where: { username: username },
      data: { password: hashedNewPassword },
    });

    res.json({ message: "Senha alterada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
};

export const recoverPassword = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: { username: username },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const newPassword = Math.random().toString(36).slice(-8); // geração maluca de senha aleatória
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.usuario.update({
      where: { username: username },
      data: { password: hashedNewPassword },
    });

    // aqui seria o envio do email com a nova senha
    res.json({ message: "Senha recuperada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
};
