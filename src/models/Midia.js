const connection = require("../config/db"); // Pool de conexões MySQL

// Função para criar uma nova mídia
// Função para criar um registro de mídia no banco de dados
const createMidia = async (atletaId, tipo, url) => {
  const [result] = await connection.query(
    "INSERT INTO midias (atletaId, tipo, url) VALUES (?, ?, ?)",
    [atletaId, tipo, url]
  );
  return result.insertId;
};

module.exports = {
  createMidia,
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
