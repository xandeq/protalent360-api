const connection = require("../config/db");

exports.createClub = async (req, res, next) => {
  try {
    const {
      nome,
      cidade,
      estado,
      divisao,
      descricao,
      redes_sociais,
      instalacoes,
      agenda_eventos,
      area_interacao,
    } = req.body;

    console.log("Recebendo dados para criar clube:", req.body);

    const checkClubQuery = "SELECT * FROM clubes WHERE nome = ? AND cidade = ?";
    connection.pool.query(checkClubQuery, [nome, cidade], (err, results) => {
      if (err) {
        console.error("Erro ao verificar o clube:", err);
        return next(err);
      }

      if (results.length > 0) {
        console.log("Clube já cadastrado:", nome, cidade);
        return res.status(400).json({
          error:
            "Clube já cadastrado nesta cidade. Tente outro nome ou cidade.",
        });
      }

      const createClubQuery =
        "INSERT INTO clubes (nome, cidade, estado, divisao, descricao, redes_sociais, instalacoes, agenda_eventos, area_interacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

      connection.pool.query(
        createClubQuery,
        [
          nome,
          cidade,
          estado,
          divisao,
          descricao,
          JSON.stringify(redes_sociais),
          instalacoes,
          agenda_eventos,
          area_interacao,
        ],
        (err, result) => {
          if (err) {
            console.error("Erro ao criar clube:", err);
            return next(err);
          }

          const clubeId = result.insertId;
          console.log("Clube cadastrado com sucesso!", clubeId);

          res.status(201).json({
            message: "Clube cadastrado com sucesso!",
            clubeId: clubeId,
          });
        }
      );
    });
  } catch (error) {
    console.error("Erro inesperado:", error);
    next(error);
  }
};

exports.getClubs = async (req, res) => {
  try {
    const [rows] = await connection.pool.query("SELECT * FROM clubes");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao getClubs: ", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState,
      index: error.index,
      sql: error.sql,
    });

    res.status(500).json({
      message: "Erro no servidor ao getClubs.",
      error: {
        message: error.message,
        code: error.code,
        errno: error.errno,
        sqlMessage: error.sqlMessage,
        sqlState: error.sqlState,
      },
    });
  }
};

exports.getClubById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await connection.pool.query(
      "SELECT * FROM clubes WHERE id = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Clube não encontrado" });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao getClubById: ", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState,
      index: error.index,
      sql: error.sql,
    });

    res.status(500).json({
      message: "Erro no servidor ao getClubById.",
      error: {
        message: error.message,
        code: error.code,
        errno: error.errno,
        sqlMessage: error.sqlMessage,
        sqlState: error.sqlState,
      },
    });
  }
};

exports.updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome,
      cidade,
      estado,
      divisao,
      descricao,
      redes_sociais,
      instalacoes,
      agenda_eventos,
      area_interacao,
    } = req.body;
    await connection.pool.query(
      "UPDATE clubes SET nome = ?, cidade = ?, estado = ?, divisao = ?, descricao = ?, redes_sociais = ?, instalacoes = ?, agenda_eventos = ?, area_interacao = ? WHERE id = ?",
      [
        nome,
        cidade,
        estado,
        divisao,
        descricao,
        JSON.stringify(redes_sociais),
        instalacoes,
        agenda_eventos,
        area_interacao,
        id,
      ]
    );
    res.status(200).json({ message: "Clube atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao updateClub: ", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState,
      index: error.index,
      sql: error.sql,
    });

    res.status(500).json({
      message: "Erro no servidor ao updateClub.",
      error: {
        message: error.message,
        code: error.code,
        errno: error.errno,
        sqlMessage: error.sqlMessage,
        sqlState: error.sqlState,
      },
    });
  }
};

exports.deleteClub = async (req, res) => {
  try {
    const { id } = req.params;
    await connection.pool.query("DELETE FROM clubes WHERE id = ?", [id]);
    res.status(200).json({ message: "Clube deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao buscar atleta: ", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState,
      index: error.index,
      sql: error.sql,
    });

    res.status(500).json({
      message: "Erro no servidor ao deleteClub.",
      error: {
        message: error.message,
        code: error.code,
        errno: error.errno,
        sqlMessage: error.sqlMessage,
        sqlState: error.sqlState,
      },
    });
  }
};
