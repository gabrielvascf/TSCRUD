import { Response, NextFunction } from "express";

export const adminMiddleware = (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const { user } = req;

  if (!user || user.tipo !== "0") {
    console.log("Acesso negado: usuário não é administrador.", user);
    return res
      .status(403)
      .json({ message: "Acesso negado. Rota exclusiva para administradores." });
  }

  next();
};
