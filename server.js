// app.js - Arquivo principal da API Node.js

// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Importar as dependências necessárias
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorHandler = require("./src/middleware/errorHandler");

// Importar as rotas
const athleteRoutes = require("./src/routes/athleteRoutes");
const authRoutes = require("./src/routes/authRoutes");

// Inicializar o Express
const app = express();

// Middleware
app.use(cors()); // Permitir requisições de qualquer domínio
app.use(bodyParser.json()); // Parsear requisições do tipo JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parsear requisições do tipo URL-encoded

// Adicionando o Morgan para logar as requisições HTTP (antes das rotas)
app.use(morgan("combined")); // 'combined' é um formato padrão de log detalhado

// Definir as rotas da API
app.use("/api/athletes", athleteRoutes); // Rotas para atletas
app.use("/api/auth", authRoutes); // Rotas de autenticação

// Middleware de tratamento de erros (depois de todas as rotas)
app.use(errorHandler);

// Conectar ao banco de dados
const connection = require("./src/config/db");
connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1); // Sai da aplicação se a conexão falhar
  }
  console.log("Conectado ao banco de dados MySQL");
});

// Definir a porta onde o servidor será iniciado
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
