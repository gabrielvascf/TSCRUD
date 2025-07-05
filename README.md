# CRUD com Autenticação e Gerenciamento de Tarefas

Este é um projeto full-stack desenvolvido como atividade prática para a disciplina de Programação Web, demonstrando a criação de uma aplicação web robusta com TypeScript. A aplicação inclui um backend em Node.js com Express e um frontend em Next.js, com foco em autenticação de usuários, gerenciamento de senhas e operações CRUD para tarefas.

## Funcionalidades Principais

- **Autenticação Segura:**
  - Login de usuários com verificação de credenciais.
  - Criptografia de senhas utilizando `bcrypt`.
  - Controle de acesso baseado em token (JWT) para rotas protegidas.
  - Sistema de bloqueio de usuário após 3 tentativas de login malsucedidas.
- **Dois Níveis de Acesso:**
  - **Usuário Comum:** Pode gerenciar suas próprias tarefas (criar, listar, editar e excluir).
  - **Administrador:** Possui todas as permissões de um usuário comum, e adicionalmente pode acessar uma página exclusiva para gerenciar todos os usuários do sistema (listar, criar, desbloquear, reativar).
- **Gerenciamento de Tarefas (CRUD):**
  - Criação de tarefas com título, descrição, data de entrega e prioridade.
  - Listagem de todas as tarefas do usuário logado.
  - Edição e exclusão de tarefas existentes.
- **Dashboard Informativo:**
  - Painel de controle para o usuário logado com um resumo de suas atividades, incluindo total de tarefas, tarefas de alta prioridade e um contador de acessos ao sistema.

## Tecnologias Utilizadas

#### Backend

- **Node.js**
- **TypeScript**
- **Express**: Framework para a criação da API REST.
- **PostgreSQL**: Banco de dados relacional.
- **Prisma**: ORM para interação com o banco de dados e seeding.
- **JSON Web Token (JWT)**: Para autenticação e controle de sessão.
- **bcrypt**: Para criptografia de senhas.
- **CORS**: Para permitir a comunicação entre o frontend e o backend.

#### Frontend

- **Next.js**: Framework React para renderização no servidor e construção da interface.
- **React**
- **TypeScript**
- **Tailwind CSS**: Para estilização rápida e responsiva.
- **axios**: Cliente HTTP para comunicação com a API do backend.

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [pnpm](https://pnpm.io/installation) (ou `npm`/`yarn`, mas `pnpm` é o recomendado pelo projeto)
- [PostgreSQL](https://www.postgresql.org/download/)

## Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1\. Clonar o Repositório

```bash
git clone https://github.com/gabrielvascf/TSCRUD.git
cd TSCRUD
```

### 2\. Configuração do Backend

1.  **Navegue até a pasta do backend:**

    ```bash
    cd backend
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz da pasta `backend` e preencha com suas credenciais do PostgreSQL. Você pode usar o arquivo `.env.example` como base.

    ```env
    # URL de conexão do PostgreSQL
    # Formato: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    DATABASE_URL="postgresql://docker:docker@localhost:5432/tscrud"

    # Segredo para assinar os tokens JWT
    JWT_SECRET="seu_segredo_super_secreto_aqui"

    # Porta da aplicação backend
    PORT=3000
    ```

4.  **Configure o Banco de Dados e Crie o Usuário Admin:**
    Acesse seu cliente PostgreSQL e crie o banco de dados especificado na `DATABASE_URL` (neste exemplo, `tscrud`). Em seguida, rode o comando de migração do Prisma. Este comando irá **criar as tabelas** e, em seguida, **executar o script de seeding para criar o usuário administrador padrão** (`admin` / `admin`).

    ```bash
    pnpm prisma migrate dev
    ```

5.  **Inicie o servidor backend:**

    ```bash
    pnpm run dev
    ```

    O servidor estará rodando em `http://localhost:3000`.

### 3\. Configuração do Frontend

1.  **Abra um novo terminal** e navegue até a pasta do frontend:

    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz da pasta `frontend` para apontar para a API do backend.

    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
    ```

4.  **Inicie o servidor frontend:**

    ```bash
    pnpm run dev
    ```

    A aplicação estará acessível em `http://localhost:3001`.

## Acesso à Aplicação

- **Página de Login:** `http://localhost:3001/login`
- **Credenciais de Administrador:**
  - **Usuário:** `admin`
  - **Senha:** `admin`

Com o usuário administrador, você pode acessar a página `/dashboard/users` para gerenciar outros usuários.
