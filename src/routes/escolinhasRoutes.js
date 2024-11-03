import { Router } from 'express';
const router = Router();
import { cadastrarEscolinha, listarEscolinhas } from '../controllers/escolinhasController';

// Rota para cadastro de escolinha
router.post('/cadastrar', cadastrarEscolinha);
router.get('/listar', listarEscolinhas);

export default router;