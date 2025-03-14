const express = require('express');
const profileRoutes = require('./api/profiles');
const profileController = require('./api/profiles/controller');
const path = require('path');

const router = express.Router();

// Routes de base
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes des profils
router.use('/profiles', profileRoutes);

// Route de recherche
/**
 * @swagger
 * /search/profiles:
 *   get:
 *     summary: Rechercher des profils
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: skills
 *         schema:
 *           type: string
 *         description: Compétences séparées par des virgules
 *       - in: query
 *         name: localisation
 *         schema:
 *           type: string
 *         description: Localisation de l'utilisateur
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nom de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des profils correspondants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */
router.get('/search/profiles', profileController.searchProfiles);

module.exports = router; 