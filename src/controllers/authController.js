// authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Conexão com o banco de dados MySQL

// Registrar um novo usuário
exports.signup = (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  // Verifica se o email já existe
  const checkEmailQuery = 'SELECT * FROM usuarios WHERE email = ?';
  connection.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro no servidor ao verificar email' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Email já registrado' });
    }

    // Hash da senha
    const hashedPassword = bcrypt.hashSync(senha, 10);

    // Inserir o usuário no banco
    const query = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
    connection.query(query, [nome, email, hashedPassword, tipo], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao registrar usuário' });
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
  });
};

// Login de usuário
exports.login = (req, res) => {
  const { email, senha } = req.body;

  // Verificar se o usuário existe
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro no servidor ao verificar usuário' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const user = results[0];

    // Comparar a senha
    const isPasswordValid = bcrypt.compareSync(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Senha inválida' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
      },
    });
  });
};

// Verificação de token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Nenhum token fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Falha ao autenticar token' });
    }
    req.userId = decoded.id;
    req.userTipo = decoded.tipo;
    next();
  });
};
