<h1 align="center">Transfer Bank</h1>

<div align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  &nbsp;
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
   <br/>
  <img src="https://img.shields.io/badge/TypeORM-CC2927?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM" />
  &nbsp;
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI" />
  &nbsp;
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  &nbsp;
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

## 📌 Resumo do Projeto

<br/>
O projeto consiste em uma aplicação web que simula uma conta de Banco Digital, onde é possível realizar operações financeiras básicas de forma prática e intuitiva. O objetivo é proporcionar uma experiência semelhante à de uma carteira digital real, com foco em usabilidade, organização e boas práticas de desenvolvimento.
<br><br>

## ⭐ Features

- Cadastro de Usuário
- Módulo de controle de Carteira (Depósito, Saque e Transferência)
- Authenticação JWT
- Dockerizado
- Responsibidade
- Documentação com SWAGGER [WIP]
- Dashboards e Charts integrado com CoinGecko API [WIP]

<br>

## 🧭 Estrutura do Projeto

<br/>

├── backend # Aplicação backend (NestJS + TypeORM)

├── frontend # Aplicação frontend (React + MUI)

└── docker-compose.yml
<br><br>

## 🚀 Executando o Projeto com Docker

<br/>
> Pré-requisitos: Docker instalado. Em sistemas Windows, recomenda-se uso do [WSL2](https://github.com/codeedu/wsl2-docker-quickstart).

### 1. Clone o repositório

```bash
git clone https://github.com/JosivalJr/transfer-bank.git
cd transfer-bank
```

### 2. Crie os arquivos .env

```bash
# Crie os arquivos .env nas pastas backend e frontend com base nos respectivos .env.example.

cd frontend
cp .env.example .env

cd ..

cd backend
cp .env.example .env
```

### 3. Suba os serviços com Docker Compose

```bash
docker-compose up -d --build
```

### 4. Acesse o container da API

```bash
docker exec -it transfer-bank-api bash
```

### 5. Rode as migrations e seeds dentro do container

```bash
# Executar as migrations pendentes
npm run migration:run

# Executar as seeds
npm run seed:run

```

<br><br>

## 🚀 Executando o Projeto em modo de Desenvolvimento

### 1. Clone o repositório

```bash
git clone https://github.com/JosivalJr/transfer-bank.git
cd transfer-bank
```

### 2. Crie os arquivos .env

```bash
# Crie os arquivos .env nas pastas backend e frontend com base nos respectivos .env.example.

cd frontend
cp .env.example .env

cd ..

cd backend
cp .env.example .env
```

### 3. Iniciando o backend

```bash
# Acesse o diretório da aplicação backend
cd backend

# Instale as dependências e inicie em modo de Desenvolvimento
npm install
npm run start:dev
```

### 4. Rodando as migrations e seeds

```bash
# Executar migrações pendentes
npm run migration:run

# Executar seeds
npm run seed:run
```

### 5. Iniciando o frontend

```bash
# Acesse o diretório da aplicação frontend
cd frontend

# Instale as dependências e inicie em modo de Desenvolvimento
npm install
npm run dev
```

<br><br>

## 🧪 Configurações Recomendadas:

⚙️ Configuração recomendada para VSCode

```json
{
  "editor.formatOnSave": true,
  "prettier.requireConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
