const express = require('express');
const router = express.Router();
const profileController = require('./controller');

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Récupérer tous les profils
 *     tags: [Profiles]
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
 *         description: Liste des profils
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', profileController.getAllProfiles);

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Récupérer un profil par ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *     responses:
 *       200:
 *         description: Détails du profil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profil non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', profileController.getProfileById);

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Créer un nouveau profil
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profil créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', profileController.createProfile);

/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Mettre à jour un profil
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       404:
 *         description: Profil non trouvé
 *       400:
 *         description: Données invalides
 */
router.put('/:id', profileController.updateProfile);

/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Supprimer un profil (soft delete)
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *     responses:
 *       200:
 *         description: Profil supprimé avec succès
 *       404:
 *         description: Profil non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', profileController.deleteProfile);

/**
 * @swagger
 * /profiles/{id}/experience:
 *   post:
 *     summary: Ajouter une expérience à un profil
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - entreprise
 *             properties:
 *               titre:
 *                 type: string
 *               entreprise:
 *                 type: string
 *               dates:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Expérience ajoutée avec succès
 *       404:
 *         description: Profil non trouvé
 *       400:
 *         description: Données invalides
 */
router.post('/:id/experience', profileController.addExperience);

/**
 * @swagger
 * /profiles/{id}/experience/{exp}:
 *   delete:
 *     summary: Supprimer une expérience d'un profil
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *       - in: path
 *         name: exp
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'expérience
 *     responses:
 *       200:
 *         description: Expérience supprimée avec succès
 *       404:
 *         description: Profil ou expérience non trouvé
 *       400:
 *         description: Données invalides
 */
router.delete('/:id/experience/:exp', profileController.deleteExperience);

/**
 * @swagger
 * /profiles/{id}/skills:
 *   post:
 *     summary: Ajouter une compétence à un profil
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - skill
 *             properties:
 *               skill:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compétence ajoutée avec succès
 *       404:
 *         description: Profil non trouvé
 *       400:
 *         description: Données invalides
 */
router.post('/:id/skills', profileController.addSkill);

/**
 * @swagger
 * /profiles/{id}/skills/{skill}:
 *   delete:
 *     summary: Supprimer une compétence d'un profil
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *       - in: path
 *         name: skill
 *         schema:
 *           type: string
 *         required: true
 *         description: Nom de la compétence
 *     responses:
 *       200:
 *         description: Compétence supprimée avec succès
 *       404:
 *         description: Profil ou compétence non trouvé
 *       400:
 *         description: Données invalides
 */
router.delete('/:id/skills/:skill', profileController.deleteSkill);

/**
 * @swagger
 * /profiles/{id}/information:
 *   put:
 *     summary: Mettre à jour les informations d'un profil
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               localisation:
 *                 type: string
 *               siteWeb:
 *                 type: string
 *     responses:
 *       200:
 *         description: Informations mises à jour avec succès
 *       404:
 *         description: Profil non trouvé
 *       400:
 *         description: Données invalides
 */
router.put('/:id/information', profileController.updateInformation);

/**
 * @swagger
 * /profiles/{id}/friends/{friendId}:
 *   post:
 *     summary: Ajouter un ami à un profil
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *       - in: path
 *         name: friendId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'ami à ajouter
 *     responses:
 *       201:
 *         description: Ami ajouté avec succès
 *       404:
 *         description: Profil ou ami non trouvé
 *       400:
 *         description: Données invalides
 */
router.post('/:id/friends/:friendId', profileController.addFriend);

/**
 * @swagger
 * /profiles/{id}/friends/{friendId}:
 *   delete:
 *     summary: Supprimer un ami d'un profil
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *       - in: path
 *         name: friendId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'ami à supprimer
 *     responses:
 *       200:
 *         description: Ami supprimé avec succès
 *       404:
 *         description: Profil ou ami non trouvé
 *       400:
 *         description: Données invalides
 */
router.delete('/:id/friends/:friendId', profileController.deleteFriend);

/**
 * @swagger
 * /profiles/{id}/friends:
 *   get:
 *     summary: Récupérer la liste des amis d'un profil
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du profil
 *     responses:
 *       200:
 *         description: Liste des amis
 *       404:
 *         description: Profil non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id/friends', profileController.getFriends);

module.exports = router; 