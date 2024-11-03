// app.js - Arquivo principal da API Node.js

// Carrega as variáveis de ambiente do arquivo .env
import dotenv from "dotenv";
dotenv.config();

// Importar as dependências necessárias
import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import errorHandler from "./src/middleware/errorHandler";

// Importar as rotas
import athleteRoutes from "./src/routes/athleteRoutes";
import authRoutes from "./src/routes/authRoutes";
import midiasRoutes from "./src/routes/midiasRoutes";
import escolinhasRoutes from './src/routes/escolinhasRoutes';
import clubRoutes from './src/routes/clubRoutes';

// Inicializar o Express
const app = express();

// Middleware
app.use(cors()); // Permitir requisições de qualquer domínio
app.use(json()); // Parsear requisições do tipo JSON
app.use(urlencoded({ extended: true })); // Parsear requisições do tipo URL-encoded

// Adicionando o Morgan para logar as requisições HTTP (antes das rotas)
app.use(morgan("combined")); // 'combined' é um formato padrão de log detalhado

// Definir as rotas da API
app.use("/api/athletes", athleteRoutes); // Rotas para atletas
app.use("/api/auth", authRoutes); // Rotas de autenticação
app.use("/api/midias", midiasRoutes);
app.use('/api/escolinhas', escolinhasRoutes);
app.use('/api/clubs', clubRoutes);

// Middleware de tratamento de erros (depois de todas as rotas)
app.use(errorHandler);

// **Não precisa mais de conexão manual aqui**
// O pool de conexões será utilizado diretamente nos controladores

// Definir a porta onde o servidor será iniciado
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
