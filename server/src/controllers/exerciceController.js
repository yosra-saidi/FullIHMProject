import Exercise from '../models/exrciceModel.js';

// Create a new exercise
export const createExercise = async (req, res) => {
    const { name, bodyPart, equipment, gifUrl, target } = req.body;
    try {
        const exercise = await Exercise.create({ name, bodyPart, equipment, gifUrl, target });
        res.status(201).json(exercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all exercises
export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single exercise by ID
export const getExercise = async (req, res) => {
    const { id } = req.params;
    try {
        const exercise = await Exercise.findById(id);
        if (!exercise) return res.status(404).json({ error: "Exercise not found" });
        res.status(200).json(exercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an exercise by ID
export const updateExercise = async (req, res) => {
    const { id } = req.params;
    const { name, bodyPart, equipment, gifUrl, target } = req.body;
    try {
        const exercise = await Exercise.findByIdAndUpdate(
            id,
            { name, bodyPart, equipment, gifUrl, target },
            { new: true }
        );
        if (!exercise) return res.status(404).json({ error: "Exercise not found" });
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an exercise by ID
export const deleteExercise = async (req, res) => {
    const { id } = req.params;
    try {
        const exercise = await Exercise.findByIdAndDelete(id);
        if (!exercise) return res.status(404).json({ error: "Exercise not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
