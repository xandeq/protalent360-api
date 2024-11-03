// routes/authRoutes.js

import express from 'express';
import { signup, login } from '../controllers/authController';

const router = express.Router();

// Autenticação (login e cadastro)
router.post('/signup', signup); // Rota de cadastro de usuário
router.post('/login', login); // Rota de login de usuário

export default router;