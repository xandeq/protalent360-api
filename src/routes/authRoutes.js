// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Autenticação (login e cadastro)
router.post('/signup', signup); // Rota de cadastro de usuário
router.post('/login', login); // Rota de login de usuário

export default router;