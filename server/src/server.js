import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';

import userRoutes from './routes/userRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import exerciseRoutes from './routes/exerciceRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const cors = require('cors');
app.use(cors()); // Autorise toutes les origines par défaut
app.get('/api/meals', (req, res) => {
  res.json([
    { food: 'Salade', meal: 'Lunch', calories: '150 kcal', priority: 'Low', carbs: '10g' },
    { food: 'Burger', meal: 'Dinner', calories: '500 kcal', priority: 'High', carbs: '50g' },
    // Ajoutez d'autres repas
  ]);
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Définir les routes de l'API
app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/exercices', exerciseRoutes);
app.use('/api/diets', dietRoutes);

// Configuration pour servir le frontend React
if (process.env.NODE_ENV === 'production') {
  // Servir les fichiers statiques du frontend React
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  // Route de fallback pour le frontend React
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  // Mode développement
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use('/api/users', userRoutes); // Base route for user actions


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));