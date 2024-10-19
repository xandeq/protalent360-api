// controllers/athleteController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../config/db"); // Conexão com o banco de dados MySQL
const { checkEmailExists } = require("../helpers/userHelper");

// Função auxiliar para cadastrar um usuário
const createUser = (nome, email, senha, tipo, callback) => {
  const hashedPassword = bcrypt.hashSync(senha, 10);

  const query =
    "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";
  connection.pool.query(
    query,
    [nome, email, hashedPassword, tipo],
    (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar usuário:", err);
        callback(err, null);
      } else {
        callback(null, result.insertId); // Retorna o ID do usuário criado
      }
    }
  );
};

// Criar um novo atleta
exports.createAthlete = async (req, res, next) => {
  try {
    const {
      nome,
      email,
      senha,
      idade,
      posicao,
      altura,
      peso,
      cidade,
      estado,
      nivel,
      selo_qualidade,
    } = req.body;

    console.log("Recebendo dados para criar atleta:", req.body);

    // Verifica se o email já existe
    checkEmailExists(email, (err, emailExists) => {
      if (err) {
        console.error("Erro ao verificar o e-mail:", err); // Adiciona log de erro
        return next(err); // Passa o erro ao middleware de erro
      }

      if (emailExists) {
        console.log("E-mail já cadastrado:", email); // Adiciona log de e-mail já existente
        return res.status(400).json({
          error: "E-mail já cadastrado. Tente usar outro e-mail.",
        });
      }

      // Cria o usuário se o e-mail não existir
      const hashedPassword = bcrypt.hashSync(senha, 10);
      const createUserQuery =
        "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";

      connection.query(
        createUserQuery,
        [nome, email, hashedPassword, "atleta"],
        (err, result) => {
          if (err) {
            console.error("Erro ao criar usuário:", err); // Loga erro de inserção
            return next(err); // Passa o erro ao middleware de erro
          }

          const usuarioId = result.insertId;
          console.log("Usuário cadastrado com ID:", usuarioId); // Log de sucesso na criação do usuário

          const createAthleteQuery =
            "INSERT INTO atletas (usuario_id, idade, posicao, altura, peso, cidade, estado, nivel, selo_qualidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

          connection.query(
            createAthleteQuery,
            [
              usuarioId,
              idade,
              posicao,
              altura,
              peso,
              cidade,
              estado,
              nivel,
              selo_qualidade,
            ],
            (err, result) => {
              if (err) {
                console.error("Erro ao criar atleta:", err); // Log de erro na criação do atleta
                return next(err); // Passa o erro ao middleware de erro
              }

              console.log("Atleta cadastrado com sucesso!"); // Log de sucesso na criação do atleta
              res
                .status(201)
                .json({ message: "Atleta cadastrado com sucesso!" });
            }
          );
        }
      );
    });
  } catch (error) {
    console.error("Erro inesperado:", error); // Loga erros inesperados
    next(error); // Em caso de erro inesperado, passa o erro para o errorHandler
  }
};

// controllers/athleteController.js
exports.getAthleteProfile = (req, res) => {
  const { atletaId } = req.params;

  const query = `
    SELECT u.nome, a.idade, a.posicao, a.altura, a.peso, a.cidade, a.estado, a.nivel, a.selo_qualidade 
    FROM atletas a 
    JOIN usuarios u ON a.usuario_id = u.id 
    WHERE a.id = ?`;

  connection.pool.query(query, [atletaId], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Erro ao buscar perfil do atleta" });

    if (results.length === 0) {
      return res.status(404).json({ error: "Atleta não encontrado" });
    }

    const atleta = results[0];
    res.status(200).json(atleta);
  });
};

// Listar todos os atletas
exports.listAthletes = (req, res) => {
  const query = `
    SELECT u.nome, a.idade, a.posicao, a.altura, a.peso, a.cidade, a.estado, a.nivel, a.selo_qualidade 
    FROM atletas a 
    JOIN usuarios u ON a.usuario_id = u.id`;

  connection.pool.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar lista de atletas:", err);
      return res.status(500).json({ error: "Erro ao buscar lista de atletas" });
    }

    res.status(200).json(results);
  });
};

// Buscar um atleta por ID
exports.getAthlete = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT u.nome, a.idade, a.posicao, a.altura, a.peso, a.cidade, a.estado, a.nivel, a.selo_qualidade 
    FROM atletas a 
    JOIN usuarios u ON a.usuario_id = u.id 
    WHERE a.id = ?`;

  connection.pool.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar atleta:", err);
      return res.status(500).json({ error: "Erro ao buscar atleta" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Atleta não encontrado" });
    }

    res.status(200).json(results[0]);
  });
};

// Atualizar um atleta
exports.updateAthlete = (req, res) => {
  const { id } = req.params;
  const {
    idade,
    posicao,
    altura,
    peso,
    cidade,
    estado,
    nivel,
    selo_qualidade,
  } = req.body;

  const query = `
    UPDATE atletas 
    SET idade = ?, posicao = ?, altura = ?, peso = ?, cidade = ?, estado = ?, nivel = ?, selo_qualidade = ?
    WHERE id = ?`;

  connection.pool.query(
    query,
    [idade, posicao, altura, peso, cidade, estado, nivel, selo_qualidade, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar atleta:", err);
        return res.status(500).json({ error: "Erro ao atualizar atleta" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Atleta não encontrado" });
      }

      res.status(200).json({ message: "Atleta atualizado com sucesso" });
    }
  );
};

// Deletar um atleta
exports.deleteAthlete = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM atletas WHERE id = ?";

  connection.pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar atleta:", err);
      return res.status(500).json({ error: "Erro ao deletar atleta" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Atleta não encontrado" });
    }

    res.status(200).json({ message: "Atleta deletado com sucesso" });
  });
};
