import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "oiaudsbaw9t8732ITUKJLSDNPOW3JMW;TGSzfç98seh5n,msgv";

export const AuthenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }

};
