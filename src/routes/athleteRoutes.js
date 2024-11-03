import express from 'express';
import {
  createAthlete,
  listAthletes,
  getAthlete,
  updateAthlete,
  deleteAthlete,
} from '../controllers/athleteController';  // Certifique-se que o caminho está correto

const router = express.Router();

// Definindo as rotas
router.post('/create', createAthlete);
router.get('/list', listAthletes);
router.get('/:id', getAthlete);
router.put('/update/:id', updateAthlete);
router.delete('/delete/:id', deleteAthlete);

export default router;
