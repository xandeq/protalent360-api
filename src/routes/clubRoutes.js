// clubRoutes.js
import { Router } from 'express';
const router = Router();
import { createClub, getClubs, getClubById, updateClub, deleteClub } from '../controllers/clubController';

router.post('/create', createClub);
router.get('/list', getClubs);
router.get('/:id', getClubById);
router.put('/:id', updateClub);
router.delete('/:id', deleteClub);

export default router;
