const express = require('express');
const { verifyToken } = require('../controllers/authController');

const router = express.Router();

// Autenticação (login e cadastro)
router.post('/signup', verifyToken); // Rota de cadastro
router.post('/login', verifyToken); // Rota de login

module.exports = router;
