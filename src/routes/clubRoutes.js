// clubRoutes.js
const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

router.post('/create', clubController.createClub);
router.get('/list', clubController.getClubs);
router.get('/:id', clubController.getClubById);
router.put('/:id', clubController.updateClub);
router.delete('/:id', clubController.deleteClub);

module.exports = router;
