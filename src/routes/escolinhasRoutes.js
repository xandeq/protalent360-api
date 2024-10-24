const express = require('express');
const router = express.Router();
const escolinhasController = require('../controllers/escolinhasController');

// Rota para cadastro de escolinha
router.post('/cadastrar', escolinhasController.cadastrarEscolinha);

module.exports = router;