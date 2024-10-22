const pool = require("../config/db"); // Pool de conexões MySQL

// Função para criar uma nova mídia
const createMidia = async (atletaId, tipo, url) => {
  const sql = `INSERT INTO midias (atletaId, tipo, url) VALUES (?, ?, ?)`;
  const values = [atletaId, tipo, url];

  try {
    const [result] = await pool.execute(sql, values);
    return result.insertId; // Retorna o ID da nova mídia criada
  } catch (error) {
    console.error("Erro ao criar mídia:", error);
    throw error;
  }
};

// Função para obter uma mídia por ID
const getMidiaById = async (midiaId) => {
  const sql = `SELECT * FROM midias WHERE id = ?`;

  try {
    const [rows] = await pool.execute(sql, [midiaId]);
    return rows[0]; // Retorna a primeira linha encontrada
  } catch (error) {
    console.error("Erro ao buscar mídia:", error);
    throw error;
  }
};

// Outras operações como atualização ou exclusão podem ser adicionadas aqui

module.exports = {
  createMidia,
  getMidiaById,
};
