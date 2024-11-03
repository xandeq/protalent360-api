// routes/authRoutes.js

import { Router } from 'express';
import { signup, login } from '../controllers/authController';

const router = Router();

// Autenticação (login e cadastro)
router.post('/signup', signup); // Rota de cadastro de usuário
router.post('/login', login); // Rota de login de usuário

export default router;