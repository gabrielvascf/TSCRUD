-- CreateTable
CREATE TABLE "Usuarios" (
    "username" TEXT NOT NULL,
    "password" CHAR(128) NOT NULL,
    "nome" CHAR(128) NOT NULL,
    "tipo" CHAR(1) NOT NULL,
    "status" CHAR(1) NOT NULL,
    "Quant_Acesso" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("username")
);
