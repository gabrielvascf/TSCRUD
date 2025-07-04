import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

const corsOptions = {
  origin: "http://localhost:3001",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

process.on("beforeExit", async () => {
  console.log("Closing Prisma Client...");
  await prisma.$disconnect();
  console.log("Prisma Client closed.");
});
