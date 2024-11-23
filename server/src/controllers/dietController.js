import Diet from '../models/dietModel.js';

// Create a new diet
export const createDiet = async (req, res) => {
    const { food, meal, protein, carbs, calories, image } = req.body;
    try {
        const diet = await Diet.create({ food, meal, protein, carbs, calories, image });
        res.status(201).json(diet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all diets
export const getDiets = async (req, res) => {
    try {
        const diets = await Diet.find();
        res.status(200).json(diets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single diet by ID
export const getDiet = async (req, res) => {
    const { id } = req.params;
    try {
        const diet = await Diet.findById(id);
        if (!diet) return res.status(404).json({ error: "Diet not found" });
        res.status(200).json(diet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a diet by ID
export const updateDiet = async (req, res) => {
    const { id } = req.params;
    const { food, meal, protein, carbs, calories, image } = req.body;
    try {
        const diet = await Diet.findByIdAndUpdate(
            id,
            { food, meal, protein, carbs, calories, image},
            { new: true }
        );
        if (!diet) return res.status(404).json({ error: "Diet not found" });
        res.status(200).json(diet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a diet by ID
export const deleteDiet = async (req, res) => {
    const { id } = req.params;
    try {
        const diet = await Diet.findByIdAndDelete(id);
        if (!diet) return res.status(404).json({ error: "Diet not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
