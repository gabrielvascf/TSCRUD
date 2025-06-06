import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

process.on("beforeExit", async () => {
  console.log("Closing Prisma Client...");
  await prisma.$disconnect();
  console.log("Prisma Client closed.");
});
