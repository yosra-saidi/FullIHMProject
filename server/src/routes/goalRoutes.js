import express from 'express';
import {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal
} from '../controllers/goalController.js';

const router = express.Router();

// CRUD routes for goals
router.post('/', createGoal);
router.get('/', getGoals);
router.get('/:id', getGoal);
router.patch('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;
