import express from 'express';
import {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise
} from '../controllers/exerciceController.js';

const router = express.Router();

// CRUD routes for exercises
router.post('/', createExercise);
router.get('/', getExercises);
router.get('/:id', getExercise);
router.patch('/:id', updateExercise);
router.delete('/:id', deleteExercise);

export default router;
