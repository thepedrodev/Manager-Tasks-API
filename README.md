# Manager-Tasks-API
# Manager Tasks API

API REST para gerenciamento de tarefas, desenvolvida com Node.js, TypeScript e PostgreSQL.

---

## 🚀 Tecnologias e Recursos

### 🧠 Backend (Node.js)

- **Framework**: [Express.js](https://expressjs.com/)
- **Banco de dados**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)

### 🧪 Testes

- **Framework de testes**: [Jest](https://jestjs.io/)

### ☁️ Deploy

- Backend hospedado na plataforma [Render](https://render.com/)

### ⚙️ Outros

- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) para validação de dados
- [JWT](https://jwt.io/) para autenticação

---

## 📘 Funcionalidades do Sistema

### 🔐 Autenticação e Controle de Acesso

O sistema utiliza autenticação baseada em **JSON Web Token (JWT)** para garantir segurança e integridade nas sessões de usuário. Após o login, o usuário recebe um token que deve ser utilizado para acessar rotas protegidas da API.

O controle de acesso é baseado em **níveis de permissão**, definidos conforme o perfil do usuário:

- **Administrador**: acesso completo ao sistema, incluindo gestão de usuários, tarefas e equipes.
- **Membro**: acesso restrito às tarefas atribuídas à sua equipe e edição apenas das tarefas que lhe foram designadas.

---

### 👥 Gestão de Equipes

Usuários com perfil **Administrador** podem:

- Criar, editar e remover equipes.
- Adicionar ou remover usuários das equipes.
- Visualizar todas as equipes e seus membros.

---

### ✅ Gestão de Tarefas

A plataforma permite o gerenciamento completo de tarefas, com suporte a operações **CRUD** (Create, Read, Update, Delete).

**Ações disponíveis:**

- **Criar**: registrar uma nova tarefa com título, descrição, status, prioridade e responsável.
- **Visualizar**: listar tarefas de acordo com o perfil e o time.
- **Editar**:
  - Administradores podem editar qualquer tarefa.
  - Membros podem editar apenas tarefas atribuídas a si.
- **Excluir**:
  - Apenas administradores têm permissão para excluir tarefas.

**Atributos da tarefa:**

- **Status**: `pendente`, `em andamento`, `concluída`
- **Prioridade**: `alta`, `média`, `baixa`
- **Responsável**: vínculo com o usuário executor

---

### 👤 Perfis de Usuário

#### 🛠️ Administrador

- Visualiza e gerencia todas as tarefas do sistema.
- Controla usuários e suas permissões.
- Gerencia todas as equipes e membros.
- Tem controle total sobre a plataforma.

#### 👤 Membro

- Visualiza tarefas vinculadas ao seu time.
- Pode criar novas tarefas para si.
- Pode editar apenas as próprias tarefas.
- Sem acesso à gestão de usuários ou equipes.

---
## 🛠️ Como rodar localmente

### 🔁 Pré-requisitos

- Node.js v18+
- Docker e Docker Compose
- Yarn ou npm
- PostgreSQL (caso não use Docker)

### 📦 Instalação


# Clone o repositório
```
git clone https://github.com/thepedrodev/Manager-Tasks-API.git
```
cd Manager-Tasks-API

# Instale as dependências
```
npm install
```
# ou
```
yarn install
```
🐳 Usando Docker

# Suba os containers
```
docker-compose up -d
```
# Crie o banco de dados e as tabelas
```
npx prisma migrate dev
```
📂 Ambiente .env

Crie um arquivo .env com as seguintes variáveis:
```
DATABASE_URL=postgresql://user:password@localhost:5432/manager_tasks
JWT_SECRET=sua_chave_secreta
```
▶️ Executar o projeto

# Desenvolvimento com hot reload

```
npm run dev
```
# ou
``` yarn dev ```

📮 Rotas Principais

Todas as rotas protegidas exigem o envio do token JWT no header Authorization: Bearer <token>
```
Método	Rota	Ação	Permissão
POST	/sessions	Login	Público
POST	/users	Cadastro de usuário	Admin
GET	/tasks	Listagem de tarefas	Admin/Member
POST	/tasks	Criação de tarefa	Admin/Member
PUT	/tasks/:id	Atualização da tarefa	Admin / Dono
DELETE	/tasks/:id	Exclusão da tarefa	Apenas Admin
GET	/teams/:id/members	Listar membros do time	Admin/Member
