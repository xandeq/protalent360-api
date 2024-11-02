// clubController.js
const connection = require("../config/db"); // Conexão com o banco de dados MySQL

exports.createClub = async (req, res) => {
    try {
        const { nome, cidade, estado, divisao, descricao, redes_sociais, instalacoes, agenda_eventos, area_interacao } = req.body;
        const [result] = await connection.pool.query(
            'INSERT INTO clubes (nome, cidade, estado, divisao, descricao, redes_sociais, instalacoes, agenda_eventos, area_interacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, cidade, estado, divisao, descricao, JSON.stringify(redes_sociais), instalacoes, agenda_eventos, area_interacao]
        );
        res.status(201).json({ id: result.insertId, message: "Clube criado com sucesso" });
    } catch (error) {
        console.error("Erro ao createClub: ", {
          message: error.message,
          stack: error.stack,
          code: error.code,
          errno: error.errno,
          sqlMessage: error.sqlMessage,
          sqlState: error.sqlState,
          index: error.index,
          sql: error.sql
        });
    
        res.status(500).json({
          message: "Erro no servidor ao createClub.",
          error: {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState
          }
        });
      }
};

exports.getClubs = async (req, res) => {
    try {
        const [rows] = await connection.pool.query('SELECT * FROM clubes');
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
          sql: error.sql
        });
    
        res.status(500).json({
          message: "Erro no servidor ao getClubs.",
          error: {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState
          }
        });
      }
};

exports.getClubById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connection.pool.query('SELECT * FROM clubes WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Clube não encontrado" });
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
          sql: error.sql
        });
    
        res.status(500).json({
          message: "Erro no servidor ao getClubById.",
          error: {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState
          }
        });
      }
};

exports.updateClub = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, cidade, estado, divisao, descricao, redes_sociais, instalacoes, agenda_eventos, area_interacao } = req.body;
        await connection.pool.query(
            'UPDATE clubes SET nome = ?, cidade = ?, estado = ?, divisao = ?, descricao = ?, redes_sociais = ?, instalacoes = ?, agenda_eventos = ?, area_interacao = ? WHERE id = ?',
            [nome, cidade, estado, divisao, descricao, JSON.stringify(redes_sociais), instalacoes, agenda_eventos, area_interacao, id]
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
          sql: error.sql
        });
    
        res.status(500).json({
          message: "Erro no servidor ao updateClub.",
          error: {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState
          }
        });
      }
};

exports.deleteClub = async (req, res) => {
    try {
        const { id } = req.params;
        await connection.pool.query('DELETE FROM clubes WHERE id = ?', [id]);
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
          sql: error.sql
        });
    
        res.status(500).json({
          message: "Erro no servidor ao deleteClub.",
          error: {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState
          }
        });
      }
};
