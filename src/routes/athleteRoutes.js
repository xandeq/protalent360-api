const express = require('express');
const { createAthlete, listAthletes, getAthlete, updateAthlete, deleteAthlete } = require('../controllers/athleteController');

const router = express.Router();

// Definindo as rotas
router.post('/create', createAthlete);
router.get('/list', listAthletes);
router.get('/:id', getAthlete);
router.put('/update/:id', updateAthlete);
router.delete('/delete/:id', deleteAthlete);

module.exports = router;