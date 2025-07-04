-- CreateTable
CREATE TABLE "tarefas" (
    "id" SERIAL NOT NULL,
    "titulo" CHAR(128) NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataConclusao" TIMESTAMP(3),
    "prioridade" CHAR(1) NOT NULL,
    "username" CHAR(128),

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_username_fkey" FOREIGN KEY ("username") REFERENCES "Usuarios"("username") ON DELETE SET NULL ON UPDATE CASCADE;
