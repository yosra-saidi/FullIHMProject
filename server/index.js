import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/dietplan", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mealSchema = new mongoose.Schema({
  food: String,
  meal: String,
  calories: Number,
  priority: String,
  carbs: Number,
});

const Meal = mongoose.model("Meal", mealSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// GET : Récupérer tous les repas
app.get("/api/meals", async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meals" });
  }
});

// POST : Ajouter un nouveau repas
app.post("/api/meals", async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json({ message: "Meal added!", meal });
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
});

// PUT : Mettre à jour un repas
app.put("/api/meals/:id", async (req, res) => {
    try {
      const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedMeal) {
        return res.status(404).json({ message: "Meal not found" });
      }
      res.json(updatedMeal); // Retourne le repas mis à jour
    } catch (err) {
      res.status(400).json({ message: "Error updating meal" });
    }
  });

// DELETE : Supprimer un repas
app.delete("/api/meals/:id", async (req, res) => {
    try {
      const mealId = req.params.id;
      console.log("Deleting meal with ID:", mealId); // Affiche l'ID que le backend reçoit
      const deletedMeal = await Meal.findByIdAndDelete(mealId);
      if (!deletedMeal) {
        return res.status(404).json({ message: "Meal not found" });
      }
      res.json({ message: "Meal deleted" }); // Retourne une réponse après suppression
    } catch (err) {
      console.error("Error deleting meal:", err); // Affiche l'erreur sur le serveur
      res.status(500).json({ message: "Error deleting meal" });
    }
  });
  
// Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
