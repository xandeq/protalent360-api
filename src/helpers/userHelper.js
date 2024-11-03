// helpers/userHelper.js

import { pool } from "../config/db";

// Função para verificar se o e-mail já existe no banco de dados
const checkEmailExists = (email, callback) => {
  const query = "SELECT * FROM usuarios WHERE email = ?";

  pool.query(query, [email], (err, results) => {
    if (err) {
      console.error("Erro ao verificar o e-mail:", err);
      return callback(err, null); // Passa o erro para o callback
    }

    if (results.length > 0) {
      // O e-mail já existe
      return callback(null, true); // Retorna 'true' indicando que o e-mail existe
    }

    return callback(null, false); // O e-mail não existe
  });
};

export default { checkEmailExists };
