// import express from 'express';
// import {
//   loginUser,
//   signupUser,
//   getUserDetails,
//   addUserGoal,
//   updateGoalStatus,
//   addUserExercise,
//   updateExerciseStatus,
//   addUserDiet,
//   updateDietStatus
// } from '../controllers/userController.js';
// import requireAuth from '../middleware/requireAuth.js';

// const router = express.Router();

// // Public routes
// router.post('/login', loginUser);
// router.post('/signup', signupUser);
// // Update route to accept a user ID
// router.get('/profile/:id', getUserDetails);


// // Protected routes
// router.use(requireAuth);


// router.post('/goal', addUserGoal);
// router.patch('/goal', updateGoalStatus);
// router.post('/exercice', addUserExercise);
// router.patch('/exercice', updateExerciseStatus);
// router.post('/diet', addUserDiet);
// router.patch('/diet', updateDietStatus);
                         
// export default router;
import express from 'express';
import { signupUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signupUser); // Route for user registration
router.post('/login', loginUser); // Route for user login

export default router;
