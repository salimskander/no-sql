const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const swaggerSetup = require('./swagger');
const routes = require('./routes');

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://root:example@mongo:27017/profilesdb?authSource=admin';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB avec options améliorées
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('Connexion à MongoDB établie avec succès');
  
  // Configuration de Swagger (après connexion réussie à MongoDB)
  swaggerSetup(app);
  
  // Routes API
  app.use('/', routes);
  
  // Route pour la page d'accueil
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  // Démarrage du serveur
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    console.log(`Documentation disponible sur http://localhost:${PORT}/api-docs`);
  });
})
.catch(err => {
  console.error('Erreur de connexion à MongoDB:', err.message);
});

module.exports = app; 