import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando o processo de seeding...`);

  const adminUsername = "admin";
  const adminPassword = "admin";

  const existingAdmin = await prisma.usuario.findUnique({
    where: { username: adminUsername },
  });

  if (existingAdmin) {
    console.log("Usuário admin já existe. Nenhuma ação necessária.");
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.usuario.create({
      data: {
        username: adminUsername,
        password: hashedPassword,
        nome: "Administrador do Sistema",
        tipo: "0",
        status: "A",
      },
    });
    console.log(`Usuário "${adminUsername}" criado com sucesso.`);
  }

  console.log(`Seeding finalizado.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
