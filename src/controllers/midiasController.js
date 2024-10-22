const pool = require("../config/db"); // Importa o pool de conexões do MySQL

// Função para fazer o upload da mídia
exports.uploadMidia = async (req, res) => {
  try {
    const { atletaId, tipo } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    const url = req.file.location; // URL do arquivo no S3

    // Consultar o banco de dados para inserir a mídia
    const sql = `INSERT INTO midias (atletaId, tipo, url) VALUES (?, ?, ?)`;
    const values = [atletaId, tipo, url];

    // Executar a consulta
    const [result] = await pool.execute(sql, values);

    // Retornar o resultado
    res.status(201).json({
      message: "Mídia enviada com sucesso.",
      midiaId: result.insertId,
      atletaId,
      tipo,
      url,
    });
  } catch (error) {
    console.error("Erro ao enviar mídia: ", error);
    res.status(500).json({ message: "Erro no servidor ao enviar a mídia." });
  }
};
