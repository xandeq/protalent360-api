const express = require('express');
const {
  createAthlete,
  getAthleteProfile,
  listAthletes,
  updateAthlete,
  deleteAthlete
} = require('../controllers/athleteController');  // Certifique-se de que os controladores estão sendo importados corretamente

const router = express.Router();

// Definição das rotas
router.post('/create', createAthlete); // Rota para criar um novo atleta
router.get('/:atletaId', getAthleteProfile); // Rota para visualizar o perfil de um atleta
router.get('/list', listAthletes); // Rota para listar todos os atletas
router.put('/update/:id', updateAthlete); // Rota para atualizar os dados de um atleta específico
router.delete('/delete/:id', deleteAthlete); // Rota para deletar um atleta específico

module.exports = router;
