// db.js - Configuração do Banco de Dados MySQL usando Pool de Conexões
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Criar o pool de conexões com o MySQL usando as variáveis do .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise();

// Exportar o pool como padrão
export default pool;
