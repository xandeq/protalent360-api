// athleteController.js

const connection = require('../config/db'); // Conexão com o banco de dados MySQL

// Criar um novo atleta
exports.createAthlete = (req, res) => {
  const { usuario_id, posicao, idade, altura, peso, cidade, estado, nivel } = req.body;

  const query = 'INSERT INTO atletas (usuario_id, posicao, idade, altura, peso, cidade, estado, nivel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [usuario_id, posicao, idade, altura, peso, cidade, estado, nivel], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar atleta' });
    }
    res.status(201).json({ message: 'Atleta criado com sucesso!', atletaId: result.insertId });
  });
};

// Listar todos os atletas
exports.listAthletes = (req, res) => {
  const query = 'SELECT * FROM atletas';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar atletas' });
    }
    res.status(200).json(results);
  });
};

// Atualizar um atleta
exports.updateAthlete = (req, res) => {
  const { id } = req.params;
  const { posicao, idade, altura, peso, cidade, estado, nivel } = req.body;

  const query = 'UPDATE atletas SET posicao = ?, idade = ?, altura = ?, peso = ?, cidade = ?, estado = ?, nivel = ? WHERE id = ?';
  connection.query(query, [posicao, idade, altura, peso, cidade, estado, nivel, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar atleta' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Atleta não encontrado' });
    }
    res.status(200).json({ message: 'Atleta atualizado com sucesso!' });
  });
};

// Deletar um atleta
exports.deleteAthlete = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM atletas WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao deletar atleta' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Atleta não encontrado' });
    }
    res.status(200).json({ message: 'Atleta deletado com sucesso!' });
  });
};
