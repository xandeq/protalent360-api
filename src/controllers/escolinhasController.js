import pool from "../config/db.js";

// Função para criar escolinha
export async function cadastrarEscolinha(req, res) {
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

    // Executa a query de inserção usando await
    await pool.query(query, [
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
}

// Função para listar escolinhas
export async function listarEscolinhas(req, res) {
  try {
    const query = "SELECT * FROM escolinhas";
    const [results] = await pool.query(query); // Executa a query de listagem
    res.status(200).json(results);
  } catch (error) {
    console.error("Erro ao listar escolinhas:", error);
    res.status(500).json({ message: "Erro ao listar escolinhas", error });
  }
}
