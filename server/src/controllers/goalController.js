import mongoose from 'mongoose';
import Goal from '../models/goalModel.js';

export const createGoal = async (req, res) => {
    const { title } = req.body;
    try {
        const goal = await Goal.create({ title });
        res.status(201).json(goal);
    } catch (error) {
        // Check if the error is due to a duplicate title
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ error: 'Title is required.' });
        } else if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ error: 'Goal title must be unique.' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

export const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getGoal = async (req, res) => {
    const { id } = req.params;
    try {
        const goal = await Goal.findById(id);
        if (!goal) return res.status(404).json({ error: "Goal not found" });
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateGoal = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const goal = await Goal.findByIdAndUpdate(id, { title }, { new: true });
        if (!goal) return res.status(404).json({ error: "Goal not found" });
        res.status(200).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteGoal = async (req, res) => {
    const { id } = req.params;
    try {
        const goal = await Goal.findByIdAndDelete(id);
        if (!goal) return res.status(404).json({ error: "Goal not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
