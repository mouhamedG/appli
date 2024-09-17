// Middlewares/checkValidationResult.js
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    // Récupère les erreurs de validation s'il y en a
    const errors = validationResult(req);

    // Si des erreurs existent, renvoyer un message d'erreur
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Si tout est bon, on continue avec le middleware suivant
    next();
};
