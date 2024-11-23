import express from 'express';
import {
  createDiet,
  getDiets,
  getDiet,
  updateDiet,
  deleteDiet
} from '../controllers/dietController.js';

const router = express.Router();

// CRUD routes for diets
router.post('/', createDiet);
router.get('/', getDiets);
router.get('/:id', getDiet);
router.patch('/:id', updateDiet);
router.delete('/:id', deleteDiet);

export default router;
