// routes/athleteRoutes.js

const express = require('express');
const { createAthlete, listAthletes, getAthleteProfile, updateAthlete, deleteAthlete } = require('../controllers/athleteController');

const router = express.Router();

// Rotas de atletas
router.post('/create', createAthlete); // Cria um novo atleta
router.get('/list', listAthletes); // Lista todos os atletas
router.get('/:atletaId', getAthleteProfile); // Visualiza o perfil de um atleta
router.put('/update/:id', updateAthlete); // Atualiza um atleta específico
router.delete('/delete/:id', deleteAthlete); // Deleta um atleta específico

module.exports = router;
