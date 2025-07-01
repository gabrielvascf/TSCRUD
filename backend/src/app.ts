import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

process.on("beforeExit", async () => {
  console.log("Closing Prisma Client...");
  await prisma.$disconnect();
  console.log("Prisma Client closed.");
});
