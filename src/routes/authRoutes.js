// routes/authRoutes.js

const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// Autenticação (login e cadastro)
router.post('/signup', signup); // Rota de cadastro de usuário
router.post('/login', login); // Rota de login de usuário

module.exports = router;