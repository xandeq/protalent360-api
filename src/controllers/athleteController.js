// controllers/athleteController.js

import { hashSync } from "bcryptjs";
import { pool } from "../config/db"; // Conexão com o banco de dados MySQL

// Função auxiliar para cadastrar um usuário

// Criar um novo atleta
export async function createAthlete(req, res, next) {
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

    // Verifica se o email já existe diretamente no código
    const checkEmailQuery = "SELECT * FROM usuarios WHERE email = ?";
    pool.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        console.error("Erro ao verificar o e-mail:", err);
        return next(err);
      }

      if (results.length > 0) {
        // Se já existir um usuário com este e-mail
        console.log("E-mail já cadastrado:", email);
        return res.status(400).json({
          error: "E-mail já cadastrado. Tente usar outro e-mail.",
        });
      }

      // Cria o usuário se o e-mail não existir
      const hashedPassword = hashSync(senha, 10);
      const createUserQuery =
        "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";

      pool.query(
        createUserQuery,
        [nome, email, hashedPassword, "atleta"],
        (err, result) => {
          if (err) {
            console.error("Erro ao criar usuário:", err);
            return next(err);
          }

          const usuarioId = result.insertId;
          console.log("Usuário cadastrado com ID:", usuarioId);

          const createAthleteQuery =
            "INSERT INTO atletas (usuario_id, idade, posicao, altura, peso, cidade, estado, nivel, selo_qualidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

          pool.query(
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
                console.error("Erro ao criar atleta:", err);
                return next(err);
              }
              const atletaId = result.insertId;
              console.log("Atleta cadastrado com sucesso!");
              res
                .status(201)
                .json({ message: "Atleta cadastrado com sucesso!", atletaId: atletaId });
            }
          );
        }
      );
    });
  } catch (error) {
    console.error("Erro inesperado:", error);
    next(error);
  }
}

// controllers/athleteController.js
export function getAthleteProfile(req, res) {
  const { atletaId } = req.params;

  const query = `
    SELECT a.id, u.nome, a.idade, a.posicao, a.altura, a.peso, a.cidade, a.estado, a.nivel, a.selo_qualidade 
    FROM atletas a 
    JOIN usuarios u ON a.usuario_id = u.id 
    WHERE a.id = ?`;

  pool.query(query, [atletaId], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Erro ao buscar perfil do atleta" });

    if (results.length === 0) {
      return res.status(404).json({ error: "Atleta não encontrado" });
    }

    const atleta = results[0];
    res.status(200).json(atleta);
  });
}

// Listar todos os atletas
export function listAthletes(req, res) {
  const query = `
    SELECT a.id, u.nome, a.idade, a.posicao, a.altura, a.peso, a.cidade, a.estado, a.nivel, a.selo_qualidade 
    FROM atletas a 
    JOIN usuarios u ON a.usuario_id = u.id`;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar lista de atletas:", err);
      return res.status(500).json({ error: "Erro ao buscar lista de atletas" });
    }

    res.status(200).json(results);
  });
}

// Buscar um atleta por ID
export function getAthlete(req, res) {
  const { id } = req.params;

  const query = `
    SELECT a.id, u.nome, a.idade, a.posicao, a.altura, a.peso, a.cidade, a.estado, a.nivel, a.selo_qualidade 
    FROM atletas a 
    JOIN usuarios u ON a.usuario_id = u.id 
    WHERE a.id = ?`;

  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar atleta:", err);
      return res.status(500).json({ error: "Erro ao buscar atleta" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Atleta não encontrado" });
    }

    res.status(200).json(results[0]);
  });
}

// Atualizar um atleta
export function updateAthlete(req, res) {
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

  pool.query(
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
}

// Deletar um atleta
export function deleteAthlete(req, res) {
  const { id } = req.params;

  const query = "DELETE FROM atletas WHERE id = ?";

  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar atleta:", err);
      return res.status(500).json({ error: "Erro ao deletar atleta" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Atleta não encontrado" });
    }

    res.status(200).json({ message: "Atleta deletado com sucesso" });
  });
}
