import mongoose from 'mongoose';

import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import Goal from '../models/goalModel.js';
import Exercise from '../models/exrciceModel.js';
import Diet from '../models/dietModel.js';

// Helper function to create a JWT token
const createToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.SECRET, { expiresIn: '1h' });
};
// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, _id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User Signup
export const signupUser = async (req, res) => {
  const { email, password, dateOfBirth, gender, height, weight, healthStatus } = req.body;
  try {
    const user = await User.signup(email, password, dateOfBirth, gender, height, weight, healthStatus);
    const token = createToken(user._id);
    res.status(201).json({ email: user.email, _id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user details with associated goals, exercises, and diets
export const getUserDetails = async (req, res) => {
  const { id } = req.params; // This should work now with the updated route

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(id).populate('goals.goal').populate('exercisePlan.exercise').populate('dietPlan.diet');

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: error.message });
  }
};
// Add Goal to User
export const addUserGoal = async (req, res) => {
  const { goalId } = req.body; // The ID of the goal the user wants to add
  try {
    // Fetch the goal from the database using the provided ID
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    // Check if the goal is already added to the user's goals
    const user = await User.findById(req.user._id);
    const existingGoal = user.goals.find(g => g.goal.equals(goalId));
    if (existingGoal) {
      return res.status(400).json({ error: "Goal already added" });
    }

    // Add the new goal to the user's goals array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { goals: { goal: goalId, status: "Active" } } },
      { new: true }
    );

    res.status(200).json({ message: "Goal added successfully" });
  } catch (error) {
    console.error("Error adding goal:", error); // Log for debugging
    res.status(400).json({ error: error.message });
  }
};

// Update User Goal Status
export const updateGoalStatus = async (req, res) => {
  const { goalId, status } = req.body;

  // Check if provided parameters are valid
  if (!goalId || !status) {
    return res.status(400).json({ error: "Goal ID and status are required" });
  }

  try {
    // Attempt to find the user and update the goal status
    const user = await User.findOneAndUpdate(
      { _id: req.user._id, "goals.goal": goalId },
      { $set: { "goals.$.status": status } },
      { new: true }
    );

    // If no user is returned, goal not found
    if (!user) return res.status(404).json({ error: "Goal not found for user" });

    res.status(200).json({ message: "Goal status updated successfully", updatedGoal: user.goals });
  } catch (error) {
    console.error("Error updating goal status:", error);
    res.status(500).json({ error: error.message });
  }
};

// Add Exercise to User
export const addUserExercise = async (req, res) => {
  const { exerciseId } = req.body;

  // Check if exerciseId is provided
  if (!exerciseId) {
    return res.status(400).json({ error: "Exercise ID is required" });
  }

  try {
    // Check if the exercise exists
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) return res.status(404).json({ error: "Exercise not found" });

    // Adding the exercise to the user's exercise plan
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { exercisePlan: { exercise: exerciseId, status: "Started" } } },
      { new: true }
    );

    res.status(200).json({ message: "Exercise added successfully" });
  } catch (error) {
    console.error("Error adding exercise:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update User Exercise Status
export const updateExerciseStatus = async (req, res) => {
  const { exerciseId, status } = req.body;

  // Validate input parameters
  if (!exerciseId || !status) {
    return res.status(400).json({ error: "Exercise ID and status are required" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id, "exercisePlan.exercise": exerciseId },
      { $set: { "exercisePlan.$.status": status } },
      { new: true }
    );

    // Check if user or exercise was found
    if (!user) return res.status(404).json({ error: "Exercise not found for user" });

    res.status(200).json({ message: "Exercise status updated successfully", updatedExercise: user.exercisePlan });
  } catch (error) {
    console.error("Error updating exercise status:", error);
    res.status(500).json({ error: error.message });
  }
};

// Add Diet to User
export const addUserDiet = async (req, res) => {
  const { dietId } = req.body;

  // Validate dietId
  if (!dietId) {
    return res.status(400).json({ error: "Diet ID is required" });
  }

  try {
    const diet = await Diet.findById(dietId);
    if (!diet) return res.status(404).json({ error: "Diet not found" });

    // Add the diet to user's diet plan
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { dietPlan: { diet: dietId, status: "Started" } } },
      { new: true }
    );

    res.status(200).json({ message: "Diet added successfully" });
  } catch (error) {
    console.error("Error adding diet:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update User Diet Status
export const updateDietStatus = async (req, res) => {
  const { dietId, status } = req.body;

  // Validate input parameters
  if (!dietId || !status) {
    return res.status(400).json({ error: "Diet ID and status are required" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id, "dietPlan.diet": dietId },
      { $set: { "dietPlan.$.status": status } },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "Diet not found for user" });

    res.status(200).json({ message: "Diet status updated successfully", updatedDiet: user.dietPlan });
  } catch (error) {
    console.error("Error updating diet status:", error);
    res.status(500).json({ error: error.message });
  }
};
