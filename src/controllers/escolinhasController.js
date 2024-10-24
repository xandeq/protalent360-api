const db = require("../config/db"); // Importa conexão com banco

// Função para criar escolinha
exports.cadastrarEscolinha = async (req, res) => {
  try {
    const {
      nome,
      cidade,
      estado,
      pais,
      categorias,
      redes_sociais,
      descricao,
      infraestrutura,
      emblemas_ranking,
    } = req.body;

    // Query de inserção
    const query = `
            INSERT INTO escolinhas (nome, cidade, estado, pais, categorias, redes_sociais, descricao, infraestrutura, emblemas_ranking)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await db.execute(query, [
      nome,
      cidade,
      estado,
      pais,
      categorias,
      redes_sociais,
      descricao,
      infraestrutura,
      emblemas_ranking,
    ]);

    res.status(201).json({ message: "Escolinha cadastrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar escolinha:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
