/*
  Warnings:

  - The primary key for the `Usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `username` on the `Usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.

*/
-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_username_fkey";

-- AlterTable
ALTER TABLE "Usuarios" DROP CONSTRAINT "Usuarios_pkey",
ALTER COLUMN "username" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "nome" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "tipo" SET DATA TYPE VARCHAR(1),
ALTER COLUMN "status" SET DATA TYPE VARCHAR(1),
ADD CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("username");

-- AlterTable
ALTER TABLE "tarefas" ALTER COLUMN "titulo" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(128);

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_username_fkey" FOREIGN KEY ("username") REFERENCES "Usuarios"("username") ON DELETE SET NULL ON UPDATE CASCADE;
