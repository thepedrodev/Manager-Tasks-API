# Manager-Tasks-API
# Manager Tasks API

API REST para gerenciamento de tarefas, desenvolvida com Node.js, TypeScript e PostgreSQL.


## Funcionalidades do Sistema

### 🔐 Autenticação e Controle de Acesso

O sistema utiliza autenticação baseada em **JSON Web Token (JWT)** para garantir segurança e integridade nas sessões de usuário. Após o login, o usuário recebe um token que deve ser utilizado para acessar rotas protegidas da API.

O controle de acesso é baseado em **níveis de permissão**, definidos conforme o perfil do usuário:

- **Administrador**: acesso completo ao sistema, incluindo gestão de usuários, tarefas e equipes.
- **Membro**: acesso restrito às tarefas atribuídas à sua equipe e edição apenas das tarefas que lhe foram designadas.

---

A plataforma permite o gerenciamento completo de tarefas, com suporte a operações **CRUD** (Create, Read, Update, Delete).

## Como rodar localmente

### Pré-requisitos

- Node.js v18+
- Docker e Docker Compose
- Yarn ou npm
- PostgreSQL (caso não use Docker)

### 📦 Instalação

# Clone o repositório
```
git clone https://github.com/thepedrodev/Manager-Tasks-API.git

cd Manager-Tasks-API
```
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
Executar o projeto

```
npm run dev
```
# ou
``` yarn dev ```
