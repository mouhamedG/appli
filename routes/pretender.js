const express = require("express");
const PretenderController = require("./controllers/PretenderController"); // Chemin vers le contrôleur Pretender
const authMiddleware = require("./middlewares/authMiddleware"); // Middleware d'authentification
const route = express.Router();

// Route pour créer un "pretender"
route.post('/', PretenderController.createOne);

// Route protégée pour obtenir un "pretender" par ID
route.get('/:id', authMiddleware, PretenderController.getOneById);

module.exports = route;
