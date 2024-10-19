// db.js - Configuração do Banco de Dados MySQL usando Pool de Conexões
const mysql = require("mysql2");
require("dotenv").config();

// Criar o pool de conexões com o MySQL usando as variáveis do .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Aguarda por novas conexões caso o limite seja atingido
  connectionLimit: 10, // Limite máximo de conexões no pool
  queueLimit: 0, // Sem limite para a fila de requisições
});

// Exportar o pool com suporte a Promises para consultas mais fáceis
module.exports = pool.promise();
